import { Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdEdit, MdFileDownload, MdMenuBook, MdOutlineMoreHoriz, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import avatarSrc from "../../assets/avatar.webp";
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import FormEvaluate from '../from/form-evaluate/FormEvaluate';
import FormStudentIntern from '../from/form-student-intern/FormStudentIntern';
import FormStudent from '../from/form-student/FormStudent';
import StudentService from '../../services/StudentService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import InternshipService from '../../services/InternshipService';
import { useSelector } from 'react-redux';

const DetailStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenFormStudent, setIsOpenFormStudent] = useState(false);
    const [infoStudent, setInfoStudent] = useState({});
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [isOpenFormStudentInternship, setIsOpenFormStudentInternship] = useState(false);
    const [isOpenFormEvaluate, setIsOpenFormEvaluate] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const { role } = useSelector(state => state.auth);

    const handleClickOpenUpdateStudent = (isOpen) => {
        setIsOpenFormStudent(isOpen);
        handleClose();
    }

    const handleClickOpenUpdateStudentInternship = (isOpen) => {
        setIsOpenFormStudentInternship(isOpen);
        handleClose();
    }

    const handleClickOpenUpdateEvaluate = (isOpen) => {
        setIsOpenFormEvaluate(isOpen);
        handleClose();
    }

    const handleDownloadReportFile = async () => {
        await StudentService.downloadFileReportByStudent(infoStudent.idReport, infoStudent.filename);
        handleClose();
    }

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
        if (objAlert.message === "Student Deleted Success!") {
            navigate('/list-student');
        }
    };

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

    const deleteStudent = async () => {
        try {
            handleClickToggleModalConfirmDelete(false);
            await StudentService.deleteStudent(id);
            setObjAlert({ isOpen: true, message: "Student Deleted Success!", type: "success" });
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Student Deleted Fail!", type: "error" });
        }
    }

    useEffect(() => {
        const getInfoStudent = async () => {
            try {
                let response = {};
                const resStudent = await StudentService.getInfoStudent(id);
                if (resStudent.data.idIntershipStudent !== 0) {
                    const resIntershipStudent = await InternshipService.getInfoInternshipStudent(resStudent.data.idIntershipStudent);
                    if (resIntershipStudent.status === 200) {
                        response = {
                            ...response,
                            ...resIntershipStudent.data.internship,
                            idInternship: resIntershipStudent.data.internship.id,
                            addressInternship: resIntershipStudent.data.internship.address,
                        };
                    }
                    if(resStudent.data.idReport) {
                        const resReport = await StudentService.getReportByStudent(resStudent.data.id);
                        response = {
                            ...response,
                            filename: resReport.data.name,
                        }
                    }
                    const resEvaluate = await StudentService.getEvaluateStudent(resStudent.data.id);
                    if (resEvaluate.status === 200) {
                        response = {
                            ...response,
                            ...resEvaluate.data,
                            idEvaluate: resEvaluate.data.id,
                        };
                    }
                }
                response = {
                    ...response,
                    ...resStudent.data
                }
                setInfoStudent(response);
            } catch (error) {
                setObjAlert({ isOpen: true, message: "GET Info Student Fail!", type: "error" });
            } finally {
                setIsLoading(false);
            }
        }

        getInfoStudent();
    }, [id, isOpenFormStudent, isOpenFormEvaluate, isOpenFormStudentInternship])

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            <div className="w-full h-full flex flex-col bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>DETAIL STUDENT</h2>
                    <MdOutlineMoreHoriz onClick={handleClick} size={25} className='text-gray-50 hover:cursor-pointer hover:bg-gray-600 rounded-full' />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {role === "MANAGER" &&
                            <MenuItem onClick={() => handleClickOpenUpdateStudent(true)}>
                                <div className='flex'><MdEdit size={25} className='text-primary' /> <div className='px-4'>Update Info</div></div>
                            </MenuItem>
                        }
                        {role === "MANAGER" &&
                            <MenuItem onClick={() => handleClickOpenUpdateStudentInternship(true)}>
                                <div className='flex'><MdMenuBook size={25} className='text-primary' /> <div className='px-4'>Update Internship</div></div>
                            </MenuItem>
                        }
                        <MenuItem onClick={() => handleClickOpenUpdateEvaluate(true)}>
                            <div className='flex'><MdOutlineRemoveRedEye size={25} className='text-primary' /> <div className='px-4'>Update Result</div></div>
                        </MenuItem>
                        <MenuItem disabled={!infoStudent.idReport} onClick={handleDownloadReportFile}>
                            <div className='flex'><MdFileDownload size={25} className='text-primary' /> <div className='px-4'>Download Report File</div></div>
                        </MenuItem>
                        {
                            role === "MANAGER" &&
                            <MenuItem onClick={() => handleClickToggleModalConfirmDelete(true)}>
                                <div className='flex'><MdDeleteForever size={25} className='text-red-500' /> <div className='px-4'>Delete</div></div>
                            </MenuItem>
                        }
                    </Menu>
                </div>
                <div className="h-full flex pt-4 pb-8 overflow-hidden">
                    <div className='w-1/3 h-full pl-20'>
                        <img src={infoStudent.avatar || avatarSrc} alt="Avatar Account" className='w-full h-full' />
                    </div>
                    <div className='w-2/3 h-full pl-5 pr-5 overflow-auto'>
                        <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Info</div>
                        <div className='grid grid-cols-2 mb-4 px-4'>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>ID:</div>
                                <p>{!!infoStudent.id && `SV${infoStudent.id}`}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Full Name:</div>
                                <p>{infoStudent.fullname}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Gmail:</div>
                                <p>{infoStudent.email}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Gender:</div>
                                <p>{infoStudent.sex}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Birth Day:</div>
                                <p>{infoStudent.dob}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Phone:</div>
                                <p>{infoStudent.phone}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Address:</div>
                                <p>{infoStudent.address}</p>
                            </div>
                        </div>
                        <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Class</div>
                        <div className='grid grid-cols-2 mb-4 px-4'>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Class:</div>
                                <p>{infoStudent.className}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Course:</div>
                                <p>{infoStudent.year_study}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Deparment:</div>
                                <p>{infoStudent.department}</p>
                            </div>
                        </div>
                        <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Internship</div>
                        <div className='grid grid-cols-2 mb-4 px-4'>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Teacher:</div>
                                <p>{infoStudent.teacherName}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-30 font-bold'>Corporation name:</div>
                                <p>{infoStudent.nameInternShip}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Address:</div>
                                <p>{infoStudent.addressInternship}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Course:</div>
                                <p>{infoStudent.courseInternShip}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Description:</div>
                                <p>{infoStudent.description}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Time Start:</div>
                                <p>{infoStudent.startDay}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Time End:</div>
                                <p>{infoStudent.endDay}</p>
                            </div>
                        </div>
                        <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Evaluate</div>
                        <div className='grid grid-cols-2 mb-4 px-4'>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Score:</div>
                                <p>{infoStudent.score ? `${infoStudent.score}/100` : ''}</p>
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
                    </div>
                </div>
            </div>
            {
                isOpenFormStudent &&
                <FormStudent
                    isOpen={isOpenFormStudent}
                    idStudent={infoStudent.id}
                    student={infoStudent}
                    handleClose={() => handleClickOpenUpdateStudent(false)}
                />
            }
            {
                isOpenFormStudentInternship &&
                <FormStudentIntern
                    student={infoStudent}
                    isOpen={isOpenFormStudentInternship}
                    handleClose={() => handleClickOpenUpdateStudentInternship(false)}
                />
            }
            {
                isOpenFormEvaluate &&
                <FormEvaluate
                    isOpen={isOpenFormEvaluate}
                    id={infoStudent.idIntershipStudent}
                    evaluate={infoStudent}
                    handleClose={() => handleClickOpenUpdateEvaluate(false)}
                />
            }
            <ModalConfirm
                isOpen={isOpenConfirmDelete}
                content="Do you want to delete this student?"
                handleConfirm={deleteStudent}
                handleClose={() => handleClickToggleModalConfirmDelete(false)} />
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default DetailStudent