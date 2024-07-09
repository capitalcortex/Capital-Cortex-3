import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatBaseService } from "./endpoints";
import { HttpService } from "../index";
import ls from "localstorage-slim";
import Config from "../../config/index";
import Toast from "@/components/Toast";
import axios from "axios";
import { setProgress, setFile } from "@/redux/slices/chatSlice";
import { store } from "@/redux/store";

export const chatResponseAsync = async (data: any) => {
  try {
    const token: string = `${ls.get("access_token", { decrypt: true })}`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var raw = JSON.stringify(data);

    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch(`${Config.API_ENDPOINT}/chat/response`, requestOptions)
      .then(async (response:any) => {
        if(response.status == 401){
          Toast.fire({ icon: "error", title: "Session Timeout" });
          ls.remove("access_token");
          window.location.href = "/login";
          return "Their seems to be an issue Try again later!"
        }else{
          return response
        }
      })
      .catch(error => {
        return error
      });
  } catch (error: any) {
    return error
  }
}

export const addChatAsync = createAsyncThunk(
  "/chat/add-chat",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.addChat(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const chatHistoryAsync = createAsyncThunk(
  "/chat/history",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.chatHistory(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateChatAsync = createAsyncThunk(
  "/chat/update-chat",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.updateChat(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createListAsync = createAsyncThunk(
  "/chat/create-list",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.createList(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const getNoteListsAsync = createAsyncThunk(
  "/chat/notes",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.noteLists(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addNoteAsync = createAsyncThunk(
  "/chat/add-note",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.addNote(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteNoteAsync = createAsyncThunk(
  "/chat/delete-note",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.deleteNote(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteChatAsync = createAsyncThunk(
  "/chat/delete-chat",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.deleteChat(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const uploadPDFAsync = createAsyncThunk(
  "/chat/upload-pdf",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      const axiosInstance = axios.create({baseURL: Config.API_ENDPOINT})
      const res = await axiosInstance
      .post("/chat/upload-file", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        onUploadProgress: (data: any) => {
          //@ts-ignore
          store.dispatch(setProgress(Math.round((100 * data.loaded) / data.total)))
        },
      })
      .then((res) => {
        
        Toast.fire({
          icon: "success",
          title: "File Uploaded",
        });
        
        //@ts-ignore
        store.dispatch(setProgress(0));

        //@ts-ignore
        store.dispatch(setFile(null))
        
        return res.data
      })
      .catch((e) => {
        Toast.fire({
          icon: "error",
          title: "Error uploading File",
        });
        return rejectWithValue(e.response.data.message);
      })

      return res

    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const chatPDFAsync = async (data: any) => {
  try {
    const token: string = `${ls.get("access_token", { decrypt: true })}`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var raw = JSON.stringify(data);

    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch(`${Config.API_ENDPOINT}/chat/pdf-chat`, requestOptions)
      .then(async (response:any) => {
        if(response.status == 401){
          Toast.fire({ icon: "error", title: "Session Timeout" });
          ls.remove("access_token");
          window.location.href = "/login";
          return "Their seems to be an issue Try again later!"
        }else{
          return response
        }
      })
      .catch(error => {
        return error
      });
  } catch (error: any) {
    return error
  }
}

export const chatFeedbackAsync = createAsyncThunk(
  "/chat/feedback",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.chatFeedback(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const documentChatAsync = createAsyncThunk(
  "/chat/document-chat",
  async (data, { rejectWithValue }) => {
    try {
      const token: string = `${ls.get("access_token", { decrypt: true })}`;
      HttpService.setToken(token);
      const response = await chatBaseService.documentChat(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);