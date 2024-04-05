"use client";
import React, { useRef } from 'react';
import {IoMdClose} from 'react-icons/io';
import { motion } from "framer-motion";

export default function InfoModal({ closeModal }) {

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
                <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, type: "tween"}} exit={{opacity: 0}} ref={modalRef} className='w-full max-w-[940px] h-full flex flex-col justify-center relative items-center dark:bg-modalColorD bg-modalColorL rounded-lg border dark:border-borderColorD border-borderColorL md:px-12 px-2 md:py-14 py-10 md:gap-8 gap-5'>
                    <IoMdClose title='Close Tooltip' onClick={handleClose} className='absolute right-3 top-3 text-xl cursor-pointer'/>
                    <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
                        <h3 className='responsive_text2 font-extrabold tracking-tighter text-center'>Instructions</h3>
                        <motion.span initial={{width: 0}} animate={{width: "10%"}} transition={{duration: 0.4, type: "tween"}} className='w-[10%] h-[2px] rounded-full gradient2'></motion.span>
                    </section>
                    <p className='w-full text-start md:text-base text-sm px-4'>To enter the problem data, you must take into consideration the following rules:</p>
                    <motion.section initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3, delay: 0.3}} className='w-full flex justify-start items-center'>
                        <section className='md:w-4/5 w-full h-auto flex md:bg-transparent bg-[#282828] flex-col justify-center items-start gap-3 border-2 dark:border-borderColorD border-borderColorL dark:border-l-themeColorT border-l-themeColorT navbar2 md:px-10 pl-7 pr-1 py-4 relative overflow-hidden'>
                            <h4 className='w-1/4 text-center font-extrabold sm:text-sm uppercase text-[12px] tracking-widest text-themeColorT'>Activity:</h4>
                            <ul className='list-disc marker:text-themeColorT md:text-base text-sm flex flex-col justify-center items-start gap-2'>
                                <li>Activities are added automatically based on the number of events provided by the user.</li>
                                <li>You cannot change activity names.</li>
                            </ul>
                            <div className='w-24 h-24 bg-themeColorT rounded-full blur-[120px] absolute right-0 bottom-0'></div>
                        </section>
                    </motion.section>
                    <motion.section initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3, delay: 0.45}} className='w-full flex justify-end items-center'>
                        <section className='md:w-4/5 w-full h-auto flex flex-col md:bg-transparent bg-[#282828] justify-center items-start gap-3 border-2 dark:border-borderColorD border-borderColorL dark:border-l-themeColorP border-l-themeColorP navbar2 md:px-10 pl-7 pr-1 py-4 relative overflow-hidden'>
                            <h4 className='w-1/4 text-center font-extrabold sm:text-sm uppercase text-[12px] tracking-widest text-themeColorP'>Dependency:</h4>
                            <ul className='list-disc marker:text-themeColorP md:text-base text-sm flex flex-col justify-center items-start gap-2'>
                                <li>At least one dependency must have the value <span className='text-themeColorP'>-</span> (start value).</li>
                                <li>If a field has <span className='text-themeColorP'>-</span> dependency selected, no other dependencies can be added.</li>
                                <li>Dependency cannot have the same value as the activity that it depends on.</li>
                            </ul>
                            <div className='w-24 h-24 bg-themeColorP rounded-full blur-[120px] absolute right-0 bottom-0'></div>
                        </section>
                    </motion.section>
                    <motion.section initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3, delay: 0.6}} className='w-full flex justify-start items-center'>
                        <section className='md:w-4/5 w-full h-auto flex flex-col md:bg-transparent bg-[#282828] justify-center items-start gap-3 border-2 dark:border-borderColorD border-borderColorL dark:border-l-themeColorY border-l-themeColorY navbar2 md:px-10 pl-7 pr-1 py-4 relative overflow-hidden'>
                            <h4 className='w-1/4 text-center font-extrabold sm:text-sm uppercase text-[12px] tracking-widest text-themeColorY'>Duration:</h4>
                            <ul className='list-disc marker:text-themeColorY md:text-base text-sm flex flex-col justify-center items-start gap-2'>
                                <li>For each activity user have to provide duration.</li>
                                <li>Duration has to be a positive value.</li>
                                <li>The duration value cannot exceed 1000.</li>
                            </ul>
                            <div className='w-24 h-24 bg-themeColorY rounded-full blur-[120px] absolute right-0 bottom-0'></div>
                        </section>
                    </motion.section>
                </motion.section>
            </section>
        </section>
    )
}