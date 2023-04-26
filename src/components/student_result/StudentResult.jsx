import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import StudentService from '../../services/StudentService';
import Loading from '../../shared/loading/Loading';

const StudentResult = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [infoStudent, setInfoStudent] = useState({});
    const id = useSelector(state => state.auth.idStudentTeacher);

    useEffect(() => {
        const getInfo = async () => {
            try {
                setIsLoading(true);
                const res = await StudentService.getInfoStudent(id);
                if (res.status === 200) {
                    let response = {}
                    if (res.data.idIntershipStudent) {
                        const resEvaluate = await StudentService.getEvaluateStudent(id);
                        response = {
                            ...resEvaluate.data,
                            idEvaluate: resEvaluate.data,
                        }
                    }
                    response = {
                        ...response,
                        ...res.data
                    }
                    setInfoStudent(response);
                }
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        }
        getInfo();
    }, [id])


    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            {isLoading && <Loading />}
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>Result</h2>
                </div>
                <div className="h-full w-full body-content overflow-hidden px-8">
                    <div>
                        <p className='border-b border-primary font-bold text-primary text-xl mt-2'>Info Internship:</p>
                        {!infoStudent.score ?
                            <div className='text-center text-xl text-gray-500 mt-2'>Students do not have internship results!</div>
                            : <div className='grid grid-cols-3 mb-4 px-4'>
                                <div className='flex text-lg py-2'>
                                    <div className='w-28 font-bold'>Score:</div>
                                    <p>{infoStudent.score ? `${infoStudent.score}/100 ` : ''}</p>
                                </div>
                                <div className='flex text-lg py-2'>
                                    <div className='w-28 font-bold'>Result:</div>
                                    <p>
                                        {infoStudent.score !== undefined ?
                                            infoStudent.score >= 50 ?
                                                <span className='font-bold text-green-600'>Pass</span> :
                                                <span className='font-bold text-red-600'>Fail</span> :
                                            ''}
                                    </p>
                                </div>
                                <div className='flex text-lg col-span-2 py-2'>
                                    <div className='w-28 font-bold'>Comment:</div>
                                    <p>{infoStudent.evaluateContent}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentResult