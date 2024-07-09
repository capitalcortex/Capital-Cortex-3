import Button from "@/components/Buttons/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AutoFocusOnFirstInput } from "@/components/Microservices/microservices";
import OTPInput from "react-otp-input";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ls from "localstorage-slim";
import {
  userForgetRequestAsync,
  userVerifyOTPAsync,
} from "@/services/auth/asyncThunk";
import { setEmail, setOTP } from "@/redux/slices/userSlice";
import Toast from "@/components/Toast";

const VerifyEmailModule = () => {
  const { isLoading, emailSent } = useSelector((state: any) => state.user);
  const [request, setRequest] = useState({ email: "" });
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const obj = ls.get("request", { decrypt: true });
    if (obj) {
      //@ts-ignore
      setRequest(obj);
    }
    AutoFocusOnFirstInput();
  }, []);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      //@ts-ignore
      dispatch(setOTP(otp));
      //@ts-ignore
      dispatch(userVerifyOTPAsync({ otp: otp }));
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (emailSent) {
      //@ts-ignore
      dispatch(setEmail(false));
      Toast.fire({ icon: "success", title: "OTP Sent Successfully" });
    }
  }, [emailSent]);

  const handleResend = () => {
    const obj = ls.get("request", { decrypt: true });
    //@ts-ignore
    dispatch(userForgetRequestAsync({ email: obj?.email }));
    setOtp("");
  };
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
          aria-label="Capital cortex company logo"
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
            <h1 className="w-full text-center lg:text-start h1 font-semibold text-white lg:text-theme-gray-575">Email Verification</h1>
            <p className="text-center lg:text-start text-white lg:text-theme-gray-400">We have sent a verification code to email address {request?.email}</p>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
              inputType="number"
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
              inputStyle={{
                width: "100%",
                color: "theme-gray-575",
                border: "1px solid #E8E8E9",
                borderRadius: "8px",
                padding: "1.25rem 0rem",
                transitionDuration: "1000ms",
              }}
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="black"
              size="medium"
              className="w-full rounded-lg mb-8"
            >
              Verify
            </Button>
            <p className="text-white lg:text-theme-gray-400 font-normal text-center">
              Didn’t received?&nbsp;&nbsp;
              <button
                onClick={handleResend}
                type="button"
                className="font-bold lg:text-theme-gray-575"
              >
                Resend OTP
              </button>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default VerifyEmailModule;
