import React, { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { ArrowLeftIcon } from "@/components/Icons";
import AddChatNotesModal from "../AddChatNotes/AddChatNotes";
import { useDispatch, useSelector } from "react-redux";
import { createListAsync } from "@/services/chat/asyncThunk";

const CreateNewListModal = NiceModal.create(
    ({ ...props }: any) => {
        const modal = useModal();
        const { listBack } = useSelector((state: any) => state.chat)
        const [title, setTitle] = useState("")
        const dispatch = useDispatch()

        const handleCreateList = () => {
            //@ts-ignore
            dispatch(createListAsync({list_title: title}))
            setTitle("")
        }
 
        return (
            <BasicModal
                hideCloseButton={props.hideCloseButton}
                hide={modal.hide}
                show={modal.visible}
            >
                <div className="sm:w-[28rem]">
                    <div className="flex gap-4 border-b p-4 items-center">
                        {listBack && <button className="flex items-center" onClick={() => { NiceModal.show(AddChatNotesModal); NiceModal.hide(CreateNewListModal) }}><ArrowLeftIcon /></button>}
                        <h1 className="font-bold text-base">Create New List</h1>
                    </div>
                    <div className="p-4">
                        <p className="text-sm mb-6">Please type the title and click on create button.</p>
                        <Input
                            aria-label="Title"
                            placeholder="Type title"
                            type="text"
                            className="mb-4"
                            value={title}
                            onChange={(e: any) => {setTitle(e.target.value)}}
                        />
                        <Button
                            variant="black"
                            size="medium"
                            className="w-full text-sm font-bold"
                            disabled={title.length>0 ? false:true}
                            onClick={() => { 
                                handleCreateList()
                                if(listBack){
                                    NiceModal.show(AddChatNotesModal); 
                                    NiceModal.hide(CreateNewListModal);
                                }else{
                                    NiceModal.hide(CreateNewListModal)
                                }
                            }}
                        >
                            Create
                        </Button>
                    </div>

                </div>
            </BasicModal>
        );
    }
);

export default CreateNewListModal;
