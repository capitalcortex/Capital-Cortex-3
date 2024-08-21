import React, { useEffect, useState } from "react";
import AlertsSection from "../AlertsSection/AlertsSection";
import AlertBillsCard from "../Cards/AletrtsBillsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import AlertCard from "../Cards/AlertCard";
import { CrossIcon } from "../Icons";
import { useRouter } from "next/router";
import ArticlesCard from "../Cards/ArticlesCard/ArticlesCard";
import { useDispatch, useSelector } from "react-redux";
import { canadianBillsAsync, canadianReportsAsync } from "@/services/user/aysncThunk";
import { AppDispatch } from "@/redux/store";
import SwiperComponent from "../Cards/AletrtsBillsCard/SwiperComponent";

type Tab = {
    name: string;
    current: boolean;
  };
  type Bill = {
    id: string;
    title: string;
  };
  
  type Report = {
    id: string;
    summary: string;
  };
  
  type AlertTabsProps = {
    selectedTabIdx: number;
    setSelectedTabIdx: (index: number) => void;
  };

const tabs: Tab[] = [
    { name: "Legislation", current: false },
    { name: "Census Reports", current: true },
    { name: "Announcement", current: true },
];

const filters: any[] = []
const AlertTabs = ({selectedTabIdx, setSelectedTabIdx}: any) => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { bills, reports } = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(canadianBillsAsync({page: 0, offset: 0}))
        dispatch(canadianReportsAsync({page: 0, offset: 0}))
    }, [dispatch])


    return (
        <div className="">
            <nav
                className=" flex bg-theme-gray-100 rounded-full items-center justify-between overflow-hidden mb-6 w-[500px]"
                aria-label="Tabs">
                {tabs.map((tab, i) => (
                    <a
                        key={tab.name}
                        className={`
                        ${i === selectedTabIdx
                                ? " bg-theme text-black focus:outline-none"
                                : "border-transparent"
                            }
                                whitespace-nowrap w-full text-center py-2 cursor-pointer text-base`}
                        onClick={() => setSelectedTabIdx(i)}
                    >
                        {tab.name}
                    </a>
                ))}
            </nav>
            {selectedTabIdx === 0 && bills.length > 0 && (
                <>
                    {router.pathname == "/alerts" &&
                    <ul className="alert__filters">
                        { filters.map((item, i) => (<li key={i}><p className="text-sm leading-tight">{item}</p><span className="!mb-0 cursor-pointer"><CrossIcon /></span></li>)) }
                        {filters.length > 0 && <p className="text-theme hover:underline font-semibold cursor-pointer">Clear all filters</p>}
                    </ul>}
                    <div className="alerts">
                        {bills.map((bill:any) => (
                            <AlertBillsCard key={bill._id} bill={bill} />
                        ))}
                    </div>
                    <SwiperComponent
                        items={bills}
                        renderItem={(bill: any) => <AlertBillsCard key={bill._id} bill={bill} />}
                    />
                </>
            )}
            {selectedTabIdx === 1 && reports.length > 0 &&  (
                <>
                    {router.pathname == "/alerts" && <ul className="alert__filters">
                        {
                            filters.map((item, i) => (
                                <li key={i}><p className="text-sm leading-tight">{item}</p><span className="!mb-0 cursor-pointer"><CrossIcon /></span></li>
                            ))
                        }
                        {/* <p className="text-theme font-semibold cursor-pointer">Clear all filters</p> */}
                    </ul>}
                    <div className="alerts">
                        {reports.map((report: any, i: number) => (
                            <AlertCard key={i} report={report} />
                        ))}
                    </div>
                    <SwiperComponent
                        items={reports}
                        renderItem={(report: any) => <AlertCard key={report.id} report={report} />}
                    />
                </>
            )}

            {selectedTabIdx === 2 && (
                <>
                    {router.pathname == "/alerts" && <ul className="alert__filters">
                        {
                            filters.map((item, i) => (
                                <li key={i}><p className="text-sm leading-tight">{item}</p><span className="!mb-0 cursor-pointer"><CrossIcon /></span></li>
                            ))
                        }
                    {/* <p className="text-theme font-semibold cursor-pointer">Clear all filters</p> */}
                    </ul>}
                    <div className="alerts">
                        {[0, 1, 2, 3, 4, 5].map((ele, i) => (
                            <ArticlesCard key={i} article={i} />
                        ))}
                    </div>
                    <SwiperComponent
                        items={[0, 1, 2, 3, 4, 5]}
                        renderItem={(i: number) => <ArticlesCard key={i} article={i} />}
                    />
                </>
            )}
        </div>
    );
};
export default AlertTabs;