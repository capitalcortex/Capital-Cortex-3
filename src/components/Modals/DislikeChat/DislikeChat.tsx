import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import { CloseIcon } from "@/components/Icons";
import Image from "next/legacy/image";
import Textarea from "@/components/Input/Textarea";
import Button from "@/components/Buttons/Button";
import { useDispatch } from "react-redux";
import { chatFeedbackAsync } from "@/services/chat/asyncThunk";
import { useFormik } from "formik";
import { FeedbackSchema } from "@/services/schema.service";
import LikeChatModal from "../LikeChat/LikeChat";

const DislikeChatModal = NiceModal.create(({ ...props }: any) => {
    const modal = useModal();
    const dispatch = useDispatch()
    const modalCloseHandler = () => {
        modal.hide()
    };
    
    const formik = useFormik({
        initialValues: {
            feedback: "",
        },
        validationSchema: FeedbackSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            //@ts-ignore
            dispatch(chatFeedbackAsync({
                react: 'UnLike',
                feedback: values.feedback,
                query: props.query,
                response: props.response
            }))
            modal.hide()
            formik.resetForm()
            NiceModal.show(LikeChatModal)
        },
    });
    
    return (
        <BasicModal
            hideCloseButton={true}
            hide={modal.hide}
            show={modal.visible}
            className="!rounded-xl sm:w-[32.125rem]"
        >
            <>
                <div className="flex justify-between p-4 ps-8">
                    <p className="font-bold text-2xl pt-4">Share your feedback</p>
                    <CloseIcon stroke="#A3A4A6"
                        onClick={modalCloseHandler}
                        className="h-6 w-6 cursor-pointer" />
                </div>
                <form onSubmit={formik.handleSubmit} className="p-4 sm:p-8 !pt-0">
                    <p className="text-theme-gray-325 fs-16 mb-8">{"We appreciate your valuable input! Your feedback helps us enhance our services"}</p>
                    <Textarea
                        rows={8}
                        placeholder="Write you feedback"
                        labelClass="left-1"
                        className="mb-6"
                        name="feedback"
                        formik={formik}
                    />
                    <Button type="submit" variant="black" size="large">
                        Submit
                    </Button>
                </form>
            </>
        </BasicModal>
    );
});

export default DislikeChatModal;
