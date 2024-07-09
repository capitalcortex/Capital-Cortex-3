import React, { Fragment, useState, useEffect } from "react";
import {
  DeleteIcon,
  DummyUserIcon,
  FilterIcon,
  ImageUploadIcon,
  PlusCircularIcon,
  PlusIcon,
} from "../Icons";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import NiceModal from "@ebay/nice-modal-react";
import AddPhoneModal from "../Modals/AddPhoneModal/AddPhoneModal";
import AddEmailModal from "../Modals/AddEmailModal/AddEmailModal";
import { useFormik } from "formik";
import {
  EditStakeholderSchema,
  StakeholderSchema,
} from "@/services/schema.service";
import { addStakeholderAsync, editStakeholderAsync } from "@/services/stakeholder/asyncThunk";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Toast";
import Image from "next/image";
import azureStorage from "@/services/azureStorage";
import { setStakeholderDetails } from "@/redux/slices/stakeholderSlice";
import MultiSelect from "../MultiSelect/MultiSelect";

interface Iprops {
  isOpen: boolean;
  setIsOpen: Function;
  type?: String;
}
const DynamicCard = ({ isOpen, setIsOpen, type }: Iprops) => {
  const { stakeholderDetails, isLoading } = useSelector((state: any) => state.stakeholder);
  const dispatch = useDispatch()
  const { metaData } = useSelector((state: any) => state.user);

  const formik = useFormik({
    initialValues: {
      file: null,
      rmEmails: [],
      rmNumbers: [],
      adEmails: [],
      adNumbers: [],
      profile_picture: type == "Edit" ? stakeholderDetails?.profile_picture : "",
      fullname: type == "Edit" ? stakeholderDetails?.fullname : "",
      department: type == "Edit" ? stakeholderDetails?.department : "",
      designation: type == "Edit" ? stakeholderDetails?.designation : "",
      country: type == "Edit" ? stakeholderDetails?.country : "",
      state: type == "Edit" ? stakeholderDetails?.state : "",
      project: type == "Edit" ? stakeholderDetails?.project : "",
      emails: type == "Edit" ? stakeholderDetails?.emails : [],
      phone_numbers: type == "Edit" ? stakeholderDetails?.phone_numbers : [],
      bio: type == "Edit" ? stakeholderDetails?.bio : "",
    },
    validationSchema: type == "Edit" ? EditStakeholderSchema : StakeholderSchema,
    onSubmit: async (values, {setSubmitting}) => {
        setSubmitting(true)
        // console.log(values);
        if(type == 'Add'){

            let file_url = values.profile_picture

            if(values.file){
              file_url = await azureStorage.uploadFile(values.file);
              formik.setFieldValue('profile_picture', file_url)
              formik.setFieldValue('file', null)
            }

            const payload = {
              profile_picture: file_url,
              fullname: values.fullname,
              department: values.department,
              designation: values.designation,
              country: values.country,
              state: values.state,
              project: values.project,
              emails: values.emails,
              phone_numbers: values.phone_numbers,
              bio: values.bio
            }

            //@ts-ignore
            dispatch(addStakeholderAsync(payload));
            setIsOpen(!isOpen)
            //@ts-ignore
            dispatch(setStakeholderDetails({}));
        }else if(type == 'Edit'){
            let file_url = values.profile_picture

            if(values.file){
                await azureStorage.deleteFile(values.profile_picture);
                file_url = await azureStorage.uploadFile(values.file);
                formik.setFieldValue('profile_picture', file_url)
            }

            const payload = {
              stakeId: stakeholderDetails?._id,
              profile_picture: file_url,
              fullname: values.fullname,
              department: values.department,
              designation: values.designation,
              country: values.country,
              state: values.state,
              project: values.project,
              emails: {
                addItems: values.adEmails,
                removeItems: values.rmEmails
              },
              phone_numbers: {
                addItems: values.adNumbers,
                removeItems: values.rmNumbers
              },
              bio: values.bio
            }

            //@ts-ignore
            dispatch(editStakeholderAsync((payload)));
            setIsOpen(!isOpen)
            //@ts-ignore
            dispatch(setStakeholderDetails({}));
        }
    },
  });

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      // Use case to handle file type of which can only include JPG, JPEG and PNG
      if (!validImageTypes.includes(fileType)) {
        return Toast.fire({
          icon: "error",
          title: "Only JPG, JPEG and PNG extensions are allowed to upload",
        });
      }
      // Use case to handle file size of max 5 MB
      let file_size = file.size / 1000000;
      if (file_size > 5) {
        return Toast.fire({
          icon: "error",
          title: "File size should be less than 5 MB",
        });
      }
      formik.setFieldValue("file", e.target.files[0]);
      formik.setFieldValue(
        "profile_picture",
        URL.createObjectURL(e.target.files[0])
      );
    }
  };

  const handleAddition = (field: string, value: string) => {
    //@ts-ignore
    let values = [...formik.values[field]]
    if(values.includes(value)){
        Toast.fire({
          icon: "warning",
          title: "Already present",
        });
        return
    }
    values.push(value)
    formik.setFieldValue(field, values)
    if(type == 'Edit'){
        //@ts-ignore
        let adValues = formik.values[field == 'emails' ? 'adEmails' : 'adNumbers']
        //@ts-ignore
        adValues.push(value)
        formik.setFieldValue(field == 'emails' ? 'adEmails' : 'adNumbers', adValues)
    }
  }

  const handleRemove = (field: string, value: string) => {
    //@ts-ignore
    let values = formik.values[field]
    formik.setFieldValue(field, values.filter((item: any) => item !== value))
    //@ts-ignore
    if(formik.values[field == 'emails' ? 'adEmails' : 'adNumbers'].includes(value)){
      return
    }
    if(type == 'Edit'){
      //@ts-ignore
      let rmValues = formik.values[field == 'emails' ? 'rmEmails' : 'rmNumbers']
      //@ts-ignore
      rmValues.push(value)
      formik.setFieldValue(field == 'emails' ? 'rmEmails' : 'rmNumbers', rmValues)
    }
  }

  return (
    <div
      className={`${
        isOpen ? "z-100 h-full w-full top-0 right-0" : ""
      } absolute`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className={`flex flex-col justify-between gap-16 p-8 bg-white z-100 right-0 w-3/4 lg:w-[58.5rem] rounded-l-xl transition-all duration-[600ms] h-full overflow-y-scroll scrollbar-hidden fixed top-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <legend className="font-bold mb-10">{type} Stakeholder</legend>
          <div className="flex flex-col sm:flex-row gap-6 mb-14 items-start">
            {type == "Add" && formik.values.profile_picture == "" ? (
              <figure className="bg-theme-gray-100 rounded-full h-28 w-28 md:h-32 md:w-32 flex flex-shrink-0 justify-center items-center">
                <ImageUploadIcon className="relative h-9 w-9" color="#B1B1B2" />
              </figure>
            ) : (
              <>
                {formik.values.profile_picture == "" ? (
                  <DummyUserIcon className="h-30 w-30" />
                ) : (
                  <Image
                    unoptimized
                    id="stakeholder_picture"
                    src={formik.values.profile_picture}
                    alt="stakeholder photo"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={formik.values.profile_picture}
                    className="!w-28 !h-28 rounded-full md:!h-32 md:!w-32 !relative object-cover"
                  />
                )}
              </>
            )}
            <div>
              <Button
                type="button"
                size="medium"
                variant="black-border"
                className="uppercase rounded-lg mb-4 border-2 font-bold"
                as="upload"
                htmlFor="profile_picture_input"
                onChange={(e) => {
                  handleFileChange(e);
                }}
              >
                upload new photo
              </Button>
              <p className="text-theme-gray-375">
                You can upload JPG, JPEG, or PNG image file
              </p>
              <p className="text-theme-gray-500 font-medium">Max size of 5MB</p>
              <div className="text-theme-red mt-2">
                {/* @ts-ignore */}
                {formik.errors.profile_picture}
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
            <li>
              <Input
                placeholder="Full Name"
                value={formik.values.fullname}
                name="fullname"
                formik={formik}
              />
            </li>
            <li>
              <Input
                placeholder="Department"
                value={formik.values.department}
                name="department"
                formik={formik}
              />
            </li>
            <li>
              <Input
                placeholder="Designation"
                value={formik.values.designation}
                name="designation"
                formik={formik}
              />
            </li>
            <li>
              <MultiSelect
                placeholder="Country"
                label={
                  <label htmlFor="Country" className="theme-input-label">
                    Select Country
                  </label>
                }
                isMulti={false}
                formik={formik}
                name="country"
                value={{value: formik.values.country, label: formik.values.country}}
                values={Object.keys(metaData?.countries).map((Country) => ({
                  value: Country,
                  label: Country,
                }))}
              />
              {/* <Input
                placeholder="Country"
                value={formik.values.country}
                name="country"
                formik={formik}
              /> */}
            </li>
            <li>
              {/* <Input
                placeholder="State/Province"
                value={formik.values.state}
                name="state"
                formik={formik}
              /> */}
              <MultiSelect
                placeholder="State/Province"
                label={
                  <label htmlFor="Country" className="theme-input-label">
                    Select State/Province
                  </label>
                }
                isMulti={false}
                formik={formik}
                name="state"
                value={{value: formik.values.state, label: formik.values.state}}
                values={formik.values.country !== "" ?
                    metaData?.countries[formik.values.country]?.map((city: any) => ({
                      value: city,
                      label: city,
                    }))
                  : []}
              />
            </li>
            <li>
              <Input
                placeholder="Project"
                formik={formik}
                value={formik.values.project}
                name="project"
              />
            </li>
          </ul>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col">
              <li className="border border-theme-gray-125 p-4 rounded-lg">
                <button
                  type="button"
                  onClick={() => NiceModal.show(AddPhoneModal, {handlePhoneNumbers: handleAddition})}
                  className="flex w-full justify-between"
                >
                  <span className="font-semibold">Add Phone</span>
                  <PlusIcon />
                </button>
                {
                  formik.values.phone_numbers.map((phone_number: any, index: number) => (
                      <button key={index} className="flex w-full justify-between mt-6">
                          <span>{phone_number}</span>
                          <DeleteIcon onClick={() => {handleRemove('phone_numbers', phone_number)}} color="#D0312D" />
                      </button>
                  ))
                }
              </li>
              <div className="text-theme-red mt-2">
                {/* @ts-ignore */}
                {formik.errors.phone_numbers}
              </div>
            </div>
            
            <div className="flex flex-col">
              <li className="border border-theme-gray-125 p-4 rounded-lg">
                <button
                  onClick={() => NiceModal.show(AddEmailModal, {handleEmails: handleAddition})}
                  type="button"
                  className="flex w-full justify-between"
                >
                  <span className="font-semibold">Add Email</span>
                  <PlusIcon />
                </button>
                {
                  formik.values.emails.map((email: any, index: number) => (
                      <button key={index} className="flex w-full justify-between mt-6">
                          <span className="max-w-[10rem] sm:max-w-full overflow-hidden text-ellipsis">
                              {email}
                          </span>
                          <DeleteIcon onClick={() => {handleRemove('emails', email)}} color="#D0312D" />
                      </button>
                  ))
                } 
              </li>
              <div className="text-theme-red mt-2">
                {/* @ts-ignore */}
                {formik.errors.emails}
              </div>
            </div>
          </ul>
          <Textarea 
            value={formik.values.bio}
            formik={formik}
            name="bio"
            rows={5}
            placeholder="Bio/About"
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-2">
          <Button
            variant="gray"
            size="medium"
            className="px-8 rounded-lg font-bold"
            onClick={(e: any) => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
          >
            Cancel
          </Button>
          <Button
            className="px-8 rounded-lg font-bold"
            variant="black"
            size="medium"
            type="submit"
            disabled={formik.isSubmitting || isLoading}
            isLoading={formik.isSubmitting || isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DynamicCard;
