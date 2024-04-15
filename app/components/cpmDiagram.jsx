"use client";
import React, { useState, useEffect } from 'react';
import Graph from "react-graph-vis";
import CpmDetailsModal from './cpmDetailsModal';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

function CpmDiagram({ calculatedData, criticalPath }) {

    const [selectedNode, setSelectedNode] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelctedData] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const { theme, setTheme } = useTheme();
    const [graphHeight, setGraphHeight] = useState("500px");

    useEffect(() => {
        if(theme === 'dark') {
          setIsDark(true);
        } else {
          setIsDark(false);
        }
    }, [theme])

    useEffect(() => {
        function handleResize() {
            const availableHeight = window.innerHeight;
            setGraphHeight(`${availableHeight * 0.9}px`);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isModalOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        return () => {
          document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    const handleNodeClick = (event) => {
        const { nodes } = event;
        if (nodes.length === 1) {
            setSelectedNode(nodes[0]);
            calculatedData.forEach(activity => {
                if(activity.activity === selectedNode) {
                    setSelctedData(activity);
                    setIsModalOpen(true);
                }
            })
        }
    };

    const closeModal = () => {
        setSelectedNode(null);
        setSelctedData(null);
        setIsModalOpen(false);
    };

    const startNode = {
        id: 'start',
        label: 'Start',
        color: '#17f1d1',
        shape: 'box',
    };

    const endNode = {
        id: 'end',
        label: 'End',
        color: '#17f1d1',
        shape: 'box',
    };

    const activitiesWithNoDependencies = calculatedData.filter(item => item.dependencies.includes('-'));
    const endActivities = calculatedData.filter(item => !calculatedData.some(otherItem => otherItem.dependencies.includes(item.activity)));
    const criticalPathActivities = criticalPath.criticalPath;

    const startEdges = activitiesWithNoDependencies.map(item => ({
        from: 'start',
        to: item.activity,
    }));

    const endEdges = endActivities.map(item => ({
        from: item.activity,
        to: 'end',
    }));

    const additionalHighlightedEdges = [
        { from: 'start', to: criticalPathActivities[0], color: '#ffd074', width: 2 },
        { from: criticalPathActivities[criticalPathActivities.length - 1], to: 'end', color: '#ffd074', width: 2 },
    ];

    const criticalPathEdges = calculatedData.reduce((acc, item) => {
        const isCritical = criticalPathActivities.includes(item.activity);
        const dependenciesOnCriticalPath = item.dependencies.filter(dep => criticalPathActivities.includes(dep));
        
        if (isCritical) {
            return [
                ...acc,
                ...dependenciesOnCriticalPath.map(dep => ({
                    from: dep,
                    to: item.activity,
                    color: '#ffd074',
                    width: 2,
                })),
            ];
        }
        return acc;
    }, []);

    const nodes = [startNode, ...calculatedData.map(item => ({ id: item.activity, label: item.activity, color: criticalPathActivities.includes(item.activity) ? '#A374FF' : undefined })), endNode];
    const edges = [
        ...startEdges,
        ...calculatedData.reduce((acc, item) => {
            return [
                ...acc,
                ...item.dependencies.map(dep => ({ from: dep, to: item.activity })),
            ];
        }, []),
        ...endEdges,
        ...criticalPathEdges,
        ...additionalHighlightedEdges,
    ];
    
    const options = {
        layout: {
          hierarchical: false,
        },
        edges: {
          color: isDark ? "#fafaf6" : "#1d1d1f",
        },
        height: graphHeight,
        nodes: {
            color: '#b5bbc4',
            font: {
                color: '#1d1d1f',
            },
            shape: 'box',
        },
    };

    const graph = {
        nodes: nodes,
        edges: edges,
    };
  
    return (
        <>
            <Graph
                graph={graph}
                options={options}
                events={{ click: handleNodeClick}}
            />
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {isModalOpen && 
                <CpmDetailsModal data={selectedData} closeModal={closeModal}/>
            }
            </AnimatePresence>
        </>
    )
}

export default CpmDiagram;