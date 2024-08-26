import React from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import { useFormik } from "formik";
import { UpdatePasswordSchema } from "@/services/schema.service";
import { useDispatch, useSelector } from "react-redux";
import { userChangePasswordAsync } from "@/services/user/aysncThunk";
import { ImSpinner9 } from "react-icons/im";
const PasswordTab = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        // @ts-ignore
        dispatch(userChangePasswordAsync(values));
        resetForm();
      } catch (error) {
        console.log('Password Field Error',error)
      } finally {
        setSubmitting(false);
      }
      
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <legend className="h1 font-semibold">Change Password</legend>
      <p className="text-theme-gray-400 mt-4">
        To update your account password, kindly input both your current and new
        passwords below.
      </p>
      <fieldset className="mt-10 flex flex-col gap-6">
        <Input
          name="currentPassword"
          formik={formik}
          type="password"
          placeholder="Current Password"
        />
        <Input
          name="newPassword"
          formik={formik}
          type="password"
          placeholder="New Password"
        />
      </fieldset>
      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={formik.handleReset}
          disabled={!formik.dirty}
          type="button"
          className="w-50 font-bold"
          size="large"
          variant="white"
        >
          Cancel
        </Button>
        <Button
          disabled={!formik.dirty || formik.isSubmitting}
          type="submit"
          className="w-50 font-bold rounded-lg"
          size="large"
          variant="black"
        >
          {
            formik.isSubmitting ? (<span className="absolute inset-0 flex justify-center items-center">
              <ImSpinner9 className="text-white text-xl animate-spin" />
            </span>) : ('Update Password')
          }
        </Button>
      </div>
    </form>
  );
};

export default PasswordTab;
