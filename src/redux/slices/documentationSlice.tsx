import Toast from "@/components/Toast";
import { documentationAsync, updateDocumentationAsync } from "../../services/documentation/asyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

export const DocumentationSlice = createSlice({
  name: "documentation",
  initialState: {
    isLoading: false,
    documentation: "",
    documentationError: "",
  },
  reducers: {
    setError: (state: any, action: any) => {
      state.documentationError = action.payload;
    },

    setLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(documentationAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(documentationAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.documentation = action.payload.data;
      })
      .addCase(documentationAsync.rejected, (state: any, action: any) => {
        console.log(action,"action");
        
        state.isLoading = false;
        state.documentationError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(updateDocumentationAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateDocumentationAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.documentation = action.payload.data;
      })
      .addCase(updateDocumentationAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.documentationError = action.payload.message;
        Toast.fire({ icon: "error", title: action.payload.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
  },
});
export const { setLoading, setError } = DocumentationSlice.actions;

export default DocumentationSlice.reducer;
