import React from 'react';
import "./Loading.scss";

const Loading = () => {
    return (
        <div className='w-full h-screen fixed left-0 top-0 loading-page'>
            <div className='bg-gray-500 opacity-40 w-full h-screen' />
            <div className='rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-100'>
                <div className="preloader">
                    <div className="load-1"></div>
                    <div className="load-2"></div>
                    <div className="load-3"></div>
                    <div className="load-4"></div>
                    <div className="load-5"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading