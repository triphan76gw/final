import React from 'react';
import { useSelector } from 'react-redux';

const InfoDetail = () => {

    const { role, dataAccount } = useSelector((state) => state.auth);

    console.log(dataAccount);

    return (
        <div className='w-full h-full p-5'>
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <h2 className='text-white font-bold text-3xl bg-gray-700 pb-1 pl-5 shadow-md shadow-gray-200 uppercase'>Info Detail</h2>
                <div className="h-full body-content flex">
                    <div className='w-1/3 h-full pt-8 pl-20'>
                        <img src={dataAccount?.avatar} alt="Avatar Account" className='w-[425px] h-[525px]' />
                    </div>
                    <div className='w-2/3 h-full pt-8 pl-5 pr-5'>
                        <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Info</div>
                        <div className='grid grid-cols-2 mb-4 px-4'>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>ID:</div>
                                <p>SV{dataAccount?.id}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Full Name:</div>
                                <p>{dataAccount?.name}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Gmail:</div>
                                <p>{dataAccount?.email}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Gender:</div>
                                <p>{dataAccount?.sex}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Birth Day:</div>
                                <p>{dataAccount?.birthDay}</p>
                            </div>
                            <div className='flex text-lg py-2'>
                                <div className='w-28 font-bold'>Phone:</div>
                                <p>{dataAccount?.phone}</p>
                            </div>
                            <div className='flex text-lg col-span-2 py-2'>
                                <div className='w-28 font-bold'>Address:</div>
                                <p>{dataAccount?.address}</p>
                            </div>
                        </div>
                        {role === "STUDENT" ?
                            (<>
                                <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>Class</div>
                                <div className='grid grid-cols-2 mb-4 px-4'>
                                    <div className='flex text-lg py-2'>
                                        <div className='w-28 font-bold'>Class:</div>
                                        <p>{dataAccount?.class_}</p>
                                    </div>
                                    <div className='flex text-lg py-2'>
                                        <div className='w-28 font-bold'>School year:</div>
                                        <p>{dataAccount?.yearStudy}</p>    
                                    </div>
                                    <div className='flex text-lg py-2'>
                                        <div className='w-28 font-bold'>Department:</div>
                                        <p>{dataAccount?.department}</p>
                                    </div>
                                </div>
                            </>)
                            :
                            (<>
                                <div className='bg-gray-700 text-center text-white font-bold text-xl mb-2'>More</div>
                                <div className='grid grid-cols-2 mb-4 px-4'>
                                    <div className='flex text-lg py-2'>
                                        <div className='w-28 font-bold'>Level:</div>
                                        <p>{dataAccount?.level}</p>
                                    </div>
                                    <div className='flex text-lg py-2'>
                                        <div className='w-28 font-bold'>Specialize:</div>
                                        <p>{dataAccount?.specialize}</p>    
                                    </div>
                                    <div className='flex text-lg py-2'>
                                        <div className='w-28 font-bold'>Salary:</div>
                                        <p>{dataAccount?.salary} VND</p>
                                    </div>
                                </div>
                            </>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoDetail