// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Disease from './pages/disease';
import Variant from './pages/variant';
import Gene from './pages/gene';
import Drug from './pages/drug';
import Evidence from './pages/evidence';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/disease' Component={Disease} />
        <Route path='/gene' Component={Gene} />
        <Route path='/variant' Component={Variant} />
        <Route path='/drug' Component={Drug} />
        <Route path='/evidence' Component={Evidence} />
      </Routes>
    </Router>
  );
}

export default App;
