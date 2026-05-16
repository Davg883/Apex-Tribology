import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './index.css';

function Whitepaper() {
  return (
    <div className="app-container">
      <Helmet>
        <title>306DT Crankshaft Failure: Forensic Analysis & Remediation | Apex Tribology</title>
        <meta name="description" content="A first-principles engineering analysis of the Land Rover 3.0 TDV6/SDV6 crankshaft failure. Learn how we engineer out factory metallurgical and lubrication flaws." />
        <meta name="keywords" content="306DT crankshaft failure, Discovery 4 engine rebuild, TDV6 main bearing rotation, Apex Tribology" />
      </Helmet>

      {/* Header */}
      <header className="header" style={{position: 'relative', backgroundColor: 'var(--color-primary)'}}>
        <div className="logo">
          Apex <span>Tribology</span>
        </div>
        <nav className="nav-links">
          <Link to="/">Return to Hub</Link>
          <a href="/#intake" className="text-accent">Book Diagnostic</a>
        </nav>
      </header>

      {/* Hero Section (Article Header) */}
      <section className="section" style={{paddingBottom: '3rem', borderBottom: 'none'}}>
        <div className="container" style={{maxWidth: '800px'}}>
          <h1 style={{fontSize: '2.5rem', lineHeight: 1.2}}>
            Technical Analysis: The Cascading Failure Mechanics of the Land Rover 3.0L TDV6 (306DT)
          </h1>
          <p className="font-mono text-muted" style={{marginTop: '1rem', borderLeft: '3px solid var(--color-accent-blue)', paddingLeft: '1rem'}}>
            A forensic investigation into main bearing shear, oil pressure volatility, and the engineering necessity of forged crank assemblies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{paddingTop: '2rem'}}>
        <div className="container" style={{maxWidth: '800px'}}>
          
          <div className="card" style={{marginBottom: '3rem', backgroundColor: 'rgba(0, 123, 255, 0.03)', borderColor: 'var(--color-accent-blue)'}}>
            <h3 className="font-mono text-accent-blue" style={{fontSize: '0.9rem', marginBottom: '1rem'}}>EXECUTIVE SUMMARY</h3>
            <p>
              The 306DT architecture suffers from a highly documented, systemic flaw centering on hydrodynamic film collapse at the main bearings. Standard workshop repairs focus on symptom remediation (replacing snapped crankshafts and spun bearings). However, our forensic teardowns reveal that without addressing the underlying metallurgical weaknesses and volumetric fluid dynamics, failure recurrence is a mathematical probability, not an anomaly.
            </p>
          </div>

          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>1. The Tribological Root Cause</h2>
          <p style={{marginBottom: '1.5rem'}}>
            Tribology—the science of wear, friction, and lubrication—dictates the survival of a high-compression diesel engine. The 306DT relies on a microscopic hydrodynamic oil film to keep the rotating crankshaft journals suspended away from the babbitt bearing shells. 
          </p>
          <p style={{marginBottom: '2.5rem'}}>
            Under high torsional load, especially coupled with extended (15,000+ mile) service intervals, oil viscosity shear breakdown occurs. This triggers a momentary metal-to-metal contact event. The friction localized at this junction spikes temperatures instantaneously, micro-welding the bearing shell to the crankshaft journal, forcing it to rotate within its saddle—commonly referred to as a "spun bearing."
          </p>

          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>2. Metallurgical Deficiency: The Cast Iron Compromise</h2>
          <p style={{marginBottom: '1.5rem'}}>
            The factory Land Rover 306DT crankshaft is constructed from cast nodular iron. While suitable for steady-state, low-torque applications, the geometric constraints of the V6 block combined with extreme peak cylinder pressures induce high-frequency torsional vibrations.
          </p>
          <p style={{marginBottom: '2.5rem'}}>
            When the hydrodynamic film fails, the rotational seizure of the bearing acts as a mechanical brake on a single journal while the rest of the rotating assembly continues under inertia. The cast iron, possessing low tensile elasticity, cannot absorb this shock. It fractures. This is the origin of the infamous "snapped crank."
          </p>

          <img 
            src="/crankshaft.png" 
            alt="Crankshaft Macro Photography" 
            style={{width: '100%', border: '1px solid var(--color-border)', marginBottom: '2.5rem', opacity: 0.9}} 
          />

          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>3. Flow Dynamics and The P06DD Fault</h2>
          <p style={{marginBottom: '1.5rem'}}>
            Many 306DT owners report a pre-failure warning via a low-frequency acoustic knock or an electronic <strong>P06DD</strong> fault code. The P06DD code explicitly points to a failure in the oil pressure control circuit. 
          </p>
          <p style={{marginBottom: '2.5rem'}}>
            The factory oil pump gears are susceptible to housing cavitation and irregular pressure regulation. At Apex Tribology & Performance, our teardowns routinely find that insufficient volume—not just pressure—during cold starts accelerates bearing shell wear. By the time the acoustic knock is audible to the human ear, the bearing material has already been evacuated into the oil filter media.
          </p>

          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>4. The Apex Remediation Protocol</h2>
          <p style={{marginBottom: '1.5rem'}}>
            Standard industry practice is to purchase a refurbished cast-iron block or install an OEM-spec short block. This guarantees a repeat failure within the next 60,000 to 80,000 miles. 
          </p>
          <p style={{marginBottom: '1.5rem'}}>
            To definitively cure the 306DT, the geometry and metallurgy must be upgraded:
          </p>
          <ul style={{marginBottom: '3rem', paddingLeft: '2rem', color: 'var(--color-text-muted)'}}>
            <li style={{marginBottom: '0.5rem'}}><strong>Billet/Forged Steel Crankshaft:</strong> Yield strength is increased by over 140%, eliminating torsional shear risk.</li>
            <li style={{marginBottom: '0.5rem'}}><strong>Tri-Metal Calico Coated Bearings:</strong> Provides a sacrificial lubricity layer for cold-start protection.</li>
            <li style={{marginBottom: '0.5rem'}}><strong>High-Flow Volumetric Oil Pump:</strong> Blueprinting the pump housing to guarantee adequate flow at all RPM ranges.</li>
            <li style={{marginBottom: '0.5rem'}}><strong>Micrometer Clearance Matching:</strong> Bearing clearances mapped to &lt;0.0005" tolerance to optimize oil film stability.</li>
          </ul>

          <div style={{textAlign: 'center', padding: '3rem 0', borderTop: '1px solid var(--color-border)'}}>
            <h3 style={{marginBottom: '1rem'}}>Is your 306DT displaying warning signs?</h3>
            <p className="font-mono text-muted" style={{marginBottom: '2rem'}}>Do not wait for catastrophic failure. Submit your telemetry for analysis.</p>
            <a href="/#intake" className="btn btn-accent">Initiate Pre-Service Intake</a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="logo" style={{marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--color-secondary)'}}>
            Apex <span>Tribology</span>
          </div>
          <p style={{marginTop: '2rem', fontSize: '0.75rem', color: '#333'}}>
            © 2026 Apex Tribology & Performance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Whitepaper;
