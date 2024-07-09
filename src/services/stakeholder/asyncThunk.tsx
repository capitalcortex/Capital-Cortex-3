import { createAsyncThunk } from "@reduxjs/toolkit";
import { stakeholderBaseService } from "./endpoints"; // Import your authService
import { HttpService } from "../index";
import ls from "localstorage-slim";

export const getStakeholdersAsync = createAsyncThunk(
  "/stakeholders",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.getStakeholders(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStakeholderAsync = createAsyncThunk(
  "/stakeholders/add-stakeholder",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.addStakeholder(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editStakeholderAsync = createAsyncThunk(
  "/stakeholders/edit-assistant",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.editStakeholder(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStakeholderAsync = createAsyncThunk(
  "/stakeholders/delete-assistant",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.deleteStakeholder(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAssistantAsync = createAsyncThunk(
  "/stakeholders/add-assistant",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.addAssistant(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNotesTouchpointsAsync = createAsyncThunk(
  "/stakeholders/add-notes-touchPoints",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.addNotesTouchpoints(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNotesTouchpointsAsync = createAsyncThunk(
  "/stakeholders/delete-notes-touchPoints",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.deleteNotesTouchpoints(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editNotesTouchpointsAsync = createAsyncThunk(
  "/stakeholders/edit-notes-touchPoints",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.editNotesTouchpoints(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const filterStakeholdersAsync = createAsyncThunk(
  "/stakeholders/filter-stakeholder",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.filterStakeholders(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchStakeholdersAsync = createAsyncThunk(
  "/stakeholders/search-stakeholders",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await stakeholderBaseService.searchStakeholders(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);