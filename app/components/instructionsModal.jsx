"use client";
import React, { useRef } from 'react';
import {IoMdClose} from 'react-icons/io';
import { motion } from "framer-motion";
import { MdOutlineQuestionMark } from 'react-icons/md';

export default function InstructionsModal({ closeModal }) {

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
        <section className='w-full z-[1001] min-h-[100vh] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#00000099]'>
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
        </section>
    )
}