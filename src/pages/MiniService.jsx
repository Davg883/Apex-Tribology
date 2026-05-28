import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DiagnosticFlow from '../components/DiagnosticFlow';

export default function MiniService() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans selection:bg-[#FF4500] selection:text-white">
      <Helmet>
        <title>BMW & Mini Technical Diagnostics | Isle of Wight</title>
        <meta name="description" content="BMW ISTA+ dealer-level system diagnostics, B38/B48 VANOS actuator profiling, and N14/N18 HPFP flow diagnostics on the Isle of Wight." />
      </Helmet>

      {/* Top Engineering Telemetry Banner */}
      <div className="border-b border-[#4A4A4A] bg-[#111] px-6 py-3 font-mono text-xs text-[#FF4500] flex justify-between">
        <span>SYS_STATUS: ISTA_INTEGRITY_VERIFIED // ICOM_ACTIVE [20]</span>
        <span className="hidden md:inline">DME ADAPTATION COBALT OVERLAY ROUTE: ONLINE</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <span className="text-xs font-mono tracking-widest text-[#FF4500] uppercase block mb-3">// Gen 2 Prince / Gen 3 Modular Engines</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
          BMW & Mini Valvetrain <br />
          <span className="text-[#888] font-mono font-light text-2xl md:text-4xl">&amp; Fuel Telemetry Services.</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
          The modern BMW platform is a highly detailed digital network. Resolving dynamic faults requires analyzing telemetry data from the Digital Motor Electronics (DME) system [22].
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <a href="#intake" className="bg-[#FF4500] hover:bg-orange-700 transition text-white px-6 py-3 font-mono text-sm font-semibold tracking-wider">
            INITIATE TELEMETRY INTAKE
          </a>
          <Link to="/" className="border border-[#4A4A4A] hover:border-white transition text-white px-6 py-3 font-mono text-sm">
            BACK TO DASHBOARD
          </Link>
        </div>

        {/* Diagnostic Flow Widget */}
        <div className="mb-16">
          <DiagnosticFlow accentColor="#FF4500" systemName="BMW_ISTA" />
        </div>

        {/* Technical Explanations */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-[#333] pt-16">
          <div>
            <h3 className="text-xl font-bold font-mono mb-4 text-white">B38/B48 VANOS Calibration</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Gen 3 B38/B48 engines often experience VANOS central valve bolt wear. This causes plastic mesh pieces to break off and block oil delivery to the actuators [15].
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We do not simply replace parts or run adaptive resets on worn assemblies. We perform real-time oil pressure testing of the solenoids using the ISTA+ interface [16]. This ensures the timing hardware has the correct hydraulic pressure to run safely.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold font-mono mb-4 text-white">N14/N18 HPFP Isolation</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Before replacing an expensive High-Pressure Fuel Pump (HPFP), we measure the low-pressure fuel side to confirm it has a steady 5 bar supply. Next, we run voltage sweeps of the fuel rail sensor (confirming a 0.6V reading at key-on, engine-off) to isolate the exact electrical path [13].
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              This detailed process avoids unnecessary parts replacement and targets the root issue directly.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#4A4A4A] py-8 text-center bg-[#111]">
        <Link to="/" className="text-sm font-mono text-[#FF4500] hover:underline">
          &lt;-- RETURN TO APEX TRIBOLOGY DIAGNOSTIC CENTER
        </Link>
      </div>
    </div>
  );
}
