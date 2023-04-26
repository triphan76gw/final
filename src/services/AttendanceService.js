import https from "../https/httpHandle";
import { ConstanstAPI } from "../constant/APIContanst";

const InternshipService = {
    getListAttendanceByStudent: async (id) => {
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
    createAttendanceByStudent: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.INFO_TEACHER.method,
                url: ConstanstAPI.INFO_TEACHER.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default InternshipService;