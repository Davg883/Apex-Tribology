import React from 'react';
import { Link } from 'react-router-dom';

export default function PlatformCard({ platformId, name, systemGroup, description, route, accentColor = '#007BFF' }) {
  return (
    <div 
      style={{ '--accent-color': accentColor }}
      className="relative bg-[#111111] border border-[#4A4A4A] p-8 hover:border-[var(--accent-color)] transition-all duration-500 flex flex-col justify-between group overflow-hidden rounded-md"
    >
      {/* Laser Corner Accent Lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#888] group-hover:border-[var(--accent-color)] transition-colors duration-300"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#888] group-hover:border-[var(--accent-color)] transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#888] group-hover:border-[var(--accent-color)] transition-colors duration-300"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#888] group-hover:border-[var(--accent-color)] transition-colors duration-300"></div>

      {/* Dynamic Laser Background Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(255,255,255,0.01)] to-[rgba(var(--accent-color),0.02)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div>
        {/* Telemetry Header */}
        <div className="flex justify-between items-center mb-6 font-mono text-xs text-gray-500">
          <span>{platformId}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping"></span>
            <span className="text-gray-400 group-hover:text-white transition-colors">SYS_ONLINE</span>
          </span>
        </div>

        {/* Brand Group */}
        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 block mb-1">
          {systemGroup}
        </span>
        
        {/* Name */}
        <h3 className="text-2xl font-bold font-mono tracking-tight text-white mb-4 group-hover:text-[var(--accent-color)] transition-colors duration-300">
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-8">
          {description}
        </p>
      </div>

      {/* Button Action */}
      <Link 
        to={route} 
        className="font-mono text-xs text-white border-b border-[#333] group-hover:border-[var(--accent-color)] py-1.5 self-start transition-all duration-300 tracking-wider flex items-center gap-2"
      >
        <span>EXECUTE INTERCEPT PORTAL</span>
        <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 text-[var(--accent-color)]">
          &gt;&gt;
        </span>
      </Link>
    </div>
  );
}
