import { createSlice } from "@reduxjs/toolkit";
import { fetchInfoAccount, fetchLogin } from "./AuthAction";

const initialState = {
    token: localStorage.getItem("token"),
    name: localStorage.getItem("lastName"),
    id: localStorage.getItem("idUser"),
    idStudentTeacher: localStorage.getItem("idStudentTeacher"),
    imgUrl: localStorage.getItem("imgUrl"),
    role: localStorage.getItem("role"),
    dataAccount: {},
    isLoading: false,
    errMsg: "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.name = '';
            state.mssv = '';
            state.imgUrl = '';
            state.id = '';
            state.mssv = '';
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                const { id, token, role, lastName } = action.payload;
                localStorage.setItem("idUser", id);
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                localStorage.setItem("lastName", lastName);
                state.isLoading = false;
                state.role = role;
                state.id = id;
                state.name = lastName;
                state.token = token;
                state.errMsg = "";
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = "Incorrect account or password!";
            })
            .addCase(fetchInfoAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInfoAccount.fulfilled, (state, action) => {
                localStorage.setItem("imgUrl", action.payload.avatar);
                localStorage.setItem("idStudentTeacher", action.payload.id);
                console.log(action.payload);
                state.dataAccount = action.payload;
                state.idStudentTeacher = action.payload.id;
                state.isLoading = false;
                state.imgUrl = action.payload.avatar;
            })
            .addCase(fetchInfoAccount.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
});

export const { logout } = authSlice.actions