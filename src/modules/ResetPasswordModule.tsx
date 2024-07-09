import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import Image from "next/image";
import React, { useEffect } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { AutoFocusOnFirstInput } from "@/components/Microservices/microservices";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userResetPasswordAsync } from "@/services/auth/asyncThunk";
import ls from "localstorage-slim";
import { setReset } from "@/redux/slices/userSlice";
import ResetSuccessModal from "@/components/Modals/ResetSuccessModal/ResetSuccessModal";
import { ChangePasswordSchema } from "@/services/schema.service";
import { useRouter } from "next/router";

const ResetPasswordModule = () => {
  const dispatch = useDispatch();
  const { isLoading, resetSuccess } = useSelector((state: any) => state.user);
  const router = useRouter();
  const ShowModal = () => {
    NiceModal.show(ResetSuccessModal, {
      title: "Password Reset Successfully!",
      description: "Congratulations, you have successfully reset your password",
      buttonText: "Continue",
    });
  };
  useEffect(() => {
    AutoFocusOnFirstInput();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values, { setSubmitting }) => {
      const request: any = ls.get("request", { decrypt: true });
      dispatch(
        //@ts-ignore
        userResetPasswordAsync({
          otp: request?.otp,
          email: request?.email,
          ...values,
        })
      );
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (resetSuccess) {
      //@ts-ignore
      dispatch(setReset(false));
      router.push("/login");
      ShowModal();
    }
  }, [resetSuccess]);

  return (
    <div className="login-screen withOutAuth-container">
      <div
        className="left withOutAuth-leftContainer"
        aria-hidden={true}
      >
        <Image
          src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg"
          height={80}
          width={208}
          alt="capital cortex logo"
          aria-label="capital cortex company logo"
        />

      </div>
      <div className="w-full bg-[url('https://capitalcortstorage.blob.core.windows.net/app-assets/washington.jpg')] lg:bg-none bg-cover">
        <form
          onSubmit={formik.handleSubmit}
          className="h-full"
        >
            <fieldset className="field-set-parent">
              <Image
                src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg"
                height={80}
                width={208}
                alt="capital cortex logo"
                aria-label="capital cortex company logo"
                className="block lg:hidden mx-auto"
              />
                <h1 className="w-full text-center lg:text-start h1 font-semibold text-white lg:text-theme-gray-575">Reset Password</h1>
                <p className="text-center lg:text-start text-white lg:text-theme-gray-400">Please enter new password below to reset.</p>
              <Input
                aria-label="New password input"
                placeholder="New Password"
                formik={formik}
                type="password"
                name="password"
              />
              <Input
                aria-label="Confirm password input"
                placeholder="Confirm Password"
                formik={formik}
                type="password"
                name="confirm_password"
              />
              <Button
                type="submit"
                disabled={isLoading}
                variant="black"
                size="medium"
                className="w-full rounded-lg"
              >
                Reset
              </Button>
            </fieldset>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordModule;
