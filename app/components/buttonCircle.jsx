import { MdOutlineQuestionMark } from 'react-icons/md';
import { FaInfo, FaExclamation } from 'react-icons/fa6'

const ButtonCircle = ({ buttonType, ...props }) => {

    return (
        <button className="burger md:p-3 p-1 rounded-full" {...props}>
            <span className="burger__layer burger__layer-first"></span>
            <span className="burger__layer burger__layer-second"></span>
            <span className="burger__layer burger__layer-third"></span>
            {buttonType == 2 ? (
                <FaExclamation className='relative md:text-xl text-base text-[#1e1e1f]'/>
            ) : buttonType == 3 ? (
                <FaInfo className='relative md:text-xl text-base text-[#1e1e1f]'/>
            ) : (
                <MdOutlineQuestionMark className='relative md:text-xl text-base text-[#1e1e1f]'/>
            )}
            
        </button>
    );
  };
  
  export default ButtonCircle;