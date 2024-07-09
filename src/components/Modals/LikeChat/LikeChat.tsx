import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import { CloseIcon } from "@/components/Icons";
import Image from "next/legacy/image";
const LikeChatModal = NiceModal.create(({ ...props }: any) => {
    const modal = useModal();
    const modalCloseHandler = () => {
        modal.hide()
    };
    return (
        <BasicModal
            hideCloseButton={true}
            hide={modal.hide}
            show={modal.visible}
            className="!rounded-xl sm:w-[32.5rem]"
        >
            <>
                <div className="flex justify-end p-4"> 
                    <CloseIcon stroke="#A3A4A6"
                        onClick={modalCloseHandler}
                        className="h-6 w-6 cursor-pointer" />
                </div>
                <div className="p-4 sm:p-10">
                    <figure className="flex justify-center mb-[2.5rem]">
                        <Image
                            placeholder="blur"
                            blurDataURL="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/like.gif"
                            src="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/like.gif"
                            height={200}
                            width={200}
                            className=""
                            alt="Success Gif"
                            aria-hidden={true}
                        />
                    </figure>
                    <h2 className="text-2xl font-semibold text-center mb-3">Thanks for your feedback</h2>
                    <p className="text-theme-gray-325 text-center ">We greatly appreciate your valuable input! Your feedback helps us enhance our services and tailor them to better meet your needs.</p>
                </div>
            </>
        </BasicModal>
    );
});

export default LikeChatModal;
