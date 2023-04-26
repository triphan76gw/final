import { FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { countElementInPage } from '../../constant/Constants';
import StudentService from '../../services/StudentService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import TableGeneral from '../../shared/table_general/TableGeneral';
import { SiMicrosoftexcel } from "react-icons/si";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";
import moment from 'moment/moment';

const Statistical = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState({ nameStudent: "", sex: "", className: "", year_study: "", nameTeacher: "", internshipName: "", course: "" });
    const [students, setStudents] = useState([]);
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });

    const headers = ["ID", "Full Name", "Email", "Gender", "Birthday", "Phone", "Class", "Year study", "Teacher", "Internship Name", "Course Internship", "Start day", "End day", "Attendance", "Score", "Report"];

    const renderDataTable = () => {
        return students.slice((page - 1) * countElementInPage, countElementInPage * page).map(student => {
            return {
                id: <span className='font-bold'>SV{student.id}</span>,
                name: student.fullname,
                email: student.email,
                gender: student.sex === 'male' ? <span className='font-bold text-primary'>{student.sex}</span> : <span className='font-bold text-purple-700'>{student.sex}</span>,
                dob: student.dob,
                phone: student.phone,
                class: student.className,
                year_study: student.year_study,
                teacher: student.teacherName,
                nameInternShip: student.nameInternShip,
                courseInternShip: student.courseInternShip,
                startDay: student.startDay,
                endDay: student.endDay,
                attendance: student.attendance?.length,
                score: student.score,
                report: <div className='flex justify-center'>{student.idReport === 0 ? <AiFillCloseSquare className='text-red-600' /> : <AiFillCheckSquare className='text-green-600' />}</div>,
            }
        })
    }

    const handleChangeValueSearch = (name, value) => {
        setSearch((val) => ({
            ...val,
            [name]: value.target.value
        }));
    }

    const handleChangePanigation = (e, val) => {
        setPage(val);
    };

    const handleSearchListTeacher = () => {
        getData();
    }

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };


    const renderValueExport = () => {
        const value = students.map((student) => ({
            id: `SV${student.id}`,
            name: student.fullname,
            email: student.email,
            gender: student.sex,
            dob: student.dob,
            phone: student.phone,
            class: student.className,
            year_study: student.year_study,
            teacher: student.teacherName,
            nameInternShip: student.nameInternShip,
            courseInternShip: student.courseInternShip,
            startDay: student.startDay,
            endDay: student.endDay,
            attendance: student.attendance?.length,
            score: student.score,
            report: student.idReport === null ? 'True' : 'False',
        }));
        return value.map((row) => Object.values(row).join(','));
    }

    const downloadCSV = (data) => {
        const csvHeader = headers.join(',');
        const csvRows = renderValueExport();
        const csvString = `${csvHeader}\n${csvRows.join('\n')}`;

        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const formatDay = moment(new Date()).format("YYYY_MM_DD");
        link.setAttribute('href', url);
        link.setAttribute('download', `statistical_${formatDay}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const getData = async () => {
        try {
            setIsLoading(true);
            const res = await StudentService.getStatistical(search);
            const response = res.data.map((data) => {
                return {
                    ...data.teacher,
                    ...data.internship,
                    addressInternship: data.internship?.address,
                    score: data.score === -1 ? '' : data.score,
                    attendance: data.attendance,
                    ...data.student,
                }
            })
            setStudents(response);
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            <div className="flex flex-col w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>Statistical</h2>
                </div>
                <div className="flex flex-col h-full w-full body-content overflow-hidden">
                    <h4 className='mx-10 border-b border-primary font-bold text-primary text-xl mt-2'>Filter:</h4>
                    <div className='grid grid-cols-4 gap-3 mt-2 mx-10 mb-5'>
                        <TextField size='small' className='w-full' label="Student name:" onChange={(val) => handleChangeValueSearch("nameStudent", val)} variant="outlined" />
                        <FormControl fullWidth size='small' >
                            <InputLabel id="demo-simple-select-label">Gender:</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Gender:"
                                value={search.sex}
                                onChange={(val) => handleChangeValueSearch("sex", val)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField size='small' className='w-full' label="Class name:" onChange={(val) => handleChangeValueSearch("className", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Year study:" onChange={(val) => handleChangeValueSearch("year_study", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Teacher:" onChange={(val) => handleChangeValueSearch("nameTeacher", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Internship name:" onChange={(val) => handleChangeValueSearch("internshipName", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Course:" onChange={(val) => handleChangeValueSearch("course", val)} variant="outlined" />
                        <button className='btn btn-primary text-xl' onClick={handleSearchListTeacher}>Search</button>
                    </div>
                    <div className='px-10 w-full h-[430px] overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                    <div className='mt-2 mb-2 px-10 flex justify-between items-center'>
                        <button className='btn btn-primary flex items-center' onClick={downloadCSV}><SiMicrosoftexcel color='white' size={25} className='mr-2' />Export file</button>
                        <Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(students.length / countElementInPage)} color="primary" showFirstButton showLastButton />
                    </div>
                </div>
            </div>
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default Statistical