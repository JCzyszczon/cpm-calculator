"use client";
import React, { useState, useEffect } from "react";
import GenerateTableModal from "./generateTableModal";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./buttonStandard";
import { FaArrowRightLong } from 'react-icons/fa6';
import Error from './errorComponent';
import AnimatedDiv from "./animatedDiv";
import { Link as ScrollLink } from 'react-scroll';
import DiagramImage from '../img/481821.png';
import DiagramImageDark from '../img/481822.png';
import Image from "next/image";
import { useTheme } from 'next-themes';

export default function MainPanel() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const backgroundColors = ['themeColorP', 'themeColorT', 'themeColorY', 'themeColorP', 'themeColorT', 'themeColorY', 'themeColorP', 'themeColorT', 'themeColorY', 'themeColorP', 'themeColorT', 'themeColorY'];
    const delays = [1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55];
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      if(theme === 'dark') {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }, [theme])

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!number) {
          setError('Attribute is required.');
          return;
        }
    
        const num = parseInt(number);
        if (isNaN(num)) {
          setError('Please provide number.');
          return;
        }
    
        if (num < 2 || num > 16) {
          setError('Attribute must be a number between 2 and 16.');
          return;
        }

        setNumber(num);
        setIsModalOpen(true);
    };
    
    const handleChange = (event) => {
        setNumber(event.target.value);
        setError('');
    };
    
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
        <>
            <section className="w-full flex justify-center items-center overflow-hidden relative">
              <section className="md:w-1/2 w-full min-h-screen flex justify-center items-center lg:py-[10%] py-[20%] relative">
                  <section className="relative w-[80%] navbar2 overflow-hidden h-full dark:bg-modalColorD duration-300 bg-modalColorL border dark:border-borderColorD border-borderColorL rounded-md flex flex-col md:gap-8 gap-6 justify-center items-center md:px-10 px-[6%] py-14">
                      <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
                          <h1 className='responsive_text2 font-extrabold tracking-tighter text-center'>Critical Path Method</h1>
                          <motion.span initial={{width: 0}} animate={{width: "20%"}} transition={{duration: 0.4, type: "tween"}} className='w-[20%] h-[2px] rounded-full gradient2'></motion.span>
                      </section>
                      <p className="w-full text-center md:text-base mt-2 text-sm">Please enter the number of activities in the <span className="text-themeColorP font-extrabold">field below</span>, in order to generate proper diagram model.</p>
                      <form id="numberForm" className="w-full max-w-[450px] relative" onSubmit={handleSubmit}>
                          <label htmlFor="number" className="pl-2 uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Number of Activities:</label>
                          <input
                            type="number"
                            value={number}
                            onChange={handleChange}
                            id="number"
                            step={1}
                            placeholder="Max. 16"
                            className='w-full text-start navbar2 p-2 border-2 mt-1 dark:border-borderColorD border-borderColorL outline-none dark:focus:border-b-themeColorT focus:border-b-themeColorT focus:border-b-2 pl-4 duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          />
                          {error && 
                              <Error errorText={error} errorColor={"#17f1d1"}/>
                          }
                      </form>
                      <section className="w-full flex flex-col gap-6 justify-center items-center md:mt-0 mt-2">
                          <Button type="submit" form="numberForm" buttonType={1} buttonText="Generate" title="Open Modal"/>
                          <div className="w-full max-w-[140px] h-[1px] dark:bg-borderColorD bg-borderColorL relative"></div>
                          <ScrollLink to='learnMore' href="" smooth={true} duration={400} offset={-60}><button className="font-extrabold flex justify-center items-center gap-2 group md:text-base text-sm tracking-widest"><span className="relative">Learn more<span className="group-hover:w-full w-0 absolute left-0 bottom-0 h-[2px] gradient2 duration-300"></span></span><span className="group-hover:rotate-90 duration-300"><FaArrowRightLong/></span></button></ScrollLink>
                      </section>
                      {!isMobile && 
                        <span className='dark:md:w-48 md:w-48 w-48 dark:md:h-48 md:h-48 h-48 gradient2 rounded-full blur-[160px] dark:blur-[160px] absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2'></span>
                      }
                  </section>
              </section>
              {!isMobile ? (
                <section className="w-1/2 h-screen gap-2 overflow-hidden flex flex-col justify-between items-start relative">
                {backgroundColors.map((color, index) => (
                    <AnimatedDiv key={index} delay={delays[index]} backgroundColor={color} />
                ))}
                  <motion.span initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, type: "tween", delay: 1.75}}  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image src={isDark ? DiagramImageDark : DiagramImage} alt="Diagram Image" className="w-[180px] aspect-square"/>
                  </motion.span>
                </section>
              ) : (
                <>
                  <span className='absolute right-0 bottom-0 w-full h-[20px] bg-themeColorT -rotate-45 translate-x-32 translate-y-4'></span>
                  <span className='absolute right-0 bottom-0 w-full h-[20px] bg-themeColorP -rotate-45 translate-x-32 translate-y-14'></span>
                  <span className='absolute right-0 bottom-0 w-full h-[20px] bg-themeColorY -rotate-45 translate-x-32 translate-y-24'></span>
                </>
              )}
            </section>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {isModalOpen &&   
                <GenerateTableModal rowNumber={number} closeModal={() => setIsModalOpen(false)}/>
            }
            </AnimatePresence>
        </>
    )
}