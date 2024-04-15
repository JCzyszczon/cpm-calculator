import React from 'react';
import {FaGithub} from 'react-icons/fa'

function Footer() {
  return (
    <section className='w-full bg-themeColorP px-[10%] py-1 flex justify-between items-center'>
        <p className='md:text-base text-sm'>&copy;Copyright. All Rights Reserved.</p>
        <a href='https://github.com/JCzyszczon' title='Open Github' target='_blank'><FaGithub className='md:text-2xl text-xl cursor-pointer'/></a>
    </section>
  )
}

export default Footer;