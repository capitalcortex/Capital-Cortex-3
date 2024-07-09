import Image from "next/legacy/image";
import BasicModal from "../BasicModal";
import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";


const AdvisoryBoardMemberDetailModal = NiceModal.create(
    ({ ...props }: any) => {
        const modal = useModal();
        
        return (
            <BasicModal hideCloseButton={props.hideCloseButton} hide={modal.hide} show={modal.visible} className="!rounded-none !p-0 overflow-hidden" parentClass="max-w-[964px] md:max-h-[610px] !p-4 h-full">
                <div className="flex flex-wrap h-full">
                    <figure className="relative w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center">
                        <Image layout="fill" placeholder="blur" blurDataURL={props.img} id={props.id} src={props.img} alt={props.name} className="object-cover" />
                    </figure>
                    <div className="p-4 pr-0  md:w-1/2 h-1/2 md:h-full flex flex-col">
                        <p className="font-medium text-xl font-inter mb-3">{props.name}</p>
                        <div className="pr-4 overflow-y-scroll scrollbar-hidden grow">
                            <p className="text-[#5F6063] font-inter">{props.about}</p>
                            <div className="text-[#5F6063] font-inter">{props.linksAbout}</div>
                        </div>
                    </div>
                </div>
            </BasicModal>
        );
    }
);

export default AdvisoryBoardMemberDetailModal;
