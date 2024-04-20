"use client";
import React, { useRef, useEffect, useState } from 'react';
import {IoMdClose} from 'react-icons/io';
import { motion } from "framer-motion";
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

function GanttModal({ closeModal, calculatedData, criticalPath }) {
    const modalRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const handleClose = () => {
        closeModal();
    }

    let tasks = [];

    calculatedData.forEach((activity, index) => {
        const isInCriticalPath = criticalPath.criticalPath.includes(activity.activity);

        let task = {
            start: new Date(2024, 0, activity.ES+1),
            end: new Date(2024, 0, activity.EF+1),
            name: activity.activity,
            id: `Task ${index}`,
            type: 'task',
            progress: 100,
            styles: { progressColor: isInCriticalPath ? '#17f1d1' : '#ffbb54', progressSelectedColor: '#ff9e0d' }
        };
        tasks.push(task);
    });

    return (
        <section className="w-screen min-h-[100vh] max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]">
            <section onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[1101] flex flex-col justify-center items-center lg:p-14 md:p-8 p-2 pb-20'>
                <motion.section initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, type: "tween"}} exit={{opacity: 0}} ref={modalRef} className='w-full md:max-w-[80%] max-w-full h-full flex flex-col justify-center relative items-center dark:bg-modalColorD bg-modalColorL rounded-lg border dark:border-borderColorD border-borderColorL md:px-12 px-2 md:py-14 py-10 md:gap-8 gap-5'>
                    <IoMdClose title='Close Tooltip' onClick={handleClose} className='absolute right-3 top-3 text-xl cursor-pointer'/>
                    <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
                        <h3 className='responsive_text2 font-extrabold tracking-tighter text-center'>Gantt Chart</h3>
                        <motion.span initial={{width: 0}} animate={{width: "10%"}} transition={{duration: 0.4, type: "tween"}} className='w-[10%] h-[2px] rounded-full gradient2'></motion.span>
                    </section>
                    <section className='w-full flex justify-start items-center overflow-x-scroll'>
                        <Gantt tasks={tasks} rowHeight={40} fontSize={12}/>
                    </section>
                </motion.section>
            </section>
        </section>
    )
}

export default GanttModal;