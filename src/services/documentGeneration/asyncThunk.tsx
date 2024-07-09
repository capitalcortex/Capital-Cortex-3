import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpService } from "../index";
import ls from "localstorage-slim";
import { documentGenerationBaseService } from "./endpoints";

export const documentGenerationAsync = createAsyncThunk(
  "/document/generate",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.generateDocument(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateMeetingBriefAsync = createAsyncThunk(
  "/document/generate-meeting-brief",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.generateMeetingBriefDocument(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generatePolicyBriefAsync = createAsyncThunk(
  "/document/generate-policy-brief",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.generatePolicyBriefDocument(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateLegislativeAnalysisAsync = createAsyncThunk(
  "/document/generate-legislative-analysis",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.generateLegislativeAnalysisDocument(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSectionAsync = createAsyncThunk(
  "/document/add-section",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.addSection(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const editSectionAsync = createAsyncThunk(
  "/document/edit-section",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.editSection(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSectionAsync = createAsyncThunk(
  "/document/delete-section",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.deleteSection(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDocumentsAsync = createAsyncThunk(
  "/document/user-documents",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.getUserDocuments(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDocumentAsync = createAsyncThunk(
  "/document/delete-document",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.deleteDocument(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleDocumentAsync = createAsyncThunk(
  "/document/get-single-document",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.getSingleDocument(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchDocumentsAsync = createAsyncThunk(
  "/document/search-documents",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.searchDocuments(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const filterDocumentsAsync = createAsyncThunk(
  "/document/filter-documents",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.filterDocuments(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportPDFAsync = createAsyncThunk(
  "/document/export-pdf",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.exportPDF(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportDOCXAsync = createAsyncThunk(
  "/document/export-docx",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.exportDOCX(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportFileStatusAsync = createAsyncThunk(
  "/document/export-doc-status",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await documentGenerationBaseService.exportStatus(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);