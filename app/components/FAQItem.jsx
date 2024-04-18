import React from 'react';
import ButtonCircle from './buttonCircle';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, expanded, onToggle }) => {
    return (
        <section onClick={onToggle} className='w-full cursor-pointer dark:bg-modalColorD dark:border-borderColorD flex flex-col justify-between items-center gap-2 bg-modalColorL border border-borderColorL rounded-lg px-6 py-3'>
            <section className='w-full flex justify-between items-center'>
                <div className='flex flex-col justify-between items-start gap-1'>
                    <h3 className='md:text-xl text-base font-bold'>{question}</h3>
                    {expanded && <motion.span initial={{width: 0}} animate={{width: '100%'}} transition={{duration: 0.4, type: "tween"}} className='w-full h-[2px] gradient2'></motion.span>}
                </div>
                <ButtonCircle buttonType={expanded ? 5 : 4} size={2}/>
            </section>
            <AnimatePresence initial={true} mode="wait" onExitComplete={() => null}>
            {expanded && <motion.p initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.4, type: "tween"}} className='md:text-base text-sm py-2'>{answer}</motion.p>}
            </AnimatePresence>
        </section>
    );
};

export default FAQItem;