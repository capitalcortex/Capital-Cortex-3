import Button from "@/components/Buttons/Button";
import Checkbox from "@/components/Input/Checkbox";
import Input from "@/components/Input/Input";
import { GoogleIcon, LinkedinIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import NiceModal from "@ebay/nice-modal-react";
import SuccessModal from "@/components/Modals/SuccessModal/SuccessModal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { socialSignInAsync, userSignUpAsync } from "@/services/auth/asyncThunk";
import { setSignUp } from "@/redux/slices/userSlice";
import { SignupSchema } from "@/services/schema.service";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import Toast from "@/components/Toast";
import { AppDispatch } from "@/redux/store";
interface FormValues {
  fullname: string,
  email: string,
  password: string,
  conditions: boolean,
}
const RegisterModule = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, signUpSuccess } = useSelector((state: any) => state.user);
  const router = useRouter();
  const ShowModal = () => {
    NiceModal.show(SuccessModal, {
      title: "Sign Up Successfully!",
      description: "Congratulations, you have successfully signed up",
      buttonText: "Continue",
    });
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      conditions: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        userSignUpAsync({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          conditions: values.conditions,
        })
      );
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (signUpSuccess) {
      //@ts-ignore
      dispatch(setSignUp(false));
      router.push("/setup-profile");
      ShowModal();
    }
  }, [signUpSuccess]);

  const handleError = (message: string) => {
    Toast.fire({
      icon: "error",
      title: message,
    })
}

  const googleAuthenticationHandler = useGoogleLogin({
    onSuccess: (res) => {
      dispatch(
        socialSignInAsync({
          account: "google",
          access_token: res?.access_token || "",
        })
      );
    },
    onError: (error) => {
      handleError("Error while login");
    },
  });

  const { linkedInLogin } = useLinkedIn({
    clientId: `${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}`,
    scope: "email profile openid",
    redirectUri: `${typeof window === "object" && window.location.origin
      }/linkedin`,
    onSuccess: (code) => {
      const origin = typeof window === "object" ? window.location.origin : "";
      dispatch(
        socialSignInAsync({
          account: "linkedin",
          access_token: code,
          url: `${origin}/linkedin`
        })
      );
    },
    onError: (error) => {
      handleError("Error while login");
    },
  });

  return (
    <div className="register-screen withOutAuth-container">
      <div className="left withOutAuth-leftContainer" aria-hidden={true}>
        <Image
          src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg"
          height={80}
          width={208}
          alt="capital cortex logo"
          aria-label="capital cortex company logo"
          className="block lg:hidden mx-auto lg:mx-0"
        />
        {/* <text className="">
          {"Public Policy and Government Affairs AI Assistant"}
        </text> */}
      </div>
      <div className="w-full bg-[url('https://capitalcortstorage.blob.core.windows.net/app-assets/london.jpg')] lg:bg-none bg-cover">

        <div
          className="form__container"
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
            <h1 className="w-full text-center lg:text-start h1 font-semibold text-white lg:text-theme-gray-575">
            Welcome to Capital Cortex!
            </h1>
            
            <div className="flex w-full gap-2">
              <Button
                variant="gray"
                className="w-full min-w-0"
                onClick={() => googleAuthenticationHandler()}
              >
                <span aria-hidden={true}>
                  <GoogleIcon />
                </span>
                <p className="h5 font-semibold social-login">
                  Continue with Google
                </p>
              </Button>
              <Button
                onClick={linkedInLogin}
                variant="gray"
                className="w-full min-w-0"
              >
                <span aria-hidden={true}>
                  <LinkedinIcon />
                </span>
                <span className="h5 font-semibold social-login">
                  Continue with LinkedIn
                </span>
              </Button>
            </div>
            <div className=" w-full flex gap-4 items-center ">
              <hr
                aria-hidden={true}
                className="text-theme-gray-125 h-1 w-full"
              />
              <p className="h6 font-bold text-white lg:text-theme-gray-575">
                OR
              </p>
              <hr
                aria-hidden={true}
                className="text-theme-gray-125 h-1 w-full"
              />
            </div>
            <p className="text-center lg:text-start text-white lg:text-theme-gray-400">
              Please enter details below to sign up
            </p>
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="Full Name*"
                aria-label="Fullname input"
                placeholder="Enter your name"
                formik={formik}
                type="text"
                name="fullname"
                parentClass="mb-6"
              />
              <Input
                id="Email*"
                aria-label="Email input"
                placeholder="Enter Your Email"
                formik={formik}
                parentClass="mb-6"
                type="email"
                name="email"
              />
              <Input
                id="Password*"
                aria-label="Password input"
                placeholder="Create a Password"
                parentClass="mb-6"
                formik={formik}
                type="password"
                name="password"
              />
              <div className="flex flex-wrap gap-2 w-full justify-between mb-6">
                <Checkbox
                  ariaLabel="remember me checkbox"
                  aria-label="checkbox input"
                  onChange={formik.handleChange}
                  value={formik.values.conditions}
                  name="conditions"
                >
                  <p
                    className={`text-white lg:text-theme-gray-400 user-select-none`}
                  >
                    I agree to the{" "}
                    <Link
                      target="_blank"
                      href="/terms-of-service"
                      className="font-bold text-white lg:text-theme-gray-575"
                    >
                      Terms of Service
                    </Link>
                    &nbsp;&&nbsp;
                    <Link
                      target="_blank"
                      href="/privacy-policy"
                      className="font-bold text-white lg:text-theme-gray-575"
                    >
                      Privacy Policy.
                    </Link>
                  </p>
                </Checkbox>
                {/* <Link
                  aria-label="forgot password link "
                  className="font-medium user-select-none text-white lg:text-theme-gray-575"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link> */}
              </div>
              <Button
                type="submit"
                disabled={isLoading || Object.keys(formik.errors).length > 0}
                variant="black"
                className="w-full rounded-lg mb-6"
              >
                {
                  isLoading ? (<span className="ml-2">Loading ...</span>) : ('Sign Up')
                }
              </Button>
              <p className="text-white lg:text-theme-gray-400 font-normal text-center">
                Already have an account?&nbsp;
                <Link
                  href="/login"
                  className="font-bold text-white lg:text-theme-gray-575"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
export default RegisterModule;
