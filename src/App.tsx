import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/organisms/Header';
import MyBoxPage from './pages/myBoxPage/MyBoxPage';
import PostProblemPage from './pages/postProblemPage/PostProblemPage';
import MainPage from './pages/MainPage/MainPage';
import KakaoRedirect from './pages/Redirect/KakaoRedirect';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
		<BrowserRouter>
			<ScrollToTop/>
			<Header/>
			<Routes>
			<Route path='/' element={<MainPage/>} />
			<Route path='/mybox' element={<MyBoxPage/>} />
			<Route path='/post' element={<PostProblemPage/>} />
			<Route path='/login/oauth2' element={<KakaoRedirect/>} />
			</Routes>
		</BrowserRouter>
    );
}

export default App;