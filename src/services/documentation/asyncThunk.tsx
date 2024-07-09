import { createAsyncThunk } from "@reduxjs/toolkit";
import { documentationBaseService } from "./endpoints"; // Import your authService
import { HttpService } from "../index";
import ls from "localstorage-slim";

export const documentationAsync = createAsyncThunk(
  "/documentation",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentationBaseService.getDocumentationData(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateDocumentationAsync = createAsyncThunk(
  "/documentation/update-documentation",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentationBaseService.updateDocumentationData(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
