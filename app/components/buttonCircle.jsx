import { MdOutlineQuestionMark } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa6';
import { IoIosArrowUp } from 'react-icons/io'

const ButtonCircle = ({ buttonType, size, ...props }) => {

    return (
        <button className={`burger md:p-3 ${size == 1 ? 'p-2' : 'p-1'} rounded-full`} {...props}>
            <span className="burger__layer burger__layer-first"></span>
            <span className="burger__layer burger__layer-second"></span>
            <span className="burger__layer burger__layer-third"></span>
            {buttonType == 2 ? (
                <IoIosArrowUp className={`relative md:text-xl ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            ) : buttonType == 3 ? (
                <FaInfo className={`relative md:text-xl ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            ) : (
                <MdOutlineQuestionMark className={`relative md:text-xl ${size == 1 ? 'text-xl' : 'text-base'} text-[#1e1e1f]`}/>
            )}
            
        </button>
    );
  };
  
  export default ButtonCircle;