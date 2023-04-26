import { ConstanstAPI } from "../constant/APIContanst";
import https from "../https/httpHandle";

const StudentService = {
    getListStudent: async () => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_STUDENT.method,
                url: ConstanstAPI.GET_LIST_STUDENT.url,
            });
            return result;
        } catch (err) {
            console.log(err.toJSON())
            return { status: err.response?.status, data: err.response?.data?.message }
        }
    },
    getSearchListStudent: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_STUDENT_SEARCH.method,
                url: ConstanstAPI.GET_LIST_STUDENT_SEARCH.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getInfoStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_INFO_STUDENT.method,
                url: ConstanstAPI.GET_INFO_STUDENT.url + '/' + id,
                data: {}
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getEvaluateStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_EVALUATE_STUDENT.method,
                url: ConstanstAPI.GET_EVALUATE_STUDENT.url + '/' + id,
                data: {}
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getStatistical: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_DATA_STATISTICAL.method,
                url: ConstanstAPI.GET_DATA_STATISTICAL.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response?.status, data: err.response?.data?.message }
        }
    },
    createStudent: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.INSERT_STUDENT.method,
                url: ConstanstAPI.INSERT_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    createEvaluateStudent: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.CREATE_EVALUATE_STUDENT.method,
                url: ConstanstAPI.CREATE_EVALUATE_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getListAttendanceByStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_ATTENDANCE_STUDENT.method,
                url: ConstanstAPI.GET_LIST_ATTENDANCE_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getReportByStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_REPORT_STUDENT.method,
                url: ConstanstAPI.GET_REPORT_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    addReportByStudent: async (id, data) => {
        try {
            const dataStudent = await https({
                method: ConstanstAPI.GET_INFO_STUDENT.method,
                url: ConstanstAPI.GET_INFO_STUDENT.url + '/' + id,
            })
            const idIntershipStudent = dataStudent.data.idIntershipStudent;
            const formData = new FormData();
            formData.append('file', data[0]);
            const result = await https.post(ConstanstAPI.POST_REPORT_STUDENT.url + '/' + idIntershipStudent,
                formData,
                {
                    headers: {
                        "Content-type": 'multipart/form-data'
                    }
                });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    downloadFileReportByStudent: async (id, filename) => {
        try {
            const result = await https({
                method: ConstanstAPI.DOWNLOAD_REPORT_STUDENT.method,
                url: ConstanstAPI.DOWNLOAD_REPORT_STUDENT.url + '/' + id,
                responseType: "blob"
            }).then((response) => {
                const blob = new Blob([response]);
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
            }).catch((error) => {
                console.log(error);
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    deleteReportByStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_REPORT_STUDENT.method,
                url: ConstanstAPI.DELETE_REPORT_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    addAttendanceStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_ATTENDANCE_STUDENT.method,
                url: ConstanstAPI.GET_ATTENDANCE_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    updateStudent: async (id, data) => {
        try {
            const result = await https({
                method: ConstanstAPI.UPDATE_STUDENT.method,
                url: ConstanstAPI.UPDATE_STUDENT.url + '/' + id,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    updateEvaluateStudent: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.UPDATE_EVALUATE_STUDENT.method,
                url: ConstanstAPI.UPDATE_EVALUATE_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    deleteStudent: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_STUDENT.method,
                url: ConstanstAPI.DELETE_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default StudentService;