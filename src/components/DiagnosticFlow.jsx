import React, { useState } from 'react';

const DIAGNOSTIC_STAGES = [
  {
    step: "01",
    label: "PHYSICAL SCAN",
    status: "COMPLETE",
    description: "Systemic validation of circuit resistances, network loads, and visible physical anomalies (such as dried composite coolant marks or timing sensor clearances) [1, 24]."
  },
  {
    step: "02",
    label: "INTEGRITY SWEEP",
    status: "COMPLETE",
    description: "Capturing real-time bus signals via digital oscilloscope at up to 100MS/s to isolate transient electrical interference or ground voltage drops [10]."
  },
  {
    step: "03",
    label: "CALIBRATION TEST",
    status: "READY",
    description: "Comparing real-time telemetry from the vehicle’s ECU with factory-mapped models to measure component wear (such as timing chain stretch or solenoid wear) [7, 13]."
  },
  {
    step: "04",
    label: "DETERMINISTIC VERIFICATION",
    status: "PENDING",
    description: "Applying the target fix and clearing software adaptations. This step calibrates the system to the new parts' mechanical clearances, verifying the work is complete [16, 39]."
  }
];

export default function DiagnosticFlow({ accentColor = '#007BFF', systemName = "GENERIC_CHASSIS" }) {
  const [activeStep, setActiveStep] = useState(0);
  const [sineFrequency, setSineFrequency] = useState(2);
  const [noiseLevel, setNoiseLevel] = useState(1);

  // Generate dynamic path points based on user inputs
  const generateWaveformPath = () => {
    let points = [];
    const width = 500;
    const height = 100;
    const midY = height / 2;
    
    for (let x = 0; x <= width; x += 2) {
      // Calculate basic sine wave value
      const angle = (x / width) * Math.PI * 2 * sineFrequency;
      let y = midY + Math.sin(angle) * 35;
      
      // Inject pseudo-random noise
      if (noiseLevel > 0) {
        y += (Math.sin(x * 10) * noiseLevel * 3);
      }
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-[#111111] border border-[#4A4A4A] p-6 md:p-8 rounded-lg font-mono">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Interactive Control Dashboard */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></span>
              <span className="text-xs tracking-wider text-gray-400">CONSOLE // DIAGNOSTIC_ENGINE_{systemName}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-6">Interactive Signal & Calibration Tracker</h3>
            
            {/* Step Selection Tabs */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {DIAGNOSTIC_STAGES.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`border p-3 text-left transition-all duration-300 ${
                    activeStep === idx 
                      ? 'border-[var(--acc-col)] bg-[#1A1A1A]' 
                      : 'border-[#333] hover:border-[#666]'
                  }`}
                  style={{ '--acc-col': accentColor }}
                >
                  <div className="text-[10px] text-gray-500">STAGE {stage.step}</div>
                  <div className="text-xs font-bold text-white truncate hidden md:block">{stage.label}</div>
                </button>
              ))}
            </div>

            {/* Display Active Stage Details */}
            <div className="bg-[#1A1A1A] p-5 border border-[#333] rounded min-h-[140px] mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white font-bold">{DIAGNOSTIC_STAGES[activeStep].label}</span>
                <span className="text-[10px] px-2 py-0.5 border border-[#4A4A4A] rounded text-gray-400">
                  STATUS: {DIAGNOSTIC_STAGES[activeStep].status}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {DIAGNOSTIC_STAGES[activeStep].description}
              </p>
            </div>
          </div>

          {/* User adjustment sliders */}
          <div className="space-y-4 pt-4 border-t border-[#333]">
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>SIGNAL FREQUENCY (Hz)</span>
                <span>{sineFrequency} GHz</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={sineFrequency} 
                onChange={(e) => setSineFrequency(parseInt(e.target.value))}
                className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#888] hover:accent-white"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>SIGNAL HARMONIC NOISE</span>
                <span>{noiseLevel === 0 ? "FILTERED (0.0)" : `LEVEL ${noiseLevel}.0`}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3" 
                value={noiseLevel} 
                onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#888] hover:accent-white"
              />
            </div>
          </div>
        </div>

        {/* Right Simulated Oscilloscope Screen */}
        <div className="lg:w-1/2 flex flex-col justify-between bg-black p-4 border border-[#333] rounded-lg relative overflow-hidden">
          {/* Neon background grid overlay */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 pointer-events-none opacity-5">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="border-t border-l border-white"></div>
            ))}
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-gray-500 mb-4 z-10 relative">
              <span>OSCILLOSCOPE WAVEFORM VIEW</span>
              <span className="animate-pulse" style={{ color: accentColor }}>• TELEMETRY FEED ACTIVE</span>
            </div>

            {/* Simulated Live SVG Waveform */}
            <div className="h-44 flex items-center justify-center relative z-10">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                <path 
                  d={generateWaveformPath()} 
                  fill="none" 
                  stroke={accentColor} 
                  strokeWidth="2.5" 
                  className="transition-all duration-75"
                />
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#222] flex justify-between text-[10px] text-gray-500 z-10 relative">
            <span>COUPLING: DC</span>
            <span>V_REF: 5.0V</span>
            <span>SAMPLE: 100MS/s</span>
          </div>
        </div>

      </div>
    </div>
  );
}
