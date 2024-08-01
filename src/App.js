import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import RoomMainPage from './pages/RoomMainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import ManageMainPage from './pages/ManageMainPage';
import ManageCreatePage from './pages/ManageCreatePage';
import MyPage from './pages/MyPage';
import ManageReadPage from './pages/ManageReadPage';
import ManageModifyPage from './pages/ManageModifyPage';
import { AuthProvider } from './util/AuthContext';
import ForgotPassword from './components/ForgotPassword';

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
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/room/:roomId" element={<RoomMainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/changepassword" element={<ChangePasswordPage />} />
              <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="/room/:roomId/question/:questionId" element={<QuestionDetailPage/>}/>
              <Route path="/room/:roomId/manageMain" element={<ManageMainPage/>}/>
              <Route path="/manageCreate" element={<ManageCreatePage/>}/>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/room/:roomId/question/:questionId/manageRead" element={<ManageReadPage/>}/>
              <Route path="/room/:roomId/question/:questionId/manageModify" element={<ManageModifyPage/>}/>
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;