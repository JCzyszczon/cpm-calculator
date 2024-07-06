"use client";
import React, { useState, useEffect } from "react";
import GenerateTableModal from "./generateTableModal";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import HeroSection from "./heroSection";
import PanelField from "./panelField";

export default function MainPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState(null);
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);

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

  const handleOpenModal = (num) => {
    setNumber(Number(num));
    setIsModalOpen(true);
  };

  return (
    <>
      <section className='w-full max-w-[1980px] flex justify-center items-center overflow-hidden relative'>
        <section className='md:w-1/2 w-full min-h-[600px] max-h-screen flex justify-center items-center relative'>
          <PanelField openModal={handleOpenModal} />
        </section>
        <section className='w-1/2 min-h-[600px] max-h-screen gap-2 overflow-hidden md:flex hidden flex-col justify-start items-start relative'>
          <span className='absolute w-[50px] h-full left-0 top-0 shadowMain z-[5]'></span>
          <span className='absolute w-[50px] h-full right-0 top-0 shadowMain2 z-[5]'></span>
          <HeroSection isDark={isDark} numberOfMarquees={7} />
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isModalOpen && (
          <GenerateTableModal
            rowNumber={number}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
