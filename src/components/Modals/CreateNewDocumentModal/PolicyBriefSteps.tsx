import React from "react";
import Button from "@/components/Buttons/Button";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Textarea from "@/components/Input/Textarea";
import "react-tagsinput/react-tagsinput.css";

function PolicyBriefSteps({
  activeStep,
  FormData,
  setFormData,
  nextStep,
  setSteps,
  countries,
  handlePolicyBriefGeneration,
}: any) {
  return (
    <div>
      {activeStep === 2 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl mb-2">
            {/* @ts-ignore */}
            {activeStep}. Generate a {FormData["doc_type"]}
          </h2>
          <p className="text-theme-gray-325 pl-[1.7rem]">
            Please enter the title to generate a document
          </p>
          <form action="">
            <fieldset className="border rounded-lg py-4 px-6 mt-10">
              <label
                htmlFor="Document-Title"
                className="block text-sm font-medium mb-3"
              >
                Document Title
              </label>
              <textarea
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e: any) => {
                  if (e.target.value != "") {
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
                  //@ts-ignore
                  setFormData((prevState) => ({
                    ...prevState,
                    ["title"]: e.target.value,
                  }));
                }}
                //@ts-ignore
                value={FormData["title"]}
                placeholder="Type title..."
                name="Document Title"
                id="Document-Title"
                className="leading-none h-[36px] w-full resize-none md:text-2xl border-none focus-visible:outline-none scrollbar-hidden"
              ></textarea>
            </fieldset>
          </form>
          <Button
            onClick={() => nextStep()}
            variant="black"
            className="py-3 px-8 mt-6 min-w-[6rem] leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["title"] || FormData["title"] == ""}
          >
            Next
          </Button>
        </div>
      ) : (
        ""
      )}
      {activeStep === 3 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl">
            {activeStep}. Select the Country
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            Choose the country, to set the region for document content you would
            like Capital Cortex to analyze.
          </p>
          <form action="" className="mt-10">
            <fieldset>
              <MultiSelect
                parentClass="large__select__box"
                className="large-select-box"
                values={countries}
                //@ts-ignore
                value={{label: FormData["country"], value: FormData["country"]}}
                placeholder="Select Country"
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
                  //@ts-ignore
                  setFormData((prevState) => ({
                    ...prevState,
                    ["country"]: selected.value,
                  }));
                }}
                label={
                  <label className="absolute top-6 left-7 leading-1 text-sm">
                    Country
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
            disabled={!FormData["country"] || FormData["country"] == ""}
          >
            Next
          </Button>
        </div>
      ) : (
        ""
      )}
      {activeStep === 4 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl">
            {activeStep}. Write details
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            {
              //@ts-ignore
              FormData?.doc_type == "Policy Brief"
                ? "Please provide details about the policy area you'd like a briefing on"
                : "Please write details about what you want to do in document"
            }
          </p>
          <form action="">
            <fieldset className="mt-10">
              <Textarea
                rows={5}
                placeholder="Type Details..."
                name="Document Details"
                id="Document-Details"
                className="!px-6 "
                //@ts-ignore
                value={FormData["prompt_details"]}
                onChange={(e: any) => {
                  if (e.target.value != "") {
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
                  //@ts-ignore
                  setFormData((prevState) => ({
                    ...prevState,
                    ["prompt_details"]: e.target.value,
                  }));
                }}
              ></Textarea>
            </fieldset>
          </form>
          <Button
            onClick={() => nextStep()}
            variant="black"
            className="py-3 px-8 mt-6 min-w-[6rem] leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["prompt_details"] || FormData["prompt_details"] == ""}
          >
            Next
          </Button>
        </div>
      ) : (
        ""
      )}
      {activeStep === 5 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl">
            {activeStep}. Additional Information
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            {
              //@ts-ignore
              FormData?.doc_type == "Policy Brief"
                ? "Provide context for any additional information you would like in your policy brief."
                : "Please write details about what you want to do in document"
            }
          </p>
          <form action="">
            <fieldset className="mt-10">
              <Textarea
                rows={5}
                placeholder="Add information here..."
                name="Document Policy Options"
                id="Document-Policy-Options"
                className="!px-6 "
                //@ts-ignore
                value={FormData["policy_option"]}
                onChange={(e: any) => {
                  if (e.target.value != "") {
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
                  //@ts-ignore
                  setFormData((prevState) => ({
                    ...prevState,
                    ["policy_option"]: e.target.value,
                  }));
                }}
              ></Textarea>
            </fieldset>
          </form>
          <Button
            onClick={handlePolicyBriefGeneration}
            variant="black"
            className="py-3 px-8 mt-6 leading-[1.15]"
            // disabled={FormData["policy_option"]}
          >
            Continue to Create Document
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PolicyBriefSteps;
