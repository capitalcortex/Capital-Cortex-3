import React from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Button from "../Buttons/Button";
import { setStakeholderFilters } from "@/redux/slices/stakeholderSlice";
import { filterStakeholdersAsync, getStakeholdersAsync } from "@/services/stakeholder/asyncThunk";

function StakeholderFilters({ setSelectedFilters, setIsOpen }: any) {
  const { metaData } = useSelector((state: any) => state.user);
  const { filters, metadata } = useSelector((state: any) => state.stakeholder);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Designation: Object.keys(filters).length === 0 ? [] : filters?.Designation,
      Department: Object.keys(filters).length === 0 ? [] : filters?.Department,
      Project: Object.keys(filters).length === 0 ? [] : filters?.Project,
      City: Object.keys(filters).length === 0 ? [] : Object.values(filters?.City).flat(),
      Country: Object.keys(filters).length === 0 ? [] : filters?.Country,
    },
    onSubmit: (values, { setSubmitting }) => {
      //@ts-ignore
      dispatch(setStakeholderFilters(values));
      setIsOpen(false);
      //@ts-ignore
      dispatch(filterStakeholdersAsync(values))
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
          {formik.values.Country.length > 0 && (
            <MultiSelect
              setSelectedFilters={setSelectedFilters}
              placeholder="States/Province"
              label={
                <label htmlFor="States/Province" className="theme-input-label">
                  Select States/Province
                </label>
              }
              isMulti={true}
              name="City"
              formik={formik}
              value={
                (formik.values.City as string[])?.map((x: string) => ({
                  value: x,
                  label: x,
                })) || []
              }
              values={
                formik.values.Country.length > 0
                  ? formik.values.Country.flatMap(
                      (country: any) => metaData?.countries[country] || []
                    ).map((city: any) => ({
                      value: city,
                      label: city,
                    }))
                  : []
              }
            />
          )}
          <MultiSelect
            setSelectedFilters={setSelectedFilters}
            placeholder="Department"
            label={
              <label htmlFor="Select Department" className="theme-input-label">
                Select Department
              </label>
            }
            formik={formik}
            name="Department"
            isMulti={true}
            value={formik.values.Department?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={metadata?.departments.map((Department: any) => ({
              value: Department,
              label: Department,
            }))}
          />
          <MultiSelect
            setSelectedFilters={setSelectedFilters}
            placeholder="Designation"
            name="Designation"
            label={
              <label htmlFor="Designation" className="theme-input-label">
                Select Designation
              </label>
            }
            formik={formik}
            isMulti={true}
            value={formik.values.Designation?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={metadata?.designations.map((Designation: any) => ({
              value: Designation,
              label: Designation,
            }))}
          />
          <MultiSelect
            setSelectedFilters={setSelectedFilters}
            placeholder="Project"
            name="Project"
            label={
              <label htmlFor="Project" className="theme-input-label">
                Select Project
              </label>
            }
            formik={formik}
            isMulti={true}
            value={formik.values.Project?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={metadata?.projects.map((Project: any) => ({
              value: Project,
              label: Project,
            }))}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            //@ts-ignore
            dispatch(setStakeholderFilters({}));
            //@ts-ignore
            dispatch(getStakeholdersAsync({}));
            formik.resetForm();
            setIsOpen(false);
          }}
          variant="gray"
          size="medium"
          className="py-3 w-full !text-black font-bold"
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            formik.submitForm();
          }}
          variant="black"
          size="medium"
          className="py-3 w-full"
        >
          Apply
        </Button>
      </div>
    </>
  );
}

export default StakeholderFilters;
