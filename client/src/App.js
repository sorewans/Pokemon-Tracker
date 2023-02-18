import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NewCardSearch from './components/newCardSearch';
import DisplayResults from './components/displayResults';
import AllCards from './components/showAllCards';



function App() {


  return (
    <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all">All</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path='/' element={<NewCardSearch/>} /> 
      <Route path='/all' element={<AllCards/>} />
      <Route path='/results/:cardName' element={<DisplayResults/>} /> 
    </Routes>      
    </>



  );
}

export default App;
