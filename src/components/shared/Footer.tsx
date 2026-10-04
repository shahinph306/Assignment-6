import Image from 'next/image';
import React from 'react';
import logo from '@/Image/logo.png';

const FooterPage = () => {
    return (
        <div className='flex justify-between items-center bg-black py-4 px-8'>
            <div className='flex gap-4 items-center font-bold'>
                <Image src={logo} alt='Image-log'></Image>
                <a className='text-white'>FITLOG</a>
            </div>
            <div className='text-gray-400'>
                <p>@ 2026 FitLog - Workout Library. Train hard, log honest.</p>     
            </div>
            
        </div>
    );
};

export default FooterPage;