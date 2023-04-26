import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import avatar from "../../../assets/avatar.webp";
import StudentService from '../../../services/StudentService';
import Loading from '../../../shared/loading/Loading';
import { checkEmptyObject, fileToBase64 } from "../../../untils/Ultil";

const schema = yup.object({
    fullname: yup.string().required("Full name must be required!"),
    email: yup.string().email("Please enter incorrect email format!").required("Email must be required!"),
    dob: yup.string().required("Birthday must be required!"),
    sex: yup.string().required("Gender must be required!"),
    phone: yup.string().required("Phone number must be required!"),
    address: yup.string().required("Address must be required!"),
    className: yup.string().required("Class name must be required!"),
    year_study: yup.string().required("Course must be required!"),
    department: yup.string().required("Department must be required!"),
}).required();

const FormStudent = ({ isOpen, student, handleClose, isUpdateInfo = false }) => {
    useEffect(() => {
        if (isOpen === false) {
            setSrcAvatar(avatar);
        }
    }, [isOpen])
    const isUpdate = !checkEmptyObject(student);
    const [isLoading, setIsLoading] = useState(false);
    const [srcAvatar, setSrcAvatar] = useState(avatar);
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            fullname: "",
            email: "",
            dob: "2000-01-01",
            sex: "male",
            phone: "",
            address: "",
            className: "",
            year_study: "",
            department: "",
            avatar: ""
        },
        resolver: yupResolver(schema)
    });

    const chooseImage = () => {
        document.getElementById('from-student-input-file').click();
    }

    const handleChangeAvatar = async (e) => {
        const base = await fileToBase64(e.target.files[0]);
        setSrcAvatar('data:image/png;base64, ' + base);
        setValue("avatar", 'data:image/png;base64, ' + base);
    }

    const onSubmit = (data) => {
        if (isUpdate) {
            updateStudent(data);
        } else {
            creeateStudent(data);
        }
    }

    const creeateStudent = async (data) => {
        try {
            setIsLoading(true);
            await StudentService.createStudent(data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateStudent = async (data) => {
        try {
            setIsLoading(true);
            await StudentService.updateStudent(student.id, data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!checkEmptyObject(student)) {
            setValue("fullname", student.fullname ?? student.name);
            setValue("email", student.email);
            setValue("dob", student.dob ?? student.birthDay);
            setValue("address", student.address);
            setValue("sex", student.sex);
            setValue("phone", student.phone);
            setValue("className", student.className ?? student.class_);
            setValue("year_study", student.year_study ?? student.yearStudy);
            setValue("department", student.department);
            if (student.avatar) {
                setValue("avatar", student.avatar);
                setSrcAvatar(student.avatar);
            }
        }
    }, [student, setValue])

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>{isUpdate ? "Update Student" : "Add Student"}</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <TextField error={!!errors.fullname?.message} size='small' className='w-full' label="Full name:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.fullname?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <TextField error={!!errors.email?.message} size='small' className='w-full' label="Email:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.email?.message}</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='pb-4 w-1/2'>
                                    <Controller
                                        control={control}
                                        name="dob"
                                        render={({ field }) => (
                                            <TextField error={!!errors.dob?.message} size='small' InputLabelProps={{ shrink: true }} className='w-full' type="date" label="Birthday:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.dob?.message}</p>
                                </div>
                                <div className='pb-4 w-1/2'>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field }) => (
                                            <TextField error={!!errors.phone?.message} size='small' className='w-full' label="Phone Number:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.phone?.message}</p>
                                </div>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <TextField error={!!errors.address?.message} size='small' className='w-full' label="Address:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.address?.message}</p>
                            </div>
                            <div className='pb-4'>
                                <Controller
                                    control={control}
                                    name="sex"
                                    render={({ field }) => (
                                        <FormControl size='small' error={!!errors.sex?.message}>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Gender:</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                {...field}
                                            >
                                                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                                                <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                />
                                <p className='text-red-600'>{errors.sex?.message}</p>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="">Avatar:</label>
                                <input type="file" id='from-student-input-file' className='hidden' accept="image/png, image/gif, image/jpeg" onChange={handleChangeAvatar} />
                                <img src={srcAvatar} onClick={chooseImage} alt="Avatar Student" width={200} height={300} />
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="className"
                                    render={({ field }) => (
                                        <TextField disabled={isUpdateInfo} error={!!errors.className?.message} size='small' className='w-full' label="Class name:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.className?.message}</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='pb-4 w-full'>
                                    <Controller
                                        control={control}
                                        name="year_study"
                                        render={({ field }) => (
                                            <TextField disabled={isUpdateInfo} error={!!errors.year_study?.message} size='small' className='w-full' label="Course:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.year_study?.message}</p>
                                </div>
                                <div className='pb-4 w-full'>
                                    <Controller
                                        control={control}
                                        name="department"
                                        render={({ field }) => (
                                            <TextField disabled={isUpdateInfo} error={!!errors.department?.message} size='small' className='w-full' label="Department:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.department?.message}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center my-6 gap-5'>
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-24">{isUpdate ? "Update" : "Add"}</button>
                        <button onClick={handleClose} className="btn btn-secondary w-24">Close</button>
                    </div>
                </div>
            </Dialog>
            {isLoading && <Loading />}
        </Fragment>
    )
}

export default FormStudent;