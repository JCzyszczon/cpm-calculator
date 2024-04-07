"use client";
import React, { useState, useEffect } from "react";

function calculateCPM(data) {

    // poczatkowe obliczenia ES i EF dla aktywnosci startowych (te, ktore maja brak zaleznosci)
    data.forEach(item => {
        if (item.dependencies.includes("-")) {
            item.ES = 0;
            item.EF = item.ES + item.duration;
        }
    });

    // wykonanie obliczen ES i EF dla calej reszty aktywnosci
    // tutaj trzeba bylo wziac pod uwage, ze dana aktywnosc moze miec kilka poprzedzajacych
    // wiec jako ES wybieramy najwieksza wartosc ze wszystkich zaleznosci
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

    // teraz poruszamy sie od konca przeslanego zestawu danych i poszukujemy takich aktywnosci
    // ktore nie pojawiaja sie wsrod "dependencies" wsrod innych (czyli beda to aktywnosci koncowe)
    const activitiesWithDependencies = data.map(item => item.dependencies).flat();
    const koncoweAktywnosci = data.filter(item => !activitiesWithDependencies.includes(item.activity));
    const finalActivities = data.filter(item => !activitiesWithDependencies.includes(item.activity));

    // dla nich obliczamy LF jako rowne EF
    const maxEFfinal = Math.max(...finalActivities.map(item => item.EF));
    finalActivities.forEach(item => {
        item.LF = maxEFfinal;
        item.LS = item.LF - item.duration;
    });

    // nastepnie poruszamy sie znowu od konca do poczatku
    // znajdujemy jakas aktywnosci i odczytujemy od jakich aktywnosci jest zalezna ("dependencies")
    // nastepnie przechodzimy do tej aktywnosci, ktora jest jako zaleznosc
    // i obliczamy dla niej LF, ktora bedzie rowna LS aktywnosci rozpatrywanej
    // i tak az do samego poczatku danych
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

    // na sam koniec obliczamy roznice LF - EF i wyznaczamy zapas czasu
    data.forEach(item => {
        item.Float = item.LF - item.EF;
    });

    return data;
}

function calculateCriticalPath(data) {

    const criticalPath = [];
    let totalTime = 0;

    // iterujemy po danych
    // jezeli odczytany zapas czasu jest rowny to oznacza ze nalezy do sciezki krytycznej
    // i jego czas nalezy dodac do koncowego wyniku "totalTime"
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

    console.log(diagramData);

    const calculatedData = calculateCPM(diagramData);
    console.log(calculatedData);
    const criticalPath = calculateCriticalPath(calculatedData);
    console.log(criticalPath);

    return (
        <section className="w-screen min-h-full flex justify-center items-center">
            <h1>TUTAJ BĘDĄ WYŚWIETLANE DIAGRAMY, WYNIKI OBLICZEŃ ITP.</h1>
        </section>
    )
}