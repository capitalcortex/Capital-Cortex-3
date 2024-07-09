import React from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Button from "../Buttons/Button";
import { setAlertsFilters } from "@/redux/slices/userSlice";

function HomeFilters({ setSelectedFilters, setIsOpen }: any) {
  const { metaData, filters } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      Sector: Object.keys(filters).length === 0 ? [] : filters?.Sector,
      Category: Object.keys(filters).length === 0 ? [] : filters?.Category,
      City: Object.keys(filters).length === 0 ? [] : Object.values(filters?.City).flat(),
      Country: Object.keys(filters).length === 0 ? [] : filters?.Country,
    },
    onSubmit: (values, { setSubmitting }) => {
        //@ts-ignore
      dispatch(setAlertsFilters(values));
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
            placeholder="Sector"
            label={
              <label htmlFor="Select Sector" className="theme-input-label">
                Select Sector
              </label>
            }
            formik={formik}
            name="Sector"
            isMulti={true}
            value={formik.values.Sector?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={metaData?.sectors.map((Sector: any) => ({
              value: Sector,
              label: Sector,
            }))}
          />
          <MultiSelect
            setSelectedFilters={setSelectedFilters}
            placeholder="Category"
            name="Category"
            label={
              <label htmlFor="Category" className="theme-input-label">
                Select Category
              </label>
            }
            formik={formik}
            isMulti={true}
            value={formik.values.Category?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={metaData?.categories.map((Category: any) => ({
              value: Category,
              label: Category,
            }))}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            //@ts-ignore
            dispatch(setAlertsFilters({}));
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

export default HomeFilters;
