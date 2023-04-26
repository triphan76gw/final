import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { countElementInPage } from '../../constant/Constants';
import TeacherService from '../../services/TeacherService';
import Loading from '../../shared/loading/Loading';
import TableGeneral from '../../shared/table_general/TableGeneral';

const TeacherInternship = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [internships, setInternships] = useState([])
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const id = useSelector(state => state.auth.idStudentTeacher);

    const viewDetailInternship = (id) => {
        navigate('/teacher/internship/'+ id);
    }

    const headers = ["STT", "Name", "Address", "Course", "Start day", "End day", "Action"];

    const renderDataTable = () => {
        return internships.slice((page - 1) * countElementInPage, countElementInPage * page).map(internship => {
            return {
                stt: <span className='font-bold'>{internship.id}</span>,
                name: internship.nameInternShip,
                address: internship.address,
                course: internship.courseInternShip,
                startDay: internship.startDay,
                endDay: internship.endDay,
                status: (
                    <div className='flex justify-center'>
                        <MdOutlineRemoveRedEye size={25} className='hover:cursor-pointer text-primary hover:text-blue-700' onClick={() => viewDetailInternship(internship.id)} />
                    </div>
                ),
            }
        })
    }

    const handleChangePanigation = (e, val) => {
        setPage(val);
    };


    useEffect(() => {
        const getListInternship = async () => {
            const res = await TeacherService.getListInternshipByTeacher(id);
            if (res.status === 200) {
                setInternships(res.data);
            }
            setIsLoading(false);
        }
        getListInternship();
    }, [id])

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            {isLoading && <Loading />}
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>Manager internship</h2>
                </div>
                <div className="h-full w-full body-content overflow-hidden px-8">
                    <div>
                        <p className='border-b border-primary font-bold text-primary text-xl mt-2 mb-2'>List Internship:</p>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                        <div className='mt-2 px-10 flex justify-end'><Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(internships.length / countElementInPage)} color="primary" showFirstButton showLastButton /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherInternship;