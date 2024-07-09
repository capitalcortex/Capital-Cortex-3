import React, { useEffect } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import { CloseIcon } from "@/components/Icons";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Config from "../../../config/index"
import io from 'socket.io-client';
import Button from "@/components/Buttons/Button";
import { getUserDocumentsAsync } from "@/services/documentGeneration/asyncThunk";

const GeneratePlanModal = NiceModal.create(({ ...props }: any) => {
    const modal = useModal();
    const dispatch = useDispatch();
    const router = useRouter()
    const socket = io(Config.API_ENDPOINT);
    const { profile } = useSelector((state: any) => state.user);

    const modalCloseHandler = () => {
        if(router.pathname == '/documents'){
            //@ts-ignore
            dispatch(getUserDocumentsAsync({}));
        }
        modal.hide()
    };

    useEffect(() => {

        socket.on('connect', () => {
          console.log('Connected to server');
        });
    
        socket.on(profile._id, (socket_res: any) => {
          if (!socket_res.processing) {            
            NiceModal.hide(GeneratePlanModal);
            router.push(`/documents/${socket_res.docId}`)
          }
        })
    
        return () => {
          socket.disconnect();
        };
      }, [socket]);

    return (
        <BasicModal
            hideCloseButton={true}
            hide={modal.hide}
            show={modal.visible}
            className="!rounded-xl sm:w-[32.5rem]"
        >
            <>
                <div className="flex justify-between p-4 ps-8 items-center border-b border-theme-gray-100">
                    <p className="font-bold">Create Document</p>
                    <CloseIcon stroke="#A3A4A6"
                        onClick={modalCloseHandler}
                        className="h-6 w-6 cursor-pointer" />
                </div>
                <div className="p-4 sm:p-10">
                    <figure className="flex justify-center mb-[2.5rem]">
                        <Image
                            placeholder="blur"
                            blurDataURL="https://capitalcortstorage.blob.core.windows.net/app-assets/Spin-1s-200px.gif"
                            src="https://capitalcortstorage.blob.core.windows.net/app-assets/Spin-1s-200px.gif"
                            height={200}
                            width={200}
                            className=""
                            alt="Success Gif"
                            aria-hidden={true}
                        />
                    </figure>
                    <h2 className="text-2xl font-semibold text-center mb-3">Generating Document...</h2>
                    <p className="text-theme-gray-325 text-center">Please wait while we generate your document</p>
                    {/* <p className="text-theme-gray-325 text-center">or</p>
                    <p className="text-theme-gray-325 text-center">See document been generated</p> */}
                </div>
                <div className="w-full flex justify-center items-center pb-6">
                    <Button
                        variant='black'
                        size='medium'
                        className='!px-5 flex gap-2 items-center min-w-[123px]'
                        onClick={() => {
                            if(router.pathname == '/documents'){
                                //@ts-ignore
                                dispatch(getUserDocumentsAsync({}));
                            }else{
                                router.push(`/documents`)
                            }
                            NiceModal.hide(GeneratePlanModal);
                        }}
                    >
                    View Document
                    </Button>
                </div>
            </>
        </BasicModal>
    );
});

export default GeneratePlanModal;
