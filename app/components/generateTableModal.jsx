"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useAnimate, usePresence } from "framer-motion";
import TableComponent from './tableComponent';
import Button from './buttonStandard';

export default function GenerateTableModal({ closeModal, rowNumber }) {

    const modalRef = useRef(null);
    const [scope, animate] = useAnimate();
    const [isPresent, safeToRemove] = usePresence()

    useEffect(() => {
        const handleAnimate = async () => {
            await animate("#target1", { scaleY: [0, 1], scaleX: [1.00, 1.30], borderRadius: ["200% 200% 0% 0%", "0% 0% 0% 0%"] }, { duration: 0.36, ease: "easeInOut" });
            await animate("#target1", { y: -1000, scaleX: [1.00, 1.50, 3.00], borderRadius: ["0% 0% 0% 0%", "0% 0% 200% 200%"] }, {duration: 0.36, delay: 0.39, ease: "easeInOut" });
            await animate("#target1", { y: 0, scaleY: 0, scaleX: 1.00 }, {duration: 0.001});
        };
    
        const handleAnimate2 = async () => {
            await animate("#target2", { scaleY: [0, 1], scaleX: [1.00, 1.30], borderRadius: ["200% 200% 0% 0%", "0% 0% 0% 0%"] }, { duration: 0.31, ease: "easeInOut", delay: 0.055});
            await animate("#target2", { y: -1000, scaleX: [1.00, 1.50, 3.00], borderRadius: ["0% 0% 0% 0%", "0% 0% 200% 200%"] }, {duration: 0.31, delay: 0.385, ease: "easeInOut" });
            await animate("#target2", { y: 0, scaleY: 0, scaleX: 1.00 }, {duration: 0.001});
        }
    
        const handleAnimate3 = async () => {
            await animate("#target3", { scaleY: [0, 1], scaleX: [1.00, 1.30], borderRadius: ["200% 200% 0% 0%", "0% 0% 0% 0%"] }, { duration: 0.30, ease: "easeInOut", delay: 0.075});
            await animate("#target3", { y: -1000, scaleX: [1.00, 1.50, 3.00], borderRadius: ["0% 0% 0% 0%", "0% 0% 200% 200%"] }, {duration: 0.30, delay: 0.365, ease: "easeInOut" });
            await animate("#target3", { y: 0, scaleY: 0, scaleX: 1.00 }, {duration: 0.001});
        }

        if(isPresent) {
            handleAnimate();
            handleAnimate2();
            handleAnimate3();
        } else {
            handleAnimate();
            handleAnimate2();
            handleAnimate3();
            setTimeout(safeToRemove, 1250);
        }
    }, [isPresent]);


    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const handleClose = () => {
        closeModal();
    }

    const handleClick = () => {
        window.location.reload();
    }

    return (
        <section className='w-screen min-h-[100vh] z-[100] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll dark:bg-backgroundColorD bg-backgroundColorL'>
            <section ref={scope} onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[998] flex flex-col justify-center items-center lg:p-14 md:p-8 p-2 pb-20'>
                <motion.section initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3, delay: 0.25}} ref={modalRef} className='z-[1000] w-full max-w-[1000px] h-full flex justify-center items-start dark:bg-modalColorD bg-modalColorL rounded-lg border dark:border-borderColorD border-borderColorL px-1 py-2'>
                    {rowNumber < 2 || rowNumber > 16 ? (
                        <section className='w-full flex flex-col justify-center items-center gap-5 py-10'>
                            <h3 className='font-extrabold text-xl tracking-tighter'>Something went wrong.</h3>
                            <Button onClick={handleClick} buttonType={1} buttonText="Return home" />
                        </section>
                    ) : (
                        <TableComponent closeRequest={handleClose} howMany={rowNumber}/>
                    )}
                </motion.section>
                <div id="target1" className="slide-in yellowCol z-[1000000]"></div>
                <div id="target2" className="slide-in turquoiseCol z-[1000000]"></div>
                <div id="target3" className="slide-in purpleCol z-[1000000]"></div>
            </section>
        </section>
    )
}