import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from "../../services/AuthService";

export const fetchLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        const response = await AuthService.login(username, password);
        const { id, username: lastName, role, token } = response.data;
        if (response.status === 200) {
            const payload = {
                id: id,
                role: role,
                token: token,
                lastName: lastName,
            }
            return payload;
        }
        else {
            return rejectWithValue(response.data);
        }
    });

export const fetchInfoAccount = createAsyncThunk(
    'auth/getInfo',
    async (data, thunkAPI) => {
        const { auth: { id, role } } = thunkAPI.getState();
        let resultInfo = {};
        if (role === "STUDENT") {
            resultInfo = await AuthService.getInfoStudent(id);
        } else if(role === "TEACHER") {
            resultInfo = await AuthService.getInfoTeacher(id);
        }
        if (resultInfo.status === 200) {
            const payload = {
                ...resultInfo.data
            }
            return payload;
        }
        else {
            return thunkAPI.rejectWithValue(resultInfo.data);
        }
    });