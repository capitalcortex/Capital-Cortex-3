import React, { useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Button from "@/components/Buttons/Button";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/Icons";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import GeneratePlanModal from "../GeneratePlanModal/GeneratePlanModal";
import { useDispatch } from "react-redux";
import {
  documentGenerationAsync,
  generateLegislativeAnalysisAsync,
  generateMeetingBriefAsync,
  generatePolicyBriefAsync,
} from "@/services/documentGeneration/asyncThunk";
import "react-tagsinput/react-tagsinput.css";
import MeetingBriefSteps from "./MeetingBriefSteps";
import Policy360Steps from "./Policy360Steps";
import PolicyBriefSteps from "./PolicyBriefSteps";
import LegislativeReportSteps from "./LegislativeReportSteps";

const CreateNewDocumentModal = NiceModal.create(({ ...props }: any) => {
  const modal = useModal();
  const [totalSteps, setTotalSteps] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const [steps, setSteps] = useState({});
  const modalCloseHandler = () => {
    modal.hide();
  };
  const countries = [{ value: "Canada", label: "Canada" }];
  const analysisSectors = [
    { value: "Policy Maker Profile", label: "Policy Maker Profile" },
    { value: "Meeting Brief", label: "Meeting Brief" },
    { value: "Policy Brief", label: "Policy Brief" },
    { value: "Legislative Analysis", label: "Legislative Analysis" },
    // {
    //   value: "Comparative Analysis Report of Committee / Group of Policymakers",
    //   label: "Comparative Analysis Report of Committee / Group of Policymakers",
    // },
    // { value: "Stakeholder Analysis", label: "Stakeholder Analysis" },
    // { value: "Hearing Summary Report", label: "Hearing Summary Report" },
    // {
    //   value: "Summary of Line of Questioning by a Single Member Across Multiple Hearings",
    //   label: "Summary of Line of Questioning by a Single Member Across Multiple Hearings",
    // },
    // { value: "Public Opinion Surveys", label: "Public Opinion Surveys" },
    // { value: "Political Risk Analysis", label: "Political Risk Analysis" },
    // {
    //   value: "Demographic and Electoral Analysis",
    //   label: "Demographic and Electoral Analysis",
    // },
    // { value: "Issue Tracking Reports", label: "Issue Tracking Reports" },
    // {
    //   value: "Competitive Analysis Reports",
    //   label: "Competitive Analysis Reports",
    // },
    // { value: "Legal Analysis", label: "Legal Analysis" },
    // { value: "Media Analysis", label: "Media Analysis" },
    // { value: "General Products", label: "General Products" },
  ];

  const [emptyValues, setEmptyValues] = useState(false);
  const nextStep = () => {
    setActiveStep(activeStep + 1);
    setEmptyValues(true);
  };
  const dispatch = useDispatch();
  const [FormData, setFormData] = useState({ doc_type: "" });

  const handlePolicy360Generation = () => {
    //@ts-ignore
    dispatch(documentGenerationAsync(FormData));
    handleReset();
    NiceModal.show(GeneratePlanModal);
    NiceModal.hide(CreateNewDocumentModal);
  };

  const handleMeetingBriefGeneration = () => {
    //@ts-ignore
    dispatch(generateMeetingBriefAsync(FormData));
    handleReset();
    NiceModal.show(GeneratePlanModal);
    NiceModal.hide(CreateNewDocumentModal);
  };

  const handlePolicyBriefGeneration = () => {
    //@ts-ignore
    dispatch(generatePolicyBriefAsync(FormData));
    handleReset();
    NiceModal.show(GeneratePlanModal);
    NiceModal.hide(CreateNewDocumentModal);
  };

  const handleLegislativeAnalysisGeneration = () => {
    //@ts-ignore
    dispatch(generateLegislativeAnalysisAsync(FormData));
    handleReset();
    NiceModal.show(GeneratePlanModal);
    NiceModal.hide(CreateNewDocumentModal);
  };

  const handleReset = () => {
    setFormData({ doc_type: "" });
    setActiveStep(1);
  };

  return (
    <BasicModal
      hideCloseButton={props.hideCloseButton}
      hide={modal.hide}
      show={modal.visible}
      className="w-[calc(100vw-32px)]  lg:w-[900px] h-[600px]"
    >
      <div>
        <div className="flex justify-between py-4 px-4 sm:px-8 items-center border-b border-theme-gray-100">
          <p className="font-bold">Create Document</p>
          <CloseIcon
            stroke="#A3A4A6"
            onClick={modalCloseHandler}
            className="h-6 w-6 cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-between h-[543px]">
          {activeStep === 1 ? (
            <div className="p-4 sm:p-8">
              <h2 className="h1 sm:leading-1 font-semibold text-2xl">
                {activeStep}. Choose the type of document you would like Capital Cortex to create for you?
              </h2>
              <p className="mt-2 text-theme-gray-325 sm:pl-5">
                Choose the type of document you would like Capital Cortex to
                analyze.
              </p>
              <form action="" className="mt-10">
                <fieldset>
                  <MultiSelect
                    parentClass="large__select__box"
                    isMulti={false}
                    className="large-select-box"
                    values={analysisSectors}
                    //@ts-ignore
                    value={{
                      label: FormData["doc_type"],
                      value: FormData["doc_type"],
                    }}
                    placeholder="Select Document Type"
                    onChange={(selected: any) => {
                      if (selected.value != "") {
                        //@ts-ignore
                        setSteps((prevState) => ({
                          ...prevState, // Spread the previous state
                          [activeStep]: false, // Add new key-value pair
                        }));
                      } else {
                        //@ts-ignore
                        setSteps((prevState) => ({
                          ...prevState, // Spread the previous state
                          [activeStep]: true, // Add new key-value pair
                        }));
                      }
                      if (selected.value == "Meeting Brief") {
                        setTotalSteps(6);
                        setFormData((prevState) => ({
                          ...prevState,
                          ["doc_type"]: selected.value,
                          title: "",
                          country: "",
                          our_side: [],
                          other_side: [],
                          // purpose: "",
                          objectives: "",
                          // talking_points: "",
                          // background: "",
                        }));
                      } else if (selected.value == "Policy Brief") {
                        setTotalSteps(5);
                        setFormData((prevState) => ({
                          ...prevState,
                          ["doc_type"]: selected.value,
                          title: "",
                          country: "",
                          prompt_details: "",
                          policy_option: "",
                        }));
                      } else {
                        setTotalSteps(4);
                        setFormData((prevState) => ({
                          ...prevState,
                          ["doc_type"]: selected.value,
                          title: "",
                          country: "",
                          prompt_details: "",
                        }));
                      }
                    }}
                    label={
                      <label
                        htmlFor="Document-Title"
                        className="absolute top-5 left-7 leading-1 text-sm"
                      >
                        Type of Document
                      </label>
                    }
                  />
                </fieldset>
              </form>
              <Button
                onClick={() => nextStep()}
                variant="black"
                className="py-3 px-8 mt-6 min-w-[6rem] leading-[1.15]"
                //@ts-ignore
                disabled={!FormData["doc_type"] || FormData["doc_type"] == ""}
              >
                Next
              </Button>
            </div>
          ) : (
            ""
          )}
          {/* @ts-ignore */}
          {FormData.doc_type == "Policy Maker Profile" && (
            <Policy360Steps
              activeStep={activeStep}
              FormData={FormData}
              setFormData={setFormData}
              nextStep={nextStep}
              setSteps={setSteps}
              countries={countries}
              handlePolicy360Generation={handlePolicy360Generation}
            />
          )}
          {/* @ts-ignore */}
          {FormData.doc_type == "Meeting Brief" && (
            <MeetingBriefSteps
              activeStep={activeStep}
              FormData={FormData}
              setFormData={setFormData}
              nextStep={nextStep}
              setSteps={setSteps}
              countries={countries}
              handleMeetingBriefGeneration={handleMeetingBriefGeneration}
            />
          )}
          {/* @ts-ignore */}
          {FormData.doc_type == "Policy Brief" && (
            <PolicyBriefSteps
              activeStep={activeStep}
              FormData={FormData}
              setFormData={setFormData}
              nextStep={nextStep}
              setSteps={setSteps}
              countries={countries}
              handlePolicyBriefGeneration={handlePolicyBriefGeneration}
            />
          )}
          {/* @ts-ignore */}
          {FormData.doc_type == "Legislative Analysis" && (
            <LegislativeReportSteps
              activeStep={activeStep}
              FormData={FormData}
              setFormData={setFormData}
              nextStep={nextStep}
              setSteps={setSteps}
              countries={countries}
              handleLegislativeAnalysisGeneration={handleLegislativeAnalysisGeneration}
            />
          )}
          <div className="w-full flex gap-4 py-4 px-4 sm:px-8 items-center border-t border-theme-gray-100">
            <Button
              //@ts-ignore
              disabled={activeStep < 2}
              onClick={() => setActiveStep(activeStep - 1)}
              className="min-w-max p-0"
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              onClick={() => setActiveStep(activeStep + 1)}
              //@ts-ignore
              disabled={
                activeStep > totalSteps - 1 ||
                !steps.hasOwnProperty(activeStep) ||
                //@ts-ignore
                steps[activeStep]
              }
              className="min-w-max p-0"
            >
              <ArrowRightIcon />
            </Button>
            <p className="text-theme-gray-325">
              0{activeStep}&nbsp;/&nbsp;0{totalSteps}
            </p>
          </div>
        </div>
      </div>
    </BasicModal>
  );
});

export default CreateNewDocumentModal;
