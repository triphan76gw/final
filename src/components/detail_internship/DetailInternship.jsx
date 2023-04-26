import { Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdEdit, MdOutlineMoreHoriz, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import TableGeneral from "../../shared/table_general/TableGeneral";
import FormInternship from "../from/form-internship/FormInternship";
import InternshipService from '../../services/InternshipService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import { useSelector } from 'react-redux';

const DetailInternship = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [student, setStudent] = useState({});
    const [infoInternship, setInfoInternship] = useState({});
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [isOpenFormInternship, setIsOpenFormInternship] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState({ isOpen: false, content: "", type: "" });
    const navigate = useNavigate();
    const { role } = useSelector(state => state.auth);

    const headers = ["ID", "Name", "Email", "Gender", "Phone", "Class", "Course", "Action"];

    const renderDataTable = () => {
        if (!infoInternship?.students) {
            return [];
        }
        return infoInternship.students?.map(student => {
            return {
                id: <span className='font-bold'>SV{student.id}</span>,
                name: student.fullname,
                email: student.email,
                gender: student.sex === 'male' ? <span className='font-bold text-primary'>{student.sex}</span> : <span className='font-bold text-purple-700'>{student.sex}</span>,
                phone: student.phone,
                class: student.className,
                schoolYear: student.year_study,
                status: (
                    <div className='flex justify-center'>
                        <MdOutlineMoreHoriz size={25} className='hover:cursor-pointer hover:bg-gray-400 rounded-full' onClick={(e) => handleClickStudent(e, student)} />
                    </div>
                ),
            }
        })
    }

    const handleClickOpenUpdateInternship = (isOpen) => {
        setIsOpenFormInternship(isOpen);
        handleClose();
    }

    const handleClickToggleModalConfirmDelete = (isOpen, content = '', type = '') => {
        setIsOpenConfirmDelete({ isOpen, content, type });
        handleClose();
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorElStudent, setAnchorElStudent] = React.useState(null);
    const openStudent = Boolean(anchorElStudent);

    const handleClickStudent = (event, student) => {
        setAnchorElStudent(event.currentTarget);
        setStudent(student);
    };

    const handleCloseStudent = () => {
        setAnchorElStudent(null);
    };

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
        if (objAlert.message === "Student Deleted Success!") {
            navigate('/list-student');
        }
    };

    const navigateDetailStudent = () => {
        navigate(`/list-student/detail/${student.id}`);
    }

    const handleConfirmModalDelete = () => {
        if (isOpenConfirmDelete.type === "INTERNSHIP") {
            deleteInternship();
        } else {
            deleteStudentFormInternship();
        }
    }

    const deleteInternship = async () => {
        try {
            handleClickToggleModalConfirmDelete(false);
            await InternshipService.deleteInternship(id);
            navigate("/internship");
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Internship Deleted Fail!", type: "error" });
        }
    }

    const deleteStudentFormInternship = async () => {
        try {
            handleClickToggleModalConfirmDelete(false);
            const res = await InternshipService.deleteInternshipStudent(student.idIntershipStudent);
            if (res.status !== 200) {
                setObjAlert({ isOpen: true, message: "Can't delete internship student!", type: "error" });
            }
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Student Deleted Fail!", type: "error" });
        }
    }

    useEffect(() => {
        const getInfoInternship = async () => {
            try {
                setIsLoading(true);
                let response = {};
                const resInternship = await InternshipService.getInfoInternship(id);
                response = {
                    ...resInternship.data
                }
                setInfoInternship(response);
            } catch (error) {
                setObjAlert({ isOpen: true, message: "GET Info Internship Fail!", type: "error" });
            } finally {
                setIsLoading(false);
            }
        }

        getInfoInternship();
    }, [id, isOpenFormInternship])

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            <div className="w-full h-full flex flex-col bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>DETAIL INTERNSHIP</h2>
                    {
                        role === "MANAGER"
                        && <MdOutlineMoreHoriz onClick={handleClick} size={25} className='text-gray-50 hover:cursor-pointer hover:bg-gray-600 rounded-full' />
                    }
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClickOpenUpdateInternship(true)}>
                            <div className='flex'><MdEdit size={25} className='text-primary' /> <div className='px-4'>Update Internship</div></div>
                        </MenuItem>
                        <MenuItem onClick={() => handleClickToggleModalConfirmDelete(true, "Are you sure to delete this internship!", "INTERNSHIP")}>
                            <div className='flex'><MdDeleteForever size={25} className='text-red-500' /> <div className='px-4'>Delete</div></div>
                        </MenuItem>
                    </Menu>
                </div>
                <div className="h-full flex flex-col pt-4 pb-8 px-4 overflow-hidden">
                    <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Info</div>
                    <div className='grid grid-cols-2 mb-4 px-4'>
                        <div className='flex text-lg py-2 w-full'>
                            <div className='w-28 font-bold'>Name:</div>
                            <p>{infoInternship.nameInternShip}</p>
                        </div>
                        <div className='flex text-lg py-2'>
                            <div className='w-28 font-bold'>Course:</div>
                            <p>{infoInternship.courseInternShip}</p>
                        </div>
                        <div className='flex text-lg col-span-2 py-2'>
                            <div className='w-28 font-bold'>Teacher:</div>
                            <p>{infoInternship.teacherName}</p>
                        </div>
                        <div className='flex text-lg col-span-2 py-2'>
                            <div className='w-28 font-bold'>Address:</div>
                            <p>{infoInternship.address}</p>
                        </div>
                        <div className='flex text-lg py-2'>
                            <div className='w-28 font-bold'>Start Day:</div>
                            <p>{infoInternship.startDay}</p>
                        </div>
                        <div className='flex text-lg py-2'>
                            <div className='w-28 font-bold'>End Day:</div>
                            <p>{infoInternship.endDay}</p>
                        </div>
                        <div className='flex text-lg py-2'>
                            <div className='w-28 font-bold'>Description:</div>
                            <p>{infoInternship.description}</p>
                        </div>
                    </div>
                    <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>List Student</div>
                    <div className='w-full h-full overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                </div>
            </div>
            <Menu
                anchorEl={anchorElStudent}
                open={openStudent}
                onClose={handleCloseStudent}
            >
                <MenuItem onClick={navigateDetailStudent}>
                    <div className='flex'><MdOutlineRemoveRedEye size={25} className='text-primary' /> <div className='px-4'>Detail Student</div></div>
                </MenuItem>
                {
                    role === "MANAGER"
                    && <MenuItem onClick={() => handleClickToggleModalConfirmDelete(true, "Are you sure to remove this student from the internship?", "STUDENT")}>
                        <div className='flex'><MdDeleteForever size={25} className='text-red-500' /> <div className='px-4'>Delete</div></div>
                    </MenuItem>
                }
            </Menu>
            {isOpenFormInternship && <FormInternship isOpen={isOpenFormInternship} internship={infoInternship} handleClose={() => handleClickOpenUpdateInternship(false)} />}
            <ModalConfirm
                isOpen={isOpenConfirmDelete.isOpen}
                content={isOpenConfirmDelete.content}
                handleConfirm={handleConfirmModalDelete}
                handleClose={() => handleClickToggleModalConfirmDelete(false)} />
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default DetailInternship