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
                <button onClick={clickButton} title='Open Modal' className="btn">
                    <div className="btn__bg">
                        <span className="btn__bg__layer btn__bg__layer-first"></span>
                        <span className="btn__bg__layer btn__bg__layer-second"></span>
                        <span className="btn__bg__layer btn__bg__layer-third"></span>
                    </div>
                    <span className="btn__text-out">Generate</span>
                    <span className="btn__text-in">Generate</span>
                </button>
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