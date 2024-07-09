import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { AutoFocusOnFirstInput } from "@/components/Microservices/microservices";
import { useFormik } from "formik";
import { userForgetRequestAsync } from "@/services/auth/asyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { ResetRequestSchema } from "@/services/schema.service";
import { setEmail } from "@/redux/slices/userSlice";
import VerificationEmailSentModal from "@/components/Modals/VerificationEmailSentModal/VerificationEmailSentModal";
import { useRouter } from "next/router";

const ForgotPasswordModule = () => {
  const { isLoading, emailSent } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const ShowModal = () => {
    NiceModal.show(VerificationEmailSentModal, {
      title: "Email has been sent!",
      description: "We have sent a verification code to email address",
      buttonText: "Continue",
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetRequestSchema,
    onSubmit: (values, { setSubmitting }) => {
      //@ts-ignore
      dispatch(userForgetRequestAsync(values));
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (emailSent) {
      //@ts-ignore
      dispatch(setEmail(false));
      router.push("/verify-email");
      ShowModal();
    }
  }, [emailSent]);

  useEffect(() => {
    AutoFocusOnFirstInput();
  }, []);

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
                <h1 className="w-full text-center lg:text-start h1 font-semibold text-white lg:text-theme-gray-575">Forgot Password</h1>
                <p className="text-center lg:text-start text-white lg:text-theme-gray-400">Please enter email below to reset your account password.</p>
              <Input
                aria-label="Email input"
                placeholder="Email"
                formik={formik}
                type="email"
                name="email"
              />
              <Button
                type="submit"
                disabled={isLoading}
                variant="black"
                size="medium"
                className="w-full rounded-lg"
              >
                Submit
              </Button>
              <p className="text-white lg:text-theme-gray-400 font-normal text-center">
                Remember Password?&nbsp;&nbsp;
                <Link href="/login" className="font-bold lg:text-theme-gray-575">
                  Login
                </Link>
              </p>
            </fieldset>
        </form>
      </div>

    </div>
  );
};
export default ForgotPasswordModule;
