import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './index.css';

// SVG Icons
const IconTribology = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5a5.5 5.5 0 0 0-5.5 5.5c0 4.5 5.5 13.5 5.5 13.5s5.5-9 5.5-13.5A5.5 5.5 0 0 0 12 2.5z" />
    <path d="M12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
  </svg>
);

const IconMetallurgy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconSystems = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
    <path d="M10 19v-3.96" />
    <path d="M14 17h8" />
    <path d="m19 14 3 3-3 3" />
  </svg>
);

const RiskGauge = ({ value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', marginRight: '1rem' }}>
    <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', backgroundColor: color }}></div>
    </div>
    <span className="font-mono text-muted" style={{ fontSize: '0.8rem', minWidth: '35px', textAlign: 'right' }}>{value}%</span>
  </div>
);

function Home() {
  const formRef = useRef();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [hasDebris, setHasDebris] = useState('unknown');
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent, error

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.target;
    const templateParams = {
      user_name: form.user_name.value,
      user_phone: form.user_phone.value,
      vehicle_model: form.vehicle_model.value,
      mileage: form.mileage.value,
      oil_history: form.oil_history.value,
      metal_debris: hasDebris === 'yes' ? "YES - URGENT" : hasDebris === 'no' ? "No" : "Unknown",
      fault_codes: form.fault_codes.value,
      urgency_flag: hasDebris === 'yes' ? "CRITICAL" : "Standard",
    };

    emailjs.send('service_q31xrit', 'template_0wyha4j', templateParams, 'FrmJMuq1qfwiBbp_Y')
      .then((result) => {
        console.log(result.text);
        setFormStatus('sent');
      }, (error) => {
        console.log(error.text);
        setFormStatus('error');
      });
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          Apex <span>Tribology</span>
        </div>
        <nav className="nav-links">
          <a href="#philosophy">Philosophy</a>
          <a href="#diagnostics">Diagnostics</a>
          <a href="#remediation">Remediation</a>
          <a href="#intake">Intake Form</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src="/hero-bg.png" alt="Perfectly honed cylinder bore" className="hero-bg" />
        <div className="container">
          <div className="hero-content">
            <h1>Beyond Factory Specs:<br /><span className="text-accent">Scientific Solutions</span><br />for TDV6 Failure.</h1>
            <p className="font-mono">
              We don't just replace parts. We diagnose the failure cascade, upgrade the metallurgy, and restore hydrodynamic stability.
            </p>
            <a href="#intake" className="btn btn-accent">Book a Forensic Diagnostic</a>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section id="philosophy" className="section">
        <div className="container">
          <h2 className="text-muted" style={{ fontSize: '0.9rem' }}>Phase 01</h2>
          <h2>Engineering <span className="text-accent-blue">Philosophy</span></h2>
          <div className="grid-3" style={{ marginTop: '3rem' }}>
            <div className="card">
              <div className="card-icon"><IconTribology /></div>
              <h3>Tribology</h3>
              <p className="font-mono text-muted">
                Optimizing oil pressure and hydrodynamic film stability to prevent bearing rotation.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><IconMetallurgy /></div>
              <h3>Metallurgy</h3>
              <p className="font-mono text-muted">
                Replacing brittle cast iron with forged/billet steel to eliminate torsional shear.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><IconSystems /></div>
              <h3>Systems Analysis</h3>
              <p className="font-mono text-muted">
                Correcting systemic flow restrictions from the injector seal to the oil pump.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Hierarchy */}
      <section id="diagnostics" className="section" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div className="container grid-2">
          <div>
            <h2 className="text-muted" style={{ fontSize: '0.9rem' }}>Phase 02</h2>
            <h2>Diagnostic <span className="text-accent">Hierarchy</span></h2>
            <p className="font-mono text-muted" style={{ marginBottom: '2rem', maxWidth: '400px' }}>
              Select a presenting symptom to view preliminary telemetry and failure probability mapping.
            </p>
            <img src="/crankshaft.png" alt="Macro Crankshaft" style={{ width: '100%', border: '1px solid var(--color-border)', opacity: 0.8 }} />
          </div>
          <div>
            <div className="accordion">
              {/* Accordion Item 1 */}
              <div className="accordion-item">
                <button
                  className={`accordion-header ${activeAccordion === 0 ? 'active' : ''}`}
                  onClick={() => toggleAccordion(0)}
                >
                  <span style={{ flex: 1 }}>[Acoustic: Low-Frequency Knock]</span>
                  <RiskGauge value={95} color="var(--color-accent)" />
                  <span>{activeAccordion === 0 ? '-' : '+'}</span>
                </button>
                <div className={`accordion-content ${activeAccordion === 0 ? 'active' : ''}`}>
                  <div className="diagnostic-result">
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>ACTION REQUIRED: IMMEDIATE TEARDOWN</strong>
                    Probability of main bearing failure: 92%. Continued operation will result in catastrophic block ventilation.
                  </div>
                </div>
              </div>

              {/* Accordion Item 2 */}
              <div className="accordion-item">
                <button
                  className={`accordion-header ${activeAccordion === 1 ? 'active' : ''}`}
                  onClick={() => toggleAccordion(1)}
                >
                  <span style={{ flex: 1 }}>[Electronic: P06DD Fault]</span>
                  <RiskGauge value={85} color="var(--color-accent-blue)" />
                  <span>{activeAccordion === 1 ? '-' : '+'}</span>
                </button>
                <div className={`accordion-content ${activeAccordion === 1 ? 'active' : ''}`}>
                  <div className="diagnostic-result" style={{ borderColor: 'var(--color-accent-blue)', backgroundColor: 'rgba(0, 123, 255, 0.1)' }}>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>DIAGNOSIS: OIL PRESSURE CONTROL FAILURE</strong>
                    Risk: Catastrophic. Sensor data indicates pump regulation irregularity. Forensics required on pump housing.
                  </div>
                </div>
              </div>

              {/* Accordion Item 3 */}
              <div className="accordion-item">
                <button
                  className={`accordion-header ${activeAccordion === 2 ? 'active' : ''}`}
                  onClick={() => toggleAccordion(2)}
                >
                  <span style={{ flex: 1 }}>[Visual: Metallic Sheen in Filter]</span>
                  <RiskGauge value={40} color="#FFC107" />
                  <span>{activeAccordion === 2 ? '-' : '+'}</span>
                </button>
                <div className={`accordion-content ${activeAccordion === 2 ? 'active' : ''}`}>
                  <div className="diagnostic-result" style={{ borderColor: 'var(--color-secondary)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>DIAGNOSIS: MATERIAL SHEAR PROGRESSION</strong>
                    Risk: High. Babbitt material erosion detected. Full tribological flush and bearing replacement sequence initiated.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Specialist Remediation Comparison */}
      <section id="remediation" className="section">
        <div className="container">
          <h2 className="text-muted" style={{ fontSize: '0.9rem', textAlign: 'center' }}>Phase 03</h2>
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Specialist <span className="text-accent-blue">Remediation</span></h2>
          <p className="font-mono text-accent" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            We don't do "Standard." We only do "Corrected."
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Component / Action</th>
                  <th>Standard Workshop Repair</th>
                  <th className="highlight-col highlight-header">Apex Engineering Rebuild</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono">Crankshaft</td>
                  <td className="text-muted">Cast Iron (OEM Replacement)</td>
                  <td className="highlight-col font-mono" style={{ color: '#fff' }}>Forged / Billet Steel</td>
                </tr>
                <tr>
                  <td className="font-mono">Oil Pump</td>
                  <td className="text-muted">Standard Factory Spec</td>
                  <td className="highlight-col font-mono" style={{ color: '#fff' }}>High-Flow Precision Machined</td>
                </tr>
                <tr>
                  <td className="font-mono">Bearings</td>
                  <td className="text-muted">OEM Shells</td>
                  <td className="highlight-col font-mono" style={{ color: '#fff' }}>Tri-Metal / Calico Coated</td>
                </tr>
                <tr>
                  <td className="font-mono">Clearance Tolerance</td>
                  <td className="text-muted">Factory Range</td>
                  <td className="highlight-col font-mono" style={{ color: '#fff' }}>Micrometer Matched (&lt;0.0005")</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake" className="section" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div className="container grid-2">
          <div>
            <h2 className="text-muted" style={{ fontSize: '0.9rem' }}>Intake</h2>
            <h2>Pre-Service <span className="text-accent">Intake</span></h2>
            <p className="font-mono text-muted" style={{ marginBottom: '2rem' }}>
              Our forensic process requires strict adherence to data collection. Please provide telemetry regarding your engine's current state to initiate the screening protocol.
            </p>
          </div>
          <div>
            <form ref={formRef} className="card" style={{ padding: '2rem' }} onSubmit={sendEmail}>
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Client Name</label>
                  <input type="text" name="user_name" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Contact Phone</label>
                  <input type="text" name="user_phone" className="form-control" placeholder="Phone Number" required />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Vehicle Model & Year</label>
                  <input type="text" name="vehicle_model" className="form-control" placeholder="e.g., Discovery 4 / 2016" required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Vehicle Mileage</label>
                  <input type="text" name="mileage" className="form-control" placeholder="e.g., 85,000 km" required />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Oil Change Interval History</label>
                  <select name="oil_history" className="form-control" required>
                    <option value="">Select Interval...</option>
                    <option value="5k">&lt; 5,000 miles (Enthusiast)</option>
                    <option value="10k">5,000 - 10,000 miles (Standard)</option>
                    <option value="15k">&gt; 10,000 miles (Factory Recommended / Risk)</option>
                    <option value="unknown">Unknown / Secondary Owner</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Active Fault Codes</label>
                  <input type="text" name="fault_codes" className="form-control" placeholder="e.g., P06DD (Optional)" />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Presence of Metallic Debris in Filter?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="debris" value="yes" checked={hasDebris === 'yes'} onChange={(e) => setHasDebris(e.target.value)} /> Yes
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="debris" value="no" checked={hasDebris === 'no'} onChange={(e) => setHasDebris(e.target.value)} /> No
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="debris" value="unknown" checked={hasDebris === 'unknown'} onChange={(e) => setHasDebris(e.target.value)} /> Unverified
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`btn ${hasDebris === 'yes' ? 'btn-emergency' : 'btn-accent'}`}
                style={{ width: '100%' }}
                disabled={formStatus === 'sending' || formStatus === 'sent'}
              >
                {formStatus === 'sending' ? 'TRANSMITTING DATA...' :
                  formStatus === 'sent' ? 'TELEMETRY RECEIVED' :
                    hasDebris === 'yes' ? '[EMERGENCY: STOP ENGINE – REQUEST IMMEDIATE TRANSPORT]' :
                      'Submit Telemetry Data'}
              </button>

              {formStatus === 'error' && (
                <p className="font-mono" style={{ color: '#D32F2F', marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>
                  Error transmitting data. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="logo" style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--color-secondary)' }}>
            Apex <span>Tribology</span>
          </div>
          <p>
            We are currently taking bookings for diagnostic analysis. <br />
            Please note: We operate on an appointment-only basis to ensure the required focus for forensic engine teardowns.
          </p>
          <div style={{marginTop: '1.5rem'}}>
            <a href="/case-studies/tdv6-crankshaft-failure" className="text-accent-blue font-mono" style={{textDecoration: 'none'}}>
              [Read our Technical Whitepaper: 306DT Failure Mechanics]
            </a>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#333' }}>
            © 2026 Apex Tribology & Performance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
