import Image from 'next/image';
import React from 'react';
import {FaGithub, FaLinkedin, FaInstagram} from 'react-icons/fa'
import Logo from '../img/CPM-Logo.png'
import Link from 'next/link';

function Footer() {
  return (
    <section className='w-full dark:bg-backgroundColorD bg-backgroundColorL md:px-[8%] px-0 md:py-4 py-8 flex flex-col justify-between gap-5 items-center'>
        <div className='w-full h-[1px] dark:bg-borderColorD rounded-full bg-borderColorL'></div>
        <section className='w-full flex md:flex-row flex-col-reverse justify-between md:gap-0 gap-8 items-center md:px-0 px-2'>
          <Link href={"/"} title='Go to homepage' className='md:w-full w-auto'><Image src={Logo} className='md:w-[80px] w-[60px] h-auto'/></Link>
          <p className='w-full text-center md:text-base text-sm'>&copy;2024 All Rights Reserved.</p>
          <section className='w-full flex md:justify-end justify-center items-center gap-6 text-2xl'>
            <div className='bg-transparent group hover:bg-themeColorY duration-300 rounded-full p-2 cursor-pointer'>
              <a href="https://github.com/JCzyszczon" title='Open Github' target='_blank'><FaGithub className='dark:group-hover:text-backgroundColorD group-hover:text-backgroundColorL duration-300'/></a>
            </div>
            <div className='bg-transparent group hover:bg-themeColorY duration-300 rounded-full p-2 cursor-pointer'>
              <a href="https://github.com/JCzyszczon" title='Open Instagram' target='_blank'><FaInstagram className='dark:group-hover:text-backgroundColorD group-hover:text-backgroundColorL duration-300'/></a>
            </div>
            <div className='bg-transparent group hover:bg-themeColorY duration-300 rounded-full p-2 cursor-pointer'>
              <a href="https://github.com/JCzyszczon" title='Open Linkedin' target='_blank'><FaLinkedin className='dark:group-hover:text-backgroundColorD group-hover:text-backgroundColorL duration-300'/></a>
            </div>
          </section>
        </section>
    </section>
  )
}

export default Footer;