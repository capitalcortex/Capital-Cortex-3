import { AfterAuth } from "@/services/afterAuthRoutes.service";
import { BeforeAuth } from "@/services/beforeAuthRoutes.service";
import { useRouter } from "next/router";
import ls from "localstorage-slim";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthAsync } from "@/services/auth/asyncThunk";
import Loading from "../Loader/Loader";

function Wrapper({ setLayout, children }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Loader, setLoader] = useState(true);
  let authScreens: any = BeforeAuth;
  let homeScreens: any = AfterAuth;
  const token = ls.get("access_token", { decrypt: true });
  useEffect(() => {
    setLoader(true);
    if (token) {
      let path_name = router.pathname
      if (homeScreens.indexOf(path_name) != -1 || path_name.includes('documents')  || path_name.includes('legislation-details') || path_name.includes('announcement-details') || path_name.includes('report-details'))
        {
        //@ts-ignore
        dispatch(userAuthAsync());
        if (path_name != "/setup-profile") {
          setLayout(true);
        }
        setLoader(false);
      } else {
        window.location.href = "/404";
      }
    } else {
      if (authScreens.indexOf(router.pathname) != -1) {
        setLayout(false);
        setLoader(false);
      } else {
        window.location.href = "/404";
      }
    }
  }, [router.pathname]);

  return (
    <>
      {Loader ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default Wrapper;
