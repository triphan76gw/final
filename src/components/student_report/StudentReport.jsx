import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import StudentService from '../../services/StudentService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';

const StudentReport = () => {

    const refInputFile = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [infoReport, setInfoReport] = useState({});
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const id = useSelector(state => state.auth.idStudentTeacher);

    const addFileReport = () => {
        refInputFile.current.click();
    }

    const handleSubmitFile = async (e) => {
        setIsLoading(true);
        const { files } = e.target;
        await StudentService.addReportByStudent(id, files);
        const res = await StudentService.getReportByStudent(id);
        setInfoReport(res.data);
        setIsLoading(false);
    }

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };

    const showModalConfirmDelete = () => {
        setIsShowModalConfirm(true);
    }

    const handleCloseModalConfirm = () => {
        setIsShowModalConfirm(false);
    }

    const deleteFileReport = async () => {
        setIsLoading(true);
        await StudentService.deleteReportByStudent(infoReport.id);
        const res = await StudentService.getReportByStudent(id);
        setInfoReport(res.data);
        setIsShowModalConfirm(false);
        setIsLoading(false);
    }

    useEffect(() => {
        const getInfoReport = async () => {
            const res = await StudentService.getReportByStudent(id);
            setInfoReport(res.data);
        }

        getInfoReport();
    }, [id])


    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>Student Report</h2>
                </div>
                <div className="h-full w-full body-content overflow-hidden px-8">
                    <div className='flex gap-2 py-2'>
                        <button
                            className='btn btn-primary'
                            disabled={!!infoReport.id}
                            onClick={addFileReport}
                        >
                            Add File
                        </button>
                        <input type="file" id="input-file" className='hidden' onChange={handleSubmitFile} ref={refInputFile} accept=".docx,.doc" />
                        <button
                            disabled={!infoReport.id}
                            onClick={showModalConfirmDelete}
                            className='btn btn-danger'
                        >
                            Delete File
                        </button>
                    </div>
                    <div>
                        <p className='border-b border-primary font-bold text-primary text-xl mt-2'>Report Status:</p>
                        {
                            !infoReport.id ?
                                <div className='text-center text-xl text-gray-500 mt-2'>Students have not registered for internship information!</div>
                                : <div className='grid grid-cols-2 mb-4 px-4'>
                                    <div className='flex text-lg col-span-2 py-2'>
                                        <div className='w-28 font-bold'>Day Report:</div>
                                        <p>{infoReport.reportDay}</p>
                                    </div>
                                    <div className='flex text-lg col-span-2 py-2'>
                                        <div className='w-28 font-bold'>File name:</div>
                                        <p>{infoReport.name}</p>
                                    </div>
                                    <div className='flex text-lg col-span-2 py-2'>
                                        <div className='w-28 font-bold'>Status:</div>
                                        <p><span className='bg-green-500 text-white py-1 px-2 rounded-3xl text-sm font-bold'>Submitted</span></p>
                                    </div>
                                </div>}

                    </div>
                </div>
            </div>
            {
                isShowModalConfirm &&
                <ModalConfirm
                    isOpen={isShowModalConfirm}
                    content={'Are you sure delete file report?'}
                    textConfirm="Delete"
                    handleClose={handleCloseModalConfirm}
                    handleConfirm={deleteFileReport}
                />
            }
        </div>
    )
}

export default StudentReport