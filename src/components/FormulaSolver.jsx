import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import * as math from 'mathjs';

const formulas = [
    {
        id: 'boyles',
        name: "Boyle's Law",
        formula: 'P1 * V1 = P2 * V2',
        inputs: [
            { id: 'p1', label: 'Initial Pressure (P1)', unit: 'atm' },
            { id: 'v1', label: 'Initial Volume (V1)', unit: 'L' },
            { id: 'p2', label: 'Final Pressure (P2)', unit: 'atm' },
            { id: 'v2', label: 'Final Volume (V2)', unit: 'L' },
        ],
        solveFor: ['p1', 'v1', 'p2', 'v2']
    },
    {
        id: 'charles',
        name: "Charles's Law",
        formula: 'V1 / T1 = V2 / T2',
        inputs: [
            { id: 'v1', label: 'Initial Volume (V1)', unit: 'L' },
            { id: 't1', label: 'Initial Temp (T1)', unit: 'K' },
            { id: 'v2', label: 'Final Volume (V2)', unit: 'L' },
            { id: 't2', label: 'Final Temp (T2)', unit: 'K' },
        ],
        solveFor: ['v1', 't1', 'v2', 't2']
    },
    {
        id: 'ideal_gas',
        name: "Ideal Gas Law",
        formula: 'PV = nRT',
        inputs: [
            { id: 'p', label: 'Pressure (P)', unit: 'atm' },
            { id: 'v', label: 'Volume (V)', unit: 'L' },
            { id: 'n', label: 'Moles (n)', unit: 'mol' },
            { id: 't', label: 'Temperature (T)', unit: 'K' },
        ],
        solveFor: ['p', 'v', 'n', 't'] // R is constant
    },
    {
        id: 'molarity',
        name: "Molarity",
        formula: 'M = n / V',
        inputs: [
            { id: 'm', label: 'Molarity (M)', unit: 'mol/L' },
            { id: 'n', label: 'Moles (n)', unit: 'mol' },
            { id: 'v', label: 'Volume (V)', unit: 'L' },
        ],
        solveFor: ['m', 'n', 'v']
    }
];

const FormulaSolver = () => {
    const [selectedFormula, setSelectedFormula] = useState(formulas[0]);
    const [targetVariable, setTargetVariable] = useState(formulas[0].solveFor[3]); // Default to last variable
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);

    // Reset inputs when formula changes
    useEffect(() => {
        setInputs({});
        setResult(null);
        setTargetVariable(selectedFormula.solveFor[selectedFormula.solveFor.length - 1]);
    }, [selectedFormula]);

    const handleInputChange = (id, value) => {
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const calculate = () => {
        try {
            let res = 0;
            const R = 0.0821; // Ideal Gas Constant L·atm/(mol·K)

            if (selectedFormula.id === 'boyles') {
                const { p1, v1, p2, v2 } = inputs;
                if (targetVariable === 'v2') res = (p1 * v1) / p2;
                if (targetVariable === 'p2') res = (p1 * v1) / v2;
                if (targetVariable === 'v1') res = (p2 * v2) / p1;
                if (targetVariable === 'p1') res = (p2 * v2) / v1;
            }
            else if (selectedFormula.id === 'charles') {
                const { v1, t1, v2, t2 } = inputs;
                if (targetVariable === 'v2') res = (v1 * t2) / t1;
                if (targetVariable === 't2') res = (v2 * t1) / v1;
                if (targetVariable === 'v1') res = (v2 * t1) / t2;
                if (targetVariable === 't1') res = (v1 * t2) / v2;
            }
            else if (selectedFormula.id === 'ideal_gas') {
                const { p, v, n, t } = inputs;
                if (targetVariable === 'p') res = (n * R * t) / v;
                if (targetVariable === 'v') res = (n * R * t) / p;
                if (targetVariable === 'n') res = (p * v) / (R * t);
                if (targetVariable === 't') res = (p * v) / (n * R);
            }
            else if (selectedFormula.id === 'molarity') {
                const { m, n, v } = inputs;
                if (targetVariable === 'm') res = n / v;
                if (targetVariable === 'n') res = m * v;
                if (targetVariable === 'v') res = n / m;
            }

            setResult(res);
        } catch (error) {
            setResult("Error");
        }
    };

    return (
        <div className="sci-fi-border p-6 h-full flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <h2 className="text-neon-cyan font-sci-fi text-xl flex items-center gap-2">
                    <Calculator className="w-5 h-5" /> FORMULA ENGINE
                </h2>
                <select
                    value={selectedFormula.id}
                    onChange={(e) => setSelectedFormula(formulas.find(f => f.id === e.target.value))}
                    className="bg-black/50 border border-neon-cyan/30 text-neon-cyan font-mono text-sm p-2 rounded focus:outline-none focus:border-neon-cyan"
                >
                    {formulas.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                </select>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-800 font-mono text-sm text-center text-gray-400">
                FORMULA: <span className="text-white text-lg ml-2">{selectedFormula.formula}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 mb-2">
                    <label className="text-xs text-gray-500 font-mono uppercase mb-1 block">Solve For</label>
                    <div className="flex gap-2">
                        {selectedFormula.solveFor.map(v => (
                            <button
                                key={v}
                                onClick={() => setTargetVariable(v)}
                                className={`px-3 py-1 text-xs font-mono border rounded transition-all ${targetVariable === v ? 'bg-neon-green/20 border-neon-green text-neon-green' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}
                            >
                                {v.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedFormula.inputs.map(input => (
                    input.id !== targetVariable && (
                        <div key={input.id} className="flex flex-col gap-1">
                            <label className="text-xs text-neon-cyan/70 font-mono">{input.label}</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={inputs[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    className="w-full bg-black/30 border border-gray-700 text-white p-2 font-mono focus:border-neon-cyan focus:outline-none transition-colors"
                                    placeholder="0"
                                />
                                <span className="absolute right-2 top-2 text-gray-500 text-xs">{input.unit}</span>
                            </div>
                        </div>
                    )
                ))}
            </div>

            <div className="mt-auto flex items-center justify-between bg-black/40 p-4 border border-gray-800">
                <button
                    onClick={calculate}
                    className="bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 px-6 py-3 font-sci-fi tracking-wider transition-all flex items-center gap-2 group"
                >
                    CALCULATE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono mb-1">RESULT ({targetVariable.toUpperCase()})</div>
                    <div className="text-3xl text-neon-green font-sci-fi neon-text-green">
                        {result !== null ? (typeof result === 'number' ? result.toFixed(4) : result) : '---'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormulaSolver;
