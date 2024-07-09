import React, { useEffect } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { CloseIcon, DeleteIcon, PlusIcon } from "@/components/Icons";
import Input from "@/components/Input/Input";
import AddPhoneModal from "../AddPhoneModal/AddPhoneModal";
import AddEmailModal from "../AddEmailModal/AddEmailModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { StakeholderEmployeeSchema } from "@/services/schema.service";
import { addAssistantAsync } from "@/services/stakeholder/asyncThunk";
import Toast from "@/components/Toast";

const AddStakeholderEmployee = NiceModal.create(({ ...props }: any) => {
  const modal = useModal();
  const { stakeholderDetails } = useSelector(
    (state: any) => state.stakeholder
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      department: "",
      designation: "",
      emails: [],
      phone_numbers: [],
    },
    validationSchema: StakeholderEmployeeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const payload = {
        stakeId: stakeholderDetails?._id,
        type: props.type,
        fullname: values.fullname,
        department: values.department,
        designation: values.designation,
        emails: values.emails,
        phone_numbers: values.phone_numbers,
      };
      //@ts-ignore
      dispatch(addAssistantAsync(payload));
      formik.resetForm()
      modal.hide()
    },
  });

  const handleAddition = (field: string, value: string) => {
    //@ts-ignore
    let values = [...formik.values[field]]
    if (values.includes(value)) {
      Toast.fire({
        icon: "warning",
        title: "Already present",
      });
      return
    }
    values.push(value)
    formik.setFieldValue(field, values)
  }

  const handleRemove = (field: string, value: string) => {
    //@ts-ignore
    let values = formik.values[field]
    formik.setFieldValue(field, values.filter((item: any) => item !== value))
  }

  return (
    <BasicModal
      id="addStakeholderEmployee"
      hideCloseButton={props.hideCloseButton}
      hide={modal.hide}
      show={modal.visible}
    >
      <form onSubmit={formik.handleSubmit} className="w-full lg:w-[40rem] p-8 ">
        <p className="font-bold ">
          {props.type == "assistant"
            ? "Add Secretaries / Assistants"
            : "Advisor"}
        </p>
        <p className="text-theme-gray-325 mb-12">
          To add a{" "}
          {props.type == "assistant" ? "secretary/assistant" : "advisor"},
          kindly provide the required information below.
        </p>
        <Input
          placeholder="Full Name"
          value={formik.values.fullname}
          name="fullname"
          formik={formik}
          parentClass="w-full"
        />
        <div className="flex gap-4 my-4">
          <Input
            placeholder="Department"
            value={formik.values.department}
            name="department"
            formik={formik}
            parentClass="w-1/2"
          />
          <Input
            placeholder="Designation"
            value={formik.values.designation}
            name="designation"
            formik={formik}
            parentClass="w-1/2"
          />
        </div>
        <div className="border border-theme-gray-125 p-4 rounded-lg mb-2">
          <button
            type="button"
            onClick={() => {
              // NiceModal.hide(AddStakeholderEmployee)
              NiceModal.show(AddPhoneModal, { handlePhoneNumbers: handleAddition, nestedModal: true })

            }}
            className="flex w-full justify-between"
          >
            <span className="font-semibold">Add Phone</span>
            <PlusIcon />
          </button>
          {formik.values.phone_numbers.map((number: string, index: number) => (
            <button key={index} className="flex w-full justify-between mt-6">
              <span>{number}</span>
              <DeleteIcon onClick={() => { handleRemove('phone_numbers', number) }} color="#D0312D" />
            </button>
          ))}
        </div>
        <div className="text-theme-red mb-2">
          {formik.errors.phone_numbers}
        </div>
        <div className="border border-theme-gray-125 p-4 rounded-lg mb-2">
          <button
            onClick={() => NiceModal.show(AddEmailModal, { handleEmails: handleAddition })}
            type="button"
            className="flex w-full justify-between"
          >
            <span className="font-semibold">Add Email</span>
            <PlusIcon />
          </button>
          {formik.values.emails.map((email: string, index: number) => (
            <button key={index} className="flex w-full justify-between mt-6">
              <span>{email}</span>
              <DeleteIcon onClick={() => { handleRemove('emails', email) }} color="#D0312D" />
            </button>
          ))}
        </div>
        <div className="text-theme-red mb-4">
          {formik.errors.emails}
        </div>
        <div className="flex gap-4">
          <Button
            onClick={(e: any) => {
              e.preventDefault()
              formik.resetForm()
              modal.hide()
            }}
            variant="gray"
            className="min-w-[6rem] w-1/2 font-bold"
            size="medium"
          >
            Cancel
          </Button>
          <Button
            variant="black"
            className="min-w-[6rem] w-1/2 font-bold"
            size="medium"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </BasicModal>
  );
});

export default AddStakeholderEmployee;
