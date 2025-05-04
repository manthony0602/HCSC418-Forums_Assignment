import React from 'react';
import './App.css';
import BasicForm from './BasicForm';

function App() {
  return (
    <div className="App">
      <h2 className="page-title">HCSC418 Forums Homework Assignment</h2>
      <div className="card">
        <h1>Forum Sign-Up</h1>
        <BasicForm />
      </div>
    </div>
  );
}

export default App;
