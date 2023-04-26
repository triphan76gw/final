import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiFillCheckCircle } from 'react-icons/ai';
import { checkEmptyObject } from '../../untils/Ultil';
import StudentService from '../../services/StudentService';
import Loading from '../../shared/loading/Loading';
import TableGeneral from '../../shared/table_general/TableGeneral';
import moment from 'moment/moment';

const StudentAttendance = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [attendances, setAttendaces] = useState([]);
    const id = useSelector(state => state.auth.idStudentTeacher);

    const handleCheckAttendance = async () => {
        setIsLoading(true);
        await StudentService.addAttendanceStudent(id);
        const res = await StudentService.getListAttendanceByStudent(id);
        if (res.status === 200) {
            setAttendaces(res.data);
        }
        setIsLoading(false);
    }

    const checkDisabledAttendance = () => {
        const res = attendances.find((attendance) => attendance.attendaceCheck === moment(new Date()).format("YYYY-MM-DD"));
        if (checkEmptyObject(res)) {
            return false;
        } else {
            return true;
        }
    }

    const headers = ["No", "Attendance day", "Status"];

    const renderBodyTable = () => {
        return attendances.map((atten, idx) => ({
            stt: idx + 1,
            attendaceCheck: atten.attendaceCheck,
            status: <div className='flex w-full items-center justify-center'><AiFillCheckCircle color='green' size={25} /></div>
        }))
    }


    useEffect(() => {
        const getListAttendance = async () => {
            const res = await StudentService.getListAttendanceByStudent(id);
            if (res.status === 200) {
                setAttendaces(res.data);
            }
            setIsLoading(false);
        }
        getListAttendance();
    }, [id])

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            {isLoading && <Loading />}
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>ATTENDANCE</h2>
                </div>
                <div className="h-full w-full body-content overflow-hidden px-8">
                    <div className='flex gap-2 py-2'>
                        <button
                            className='btn btn-primary'
                            disabled={checkDisabledAttendance()}
                            onClick={handleCheckAttendance}
                        >
                            Add Attendance
                        </button>
                    </div>
                    <div>
                        <p className='border-b border-primary font-bold text-primary text-xl mt-2'>List Attendance:</p>
                        <TableGeneral headers={headers} body={renderBodyTable()} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentAttendance