
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './pages/main/MainPage'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;