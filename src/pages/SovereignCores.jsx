import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// --- PLATFORM TECHNICAL DATA DEFINITIONS ---
const PLATFORMS = {
  jlr: {
    id: "PLT_01_JLR",
    name: "JAGUAR LAND ROVER",
    accent: "#007BFF", // Precision Blue
    bgGlow: "rgba(0,123,255,0.15)",
    systemGroup: "D7u / MLA / PTA / D8 [1]",
    telemetryCode: "SYS_STATUS: JLR_PATHFINDER_CONNECTED // DOIP_ACTIVE",
    analysisTitle: "INGENIUM Timing & Phase-Angle Dev",
    analysisText: "AJ200D engines suffer from rapid timing chain elongation due to fuel dilution of engine oil from aborted DPF regenerations [6]. This drops hydraulic chain tensioner pressure and degrades plastic guides.",
    protocolText: "By mapping the phase difference between Camshaft and Crankshaft position sensors via a digital oscilloscope, we detect stretch down to the microsecond level, preventing catastrophic piston-to-valve contact [10].",
    waveformFreq: 3,
    waveformNoise: 1,
    formSpecs: {
      engineCodePlaceholder: "e.g., AJ200D / 2018",
      defaultCodes: "P0016 (Crank/Cam Correlation), C1A13 (Suspension Venting)"
    }
  },
  bmw: {
    id: "PLT_02_BMW",
    name: "BMW & MINI",
    accent: "#FF4500", // Safety Orange
    bgGlow: "rgba(255,69,0,0.15)",
    systemGroup: "Gen 2 Prince / Gen 3 Modular Platforms",
    telemetryCode: "SYS_STATUS: ISTA_INTEGRITY_VERIFIED // ICOM_ACTIVE [20]",
    analysisTitle: "B38/B48 VANOS Hydraulic Pressures",
    analysisText: "Gen 3 modular engines frequently suffer from VANOS central valve bolt wear, leading to plastic mesh degradation that blocks the oil supply holes to the hydraulic actuators [15].",
    protocolText: "We run real-time oil pressure logging of the solenoids using the BMW ISTA+ interface rather than running simple software adaptation resets on worn hardware, protecting the valve assembly [16].",
    waveformFreq: 5,
    waveformNoise: 2,
    formSpecs: {
      engineCodePlaceholder: "e.g., B48 / 2017",
      defaultCodes: "P0191 (Rail Pressure Circuit), B48 VANOS Deviation"
    }
  },
  vag: {
    id: "PLT_03_VAG",
    name: "AUDI & VAG",
    accent: "#00E5FF", // Neon Cyan
    bgGlow: "rgba(0,229,255,0.15)",
    systemGroup: "EA888 / DL501 / Haldex Gen 4 & 5",
    telemetryCode: "SYS_STATUS: ODIS_ONLINE_GRP // GEKO_AUTHENTICATED [41]",
    analysisTitle: "EA888 Direct Injection Carbon & Thermals",
    analysisText: "EA888 composite water pump modules warp across thermal cycles [24]. Simultaneously, direct-injection (FSI) bypasses intake ports, baking oil vapors onto valve stems, restricting volumetric flow [27].",
    protocolText: "We perform non-destructive intake manifold valve restoration via walnut blasting [28]. S-Tronic/ZF8 transmission service levels are set precisely within the mandatory 30°C to 50°C window to prevent fluid foaming [33].",
    waveformFreq: 2,
    waveformNoise: 0,
    formSpecs: {
      engineCodePlaceholder: "e.g., EA888 Gen 3 / 2019",
      defaultCodes: "16668 (Haldex Pump Starvation), Component Protection Active"
    }
  }
};

export default function SovereignCores() {
  const [activeTab, setActiveTab] = useState('jlr');
  const [sineFrequency, setSineFrequency] = useState(3);
  const [noiseLevel, setNoiseLevel] = useState(1);

  // Form states
  const [engineCode, setEngineCode] = useState('');
  const [mileage, setMileage] = useState('');
  const [oilInterval, setOilInterval] = useState('');
  const [debrisStatus, setDebrisStatus] = useState('Unverified');
  const [formStatus, setFormStatus] = useState('SUBMIT TELEMETRY DATA');

  // Sync default wave settings when active tab changes
  useEffect(() => {
    setSineFrequency(PLATFORMS[activeTab].waveformFreq);
    setNoiseLevel(PLATFORMS[activeTab].waveformNoise);
  }, [activeTab]);

  const generateWavePath = () => {
    let points = [];
    const width = 600;
    const height = 120;
    const midY = height / 2;
    for (let x = 0; x <= width; x += 2) {
      const angle = (x / width) * Math.PI * 2 * sineFrequency;
      let y = midY + Math.sin(angle) * 35;
      if (noiseLevel > 0) {
        y += Math.sin(x * 12) * (noiseLevel * 4);
      }
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('TRANSMITTING TELEMETRY...');

    const templateParams = {
      engine_code: engineCode || "Not Specified",
      mileage: mileage || "Not Specified",
      oil_interval: oilInterval || "Not Specified",
      debris: debrisStatus,
      platform: PLATFORMS[activeTab].name,
      urgency_flag: debrisStatus === 'Yes' ? 'CRITICAL - EMERGENCY' : 'Standard'
    };

    emailjs.send('service_q31xrit', 'template_0wyha4j', templateParams, 'FrmJMuq1qfwiBbp_Y')
      .then(() => {
        setFormStatus('TELEMETRY SECURELY RECEIVED');
        setTimeout(() => {
          setEngineCode('');
          setMileage('');
          setOilInterval('');
          setDebrisStatus('Unverified');
          setFormStatus('SUBMIT TELEMETRY DATA');
        }, 5000);
      })
      .catch((err) => {
        console.error("FAILED TO TRANSMIT:", err);
        setFormStatus('TRANSMISSION ERROR - RETRYING');
        setTimeout(() => setFormStatus('SUBMIT TELEMETRY DATA'), 3000);
      });
  };

  const currentPlatform = PLATFORMS[activeTab];

  return (
    <div className="terminal-page-wrapper">
      <Helmet>
        <title>Sovereign Diagnostics Console | Apex Tribology</title>
        <meta name="description" content="Precision deep-dive vehicle diagnostic modules for Land Rover, BMW, Mini, and Audi VAG platforms." />
      </Helmet>

      {/* --- EMBEDDED DYNAMIC VANILLA CSS BLOCK --- */}
      <style>{`
        .terminal-page-wrapper {
          background-color: #111111;
          color: #E0E0E0;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          font-size: 15px;
          line-height: 1.6;
        }

        .terminal-mono {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
        }

        /* --- Hero Section --- */
        .terminal-hero {
          position: relative;
          padding: 6rem 2rem 5rem 2rem;
          text-align: center;
          background-image: linear-gradient(rgba(17,17,17,0.9), rgba(17,17,17,0.95)), url('https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=1920&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          border-b: 1px solid #333;
        }

        .hero-banner-title {
          font-size: 2.8rem;
          font-weight: 950;
          letter-spacing: -0.5px;
          line-height: 1.1;
          margin-bottom: 1.2rem;
          text-transform: uppercase;
        }

        .hero-banner-title span {
          color: #888888;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 300;
          font-size: 1.8rem;
          display: block;
          margin-top: 0.5rem;
        }

        .hero-banner-description {
          color: #A0A0A0;
          max-width: 700px;
          margin: 0 auto;
          font-size: 1rem;
        }

        /* --- Layout Container --- */
        .terminal-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        /* --- Header controls --- */
        .matrix-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #2B2B2B;
          padding-bottom: 1.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .matrix-title-group h2 {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin: 0.25rem 0 0 0;
          color: #FFFFFF;
          font-family: 'JetBrains Mono', monospace;
        }

        .matrix-title-group span {
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: #666666;
          font-family: 'JetBrains Mono', monospace;
        }

        /* --- Tab Controllers --- */
        .tab-button-cluster {
          display: flex;
          background-color: #161616;
          border: 1px solid #333333;
          padding: 0.4rem;
          gap: 0.4rem;
          border-radius: 4px;
        }

        .tab-button {
          background: transparent;
          border: none;
          color: #888888;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 0.8rem 1.8rem;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'JetBrains Mono', monospace;
        }

        /* --- Main Device Console Frame --- */
        .console-frame {
          background-color: #151515;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 2.5rem;
          position: relative;
          transition: all 0.5s ease;
        }

        .node-badge {
          position: absolute;
          top: 0;
          right: 3rem;
          transform: translateY(-50%);
          background-color: #111111;
          font-size: 0.7rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          letter-spacing: 2px;
          padding: 0.4rem 1rem;
          border-radius: 4px;
          border: 1px solid #333;
        }

        .console-telemetry-status {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #282828;
          padding-bottom: 1.2rem;
          margin-bottom: 2rem;
          font-size: 0.75rem;
          color: #666666;
          font-family: 'JetBrains Mono', monospace;
        }

        /* --- Grid structure --- */
        .console-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 1024px) {
          .console-grid {
            grid-template-columns: 1fr;
          }
        }

        /* --- Engineering Info Block --- */
        .engineering-pane {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .pane-meta {
          font-size: 0.7rem;
          letter-spacing: 2px;
          color: #A0A0A0;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
        }

        .pane-title {
          font-size: 1.8rem;
          color: #FFFFFF;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .pane-text {
          font-size: 0.95rem;
          color: #A0A0A0;
          margin-bottom: 1rem;
        }

        .pane-protocol {
          font-size: 0.9rem;
          color: #C0C0C0;
          padding-left: 1.2rem;
        }

        /* --- Oscilloscope Screen --- */
        .oscilloscope-card {
          background-color: #111111;
          border: 1px solid #2B2B2B;
          padding: 1.5rem;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
        }

        .osc-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: #555555;
          margin-bottom: 1rem;
        }

        .osc-streaming-indicator {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: bold;
        }

        .indicator-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: streamPulse 1.2s infinite;
        }

        @keyframes streamPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.3; }
          100% { transform: scale(1); opacity: 1; }
        }

        .osc-grid-bezel {
          background-color: #000000;
          height: 140px;
          border: 1px solid #222222;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .osc-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 40px 20px;
          pointer-events: none;
        }

        /* --- Range Sliders --- */
        .osc-controls-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1.2rem;
          border-top: 1px solid #222222;
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: #888888;
        }

        .custom-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          background-color: #222222;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          cursor: pointer;
          background-color: #FFFFFF;
          transition: background-color 0.2s;
        }

        .custom-slider::-webkit-slider-thumb:hover {
          background-color: #E0E0E0;
        }

        /* --- Secure Intake Form --- */
        .intake-card {
          background-color: #111111;
          border: 1px solid #2B2B2B;
          padding: 2rem;
          border-radius: 6px;
        }

        .intake-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          color: #888888;
          border-bottom: 1px solid #222;
          padding-bottom: 0.8rem;
          margin-bottom: 2rem;
        }

        .intake-group {
          margin-bottom: 1.8rem;
        }

        .intake-group label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: #A0A0A0;
          letter-spacing: 1.5px;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
        }

        .intake-input {
          width: 100%;
          background-color: #1A1A1A;
          border: 1px solid #333333;
          color: #FFFFFF;
          font-size: 0.85rem;
          padding: 0.9rem 1.2rem;
          font-family: 'JetBrains Mono', monospace;
          border-radius: 4px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .intake-input:focus {
          border-color: #FFFFFF !important;
        }

        /* --- Custom Buttons --- */
        .intake-radio-cluster {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
        }

        .radio-button {
          background: transparent;
          border: 1px solid #333333;
          padding: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: bold;
          color: #888888;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        /* --- Submit Button --- */
        .submit-btn {
          width: 100%;
          border: 1px solid transparent;
          padding: 1.2rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes emergencyPulse {
          0% { box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
          50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.6); }
          100% { box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
        }

        /* --- Footer --- */
        .terminal-footer {
          border-top: 1px solid #333333;
          margin-top: 6rem;
          background-color: #0F0F0F;
          padding: 3rem 2rem;
        }

        .footer-flex {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-left {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #666666;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .footer-links a {
          color: #888888;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #FFFFFF;
        }

        .dashboard-return-banner {
          background-color: #1a1a1a;
          border-bottom: 1px solid #333;
          padding: 0.8rem 2.5rem;
          font-size: 0.75rem;
          color: #007BFF;
          display: flex;
          justify-content: space-between;
        }
        
        .dashboard-return-banner a {
          color: #007BFF;
          text-decoration: none;
          font-weight: bold;
        }

        .dashboard-return-banner a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Return back to Diagnostic Hub */}
      <div className="dashboard-return-banner font-mono">
        <span>SYS.STATUS: DEEP_DIVE_PLATFORM_CORES // ENGINE_TELEMETRY</span>
        <Link to="/">&lt;-- BACK TO GENERAL DIAGNOSTIC HUB</Link>
      </div>

      {/* --- HERO BRAND SPLASH --- */}
      <section className="terminal-hero">
        <div className="hero-banner-title font-mono">
          [ SOVEREIGN BRAND CORES ]
          <span>DEEP DIVE PLATFORM OPERATIONS</span>
        </div>
        <p className="hero-banner-description font-mono">
          Live TOPIx, ISTA+, and ODIS developer configuration streams. Compare in-cylinder readings and mechanical timing deviations in microsecond loops on-island [1, 2].
        </p>
      </section>

      {/* --- CORE TAB CONTROLLER INTERFACE --- */}
      <div className="terminal-container">
        
        {/* Step 1: Technical Mode Selector Tabs */}
        <div className="matrix-header">
          <div className="matrix-title-group">
            <span>// Platform Core Intercept</span>
            <h2>CHASSIS INTERCEPT MODULE</h2>
          </div>

          {/* Tab controllers */}
          <div className="tab-button-cluster">
            {Object.keys(PLATFORMS).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="tab-button"
                style={{
                  backgroundColor: activeTab === key ? PLATFORMS[key].accent : 'transparent',
                  color: activeTab === key ? '#000000' : '#888888',
                  boxShadow: activeTab === key ? `0 0 15px ${PLATFORMS[key].bgGlow}` : 'none'
                }}
              >
                {PLATFORMS[key].name.split(' & ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Frame container matching active selection */}
        <div 
          className="console-frame"
          style={{ borderColor: currentPlatform.accent }}
        >
          {/* Neon Active Node Indicator */}
          <div 
            className="node-badge"
            style={{ borderColor: currentPlatform.accent, color: currentPlatform.accent }}
          >
            ACTIVE NODE: {currentPlatform.id}
          </div>

          {/* Telemetry Header */}
          <div className="console-telemetry-status">
            <span>{currentPlatform.telemetryCode}</span>
            <span>{currentPlatform.systemGroup}</span>
          </div>

          {/* Grid Layout containing diagnostics and forms */}
          <div className="console-grid">
            
            {/* LEFT AREA: Engineering Data Panel */}
            <div className="engineering-pane">
              <div>
                <span className="pane-meta">// Forensic Analysis</span>
                <h3 className="pane-title">
                  {currentPlatform.analysisTitle}
                </h3>
                <p className="pane-text">
                  {currentPlatform.analysisText}
                </p>
                <p className="pane-protocol" style={{ borderLeft: `2px solid ${currentPlatform.accent}` }}>
                  {currentPlatform.protocolText}
                </p>
              </div>

              {/* Dynamic Simulated Oscilloscope Monitor */}
              <div className="oscilloscope-card">
                <div className="osc-header">
                  <span>LIVE SIGNAL PROFILE // CH_A</span>
                  <span className="osc-streaming-indicator" style={{ color: currentPlatform.accent }}>
                    <span className="indicator-pulse-dot" style={{ backgroundColor: currentPlatform.accent }}></span>
                    STREAMING
                  </span>
                </div>

                <div className="osc-grid-bezel">
                  <div className="osc-lines"></div>
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none" style={{ position: 'relative', zIndex: 2 }}>
                    <path d={generateWavePath()} fill="none" stroke={currentPlatform.accent} strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Oscilloscope Controls */}
                <div className="osc-controls-row">
                  <div className="slider-group">
                    <div className="slider-header">
                      <span>FREQUENCY SCALE</span>
                      <span style={{ color: currentPlatform.accent }}>{sineFrequency} GHz</span>
                    </div>
                    <input 
                      type="range" min="1" max="8" value={sineFrequency} 
                      onChange={(e) => setSineFrequency(parseInt(e.target.value))}
                      className="custom-slider"
                      style={{ accentColor: currentPlatform.accent }}
                    />
                  </div>
                  <div className="slider-group">
                    <div className="slider-header">
                      <span>SIGNAL HARMONIC NOISE</span>
                      <span style={{ color: currentPlatform.accent }}>{noiseLevel === 0 ? "FILTERED" : `LVL ${noiseLevel}`}</span>
                    </div>
                    <input 
                      type="range" min="0" max="3" value={noiseLevel} 
                      onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                      className="custom-slider"
                      style={{ accentColor: currentPlatform.accent }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT AREA: Sleek Custom Telemetry Intake Form */}
            <div className="intake-card">
              <div className="intake-header">
                <span>INTAKE REGISTER</span>
                <span style={{ color: currentPlatform.accent }}>[ SECURE PORTAL ]</span>
              </div>

              <form onSubmit={handleFormSubmit}>
                {/* Engine Code */}
                <div className="intake-group">
                  <label>ENGINE CODE / YEAR MODEL</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={currentPlatform.formSpecs.engineCodePlaceholder}
                    value={engineCode} 
                    onChange={(e) => setEngineCode(e.target.value)}
                    className="intake-input"
                  />
                </div>

                {/* Mileage */}
                <div className="intake-group">
                  <label>VEHICLE MILEAGE</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., 85,000 miles"
                    value={mileage} 
                    onChange={(e) => setMileage(e.target.value)}
                    className="intake-input"
                  />
                </div>

                {/* Oil Change Interval */}
                <div className="intake-group">
                  <label>LAST KNOWN OIL CHANGE INTERVAL</label>
                  <select 
                    required 
                    value={oilInterval} 
                    onChange={(e) => setOilInterval(e.target.value)}
                    className="intake-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" disabled className="text-gray-500">Select Interval...</option>
                    <option value="Under 6,000 miles">Under 6,000 miles (Optimal) [10]</option>
                    <option value="6,000 - 10,000 miles">6,000 - 10,000 miles (Acceptable)</option>
                    <option value="Over 10,000 miles">Over 10,000 miles (Risk Zone) [19]</option>
                  </select>
                </div>

                {/* Metallic Debris Option */}
                <div className="intake-group">
                  <label>PRESENCE OF METALLIC DEBRIS IN OIL FILTER?</label>
                  <div className="intake-radio-cluster">
                    {['Yes', 'No', 'Unverified'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setDebrisStatus(status)}
                        className="radio-button"
                        style={{
                          backgroundColor: debrisStatus === status 
                            ? (status === 'Yes' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)') 
                            : 'transparent',
                          borderColor: debrisStatus === status 
                            ? (status === 'Yes' ? '#EF4444' : currentPlatform.accent) 
                            : '#333333',
                          color: debrisStatus === status 
                            ? (status === 'Yes' ? '#EF4444' : '#FFFFFF') 
                            : '#888888',
                          boxShadow: debrisStatus === status 
                            ? `0 0 10px ${status === 'Yes' ? 'rgba(239,68,68,0.3)' : currentPlatform.bgGlow}` 
                            : 'none'
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={formStatus.includes('SECURELY')}
                  className="submit-btn"
                  style={{
                    backgroundColor: debrisStatus === 'Yes' ? '#EF4444' : currentPlatform.accent,
                    borderColor: debrisStatus === 'Yes' ? '#EF4444' : currentPlatform.accent,
                    color: '#000000',
                    boxShadow: debrisStatus === 'Yes' 
                      ? '0 0 20px rgba(239,68,68,0.25)' 
                      : `0 0 20px ${currentPlatform.bgGlow}`,
                    animation: debrisStatus === 'Yes' ? 'emergencyPulse 2s infinite' : 'none'
                  }}
                >
                  {debrisStatus === 'Yes' && formStatus === 'SUBMIT TELEMETRY DATA' 
                    ? 'EMERGENCY: REQUEST LOCK-IN ORDER' 
                    : formStatus}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER LINK MODULES */}
      <footer className="terminal-footer">
        <div className="footer-flex">
          <div className="footer-left">
            APEX TRIBOLOGY // SOVEREIGN ENGINE OPERATIONS
          </div>
          <div className="footer-links">
            <a href="/case-studies/tdv6-crankshaft-failure">
              [ 306DT Technical Dossier ]
            </a>
            <span style={{ color: '#333' }}>|</span>
            <span style={{ color: '#666' }}>Isle of Wight Sovereign Hub</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
