import React, { useState } from 'react';
import { elements, categories } from '../data/elements';

const PeriodicTable = ({ onElementClick }) => {
    const [hoveredElement, setHoveredElement] = useState(null);

    // Helper to place elements in grid (simplified for now, just mapping)
    // In a full app, we'd use specific grid-column/row based on group/period

    return (
        <div className="sci-fi-border p-4 h-full flex flex-col relative">
            <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-2">
                <h2 className="text-neon-cyan font-sci-fi text-lg">PERIODIC TABLE</h2>
                <div className="text-xs font-mono text-gray-500">SELECT ELEMENT TO INSERT MASS</div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-10 gap-2 p-2">
                {elements.map((element) => (
                    <button
                        key={element.symbol}
                        onClick={() => onElementClick(element)}
                        onMouseEnter={() => setHoveredElement(element)}
                        onMouseLeave={() => setHoveredElement(null)}
                        className={`
              relative aspect-square flex flex-col items-center justify-center 
              border transition-all duration-200 hover:scale-110 hover:z-10
              ${categories[element.category] || 'bg-gray-800/20 border-gray-700 text-gray-400'}
            `}
                    >
                        <span className="text-[0.6rem] absolute top-1 left-1 opacity-70">{element.number}</span>
                        <span className="text-lg font-bold font-sci-fi">{element.symbol}</span>
                        <span className="text-[0.55rem] absolute bottom-1 opacity-70">{element.mass.toFixed(2)}</span>
                    </button>
                ))}
            </div>

            {/* Info Panel / Tooltip Area */}
            <div className="mt-4 h-24 sci-fi-border p-3 bg-black/40 flex items-center gap-4">
                {hoveredElement ? (
                    <>
                        <div className={`w-16 h-16 flex items-center justify-center text-3xl font-bold border-2 ${categories[hoveredElement.category]}`}>
                            {hoveredElement.symbol}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-neon-green font-sci-fi text-lg">{hoveredElement.name}</h3>
                            <div className="grid grid-cols-2 gap-x-4 text-xs font-mono text-gray-300">
                                <div>Atomic Mass: <span className="text-white">{hoveredElement.mass}</span></div>
                                <div>Atomic Number: <span className="text-white">{hoveredElement.number}</span></div>
                                <div>Group: <span className="text-white">{hoveredElement.group}</span></div>
                                <div>Period: <span className="text-white">{hoveredElement.period}</span></div>
                                <div className="col-span-2 text-gray-500 capitalize">{hoveredElement.category}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-600 font-mono text-sm flex items-center justify-center w-full h-full">
                        HOVER OVER AN ELEMENT FOR DETAILS
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeriodicTable;
