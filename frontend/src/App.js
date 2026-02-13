import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Portfolio />
      </div>
    </ThemeProvider>
  );
}

export default App;
