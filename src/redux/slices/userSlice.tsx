import Toast from "@/components/Toast";
import {
  userAuthAsync,
  userForgetRequestAsync,
  userResetPasswordAsync,
  userSignInAsync,
  userSignUpAsync,
  userVerifyOTPAsync,
  socialSignInAsync
} from "@/services/auth/asyncThunk";
import {
  userProfileSetupAsync,
  userEditProfileAsync,
  userChangePasswordAsync,
  userUpdateAlertsAsync,
  userAddNewsletterAsync,
  userLinkedInAsync,
  userProfileMetaDataAsync,
  newsAlertAsync,
  canadianBillsAsync,
  canadianReportsAsync,
} from "@/services/user/aysncThunk";
import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";
import Router from "next/router";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    signUpSuccess: false,
    resetSuccess: false,
    emailSent: false,
    loadMore: false,
    authError: "",
    otp: "",
    filters: {},
    profile: {},
    metaData: {},
    newsAlerts: {},
    bills: [],
    reports: []
  },
  reducers: {
    setProfile: (state: any, action: any) => {
      state.profile = action.payload;
    },

    setReset: (state: any, action: any) => {
      state.resetSuccess = action.payload;
    },

    setEmail: (state: any, action: any) => {
      state.emailSent = action.payload;
    },

    setSignUp: (state: any, action: any) => {
      state.signUpSuccess = action.payload;
    },

    setOTP: (state: any, action: any) => {
      state.otp = action.payload;
    },

    setError: (state: any, action: any) => {
      state.userError = action.payload;
    },

    userLogout: (state: any) => {
      state.profile = {};
      ls.remove("access_token");
      window.location.href = "/login";
    },

    setLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
    setMetaData: (state: any, action: any) => {
      state.metaData = action.payload;
    },

    setAlertsFilters: (state: any, action: any) => {
      state.filters = action.payload;
    },

    setLoadMore: (state: any, action: any) => {
      state.loadMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userAuthAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.profile = action.payload.data;
        state.signUpSuccess = true;
      })
      .addCase(userAuthAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: "Session Timeout" });
        state.profile = {};
        ls.remove("access_token");
        window.location.href = "/login";
      })
      .addCase(userSignUpAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userSignUpAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        ls?.set("access_token", action.payload.data.access_token, {
          encrypt: true,
        });
        state.profile = action.payload.data.profile;
        state.signUpSuccess = true;
      })
      .addCase(userSignUpAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })
      .addCase(userSignInAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userSignInAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        ls?.set("access_token", action.payload.data.access_token, {
          encrypt: true,
        });
        state.profile = action.payload.data.profile;
        window.location.href = "/home";
      })
      .addCase(userSignInAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })
      .addCase(socialSignInAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(socialSignInAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        ls?.set("access_token", action.payload.data.access_token, {
          encrypt: true,
        });
        state.profile = action.payload.data.profile;
        window.location.href = "/home";
      })
      .addCase(socialSignInAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })
      .addCase(userForgetRequestAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userForgetRequestAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.emailSent = true;
        const obj = { email: action.payload.data?.email };
        ls.set("request", obj, {
          encrypt: true,
        });
      })
      .addCase(userForgetRequestAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })
      .addCase(userVerifyOTPAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userVerifyOTPAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload.message });
        let obj = ls.get("request", {
          decrypt: true,
        });
        //@ts-ignore
        obj["otp"] = state.otp;
        ls.set("request", obj, {
          encrypt: true,
        });
        Router.push("/reset-password");
      })
      .addCase(userVerifyOTPAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })
      .addCase(userResetPasswordAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userResetPasswordAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.otp = "";
        ls.remove("request");
        state.resetSuccess = true;
      })
      .addCase(userResetPasswordAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })
      // Set Profile Reducers
      .addCase(userProfileSetupAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userProfileSetupAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: "Profile Updated" });
        state.profile = action.payload.data;
        window.location.pathname !== "/settings"
          ? (window.location.href = "/home")
          : "";
      })
      .addCase(userProfileSetupAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "error", title: action.payload });
      })
      //  USER -> EDIT PROFILE
      .addCase(userEditProfileAsync.pending, (state: any, action: any) => {
        state.isLoading = true;
      })
      .addCase(userEditProfileAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload.message });
        state.profile = action.payload.data;
      })
      .addCase(userEditProfileAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "error", title: action.payload });
      })
      // USER -> CHANGE PASSWORD
      .addCase(userChangePasswordAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userChangePasswordAsync.fulfilled, (state: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: "Password Changed" });
      })
      .addCase(userChangePasswordAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "error", title: action.payload });
      })
      .addCase(userUpdateAlertsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userUpdateAlertsAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload.message });
        state.profile = action.payload.data;
      })
      .addCase(userUpdateAlertsAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })
      // USER-> ADD EMAIL TO NEWSLETTER
      .addCase(userAddNewsletterAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userAddNewsletterAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "success", title: action.payload.message });
        state.profile = action.payload.data;
      })
      .addCase(userAddNewsletterAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.authError = action.payload;
        Toast.fire({ icon: "error", title: action.payload });
      })

      // USER LinkedIn Authentication
      .addCase(userLinkedInAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userLinkedInAsync.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        console.log(action.payload)
      })
      .addCase(userLinkedInAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "error", title: 'Error occur while login' });
      })

      // Metadata
      .addCase(userProfileMetaDataAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(userProfileMetaDataAsync.fulfilled, (state: any, action: any) => {
        state.metaData = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(userProfileMetaDataAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "error", title: action.payload });
      })

      // News Alerts
      .addCase(newsAlertAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(newsAlertAsync.fulfilled, (state: any, action: any) => {
        state.newsAlerts = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(newsAlertAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        // Toast.fire({ icon: "error", title: action.payload });
      })

      // Canadian bills
      .addCase(canadianBillsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(canadianBillsAsync.fulfilled, (state: any, action: any) => {
        if(state.loadMore){
          let bills = state.bills
          state.bills = bills.concat(action.payload?.data)
          state.loadMore = false
        }else{
          state.bills = action.payload?.data
        }
        state.isLoading = false;
      })
      .addCase(canadianBillsAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "error", title: action.payload });
      })

      // Canadian Reports
      .addCase(canadianReportsAsync.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(canadianReportsAsync.fulfilled, (state: any, action: any) => {
        if(state.loadMore){
          let reports = state.reports
          state.reports = reports.concat(action.payload?.data)
          state.loadMore = false
        }else{
          state.reports = action.payload?.data
        }
        state.isLoading = false;
      })
      .addCase(canadianReportsAsync.rejected, (state: any, action: any) => {
        state.isLoading = false;
        Toast.fire({ icon: "error", title: action.payload });
      });
  },
});

export const {
  setProfile,
  userLogout,
  setLoading,
  setError,
  setReset,
  setEmail,
  setSignUp,
  setOTP,
  setMetaData,
  setAlertsFilters,
  setLoadMore
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
