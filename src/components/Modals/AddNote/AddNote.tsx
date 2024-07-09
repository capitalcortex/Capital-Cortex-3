import React, { useEffect } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Textarea from "@/components/Input/Textarea";
import Button from "@/components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { NotesTouchPointsSchema } from "@/services/schema.service";
import { addNotesTouchpointsAsync } from "@/services/stakeholder/asyncThunk";

const AddNote = NiceModal.create(
    ({ ...props }: any) => {
        const modal = useModal();
        const { stakeholderDetails } = useSelector(
            (state: any) => state.stakeholder
        );
        const dispatch = useDispatch();
        const formik = useFormik({
            initialValues: {
                content: "",
            },
            validationSchema: NotesTouchPointsSchema,
            onSubmit: async (values, { setSubmitting }) => {
                setSubmitting(true);
                const payload = {
                    stakeId: stakeholderDetails?._id,
                    type: 'note',
                    content: values.content,
                };
                //@ts-ignore
                dispatch(addNotesTouchpointsAsync(payload));
                formik.resetForm()
                modal.hide()
            },
        });
        return (
            <BasicModal
                hideCloseButton={props.hideCloseButton}
                hide={modal.hide}
                show={modal.visible}
            >
                <div className="w-[20rem] lg:w-[56.25rem]">
                    <p className="font-bold px-8 py-4 border-b">Add Note</p>
                    <form onSubmit={formik.handleSubmit} className="px-8 py-4">
                        <Textarea
                            rows={8}
                            placeholder="Write here..."
                            className="border-none !px-0"
                            labelClass="!p-0 !left-0"
                            value={formik.values.content}
                            formik={formik}
                            name="content"
                        />
                        <Button
                              variant="black"
                              size="medium"
                              className="px-8 py-3 !min-w-[6rem]"
                              type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </div>
            </BasicModal>
        );
    }
);

export default AddNote;
