import { Dialog } from '@mui/material';
import { MdOutlineDone, MdOutlineReport } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import React from 'react'

const ModalAlert = ({ isOpen, type = "success", handleClose, message }) => {

    const renderIconDialog = () => {
        switch (type) {
            case "warning":
                return <MdOutlineReport size={80} className="text-orange-600" />;
            case "error":
                return <BiErrorCircle size={80} className="text-red-600" />;
            default:
                return <MdOutlineDone size={80} className="text-green-600 rounded-full border-4 border-green" />;
        }
    }


    return (
        <Dialog open={isOpen} fullWidth maxWidth="xs">
            <div className='w-full px-4 py-4'>
                <div className='flex justify-center mb-3'>{renderIconDialog()}</div>
                <div className='w-full text-center text-xl mb-5'>{message}</div>
                <div className='w-full flex justify-center px-10'><button className='btn btn-primary w-full' onClick={handleClose}>Confirm</button></div>
            </div>
        </Dialog>
    )
}

export default ModalAlert