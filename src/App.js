import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import RoomPage from "./pages/RoomPage";
import QuestionDetailPage from './pages/QuestionDetailPage';

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>
                <Link to="/main">메인 페이지로 이동</Link>
            </p>
            <p>여기에 웹페이지 소개랑 이용방법 적어도 좋을 것 같아요.</p>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/room/:roomId" element={<RoomPage/>}/>
                    <Route path="/room/:roomId/question/:questionId" element={<QuestionDetailPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
