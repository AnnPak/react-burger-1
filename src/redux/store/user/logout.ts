import { TStringArray } from '../../../utils/types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { request } from "../../../utils/request";
import { LOGOUT_API } from "../../../utils/constants";
import { deleteCookie } from "../../../utils/cookie";

export type TLogoutState = {
    logoutSending: boolean,
    logoutError: boolean,
}

export const initialState:TLogoutState = {
    logoutSending: false,
    logoutError: false,
};

export const logoutUser = createAsyncThunk("user/logoutUser", async (requestBody:TStringArray) => {
    return await request(LOGOUT_API, JSON.stringify(requestBody), "POST");
});

const logoutSlice = createSlice({
    name: "logout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.logoutSending = true;
                state.logoutError = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                const { success } = action.payload;

                state.logoutSending = false;
                state.logoutError = false;
                success && localStorage.removeItem("refreshToken");
                success && deleteCookie("accessToken");
                success && localStorage.removeItem("bun");
                success && localStorage.removeItem("constructorIngredients");
                success && localStorage.setItem("isUserLogged", 'false')
            })
            .addCase(logoutUser.rejected, (state) => {
                state.logoutSending = false;
                state.logoutError = true;
            });
    },
});

const { reducer } = logoutSlice;
export { reducer as logoutReducer };
export default reducer;
