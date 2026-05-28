import React, { useState } from 'react';

const FAULT_NODES = [
  {
    id: "NODE_A",
    title: "Combustion & Ignition Pathologies",
    symptoms: "Intermittent misfires, cold-start stumbling, loss of power under high load.",
    protocol: "Perform dynamic compression testing, map high-voltage ignition secondary coil charging waveform, and track high-frequency fuel pressure transducer decay rates.",
    telemetry: [
      "CYL_1_MISFIRE_COUNT: 42 // THRESHOLD_EXCEEDED",
      "FUEL_RAIL_PRESSURE: 145.4 BAR (REF: 150 BAR)",
      "IGNITION_COIL_DWELL_TIME: 1.82 ms // UNSTABLE",
      "HYDRODYNAMIC_FILM_VAL: SECURE // SHEAR_RISK: LOW"
    ],
    accent: "#FF4500", // Safety Orange
    bgGlow: "rgba(255, 69, 0, 0.08)"
  },
  {
    id: "NODE_B",
    title: "Charged Air & Induction Leaks",
    symptoms: "Unmetered air warnings, 'Boost Limit Exceeded' faults, lean running adaptation limits.",
    protocol: "Execute high-density ultrasonic smoke profiling, vacuum decay tracking, and apply dynamic pressure differential maps to isolate hairline composite manifold fractures.",
    telemetry: [
      "MASS_AIR_FLOW_TELEMETRY: 4.22 g/s (IDLE)",
      "BOOST_DEVIATION_DELTA: -0.34 BAR // UNDERBOOST",
      "PCV_INTEGRITY_VACUUM: 12.1 mbar // MIN_LIMIT_REACHED",
      "CHARGE_AIR_TEMP: 48.5 °C (REF: 35.0 °C)"
    ],
    accent: "#007BFF", // Precision Blue
    bgGlow: "rgba(0, 123, 255, 0.08)"
  },
  {
    id: "NODE_C",
    title: "CAN Bus & Electrical Networks",
    symptoms: "Intermittent safety module dropouts, instrument cluster warnings, network packet loss.",
    protocol: "Perform voltage drop sweep across primary chassis ground points under 60A load. Measure physical layer CAN-Hi / CAN-Lo signaling profiles with a PicoScope.",
    telemetry: [
      "CAN_HIGH_PHYSICAL_VOLT: 2.62V // VERIFIED",
      "CAN_LOW_PHYSICAL_VOLT: 2.38V // VERIFIED",
      "CHASSIS_GROUND_REF_DROP: 45.2 mV // WARNING: HIGH",
      "BUS_PACKET_ERROR_RATE: 0.003% // COMPLIANT"
    ],
    accent: "#00E5FF", // Neon Cyan
    bgGlow: "rgba(0, 229, 255, 0.08)"
  },
  {
    id: "NODE_D",
    title: "Thermal Dynamics & Fluid Seepage",
    symptoms: "Coolant loss without external pooling, cooling fan continuous cycle, cylinder wall staining.",
    protocol: "Apply ultraviolet fluorescent dye tracer, profile cooling circuit thermal pressure cycles, and run fiber-optic endoscopic combustion chamber inspection.",
    telemetry: [
      "COOLANT_TEMP_GRADIENT: +12.4 °C/min // OVERHEAT_WARN",
      "COOLING_LOOP_PRESSURE: 1.28 BAR // VERIFIED_LEAK",
      "ENDOSCOPIC_CYL_2_STAIN: ACTIVE_SWEET_SMELL",
      "EXPANSION_TANK_SEALING: 100% // SEAL_OK"
    ],
    accent: "#39FF14", // Neon Green
    bgGlow: "rgba(57, 255, 20, 0.08)"
  }
];

export default function GeneralFaultMatrix() {
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const activeNode = FAULT_NODES[activeNodeIdx];

  return (
    <div className="fault-matrix-container">
      {/* Scope-contained custom styling to avoid global CSS bugs */}
      <style>{`
        .fault-matrix-container {
          background-color: #111111;
          border: 1px solid #333333;
          border-radius: 8px;
          padding: 2rem;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          color: #E0E0E0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          margin-bottom: 3rem;
        }

        .matrix-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2.5rem;
        }

        @media (max-width: 900px) {
          .matrix-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* --- Left Column: Buttons --- */
        .node-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .node-selector-btn {
          background-color: #161616;
          border: 1px solid #2A2A2A;
          border-radius: 4px;
          padding: 1.2rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #888888;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .node-selector-btn:hover {
          border-color: #555;
          color: #FFFFFF;
        }

        .node-btn-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          background-color: #333333;
        }

        .node-btn-title {
          font-size: 0.85rem;
          font-weight: bold;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
        }

        .node-btn-symptom {
          font-size: 0.7rem;
          line-height: 1.4;
          color: #666666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 320px;
        }

        /* --- Right Column: Terminal Panel --- */
        .terminal-display {
          background-color: #000000;
          border-width: 1px;
          border-style: solid;
          border-radius: 6px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 380px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }

        .terminal-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .terminal-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: #555555;
          border-bottom: 1px solid #222222;
          padding-bottom: 0.8rem;
          margin-bottom: 1.5rem;
          z-index: 2;
          position: relative;
        }

        .terminal-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 2;
          position: relative;
        }

        .terminal-label {
          font-size: 0.65rem;
          letter-spacing: 1.5px;
          color: #666666;
          text-transform: uppercase;
          margin-bottom: 0.3rem;
        }

        .terminal-text-primary {
          font-size: 1.1rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .terminal-text-body {
          font-size: 0.8rem;
          line-height: 1.6;
          color: #A0A0A0;
        }

        .terminal-metrics-box {
          background-color: #0A0A0A;
          border: 1px solid #222222;
          padding: 1.2rem;
          border-radius: 4px;
          margin-top: 1rem;
        }

        .metric-line {
          font-size: 0.72rem;
          line-height: 1.6;
          color: #888888;
        }
      `}</style>

      <div className="matrix-grid">
        
        {/* Left Column: Vertical Selectors */}
        <div className="node-stack">
          {FAULT_NODES.map((node, idx) => {
            const isActive = activeNodeIdx === idx;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeIdx(idx)}
                className="node-selector-btn"
                style={{
                  borderColor: isActive ? node.accent : '#2A2A2A',
                  backgroundColor: isActive ? node.bgGlow : '#161616',
                  color: isActive ? '#FFFFFF' : '#888888',
                  boxShadow: isActive ? `0 0 12px ${node.bgGlow}` : 'none'
                }}
              >
                {/* Active Indicator LED */}
                <div 
                  className="node-btn-indicator" 
                  style={{ 
                    backgroundColor: isActive ? node.accent : '#333333',
                    boxShadow: isActive ? `0 0 8px ${node.accent}` : 'none'
                  }}
                />
                
                <div>
                  <div className="node-btn-title">{node.title}</div>
                  <div className="node-btn-symptom">{node.symptoms}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Console Output Terminal */}
        <div 
          className="terminal-display"
          style={{ 
            borderColor: activeNode.accent,
            boxShadow: `0 0 20px ${activeNode.bgGlow}`
          }}
        >
          <div className="terminal-bg-grid" />
          
          <div className="terminal-header">
            <span>DIAGNOSTIC CORE SYSTEM READOUT</span>
            <span style={{ color: activeNode.accent }}>{activeNode.id} // SECURE_BUS</span>
          </div>

          <div className="terminal-content">
            {/* Title & Symptoms */}
            <div>
              <div className="terminal-label">Active Pathology</div>
              <h4 className="terminal-text-primary">{activeNode.title}</h4>
            </div>

            {/* Scientific Protocol */}
            <div>
              <div className="terminal-label">Deterministic Protocol</div>
              <p className="terminal-text-body">{activeNode.protocol}</p>
            </div>

            {/* Live Metrics */}
            <div>
              <div className="terminal-label">Simulated Live Telemetry Stream</div>
              <div className="terminal-metrics-box">
                {activeNode.telemetry.map((line, lIdx) => (
                  <div key={lIdx} className="metric-line">
                    <span style={{ color: activeNode.accent }}>&gt;</span> {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
