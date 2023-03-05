import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/organisms/Header';
import MainBox from './pages/box/MainBox';
import UserBox from './pages/box/UserBox';
import PostBox from './pages/problem/postBox';
import KakaoRedirect from './pages/Redirect/KakaoRedirect';
import ScrollToTop from './components/common/ScrollToTop';
import MyInfoSetting from './pages/info/myInfoSetting';
import DetailBox from './pages/problem/detailBox';

function App() {
    return (
		<BrowserRouter>
			<ScrollToTop/>
			<Header/>
			<Routes>
			<Route path='/' element={<MainBox/>} />
			<Route path='/userbox' element={<UserBox/>} />
			<Route path='/postBox' element={<PostBox/>} />
			<Route path='/detailBox' element={<DetailBox/>} />
			<Route path='/login/oauth2' element={<KakaoRedirect/>} />
			<Route path='/setting' element={<MyInfoSetting/>} />
			</Routes>
		</BrowserRouter>
    );
}

export default App;