import React, { useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { CloseIcon } from "@/components/Icons";
import Input from "@/components/Input/Input";
import Toast from "@/components/Toast";
import { useFormik } from "formik";
import { EmailSchema } from "@/services/schema.service";

const AddEmailModal = NiceModal.create(
    ({ ...props }: any) => {
        const modal = useModal();

        const formik = useFormik({
            initialValues: {
                email: "",
            },
            validationSchema: EmailSchema,
            onSubmit: async (values, { setSubmitting }) => {
                setSubmitting(true);
                props.handleEmails('emails', values.email)
                formik.resetForm()
                modal.hide()
            },
        });

        return (
            <BasicModal
                hideCloseButton={props.hideCloseButton}
                hide={() => {
                    formik.resetForm()
                    modal.hide()
                }}
                show={modal.visible}
                modalClass="!z-[200]"

            >
                <div className="w-[28rem]">
                    <p className="font-bold border-b p-4">Add Email</p>
                    <form onSubmit={formik.handleSubmit} className="p-4">
                        <p>Please type the email and click on add button</p>
                        <Input
                            placeholder="Email"
                            parentClass="mt-4"
                            type="email"
                            value={formik.values.email}
                            formik={formik}
                            name="email"
                        />
                        <Button
                            variant="black"
                            size="medium"
                            className="w-full mt-4"
                            type="submit"
                        >
                            Add
                        </Button>
                    </form>
                </div>
            </BasicModal>
        );
    }
);

export default AddEmailModal;
