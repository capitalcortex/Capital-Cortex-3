import React from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Button from "../Buttons/Button";
import { setDocumentFilters } from "@/redux/slices/documentGenerationSlice";
import { filterDocumentsAsync, getUserDocumentsAsync } from "@/services/documentGeneration/asyncThunk";

function DocumentFilters({ setSelectedFilters, setIsOpen }: any) {
  const { metaData } = useSelector((state: any) => state.user);
  const { filters } = useSelector((state: any) => state.documentGeneration);
  const dispatch = useDispatch()

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

  const status = [
    { value: "Completed", label: "Completed" },
    { value: "Failed", label: "Failed" },
    { value: "In Progress", label: "In Progress" },
  ]

  const formik = useFormik({
    initialValues: {
      DocType: Object.keys(filters).length === 0 ? [] : filters?.DocType,
      Status: Object.keys(filters).length === 0 ? [] : filters?.Status,
      Country: Object.keys(filters).length === 0 ? [] : filters?.Country,
    },
    onSubmit: (values, { setSubmitting }) => {
        //@ts-ignore
      dispatch(setDocumentFilters(values));
      //@ts-ignore
      dispatch(filterDocumentsAsync(values));
      setIsOpen(false);
    },
  });

  return (
    <>
      <div>
        <p className="font-bold">Filters</p>
        <div className="mt-8 flex flex-col gap-6">
          <MultiSelect
            setSelectedFilters={setSelectedFilters}
            placeholder="Country"
            label={
              <label htmlFor="Country" className="theme-input-label">
                Select Country
              </label>
            }
            isMulti={true}
            formik={formik}
            name="Country"
            value={formik.values.Country?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={Object.keys(metaData?.countries).map((Country) => ({
              value: Country,
              label: Country,
            }))}
          />
          <MultiSelect
            setSelectedFilters={setSelectedFilters}
            placeholder="Status"
            label={
              <label htmlFor="Select Status" className="theme-input-label">
                Select Status
              </label>
            }
            formik={formik}
            name="Status"
            isMulti={true}
            value={formik.values.Status?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={status}
          />
          <MultiSelect
            setSelectedFilters={setSelectedFilters}
            placeholder="Doc Type"
            name="DocType"
            label={
              <label htmlFor="DocType" className="theme-input-label">
                Select Doc Type
              </label>
            }
            formik={formik}
            isMulti={true}
            value={formik.values.DocType?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={analysisSectors}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            //@ts-ignore
            dispatch(setDocumentFilters({}));
            //@ts-ignore
            dispatch(getUserDocumentsAsync({}));
            formik.resetForm();
            setIsOpen(false);
        }}
          variant="gray"
          size="medium"
          className="py-3 w-full !text-black font-bold"
        >
          Clear
        </Button>
        <Button onClick={() => {formik.submitForm()}} variant="black" size="medium" className="py-3 w-full">
          Apply
        </Button>
      </div>
    </>
  );
}

export default DocumentFilters;
