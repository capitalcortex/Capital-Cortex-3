import React from "react";
import Button from "@/components/Buttons/Button";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Textarea from "@/components/Input/Textarea";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

function MeetingBriefSteps({
  activeStep,
  FormData,
  setFormData,
  nextStep,
  setSteps,
  countries,
  handleMeetingBriefGeneration,
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
                value={{label: FormData["country"],value: FormData["country"]}}
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
            {activeStep}. Enter our side personal names
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            Please write the names of the key persons from your side
          </p>
          <form action="">
            <fieldset className="mt-10">
              <TagsInput
                inputProps={{ placeholder: "Add Name" }}
                //@ts-ignore
                value={FormData?.our_side}
                onChange={(person: any) => {
                  //@ts-ignore
                  if (FormData?.our_side.length > 0 || person != "") {
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
                  let names = FormData?.our_side;
                  names.push(person);
                  //@ts-ignore
                  setFormData((prevState) => ({
                    ...prevState,
                    //@ts-ignore
                    ["our_side"]: person,
                  }));
                }}
                className="placeholder:!font-theme border !border-theme-gray-125 rounded-lg py-4 px-6"
              />
            </fieldset>
          </form>
          <Button
            onClick={() => nextStep()}
            variant="black"
            className="py-3 px-8 mt-6 leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["our_side"] || FormData["our_side"].length == 0}
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
            {activeStep}. Enter personal names from their side
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            Please write the names of the key persons from their side
          </p>
          <form action="">
            <fieldset className="mt-10">
              <TagsInput
                inputProps={{ placeholder: "Add Name" }}
                //@ts-ignore
                value={FormData?.other_side}
                onChange={(person: any) => {
                  //@ts-ignore
                  if (FormData?.other_side.length > 0 || person != "") {
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
                  let names = FormData?.other_side;
                  names.push(person);
                  //@ts-ignore
                  setFormData((prevState) => ({
                    ...prevState,
                    //@ts-ignore
                    ["other_side"]: person,
                  }));
                }}
                className="placeholder:!font-theme border !border-theme-gray-125 rounded-lg py-4 px-6"
              />
            </fieldset>
          </form>
          <Button
            onClick={() => nextStep()}
            variant="black"
            className="py-3 px-8 mt-6 leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["other_side"] || FormData["other_side"].length == 0}
          >
            Next
          </Button>
        </div>
      ) : (
        ""
      )}
      {/* {activeStep === 6 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl">
            {activeStep}. Write purpose of the meeting
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            {"Please write details about what's the purpose of the meeting"}
          </p>
          <form action="" className="mt-10">
            <fieldset className="">
              <Textarea
                rows={5}
                placeholder="Type meeting purpose..."
                name="Purpose Details"
                id="Purpose-Details"
                className="border !px-6"
                //@ts-ignore
                value={FormData["purpose"]}
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
                    ["purpose"]: e.target.value,
                  }));
                }}
              ></Textarea>
            </fieldset>
          </form>
          <Button
            onClick={() => nextStep()}
            variant="black"
            className="py-3 px-8 mt-6 leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["purpose"] || FormData["purpose"].length == 0}
          >
            Next
          </Button>
        </div>
      ) : (
        ""
      )} */}
      {activeStep === 6 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl">
            {activeStep}. Write objectives of the meeting
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            Please write what are the objectives of the meeting
          </p>
          <form action="" className="mt-10">
            <fieldset className="">
              <Textarea
                rows={5}
                placeholder="Meeting Objectives..."
                name="Meeting Objectives"
                id="Meeting-Objectives"
                className="border !px-6"
                //@ts-ignore
                value={FormData["objectives"]}
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
                    ["objectives"]: e.target.value,
                  }));
                }}
              ></Textarea>
            </fieldset>
          </form>
          <Button
            onClick={handleMeetingBriefGeneration}
            variant="black"
            className="py-3 px-8 mt-6 min-w-[6rem] leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["objectives"] || FormData["objectives"] == ""}
          >
            Continue to Create Document
          </Button>
        </div>
      ) : (
        ""
      )}
      {/* {activeStep === 7 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl">
            {activeStep}. Write any additional information
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            Please share any additional points discussed in the meeting
          </p>
          <form action="" className="mt-10">
            <fieldset className="">
              <Textarea
                rows={5}
                placeholder="Write talking points..."
                name="Talking Points"
                id="Talking-Points"
                className="border !px-6"
                //@ts-ignore
                value={FormData["talking_points"]}
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
                    ["talking_points"]: e.target.value,
                  }));
                }}
              ></Textarea>
            </fieldset>
          </form>
          <Button
            onClick={handleMeetingBriefGeneration}
            variant="black"
            className="py-3 px-8 mt-6 min-w-[6rem] leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["talking_points"] || FormData["talking_points"] == ""}
          >
            Continue to Create Document
          </Button>
        </div>
      ) : (
        ""
      )} */}
      {/* {activeStep === 9 ? (
        <div className="p-4 sm:p-8">
          <h2 className="h1 sm:leading-1 font-semibold text-2xl">
            {activeStep}. Write background of the meeting
          </h2>
          <p className="mt-2 text-theme-gray-325 sm:pl-7">
            Please share any background you know about the meeting
          </p>
          <form action="" className="mt-10">
            <fieldset className="">
              <Textarea
                rows={5}
                placeholder="Write background details..."
                name="Background Details"
                id="Background-Details"
                className="border !px-6"
                //@ts-ignore
                value={FormData["background"]}
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
                    ["background"]: e.target.value,
                  }));
                }}
              ></Textarea>
            </fieldset>
          </form>
          <Button
            onClick={handleMeetingBriefGeneration}
            variant="black"
            className="py-3 px-8 mt-6 min-w-[6rem] leading-[1.15]"
            //@ts-ignore
            disabled={!FormData["background"] || FormData["background"] == ""}
          >
            Continue to Create Document
          </Button>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default MeetingBriefSteps;
