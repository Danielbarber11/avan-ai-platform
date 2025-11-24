import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TermsPage from './pages/TermsPage';
import DashboardPage from './pages/DashboardPage';
import CodeToolPage from './pages/CodeToolPage';
import ImageToolPage from './pages/ImageToolPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccessibilityStatement from './pages/AccessibilityStatement';
import AccessibilityWidget from './components/AccessibilityWidget';

function App() {
    return (
        <Router>
            <AccessibilityWidget />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/home" element={<DashboardPage />} />
                <Route path="/tool/code" element={<CodeToolPage />} />
                <Route path="/tool/image" element={<ImageToolPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
            </Routes>
        </Router>
    );
}

export default App;
