import { Menu, MenuItem, Pagination, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdAdd, MdDeleteForever, MdEdit, MdOutlineMoreHoriz, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { countElementInPage } from '../../constant/Constants';
import InternshipService from '../../services/InternshipService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import TableGeneral from '../../shared/table_general/TableGeneral';
import FormInternship from '../from/form-internship/FormInternship';
import './ListInternship.scss';

const ListInternship = () => {
    const [page, setPage] = useState(1);
    const [internships, setInternships] = useState([]);
    const [search, setSearch] = useState({ nameInternship: "", courseInternship: "", nameTeacher: "" });
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [internship, setInternship] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [idInternship, setIdInternship] = useState(null);
    const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
    const [isOpenModalAddInternship, setIsOpenModalAddInternship] = useState(false);

    const navigate = useNavigate();


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChangeValueSearch = (name, value) => {
        setSearch((val) => ({
            ...val,
            [name]: value.target.value
        }));
    }

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };

    const handleSearchListInternship = async () => {
        try {
            setIsLoading(true);
            const res = await InternshipService.getSearchListInternship(search);
            const data = res.data.map((internship) => ({
                ...internship,
            }))
            setInternships(data);
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleClick = (event, id) => {
        setIdInternship(id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const showModalAddStudent = () => {
        handleClose();
        setIsOpenModalAddInternship(true);
    }

    const showModalUpdateStudent = () => {
        const intern = internships.find(({id}) => id === idInternship);
        setInternship(intern);
        handleClose();
        setIsOpenModalAddInternship(true);
    }

    const closeModalAddStudent = () => {
        setIdInternship(null);
        setInternship({});
        setIsOpenModalAddInternship(false);
    }

    const handleConfirmDeleteStudent = () => {
        handleClose();
        setIsOpenModalConfirmDelete(true);
    }

    const handleViewDetailStudent = () => {
        if (idInternship) {
            navigate("/internship/detail/" + idInternship);
        }
    }

    const handleCloseModalConfirmDelete = () => {
        setIsOpenModalConfirmDelete(false);
    }

    const deleteStudent = async () => {
        try {
            setIsLoading(true);
            await InternshipService.deleteInternship(idInternship);
            getListInternship();
        } catch (error) {
            setIsLoading(false);
        }
        finally {
            setIsOpenModalConfirmDelete(false);
        }
    }

    const headers = ["No", "Name", "Address", "Teacher", "Course", "Start day", "End day", "Action"];

    const renderDataTable = () => {
        return internships.slice((page - 1) * countElementInPage, countElementInPage * page).map(internship => {
            return {
                stt: <span className='font-bold'>{internship.id}</span>,
                name: internship.nameInternShip,
                address: internship.address,
                teacher: internship.teacherName,
                course: internship.courseInternShip,
                startDay: internship.startDay,
                endDay: internship.endDay,
                status: (
                    <div className='flex justify-center'>
                        <MdOutlineMoreHoriz size={25} className='hover:cursor-pointer hover:bg-gray-400 rounded-full' onClick={(e) => handleClick(e, internship.id)} />
                    </div>
                ),
            }
        })
    }

    const getListInternship = async () => {
        try {
            setIsLoading(true);
            const res = await InternshipService.getListInternship();
            if (res.status === 200) {
                setInternships(res.data);
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getListInternship();
    }, [isOpenModalAddInternship])

    const handleChangePanigation = (e, val) => {
        setPage(val);
    };

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>List Internship</h2>
                    <MdAdd onClick={showModalAddStudent} size={25} className='text-white hover:cursor-pointer hover:bg-gray-200 rounded-full' />
                </div>
                <div className="h-full w-full body-content overflow-hidden">
                    <h4 className='mx-10 border-b border-primary font-bold text-primary text-xl mt-2'>Filter:</h4>
                    <div className='flex gap-5 mt-2 mx-10 mb-5'>
                        <TextField className='w-full' label="Name:" onChange={(val) => handleChangeValueSearch("nameInternship", val)} variant="outlined" />
                        <TextField className='w-full' label="Course:" onChange={(val) => handleChangeValueSearch("courseInternship", val)} variant="outlined" />
                        <TextField className='w-full' label="Teacher:" onChange={(val) => handleChangeValueSearch("nameTeacher", val)} variant="outlined" />
                        <button className='btn btn-primary w-[420px] text-xl' onClick={handleSearchListInternship}>Search</button>
                    </div>
                    <div className='px-10 w-full h-[430px] overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                    <div className='mt-2 px-10 flex justify-end'><Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(internships.length / countElementInPage)} color="primary" showFirstButton showLastButton /></div>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleViewDetailStudent}>
                    <div className='flex'><MdOutlineRemoveRedEye size={25} className='text-primary' /> <div className='w-20 px-4'>Detail</div></div>
                </MenuItem>
                <MenuItem onClick={showModalUpdateStudent}>
                    <div className='flex'><MdEdit size={25} className='text-yellow-700' /> <div className='w-20 px-4'>Update</div></div>
                </MenuItem>
                <MenuItem onClick={handleConfirmDeleteStudent}>
                    <div className='flex'><MdDeleteForever size={25} className='text-red-700' /> <div className='w-20 px-4'>Delete</div></div>
                </MenuItem>
            </Menu>
            <ModalConfirm
                isOpen={isOpenModalConfirmDelete}
                content="Do you want to delete this internship?"
                handleConfirm={deleteStudent}
                handleClose={handleCloseModalConfirmDelete} />
            {isOpenModalAddInternship && <FormInternship
                isOpen={isOpenModalAddInternship}
                internship={internship}
                handleClose={closeModalAddStudent}
            />}
            {isLoading && <Loading />}
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
        </div>
    )
}

export default ListInternship