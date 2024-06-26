'use client'

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() =>  setMounted(true), [])

    if (!mounted) return (
        <></>
    )

    return (
        <div onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}  className="md:w-12 w-10 md:h-12 h-10 dark:bg-[#2d2d2e] bg-[#d8d8d4] drop-shadow-lg dark:hover:bg-[#3e3e3f] hover:bg-[#c7c7c3] duration-300 rounded-md flex justify-center items-center cursor-pointer">
            {resolvedTheme === 'dark' ? (
                <FiSun className="text-themeColorY md:text-2xl text-xl"/>
            ) :  (
                <FiMoon className="text-themeColorP md:text-2xl text-xl"/>
            )}
        </div>
    );
}