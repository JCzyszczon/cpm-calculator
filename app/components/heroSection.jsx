import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function HeroSection({ isDark, numberOfMarquees }) {
  const [activeIndices, setActiveIndices] = useState({});

  const handleMouseEnter = (marqueeIndex, itemIndex) => {
    setActiveIndices((prev) => ({
      ...prev,
      [marqueeIndex]: itemIndex,
    }));
  };

  const handleMouseLeave = (marqueeIndex) => {
    setActiveIndices((prev) => ({
      ...prev,
      [marqueeIndex]: null,
    }));
  };

  const items = [
    { color: "#17f1d1", borderColor: "border-themeColorT" },
    { color: "#ffd074", borderColor: "border-themeColorY" },
    { color: "#A374FF", borderColor: "border-themeColorP" },
    { color: "#17f1d1", borderColor: "border-themeColorT" },
    { color: "#ffd074", borderColor: "border-themeColorY" },
    { color: "#A374FF", borderColor: "border-themeColorP" },
    { color: "#17f1d1", borderColor: "border-themeColorT" },
    { color: "#ffd074", borderColor: "border-themeColorY" },
  ];

  const numMarquees = numberOfMarquees;

  const rotateArrayLeft = (arr, count) => {
    return arr.map((_, i) => arr[(i + count) % arr.length]);
  };

  return (
    <>
      {[...Array(numMarquees)].map((_, marqueeIndex) => (
        <Marquee
          key={marqueeIndex}
          className='overflow-hidden flex justify-start items-start h-full min-h-[120px]'
        >
          {rotateArrayLeft(items, numMarquees - marqueeIndex).map(
            (item, itemIndex) => (
              <motion.div
                key={`${marqueeIndex}-${itemIndex}`}
                onMouseEnter={() => handleMouseEnter(marqueeIndex, itemIndex)}
                onMouseLeave={() => handleMouseLeave(marqueeIndex)}
                className={`w-[120px] aspect-square bg-transparent rounded-md border-2 ${item.borderColor} mx-1`}
                style={{
                  backgroundColor:
                    activeIndices[marqueeIndex] === itemIndex
                      ? item.color
                      : `${isDark ? "var(--backgroundColor)" : "#fafaf6"}`,
                }}
                animate={{
                  backgroundColor:
                    activeIndices[marqueeIndex] === itemIndex
                      ? item.color
                      : `${isDark ? "var(--backgroundColor)" : "#fafaf6"}`,
                }}
                transition={{ duration: 0.75 }}
              ></motion.div>
            )
          )}
        </Marquee>
      ))}
    </>
  );
}

export default HeroSection;
