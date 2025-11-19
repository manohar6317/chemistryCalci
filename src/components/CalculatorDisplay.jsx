import React from 'react';

const CalculatorDisplay = ({ value, result }) => {
    return (
        <div className="sci-fi-border p-6 mb-4 flex flex-col items-end justify-center bg-black/40 relative overflow-hidden group">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 pointer-events-none"></div>

            {/* Label */}
            <div className="text-neon-cyan/50 text-xs font-mono mb-2 tracking-widest uppercase flex w-full justify-between">
                <span>Active Input</span>
                <span className="animate-pulse">● LIVE</span>
            </div>

            {/* Input Value */}
            <div className="text-white text-3xl font-mono mb-2 break-all text-right w-full min-h-[2.5rem] z-10">
                {value || <span className="text-gray-700">_</span>}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent my-2"></div>

            {/* Result Value */}
            <div className="text-neon-green text-5xl font-sci-fi text-right w-full z-10 neon-text-green tracking-wider">
                {result || '0'}
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan"></div>
        </div>
    );
};

export default CalculatorDisplay;
