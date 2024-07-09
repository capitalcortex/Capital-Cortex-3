import React, { useEffect, useState } from "react";
import ProgressAccordian from "./ProgressAccordian";
import { DownArrowIcon } from "../Icons";
import DetailsTable from "./DetailsTable";


const tabs: any[] = [
    { name: "Progress", current: false },
    { name: "Details", current: true },
    { name: "About", current: true },
];


const LegislationDetailTabs = () => {
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);



    return (
        <div className="">
            <nav
                className=" flex gap-8 overflow-hidden border-theme-gray-125 border-b mb-6"
                aria-label="Tabs"
            >
                {tabs.map((tab, i) => (
                    <a
                        key={tab.name}
                        className={`
                        ${i === selectedTabIdx
                                ? "border-theme text-black focus:outline-none"
                                : "border-transparent text-theme-gray-425"
                            }
                                whitespace-nowrap text-center pb-6 border-b-4 cursor-pointer text-sm font-semibold`}
                        onClick={() => setSelectedTabIdx(i)}
                    >
                        {tab.name}
                    </a>
                ))}
            </nav>
            {selectedTabIdx === 0 && (
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col gap-4">
                        <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                            <p className="text-white sm:text-lg text-sms font-bold">Senate</p>
                            <span className="text-white"><DownArrowIcon /></span>
                        </div>
                        <ProgressAccordian />
                        <ProgressAccordian />
                        <ProgressAccordian />
                        <ProgressAccordian />
                        <ProgressAccordian />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="px-6 py-4 bg-theme rounded-t-xl flex items-center justify-between">
                            <p className="text-black text-lg font-bold">Senate</p>
                            <span className="text-white"><DownArrowIcon /></span>
                        </div>
                        <ProgressAccordian />
                        <ProgressAccordian />
                        <ProgressAccordian />
                        <ProgressAccordian />
                        <ProgressAccordian />
                    </div>
                </div>
            )}
            {selectedTabIdx === 1 && (
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col">
                        <div>
                            <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                                <p className="text-white sm:text-lg text-sms font-bold">Recorded votes</p>
                            </div>
                            <div className="p-6 border-theme-gray-100 border rounded-b-xl">
                                <h6 className="text-sm font-bold">House of Commons</h6>
                                <p className="text-theme-gray-325 mb-6">There are currently no recorded votes for this bill.</p>
                                <h6 className="text-sm font-bold">Senate</h6>
                                <p className="text-theme-gray-325 mb-6">To view the complete list of standing votes that have taken place in the Senate, please refer to the  <u className="font-semibold text-black cursor-pointer">Votes</u> page of the  <u className="font-semibold text-black cursor-pointer">Senate of Canada</u>  website.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                                <p className="text-white sm:text-lg text-sms font-bold">Speaker&apos;s rulings and statements</p>
                            </div>
                            <div className="p-6 border-theme-gray-100 border rounded-b-xl">
                                <p className="text-theme-gray-325">There are currently no Speaker&apos;s rulings and statements.</p>
                            </div>
                        </div>
                        <div>
                            <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                                <p className="text-white sm:text-lg text-sms font-bold">Speaker&apos;s rulings and statements</p>
                            </div>
                            <div className="p-6 border-theme-gray-100 border rounded-b-xl">
                                <p className="text-sm text-black font-bold mb-3">Senate</p>
                                <DetailsTable />
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {selectedTabIdx === 2 && (
               <div className="grid md:grid-cols-2 gap-6 items-start">
               <div className="flex flex-col gap-4">
                   <div>
                       <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                           <p className="text-white sm:text-lg text-sms font-bold">Legislative summary</p>
                       </div>
                       <div className="p-6 border-theme-gray-100 border rounded-b-xl">
                           <p className="text-theme-gray-325">
                               A <u className="text-black font-semibold">legislative summary</u> of this bill is available from the Library of Parliament.
                           </p>
                       </div>
                   </div>
           
                   <div>
                       <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                           <p className="text-white sm:text-lg text-sms font-bold">Departmental information</p>
                       </div>
                       <div className="p-6 border-theme-gray-100 border rounded-b-xl">
                           <p className="text-black text-sm font-bold mb-1">Press releases</p>
                           <ul className="pl-6 flex flex-col gap-4 mb-4">
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Government of Canada introduces legislation to improve the operation of the criminal justice system and address the impacts of the COVID-19 pandemic (2022-02-08 | Department of Justice)</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Statement by Minister Lametti on Royal Assent of legislation to improve the flexibility and efficiency of the criminal justice system (2022-12-16 | Department of Justice)</u>
                               </li>
                           </ul>
           
                           <p className="text-black text-sm font-bold mb-1">Background information</p>
                           <ul className="pl-6 flex flex-col gap-4">
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Charter Statement - Bill S-4: An Act to amend the Criminal Code and the Identification of Criminals Act and to make related amendments to other Acts (COVID-19 response and other measures) (Tabled on 2022-03-30)</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Proposed changes to improve the operation of the criminal justice system and address the impacts of the COVID-19 pandemic (2022-02-08 | Department of Justice)</u>
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
           
               <div className="flex flex-col gap-4">
                   <div className="flex flex-col gap-4">
                       <div>
                           <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                               <p className="text-white sm:text-lg text-sms font-bold">Similar bills</p>
                           </div>
                           <div className="p-6 border-theme-gray-100 border rounded-b-xl">
                               <h6 className="text-sm text-black font-bold mb-1">Similar bills introduced in a previous Parliament</h6>
                               <p className="text-theme-gray-325">43rd Parliament, 2nd session</p>
                           </div>
                       </div>

                       <div>
                       <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                           <p className="text-white sm:text-lg text-sms font-bold">More on this bill</p>
                       </div>
                       <div className="p-6 border-theme-gray-100 border rounded-b-xl">
                           <p className="text-black text-sm font-bold mb-1">From the Library of Parliament</p>
                           <ul className="pl-6 flex flex-col gap-4 mb-4">
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Government of Canada introduces legislation to improve the operation of the criminal justice system and address the impacts of the COVID-19 pandemic (2022-02-08 | Department of Justice)</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Statement by Minister Lametti on Royal Assent of legislation to improve the flexibility and efficiency of the criminal justice system (2022-12-16 | Department of Justice)</u>
                               </li>
                           </ul>
           
                           <p className="text-black text-sm font-bold mb-1">Further reading</p>
                           <ul className="pl-6 flex flex-col gap-4">
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Charter Statement - Bill S-4: An Act to amend the Criminal Code and the Identification of Criminals Act and to make related amendments to other Acts (COVID-19 response and other measures) (Tabled on 2022-03-30)</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Proposed changes to improve the operation of the criminal justice system and address the impacts of the COVID-19 pandemic (2022-02-08 | Department of Justice)</u>
                               </li>
                           </ul>
                       </div>
                   </div>
                   </div>
               </div>
           </div>
           

            )}
        </div >
    );
};
export default LegislationDetailTabs;