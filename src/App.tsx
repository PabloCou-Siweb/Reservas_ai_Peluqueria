import React from 'react';
import { NavigationProvider } from './contexts/NavigationContext';
import AppRouter from './components/AppRouter';
import './App.css';

function App() {
  return (
    <NavigationProvider>
      <div className="App">
        <AppRouter />
      </div>
    </NavigationProvider>
  );
}

export default App;
