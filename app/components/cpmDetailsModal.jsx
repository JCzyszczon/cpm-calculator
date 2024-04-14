import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {IoMdClose} from 'react-icons/io';

function CpmDetailsModal({ data, closeModal }) {

    const modalRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const handleClose = () => {
        closeModal();
    }

    return (
        <section className="w-screen min-h-[100vh] max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]">
            <section onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[1101] flex flex-col justify-center items-center lg:p-14 md:p-8 p-2 pb-20'>
                <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, type: "tween"}} exit={{opacity: 0}} ref={modalRef} className='w-full max-w-[640px] h-full flex flex-col justify-center relative items-center dark:bg-modalColorD bg-modalColorL rounded-lg border dark:border-borderColorD border-borderColorL md:px-12 px-6 md:py-14 py-10 md:gap-8 gap-5'>
                    <IoMdClose title='Close Tooltip' onClick={handleClose} className='absolute right-3 top-3 text-xl cursor-pointer'/>
                    <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
                        <h2 className='md:text-3xl responsive_text2 font-extrabold tracking-tighter text-center'>Activity Details</h2>
                        <motion.span initial={{width: 0}} animate={{width: "20%"}} transition={{duration: 0.4, type: "tween"}} className='w-[20%] h-[2px] rounded-full gradient2'></motion.span>
                    </section>
                    <section className='w-full h-auto flex flex-col justify-center items-start md:gap-3 gap-2'>
                        <h3 className='md:text-base text-sm'>Name: <span className='text-themeColorT font-extrabold pl-2'>{data.activity}</span></h3>
                        <h3 className='md:text-base text-sm'>Duration: <span className='text-themeColorP font-extrabold pl-2'>{data.duration}</span></h3>
                        <h3 className='md:text-base text-sm'>Calculated times:</h3>
                        <ul className='w-full list-disc md:px-[6%] px-[10%] md:text-base text-sm'>
                            <li>ES: <span className='text-themeColorY font-extrabold pl-2'>{data.ES}</span></li>
                            <li>EF: <span className='text-themeColorT font-extrabold pl-2'>{data.EF}</span></li>
                            <li>LS: <span className='text-themeColorP font-extrabold pl-2'>{data.LS}</span></li>
                            <li>LF: <span className='text-themeColorT font-extrabold pl-2'>{data.LF}</span></li>
                        </ul>
                        <h3 className='md:text-base text-sm'>Dependencies: {data.dependencies.map((dependency, index) => (
                            <span key={index} className='text-themeColorY font-extrabold pl-2'>{dependency} </span>
                        ))}</h3>
                        <h3 className='md:text-base text-sm'>Critical Path: {data.Float == 0 ? <span className='text-themeColorT font-extrabold pl-2'>Yes</span> : <span className='text-themeColorP font-extrabold pl-2'>No</span>}</h3>
                    </section>
                </motion.section>
            </section>
        </section>
    )
}

export default CpmDetailsModal;