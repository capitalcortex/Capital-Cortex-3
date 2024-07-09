import Textarea from "@/components/Input/Textarea";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  campaignTypes,
  channels,
  policies,
  preferenceTabs,
  preferences,
  primaryStakeholders,
  regions,
  strategyGoals,
} from "@/services/data/options.data";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import { ProfileSetupSchema } from "@/services/schema.service";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userProfileSetupAsync } from "@/services/user/aysncThunk";
import { ImSpinner9 } from "react-icons/im";

const PreferenceTab = () => {
  const { profile } = useSelector((state: any) => state.user.profile);
  const { isLoading, metaData } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: profile?.title ? profile?.title : "",
      org: profile?.org ? profile?.org : "",
      years_exp: profile?.years_exp ? profile?.years_exp : "",
      area_interest: profile?.area_interest ? profile?.area_interest : [],
      legislation: profile?.legislation ? profile?.legislation : [],
      bio: profile?.bio ? profile?.bio : "",
      campaign_type: profile?.campaign_type ? profile?.campaign_type : [],
      strategy_goal: profile?.strategy_goal ? profile?.strategy_goal : [],
      region: profile?.region ? profile?.region : [],
      stakeholders: profile?.stakeholders ? profile?.stakeholders : [],
      com_channel: profile?.com_channel ? profile?.com_channel : [],
      collab_initiatives: profile?.collab_initiatives
        ? profile?.collab_initiatives
        : false,
      network: profile?.network ? profile?.network : [],
    },
    validationSchema: ProfileSetupSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      //@ts-ignore
      dispatch(userProfileSetupAsync(values));
      setSubmitting(false);
    },
  });

  return (
    <>
      {profile ? (
        <form onSubmit={formik.handleSubmit}>
          <legend className="h1 font-semibold">Preference</legend>
          <p className="text-theme-gray-400 mt-4">
            You can customize your preferences settings here.
          </p>
          <Tab.Group>
            <Tab.List
              as={"div"}
              className="flex border-b border-theme-gray-125 overflow-y-scroll mt-8 scrollbar-hidden"
            >
              {preferenceTabs.map((tab, i) => (
                <Tab
                  as={"div"}
                  className={"focus-visible:outline-none cursor-pointer"}
                  key={i}
                >
                  {({ selected }: any) => (
                    <p
                      className={`${selected
                        ? "border-b-4 border-theme text-theme-gray-575"
                        : "text-theme-gray-400"
                        } font-semibold text-xs sm:text-base mr-4 sm:mr-8 py-4 w-max focus-visible:outline-none whitespace-nowrap capitalize`}
                    >
                      {tab.title}
                    </p>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels as={"div"} className="mt-8">
              <Tab.Panel as={"div"}>
                <div className={"grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"}>
                  <Input formik={formik} name="title" placeholder="Job Title" />
                  <Input
                    formik={formik}
                    name="org"
                    placeholder="Organization"
                  />
                  <Input
                    formik={formik}
                    name="years_exp"
                    placeholder="Years of Experience in Public Policy"
                  />
                  <MultiSelect
                    instanceId="area_interest"
                    isMulti
                    name="area_interest"
                    formik={formik}
                    placeholder="Policy Areas of Interest"
                    label={
                      <label htmlFor="education" className="theme-input-label">
                        Policy Areas of Interest
                      </label>
                    }
                    values={metaData?.area_of_interests.map((ele: any) => {return {value: ele, label: ele}})}
                    value={formik.values.area_interest.map((x: String) => {
                      return { value: x, label: x };
                    })}
                  />
                </div>
                <MultiSelect 
                
                  label={
                    <label htmlFor="education" className="theme-input-label">
                      Legislation Focus
                    </label>
                  }
                  formik={formik}
                  instanceId="legislation"
                  name="legislation"
                  isMulti
                  placeholder="Legislation Focus"
                  values={metaData?.legislations.map((ele: any) => {return {value: ele, label: ele}})}
                  value={formik.values.legislation.map((x: String) => {
                    return { value: x, label: x };
                  })}
                />
                <Textarea
                  name="bio"
                  value={formik.values.bio}
                  formik={formik}
                  className="mt-6"
                  rows={4}
                  placeholder="Bio/About"
                />
              </Tab.Panel>
              <Tab.Panel as={"div"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <MultiSelect
                  
                    isMulti
                    formik={formik}
                    instanceId="campaign_type"
                    name="campaign_type"
                    placeholder="Preferred Campaign Type"
                    label={
                      <label htmlFor="education" className="theme-input-label">
                        Preferred Campaign Type
                      </label>
                    }
                    values={metaData?.campaigns.map((ele: any) => {return {value: ele, label: ele}})}
                    value={formik.values.campaign_type.map((x: String) => {
                      return { value: x, label: x };
                    })}
                    parentClass="w-full"
                  />
                  <MultiSelect
                  
                    formik={formik}
                    instanceId="strategy_goal"
                    name="strategy_goal"
                    isMulti
                    placeholder="Strategy Goals"
                    parentClass="w-full"
                    values={metaData?.strategy_goals.map((ele: any) => {return {value: ele, label: ele}})}
                    value={formik.values.strategy_goal.map((x: String) => {
                      return { value: x, label: x };
                    })}
                    label={
                      <label htmlFor="education" className="theme-input-label">
                        Strategy Goals
                      </label>
                    }
                  />
                </div>
                <MultiSelect
                
                  label={
                    <label htmlFor="education" className="theme-input-label">
                      Region or Area of Policy Focus
                    </label>
                  }
                  isMulti
                  formik={formik}
                  instanceId="region"
                  name="region"
                  placeholder="Region or Area of Policy Focus"
                  values={metaData?.regions.map((ele: any) => {return {value: ele, label: ele}})}
                  value={formik.values.region.map((x: String) => {
                    return { value: x, label: x };
                  })}
                  parentClass="w-full"
                />
              </Tab.Panel>
              <Tab.Panel
                as={"div"}
                className={"grid grid-cols-1 sm:grid-cols-2 gap-6"}
              >
                <MultiSelect
                
                  label={
                    <label htmlFor="education" className="theme-input-label">
                      Primary Stakeholders
                    </label>
                  }
                  isMulti
                  formik={formik}
                  instanceId="stakeholders"
                  name="stakeholders"
                  placeholder="Primary Stakeholders"
                  values={metaData?.stakeholders.map((ele: any) => {return {value: ele, label: ele}})}
                  value={formik.values.stakeholders.map((x: String) => {
                    return { value: x, label: x };
                  })}
                />
                <MultiSelect
                
                  label={
                    <label htmlFor="education" className="theme-input-label">
                      Communication Channels for Engagement
                    </label>
                  }
                  isMulti
                  placeholder="Preferred Communication Channels"
                  values={metaData?.channels.map((ele: any) => {return {value: ele, label: ele}})}
                  value={formik.values.com_channel.map((x: String) => {
                    return { value: x, label: x };
                  })}
                  formik={formik}
                  instanceId="com_channel"
                  name="com_channel"
                />
                <MultiSelect
                
                  label={
                    <label htmlFor="education" className="theme-input-label">
                      Interest in Collaborative Initiatives
                    </label>
                  }
                  formik={formik}
                  instanceId="collab_initiatives"
                  name="collab_initiatives"
                  placeholder="Interest in Collaborative Initiatives"
                  values={metaData?.collab_initiatives.map((ele: any) => {return {value: ele == 'Yes' ? true : false, label: ele}})}
                  value={[
                    {
                      value: formik?.values?.collab_initiatives,
                      label: formik?.values?.collab_initiatives ? "Yes" : "No",
                    },
                  ]}
                />
                <MultiSelect
                
                  label={
                    <label htmlFor="education" className="theme-input-label">
                      Networking Preferences
                    </label>
                  }
                  isMulti
                  formik={formik}
                  instanceId="network"
                  name="network"
                  placeholder="Networking Preferences"
                  values={metaData?.networks.map((ele: any) => {return {value: ele, label: ele}})}
                  value={formik.values.network.map((x: String) => {
                    return { value: x, label: x };
                  })}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="w-full flex justify-end mt-8">
            <Button
              disabled={!formik.dirty || isLoading}
              onClick={() => formik.resetForm()}
              type="button"
              className="w-50 font-bold"
              size="large"
              variant="white"
            >
              Cancel
            </Button>
            <Button
              disabled={!formik.dirty || isLoading}
              onClick={() => formik.handleSubmit}
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

export default PreferenceTab;
