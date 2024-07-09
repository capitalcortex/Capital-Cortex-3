import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal"; 
const DeleteNoteModal = NiceModal.create(({ ...props }: any) => {
  const modal = useModal();
  return (
    <BasicModal
      hideCloseButton={false}
      hide={modal.hide}
      show={modal.visible}
      className="!rounded-2xl"
    >
      <div className="w-full sm:w-[30.25rem] p-8">
        <p className="h1 font-bold text-center leading-1 text-2xl mb-4">Note Details</p>
        <p className="text-theme-gray-400 text-center overflow-y-scroll sm-scrollbar-hidden max-h-96">{props.note}</p>
      </div>
    </BasicModal>
  );
});

export default DeleteNoteModal;
