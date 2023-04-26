import { Menu, MenuItem, Pagination, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdAdd, MdDeleteForever, MdEdit, MdOutlineMoreHoriz, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { countElementInPage } from '../../constant/Constants';
import TeacherService from '../../services/TeacherService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import TableGeneral from '../../shared/table_general/TableGeneral';
import FormTeacher from '../from/form-teacher/FormTeacher';
import './ListTeacher.scss';

const ListTeacher = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ name: "", level: "", specialize: "" });
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [idTeacher, setIdTeacher] = useState(null);
    const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
    const [isOpenModalAddTeacher, setIsOpenModalAddTeacher] = useState(false);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChangeValueSearch = (name, value) => {
        setSearch((val) => ({
            ...val,
            [name]: value.target.value
        }));
    }

    const handleSearchListTeacher = async () => {
        try {
            setIsLoading(true);
            const res = await TeacherService.getSearchListTeacher(search);
            const data = res.data.map((teacher) => ({
                ...teacher,
                name: teacher.fullName,
            }))
            setTeachers(data);
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleClick = (event, id) => {
        setIdTeacher(id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const showModalAddTeacher = () => {
        setIsOpenModalAddTeacher(true);
    }

    const showModalUpdateTeacher = () => {
        const filterTeacher = teachers.find(({ id }) => id === idTeacher);
        setTeacher(filterTeacher);
        handleClose();
        setIsOpenModalAddTeacher(true);
    }

    const closeModalAddTeacher = () => {
        setIdTeacher(null);
        setTeacher({});
        setIsOpenModalAddTeacher(false);
    }

    const handleConfirmDeleteTeacher = () => {
        handleClose();
        setIsOpenModalConfirmDelete(true);
    }

    const handleViewDetailTeacher = () => {
        if (idTeacher) {
            navigate("/list-teacher/detail/" + idTeacher);
        }
    }

    const handleCloseModalConfirmDelete = () => {
        setIsOpenModalConfirmDelete(false);
    }

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };

    const deleteTeacher = async () => {
        try {
            setIsLoading(true);
            handleCloseModalConfirmDelete();
            await TeacherService.deleteTeacher(idTeacher);
            await handleGetData();
            setObjAlert({ isOpen: true, message: "Teacher Deleted Success!", type: "success" });
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Teacher Deleted Fail!", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    const headers = ["ID", "Full Name", "Email", "Gender", "Phone Number", "Level", "Specialize", "Action"];

    const renderDataTable = () => {
        return teachers.slice((page - 1) * countElementInPage, countElementInPage * page).map(teacher => {
            return {
                mssv: <span className='font-bold'>TC{teacher.id}</span>,
                name: teacher.name,
                email: teacher.email,
                gender: teacher.sex === 'male' ? <span className='font-bold text-primary'>{teacher.sex}</span> : <span className='font-bold text-purple-700'>{teacher.sex}</span>,
                phone: teacher.phone,
                level: teacher.level,
                specialize: teacher.specialize,
                status: (
                    <div className='flex justify-center'>
                        <MdOutlineMoreHoriz size={25} className='hover:cursor-pointer hover:bg-gray-400 rounded-full' onClick={(e) => handleClick(e, teacher.id)} />
                    </div>
                ),
            }
        })
    }

    const handleGetData = async () => {
        try {
            const teacherResult = await TeacherService.getListTeacher();
            if (teacherResult.status === 200) {
                const data = teacherResult.data.map((teacher) => ({
                    ...teacher,
                }))
                setTeachers(data);
            }
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleGetData();
    }, [isOpenModalAddTeacher]);

    const handleChangePanigation = (e, val) => {
        setPage(val);
    };

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>List Teacher</h2>
                    <MdAdd onClick={showModalAddTeacher} size={25} className='text-white hover:cursor-pointer hover:bg-gray-200 rounded-full' />
                </div>
                <div className="h-full w-full body-content overflow-hidden">
                    <h4 className='mx-10 border-b border-primary font-bold text-primary text-xl mt-2'>Filter:</h4>
                    <div className='flex gap-5 mt-2 mx-10 mb-5'>
                        <TextField className='w-full' label="Name:" onChange={(val) => handleChangeValueSearch("name", val)} variant="outlined" />
                        <TextField className='w-full' label="Level:" onChange={(val) => handleChangeValueSearch("level", val)} variant="outlined" />
                        <TextField className='w-full' label="Specialize:" onChange={(val) => handleChangeValueSearch("specialize", val)} variant="outlined" />
                        <button className='btn btn-primary w-[420px] text-xl' onClick={handleSearchListTeacher}>Search</button>
                    </div>
                    <div className='px-10 w-full h-[430px] overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                    <div className='mt-2 px-10 flex justify-end'><Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(teachers.length / countElementInPage)} color="primary" showFirstButton showLastButton /></div>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleViewDetailTeacher}>
                    <div className='flex'><MdOutlineRemoveRedEye size={25} className='text-primary' /> <div className='w-20 px-4'>Detail</div></div>
                </MenuItem>
                <MenuItem onClick={showModalUpdateTeacher}>
                    <div className='flex'><MdEdit size={25} className='text-yellow-700' /> <div className='w-20 px-4'>Update</div></div>
                </MenuItem>
                <MenuItem onClick={handleConfirmDeleteTeacher}>
                    <div className='flex'><MdDeleteForever size={25} className='text-red-700' /> <div className='w-20 px-4'>Delete</div></div>
                </MenuItem>
            </Menu>
            <ModalConfirm
                isOpen={isOpenModalConfirmDelete}
                content="Do you want to delete this teacher?"
                handleConfirm={deleteTeacher}
                handleClose={handleCloseModalConfirmDelete} />
            {isOpenModalAddTeacher && <FormTeacher
                isOpen={isOpenModalAddTeacher}
                idTeacher={idTeacher}
                teacher={teacher}
                handleClose={closeModalAddTeacher}
            />}
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default ListTeacher