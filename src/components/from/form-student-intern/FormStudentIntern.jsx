import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import InternshipService from '../../../services/InternshipService';
import Loading from '../../../shared/loading/Loading';

const schema = yup.object({
    internshipId: yup.string().required("Internship must be required!")
}).required();

const FormStudentIntern = ({ isOpen, student, handleClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [idInternshipSelected, setIdInternshipSelected] = useState(student.idInternship ?? "");
    const [internships, setInternships] = useState([]);
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            internshipId: student.idInternship ?? "",
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        if (student.idInternship) {
            updateInternshipStudent(data);
        } else {
            createInternshipStudent(data);
        }
    }

    const createInternshipStudent = async (data) => {
        try {
            setIsLoading(true);
            const payload = {
                internshipId: +data.internshipId,
                studentId: student.id
            }
            await InternshipService.createInternshipStudent(payload);
        } catch (error) {
        } finally {
            setIsLoading(false);
            handleClose();
        }
    }

    const updateInternshipStudent = async (data) => {
        try {
            setIsLoading(true);
            const payload = {
                internshipId: +data.internshipId,
                studentId: student.id
            }
            await InternshipService.updateInternshipStudent(payload);
        } catch (error) {
        } finally {
            setIsLoading(false);
            handleClose();
        }
    }

    const renderInfoInternship = () => {
        const internship = internships.find(({ id }) => id === idInternshipSelected);
        if (!internship) {
            return <div></div>;
        }
        return (
            <div className='pb-4 w-full flex flex-wrap border-separate border-2 p-3 shadow-md'>
                <div className='flex w-1/2 py-2'>
                    <label className='w-40 font-bold'>Corporation name:</label>
                    <p>{internship.nameInternShip}</p>
                </div>
                <div className='flex w-1/2 py-2'>
                    <label className='w-40 font-bold'>Course internship:</label>
                    <p>{internship.courseInternShip}</p>
                </div>
                <div className='flex w-full py-2'>
                    <label className='w-40 font-bold'>Teacher name:</label>
                    <p>Tran Cong An</p>
                </div>
                <div className='flex w-1/2 py-2'>
                    <label className='w-40 font-bold'>Start date:</label>
                    <p>{internship.startDay}</p>
                </div>
                <div className='flex w-1/2 py-2'>
                    <label className='w-40 font-bold'>End date:</label>
                    <p>{internship.endDay}</p>
                </div>
                <div className='flex w-full py-2'>
                    <label className='w-40 font-bold'>Address:</label>
                    <p>{internship.address}</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        const getListInternship = async () => {
            try {
                const result = await InternshipService.getListInternship();
                if (result.status === 200) {
                    setInternships(result.data);
                }
            } catch (error) {
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
        getListInternship();
    }, [])

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>UPDATE STUDENT INTERNSHIP</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='pb-4 w-full'>
                                <TextField size='small' className='w-full' label="Full name:" variant="outlined" value={student.fullname} disabled />
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="internshipId"
                                    render={({ field }) => (
                                        <FormControl fullWidth size='small'>
                                            <InputLabel id="demo-simple-select-label">Internship</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Internship"
                                                value={'1'}
                                                {...field}
                                            >
                                                {internships.map((intern, index) =>
                                                    <MenuItem key={index} value={intern.id} onClick={() => { setIdInternshipSelected(intern.id) }}>
                                                        K{intern.courseInternShip} - {intern.nameInternShip} - {intern.teacherName}
                                                    </MenuItem>)}

                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <p className='text-red-600'>{errors.internshipId?.message}</p>
                            </div>
                            <div className='font-bold text-xl'>Internship Info:</div>
                            {renderInfoInternship()}
                        </form>
                    </div>
                    <div className='flex justify-center my-6 gap-5'>
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-24">Update</button>
                        <button onClick={handleClose} className="btn btn-secondary w-24">Close</button>
                    </div>
                </div>
            </Dialog>
            {isLoading && <Loading />}
        </Fragment>
    )
}

export default FormStudentIntern