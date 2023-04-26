import { Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdEdit, MdManageAccounts, MdOutlineExpandMore, MdOutlineLogout, MdPassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AvatarManager from "../../assets/avatar_manager.png";
import FormChangePassword from '../../components/from/form-change-password/FormChangePassword';
import FormStudent from "../../components/from/form-student/FormStudent";
import FormTeacher from "../../components/from/form-teacher/FormTeacher";
import { fetchInfoAccount } from '../../redux/auth/AuthAction';
import { logout } from '../../redux/auth/AuthReducer';
import ModalConfirm from '../modal_confirm/ModalConfirm';
import "./Header.scss"

const Header = () => {
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isOpenUpdateInfo, setIsOpenUpdateInfo] = useState(false);
    const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState(false);
    const { imgUrl, name, role, dataAccount } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchInfoAccount());
    }, [dispatch, isOpenUpdateInfo])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenFormUpdate = () => {
        setIsOpenUpdateInfo(true);
        handleClose();
    }
    const handleCloseFormUpdate = () => {
        setIsOpenUpdateInfo(false);
    }

    const handleCloseModalChangePassword = () => {
        setIsOpenModalChangePassword(o => !o);
        handleClose();
    }

    const logoutAccount = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleOpenDialogConfirm = () => {
        handleClose();
        setIsOpenConfirm(true);
    }

    const navigateInfoDetail = () => {
        handleClose();
        navigate("/info-detail");
    }

    return (
        <div className='flex justify-between items-center h-10 shadow-sm hover:cursor-pointer'>
            <div className='text-xl text-primary font-bold pl-5'>Internship Management System</div>
            <div className='flex px-5' onClick={handleClick}>
                <div>
                    <img src={imgUrl || AvatarManager} alt="Avatar" className="rounded-full w-[30px] h-[30px]" />
                </div>
                <span className='pl-2'>{name}</span>
                <div><MdOutlineExpandMore size={30} /></div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {role !== "MANAGER" && <MenuItem onClick={navigateInfoDetail}><MdManageAccounts size={25} className='text-primary mr-2' />My account</MenuItem>}
                {role !== "MANAGER" && <MenuItem onClick={handleOpenFormUpdate}><MdEdit size={25} className='text-orange-600 mr-2' />Update info</MenuItem>}
                <MenuItem onClick={handleCloseModalChangePassword}><MdPassword size={25} className='text-amber-800 mr-2' />Change password</MenuItem>
                <MenuItem onClick={handleOpenDialogConfirm}><MdOutlineLogout size={25} className='text-red-600 mr-2' />Logout</MenuItem>
            </Menu>
            <ModalConfirm
                isOpen={isOpenConfirm}
                content="Do you want to sign out?"
                textConfirm="Logout"
                handleClose={() => setIsOpenConfirm(false)}
                handleConfirm={logoutAccount}
            />
            {role === "STUDENT" && <FormStudent isOpen={isOpenUpdateInfo} handleClose={handleCloseFormUpdate} student={dataAccount} isUpdateInfo />}
            {role === "TEACHER" && <FormTeacher isOpen={isOpenUpdateInfo} handleClose={handleCloseFormUpdate} teacher={dataAccount} isUpdateInfo />}
            {isOpenModalChangePassword && <FormChangePassword isOpen={isOpenModalChangePassword} handleClose={handleCloseModalChangePassword} />}
        </div>
    )
}

export default Header