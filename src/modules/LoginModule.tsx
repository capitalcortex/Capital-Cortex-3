import Button from "@/components/Buttons/Button";
import Checkbox from "@/components/Input/Checkbox";
import Input from "@/components/Input/Input";
import { GoogleIcon, LinkedinIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAsync, socialSignInAsync } from "@/services/auth/asyncThunk";
import ls from "localstorage-slim";
import { LoginSchema } from "@/services/schema.service";
import { useGoogleLogin } from '@react-oauth/google';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import Toast from "@/components/Toast";
import { AppDispatch } from "@/redux/store";
interface RememberObject {
  email: string;
  remember: boolean;
}
interface FormValues {
  email: string;
  password: string;
}
const LoginModule = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [remember, setRemember] = useState(false);
  const { isLoading } = useSelector((state: any) => state.user);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (remember) {
        handleRemember(values?.email);
      }
      await dispatch(userSignInAsync(values));
      setSubmitting(false);
    },
  });

  const handleRemember = (email: string) => {
    const obj = {
      email: email,
      remember: true,
    };
    ls?.set("remember", obj, {
      encrypt: true,
    });
  };

  useEffect(() => {
    const rememberObj = ls.get("remember", { decrypt: true }) as RememberObject | null;
    if (rememberObj && rememberObj?.remember) {
      formik.setFieldValue("email", rememberObj?.email);
      setRemember(rememberObj?.remember);
    }
  }, []);

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
    <div className="login-screen withOutAuth-container">
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
      <div className="w-full bg-[url('https://capitalcortstorage.blob.core.windows.net/app-assets/washington.jpg')] lg:bg-none bg-cover">
        <div className="form__container">
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
              Sign in
            </h1>

            <div className="flex w-full gap-2">
              <Button
                onClick={() => googleAuthenticationHandler()}
                variant="gray"
                className="w-full min-w-0"
              >
                <span aria-hidden={true}>
                  <GoogleIcon />
                </span>
                <span className="h5 font-semibold social-login">
                  Continue with Google
                </span>
              </Button>
              <Button onClick={linkedInLogin} variant="gray" className="w-full min-w-0">
                <span aria-hidden={true}>
                  <LinkedinIcon />
                </span>
                <span className="h5 font-semibold social-login">
                  Continue with LinkedIn
                </span>
              </Button>
            </div>
            <div className="w-full flex gap-4 items-center">
              <hr
                aria-hidden={true}
                className="text-theme-gray-125 h-1 w-full"
              />
              <span className="h6 font-bold text-white lg:text-theme-gray-575">
                OR
              </span>
              <hr
                aria-hidden={true}
                className="text-theme-gray-125 h-1 w-full"
              />
            </div>
            <p className="text-center lg:text-start text-white lg:text-theme-gray-400">
              Please enter details below to sign in
            </p>
            <form onSubmit={formik.handleSubmit} className="w-full">
              <Input
                aria-label="Email input"
                placeholder="Email"
                formik={formik}
                type="email"
                name="email"
                parentClass="mb-6"
              />
              <Input
                aria-label="Password input"
                placeholder="Password"
                formik={formik}
                type="password"
                parentClass="mb-6"
                name="password"
              />
              <div className="flex justify-between mb-6">
                <Checkbox
                  ariaLabel="remember me checkbox"
                  aria-label="Email input"
                  name="remember"
                  onChange={() => {
                    setRemember(!remember);
                  }}
                  value={remember}
                >
                  <p className="text-white lg:text-theme-gray-400 user-select-none">
                    Remember me
                  </p>
                </Checkbox>
                <Link
                  aria-label="forgot password link"
                  className="font-medium text-white lg:text-theme-gray-575"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                className="w-full mb-6"
                type="submit"
                disabled={isLoading}
                variant="black"
              >
                {isLoading ? (<span className="ml-2">Logging in...</span>) : ('Login')}
              </Button>
              <p className="text-theme-gray-50 lg:text-theme-gray-400 font-normal text-center">
                Don’t have an account?&nbsp;
                <Link
                  href="/register"
                  className="font-bold text-white lg:text-theme-gray-575"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
export default LoginModule;
