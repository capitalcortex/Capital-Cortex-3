import { Tab } from "@headlessui/react";
import React, { useEffect } from "react";
import EditProfileTab from "@/modules/SettingModule/EditProfileTab";
import { tabs } from "@/services/data/options.data";
import PasswordTab from "@/modules/SettingModule/PasswordTab";
import AlertsSettingTab from "@/modules/SettingModule/AlertsSettingTab";
import PreferenceTab from "@/modules/SettingModule/PreferenceTab";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loader/Loader";
import { userProfileMetaDataAsync } from "@/services/user/aysncThunk";


const SettingsModule = () => {
    const dispatch = useDispatch()
    const { isLoading, metaData } = useSelector((state: any) => state.user);
    useEffect(() => {
        // @ts-ignore
        dispatch(userProfileMetaDataAsync([]))
    }, [])
    return (
        <Tab.Group
            as={"div"}
            className="theme-container w-full py-10 flex flex-wrap gap-12 relative"
        >
            <Tab.List
                as={"aside"}
                className={
                    "w-full flex overflow-y-auto sm:overflow-y-auto scrollbar-hidden lg:block lg:h-80 lg:w-[22%] border border-theme-gray-100 rounded-2xl p-4"
                }
            >
                {tabs.map((tab, i) => (
                    <Tab
                        key={i}
                        as={"div"}
                        className={"w-full focus-visible:outline-none"}
                    >
                        {({ selected }: any) => (
                            <div
                                className={`${selected ? "bg-theme-gray-75" : "bg-white"
                                    } cursor-pointer flex gap-4 rounded-2xl items-center p-5 w-full focus-visible:outline-none`}
                            >
                                {tab.icon}
                                <p
                                    className={`font-semibold text-xs sm:text-base w-max whitespace-nowrap`}
                                >
                                    {tab.title}
                                </p>
                            </div>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels as={"div"} className={"w-full lg:w-[56%] focus-visible:outline-none"}>
                <Tab.Panel className="h-full">
                    <EditProfileTab />
                </Tab.Panel>
                <Tab.Panel>
                    <PasswordTab />
                </Tab.Panel>
                <Tab.Panel>
                    {!isLoading && Object.keys(metaData).length > 0 ? <AlertsSettingTab /> : <Loading />}
                </Tab.Panel>
                <Tab.Panel className="h-full">
                    {!isLoading && Object.keys(metaData).length > 0 ? <PreferenceTab /> : <Loading />}
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default SettingsModule;
