import React, { useState } from 'react';
import { Atom, FlaskConical, Calculator, BookOpen, Menu } from 'lucide-react';
import PeriodicTable from './components/PeriodicTable';
import CalculatorDisplay from './components/CalculatorDisplay';
import FormulaSolver from './components/FormulaSolver';
import ConstantsSidebar from './components/ConstantsSidebar';
import MolarMassCalculator from './components/MolarMassCalculator';

function App() {
  const [activeView, setActiveView] = useState('calculator'); // calculator, formula, molarmass
  const [calculatorValue, setCalculatorValue] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');

  const handleElementClick = (element) => {
    // Logic to insert atomic mass
    setCalculatorValue(prev => prev + element.atomic_mass);
  };

  const handleConstantClick = (constant) => {
    setCalculatorValue(prev => prev + constant.value);
  };

  return (
    <div className="min-h-screen bg-deep-navy text-white font-sans selection:bg-neon-cyan selection:text-black overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-neon-cyan/30 bg-glass-panel flex items-center justify-between px-6 z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Atom className="w-8 h-8 text-neon-cyan animate-spin-slow" />
          <h1 className="text-2xl font-sci-fi tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
            ChemiCalc <span className="text-xs text-gray-400 font-mono">v1.0</span>
          </h1>
        </div>

        <nav className="flex gap-4">
          <button
            onClick={() => setActiveView('calculator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-mono text-sm ${activeView === 'calculator' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-neon-cyan' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <Calculator className="w-4 h-4" /> CALCULATOR
          </button>
          <button
            onClick={() => setActiveView('formula')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-mono text-sm ${activeView === 'formula' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-neon-cyan' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <BookOpen className="w-4 h-4" /> FORMULAS
          </button>
          <button
            onClick={() => setActiveView('molarmass')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-mono text-sm ${activeView === 'molarmass' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-neon-cyan' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <FlaskConical className="w-4 h-4" /> MOLAR MASS
          </button>
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">

        {/* Left Sidebar: Constants */}
        <div className="col-span-2 h-full overflow-y-auto custom-scrollbar">
          <ConstantsSidebar onConstantClick={handleConstantClick} />
        </div>

        {/* Center: Main Workspace */}
        <div className="col-span-7 flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar">
          {activeView === 'calculator' && (
            <>
              <CalculatorDisplay value={calculatorValue} result={calculatorResult} />
              <div className="flex-1">
                <PeriodicTable onElementClick={handleElementClick} />
              </div>
            </>
          )}

          {activeView === 'formula' && <FormulaSolver />}

          {activeView === 'molarmass' && <MolarMassCalculator />}
        </div>

        {/* Right Sidebar: History / Details (Placeholder for now, maybe expand Periodic Table details here) */}
        <div className="col-span-3 h-full sci-fi-border p-4">
          <h3 className="text-neon-green font-sci-fi mb-4 text-sm">SYSTEM STATUS</h3>
          <div className="space-y-2 font-mono text-xs text-gray-400">
            <div className="flex justify-between">
              <span>CORE TEMP</span>
              <span className="text-neon-cyan">34°C</span>
            </div>
            <div className="flex justify-between">
              <span>MEMORY</span>
              <span className="text-neon-cyan">12%</span>
            </div>
            <div className="h-px bg-gray-700 my-2"></div>
            <p>Waiting for input...</p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
