import { motion } from 'framer-motion';

const AnimatedDiv = ({ delay, backgroundColor }) => {
  return (
    <motion.div 
      initial={{width: "0%"}} 
      animate={{width: "150%"}} 
      transition={{duration: 1, type: "tween", delay: delay}}
      className={`w-[150%] min-h-[100px] bg-${backgroundColor} -rotate-12 -translate-x-[10%] -translate-y-[120%]`}
    ></motion.div>
  );
};

export default AnimatedDiv;