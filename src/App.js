import React , { useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import './scss/app.scss';

import { useSelector, useDispatch } from 'react-redux';

export const SearchContext = React.createContext();

function App() { 
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header/>
        <div className="content">
            <Routes>
              <Route path='' element={<Home />}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
