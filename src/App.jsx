import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Home';
import Whitepaper from './Whitepaper';
import JlrService from './pages/JlrService';
import MiniService from './pages/MiniService';
import AudiService from './pages/AudiService';
import SovereignCores from './pages/SovereignCores';
import './index.css';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/tdv6-crankshaft-failure" element={<Whitepaper />} />
          
          {/* Sovereign Service Routes */}
          <Route path="/services/jlr-diagnostics" element={<JlrService />} />
          <Route path="/services/bmw-mini-diagnostics" element={<MiniService />} />
          <Route path="/services/audi-vag-diagnostics" element={<AudiService />} />
          
          {/* Sovereign Tabbed Platform Cores */}
          <Route path="/services/platform-cores" element={<SovereignCores />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}


