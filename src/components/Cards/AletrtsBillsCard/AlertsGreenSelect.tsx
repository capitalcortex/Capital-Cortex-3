import { DocIcon1, DocIcon2, DocIcon3 } from "@/components/svgs";
import React, { useEffect, useState } from "react";


const tabs = [
    { icon: <DocIcon1/>, current: false },
    { icon: <DocIcon2/>, current: true },
    { icon: <DocIcon3/>, current: true },

   
];

const filters = ["Education", "Finance"]

const AlertsGreenSelect = ({bill}: any) => {
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);

    useEffect(() => {
        let count = -1
        bill?.BillStages[0]['HouseBillStages'].map((stage: any) => {
            if(stage?.stage_name == 'First reading' || stage?.stage_name == 'Second reading' || stage?.stage_name == 'Third reading' && stage?.state == 'Completed'){
                count = count + 1
            }
        })
        setSelectedTabIdx(count)
    }, [])

    return (
        <div className="grow">
            <nav
                className=" flex items-center justify-between space-x-2 mb-2"
                aria-label="Tabs"
            >
                {tabs.map((tab, i) => (
                    <div
                        key={i}
                        className={`
                         ${i <= selectedTabIdx
                                ? " !bg-[#46D387] !text-black focus:outline-none "
                                : "bg-theme-gray-100"
                            } w-8 h-8 flex justify-center !text-black items-center rounded-full shrink-0`}
                        onClick={() => setSelectedTabIdx(i)}
                    >
                        {tab.icon}
                    </div>
                ))}
            </nav>
            <div className={`bg-[#46D387] h-1 rounded-md ${selectedTabIdx===0 ? "w-[33%]" : selectedTabIdx===1 ? "w-[66%]" :  "w-full"}`}></div>
        </div>
    );
};
export default AlertsGreenSelect;