import https from "../https/httpHandle";
import { ConstanstAPI } from "../constant/APIContanst";

const AuthService = {
    login: async (username, password) => {
        try {
            const payload = { username, password };
            const result = await https({
                method: ConstanstAPI.LOGIN.method,
                url: ConstanstAPI.LOGIN.url,
                data: payload
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    changePassword: async (username, password, newPassword) => {
        try {
            const payload = { username, password, newPassword };
            const result = await https({
                method: ConstanstAPI.CHANGE_PASSWORD.method,
                url: ConstanstAPI.CHANGE_PASSWORD.url,
                data: payload
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    forgetPassword: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.FORGET_PASSWORD.method,
                url: ConstanstAPI.FORGET_PASSWORD.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getInfoStudent: async (id) => {
        try {
            const result = await https.get(ConstanstAPI.INFO_ACCOUNT_STUDENT.url + '/' + id);
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getInfoTeacher: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.INFO_ACCOUNT_TEACHER.method,
                url: ConstanstAPI.INFO_ACCOUNT_TEACHER.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default AuthService;