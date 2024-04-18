import { MdOutlineQuestionMark } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa6';
import { IoIosArrowUp } from 'react-icons/io';
import { BsPlus } from 'react-icons/bs';
import { HiMiniMinus } from "react-icons/hi2";

const ButtonCircle = ({ buttonType, size, ...props }) => {

    return (
        <button className={`burger ${size == 1 ? 'md:p-3 p-2' : 'md:p-2 p-1'} rounded-full`} {...props}>
            <span className="burger__layer burger__layer-first"></span>
            <span className="burger__layer burger__layer-second"></span>
            <span className="burger__layer burger__layer-third"></span>
            {buttonType == 2 ? (
                <IoIosArrowUp className={`relative ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            ) : buttonType == 3 ? (
                <FaInfo className={`relative ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            ) : buttonType == 4 ? (
                <BsPlus className={`relative ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            ) : buttonType == 5 ? (
                <HiMiniMinus className={`relative ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            ) : (
                <MdOutlineQuestionMark className={`relative ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            )}
            
        </button>
    );
  };
  
  export default ButtonCircle;