"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './buttonStandard';
import FAQItem from './FAQItem';

function LearnMore() {
    const [expanded, setExpanded] = useState([1]);

    const handleToggle = (index) => {
        const newExpanded = [...expanded];
        
        newExpanded.forEach((item, i) => {
            if (i !== index) {
                newExpanded[i] = false;
            }
        });
        
        newExpanded[index] = !newExpanded[index];
        
        setExpanded(newExpanded);
    };

    return (
        <section id="learnMore" className='w-full md:min-h-screen h-auto dark:bg-backgroundColorD bg-backgroundColorL flex flex-col justify-start items-center md:px-[30%] px-4 md:pt-[6%] md:pb-[4%] p-14 md:gap-20 gap-10 relative overflow-hidden'>
            <section className='flex flex-col justify-center items-center md:gap-10 gap-4 text-center md:px-0 px-[4%] z-[1]'>
                <div className='px-6 py-1 dark:bg-modalColorD dark:border-borderColorD bg-modalColorL border border-borderColorL rounded-lg font-bold text-xs dark:text-borderColorL text-borderColorD'>FAQ</div>
                <motion.h2 initial={{opacity: 0, x: -10}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.4, type: "tween"}} viewport={{ once: true, amount: 0.7 }} className='responsive_text font-bold'>We&apos;re here to <span className='text-themeColorT'>answer</span> all <span className='text-themeColorY'>your</span> <span className='text-themeColorP'>questions.</span></motion.h2>
                <p className='md:text-base text-sm'>If you&apos;re new here or looking for information, this section will help you learn more about the Critical Path Method and our platform.</p>
            </section>
            <section className='flex w-full flex-col justify-start items-center gap-2'>
                <FAQItem
                    question="What is CPM?"
                    answer="The Critical Path Method (CPM) is a project management tool that helps in planning and scheduling tasks. It involves identifying the longest sequence of tasks in a project, which is the sequence that has the greatest impact on the overall project duration."
                    expanded={expanded[0]}
                    onToggle={() => handleToggle(0)}
                />
                <FAQItem
                    question="What is CPM purpose?"
                    answer="CPM allows determining the minimum time required to complete a project and identifying critical tasks that cannot be delayed without extending the total project duration."
                    expanded={expanded[1]}
                    onToggle={() => handleToggle(1)}
                />
                <FAQItem
                    question="How does the CPM help?"
                    answer="This method is particularly useful in managing construction projects, engineering projects, and programming due to its ability to effectively analyze task dependencies, optimize project schedules, and mitigate risks."
                    expanded={expanded[2]}
                    onToggle={() => handleToggle(2)}
                />
            </section>
            <section className='flex flex-col justify-center items-center md:gap-6 gap-4'>
                <p className='font-light md:text-base text-sm'>Got any more questions?</p>
                <a href="https://en.wikipedia.org/wiki/Critical_path_method" target='_blank'><Button buttonType={1} title="Open Wikipedia" buttonText={"Read More"}/></a>
            </section>
        </section>
    )
}

export default LearnMore;