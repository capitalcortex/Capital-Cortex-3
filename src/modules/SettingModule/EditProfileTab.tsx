import React from "react";
import { useSelector } from "react-redux";
import EditProfileForm from "./EditProfileForm";
import Loading from "@/components/Loader/Loader";

function EditProfileTab() {
  const { profile, isLoading, metaData } = useSelector((state: any) => state.user);

  return <>
  {Object.keys(profile).length > 0 && !isLoading && Object.keys(metaData).length > 0 ? 
    <EditProfileForm /> :
    <Loading/>
   }
  </>;
}

export default EditProfileTab;
