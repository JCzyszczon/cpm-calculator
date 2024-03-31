import { motion } from 'framer-motion';

const Error = ({ errorText, errorColor , ...props }) => {

    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-0 left-0 text-center w-[98%] z-[100] ${errorColor ? "" : "bg-themeColorP"} drop-shadow-2xl text-backgroundColor overflow-hidden`}
            style={{ originY: 0, translateY: "100%", translateX: "1%", backgroundColor: errorColor }}
            {... props}
        >
            {errorText}
        </motion.div>
    );
  };
  
export default Error;