import Toast from "@/components/Toast";
import {
  addChatAsync,
  addNoteAsync,
  chatHistoryAsync,
  createListAsync,
  deleteNoteAsync,
  getNoteListsAsync,
  updateChatAsync,
  deleteChatAsync,
  uploadPDFAsync,
  chatFeedbackAsync,
  documentChatAsync,
} from "@/services/chat/asyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

export const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    listLoading: false,
    stream: false,
    navigate: false,
    chatId: "",
    del_chatId: "",
    note: "",
    listId: "",
    file: null,
    index: 0,
    fileProgress: 0,
    uploadedFile: "",
    pdfChat: false,
    history: [],
    prevChats: [],
    lists: [],
    listBack: false,
    chatError: "",
  },
  reducers: {
    setError: (state: any, action: any) => {
      state.chatError = action.payload;
    },

    setProgress: (state: any, action: any) => {
      state.fileProgress = action.payload;
    },

    setFile: (state: any, action: any) => {
      state.file = action.payload;
    },

    setHistory: (state: any, action: any) => {
      const history = [...state.history];
      history.push(...action.payload);
      state.history = history;
    },

    setNewChatHistory: (state: any, action: any) => {
      const history = [...state.history];
      history[history.length - 1 ] = action.payload
      state.history = history;
    },

    updateHistory: (state: any, action: any) => {
      state.history = action.payload;
    },

    loadChat: (state: any, action: any) => {
      state.navigate = action.payload.navigate;
      state.history = action.payload.history;
      state.chatId = action.payload.chatId;
      state.pdfChat = false;
    },

    addResponse: (state: any, action: any) => {
      let oldHistory = [...state.history];
      oldHistory[oldHistory.length - 1]["content"] = action.payload;
      state.history = oldHistory;
    },

    setLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },

    setListBack: (state: any, action: any) => {
      state.listBack = action.payload;
    },

    setStream: (state: any, action: any) => {
      state.stream = action.payload;
    },

    setNote: (state: any, action: any) => {
      state.note = action.payload;
    },

    setDeleteNote: (state: any, action: any) => {
      state.listId = action.payload.listId;
      state.index = action.payload.index;
    },

    setDeleteChat: (state: any, action: any) => {
      state.del_chatId = action.payload.chatId;
    },

    updateActiveIndex: (state: any, action: any) => {
      let obj = { ...state.history[action.payload.index] };
      obj["activeIndex"] = action.payload.activeIndex;
      obj["content"] = obj["regen_msgs"][action.payload.activeIndex - 1];
      state.history[action.payload.index] = obj;
    },

    updateChatHistory: (state: any, action: any) => {
      let history = [...state.prevChats];
      if (action.payload.regen) {
        history.map((chat: any) => {
          if (chat._id == action.payload.chatId) {
            chat.history[chat.history.length - 1] = {
              ...action.payload.newPayload[0],
            };
          }
        });
      } else {
        history.map((chat: any) => {
          if (chat._id == action.payload.chatId) {
            chat.history.push(action.payload.newPayload[0]);
            chat.history.push(action.payload.newPayload[1]);
          }
        });
      }
      state.history[state.history.length - 1] = {
        ...action.payload.newPayload[action.payload.newPayload.length - 1],
      };
      state.prevChats = history;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addChatAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addChatAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.prevChats = action.payload.data;
        state.chatId = action.payload.data[0]["_id"];
        console.log(action.payload.data);
      })
      .addCase(addChatAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        }
      })
      .addCase(chatHistoryAsync.pending, (state: any) => {
        state.isLoading = true;
        state.listLoading = true;
      })
      .addCase(chatHistoryAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.listLoading = false;
        state.prevChats = action.payload.data;
      })
      .addCase(chatHistoryAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.listLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        }
      })
      .addCase(updateChatAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateChatAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(updateChatAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        }
      })
      .addCase(createListAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createListAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.lists = action.payload.data;
        Toast.fire({
          icon: "success",
          title: "List Created",
        });
      })
      .addCase(createListAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        } else {
          Toast.fire({
            icon: "error",
            title: "Error Creating List",
          });
        }
      })
      .addCase(getNoteListsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getNoteListsAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.lists = action.payload.data;
      })
      .addCase(getNoteListsAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        }
      })
      .addCase(addNoteAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addNoteAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.lists = action.payload.data;
        state.note = "";
        Toast.fire({
          icon: "success",
          title: "Note Added",
        });
      })
      .addCase(addNoteAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        } else {
          Toast.fire({
            icon: "error",
            title: "Error Adding Note",
          });
        }
      })
      .addCase(deleteNoteAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteNoteAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.lists = action.payload.data;
        state.listId = "";
        state.index = 0;
        Toast.fire({
          icon: "success",
          title: "Note Deleted",
        });
      })
      .addCase(deleteNoteAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        } else {
          Toast.fire({
            icon: "error",
            title: "Error Deleting Note",
          });
        }
      })
      .addCase(deleteChatAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteChatAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.prevChats = action.payload.data;
        state.del_chatId = "";
        Toast.fire({
          icon: "success",
          title: "Chat Deleted",
        });
      })
      .addCase(deleteChatAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        } else {
          Toast.fire({
            icon: "error",
            title: "Error Deleting Chat",
          });
        }
      })
      .addCase(uploadPDFAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(uploadPDFAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.pdfChat = true;
      })
      .addCase(uploadPDFAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        }
      })
      .addCase(chatFeedbackAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(chatFeedbackAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload?.message });
      })
      .addCase(chatFeedbackAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        }
      })
      .addCase(documentChatAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(documentChatAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.history = action.payload?.data?.history;
        state.chatId = action.payload?.data?._id;
      })
      .addCase(documentChatAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.chatError = action.payload?.message;
        if (action.payload?.status == 401) {
          ls.remove("access_token");
          window.location.href = "/login";
        }
      });
  },
});

export const {
  setLoading,
  setError,
  setHistory,
  updateHistory,
  addResponse,
  setStream,
  loadChat,
  setListBack,
  setNote,
  setDeleteNote,
  setDeleteChat,
  setProgress,
  updateChatHistory,
  setFile,
  updateActiveIndex,
  setNewChatHistory,
} = ChatSlice.actions;

export default ChatSlice.reducer;
