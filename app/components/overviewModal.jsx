"use client";
import React, { useRef, useEffect, useState } from 'react';
import {IoMdClose} from 'react-icons/io';
import { motion } from "framer-motion";

function OverviewModal({ closeModal, calculatedData, criticalPath}) {
    
    const modalRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

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
                    <h3 className='responsive_text2 font-extrabold tracking-tighter text-center'>Project Overview</h3>
                    <motion.span initial={{width: 0}} animate={{width: "10%"}} transition={{duration: 0.4, type: "tween"}} className='w-[10%] h-[2px] rounded-full gradient2'></motion.span>
                </section>
                <section className='w-full h-auto overflow-x-auto flex justify-start items-start md:px-0 px-1'>
                <table className='w-full !min-w-[500px] overflow-x-auto'>
                    <thead>
                        <tr className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest'>
                            <th className='text-themeColorT pb-3'>Activity</th>
                            <th className='text-themeColorP pb-3'>Dependencies</th>
                            <th className='text-themeColorY pb-3'>Duration</th>
                            <th className='text-themeColorT pb-3'>ES</th>
                            <th className='text-themeColorP pb-3'>EF</th>
                            <th className='text-themeColorY pb-3'>LS</th>
                            <th className='text-themeColorT pb-3'>LF</th>
                        </tr>
                    </thead>
                    <tbody className='w-full h-auto text-center md:text-base text-sm'>
                    {calculatedData.map((item, index) => (
                        <tr key={index} className={`w-full ${criticalPath.criticalPath.includes(item.activity) ? 'bg-themeColorT' : ''}`}>
                            <td className='py-2 border dark:border-borderColorD border-borderColorL'>{item.activity}</td>
                            <td className='border dark:border-borderColorD border-borderColorL'>{item.dependencies.map((dependency, index) => (
                                index === item.dependencies.length - 1 ? dependency : `${dependency}, `
                            ))}</td>
                            <td className='border dark:border-borderColorD border-borderColorL'>{item.duration}</td>
                            <td className='border dark:border-borderColorD border-borderColorL'>{item.ES}</td>
                            <td className='border dark:border-borderColorD border-borderColorL'>{item.EF}</td>
                            <td className='border dark:border-borderColorD border-borderColorL'>{item.LS}</td>
                            <td className='border dark:border-borderColorD border-borderColorL'>{item.LF}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </section>
            </motion.section>
        </section>
    </section>
  )
}

export default OverviewModal