import { Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdEdit, MdOutlineMoreHoriz } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import avatarSrc from "../../assets/avatar.webp";
import TeacherService from '../../services/TeacherService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import FormTeacher from '../from/form-teacher/FormTeacher';

const DetailTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [infoTeacher, setInfoTeacher] = useState({});
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [isOpenFormTeacher, setIsOpenFormTeacher] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

    const handleClickOpenUpdateTeacher = (isOpen) => {
        setIsOpenFormTeacher(isOpen);
        handleClose();
    }

    const handleClickToggleModalConfirmDelete = (isOpen) => {
        setIsOpenConfirmDelete(isOpen);
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

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
        if (objAlert.message === "Teacher Deleted Success!") {
            navigate('/teacher');
        }
    };

    const deleteTeacher = async () => {
        try {
            setIsLoading(true);
            handleClickToggleModalConfirmDelete(false);
            await TeacherService.deleteTeacher(id);
            setObjAlert({ isOpen: true, message: "Teacher Deleted Success!", type: "success" });
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Teacher Deleted Fail!", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    
    useEffect(() => {
        const getInfoTeacher = async () => {
            try {
                setIsLoading(true);
                let response = {};
                const resTeacher = await TeacherService.getInfoTeacher(id);
                response = {
                    ...resTeacher.data,
                    name: resTeacher.data.fullName,
                    id: id,
                    birthDay: resTeacher.data.dob,
                }
                setInfoTeacher(response);
            } catch (error) {
                setObjAlert({ isOpen: true, message: "GET Info Teacher Fail!", type: "error" });
            } finally {
                setIsLoading(false);
            }
        }
        getInfoTeacher();
    }, [id, isOpenFormTeacher])


    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            <div className="w-full h-full flex flex-col bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>DETAIL TEACHER</h2>
                    <MdOutlineMoreHoriz onClick={handleClick} size={25} className='text-gray-50 hover:cursor-pointer hover:bg-gray-600 rounded-full' />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClickOpenUpdateTeacher(true)}>
                            <div className='flex'><MdEdit size={25} className='text-primary' /> <div className='px-4'>Update Info</div></div>
                        </MenuItem>
                        <MenuItem onClick={() => handleClickToggleModalConfirmDelete(true)}>
                            <div className='flex'><MdDeleteForever size={25} className='text-red-500' /> <div className='px-4'>Delete</div></div>
                        </MenuItem>
                    </Menu>
                </div>
                <div className="h-full flex pt-4 pb-8 overflow-hidden">
                    <div className='w-1/3 h-full pl-20'>
                        <img src={infoTeacher.avatar === '' ? avatarSrc : infoTeacher.avatar} alt="Avatar Account" className='w-full h-full' />
                    </div>
                    <div className='w-2/3 h-full pl-5 pr-5 overflow-auto'>
                        <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Info</div>
                        <div className='grid grid-cols-2 mb-4 px-4'>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>ID:</div>
                                <p>{`GV${id}`}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Full Name:</div>
                                <p>{infoTeacher.fullName}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Email:</div>
                                <p>{infoTeacher.email}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Gender:</div>
                                <p>{infoTeacher.sex}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Birthday:</div>
                                <p>{infoTeacher.dob}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Phone:</div>
                                <p>{infoTeacher.phone}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Address:</div>
                                <p>{infoTeacher.address}</p>
                            </div>
                        </div>
                        <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>More</div>
                        <div className='grid grid-cols-2 mb-4 px-4'>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Level:</div>
                                <p>{infoTeacher.level}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Salary:</div>
                                <p>{infoTeacher.salary} $</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Specialize:</div>
                                <p>{infoTeacher.specialize}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenFormTeacher && <FormTeacher isOpen={isOpenFormTeacher} teacher={infoTeacher} handleClose={() => handleClickOpenUpdateTeacher(false)} />}
            <ModalConfirm
                isOpen={isOpenConfirmDelete}
                content="Do you want to delete this teacher?"
                handleConfirm={deleteTeacher}
                handleClose={() => handleClickToggleModalConfirmDelete(false)} />
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default DetailTeacher