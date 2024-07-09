import React, { useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { CloseIcon } from "@/components/Icons";
import Input from "@/components/Input/Input";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Toast from "@/components/Toast";

const AddPhoneModal = NiceModal.create(
    ({ ...props }: any) => {
        const modal = useModal();
        const [number, setNumber] = useState('')
        useEffect(() => {

        }, [])
        return (
            <BasicModal
                hideCloseButton={props.hideCloseButton}
                hide={modal.hide}
                show={modal.visible}
                nestedModal={props.nestedModal}
                modalClass="!z-[200]"
            >
                <div className="w-[28rem]">
                    <p className="font-bold border-b p-4">Add Phone</p>
                    <div className="p-4">
                        <p id="title">Please type the phone number and click on add button</p>
                        <PhoneInput
                            value={number}
                            //@ts-ignore
                            onChange={setNumber}
                            className="phoneNumber theme-input mt-4 "
                            placeholder="Phone Number"
                            name="phoneNumber"
                            dropdownStyle={{height:'100px'}}
                        />
                        <Button
                            variant="black"
                            size="medium"
                            className="w-full mt-4"
                            onClick={() => {
                                if(number != ''){
                                    props.handlePhoneNumbers('phone_numbers', number)
                                    setNumber('')
                                    modal.hide()
                                } else{
                                    Toast.fire({icon: 'warning', title: 'Phone number cannot be empty'})
                                }

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

export default AddPhoneModal;
