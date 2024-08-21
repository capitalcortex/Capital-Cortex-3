import { createAsyncThunk } from "@reduxjs/toolkit";
import { authBaseService } from "./endpoints"; // Import your authService
import { HttpService } from "../index";
import ls from "localstorage-slim";
interface SigninAuthData {
  email: string;
  password: string;
}
interface SignupAuthData {
  fullname: string;
  email: string;
  password: string;
  conditions: boolean;
}
interface SocialSignInData {
  account: "google" | "linkedin";
  access_token: string;
  url?: string;
}
interface ErrorResponse {
  message: string;
}
export const userAuthAsync = createAsyncThunk(
  "/auth",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await authBaseService.auth(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSignUpAsync = createAsyncThunk<any, SignupAuthData, { rejectValue: ErrorResponse }>(
  "/auth/sign-Up",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authBaseService.signUp(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response.data.message || "An error occurred" });
    }
  }
);

export const userSignInAsync = createAsyncThunk<any, SigninAuthData, { rejectValue: ErrorResponse }>(
  "/auth/sign-in",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authBaseService.signIn(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response.data.message || "An error occurred" });
    }
  }
);

export const socialSignInAsync = createAsyncThunk<any, SocialSignInData>(
  "auth/social-sign-in",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authBaseService.socialSignIn(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userForgetRequestAsync = createAsyncThunk(
  "/auth/request-otp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authBaseService.forgetPassword(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userVerifyOTPAsync = createAsyncThunk(
  "/auth/verify-otp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authBaseService.verifyOTP(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userResetPasswordAsync = createAsyncThunk(
  "/auth/change-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authBaseService.resetPassword(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
