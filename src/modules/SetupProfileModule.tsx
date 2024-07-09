import Button from "@/components/Buttons/Button"; 
import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import MultiSelect from "@/components/MultiSelect/MultiSelect"; 
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";  
import { ProfileSetupSchema } from "@/services/schema.service";
import { useDispatch } from "react-redux";
import { userProfileSetupAsync } from "@/services/user/aysncThunk";
import {
  policies,
  campaignTypes,
  strategyGoals,
  regions,
  primaryStakeholders,
  channels,
  preferences,
} from "@/services/data/options.data";
function SetupProfileModule() { 
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);
  // Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      org: "",
      years_exp: 0,
      area_interest: [],
      legislation: [],
      bio: "",
      campaign_type: [],
      strategy_goal: [],
      region: [],
      stakeholders: [],
      com_channel: [],
      collab_initiatives: true,
      network: [],
    },
    validationSchema: ProfileSetupSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (activeStep === totalSteps && formik.dirty) {
        //@ts-ignore
        dispatch(userProfileSetupAsync(values));
        setSubmitting(false);
      }
      activeStep < totalSteps ? setActiveStep(activeStep + 1) : "";
    },
  });
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  const handleForward = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    } else {
      window.location.href = "/home";
    }
  };
  return (
    <div className="max-w-[50.5rem] w-full mx-auto px-4 lg:px-0 py-8">
      <figure className="relative w-40 h-16">
        <Image
          src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-black.svg"
          fill
          alt="capital cortex logo"
          aria-label="capital cortex company logo"
          className="w-full h-full"
        />
      </figure>
      <form onSubmit={formik.handleSubmit} className="mt-16">
        <legend className="h1 font-semibold leading-1">
          Welcome to Capital Cortex!
        </legend>
        <p className="h5 text-theme-gray-400 leading-1 mt-4">
          {"Let's customize your experience."}
        </p>
        <div className="flex w-full items-center justify-between gap-4 mt-12 px-4 lg:mx-0">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`${activeStep === 1
              ? "bg-theme text-white"
              : "bg-theme-gray-75 text-theme-gray-575"
              }  flex-shrink-0 h-8 w-8 font-bold rounded-full flex justify-center items-center`}
          >
            1
          </button>
          <hr className="bg-theme-gray-75 h-[2px] w-full border-none" />
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`${activeStep === 2
              ? "bg-theme text-white"
              : "bg-theme-gray-75 text-theme-gray-575"
              }  flex-shrink-0 h-8 w-8 font-bold rounded-full flex justify-center items-center`}
          >
            2
          </button>
          <hr className="bg-theme-gray-75 h-[2px] w-full border-none" />

          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`${activeStep === 3
              ? "bg-theme text-white"
              : "bg-theme-gray-75 text-theme-gray-575"
              }  flex-shrink-0 h-8 w-8 font-bold rounded-full flex justify-center items-center`}
          >
            3
          </button>
        </div>
        <div className="hidden lg:flex gap-4 overflow-x-scroll justify-between w-full mt-4 scrollbar-hidden">
          <p className="h4 font-medium">Professional Information</p>
          <p className="h4 font-medium">Campaign & Strategy Preference</p>
          <p className="h4 font-medium">Collaboration & Networking</p>
        </div>
        <div className="block lg:hidden">
          {activeStep === 1 ? (
            <p className="h4 font-medium text-center mt-4">
              Professional Information
            </p>
          ) : (
            ""
          )}
          {activeStep === 2 ? (
            <p className="h4 font-medium text-center mt-4">
              Campaign & Strategy Preference
            </p>
          ) : (
            ""
          )}
          {activeStep === 3 ? (
            <p className="h4 font-medium text-center mt-4">
              Collaboration & Networking
            </p>
          ) : (
            ""
          )}
        </div>

        {activeStep === 1 ? (
          <div className="flex flex-wrap justify-between gap-6 mt-10 min-h-[23rem]">
            <Input
              formik={formik}
              name="title"
              placeholder="Job Title"
              className="w-full lg:min-w-[24.5rem]"
              parentClass="w-full lg:w-auto"
            />
            <Input
              formik={formik}
              name="org"
              placeholder="Organization"
              className="w-full lg:min-w-[24.5rem]"
              parentClass="w-full lg:w-auto"
            />
            <Input
              formik={formik}
              name="years_exp"
              placeholder="Years of Experience in Public Policy"
              className="w-full lg:min-w-[24.5rem]"
              parentClass="w-full lg:w-auto"
              type="number"
            />
            <MultiSelect
              instanceId="area_interest"
              isMulti
              name="area_interest"
              formik={formik}
              placeholder="Policy Areas of Interest"
              values={policies}
              value={formik.values.area_interest.map((x) => {
                return { label: x, value: x };
              })}
              className="border-theme-gray-75"
              parentClass="w-full lg:w-[24.5rem]"
            />
            <MultiSelect
              formik={formik}
              instanceId="legislation"
              name="legislation"
              isMulti
              placeholder="Legislation Focus"
              values={policies}
              value={formik.values.legislation.map((x) => {
                return { label: x, value: x };
              })}
              className="border-theme-gray-75"
              parentClass="w-full"
            />
            <Textarea
              name="bio"
              formik={formik}
              rows={4}
              autoResize={false}
              parentClass="w-full"
              placeholder="Bio/About Me"
            />
          </div>
        ) : (
          ""
        )}
        {activeStep === 2 ? (
          <div className="mt-10 min-h-[23rem]">
            <div className="flex flex-wrap justify-between items-start gap-6 mb-6">
              <MultiSelect
                isMulti
                formik={formik}
                instanceId="campaign_type"
                name="campaign_type"
                placeholder="Preferred Campaign Type"
                values={campaignTypes}
                value={formik.values.campaign_type.map((x) => {
                  return { label: x, value: x };
                })}
                className="border-theme-gray-75"
                parentClass="w-full lg:w-[24.5rem] h-full"
              />
              <MultiSelect
                formik={formik}
                instanceId="strategy_goal"
                name="strategy_goal"
                isMulti
                placeholder="Strategy Goals"
                values={strategyGoals}
                value={formik.values.strategy_goal.map((x) => {
                  return { label: x, value: x };
                })}
                className="border-theme-gray-75"
                parentClass="w-full lg:w-[24.5rem] h-full"
              />
            </div>
            <MultiSelect
              isMulti
              formik={formik}
              instanceId="region"
              name="region"
              placeholder="Region or Area of Policy Focus"
              values={regions}
              value={formik.values.region.map((x) => {
                return { label: x, value: x };
              })}
              className="border-theme-gray-75"
              parentClass="w-full"
            />
          </div>
        ) : (
          ""
        )}
        {activeStep === 3 ? (
          <div className="mt-10 min-h-[23rem]">
            <div className="flex flex-wrap justify-between items-start gap-6 mb-6">
              <MultiSelect
                isMulti
                formik={formik}
                instanceId="stakeholders"
                name="stakeholders"
                placeholder="Primary Stakeholders"
                values={primaryStakeholders}
                value={formik.values.stakeholders.map((x) => {
                  return { label: x, value: x };
                })}
                className="border-theme-gray-75"
                parentClass="w-full lg:w-[24.5rem]"
              />
              <MultiSelect
                isMulti
                placeholder="Preferred Communication Channels"
                values={channels}
                value={formik.values.com_channel.map((x) => {
                  return { label: x, value: x };
                })}
                formik={formik}
                instanceId="com_channel"
                name="com_channel"
                className="border-theme-gray-75"
                parentClass="w-full lg:w-[24.5rem]"
              />
            </div>
            <div className="flex flex-wrap justify-between items-start gap-6">
              <MultiSelect
                formik={formik}
                instanceId="collab_initiatives"
                name="collab_initiatives"
                placeholder="Interest in Collaborative Initiatives"
                values={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
                value={{
                  value: formik.values.collab_initiatives,
                  label: formik.values.collab_initiatives ? "Yes" : "No",
                }}
                className="border-theme-gray-75"
                parentClass="w-full lg:w-[24.5rem]"
              />
              <MultiSelect
                isMulti
                formik={formik}
                instanceId="network"
                name="network"
                placeholder="Networking Preferences"
                values={preferences}
                value={formik.values.network.map((x) => {
                  return { label: x, value: x };
                })}
                className="border-theme-gray-75"
                parentClass="w-full lg:w-[24.5rem]"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-full flex justify-between items-center mt-14">
          {
            activeStep != 1 && <Button
              onClick={() => handleBack()}
              type="button"
              className="md:w-50 font-bold rounded-lg"
              size="large"
              variant="black"
            >
              Back
            </Button>
          }

          <div className="w-full flex justify-end gap-5">
            <Button
              onClick={() => handleForward()}
              type="button"
              className="sm:w-50 font-bold"
              size="small"
              variant="white"
            >
              Skip
            </Button>
            <Button
              onClick={() => formik.handleSubmit}
              type="submit"
              className="md:w-50 font-bold rounded-lg"
              size="large"
              variant="black"
            >
              {activeStep === totalSteps ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SetupProfileModule;
