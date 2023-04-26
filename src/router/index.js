import React from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import DetailInternship from '../components/detail_internship/DetailInternship';
import DetailStudent from '../components/detail_student/DetailStudent';
import DetailTeacher from '../components/detail_teacher/DetailTeacher';
import ForgetPassword from '../components/forget_password/ForgetPassword';
import GlobalNavigation from '../components/global_navigation/GlobalNavigation';
import Home from '../components/home/Home';
import InfoDetail from '../components/info_detail/InfoDetail';
import ListInternship from '../components/list_internship/ListInternship';
import ListStudent from '../components/list_student/ListStudent';
import ListTeacher from '../components/list_teacher/ListTeacher';
import Login from '../components/login/Login';
import PageNotFound from '../components/page_not_found/PageNotFound';
import Statistical from '../components/statistical/Statistical';
import StudentAttendance from '../components/student_attendance/StudentAttendance';
import StudentInternship from '../components/student_internship/StudentInternship';
import StudentReport from '../components/student_report/StudentReport';
import StudentResult from '../components/student_result/StudentResult';
import TeacherInternship from '../components/teacher_internship/TeacherInternship';
import PrivateRoute from './PrivateRoute';

function RouterComponent() {
    const { token, role } = useSelector((state) => state.auth);
    const renderRoutePublic = () => (
        <>
            <Route path='/' element={<Login />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
        </>
    )

    const renderRoutePrivite = () => {
        return (
            <Route path='/' element={<GlobalNavigation />}>
                <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path='/info-detail' element={<PrivateRoute><InfoDetail /></PrivateRoute>} />
                {role === "MANAGER" ? renderRouteManager() : role === "STUDENT" ? renderRouteStudent() : renderRouteTeacher()}
            </Route>
        )
    }

    const renderRouteManager = () => {
        return (
            <>
                <Route path='/list-student' element={<PrivateRoute><ListStudent /></PrivateRoute>} />
                <Route path='/list-student/detail/:id' element={<PrivateRoute><DetailStudent /></PrivateRoute>} />
                <Route path='/teacher' element={<PrivateRoute><ListTeacher /></PrivateRoute>} />
                <Route path='/list-teacher/detail/:id' element={<PrivateRoute><DetailTeacher /></PrivateRoute>} />
                <Route path='/internship' element={<PrivateRoute><ListInternship /></PrivateRoute>} />
                <Route path='/internship/detail/:id' element={<PrivateRoute><DetailInternship /></PrivateRoute>} />
                <Route path='/statistical' element={<PrivateRoute><Statistical /></PrivateRoute>} />
            </>
        )
    }
    const renderRouteStudent = () => {
        return (
            <>
                <Route path='/student/internship' element={<PrivateRoute><StudentInternship /></PrivateRoute>} />
                <Route path='/student/attendance' element={<PrivateRoute><StudentAttendance /></PrivateRoute>} />
                <Route path='/student/report' element={<PrivateRoute><StudentReport /></PrivateRoute>} />
                <Route path='/student/result' element={<PrivateRoute><StudentResult /></PrivateRoute>} />
            </>
        )
    }
    const renderRouteTeacher = () => {
        return (
            <>
                <Route path='/teacher/internship' element={<PrivateRoute><TeacherInternship /></PrivateRoute>} />
                <Route path='/teacher/internship/:id' element={<PrivateRoute><DetailInternship /></PrivateRoute>} />
                <Route path='/list-student/detail/:id' element={<PrivateRoute><DetailStudent /></PrivateRoute>} />
            </>
        )
    }

    return (
        <Router>
            <Routes>
                {token ? renderRoutePrivite() : renderRoutePublic()}
                <Route path='/*' element={<PageNotFound />} />
            </Routes>
        </Router>
    )
}

export default RouterComponent