import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DiagnosticFlow from '../components/DiagnosticFlow';

export default function JlrService() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans selection:bg-[#007BFF] selection:text-white">
      <Helmet>
        <title>Sovereign JLR Diagnostics & Engineering | Isle of Wight</title>
        <meta name="description" content="Dealer-level TOPIx Cloud diagnostics, Pathfinder programming, and Ingenium timing chain remediation on the Isle of Wight. No guesswork. Pure mechanical determinism." />
      </Helmet>

      {/* Top Engineering Telemetry Banner */}
      <div className="border-b border-[#4A4A4A] bg-[#111] px-6 py-3 font-mono text-xs text-[#007BFF] flex justify-between">
        <span>SYS_STATUS: JLR_PATHFINDER_CONNECTED // DOIP_ACTIVE</span>
        <span className="hidden md:inline">SECURITY GATEWAY: TOPIX_CLOUD_AUTHENTICATED</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <span className="text-xs font-mono tracking-widest text-[#007BFF] uppercase block mb-3">// Platform D7u / MLA / PTA / D8 [1]</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Sovereign JLR Engineering <br />
          <span className="text-[#888] font-mono font-light text-2xl md:text-4xl">Devoid of the Solent Transit Penalty.</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
          The Isle of Wight's dedicated technical alternative to mainland dealer networks. We execute live-bus data analysis, microsecond oscilloscope profiling, and official JLR server-side module configuration directly on the island [2].
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <a href="#intake" className="bg-[#007BFF] hover:bg-[#0056b3] transition text-white px-6 py-3 font-mono text-sm font-semibold tracking-wider">
            INITIATE TELEMETRY INTAKE
          </a>
          <Link to="/" className="border border-[#4A4A4A] hover:border-white transition text-white px-6 py-3 font-mono text-sm">
            BACK TO DASHBOARD
          </Link>
        </div>

        {/* Diagnostic Flow Widget */}
        <div className="mb-16">
          <DiagnosticFlow accentColor="#007BFF" systemName="JLR_DOIP" />
        </div>

        {/* Technical Explanations */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-[#333] pt-16">
          <div>
            <h3 className="text-xl font-bold font-mono mb-4 text-white">Ingenium 2.0D Timing Chain Degradation</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              AJ200D engines suffer from rapid timing chain elongation. This is caused by unburnt diesel fuel diluting the engine oil during aborted DPF regenerations, dropping the lubricant's kinematic viscosity [6]. This drops hydraulic chain tensioner pressure and rapidly degrades the plastic guides.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We do not wait for the PCM to flag correlation codes. By mapping the phase difference between the Camshaft and Crankshaft position sensors with a PicoScope, we detect stretch down to the microsecond level [10].
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold font-mono mb-4 text-white">Pneumatics & Suspension Calibration</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              We diagnose codes like C1A13 and C1A36 logically. Rather than replacing expensive compressors on suspicion, we check physical gallery sealing and apply manual laser offsets in Pathfinder to trim air springs symmetrically [7].
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our TOPIx server connections allow us to handle secure updates, configure dynamic chassis settings, and code new suspension modules locally [2].
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#4A4A4A] py-8 text-center bg-[#111]">
        <Link to="/" className="text-sm font-mono text-[#007BFF] hover:underline">
          &lt;-- RETURN TO APEX TRIBOLOGY DIAGNOSTIC CENTER
        </Link>
      </div>
    </div>
  );
}
