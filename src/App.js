// src/App.js
import React from 'react';
import './App.css';
import DataViewer from './components/DataViewer';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
               
               <Route path="/" element={<DataViewer/>}/>
               
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;
