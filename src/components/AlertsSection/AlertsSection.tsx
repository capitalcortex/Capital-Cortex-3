import React, { useState } from "react";
import Button from "@/components/Buttons/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import GlobalHeadingSection from "../GlobalHeadingSection/GlobalHeadingSection";
import { alertGlobalHeadingDescription, alertGlobalHeadingTitle } from "../Content";
import AlertTabs from "../AlertTabs";
import { useDispatch } from "react-redux";
import { canadianBillsAsync, canadianReportsAsync } from "@/services/user/aysncThunk";
import { setLoadMore } from "@/redux/slices/userSlice";
const AlertsSection = () => {
  const router = useRouter();
  const isHome = router.pathname === "/home";
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);
  const [billPage, setBillPage] = useState(0)
  const [reportPage, setReportPage] = useState(0)
  const dispatch = useDispatch()

  const handleLoadBills = () => {
    //@ts-ignore
    dispatch(setLoadMore(true))
    //@ts-ignore
    dispatch(canadianBillsAsync({page: billPage + 1, offset: billPage + 1 * 20}))
    setBillPage(billPage + 1)
  }

  const handleLoadReports = () => {
    //@ts-ignore
    dispatch(setLoadMore(true))
    //@ts-ignore
    dispatch(canadianReportsAsync({page: reportPage + 1, offset: reportPage + 1 * 8}))
    setReportPage(reportPage + 1)
  }

  return (
    <>
      {router.pathname === "/alerts" ?
        <>
          <GlobalHeadingSection title={alertGlobalHeadingTitle} description={alertGlobalHeadingDescription} />
        </> :
        <h2 className="globalHeading__title globalHead__title mb-6">{"Alerts"}</h2>

      }
      <AlertTabs selectedTabIdx={selectedTabIdx} setSelectedTabIdx={setSelectedTabIdx}/>
      <div className="w-full flex justify-center">
        {isHome ? (
          <Link
            href={"/alerts"}
            className="home__view__btn"
          >
            View All
          </Link>
        ) : <Button onClick={() => {
          if(selectedTabIdx == 0){
            handleLoadBills()
          }else if(selectedTabIdx == 1){
            handleLoadReports()
          }
        }} variant="black" size="medium" className="py-3 px-8">
          Load More
        </Button>
      }
      </div>
    </>
  );
};

export default AlertsSection;
