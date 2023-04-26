import React from 'react';
import { Dialog } from '@mui/material';
import { AiOutlineQuestionCircle } from "react-icons/ai"

const ModalConfirm = ({ isOpen, content, textConfirm, handleConfirm, handleClose }) => {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <div className='w-[450px] min-h-[280px] flex flex-col justify-center px-4 py-5'>
                <div className='flex justify-center'><AiOutlineQuestionCircle className='text-red-600' size={90}/></div>
                <h2 className='text-3xl text-center text-primary uppercase font-bold'>Confirm</h2>
                <p className='text-2xl text-center mt-7'>{content}</p>
                <div className='flex justify-center mt-6 gap-10'>
                    <button onClick={handleConfirm} className="btn btn-primary w-24">{textConfirm ? textConfirm : "Delete"}</button>
                    <button onClick={handleClose} className="btn btn-secondary w-24">Close</button>
                </div>
            </div>
        </Dialog>
    )
}

export default ModalConfirm