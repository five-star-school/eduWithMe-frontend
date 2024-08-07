import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import MyRoomPage from './pages/MyRoomPage';
import HomePage from './pages/HomePage';

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
            <Route path="/changePassword" element={<ChangePasswordPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/room/:roomId/question/:questionId" element={<QuestionDetailPage />} />
            <Route path="/room/:roomId/manageMain" element={<ManageMainPage />} />
            <Route path="/room/:roomId/manageCreate" element={<ManageCreatePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/room/:roomId/question/:questionId/manageRead" element={<ManageReadPage />} />
            <Route path="/room/:roomId/question/:questionId/manageModify" element={<ManageModifyPage />} />
            <Route path="/myroom" element={<MyRoomPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;