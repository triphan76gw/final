import { Menu, MenuItem, Pagination, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdAdd, MdDeleteForever, MdEdit, MdOutlineMoreHoriz, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import StudentService from '../../services/StudentService';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import TableGeneral from '../../shared/table_general/TableGeneral';
import FormStudent from '../from/form-student/FormStudent';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import './ListStudent.scss';
import { countElementInPage } from '../../constant/Constants';

// const countElementInPage = 10;

const ListStudent = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState({ name: "", className: "", year_study: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});
    const [idStudent, setIdStudent] = useState(null);
    const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
    const [isOpenModalAddStudent, setIsOpenModalAddStudent] = useState(false);

    const navigate = useNavigate();

    const handleGetData = async () => {
        try {
            const studentResult = await StudentService.getListStudent();
            if (studentResult?.status === 200) {
                const data = studentResult.data.map((student) => ({
                    ...student.internship,
                    idInternship: student.internship?.id,
                    ...student.students,
                }))
                setStudents(data);
            }
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleGetData();
    }, [isOpenModalAddStudent]);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, id) => {
        setIdStudent(id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };

    const showModalAddStudent = () => {
        handleClose();
        setIsOpenModalAddStudent(true);
    }

    const showModalUpdateStudent = () => {
        const filterStudent = students.find(({ id }) => id === idStudent);
        setStudent(filterStudent);
        handleClose();
        setIsOpenModalAddStudent(true);
    }

    const closeModalAddStudent = () => {
        setIdStudent(null);
        setStudent({});
        setIsOpenModalAddStudent(false);
    }

    const handleConfirmDeleteStudent = () => {
        handleClose();
        setIsOpenModalConfirmDelete(true);
    }

    const handleChangeValueSearch = (name, value) => {
        setSearch((val) => ({
            ...val,
            [name]: value.target.value
        }));
    }

    const handleSearchListStudent = async () => {
        try {
            setIsLoading(true);
            const res = await StudentService.getSearchListStudent(search);
            const data = res.data.map((student) => ({
                ...student.internship,
                idInternship: student.internship?.id,
                ...student.students,
            }))
            setStudents(data);
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleViewDetailStudent = () => {
        if (idStudent) {
            navigate("/list-student/detail/" + idStudent);
        }
    }

    const handleCloseModalConfirmDelete = () => {
        setIsOpenModalConfirmDelete(false);
    }

    const deleteStudent = async () => {
        try {
            handleCloseModalConfirmDelete();
            await StudentService.deleteStudent(idStudent);
            handleGetData();
            setObjAlert({ isOpen: true, message: "Student Deleted Success!", type: "success" });
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Student Deleted Fail!", type: "error" });
        }
    }

    const headers = ["ID", "Full Name", "Email", "Gender", "Phone Number", "Class", "Course", "Start Day", "End Day", "Action"];

    const renderDataTable = () => {
        return students.slice((page - 1) * countElementInPage, countElementInPage * page).map(student => {
            return {
                id: <span className='font-bold'>ST{student.id}</span>,
                name: student.fullname,
                email: student.email,
                gender: student.sex === 'male' ? <span className='font-bold text-primary'>{student.sex}</span> : <span className='font-bold text-purple-700'>{student.sex}</span>,
                phone: student.phone,
                class: student.className,
                schoolYear: student.year_study,
                startDay: student.startDay,
                endDay: student.endDay,
                status: (
                    <div className='flex justify-center'>
                        <MdOutlineMoreHoriz size={25} className='hover:cursor-pointer hover:bg-gray-400 rounded-full' onClick={(e) => handleClick(e, student.id)} />
                    </div>
                ),
            }
        })
    }

    const handleChangePanigation = (e, val) => {
        setPage(val);
    };

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>List Student</h2>
                    <MdAdd onClick={showModalAddStudent} size={25} className='text-white hover:cursor-pointer hover:bg-gray-200 rounded-full' />
                </div>
                <div className="h-full w-full body-content overflow-hidden">
                    <h4 className='mx-10 border-b border-primary font-bold text-primary text-xl mt-2'>Filter:</h4>
                    <div className='flex gap-5 mt-2 mx-10 mb-5'>
                        <TextField className='w-full' label="Name:" value={search.name} onChange={(val) => handleChangeValueSearch("name", val)} variant="outlined" />
                        <TextField className='w-full' label="Class:" value={search.className} onChange={(val) => handleChangeValueSearch("className", val)} variant="outlined" />
                        <TextField className='w-full' label="School year:" value={search.year_study} onChange={(val) => handleChangeValueSearch("year_study", val)} variant="outlined" />
                        <button className='btn btn-primary w-[420px] text-xl' onClick={handleSearchListStudent}>Search</button>
                    </div>
                    <div className='px-10 w-full h-[430px] overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                    <div className='mt-2 px-10 flex justify-end'><Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(students.length / countElementInPage)} color="primary" showFirstButton showLastButton /></div>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleViewDetailStudent}>
                    <div className='flex'><MdOutlineRemoveRedEye size={25} className='text-primary' /> <div className='w-20 px-4'>Detail</div></div>
                </MenuItem>
                <MenuItem onClick={showModalUpdateStudent}>
                    <div className='flex'><MdEdit size={25} className='text-yellow-700' /> <div className='w-20 px-4'>Update</div></div>
                </MenuItem>
                <MenuItem onClick={handleConfirmDeleteStudent}>
                    <div className='flex'><MdDeleteForever size={25} className='text-red-700' /> <div className='w-20 px-4'>Delete</div></div>
                </MenuItem>
            </Menu>
            <ModalConfirm
                isOpen={isOpenModalConfirmDelete}
                content="Do you want to delete this student?"
                handleConfirm={deleteStudent}
                handleClose={handleCloseModalConfirmDelete} />
            {
                isOpenModalAddStudent && <FormStudent
                    isOpen={isOpenModalAddStudent}
                    idStudent={idStudent}
                    student={student}
                    handleClose={closeModalAddStudent}
                />
            }
        </div>
    )
}

export default ListStudent