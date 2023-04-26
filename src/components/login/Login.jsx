import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import srcImg from "../../assets/img-login.avif";
import { fetchLogin } from '../../redux/auth/AuthAction';
import Loading from '../../shared/loading/Loading';
import "./Login.scss";

const schema = yup.object({
    username: yup
        .string()
        .required('Please enter your email!'),
    password: yup
        .string()
        .required('Please enter your password!'),
        // .min(7, "Passwords are 7 - 20 characters in length!")
        // .max(20, "Passwords are 7 - 20 characters in length!"),
}).required();

const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const { isLoading, errMsg } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        dispatch(fetchLogin(data));
    }

    return (
        <div className='container-login relative overflow-hidden'>
            {isLoading && <Loading />}
            <div className="login-content box-center grid grid-cols-2 overflow-hidden">
                <div className=''>
                    <img src={srcImg} alt="" />
                </div>
                <div className='flex items-center flex-col justify-center'>
                    <MdOutlineAccountCircle size={120} className='text-white bg-primary rounded-[50%]' />
                    <h2 className='text-4xl text-center font-bold text-primary uppercase pb-1'>Login</h2>
                    <form className='w-full p-6' onSubmit={handleSubmit(onSubmit)}>
                        <div className='pb-4'>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field }) => (
                                    <TextField className='w-full' label="Email:" variant="standard" {...field} />
                                )}
                            />
                            <p className='text-red-600'>{errors.username?.message || errMsg}</p>
                        </div>
                        <div className='pb-4'>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormControl className="w-full pb-4" variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password:</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                            <p className='text-red-600'>{errors.password?.message}</p>
                        </div>
                        <div className="text-right">
                            <Link to={'/forget-password'} className="text-primary">Forgot Password!</Link>
                        </div>
                        <div className='text-center mt-8'>
                            <button type='submit' className="btn btn-primary w-full">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;