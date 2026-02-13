import React from 'react';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Portfolio from './components/Portfolio';
import SEOHead from './components/SEOHead';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead />
        <div className="App">
          <Portfolio />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
