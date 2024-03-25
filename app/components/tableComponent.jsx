import { useEffect, useState } from 'react';
import { MdOutlineQuestionMark } from 'react-icons/md';
import InstructionsModal from './instructionsModal';
import { AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const TableComponent = ({ closeRequest, howMany }) => {

  const [data, setData] = useState(Array.from({ length: howMany}, () => ({ col1: '', col2: [], col3: '' })));
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <section className='w-full h-full md:px-12 sm:px-2 px-1 md:py-14 py-10 gap-11 flex flex-col justify-start items-center relative'>
        <div className='fixed lg:right-10 right-4 top-4 z-[900]'>
          <button onClick={clickButton} title='Open tooltip' className="burger md:p-3 p-1 rounded-full">
            <span className="burger__layer burger__layer-first"></span>
            <span className="burger__layer burger__layer-second"></span>
            <span className="burger__layer burger__layer-third"></span>
            <MdOutlineQuestionMark className='relative md:text-xl text-base text-[#1e1e1f]'/>
          </button>
        </div>
        <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
          <h2 className='responsive_text font-extrabold tracking-tighter text-center'>Project Information</h2>
          <span className='lg:w-[25%] w-[34%] h-[2px] rounded-full gradient2'></span>
        </section>
        <form className='w-full flex flex-col justify-center items-center gap-11' onSubmit={handleExport}>
        <table className='navbar'>
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
                    <Select styles={{
                      option: (base) => ({
                        ...base,
                        outline: "0px",
                        backgroundColor: "#1e1e1f",
                        color: "#fafaf6",
                        height: "100%",
                        borderBottom: "1px solid #666",
                        ":active": {
                          ...base[':active'],
                          backgroundColor: "#666",
                        }
                      }),
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#1d1d1fcc",
                        outline: "0px",
                        border: "2px solid #3e3e3f",
                        height: "100%",
                        padding: "2px",
                        transitionDuration: "300ms",
                        ":hover": {
                          ...base[':hover'],
                          border: "2px solid #3e3e3f",
                        },
                        ":focus": {
                          ...base[':focus'],
                          border: "2px solid #3e3e3f",
                          borderBottom: "2px solid #A374FF",
                          outline: "0px"
                        },
                        ":focus-visible": {
                          ...base[':focus'],
                          border: "2px solid #3e3e3f",
                          borderBottom: "2px solid #A374FF",
                          outline: "0px"
                        },
                        ":focus-within": {
                          ...base[':focus'],
                          border: "2px solid #3e3e3f",
                          borderBottom: "2px solid #A374FF",
                          outline: "0px"
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#666",
                        color: "#fafaf6",
                        padding: "0px",
                        margin: "0px 1px",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#fafaf6",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        ":hover": {
                          ...base[":hover"],
                          backgroundColor: "#ffd074",
                          color: "#1e1e1f"
                        }
                      })
                    }} theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary: "#3e3e3f",
                        primary25: "#3e3e3f",
                      },
                      backgroundColor: {
                        ...theme.colors,
                        primary: "#3e3e3f"
                      }
                    })} closeMenuOnSelect={false} required components={animatedComponents} isMulti options={options} onChange={e => handleChange(e, rowIndex, 1)}/>
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
          <div className='w-48 h-48 gradient2 rounded-full blur-3xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]'></div>
        </table>
        <section className='w-full flex gap-5 sm:flex-row flex-col justify-center items-center px-4 py-0'>
          <button title='Cancel' onClick={handleClose} className="btn2">
            <div className="btn__bg2">
              <span className="btn__bg__layer btn__bg__layer-first"></span>
              <span className="btn__bg__layer btn__bg__layer-second"></span>
              <span className="btn__bg__layer btn__bg__layer-third2"></span>
            </div>
            <span className="btn__text-out">Cancel</span>
            <span className="btn__text-in">Cancel</span>
          </button>
          <button type='submit' title='Generate' className="btn">
            <div className="btn__bg">
              <span className="btn__bg__layer btn__bg__layer-first"></span>
              <span className="btn__bg__layer btn__bg__layer-second"></span>
              <span className="btn__bg__layer btn__bg__layer-third"></span>
            </div>
            <span className="btn__text-out">Solve</span>
            <span className="btn__text-in">Solve</span>
          </button>
        </section>
        </form>
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