"use client";
import React, { useState, useEffect } from "react";
import TableForm from "./tableForm";
import { AnimatePresence } from "framer-motion";



export default function MainPanel() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        return () => {
          document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    const clickButton = () => {
        setIsModalOpen(true);
    }

    return (
        <>
            <section className="w-1/2 min-h-screen flex flex-col gap-5 justify-center items-center">
                <p>Tutaj coś będzie..</p>
                <button onClick={clickButton} className="px-10 py-2 bg-[#fff] text-[#000]">Trigger</button>
            </section>
            <section className="w-1/2 min-h-screen flex justify-center items-center">
                <p className="text-themeColorY">Tutaj też coś będzie..</p>
            </section>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {isModalOpen &&   
                <TableForm closeModal={() => setIsModalOpen(false)}/>
            }
            </AnimatePresence>
        </>
    )
}