import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Home';
import Whitepaper from './Whitepaper';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/tdv6-crankshaft-failure" element={<Whitepaper />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
