'use client'
import React, { useEffect, useRef } from 'react';
import { motion, useAnimate, usePresence } from "framer-motion";

export default function Transition({ children }) {

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
        }
    }, [isPresent]);

    return (
        <div ref={scope}>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3, delay: 0.25}}>
                {children}
            </motion.div>
            <div id="target1" className="slide-in yellowCol z-[1000000]"></div>
            <div id="target2" className="slide-in turquoiseCol z-[1000000]"></div>
            <div id="target3" className="slide-in purpleCol z-[1000000]"></div>
        </div>
    )
}