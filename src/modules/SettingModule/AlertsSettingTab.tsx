import MultiSelect from "@/components/MultiSelect/MultiSelect";
import React, { useState } from "react";
import Button from "@/components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { userUpdateAlertsAsync } from "@/services/user/aysncThunk";

interface AlertSettings {
  Sector: string[];
  Category: string[];
  City: string[];
  Country: string[];
}

interface MetaData {
  sectors: string[];
  categories: string[];
  countries: Record<string, string[]>;
}

const AlertsSettingTab = () => {
  const { isLoading, profile, metaData } = useSelector((state: {
    user: {
      isLoading: boolean;
      profile: { alerts: AlertSettings };
      metaData: MetaData;
    };
  }) => state.user);
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  const formik = useFormik({
    initialValues: {
      Sector: profile?.alerts?.Sector || [],
      Category: profile?.alerts?.Category || [],
      City: profile?.alerts?.Country
        ? Object.values(profile.alerts.Country).flat()
        : [],
      Country: profile?.alerts?.Country
        ? Object.keys(profile.alerts.Country)
        : [],
    },
    onSubmit: async (values, { setSubmitting }) => {
      setChange(false);
      const payload = { alerts: [] as any[] };

      const currentAlerts = profile?.alerts || {};

      const getRemovedSubTypes = (
        key: string,
        oldSubTypes: string[],
        newSubTypes: string[]
      ) => {
        return oldSubTypes.filter((subType) => !newSubTypes.includes(subType));
      };

      const currentCities = Object.values(currentAlerts.Country || {}).flat();
      const removedCities = getRemovedSubTypes(
        "City",
        currentCities,
        values.City
      );
      const currentCountries = Object.keys(currentAlerts.Country || {});
      const removedCountries = getRemovedSubTypes(
        "Country",
        currentCountries,
        values.Country
      );

      const alertTypes: Array<keyof AlertSettings> = ["Sector", "Category"];

      alertTypes.forEach((key) => {
        const newSubTypes = values[key] || [];
        const removedSubTypes = getRemovedSubTypes(
          key,
          currentAlerts[key] || [],
          newSubTypes
        );

        if (newSubTypes.length > 0 || removedSubTypes.length > 0) {
          payload.alerts.push({
            alertType: key,
            subTypes: newSubTypes,
            removeSubTypes: removedSubTypes,
          });
        }
      });

      const newCountries = values.Country || [];
      if (newCountries.length > 0 || removedCountries.length > 0) {
        payload.alerts.push({
          alertType: "Country",
          subTypes: newCountries,
          removeSubTypes: removedCountries,
        });
      }

      const newCities = values.City || [];
      const cityCountryMap = newCities.reduce(
        (acc: Record<string, string>, city: string) => {
          const country =
            metaData?.countries &&
            Object.keys(metaData.countries).find((country) =>
              metaData.countries[country].includes(city)
            );
          if (country) {
            acc[city] = country;
          }
          return acc;
        },
        {}
      );

      if (newCities.length > 0 || removedCities.length > 0) {
        payload.alerts.push({
          alertType: "City",
          subTypes: newCities,
          removeSubTypes: removedCities,
          cityCountryMap: cityCountryMap,
        });
      }
      // @ts-ignore
      dispatch(userUpdateAlertsAsync(payload)).finally(() => {
        setSubmitting(false);
      });
    },
  });
  const handleSelectChange = (event: any) => {
    formik.handleChange(event);
    setChange(true);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <legend className="h1 font-semibold">News Setting</legend>
      <p className="text-theme-gray-400 mt-4 mb-8">
        You can customize your news setting here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-theme-gray-125 rounded-lg p-6">
          <p className="font-semibold mb-6">Sector</p>
          {/* <p className="text-theme-gray-400 mb-6">
            You can customize your alert settings here.
          </p> */}
          <MultiSelect
            isMulti={true}
            setChange={setChange}
            formik={formik}
            value={formik.values.Sector?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={metaData?.sectors.map((ele: any) => { return { value: ele, label: ele } })}
            name={"Sector"}
            label={
              <label className="absolute p-2 -top-4 left-4 leading-1 bg-white text-theme-gray-275 text-xs">
                Select Sector
              </label>
            }
            placeholder="Select Sector"
            onChange={handleSelectChange}
          />
        </div>
        <div className="border border-theme-gray-125 rounded-lg p-6">
          <p className="font-semibold mb-6">Category</p>
          {/* <p className="text-theme-gray-400 mb-6">
            You can customize your alert settings here.
          </p> */}
          <MultiSelect
            isMulti={true}
            setChange={setChange}
            formik={formik}
            value={formik.values.Category?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={metaData?.categories.map((ele: any) => { return { value: ele, label: ele } })}
            name={"Category"}
            label={
              <label className="absolute p-2 -top-4 left-4 leading-1 bg-white text-theme-gray-275 text-xs">
                Select Category
              </label>
            }
            placeholder="Select Category"
            onChange={handleSelectChange}
          />
        </div>
        <div className="border border-theme-gray-125 rounded-lg p-6">
          <p className="font-semibold mb-6">Country</p>
          {/* <p className="text-theme-gray-400 mb-6">
            You can customize your alert settings here.
          </p> */}
          <MultiSelect
            isMulti={true}
            setChange={setChange}
            formik={formik}
            value={formik.values.Country?.map((x: String) => {
              return { value: x, label: x };
            })}
            values={Object.keys(metaData?.countries).map(Country => ({ value: Country, label: Country }))}
            name={"Country"}
            label={
              <label className="absolute p-2 -top-4 left-4 leading-1 bg-white text-theme-gray-275 text-xs">
                Select Country
              </label>
            }
            placeholder="Select Country"
            onChange={handleSelectChange}
          />
        </div>
        <div className="border border-theme-gray-125 rounded-lg p-6">
          <p className="font-semibold mb-6">States/Province</p>
          {/* <p className="text-theme-gray-400 mb-6">
            You can customize your alert settings here.
          </p> */}
          <MultiSelect
            isMulti={true}
            setChange={setChange}
            formik={formik}
            value={(formik.values.City as string[])?.map((x: string) => ({
              value: x,
              label: x,
            })) || []}
            values={
              formik.values.Country.length > 0
                ? formik.values.Country.flatMap((country) => metaData?.countries[country] || []).map((city) => ({
                  value: city,
                  label: city,
                }))
                : []
            }
            name={"City"}
            placeholder="Select States/Province"
            label={
              <label htmlFor="education" className="theme-input-label">
                Select States/Province
              </label>
            }
            onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button
          type="button"
          className="w-50 font-bold"
          size="large"
          variant="white"
          disabled={isLoading || !change}
          onClick={() => {
            formik.resetForm();
            setChange(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-50 font-bold rounded-lg"
          size="large"
          variant="black"
          disabled={isLoading || !change || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Saving ..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default AlertsSettingTab;
