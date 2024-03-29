import { useEffect, useState } from 'react';
import InstructionsModal from './instructionsModal';
import { AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from './buttonStandard';
import ButtonCircle from './buttonCircle';

const animatedComponents = makeAnimated();

const TableComponent = ({ closeRequest, howMany }) => {

  const [data, setData] = useState(Array.from({ length: howMany}, () => ({ col1: '', col2: [], col3: '' })));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

  const options = letters.slice(0, howMany).map(letter => ({ value: letter, label: letter }));
  options.unshift({value: "-", label: "-"});

  const handleChange = (e, rowIndex, colIndex) => {
    if(colIndex == 1) {
      const values = e.map(obj => obj.value);
      setData(prevData => {
        const newData = [...prevData];
        newData[rowIndex].col2 = [];
        newData[rowIndex].col2.push(...values);
        return newData;
      });
    } else {
      const { value } = e.target;
      setData(prevData => {
        const newData = [...prevData];
        newData[rowIndex][`col${colIndex + 1}`] = value;
        return newData;
      });
    }
  };

  useEffect(() => {
    if (howMany > 0) {
      const newData = data.map((item, index) => ({
        ...item,
        col1: index < howMany ? letters[index] : item.col1
      }));
      setData(newData);
    }
  }, [howMany]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExport = (e) => {
    e.preventDefault();

    const jsonData = JSON.stringify(data);
    //console.log(jsonData);
    console.log(data);
  };

  const handleClose = () => {
    closeRequest();
  }

  const clickButton = () => {
    setIsModalOpen(true);
  }

  const colorStyles = {
    option: (base) => ({
      ...base,
      textAlign: "center",
      outline: "0px",
      backgroundColor: "#2f2f2f",
      color: "#fafaf6",
      height: "100%",
      borderBottom: "1px solid #666",
      ":active": {
        ...base[':active'],
        backgroundColor: "#666",
      },
    }),
    control: (base) => ({
      ...base,
      backgroundColor: "#1d1d1fcc",
      backdropFilter: "saturate(180%) blur(20px)",
      outline: "0px",
      borderRadius: "0px",
      border: "2px solid #3e3e3f",
      height: "auto",
      maxHeight: isMobile ? "40px" : "44px",
      cursor: "pointer",
      overflow: "auto",
      padding: isMobile ? "0px" : "2px",
      transitionDuration: "300ms",
      ":hover": {
        ...base[':hover'],
        border: "2px solid #3e3e3f",
      },
      ":focus-within": {
        ...base[':focus-within'],
        border: "2px solid #3e3e3f",
        borderBottom: "2px solid #A374FF",
        boxShadow: "0px",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#666",
      color: "#fafaf6",
      padding: "0px",
      margin: "1px 1px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#fafaf6",
      padding: "0px 6px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      ":hover": {
        ...base[":hover"],
        backgroundColor: "#ffd074",
        color: "#1e1e1f"
      }
    })
  }

  const customTheme = (theme) => ({
    ...theme,
    borderRadius: 7,
    colors: {
      ...theme.colors,
      primary: "#3e3e3f00",
      primary25: "#3e3e3f00",
      neutral0: "#2f2f2f",
    },
    backgroundColor: {
      ...theme.colors,
      primary: "#3e3e3f",
      neutral0: "#2f2f2f"
    }
  });

  return (
    <>
      <section className='w-full h-full md:px-12 sm:px-2 px-1 md:py-14 py-10 gap-11 flex flex-col justify-start items-center relative'>
        <span className='fixed lg:right-10 right-4 top-4 z-[900]'>
          <ButtonCircle buttonType={1} title="Open Tooltip" onClick={clickButton}/>
        </span>
        <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
          <h2 className='responsive_text font-extrabold tracking-tighter text-center'>Project Information</h2>
          <span className='lg:w-[25%] w-[34%] h-[2px] rounded-full gradient2'></span>
        </section>
        <form id='tableForm' className='w-full flex flex-col justify-center items-center gap-11' onSubmit={handleExport}>
          <table className='navbar z-[1000]'>
            <thead>
              <tr className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest'>
                <th className='text-themeColorT pb-3'>Activity</th>
                <th className='text-themeColorP pb-3'>Dependency</th>
                <th className='text-themeColorY pb-3'>Duration</th>
              </tr>
            </thead>
            <tbody className='w-full h-auto z-[1001]'>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className='w-full md:text-base text-sm group/main'>
                  <td className='w-1/5 relative'>
                    <input
                      type="text"
                      value={letters[rowIndex]}
                      disabled
                      className='w-full disabled:cursor-text text-center navbar p-2 border-2 border-borderColor group-focus-within/main:border-l-themeColorT outline-none focus:border-b-themeColorY focus:border-b-2 duration-300'
                    />
                    <span className='absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full -translate-y-1/2 w-4 h-4 blur-3xl bg-themeColorT z-[-1] opacity-0 group-focus-within/main:opacity-100 duration-300'></span>
                  </td>
                  <td className='w-2/5 relative group/second'>
                      <Select styles={colorStyles} theme={customTheme} closeMenuOnSelect={true} required components={animatedComponents} isMulti options={options} onChange={e => handleChange(e, rowIndex, 1)}/>
                  </td>
                  <td className='w-2/5'>
                    <input
                      type="number"
                      step={0.01}
                      min={0}
                      max={1000}
                      required
                      onChange={e => handleChange(e, rowIndex, 2)}
                      className='w-full text-center navbar p-2 border-2 border-borderColor outline-none focus:border-b-themeColorY focus:border-b-2 duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <span className='w-48 h-48 gradient2 rounded-full blur-3xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]'></span>
          </table>
        </form>
        <section className='w-full flex gap-5 z-0 sm:flex-row flex-col justify-center items-center px-4 py-0'>
          <Button buttonText="Cancel" buttonType={2} title="Cancel" onClick={handleClose}/>
          <Button type="submit" form="tableForm" buttonText="Calculate" buttonType={1} title="Calculate Model"/>
        </section>
      </section>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {isModalOpen &&   
        <InstructionsModal closeModal={() => setIsModalOpen(false)}/>
      }
      </AnimatePresence>
    </>
  );
};

export default TableComponent;