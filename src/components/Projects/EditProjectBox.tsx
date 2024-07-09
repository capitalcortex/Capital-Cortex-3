import React, { useEffect, useState } from 'react'
import { DeleteIcon, DownArrowIcon, EditIcon, ExportIcon, FileIcon, PlusIcon } from '../Icons'
import Button from '../Buttons/Button'
import { Disclosure } from '@headlessui/react'
import NiceModal from '@ebay/nice-modal-react'
import ExportFileModal from '../Modals/ExportFileModal/ExportFileModal'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown';
import EditorPopup from '../Editor'
import {
    convertToRaw,
    EditorState,
    ContentState,
    convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { addSectionAsync, deleteSectionAsync, getSingleDocumentAsync, editSectionAsync } from '@/services/documentGeneration/asyncThunk'
import Config from "../../config/index"
import io from 'socket.io-client';
import { setGeneratedSection } from '@/redux/slices/documentGenerationSlice'
import { loadChat } from '@/redux/slices/chatSlice'
import DocumentsDisclosureSkelton from '../DocumentsDisclosureSkelton'

const htmlToMd = require('html-to-md');

const EditProjectBox = () => {
    const { documentSections, documentTitle, docId, documentStatus, isLoading } = useSelector((state: any) => state.documentGeneration)
    const Id = window.location.pathname.split("/").at(-1);
    const { profile } = useSelector((state: any) => state.user);
    const socket = io(Config.API_ENDPOINT);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [isEditing, setIsEditing] = useState(false);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const onEditorStateChange = (value: EditorState) => {
        setEditorState(value);
    };

    const openEditor = () => {
        setTitle('');
        setEditorState(EditorState.createEmpty());
        setEditingSectionId(null);
        setIsEditing(false);
        setOpen(true);
    }

    const handleUpdate = () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        let section = {
            docId: `${docId}`,
            title: title,
            content: htmlToMd(draftToHtml(rawContent)),
        }

        if (isEditing && editingSectionId) {
            section = {
                ...section,
                // @ts-ignore
                sectionId: editingSectionId
            };
            // @ts-ignore
            dispatch(editSectionAsync(section));
        } else {
            // @ts-ignore
            dispatch(addSectionAsync(section));
        }
        setEditingSectionId(null);
    };

    const handleSectionEdit = (section: any) => {
        setTitle(section.title);
        // @ts-ignore
        const contentState = ContentState.createFromBlockArray(convertFromHTML(section.content));
        setEditorState(EditorState.createWithContent(contentState));
        setEditingSectionId(section._id);
        setIsEditing(true);
        setOpen(true);
    }

    const handleSectionDelete = (Id: string) => {
        // @ts-ignore
        dispatch(deleteSectionAsync({ sectionId: `${Id}`, docId: `${docId}` }))
    }

    useEffect(() => {
        if (documentSections.length <= 0 && !isLoading && docId == '') {
            //@ts-ignore
            dispatch(loadChat({ history: [], chatId: "", navigate: false }))
            //@ts-ignore
            dispatch(getSingleDocumentAsync({ docId: Id }))
        }
    }, [])

    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on(profile._id, (socket_res: any) => {
            if (socket_res?.success) {
                dispatch(setGeneratedSection(socket_res))
            }
        })

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div className='w-full bg-white overflow'>
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="h1 font-medium text-theme-gray-575 text-2xl">{documentTitle}
                    {/* <button className='ml-3'><EditIcon /></button> */}
                </h1>
                <Button
                    onClick={() => {
                        if (documentStatus == 'Completed') {
                            NiceModal.show(ExportFileModal, { hideCloseButton: false })
                        }
                    }}
                    variant='black'
                    size='small'
                    disabled={documentStatus != 'Completed'}
                    className='!px-5 !py-3 mb-2 flex gap-2 justify-center items-center w-full lg:w-auto min-w-max'
                >
                    <ExportIcon color="white" />
                    Export
                </Button>
            </div>
            <div className='h-[calc(100dvh-300px)] md:h-[calc(100dvh-360px)] xl:h-[calc(100dvh-260px)] overflow-scroll scrollbar-hidden'>
                {
                    documentSections.map((section: any, index: number) => (
                        <Disclosure key={index} as={"div"} className={"mt-6"}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className={`${open ? "rounded-t-xl" : "rounded-xl"} py-3 px-6 bg-[#F4F4F4] flex justify-between w-full`}>
                                        <div className="flex items-center gap-4">
                                            <FileIcon />
                                            <p className='line-clamp-1 text-left text-theme-gray-575'>{section?.title} {section?.status != 'Generated' && `- ${section?.status}`}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleSectionEdit(section)}>
                                                <EditIcon />
                                            </button>
                                            <DeleteIcon onClick={() => { handleSectionDelete(section?._id) }} />
                                            <DownArrowIcon />
                                        </div>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="border rounded-b-xl rounded-t-none border-theme-gray-100 p-6 chat__message">
                                        <ReactMarkdown>
                                            {section?.content}
                                        </ReactMarkdown>
                                        {section?.status != 'Generated' &&
                                            <DocumentsDisclosureSkelton />
                                        }
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))
                }

                <div className="w-full my-6">
                    <Button
                        variant='black'
                        size='medium'
                        className='py-2 px-6  flex items-center gap-4 mx-auto w-full justify-center sm:w-auto'
                        // onClick={() => setOpen(true)}
                        onClick={openEditor}
                    >Add Section
                        <PlusIcon color="white" />
                    </Button>
                </div>
            </div>
            <EditorPopup
                title="Section"
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                show={open}
                onClose={setOpen}
                setTitle={setTitle}
                sectionTitle={title}
                onClick={() => setOpen(false)}
                onUpdate={() => {
                    handleUpdate();
                }}
                isEditing={isEditing}
            />
        </div>
    )
}

export default EditProjectBox