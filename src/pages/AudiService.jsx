import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DiagnosticFlow from '../components/DiagnosticFlow';

export default function AudiService() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans selection:bg-cyan-500 selection:text-white">
      <Helmet>
        <title>VAG & Audi Diagnostics, DSG & GeKo coding | Isle of Wight</title>
        <meta name="description" content="Official VAG ODIS diagnostics, GeKo Component Protection removal, EA888 walnut blasting, and DL501 S-Tronic mechatronics servicing on the Isle of Wight." />
      </Helmet>

      {/* Top Engineering Telemetry Banner */}
      <div className="border-b border-[#4A4A4A] bg-[#111] px-6 py-3 font-mono text-xs text-cyan-400 flex justify-between">
        <span>SYS_STATUS: ODIS_ONLINE_GRP // GEKO_AUTHENTICATED [41]</span>
        <span className="hidden md:inline">SVM CONFIGURATION: SECURE_CONNECTION_STABLE</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block mb-3">// EA888 / DL501 / Haldex Gen 5 / MQB / MLB</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Audi &amp; VAG Systems <br />
          <span className="text-[#888] font-mono font-light text-2xl md:text-4xl">Engineered for absolute accuracy.</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
          Modern VAG vehicles use cryptographically locked modules and advanced direct injection systems. We utilize official ODIS developer connections to manage complex electronics and mechanical systems locally [39].
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <a href="#intake" className="bg-cyan-600 hover:bg-cyan-700 transition text-white px-6 py-3 font-mono text-sm font-semibold tracking-wider">
            INITIATE TELEMETRY INTAKE
          </a>
          <Link to="/" className="border border-[#4A4A4A] hover:border-white transition text-white px-6 py-3 font-mono text-sm">
            BACK TO DASHBOARD
          </Link>
        </div>

        {/* Diagnostic Flow Widget */}
        <div className="mb-16">
          <DiagnosticFlow accentColor="#22D3EE" systemName="VAG_ODIS" />
        </div>

        {/* Technical Explanations */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-[#333] pt-16">
          <div>
            <h3 className="text-xl font-bold font-mono mb-4 text-white">GeKo Component Protection</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Replacing control units on modern Audi models (like the ACC radar, digital dash, or gateway module) triggers a "Component Protection" lock [39]. Without active authorization, the new part remains disabled.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We maintain direct server connections to the GeKo servers in Germany. This allows us to authenticate replacement parts and complete Software Version Management (SVM) configurations right here on the island [39].
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold font-mono mb-4 text-white">EA888 Valve Remediation &amp; Thermals</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Oil vapors from the PCV system can bake onto intake valves because fuel is injected directly into the cylinders, bypassing the valve ports [27]. We perform non-destructive walnut blasting using dedicated vacuum adapters to restore clean airflow and smooth out misfires [28].
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We also handle DSG transmission fluid services, using ODIS to monitor temperature-critical levels to ensure complete shifting precision [33].
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#4A4A4A] py-8 text-center bg-[#111]">
        <Link to="/" className="text-sm font-mono text-cyan-400 hover:underline">
          &lt;-- RETURN TO APEX TRIBOLOGY DIAGNOSTIC CENTER
        </Link>
      </div>
    </div>
  );
}
