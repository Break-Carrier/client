// src/App.js
import React from 'react';
import SubscriptionsReferences from './components/SubscriptionReferences';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <SubscriptionsReferences />
      </header>
    </div>
  );
}

export default App;
