"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import targetImg from '../img/3d-target.png';
import pieChart from '../img/pie-chart.png';
import alarmImg from '../img/3d-alarm.png';
import { motion } from 'framer-motion';

function LearnMore() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="learnMore" className='w-full min-h-screen dark:bg-backgroundColorD bg-backgroundColorL flex flex-col justify-center items-center md:px-[10%] px-4 py-6 md:gap-28 gap-14 relative'>
            {/*<motion.section initial={{opacity: 0, x: 10}} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true, amount: 0.5 }} className='w-full flex md:flex-row flex-col md:justify-start justify-center items-center gap-10 z-[1]'>
                <Image src={pieChart} alt='pieChartIcon' className='w-[100%] lg:max-w-[140px] md:max-w-[110px] max-w-[80px] aspect-square'/>
                <section className='flex flex-col justify-center md:items-start items-center gap-4 max-w-[500px]'>
                    <h2 className='md:text-3xl repsonsive_text2 font-bold text-themeColorP'>What is CPM?</h2>
                    <p className='md:text-base text-sm md:text-start text-center'>The Critical Path Method (CPM) is a project management tool that helps in planning and scheduling tasks. It involves identifying the longest sequence of tasks in a project, which is the sequence that has the greatest impact on the overall project duration.</p>
                </section>
            </motion.section>
            <motion.section initial={{opacity: 0, x: 10}} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true, amount: 0.5 }} className='w-full flex md:flex-row flex-col md:justify-end justify-center items-center md:gap-10 gap-4 z-[1]'>
                <Image src={targetImg} alt='targetIcon' className='w-[100%] lg:max-w-[140px] max-w-[110px] md:flex hidden aspect-square'/>
                <section className='flex flex-col justify-center md:items-start items-center gap-4 text-start max-w-[500px]'>
                    <h2 className='md:text-3xl repsonsive_text2 font-bold text-themeColorY'>What is CPM purpose?</h2>
                    <p className='md:text-base text-sm md:text-start text-center'>CPM allows determining the minimum time required to complete a project and identifying critical tasks that cannot be delayed without extending the total project duration.</p>
                </section>
            </motion.section>
            <motion.section initial={{opacity: 0, x: 10}} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true, amount: 0.5 }} className='w-full flex md:flex-row flex-col md:justify-start justify-center items-center md:gap-10 gap-4 z-[1] lg:pl-[20%] pl-0'>
                <Image src={alarmImg} alt='alarmImgIcon' className='w-[100%] lg:max-w-[140px] max-w-[110px] md:flex hidden aspect-square'/>
                <section className='flex flex-col justify-center gap-4 md:items-start items-center max-w-[500px]'>
                    <h2 className='md:text-3xl repsonsive_text2 font-bold text-themeColorT'>How does the CPM help?</h2>
                    <p className='md:text-base text-sm md:text-start text-center'>This method is particularly useful in managing construction projects, engineering projects, and programming due to its ability to effectively analyze task dependencies, optimize project schedules, and mitigate risks.</p>
                </section>
            </motion.section>
    {!isMobile && <span className='w-64 h-64 bg-themeColorP rounded-full blur-[180px] absolute left-10 bottom-0 -translate-x-1/2 z-[0]'></span>}*/}
            <section className='flex flex-col justify-center items-center gap-5'>
                <div className='px-6 py-1 bg-modalColorL border border-borderColorL rounded-lg font-bold text-xs text-borderColorD'>FAQ</div>
                <h2 className='responsive_text font-bold'>We&apos;re here to answer all your questions.</h2>
            </section>
        </section>
    )
}

export default LearnMore;