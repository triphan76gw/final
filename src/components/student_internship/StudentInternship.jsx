import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InternshipService from '../../services/InternshipService';
import StudentService from '../../services/StudentService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import FormStudentIntern from '../from/form-student-intern/FormStudentIntern';

const StudentInternship = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [isOpenFormInternShip, setIsOpenFormInternShip] = useState(false);
    const [infoStudent, setInfoStudent] = useState({});
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const id = useSelector(state => state.auth.idStudentTeacher);

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };

    const handleShowHideModalUpdateInternship = (isShow) => {
        setIsOpenFormInternShip(isShow);
    }

    const showModalConfirmDelete = () => {
        setIsShowModalConfirm(true);
    }

    const handleCloseModalConfirm = () => {
        setIsShowModalConfirm(false);
    }

    const deleteInternStudent = async () => {
        try {
            handleCloseModalConfirm();
            setIsLoading(true);
            await InternshipService.deleteInternshipStudent(infoStudent.idIntershipStudent);
            setObjAlert({isOpen: true, message: "Delete Internship Success!", type: "success"});
        } catch (error) {
            
        }finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
            const getInfo = async () => {
                try {
                    setIsLoading(true);
                    const res = await StudentService.getInfoStudent(id);
                    if (res.status === 200) {
                        let response = {}
                        if (res.data.idIntershipStudent) {
                            const resInternship = await InternshipService.getInfoInternshipStudent(res.data.idIntershipStudent);
                            response = {
                                ...resInternship.data.internship,
                                idInternship: resInternship.data.internship.id,
                            }
                        }
                        response = {
                            ...response,
                            ...res.data
                        }
                        setInfoStudent(response);
                    }
                } catch (error) {
                    setObjAlert({ isOpen: true, message: "An error occurred! Please try again later", type: "error" })
                } finally {
                    setIsLoading(false);
                }
            }
        getInfo();
    }, [id, isOpenFormInternShip, objAlert.isOpen])

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>Info internship</h2>
                </div>
                <div className="h-full w-full body-content overflow-hidden px-8">
                    <div className='flex gap-2 py-2'>
                        <button
                            className='btn btn-primary'
                            disabled={!!infoStudent.idIntershipStudent}
                            onClick={() => handleShowHideModalUpdateInternship(true)}
                        >
                            Register Internship
                        </button>
                        <button
                            className='btn btn-primary'
                            disabled={!infoStudent.idInternship}
                            onClick={() => handleShowHideModalUpdateInternship(true)}
                        >
                            Update Internship
                        </button>
                        <button
                            className='btn btn-danger'
                            disabled={!infoStudent.idInternship}
                            onClick={showModalConfirmDelete}
                        >
                            Delete Internship
                        </button>
                    </div>
                    <div>
                        <p className='border-b border-primary font-bold text-primary text-xl mt-2'>Info Internship:</p>
                        {!infoStudent.idIntershipStudent ?
                            <div className='text-center text-xl text-gray-500 mt-2'>Students have not registered for internship information!</div>
                            : <div className='grid grid-cols-2 mb-4 px-4'>
                                <div className='flex text-lg py-2 w-full'>
                                    <div className='w-28 font-bold'>Name:</div>
                                    <p>{infoStudent.nameInternShip}</p>
                                </div>
                                <div className='flex text-lg py-2'>
                                    <div className='w-28 font-bold'>Course:</div>
                                    <p>{infoStudent.courseInternShip}</p>
                                </div>
                                <div className='flex text-lg col-span-2 py-2'>
                                    <div className='w-28 font-bold'>Teacher:</div>
                                    <p>{infoStudent.teacherName}</p>
                                </div>
                                <div className='flex text-lg col-span-2 py-2'>
                                    <div className='w-28 font-bold'>Address:</div>
                                    <p>{infoStudent.address}</p>
                                </div>
                                <div className='flex text-lg py-2'>
                                    <div className='w-28 font-bold'>Start Day:</div>
                                    <p>{infoStudent.startDay}</p>
                                </div>
                                <div className='flex text-lg py-2'>
                                    <div className='w-28 font-bold'>End Day:</div>
                                    <p>{infoStudent.endDay}</p>
                                </div>
                                <div className='flex text-lg py-2'>
                                    <div className='w-28 font-bold'>Description:</div>
                                    <p>{infoStudent.description}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {isOpenFormInternShip && <FormStudentIntern isOpen={isOpenFormInternShip} student={infoStudent} handleClose={() => handleShowHideModalUpdateInternship(false)} />}
            {isShowModalConfirm && <ModalConfirm isOpen={isShowModalConfirm} content={'Are you sure delete this internship?'} textConfirm="Delete" handleClose={handleCloseModalConfirm} handleConfirm={deleteInternStudent} />}
        </div>
    )
}

export default StudentInternship