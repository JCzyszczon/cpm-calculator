"use client";
import React from "react";
import Astronaut2 from '../img/8300_2_07.jpg';
import Image from 'next/image';
import Button from './buttonStandard';
import { useRouter } from "next/navigation";

export default function NotFound404() {

    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    }

    return (
      <section className='w-screen min-h-screen flex justify-center items-center relative px-10 py-20'>
        <section className='flex flex-col justify-center items-center gap-10 text-center'>
            <h1 className='responsive_text3 font-extrabold flex justify-center items-center'>4<span><Image src={Astronaut2} alt="Astronaut image" priority className='md:w-[280px] w-[200px] rounded-full'/></span>4</h1>
            <p className='md:text-5xl text-3xl font-extrabold tracking-tighter'>Something went <span className='text-themeColorP'>wrong</span>.</p>
            <Button onClick={handleClick} buttonText="Return home" buttonType={2} title="Go back home"/>
        </section>
        <div className='w-[40%] h-[40%] gradient2 rounded-full dark:md:blur-[200px] md:blur-[200px] blur-[100px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]'></div>
      </section> 
    )
}