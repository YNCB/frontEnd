import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/organisms/Header';
import MainBox from './pages/boxPage/MainBox';
import UserBox from './pages/boxPage/UserBox';
import PostProblemPage from './pages/postProblem/PostProblemPage';
import KakaoRedirect from './pages/Redirect/KakaoRedirect';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
		<BrowserRouter>
			<ScrollToTop/>
			<Header/>
			<Routes>
			<Route path='/' element={<MainBox/>} />
			<Route path='/userbox' element={<UserBox/>} />
			<Route path='/post' element={<PostProblemPage/>} />
			<Route path='/login/oauth2' element={<KakaoRedirect/>} />
			</Routes>
		</BrowserRouter>
    );
}

export default App;