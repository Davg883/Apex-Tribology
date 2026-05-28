import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import GeneralFaultMatrix from './components/GeneralFaultMatrix';

export default function Home() {
  const [vehicleMakeModel, setVehicleMakeModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [oilInterval, setOilInterval] = useState('');
  const [debrisStatus, setDebrisStatus] = useState('Unverified');
  const [formStatus, setFormStatus] = useState('SUBMIT TELEMETRY DATA');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('TRANSMITTING TELEMETRY...');

    const templateParams = {
      engine_code: vehicleMakeModel || "Not Specified",
      mileage: mileage || "Not Specified",
      oil_interval: oilInterval || "Not Specified",
      debris: debrisStatus,
      platform: "General Diagnostic Hub",
      urgency_flag: debrisStatus === 'Yes' ? 'CRITICAL - EMERGENCY' : 'Standard'
    };

    emailjs.send('service_q31xrit', 'template_0wyha4j', templateParams, 'FrmJMuq1qfwiBbp_Y')
      .then(() => {
        setFormStatus('TELEMETRY SECURELY RECEIVED');
        setTimeout(() => {
          setVehicleMakeModel('');
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

  return (
    <div className="hub-page-wrapper">
      <Helmet>
        <title>Apex Tribology | General Diagnostics & Triage Hub</title>
        <meta name="description" content="Precision engineer-led vehicle diagnostic center. In-cylinder transducers, oscilloscopes, and CAN bus network troubleshooting on the Isle of Wight." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": "Apex Tribology & Performance",
            "description": "Sovereign, engineer-led diagnostic and mechanical restoration facility for Jaguar Land Rover, BMW, Mini, and Audi platforms.",
            "priceRange": "$$$",
            "areaServed": [
              {
                "@type": "AdministrativeArea",
                "name": "Isle of Wight (Ryde, Cowes, Seaview, Newport)"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Southern Coastal UK regions"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Placeholder Business Park",
              "addressLocality": "Newport",
              "addressRegion": "Isle of Wight",
              "postalCode": "PO30 1AA",
              "addressCountry": "GB"
            },
            "knowsAbout": [
              "Diagnostics over Internet Protocol (DoIP)",
              "Component Protection removal",
              "VANOS timing",
              "Walnut Blasting"
            ]
          })}
        </script>
      </Helmet>

      {/* --- EMBEDDED DYNAMIC VANILLA CSS BLOCK --- */}
      <style>{`
        .hub-page-wrapper {
          background-color: #111111;
          color: #E0E0E0;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          font-size: 15px;
          line-height: 1.6;
        }

        .hub-mono {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
        }

        /* --- Header / Navigation --- */
        .system-status-header {
          background-color: #0A0A0A;
          border-bottom: 1px solid #2B2B2B;
          padding: 0.8rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: #007BFF;
        }

        .system-status-header a {
          color: #E0E0E0;
          text-decoration: none;
          margin-left: 1.5rem;
          font-weight: bold;
          transition: color 0.2s;
        }

        .system-status-header a:hover {
          color: #007BFF;
        }

        /* --- Hero Section --- */
        .hub-hero {
          position: relative;
          padding: 8rem 2rem;
          text-align: center;
          background-image: linear-gradient(rgba(17,17,17,0.85), rgba(17,17,17,0.95)), url('https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=1920&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          border-bottom: 1px solid #2B2B2B;
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 900;
          letter-spacing: -1px;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .hero-title span {
          color: #007BFF;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 300;
          font-size: 2rem;
          display: block;
          margin-top: 0.5rem;
        }

        .hero-description {
          color: #A0A0A0;
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        /* --- Core Layout Containers --- */
        .hub-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }

        .section-header {
          border-bottom: 1px solid #2B2B2B;
          padding-bottom: 1.2rem;
          margin-bottom: 3rem;
        }

        .section-tag {
          font-size: 0.7rem;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 2.5px;
          color: #007BFF;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.5px;
        }

        /* --- Pillars Grid --- */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .pillar-card {
          background-color: #151515;
          border: 1px solid #2B2B2B;
          border-radius: 6px;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .pillar-card:hover {
          border-color: #007BFF;
          transform: translateY(-4px);
        }

        .pillar-num {
          font-size: 0.7rem;
          font-family: 'JetBrains Mono', monospace;
          color: #007BFF;
          display: block;
          margin-bottom: 1.2rem;
        }

        .pillar-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .pillar-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: #A0A0A0;
        }

        /* --- Brand Portal CTA --- */
        .brand-portal-cta {
          background: linear-gradient(135deg, #151515 0%, #0D0D0D 100%);
          border: 1px solid #333333;
          border-radius: 8px;
          padding: 3rem;
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
          overflow: hidden;
        }

        .cta-border-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #007BFF, #FF4500, #00E5FF);
        }

        .cta-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .cta-desc {
          font-size: 0.95rem;
          color: #A0A0A0;
          max-width: 650px;
          margin: 0 auto 2rem auto;
        }

        .cta-button {
          display: inline-block;
          background-color: #007BFF;
          color: #000000;
          border: none;
          padding: 1.1rem 2.2rem;
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: bold;
          letter-spacing: 1.5px;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(0, 123, 255, 0.25);
        }

        .cta-button:hover {
          background-color: #0056B3;
          color: #FFFFFF;
          box-shadow: 0 0 25px rgba(0, 123, 255, 0.45);
        }

        /* --- Intake Section --- */
        .intake-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
        }

        @media (max-width: 900px) {
          .intake-layout-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .intake-info h3 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1.5rem;
        }

        .intake-info p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #A0A0A0;
          margin-bottom: 2rem;
        }

        .intake-box {
          background-color: #151515;
          border: 1px solid #2B2B2B;
          border-radius: 6px;
          padding: 2.5rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .intake-group {
          margin-bottom: 1.5rem;
        }

        .intake-group label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          color: #888888;
          letter-spacing: 1.5px;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
        }

        .intake-input {
          width: 100%;
          background-color: #111111;
          border: 1px solid #333333;
          color: #FFFFFF;
          padding: 0.9rem 1.2rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          border-radius: 4px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .intake-input:focus {
          border-color: #007BFF;
        }

        .radio-cluster {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .radio-option {
          background: transparent;
          border: 1px solid #333333;
          padding: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: bold;
          color: #888888;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .submit-btn {
          width: 100%;
          border: none;
          padding: 1.2rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.4s ease;
        }

        @keyframes alertFlash {
          0% { box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
          50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.6); }
          100% { box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
        }

        /* --- Footer --- */
        .hub-footer {
          border-top: 1px solid #333333;
          background-color: #0F0F0F;
          padding: 3rem 2rem;
          margin-top: 6rem;
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

        @media (max-width: 400px) {
          .radio-cluster {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* --- Stark monospaced header showing active tools --- */}
      <header className="system-status-header font-mono">
        <span>SYS.ACTIVE: OSCILLOSCOPE_BUS_MONITOR // PRESSURE_TRANSDUCER // ULTRASONIC_SMOKE</span>
        <nav>
          <a href="#triage-tree">Triage Tree</a>
          <a href="#pillars">Four Pillars</a>
          <a href="#intake">Telemetry Intake</a>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hub-hero">
        <div className="hero-title font-mono">
          [ APEX TRIBOLOGY &amp; DIAGNOSTICS ]
          <span>WE DO NOT SWAP PARTS. WE IDENTIFY ROOT CAUSES MATHEMATICALLY.</span>
        </div>
        <p className="hero-description">
          The South Coast's engineer-led vehicle diagnostic center. Every mechanical fault, network drop, or fluid seep leaves a unique physical signature. We apply dynamic in-cylinder pressure profiling, bus line analysis, and digital scope sweeps to verify failure dynamics with absolute scientific certainty.
        </p>
      </section>

      <div className="hub-container">
        
        {/* --- SECTION 1: GENERAL FAULT TRIAGE MATRIX --- */}
        <section id="triage-tree" className="section-header">
          <span className="section-tag">// Step-by-Step Diagnostics</span>
          <h2 className="section-title">General Fault Triage Tree</h2>
        </section>

        <GeneralFaultMatrix />

        {/* --- SECTION 2: STANDARD DIAGNOSTIC OFFERINGS (THE FOUR PILLARS) --- */}
        <section id="pillars" className="section-header" style={{ marginTop: '5rem' }}>
          <span className="section-tag">// Core System Operations</span>
          <h2 className="section-title">The Four Pillars of Triage</h2>
        </section>

        <div className="pillars-grid">
          <div className="pillar-card">
            <span className="pillar-num">[01]</span>
            <h3 className="pillar-title">Oscillographic Sensor Evaluation</h3>
            <p className="pillar-desc">
              We capture and profile raw electrical signaling cycles directly from camshaft, crankshaft, and oxygen sensors, exposing micro-voltage anomalies standard OBD diagnostic scanners fail to report.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">[02]</span>
            <h3 className="pillar-title">Transducer Compression Analysis</h3>
            <p className="pillar-desc">
              By threading electronic pressure transducers directly into engine cylinders, we map dynamic mechanical displacement profiles in real-time, verifying mechanical timing and valve integrity.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">[03]</span>
            <h3 className="pillar-title">EVAP &amp; Induction Smoke Triage</h3>
            <p className="pillar-desc">
              High-pressure vapor testing allows us to trace unmetered vacuum leaks, split charge-air hoses, and composite manifold cracks down to the micrometer level.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">[04]</span>
            <h3 className="pillar-title">Chassis Electrical Diagnostics</h3>
            <p className="pillar-desc">
              We locate parasitic drains, ground deviations, high circuit resistances, and signal line disruptions across delicate multiplexed automotive networks.
            </p>
          </div>
        </div>

        {/* --- SECTION 3: BRAND PORTAL CALL-TO-ACTION --- */}
        <section className="brand-portal-cta">
          <div className="cta-border-glow"></div>
          <h3 className="cta-title">OWN JLR, BMW, MINI OR AUDI VAG?</h3>
          <p className="cta-desc">
            We maintain direct manufacturer security-gateway credentials, official dealer toolsets (Pathfinder DoIP, ISTA+, ODIS), and server connections to execute complex coding, keys, and adaptations.
          </p>
          <Link to="/services/platform-cores" className="cta-button">
            EXECUTE SPECIALIZED PORTAL &gt;&gt;
          </Link>
        </section>

        {/* --- SECTION 4: INTAKE FORM (DIAGNOSTIC TELEMETRY PORTAL) --- */}
        <div id="intake" className="intake-layout-grid">
          <div className="intake-info">
            <span className="section-tag">// Direct Intercept Queue</span>
            <h3>Intake Telemetry Portal</h3>
            <p>
              Initiate forensic staging. Provide vehicle model identifiers, known symptoms, and active fault codes. Abide strictly by accurate mileage and service updates to ensure precise diagnostic slot allocation.
            </p>
            <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#666' }}>
              SECURE LOGS BUFFERING // IOW_DIAGNOSTICS_PORTAL
            </div>
          </div>

          <div className="intake-box">
            <form onSubmit={handleFormSubmit}>
              <div className="form-row-2">
                <div className="intake-group">
                  <label>VEHICLE MAKE / MODEL / YEAR</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., VW Golf R / 2017" 
                    value={vehicleMakeModel}
                    onChange={(e) => setVehicleMakeModel(e.target.value)}
                    className="intake-input" 
                  />
                </div>
                <div className="intake-group">
                  <label>VEHICLE MILEAGE</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., 68,000 miles" 
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="intake-input" 
                  />
                </div>
              </div>

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
                  <option value="Under 6,000 miles">Under 6,000 miles (Optimal)</option>
                  <option value="6,000 - 10,000 miles">6,000 - 10,000 miles (Standard)</option>
                  <option value="Over 10,000 miles">Over 10,000 miles (Risk Zone)</option>
                </select>
              </div>

              <div className="intake-group">
                <label>PRESENCE OF METALLIC DEBRIS IN OIL FILTER?</label>
                <div className="radio-cluster">
                  {['Yes', 'No', 'Unverified'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setDebrisStatus(status)}
                      className="radio-option"
                      style={{
                        backgroundColor: debrisStatus === status 
                          ? (status === 'Yes' ? 'rgba(239,68,68,0.15)' : 'rgba(0, 123, 255, 0.05)') 
                          : 'transparent',
                        borderColor: debrisStatus === status 
                          ? (status === 'Yes' ? '#EF4444' : '#007BFF') 
                          : '#333333',
                        color: debrisStatus === status 
                          ? (status === 'Yes' ? '#EF4444' : '#FFFFFF') 
                          : '#888888',
                        boxShadow: debrisStatus === status 
                          ? `0 0 10px ${status === 'Yes' ? 'rgba(239,68,68,0.3)' : 'rgba(0, 123, 255, 0.15)'}` 
                          : 'none'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={formStatus.includes('SECURELY')}
                className="submit-btn"
                style={{
                  backgroundColor: debrisStatus === 'Yes' ? '#EF4444' : '#007BFF',
                  borderColor: debrisStatus === 'Yes' ? '#EF4444' : '#007BFF',
                  color: '#000000',
                  boxShadow: debrisStatus === 'Yes' 
                    ? '0 0 20px rgba(239,68,68,0.25)' 
                    : '0 0 20px rgba(0, 123, 255, 0.25)',
                  animation: debrisStatus === 'Yes' ? 'alertFlash 2s infinite' : 'none'
                }}
              >
                {debrisStatus === 'Yes' && formStatus === 'SUBMIT TELEMETRY DATA' 
                  ? 'EMERGENCY: REQUEST TOWING & LOCK-IN' 
                  : formStatus}
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* --- FOOTER --- */}
      <footer className="hub-footer font-mono">
        <div className="footer-flex">
          <div className="footer-left">
            APEX TRIBOLOGY // GENERAL DIAGNOSTIC HUB
          </div>
          <div className="footer-links">
            <Link to="/services/platform-cores">[ Brand Cores Portal ]</Link>
            <span style={{ color: '#333' }}>|</span>
            <a href="/case-studies/tdv6-crankshaft-failure">[ 306DT Technical Dossier ]</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
