import React, { useState } from 'react';
import { FlaskConical, Search } from 'lucide-react';
import { elements } from '../data/elements';

const MolarMassCalculator = () => {
    const [formula, setFormula] = useState('');
    const [result, setResult] = useState(null);
    const [breakdown, setBreakdown] = useState([]);
    const [error, setError] = useState('');

    const calculateMolarMass = () => {
        setError('');
        setResult(null);
        setBreakdown([]);

        if (!formula) return;

        try {
            // Simple parser logic
            // Regex to match Element (Capital followed by optional lowercase) and optional Number
            const regex = /([A-Z][a-z]*)(\d*)/g;
            let match;
            let totalMass = 0;
            const tempBreakdown = [];

            // Check if the formula string is valid (contains only letters and numbers)
            if (!/^[A-Za-z0-9]+$/.test(formula)) {
                throw new Error("Invalid characters in formula");
            }

            let parsedFormula = formula;
            // Handle parenthesis groups would be complex, skipping for this basic version or implementing simple expansion if needed.
            // For now, let's stick to simple linear formulas like H2SO4, C6H12O6.

            while ((match = regex.exec(formula)) !== null) {
                const symbol = match[1];
                const count = match[2] ? parseInt(match[2]) : 1;

                const element = elements.find(e => e.symbol === symbol);

                if (!element) {
                    throw new Error(`Unknown element: ${symbol}`);
                }

                const massContribution = element.mass * count;
                totalMass += massContribution;

                tempBreakdown.push({
                    element,
                    count,
                    total: massContribution
                });
            }

            if (tempBreakdown.length === 0) {
                throw new Error("No elements found");
            }

            setResult(totalMass);
            setBreakdown(tempBreakdown);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="sci-fi-border p-6 h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <FlaskConical className="w-12 h-12 text-neon-cyan mx-auto mb-4 animate-pulse" />
                    <h2 className="text-2xl font-sci-fi text-white mb-2">MOLAR MASS CALCULATOR</h2>
                    <p className="text-gray-400 text-sm font-mono">ENTER CHEMICAL FORMULA (e.g., H2SO4)</p>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && calculateMolarMass()}
                        placeholder="Enter Formula..."
                        className="w-full bg-black/50 border-2 border-gray-700 text-white p-4 pl-12 rounded-lg font-mono text-xl focus:border-neon-cyan focus:outline-none transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
                </div>

                <button
                    onClick={calculateMolarMass}
                    className="w-full bg-neon-cyan text-black font-bold font-sci-fi py-3 rounded hover:bg-white transition-colors mb-8 shadow-neon-cyan"
                >
                    CALCULATE MASS
                </button>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded text-center font-mono text-sm">
                        ERROR: {error}
                    </div>
                )}

                {result !== null && (
                    <div className="bg-black/40 border border-neon-green/30 p-6 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-4">
                            <div className="text-gray-400 text-xs font-mono uppercase mb-1">Total Molar Mass</div>
                            <div className="text-4xl font-sci-fi text-neon-green neon-text-green">
                                {result.toFixed(4)} <span className="text-lg text-gray-500">g/mol</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {breakdown.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-800 pb-2 last:border-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white w-6">{item.element.symbol}</span>
                                        <span className="text-gray-500">x{item.count}</span>
                                    </div>
                                    <div className="font-mono text-neon-cyan">
                                        {item.total.toFixed(3)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MolarMassCalculator;
