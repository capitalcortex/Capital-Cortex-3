import Button from "@/components/Buttons/Button";
import { DummyUserIcon } from "@/components/Icons";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
// import {
//   CountryData,
//   ObjectiveData,
//   RoleData,
//   SectorData,
// } from "@/services/data/options.data";
import Textarea from "@/components/Input/Textarea";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userEditProfileAsync } from "@/services/user/aysncThunk";
import { EditProfileSchema } from "@/services/schema.service";
import Toast from "@/components/Toast";
import azureStorage from "@/services/azureStorage";
import { setLoading } from "@/redux/slices/userSlice";
import { ImSpinner9 } from "react-icons/im";
import ls from "localstorage-slim";
const EditProfileForm = () => {
  const token = ls.get("access_token", { decrypt: true });
  const { isLoading, profile, metaData } = useSelector((state: any) => state.user);
  const [newURL, setNewURL] = useState("");
  const [avatar, setAvatar] = useState(profile?.avatar);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullname: profile?.fullname || "",
      only_avatar: false,
      role: profile?.role || "",
      country: profile?.country || "",
      sector: profile?.sector || [],
      objective: profile?.objective || "",
      bio: profile?.bio || "",
    },
    validationSchema: EditProfileSchema,
    onSubmit: (values, { setSubmitting }) => {
      // @ts-ignore
      dispatch(userEditProfileAsync(values));
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setFileImg({
      preview: "",
      file: {},
    });
    if (newURL !== "") {
      setAvatar(newURL);
      setNewURL("");
    }
    
  }, [profile, newURL]);

  const [fileImg, setFileImg] = useState<any>({
    preview: "",
    file: {},
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
      setFileImg({
        preview: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  };

  const handleUpload = async () => {
    //@ts-ignore
    dispatch(setLoading(true));
    if (profile?.avatar != "") await azureStorage.deleteFile(profile?.avatar);
    let file_url = await azureStorage.uploadFile(fileImg.file);
    setNewURL(file_url);
    dispatch(
      //@ts-ignore
      userEditProfileAsync({
        avatar: file_url,
        only_avatar: true,
      })
    );
  };


  return (
    <>
      {Object.keys(profile).length > 0 ? (
        <form onSubmit={formik.handleSubmit}>
          <legend className="h1 font-semibold">Edit Profile</legend>
          <p className="text-theme-gray-400 mt-4">
            Enter the details below to complete your profile.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-8 mt-8">
            {!fileImg.preview ? (
              avatar != "" ? (
                <div className="relative h-30 w-30">
                  <Image
                    src={avatar}
                    alt="user photo"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={avatar}
                    className="object-cover rounded-full w-auto h-auto"
                  />
                </div>
              ) : (
                <DummyUserIcon className="h-30 w-30" />
              )
            ) : (
              <div className="relative h-30 w-30">
                <Image
                  unoptimized
                  id="profilePhoto"
                  src={fileImg.preview}
                  alt="user photo"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={fileImg.preview}
                  className="object-cover rounded-full w-auto h-auto"
                />
              </div>
            )}
            <div className="flex flex-col justify-center">
              {!fileImg?.preview ? (
                <Button
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  disabled={isLoading}
                  size="medium"
                  as="upload"
                  htmlFor="profilePhotoInput"
                  variant="theme"
                  className="py-3 px-8 font-semibold w-full sm:w-auto rounded-lg"
                >
                  Select Photo
                </Button>
              ) : (
                <Button
                  onClick={handleUpload}
                  disabled={isLoading}
                  size="medium"
                  variant="black"
                  type="button"
                  className="py-3 px-8 font-semibold w-full sm:w-auto rounded-lg"
                >
                  Upload Photo
                </Button>
              )}
              <p className="text-theme-gray-375 mt-6">
                You can upload JPG or PNG image file.
              </p>
            </div>
          </div>
          <fieldset className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6">
            <Input
              formik={formik}
              value={formik.values.fullname}
              name="fullname"
              placeholder="Full Name"
            />
            <Input
              disabled={true}
              name="email"
              value={profile?.email}
              placeholder="Email"
            />
            <MultiSelect
              instanceId="role"
              formik={formik}
              name="role"
              value={formik.values.role ? [{ value: formik.values.role, label: formik.values.role }] : ""}
              values={metaData?.roles.map((ele: any) => {return {value: ele, label: ele}})}
              label={
                <label
                  htmlFor="role"
                  className="absolute p-2 -top-4 left-4 leading-1 bg-white text-theme-gray-275 text-xs"
                >
                  Your Role
                </label>
              }
              placeholder="Your Role"
            />
            <MultiSelect
              formik={formik}
              value={formik.values?.country ? [
                { value: formik.values?.country, label: formik.values.country },
              ] : ""}
              name="country"
              instanceId="country"
              values={Object.keys(metaData?.countries).map(country => ({ value: country, label: country }))}
              label={
                <label
                  htmlFor="Document-Title"
                  className="absolute p-2 -top-4 left-4 leading-1 bg-white text-theme-gray-275 text-xs"
                >
                  Country
                </label>
              }
              placeholder="Country"
            />
            <MultiSelect
              formik={formik}
              name="sector"
              instanceId="sector"
              isMulti={true}
              values={metaData?.sectors.map((ele: any) => {return {value: ele, label: ele}})}
              value={
                formik.values.sector
                  ? formik.values.sector.map((x: String) => {
                    return { value: x, label: x };
                  })
                  : []
              }
              label={
                <label
                  htmlFor="Document-Title"
                  className="absolute p-2 -top-4 left-4 leading-1 bg-white text-theme-gray-275 text-xs"
                >
                  Related Sector to You
                </label>
              }
              placeholder="Related Sector to You"
            />
            <MultiSelect
              formik={formik}
              name="objective"
              values={metaData?.objectives.map((ele: any) => {return {value: ele, label: ele}})}
              value={formik.values.objective ? [
                {
                  value: formik.values.objective,
                  label: formik.values.objective,
                },
              ] : ""}
              label={
                <label
                  htmlFor="Document-Title"
                  className="absolute p-2 -top-4 left-4 leading-1 bg-white text-theme-gray-275 text-xs"
                >
                  Your Objective
                </label>
              }
              placeholder="Manage Stakeholder"
            />
          </fieldset>
          <Textarea
            value={formik.values.bio}
            formik={formik}
            name="bio"
            rows={5}
            placeholder="Bio/About"
            className="mt-8 w-full"
          />
          <div className="w-full flex justify-end mt-8">
            <Button
              onClick={() => {
                formik.resetForm();
              }}
              disabled={isLoading || !formik.dirty}
              type="button"
              className="w-50 font-bold"
              size="large"
              variant="white"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || !formik.dirty}
              onClick={formik.handleSubmit}
              type="submit"
              className="w-50 font-bold rounded-lg"
              size="large"
              variant="black"
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center items-center h-full">
          <ImSpinner9 className="text-5xl animate-spin text-theme" />
        </div>
      )}
    </>
  );
};

export default EditProfileForm;
