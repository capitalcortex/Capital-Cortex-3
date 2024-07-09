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


const tabs: any[] = [
    { name: "Legislation", current: false },
    { name: "Census Reports", current: true },
    { name: "Announcement", current: true },
];

const filters: any[] = []
const AlertTabs = ({selectedTabIdx, setSelectedTabIdx}: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { bills, reports } = useSelector((state: any) => state.user);

    useEffect(() => {
        //@ts-ignore
        dispatch(canadianBillsAsync({page: 0, offset: 0}))

        //@ts-ignore
        dispatch(canadianReportsAsync({page: 0, offset: 0}))
    }, [])


    return (
        <div className="">
            <nav
                className=" flex bg-theme-gray-100 rounded-full items-center justify-between overflow-hidden mb-6 w-[500px]"
                aria-label="Tabs"
            >
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
                        {bills.map((ele: any, i:number) => (
                            <AlertBillsCard bill={ele} key={i} />
                        ))}
                    </div>
                    <Swiper
                        className="!block sm:!hidden mb-4"
                        autoplay={true}
                        speed={200}
                        spaceBetween={24}
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1240: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {bills.map((ele: any, i:number) => (
                            <SwiperSlide key={i}> <AlertBillsCard bill={ele} /> </SwiperSlide>
                        ))}
                    </Swiper>
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
                    <Swiper
                        className="!block sm:!hidden mb-4"
                        autoplay={true}
                        speed={200}
                        spaceBetween={24}
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1240: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {reports.map((report: any, i: number) => (
                            <SwiperSlide key={i}>
                                <AlertCard report={report} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

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
                    <Swiper
                        className="!block sm:!hidden mb-4"
                        autoplay={true}
                        speed={200}
                        spaceBetween={24}
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1240: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {[0, 1, 2, 3, 4, 5].map((ele, i) => (
                            <SwiperSlide key={i}>
                                <ArticlesCard article={i} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </>
            )}
        </div>
    );
};
export default AlertTabs;