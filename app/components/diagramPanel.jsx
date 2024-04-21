"use client";
import React, { useState, useEffect } from "react";
import CpmDiagram from "./cpmDiagram";
import Button from "./buttonStandard";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from 'react-icons/io'
import ButtonCircle from "./buttonCircle";
import OverviewModal from "./overviewModal";
import GanttModal from "./ganttModal";

function calculateCPM(data) {

    data.forEach(item => {
        if (item.dependencies.includes("-")) {
            item.ES = 0;
            item.EF = item.ES + item.duration;
        }
    });

    data.forEach(item => {
        if (!item.dependencies.includes("-")) {
            let maxEF = -Infinity;
            let maxEFDependency = null;
            item.dependencies.forEach(dependency => {
                const dependencyActivity = data.find(act => act.activity === dependency);
                if (dependencyActivity && dependencyActivity.EF > maxEF) {
                    maxEF = dependencyActivity.EF;
                    maxEFDependency = dependency;
                }
            });
            if (maxEFDependency) {
                item.ES = maxEF;
                item.EF = item.ES + item.duration;
            }
        }
    });


    const activitiesWithDependencies = data.map(item => item.dependencies).flat();
    const finalActivities = data.filter(item => !activitiesWithDependencies.includes(item.activity));

    const maxEFfinal = Math.max(...finalActivities.map(item => item.EF));
    finalActivities.forEach(item => {
        item.LF = maxEFfinal;
        item.LS = item.LF - item.duration;
    });

    for (let i = data.length - 1; i >= 0; i--) {
        const currentActivity = data[i];
        currentActivity.dependencies.forEach(dependency => {
            const dependencyActivity = data.find(act => act.activity === dependency);
            if(dependencyActivity) {
                if(dependencyActivity.LF == null || dependencyActivity.LF > currentActivity.LS) {
                    dependencyActivity.LF = currentActivity.LS;
                    dependencyActivity.LS = dependencyActivity.LF - dependencyActivity.duration;
                }
            }
        });
    }

    data.forEach(item => {
        item.Float = item.LF - item.EF;
    });

    for (let i = data.length - 1; i >= 0; i--) {
        const currentActivity = data[i];
        const dependencyLSValues = {};
        const criticalDependencies = [];

        const isDependencyForAnyActivity = data.some(activity => activity.dependencies.includes(currentActivity.activity));

        if (!isDependencyForAnyActivity) {
            if (currentActivity.dependencies.length > 0 && currentActivity.Float === 0) {
                currentActivity.dependencies.forEach(dependency => {
                    const dependencyActivity = data.find(act => act.activity === dependency);
                    if(dependencyActivity && dependencyActivity.Float == 0) {
                        dependencyLSValues[dependency] = dependencyActivity.LS;
                        criticalDependencies.push(dependency);
                    }
                });
            }
    
            if (Object.keys(dependencyLSValues).length > 0) {
                const maxLSDependency = Object.keys(dependencyLSValues).reduce((a, b) => dependencyLSValues[a] > dependencyLSValues[b] ? a : b);
                currentActivity.criticalDependencies = criticalDependencies.filter(dependency => dependency === maxLSDependency);
            }
        } else {
            const isCriticalDependency = data.some(activity => activity.criticalDependencies && activity.criticalDependencies.includes(currentActivity.activity));

            if (isCriticalDependency && currentActivity.dependencies.length > 0 && currentActivity.Float === 0) {
                currentActivity.dependencies.forEach(dependency => {
                    const dependencyActivity = data.find(act => act.activity === dependency);
                    if(dependencyActivity && dependencyActivity.Float == 0) {
                        dependencyLSValues[dependency] = dependencyActivity.LS;
                        criticalDependencies.push(dependency);
                    }
                });
            }
    
            if (Object.keys(dependencyLSValues).length > 0) {
                const maxLSDependency = Object.keys(dependencyLSValues).reduce((a, b) => dependencyLSValues[a] > dependencyLSValues[b] ? a : b);
                currentActivity.criticalDependencies = criticalDependencies.filter(dependency => dependency === maxLSDependency);
            }
        }
    }

    return data;
}

function calculateCriticalPath(data) {

    const criticalPath = [];
    let totalTime = 0;

    data.forEach(item => {
        if (item.criticalDependencies && item.criticalDependencies.length > 0) {
            item.criticalDependencies.forEach(dependency => {
                if (!criticalPath.includes(dependency)) {
                    criticalPath.push(dependency);
                }
                if (!criticalPath.includes(item.activity)) {
                    criticalPath.push(item.activity);
                }
            });
        }
    });

    criticalPath.forEach(activity => {
        const activityData = data.find(item => item.activity === activity);
        if (activityData) {
            totalTime += activityData.duration;
        }
    });

    return {
        criticalPath: criticalPath,
        totalTime: totalTime
    };
}

export default function DiagramPanel({ diagramData }) {

    const [isMobile, setIsMobile] = useState(false);
    const [isElementOpen, setIsElementOpen] = useState(true);
    const [isGanttOpen, setIsGanttOpen] = useState(false);
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);

    const calculatedData = calculateCPM(diagramData);
    const criticalPath = calculateCriticalPath(calculatedData);

    console.log(calculatedData);
    console.log(criticalPath);

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

    const handleHideElement = () => {
        setIsElementOpen(false);
    }

    const handleOpenElement = () => {
        setIsElementOpen(true);
    }

    const handleOpenGantt = () => {
        setIsGanttOpen(true);
    }

    const handleOpenOverview = () => {
        setIsOverviewOpen(true);
    }

    return (
        <section className="w-full min-h-screen flex justify-center items-center relative">
            <CpmDiagram calculatedData={calculatedData} criticalPath={criticalPath}/>
            {!isMobile && <span className='w-72 h-72 gradient2 rounded-full dark:blur-[160px] blur-[120px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]'></span>}
            <section className={`fixed md:w-[340px] w-[98%] ${isElementOpen ? 'h-auto py-12 px-2 border' : 'h-0'} duration-300 md:right-4 right-1 md:bottom-4 bottom-1 rounded-md navbar2 overflow-hidden dark:border-borderColorD border-borderColorL flex flex-col justify-start items-center z-[1001] gap-8`}>
                <IoIosArrowDown className="absolute right-3 top-3 text-xl cursor-pointer" title="Hide Informations" onClick={handleHideElement}/>
                <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
                    <h1 className='md:text-2xl responsive_text2 font-extrabold tracking-tighter text-center'>Project Informations</h1>
                    <motion.span initial={{width: 0}} animate={{width: "20%"}} transition={{duration: 0.4, type: "tween"}} className='w-[20%] h-[2px] rounded-full gradient2'></motion.span>
                </section>
                <section className="w-full h-auto flex flex-col justify-center items-start md:gap-3 gap-2 px-[10%]">
                    <p className="md:text-base text-sm">Critical Path:
                        <span className="font-extrabold pl-2 text-themeColorT">
                        {criticalPath.criticalPath.map((item, index) => (
                            index === criticalPath.criticalPath.length - 1 ? item : `${item} -> `
                        ))}
                        </span>
                    </p>
                    <p className="md:text-base text-sm">Total time: <span className="font-extrabold text-themeColorP pl-2">{criticalPath.totalTime}</span></p>
                </section>
                <section className="w-full h-auto flex flex-col justify-center items-center gap-3">
                    <Button onClick={handleOpenGantt} buttonText="Gantt Chart" buttonType="1"/>
                    <Button onClick={handleOpenOverview} buttonText="Overview" buttonType="2"/>
                </section>
            </section>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {!isElementOpen &&
                <div className="fixed right-4 bottom-4 z-[999]">
                    <ButtonCircle buttonType={2} size={1} title="Open Informations" onClick={handleOpenElement}/>
                </div>
            }
            </AnimatePresence>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {isOverviewOpen &&
                <OverviewModal closeModal={() => setIsOverviewOpen(false)} calculatedData={calculatedData} criticalPath={criticalPath}/>
            }
            </AnimatePresence>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {isGanttOpen &&
                <GanttModal closeModal={() => setIsGanttOpen(false)} calculatedData={calculatedData} criticalPath={criticalPath}/>
            }
            </AnimatePresence>
        </section>
    )
}