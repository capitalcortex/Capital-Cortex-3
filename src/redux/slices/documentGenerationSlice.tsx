import Toast from "@/components/Toast";
import { addSectionAsync, deleteDocumentAsync, deleteSectionAsync, documentGenerationAsync, editSectionAsync, exportDOCXAsync, exportFileStatusAsync, exportPDFAsync, searchDocumentsAsync, generateLegislativeAnalysisAsync, generateMeetingBriefAsync, generatePolicyBriefAsync, getSingleDocumentAsync, getUserDocumentsAsync, filterDocumentsAsync } from "@/services/documentGeneration/asyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

export const DocumentGenerationSlice = createSlice({
  name: "document_generation",
  initialState: {
    isLoading: false,
    docId: "",
    documentStatus: "",
    documentTitle: "",
    documentChat: "",
    documentSections: [],
    documents: [],
    filters: {},
    documentError: "",
    exportURL: "",
    ping: false,
  },
  reducers: {
    setError: (state: any, action: any) => {
      state.documentError = action.payload;
    },

    setLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },

    setExportURL: (state: any, action: any) => {
      state.exportURL = action.payload;
    },

    setDocumentFilters: (state: any, action: any) => {
      state.filters = action.payload;
    },

    setGeneratedSection: (state: any, action: any) => {
      let arr = state.documentSections
      arr = arr.map((obj: any) => {
          if (obj._id === action.payload.secId) {
              obj.status = action.payload.status,
              obj.content = action.payload.content
          }
          return obj;
      });
      state.documentSections = arr
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(documentGenerationAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(documentGenerationAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.docId = action.payload.data._id
        state.documentTitle = action.payload.data.title
        state.documentChat = action.payload.data.chat
        state.documentSections = action.payload.data.sections
      })
      .addCase(documentGenerationAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(generateMeetingBriefAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(generateMeetingBriefAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.docId = action.payload.data._id
        state.documentTitle = action.payload.data.title
        state.documentChat = action.payload.data.chat
        state.documentSections = action.payload.data.sections
      })
      .addCase(generateMeetingBriefAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(generatePolicyBriefAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(generatePolicyBriefAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.docId = action.payload.data._id
        state.documentTitle = action.payload.data.title
        state.documentChat = action.payload.data.chat
        state.documentSections = action.payload.data.sections
      })
      .addCase(generatePolicyBriefAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(generateLegislativeAnalysisAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(generateLegislativeAnalysisAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.docId = action.payload.data._id
        state.documentTitle = action.payload.data.title
        state.documentChat = action.payload.data.chat
        state.documentSections = action.payload.data.sections
      })
      .addCase(generateLegislativeAnalysisAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(addSectionAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addSectionAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload?.message });
        state.documentSections = action.payload.data.sections;
      })
      .addCase(addSectionAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(editSectionAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(editSectionAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload?.message });
        state.documentSections = action.payload.data.sections;
      })
      .addCase(editSectionAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(deleteSectionAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteSectionAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload?.message });
        state.documentSections = action.payload.data.sections;
      })
      .addCase(deleteSectionAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        console.log(action.payload)
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(getUserDocumentsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getUserDocumentsAsync.fulfilled, (state: any, action: any) => {
        if(window.location.pathname == '/documents'){
          state.isLoading = false;
          state.documents = action.payload.data;
          state.docId = ""
          state.documentTitle = ""
          state.documentSections = []
        }
      })
      .addCase(getUserDocumentsAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(deleteDocumentAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteDocumentAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload?.message });
        state.documents = action.payload.data;
      })
      .addCase(deleteDocumentAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(getSingleDocumentAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getSingleDocumentAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.docId = action.payload?.data?._id;
        state.documentStatus = action.payload?.data?.status;
        state.documentTitle = action.payload?.data?.title;
        state.documentChat = action.payload?.data?.chat
        state.documentSections = action.payload?.data?.sections;
      })
      .addCase(getSingleDocumentAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(searchDocumentsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(searchDocumentsAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.documents = action.payload.data;
      })
      .addCase(searchDocumentsAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(filterDocumentsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(filterDocumentsAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.documents = action.payload.data;
      })
      .addCase(filterDocumentsAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(exportPDFAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(exportPDFAsync.fulfilled, (state: any, action: any) => {
        if(Object.keys(action.payload.data).length > 0){
          state.isLoading = false;
          state.exportURL = action.payload.data?.url
        }else{
          state.ping = !state.ping 
        }
      })
      .addCase(exportPDFAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(exportDOCXAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(exportDOCXAsync.fulfilled, (state: any, action: any) => {
        if(Object.keys(action.payload.data).length > 0){
          state.isLoading = false;
          state.exportURL = action.payload.data?.url
        }else{
          state.ping = !state.ping 
        }
      })
      .addCase(exportDOCXAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(exportFileStatusAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(exportFileStatusAsync.fulfilled, (state: any, action: any) => {
        if(Object.keys(action.payload.data).length > 0){
          state.isLoading = false;
          state.exportURL = action.payload.data?.url
        }else{
          state.ping = !state.ping 
        }
      })
      .addCase(exportFileStatusAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.documentError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
  },
});
export const { setLoading, setError, setGeneratedSection, setExportURL, setDocumentFilters } = DocumentGenerationSlice.actions;

export default DocumentGenerationSlice.reducer;
