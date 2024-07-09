import { createAsyncThunk } from "@reduxjs/toolkit";
import { userBaseService } from "./endpoints"; // Import your authService
import { HttpService } from "../index";
import ls from "localstorage-slim";
import { authBaseService } from "../auth/endpoints";

export const userProfileSetupAsync = createAsyncThunk(
  "/user/profile-setup",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await userBaseService.profileSetup(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Edit Profile
export const userEditProfileAsync = createAsyncThunk(
  "/user/edit-profile",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await userBaseService.editProfile(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// User Change Password
export const userChangePasswordAsync = createAsyncThunk(
  "/user/change-password",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await userBaseService.changePassword(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userUpdateAlertsAsync = createAsyncThunk(
  "/user/update-alerts",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await userBaseService.updateAlerts(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userAddNewsletterAsync = createAsyncThunk(
  "/user/add-newsletter",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await userBaseService.newsLetter(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const userLinkedInAsync = createAsyncThunk(
  "/user/linkedIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userBaseService.linkedIn(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userProfileMetaDataAsync = createAsyncThunk(
  "/profile-metadata",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userBaseService.profileMetaData(data);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const newsAlertAsync = createAsyncThunk(
  "/news-alerts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userBaseService.newsAlerts(data);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const canadianBillsAsync = createAsyncThunk(
  "/canadian-bills",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userBaseService.canadianBills(data);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const canadianReportsAsync = createAsyncThunk(
  "/canadian-reports",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userBaseService.canadianReports(data);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
