import React, { useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { ExportIcon, PdfFileIcon, WordFileIcon } from "@/components/Icons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/components/Toast";
import { exportDOCXAsync, exportFileStatusAsync, exportPDFAsync } from "@/services/documentGeneration/asyncThunk";
import Config from "../../../config/index"
import io from 'socket.io-client';
import { setExportURL } from "@/redux/slices/documentGenerationSlice";

const ExportFileModal = NiceModal.create(
    ({ setstate, setPopup, hideCloseButton, ...props }: any) => {
        const modal = useModal();
        const [fileType, setFileType] = useState('')
        const { docId, documentTitle, exportURL, ping } = useSelector((state: any) => state.documentGeneration)
        const { profile } = useSelector((state: any) => state.user);
        const dispatch = useDispatch()
        const [isLoading, setIsLoading] = useState(false)

        const handleExport = () => {
            setIsLoading(true)
            if(fileType == 'pdf'){
                //@ts-ignore
                dispatch(exportPDFAsync({docId: docId}))
            }else if(fileType == 'docx'){
                //@ts-ignore
                dispatch(exportDOCXAsync({docId: docId}))
            }else{
                Toast.fire({icon: 'warning', title: 'Select File Type!'})
            }
        }

        useEffect(() => {
          if(isLoading){
            setTimeout(() => {
                if(exportURL === ''){
                    //@ts-ignore
                    dispatch(exportFileStatusAsync({docId: docId, fileType: fileType}))
                }
            }, 5000);
          }
        }, [ping])
        

        useEffect(() => {
          if(exportURL !== ''){
            setIsLoading(false)
            const link = document.createElement("a");
            link.href = exportURL;
            link.setAttribute("download", `${documentTitle}.${fileType}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            NiceModal.hide(ExportFileModal);
            //@ts-ignore
            dispatch(setExportURL(""))
          }
        }, [exportURL])
        

        return (
            <BasicModal
                hideCloseButton={hideCloseButton}
                hide={() => {
                    setFileType('')
                    setIsLoading(false)
                    modal.hide()
                }}
                show={modal.visible}
            >
                <div className="p-8">
                    <h1 className="h2 font-semibold leading-1 mb-2">Export File</h1>
                    <p className="text-theme-gray-400 leading-1">Select the file type you would like to export</p>
                    <div className="flex w-full my-4">
                        <label htmlFor="pdf-file" className={`cursor-pointer flex items-center p-4 border rounded-l-xl border-r-0 w-1/2 font-medium ${fileType === 'pdf' && 'bg-black text-white'}`}>
                            <input checked={fileType === 'pdf'}
                                onChange={(e: any) => {setFileType(e.target.value)}} type="radio" id="pdf-file" name="file-type" value="pdf" className="hidden" />
                            <PdfFileIcon />
                            <p className="ml-2">PDF File</p>
                        </label>
                        <label htmlFor="doc-file" className={`${fileType === 'docx' && 'bg-black text-white'} cursor-pointer flex items-center p-4 border rounded-r-xl w-1/2 font-medium`}>
                            <input checked={fileType === 'docx'}
                                onChange={(e: any) => {setFileType(e.target.value)}} type="radio" id="doc-file" name="file-type" value="docx" className="hidden" />
                            <WordFileIcon />
                            <p className="ml-2">DOC File</p>
                        </label>
                    </div>
                    <Button
                        variant='black'
                        size='medium'
                        className='!px-5 flex gap-2 items-center min-w-[123px]'
                        isLoading={isLoading}
                        disabled={isLoading}
                        onClick={handleExport}
                    >
                        <ExportIcon color="white" />
                        Export
                    </Button>
                </div>
            </BasicModal>
        );
    }
);

export default ExportFileModal;
