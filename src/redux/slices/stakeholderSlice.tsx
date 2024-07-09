import Toast from "@/components/Toast";
import { addAssistantAsync, addNotesTouchpointsAsync, addStakeholderAsync, deleteNotesTouchpointsAsync, deleteStakeholderAsync, editNotesTouchpointsAsync, editStakeholderAsync, filterStakeholdersAsync, getStakeholdersAsync, searchStakeholdersAsync } from "@/services/stakeholder/asyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

export const StakeholderSlice = createSlice({
  name: "stakeholder",
  initialState: {
    isLoading: false,
    stakeholders: [],
    stakeholderDetails: {},
    filters: {},
    metadata: {},
    stakeholderError: "",
  },
  reducers: {
    setError: (state: any, action: any) => {
      state.stakeholderError = action.payload;
    },

    setLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },

    setStakeholderDetails: (state: any, action: any) => {
        state.stakeholderDetails = action.payload;
    },

    setStakeholderFilters: (state: any, action: any) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStakeholdersAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getStakeholdersAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholders = action.payload.data;
        let obj: any = {}
        obj['departments'] = action.payload.data.map((item: any) => item.department).filter((item: any) => item !== '');
        obj['designations'] = action.payload.data.map((item: any) => item.designation).filter((item: any) => item !== '');
        obj['projects'] = action.payload.data.map((item: any) => item.project).filter((item: any) => item !== '');
        state.metadata = obj
      })
      .addCase(getStakeholdersAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(addStakeholderAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addStakeholderAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholders = action.payload.data;
      })
      .addCase(addStakeholderAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(editStakeholderAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(editStakeholderAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const new_stake = action.payload.data
        let arr = state.stakeholders
        arr = arr.map((obj: any) => {
            if (obj._id === new_stake._id) {
                return { ...obj, ...new_stake };
            }
            return obj;
        })
        state.stakeholders = arr
        Toast.fire({ icon: "success", title: action.payload.message });
      })
      .addCase(editStakeholderAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(deleteStakeholderAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteStakeholderAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholders = action.payload.data;
        Toast.fire({ icon: "success", title: action.payload.message });
      })
      .addCase(deleteStakeholderAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(addAssistantAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addAssistantAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const new_stake = action.payload.data
        state.stakeholderDetails = new_stake
        let arr = state.stakeholders
        arr = arr.map((obj: any) => {
            if (obj._id === new_stake._id) {
                return { ...obj, ...new_stake };
            }
            return obj;
        })
        state.stakeholders = arr
        Toast.fire({ icon: "success", title: action.payload?.message });
      })
      .addCase(addAssistantAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(addNotesTouchpointsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addNotesTouchpointsAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const new_stake = action.payload.data
        state.stakeholderDetails = new_stake
        let arr = state.stakeholders
        arr = arr.map((obj: any) => {
            if (obj._id === new_stake._id) {
                return { ...obj, ...new_stake };
            }
            return obj;
        })
        state.stakeholders = arr
        Toast.fire({ icon: "success", title: action.payload?.message });
      })
      .addCase(addNotesTouchpointsAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(deleteNotesTouchpointsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteNotesTouchpointsAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const new_stake = action.payload.data
        state.stakeholderDetails = new_stake
        let arr = state.stakeholders
        arr = arr.map((obj: any) => {
            if (obj._id === new_stake._id) {
                return { ...obj, ...new_stake };
            }
            return obj;
        })
        state.stakeholders = arr
        Toast.fire({ icon: "success", title: action.payload?.message });
      })
      .addCase(deleteNotesTouchpointsAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(editNotesTouchpointsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(editNotesTouchpointsAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        const new_stake = action.payload.data
        state.stakeholderDetails = new_stake
        let arr = state.stakeholders
        arr = arr.map((obj: any) => {
            if (obj._id === new_stake._id) {
                return { ...obj, ...new_stake };
            }
            return obj;
        })
        state.stakeholders = arr
        Toast.fire({ icon: "success", title: action.payload?.message });
      })
      .addCase(editNotesTouchpointsAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(filterStakeholdersAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(filterStakeholdersAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholders = action.payload.data;
      })
      .addCase(filterStakeholdersAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
      .addCase(searchStakeholdersAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(searchStakeholdersAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.stakeholders = action.payload.data;
      })
      .addCase(searchStakeholdersAsync.rejected, (state: any, action: any) => {        
        state.isLoading = false;
        state.stakeholderError = action.payload?.message;
        Toast.fire({ icon: "error", title: action.payload?.message });
        if (action.payload.status == 401) {
          ls.remove("access_token");
          window.location.href = "/register";
        }
      })
  },
});
export const { setLoading, setError, setStakeholderDetails, setStakeholderFilters } = StakeholderSlice.actions;

export default StakeholderSlice.reducer;
