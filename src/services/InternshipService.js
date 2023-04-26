import https from "../https/httpHandle";
import { ConstanstAPI } from "../constant/APIContanst";

const InternshipService = {
    getListInternship: async () => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_INTERNSHIP.method,
                url: ConstanstAPI.GET_LIST_INTERNSHIP.url,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getSearchListInternship: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_SEARCH_LIST_INTERNSHIP.method,
                url: ConstanstAPI.GET_SEARCH_LIST_INTERNSHIP.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getInfoInternship: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_INFO_INTERNSHIP.method,
                url: ConstanstAPI.GET_INFO_INTERNSHIP.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getInfoInternshipStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_INFO_INTERNSHIP_STUDENT.method,
                url: ConstanstAPI.GET_INFO_INTERNSHIP_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    createInternship: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.CREATE_INTERNSHIP.method,
                url: ConstanstAPI.CREATE_INTERNSHIP.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    updateInternship: async (data, id) => {
        try {
            const result = await https({
                method: ConstanstAPI.UPDATE_INTERNSHIP.method,
                url: ConstanstAPI.UPDATE_INTERNSHIP.url + '/' + id,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    createInternshipStudent: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.CREATE_INTERNSHIP_STUDENT.method,
                url: ConstanstAPI.CREATE_INTERNSHIP_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    updateInternshipStudent: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.UPDATE_INTERNSHIP_STUDENT.method,
                url: ConstanstAPI.UPDATE_INTERNSHIP_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    deleteInternship: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_INTERNSHIP.method,
                url: ConstanstAPI.DELETE_INTERNSHIP.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    deleteInternshipStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_INTERNSHIP_STUDENT.method,
                url: ConstanstAPI.DELETE_INTERNSHIP_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default InternshipService;