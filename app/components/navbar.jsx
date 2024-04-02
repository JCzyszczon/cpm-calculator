"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import cpm_logo from '../img/CPM-Logo.png';

export default function Navbar() {

    return (
        <header className='fixed top-0 left-0 w-full h-auto navbar z-[10]'>
            <nav className='w-full flex md:justify-start justify-center items-center pt-4 pb-1 px-[6%]'>
                <Link href={"/"} title='Go to homepage'><Image src={cpm_logo} priority alt='CPM Logo' className='md:h-[70px] h-[48px] w-auto'/></Link>
            </nav>
        </header>
    )
}