"use client"
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from './buttonStandard';
import ButtonCircle from './buttonCircle';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Error from './errorComponent';
import InfoModal from './infoModal';
import LoadingElement from './loadingElement';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const animatedComponents = makeAnimated();

const TableComponent = ({ closeRequest, howMany }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedOptions, setSelectedOptions] = useState(Array.from({ length: howMany }, () => []));
  const [errorsNorm, setErrorsNorm] = useState(Array.from({ length: howMany }, () => ""));
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const router = useRouter();

  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

  const options = letters.slice(0, howMany).map(letter => ({ value: letter, label: letter }));
  options.unshift({value: "-", label: "-"});

  const schema = yup.object().shape({
    activities: yup.array().of(
      yup.string().required("Activity is required")
    ),
    durations: yup.array().of(
      yup.number().min(0.01, "Duration must be a positive number.").max(999, "Duration must be less than a 1000.").required("Duration is required.").typeError("Duration must be a number.")
    )
  });

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

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

  useEffect(() => {
    if(theme === 'dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme])

  const handleExport = (formData) => {
    setIsLoading(true);

    const emptySelects = selectedOptions.some(options => options.length === 0);

    if (emptySelects) {
      const newErrors = selectedOptions.map(options => (options.length === 0 ? "Dependency is required." : ""));
      setErrorsNorm(newErrors);
      setIsLoading(false);
      return;
    }

    const activityValues = formData.activities;
    const hasDuplicates = selectedOptions.some((options, index) => options.includes(activityValues[index]));

    if (hasDuplicates) {
      const newErrors = selectedOptions.map((options, index) => (options.includes(activityValues[index]) ? "Dependency cannot be the same as activity." : ""));
      setErrorsNorm(newErrors);
      setIsLoading(false);
      return;
    }

    const hasEmptyValue = selectedOptions.some(options => options.includes("-"));
    if (!hasEmptyValue) {
      setGlobalError("At least one row must contain '-' value.");
      setIsLoading(false);
      return;
    } else {
      setGlobalError("");
    }

    const invalidOptions = selectedOptions.map((options, index) => {
      if (options.includes("-") && options.length > 1) {
        return index;
      }
      return null;
    }).filter(index => index !== null);

    if (invalidOptions.length > 0) {
      const newErrors = Array.from({ length: howMany }, () => "");
      invalidOptions.forEach(index => {
        newErrors[index] = "After selecting '-' You cannot add more dependencies.";
      });
      setErrorsNorm(newErrors);
      setIsLoading(false);
      return;
    }

    const finalData = formData.activities.map((activity, index) => {
      return {
        activity: activity,
        dependencies: selectedOptions[index],
        duration: formData.durations[index],
        ES: null,
        EF: null,
        LS: null,
        LF: null,
        Float: null,
      };
    });

    router.push(`/diagram?data=${JSON.stringify(finalData)}`);
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
      backgroundColor: isDark ? "#2f2f2f" : "#d8d8d4",
      color: isDark ? "#fafaf6" : "#1e1e1f",
      height: "100%",
      borderBottom: isDark ? "1px solid #666" : "1px solid #aaa",
      ":active": {
        ...base[':active'],
        backgroundColor: isDark ? "#666" : "#aaa",
      },
    }),
    control: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1d1d1fcc" : "#e9e9e599",
      backdropFilter: "saturate(180%) blur(20px)",
      outline: "0px",
      borderRadius: "0px",
      border: isDark ? "2px solid #3e3e3f" : "2px solid #b5bbc4",
      height: "auto",
      maxHeight: isMobile ? "40px" : "44px",
      cursor: "pointer",
      overflow: "auto",
      padding: isMobile ? "0px" : "2px",
      transitionDuration: "300ms",
      ":hover": {
        ...base[':hover'],
        border: isDark ? "2px solid #3e3e3f" : "2px solid #b5bbc4",
      },
      ":focus-within": {
        ...base[':focus-within'],
        border: isDark ? "2px solid #3e3e3f" : "2px solid #b5bbc4",
        borderBottom: "2px solid #A374FF",
        boxShadow: "0px",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#666" : "#d8d8d4",
      color: isDark ? "#fafaf6" : "#1d1d1f",
      padding: "0px",
      margin: "1px 1px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "#fafaf6" : "#1d1d1f",
      padding: "0px 6px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      ":hover": {
        ...base[":hover"],
        backgroundColor: "#ffd074",
        color: "#1e1e1f"
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#2f2f2f" : "#d8d8d4",
      border: isDark ? "1px solid #666" : "1px solid #aaa",
      overflow: "hidden" ,
      zIndex: 100000000000000,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
    }),
    clearIndicator: (base) => ({
      ...base,
      position: "sticky",
      top: '0%',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      position: "sticky",
      top: '0%',
    }),
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
        <span className='fixed lg:right-10 right-4 top-4 z-[1002]'>
          <ButtonCircle buttonType={1} title="Open Tooltip" onClick={clickButton}/>
        </span>
        <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
          <h2 className='responsive_text font-extrabold tracking-tighter text-center'>Project Information</h2>
          <span className='lg:w-[25%] w-[34%] h-[2px] rounded-full gradient2'></span>
        </section>
        <form id='tableForm' className='w-full flex flex-col justify-center items-center gap-11 relative' onSubmit={handleSubmit(handleExport)}>
          <table className='dark:navbar navbar2 z-[1000]'>
            <thead>
              <tr className='uppercase font-extrabold sm:text-xs text-[10px] tracking-widest'>
                <th className='text-themeColorT pb-3'>Activity</th>
                <th className='text-themeColorP pb-3'>Dependency</th>
                <th className='text-themeColorY pb-3'>Duration</th>
              </tr>
            </thead>
              <tbody className='w-full h-auto'>
              {[...Array(howMany)].map((_, index) => (
                <tr key={index} className='w-full md:text-base text-sm group/main'>
                  <td className='w-1/5 relative'>
                    <Controller
                      name={`activities[${index}]`}
                      control={control}
                      defaultValue={String.fromCharCode(65 + index)}
                      render={({ field }) => (
                        <input
                          type="text"
                          value={field.value}
                          disabled
                          className='w-full disabled:cursor-text text-center dark:navbar navbar2 p-2 border-2 dark:border-borderColorD border-borderColorL group-focus-within/main:border-l-themeColorT outline-none focus:border-b-themeColorY focus:border-b-2 duration-300'
                        />
                      )}
                    />
                    <span className='absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full -translate-y-1/2 w-6 h-6 blur-3xl bg-themeColorT z-[-1] opacity-0 group-focus-within/main:opacity-100 duration-300'></span>
                  </td>
                  <td className="w-2/5 relative">
                    <Select
                      styles={colorStyles}
                      theme={customTheme}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      isMulti
                      options={options}
                      onChange={(selected) => {
                        const selectedValues = selected.map(option => option.value);
                        setSelectedOptions(prevState => {
                          const newSelectedOptions = [...prevState];
                          newSelectedOptions[index] = selectedValues;
                          return newSelectedOptions;
                        });
                        setErrorsNorm(prevErrors => {
                          const newErrors = [...prevErrors];
                          newErrors[index] = "";
                          return newErrors;
                        });
                      }}
                    />
                    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                    {errorsNorm[index] && (
                      <Error errorText={errorsNorm[index]}/>
                    )}
                    </AnimatePresence>
                  </td>
                  <td className='w-2/5 relative'>
                    <Controller
                      name={`durations[${index}]`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          {...field}
                          className='w-full text-center navbar2 p-2 border-2 dark:border-borderColorD border-borderColorL outline-none dark:focus:border-b-themeColorY focus:border-b-themeColorY focus:border-b-2 duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        />
                      )}
                    />
                    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                    {errors.durations && errors.durations[index] && (
                      <Error errorText={errors.durations[index].message} errorColor="#ffd074"/>
                    )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
            <span className='w-64 h-64 gradient2 rounded-full blur-[100px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]'></span>
          </table>
          <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {globalError && (
            <Error errorText={globalError} errorColor="#17f1d1"/>
          )}
          </AnimatePresence>
        </form>
        <section className='w-full flex gap-5 z-0 sm:flex-row flex-col justify-center items-center px-4 py-0'>
          <Button buttonText="Cancel" buttonType={2} title="Cancel" onClick={handleClose}/>
          <Button type="submit" form="tableForm" buttonText={isLoading ? <LoadingElement/> : "Calculate"} disabled={isLoading} buttonType={1} title={isLoading ? "Validation in progress" :"Calculate Model"}/>
        </section>
      </section>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {isModalOpen &&   
        <InfoModal closeModal={() => setIsModalOpen(false)}/>
      }
      </AnimatePresence>
    </>
  );
};

export default TableComponent;