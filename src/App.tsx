import React from 'react';
import { NavigationProvider } from './contexts/NavigationContext';
import { UserProvider } from './contexts/UserContext';
import AppRouter from './components/AppRouter';
import './App.css';

function App() {
  return (
    <UserProvider>
      <NavigationProvider>
        <div className="App">
          <AppRouter />
        </div>
      </NavigationProvider>
    </UserProvider>
  );
}

export default App;
