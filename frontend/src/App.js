import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Portfolio from './components/Portfolio';
import SEOHead from './components/SEOHead';

function App() {
  return (
    <ThemeProvider>
      <SEOHead />
      <div className="App">
        <Portfolio />
      </div>
    </ThemeProvider>
  );
}

export default App;
