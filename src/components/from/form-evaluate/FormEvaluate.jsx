import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import StudentService from '../../../services/StudentService';
import Loading from '../../../shared/loading/Loading';

const schema = yup.object({
    score: yup.number("Score must be Number!").required("Score must be required!").min(0, "Score only from 0 to 100").max(100, "Score only from 0 to 100"),
}).required();

const FormEvaluate = ({ isOpen, id, evaluate, handleClose }) => {
    const isUpdate = evaluate.score !== undefined ? true : false;
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            score: 0,
            evaluateContent: "",
            evaluateDay: new Date(),
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        if (isUpdate) {
            updateEvaluateStudent(data);
        } else {
            createEvaluateStudent(data);
        }
    }

    const createEvaluateStudent = async (data) => {
        try {
            setIsLoading(true);
            const payload = {
                internshipsStudentId: id,
                ...data
            }
            await StudentService.createEvaluateStudent(payload);
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    }

    const updateEvaluateStudent = async (data) => {
        try {
            setIsLoading(true);
            const payload = {
                id: evaluate.idEvaluate,
                internshipsStudentId: id,
                ...data
            }
            await StudentService.updateEvaluateStudent(payload);
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    }

    useEffect(() => {
        if (evaluate.idEvaluate !== undefined) {
            setValue("score", evaluate.score);
            setValue("evaluateContent", evaluate.evaluateContent);
        }
    }, [evaluate, setValue])

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>UPDATE RESULT</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="score"
                                    render={({ field }) => (
                                        <TextField size='small' className='w-full' type="number" label="Score:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.score?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="evaluateContent"
                                    render={({ field }) => (
                                        <TextField size='small' className='w-full' type="number" label="Comment:" multiline rows={4} variant="outlined" {...field} />
                                    )}
                                />
                            </div>
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

export default FormEvaluate