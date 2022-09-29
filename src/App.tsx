import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import MyBoxPage from './pages/myBoxPage/MyBoxPage';
import PostProblemPage from './pages/postProblemPage/PostProblemPage';
import OthersPage from './pages/othersPage/OthersPage';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<OthersPage/>} />
        <Route path='/mybox' element={<MyBoxPage/>} />
        <Route path='/post' element={<PostProblemPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;