import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal"; 
import Button from "@/components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteNote } from "@/redux/slices/chatSlice";
import { deleteNoteAsync } from "@/services/chat/asyncThunk";

const DeleteNoteModal = NiceModal.create(({ ...props }: any) => {
  const modal = useModal();
  const dispatch = useDispatch()
  const { listId, index } = useSelector((state: any) => state.chat)


  const handleDelete = () => {
    //@ts-ignore
    dispatch(deleteNoteAsync({
      listId: listId,
      index: index
    }))
    modal.hide()
  }

  return (
    <BasicModal
      hideCloseButton={true}
      hide={modal.hide}
      show={modal.visible}
      className="!rounded-2xl w-full sm:!w-[30.25rem]"
    >
      <div className="p-6 sm:p-8">
        <p className="h1 font-bold sm:mt-8 text-center leading-1 text-2xl sm:mb-4 my-4">Delete Note</p>
        <p className="h5 text-theme-gray-400 mb-8 text-center">Are you sure you want to delete this note?</p>
        <div className="flex w-full gap-4">
          <Button
            onClick={() => {
              //@ts-ignore
              dispatch(setDeleteNote({
                listId: "",
                index: 0
              }))
              modal.hide()
            }}
            variant="gray"
            size="medium"
            className="w-1/2 !min-w-max text-theme-gray-575 font-bold"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="red" size="medium" className="w-1/2 !min-w-max">
            Delete
          </Button>
        </div>
      </div>
    </BasicModal>
  );
});

export default DeleteNoteModal;
