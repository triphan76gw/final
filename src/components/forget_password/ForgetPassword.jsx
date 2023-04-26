import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Loading from "../../shared/loading/Loading";
import srcImg from "../../assets/img-login.avif";
import AuthService from '../../services/AuthService';
import "./ForgetPassword.scss";
import ModalAlert from '../../shared/modal-alert/ModalAlert';

const schema = yup.object({
    username: yup
        .string()
        .required('Please enter a Email!'),
}).required();

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const navigate = useNavigate();

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
        },
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        setIsLoading(true);
        const res = await AuthService.forgetPassword(data);
        setIsLoading(false);
        if(res.status === 200) {
            setObjAlert({ isOpen: true, message: 'Please check your email for a new password! ', type: "success" });
        }else{
            setObjAlert({ isOpen: true, message: 'Email does not exist! ', type: "error" });
        }
    }

    const handleCloseAlert = () => {
        if(objAlert.type === "success") {
            navigate('/')
        }else{
            setObjAlert({ isOpen: false, message: '', type: null });
        }
    }


    return (
        <div className='w-full h-screen relative forget-password-container'>
            {isLoading && <Loading />}
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {/* <div className='forget-password-content box-center opacity-80 w-[600px]'>
                <h2 className='text-4xl text-center font-bold text-primary uppercase pb-5'>Forget Password</h2>
                <p className='text-center text-lg'>Vui lòng nhập MSSV cần thay đổi mật khẩu!</p>
                <form className='p-7' onSubmit={handleSubmit(onSubmit)}>
                    <div className='pb-4'>
                        <Controller
                            control={control}
                            name="username"
                            render={({ field }) => (
                                <TextField className='w-full' label="ID:" variant="standard" {...field} />
                            )}
                        />
                        <p className='text-red-600'>{errors.username?.message}</p>
                    </div>
                    <div className="text-right">
                        <Link to={'/'} className="text-primary">I have a account!</Link>
                    </div>
                    <div className='text-center mt-8'>
                        <button type='submit' className="btn btn-primary w-72">Sumbit</button>
                    </div>
                </form>
            </div> */}
            <div className="login-content box-center grid grid-cols-2 overflow-hidden">
                <div className=''>
                    <img src={srcImg} alt="avatar" />
                </div>
                <div className='flex flex-col justify-center items-center px-4'>
                    <RiLockPasswordLine size={120} className='text-primary bg-white' />
                    <h2 className='text-3xl text-center font-bold text-primary uppercase pb-5'>Forgot Password</h2>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className='pb-4'>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field }) => (
                                    <TextField className='w-full' label="Email:" variant="standard" {...field} />
                                )}
                            />
                            <p className='text-red-600'>{errors.username?.message}</p>
                        </div>
                        <div className="text-right">
                            <Link to={'/'} className="text-primary">I have an account!</Link>
                        </div>
                        <div className='text-center mt-8'>
                            <button type='submit' className="btn btn-primary w-full">Sumbit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;