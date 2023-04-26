import React, { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import Header from '../../shared/header/Header';
import Sidebar from '../../shared/sidebar/Sidebar';
import "./GlobalNavigation.scss";

const GlobalNavigation = () => {

    const [isShowMenu, setIsShowMenu] = useState(true);

    const handleToggleMenu = () => {
        setIsShowMenu(!isShowMenu);
    }

    return (
        <div className='w-full h-screen flex overflow-hidden'>
            <div className={`h-full bg-primary ${isShowMenu ? 'w-72' : 'w-20'} relative transition-all group`}>
                <Sidebar isShowMenu={isShowMenu} />
                <div onClick={handleToggleMenu} className='w-0 h-20 bg-primary absolute top-0 left-full rounded-r-lg flex items-center justify-center shadow-primary hover:cursor-pointer transition-all group-hover:w-8'>
                    <MdKeyboardArrowLeft size={50} className={`text-white ${!isShowMenu && 'rotate-180'} transition-all`} />
                </div>
            </div>
            <div className={`h-ful col-span-5 flex flex-col w-full overflow-hidden`}>
                <Header/>
                <div className="w-full h-full bg-gray-100 overflow-hidden"><Outlet /></div>
            </div>
        </div>
    )
}

export default GlobalNavigation