import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import TeacherService from "../../../services/TeacherService";
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Loading from '../../../shared/loading/Loading';
import InternshipService from '../../../services/InternshipService';
import { checkEmptyObject } from "../../../untils/Ultil";

const schema = yup.object({
    nameInternShip: yup.string().required("Required!"),
    courseInternShip: yup.string().required("Required!"),
    startDay: yup.string().required("Required!"),
    endDay: yup.string().required("Required!"),
    address: yup.string().required("Required!"),
    teacher_id: yup.string().required("Required!"),
}).required();

const FormInternship = ({ internship, isOpen, handleClose }) => {

    const isUpdate = !checkEmptyObject(internship);
    const [isLoading, setIsLoading] = useState(true);
    const [listTeacher, setListTeacher] = useState([{ id: internship.teacherId ?? 1, name: "" }]);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            nameInternShip: "",
            courseInternShip: "",
            startDay: "",
            endDay: "",
            address: "",
            description: "",
            teacher_id: "",
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const getListTeacher = async () => {
            const res = await TeacherService.getListTeacher();
            setListTeacher(res.data);
            setIsLoading(false);
        }
        getListTeacher();
    }, [])

    useEffect(() => {
        if (isUpdate) {
            setValue("nameInternShip", internship.nameInternShip);
            setValue("courseInternShip", internship.courseInternShip);
            setValue("address", internship.address);
            setValue("description", internship.description);
            setValue("startDay", internship.startDay);
            setValue("endDay", internship.endDay);
            setValue("teacher_id", internship.teacherId);
        }
    }, [isUpdate, internship, setValue])

    const onSubmit = (data) => {
        if (!internship || checkEmptyObject(internship)) {
            createInternship(data);
        } else {
            updateInternship(data);
        }
    }

    const createInternship = async (data) => {
        try {
            setIsLoading(true);
            await InternshipService.createInternship(data);
        } catch (error) {

        } finally {
            handleClose();
        }
    }

    const updateInternship = async (data) => {
        try {
            setIsLoading(true);
            await InternshipService.updateInternship(data, internship.id);
        } catch (error) {

        } finally {
            handleClose();
        }
    }

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>{isUpdate ? 'Update' : 'Add'} Internship</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='flex gap-4'>
                                <div className='pb-4 w-full'>
                                    <Controller
                                        control={control}
                                        name="nameInternShip"
                                        render={({ field }) => (
                                            <TextField size='small' className='w-full' label="Internship Name:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.nameInternShip?.message}</p>
                                </div>
                                <div className='pb-4 w-full'>
                                    <Controller
                                        control={control}
                                        name="courseInternShip"
                                        render={({ field }) => (
                                            <TextField size='small' className='w-full' type="number" label="Course:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.courseInternShip?.message}</p>
                                </div>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <TextField size='small' className='w-full' label="Address:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.password?.message}</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='pb-4 w-1/2'>
                                    <Controller
                                        control={control}
                                        name="startDay"
                                        render={({ field }) => (
                                            <TextField size='small' InputLabelProps={{ shrink: true }} className='w-full' type="date" label="Start Day:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.startDay?.message}</p>
                                </div>
                                <div className='pb-4 w-1/2'>
                                    <Controller
                                        control={control}
                                        name="endDay"
                                        render={({ field }) => (
                                            <TextField size='small' InputLabelProps={{ shrink: true }} className='w-full' type="date" label="End Day:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.endDay?.message}</p>
                                </div>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <TextField size='small' multiline rows={4} className='w-full' label="Description:" variant="outlined" {...field} />
                                    )}
                                />
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="teacher_id"
                                    render={({ field }) => (
                                        <FormControl fullWidth size='small'>
                                            <InputLabel id="demo-simple-select-label">Teacher:</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Teacher"
                                                defaultValue=""
                                                {...field}
                                            >
                                                <MenuItem value="" disabled></MenuItem>
                                                {
                                                    listTeacher.map((teacher) => (<MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>))
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <p className='text-red-600'>{errors.teacher_id?.message}</p>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center my-6 gap-5'>
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-24">{isUpdate ? 'Update' : 'Add'}</button>
                        <button onClick={handleClose} className="btn btn-secondary w-24">Close</button>
                    </div>
                </div>
            </Dialog>
            {isLoading && <Loading />}
        </Fragment>
    )
}

export default FormInternship;