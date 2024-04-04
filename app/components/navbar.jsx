"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import cpm_logo from '../img/CPM-Logo.png';
import ThemeSwitch from './themeSwitch';
import { useTheme } from 'next-themes';

export default function Navbar() {

    const { theme, setTheme } = useTheme();
    const [navbarStyle, setNavbarStyle] = useState({ backgroundColor: '#fafaf600' });

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          if (scrollPosition > 20) {
            setNavbarStyle({ backgroundColor: theme === 'dark' ? '#1d1d1fcc' : '#fafaf699' });
          } else {
            setNavbarStyle({ backgroundColor: '#fafaf600' });
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <header style={navbarStyle} className='fixed top-0 left-0 w-full h-auto navbar z-[10]'>
            <nav className='w-full flex justify-between items-center pt-4 pb-1 px-[6%]'>
                <Link href={"/"} title='Go to homepage'><Image src={cpm_logo} priority alt='CPM Logo' className='md:h-[70px] h-[48px] w-auto'/></Link>
                <ThemeSwitch/>
            </nav>
        </header>
    )
}