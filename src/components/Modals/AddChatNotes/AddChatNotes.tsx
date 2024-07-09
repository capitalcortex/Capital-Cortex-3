import React, { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Button from "@/components/Buttons/Button";
import CreateNewListModal from "../CreateNewList/CreateNewList";
import { useDispatch, useSelector } from "react-redux";
import { setListBack } from "@/redux/slices/chatSlice";
import { addNoteAsync } from "@/services/chat/asyncThunk";

const AddChatNotesModal = NiceModal.create(
    ({ ...props }: any) => {
        const modal = useModal();
        const { lists, chatId, note } = useSelector((state: any) => state.chat)
        const dispatch = useDispatch()
        const [listId, setListId] = useState("")

        const handleAddNote = () => {
            //@ts-ignore
            dispatch(addNoteAsync({
                chatId: chatId,
                listId: listId,
                note: note
            }))
        }

        return (
            <BasicModal
                hideCloseButton={props.hideCloseButton}
                hide={modal.hide}
                show={modal.visible}
            >
                <div className="sm:w-[28rem]">
                    <h1 className="font-bold border-b p-4 text-base">Add to Notes</h1>
                    <div className="p-4">
                        <p className="text-sm mb-8">Please select where you want to add or create new.</p>
                        {lists.length === 0 && <p className="text-center text-red-500">No Note found please create a new one.</p>}
                        <div className="max-h-[25dvh] overflow-auto themeScrollbar pr-2">
                            {lists.map((list: any, key: any) => (
                                <div onClick={() => { setListId(list?._id) }} key={key} className={`flex items-center border rounded-lg p-4 mb-1`}>
                                    <input
                                        type="radio"
                                        id={key}
                                        checked={listId === list?._id}
                                        className="hidden"
                                    />
                                    <label htmlFor={key} className="cursor-pointer flex items-center text-theme-gray-575 font-semibold text-sm">
                                        <span className={`w-5 h-5 border-2 border-theme-gray-100 rounded-full flex items-center justify-center me-3 ${listId === list?._id ? '!border-theme before:content-[""] before:h-3 before:w-3 before:bg-theme before:rounded-full' : ''}`} ></span>
                                        {list?.title}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 border-t p-4">
                        <Button
                            variant="gray"
                            size="small"
                            className="w-full text-sm font-bold min-w-0"
                            onClick={() => {
                                //@ts-ignore
                                dispatch(setListBack(true))
                                NiceModal.show(CreateNewListModal);
                                NiceModal.hide(AddChatNotesModal)
                            }}
                        >
                            Create New List
                        </Button>
                        <Button
                            variant="black"
                            size="medium"
                            className="w-full text-sm font-bold min-w-0"
                            onClick={() => {
                                handleAddNote()
                                NiceModal.hide(AddChatNotesModal)
                            }}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </BasicModal>
        );
    }
);

export default AddChatNotesModal;
