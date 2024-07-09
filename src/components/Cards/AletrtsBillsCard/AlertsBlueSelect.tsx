import { DocIcon1, DocIcon2, DocIcon3 } from "@/components/svgs";
import React, { useEffect, useState } from "react";


const AlertsBlueSelect = ({bill}: any) => {
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);

    useEffect(() => {
        setSelectedTabIdx(bill?.BillStages[2]['RoyalAssent'].length)
    }, [])

    return (
        <div className="grow">
            <nav
                className=" flex items-center justify-center space-x-2 mb-2"
                aria-label="Tabs"
            >
                <div
                    className={`
                        ${selectedTabIdx > 0
                            ? " !bg-[#030491] !text-white focus:outline-none "
                            : "bg-theme-gray-100"
                        } w-8 h-8 flex justify-center !text-black items-center rounded-full shrink-0`}
                >
                    <DocIcon1/>
                </div>
            </nav>
            {selectedTabIdx > 0 && <div className={`bg-[#030491] h-1 w-full  rounded-md`}></div>}
        </div>
    );
};
export default AlertsBlueSelect;