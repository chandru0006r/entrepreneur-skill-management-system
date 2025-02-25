import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SkillPage from './pages/SkillSelection';
import CoursesPage from './pages/Courses';
import ChatPage from './pages/ChatPage';


function App() {
    return (
        
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/skills" element={<SkillPage/>} />
                <Route path="/courses" element={<CoursesPage/>} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </Router>
      
    );
}

export default App;
 