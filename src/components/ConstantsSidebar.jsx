import React from 'react';
import { Zap, Globe, Thermometer, Activity } from 'lucide-react';

const constants = [
    { name: "Avogadro's Num", symbol: 'NA', value: 6.022e23, unit: 'mol⁻¹', icon: Globe, desc: 'Particles in one mole' },
    { name: "Planck's Const", symbol: 'h', value: 6.626e-34, unit: 'J·s', icon: Zap, desc: 'Quantum of action' },
    { name: "Gas Constant", symbol: 'R', value: 0.0821, unit: 'L·atm/(mol·K)', icon: Thermometer, desc: 'Ideal gas constant' },
    { name: "Faraday Const", symbol: 'F', value: 96485, unit: 'C/mol', icon: Activity, desc: 'Charge of 1 mole of electrons' },
    { name: "Speed of Light", symbol: 'c', value: 2.998e8, unit: 'm/s', icon: Zap, desc: 'Light speed in vacuum' },
    { name: "Boltzmann Const", symbol: 'k', value: 1.38e-23, unit: 'J/K', icon: Thermometer, desc: 'Energy per temperature' },
];

const ConstantsSidebar = ({ onConstantClick }) => {
    return (
        <div className="sci-fi-border p-4 h-full flex flex-col gap-4">
            <h2 className="text-neon-cyan font-sci-fi text-sm tracking-wider border-b border-gray-800 pb-2 mb-2">
                CONSTANTS DOCK
            </h2>

            <div className="flex flex-col gap-3">
                {constants.map((constant) => (
                    <button
                        key={constant.symbol}
                        onClick={() => onConstantClick(constant)}
                        className="group relative flex items-center gap-3 p-3 bg-black/40 border border-gray-800 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all text-left"
                    >
                        <div className="p-2 bg-gray-900 rounded text-neon-cyan group-hover:text-neon-green transition-colors">
                            <constant.icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-200 text-xs truncate">{constant.name}</span>
                                <span className="text-[10px] font-mono text-gray-500">{constant.symbol}</span>
                            </div>
                            <div className="text-[10px] font-mono text-neon-cyan truncate">
                                {constant.value.toExponential(2)} {constant.unit}
                            </div>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute left-full top-0 ml-2 w-48 bg-black/90 border border-neon-cyan/30 p-2 z-50 hidden group-hover:block backdrop-blur-sm">
                            <div className="text-neon-cyan font-bold text-xs mb-1">{constant.name}</div>
                            <div className="text-gray-400 text-[10px] mb-1">{constant.desc}</div>
                            <div className="text-white font-mono text-xs">Val: {constant.value}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ConstantsSidebar;
