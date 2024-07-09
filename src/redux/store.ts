import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import documentationReducer from "./slices/documentationSlice";
import chatReducer from "./slices/chatSlice";
import documentGenerationReducer from "./slices/documentGenerationSlice";
import stakeholderReducer from "./slices/stakeholderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    documentation: documentationReducer,
    chat: chatReducer,
    documentGeneration: documentGenerationReducer,
    stakeholder: stakeholderReducer
  },
});
