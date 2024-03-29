"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useAnimate, usePresence } from "framer-motion";
import TableComponent from './tableComponent';

export default function TableForm({ closeModal }) {

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

    return (
        <section className='w-screen min-h-[100vh] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-backgroundColor'>
            <section ref={scope} onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[998] flex flex-col justify-center items-center lg:p-16 md:p-8 p-2 pb-16'>
                <motion.section initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3, delay: 0.25}} ref={modalRef} className='z-[1000] w-full max-w-[1000px] h-full flex justify-center items-start bg-modalColor rounded-lg border border-borderColor px-1 py-2'>
                    <TableComponent closeRequest={handleClose} howMany={10}/>
                </motion.section>
                <div id="target1" className="slide-in yellowCol"></div>
                <div id="target2" className="slide-in turquoiseCol"></div>
                <div id="target3" className="slide-in purpleCol"></div>
            </section>
        </section>
    )
}