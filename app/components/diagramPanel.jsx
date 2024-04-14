"use client";
import React, { useState, useEffect } from "react";
import CpmDiagram from "./cpmDiagram";

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

    return data;
}

function calculateCriticalPath(data) {

    const criticalPath = [];
    let totalTime = 0;

    data.forEach(item => {
        if (item.Float === 0) {
            criticalPath.push(item.activity);
            totalTime += item.duration;
        }
    });

    return {
        criticalPath: criticalPath,
        totalTime: totalTime
    };
}

export default function DiagramPanel({ diagramData }) {


    const calculatedData = calculateCPM(diagramData);
    console.log(calculatedData);
    const criticalPath = calculateCriticalPath(calculatedData);
    console.log(criticalPath);

    return (
        <section className="w-screen min-h-screen flex justify-center items-center relative">
            {/*<h1>TUTAJ BĘDĄ WYŚWIETLANE DIAGRAMY, WYNIKI OBLICZEŃ ITP.</h1>*/}
            <CpmDiagram calculatedData={calculatedData} criticalPath={criticalPath}/>
            <span className='w-72 h-72 gradient2 rounded-full dark:blur-[160px] blur-[120px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]'></span>
        </section>
    )
}