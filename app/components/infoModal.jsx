"use client";
import React, { useRef } from 'react';
import {IoMdClose} from 'react-icons/io';
import { motion } from "framer-motion";
import { MdOutlineQuestionMark } from 'react-icons/md';

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

    const list = {
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
            
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            when: "afterChildren",
          },
        },
    }

    const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -10 },
    }

    return (
        <section className="w-screen min-h-[100vh] max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]">
            <section onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[1101] flex flex-col justify-center items-center lg:p-14 md:p-8 p-2 pb-20'>
                <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, type: "tween"}} exit={{opacity: 0}} ref={modalRef} className='w-full max-w-[940px] h-full flex flex-col justify-center relative items-center bg-modalColor rounded-lg border border-borderColor md:px-12 px-2 md:py-14 py-10 md:gap-8 gap-5'>
                    <IoMdClose title='Close Tooltip' onClick={handleClose} className='absolute right-3 top-3 text-xl cursor-pointer'/>
                    <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
                        <h3 className='responsive_text2 font-extrabold tracking-tighter text-center'>Instructions</h3>
                        <motion.span initial={{width: 0}} animate={{width: "10%"}} transition={{duration: 0.4, type: "tween"}} className='w-[10%] h-[2px] rounded-full gradient2'></motion.span>
                    </section>
                    <p className='w-full text-start md:text-base text-sm px-4'>To enter the problem data, you must take into consideration the following rules:</p>
                    <motion.section initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3, delay: 0.3}} className='w-full flex justify-start items-center'>
                        <section className='md:w-4/5 w-full h-auto flex md:bg-transparent bg-[#282828] flex-col justify-center items-start gap-3 border-2 border-borderColor border-l-themeColorT navbar md:px-10 pl-7 pr-1 py-4 relative overflow-hidden'>
                            <h4 className='w-1/4 text-center font-extrabold sm:text-sm uppercase text-[12px] tracking-widest text-themeColorT'>Activity:</h4>
                            <ul className='list-disc marker:text-themeColorT md:text-base text-sm flex flex-col justify-center items-start gap-2'>
                                <li>Activities are added automatically based on the number of events provided by the user.</li>
                                <li>You cannot change activity names.</li>
                            </ul>
                            <div className='w-24 h-24 bg-themeColorT rounded-full blur-3xl absolute  right-0 bottom-0'></div>
                        </section>
                    </motion.section>
                    <motion.section initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3, delay: 0.45}} className='w-full flex justify-end items-center'>
                        <section className='md:w-4/5 w-full h-auto flex flex-col md:bg-transparent bg-[#282828] justify-center items-start gap-3 border-2 border-borderColor border-l-themeColorP navbar md:px-10 pl-7 pr-1 py-4 relative overflow-hidden'>
                            <h4 className='w-1/4 text-center font-extrabold sm:text-sm uppercase text-[12px] tracking-widest text-themeColorP'>Dependency:</h4>
                            <ul className='list-disc marker:text-themeColorP md:text-base text-sm flex flex-col justify-center items-start gap-2'>
                                <li>At least one dependency must have the value <span className='text-themeColorP'>-</span> (start value).</li>
                                <li>If a field has <span className='text-themeColorP'>-</span> dependency selected, no other dependencies can be added.</li>
                                <li>Dependency cannot have the same value as the activity that it depends on.</li>
                            </ul>
                            <div className='w-24 h-24 bg-themeColorP rounded-full blur-3xl absolute right-0 bottom-0'></div>
                        </section>
                    </motion.section>
                    <motion.section initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3, delay: 0.6}} className='w-full flex justify-start items-center'>
                        <section className='md:w-4/5 w-full h-auto flex flex-col md:bg-transparent bg-[#282828] justify-center items-start gap-3 border-2 border-borderColor border-l-themeColorY navbar md:px-10 pl-7 pr-1 py-4 relative overflow-hidden'>
                            <h4 className='w-1/4 text-center font-extrabold sm:text-sm uppercase text-[12px] tracking-widest text-themeColorY'>Duration:</h4>
                            <ul className='list-disc marker:text-themeColorY md:text-base text-sm flex flex-col justify-center items-start gap-2'>
                                <li>For each activity user have to provide duration.</li>
                                <li>Duration has to be a positive value.</li>
                                <li>The duration value cannot exceed 1000.</li>
                            </ul>
                            <div className='w-24 h-24 bg-themeColorY rounded-full blur-3xl absolute right-0 bottom-0'></div>
                        </section>
                    </motion.section>
                </motion.section>
            </section>
        </section>
    )
}

{/*<section className='w-full z-[1001] min-h-[100vh] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#00000099]'>
            <section onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[998] flex flex-col justify-center items-center lg:p-16 md:p-8 p-4'>
                <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, type: "tween"}} exit={{opacity: 0}} ref={modalRef} className='relative z-[1000] w-full max-w-[800px] h-full flex flex-col justify-center items-start gap-4 bg-modalColor drop-shadow-2xl rounded-lg md:px-8 px-6 pt-10 pb-20'>
                    <IoMdClose title='Close Tooltip' onClick={handleClose} className='absolute right-3 top-3 text-xl cursor-pointer'/>
                    <div className='w-full h-auto flex flex-col justify-center items-center gap-3'>
                        <h3 className='font-extrabold tracking-tighter md:text-2xl text-xl text-center'>Instructions</h3>
                        <motion.div initial="hidden" animate="visible" variants={list} className='flex justify-center items-center gap-2'>
                            <motion.span variants={item} className='w-3 h-3 rounded-full bg-themeColorY'></motion.span>
                            <motion.span variants={item} className='w-3 h-3 rounded-full bg-themeColorT'></motion.span>
                            <motion.span variants={item} className='w-3 h-3 rounded-full bg-themeColorP'></motion.span>
                        </motion.div>
                    </div>
                    <p className='mt-4 md:text-base text-sm'>To enter the problem data, you must take into consideration the following:</p>
                    <motion.ul initial="hidden" animate="visible" variants={list} className='list-disc md:text-base text-sm w-full flex flex-col justify-center items-start gap-2 px-4'>
                        <motion.li variants={item}><span className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest text-themeColorT'>Activities</span> are added automatically based on the number of events provided by the user.</motion.li>
                        <motion.li variants={item}>In the <span className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest text-themeColorP'>Dependency</span> column, you have to select one of the options that will appear after clicking each field.</motion.li>
                        <motion.li variants={item}>At least one event cannot have a <span className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest text-themeColorP'>Dependency</span>. To do this, select the <span className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest text-themeColorT'>-</span> option.</motion.li>
                        <motion.li variants={item}><span className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest text-themeColorY'>Duration</span> should be a positive value. You can enter decimals by adding period.</motion.li>
                    </motion.ul>
                    <MdOutlineQuestionMark className='absolute right-2 bottom-2 z-[-1] text-[#666] text-[200px] blur-sm'/>
                </motion.section>
            </section>
    </section>*/}