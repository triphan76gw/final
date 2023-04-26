import https from "../https/httpHandle";
import { ConstanstAPI } from "../constant/APIContanst";

const TeacherService = {
    getListTeacher: async () => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_TEACHER.method,
                url: ConstanstAPI.GET_LIST_TEACHER.url,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getSearchListTeacher: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_SEARCH_LIST_TEACHER.method,
                url: ConstanstAPI.GET_SEARCH_LIST_TEACHER.url,
                data: data,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getInfoTeacher: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.INFO_TEACHER.method,
                url: ConstanstAPI.INFO_TEACHER.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getListInternshipByTeacher: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_INTERNSHIP_TEACHER.method,
                url: ConstanstAPI.GET_LIST_INTERNSHIP_TEACHER.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    createTeacher: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.INSERT_TEACHER.method,
                url: ConstanstAPI.INSERT_TEACHER.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    updateTeacher: async (id, data) => {
        try {
            const result = await https({
                method: ConstanstAPI.UPDATE_TEACHER.method,
                url: ConstanstAPI.UPDATE_TEACHER.url + '/' + id,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    deleteTeacher: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_TEACHER.method,
                url: ConstanstAPI.DELETE_TEACHER.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default TeacherService;