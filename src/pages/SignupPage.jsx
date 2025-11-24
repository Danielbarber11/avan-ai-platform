import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import './AuthPages.css';

const SignupPage = () => {
    const navigate = useNavigate();

    const handleGoogleSignup = async () => {
        const user = await signInWithGoogle();
        if (user) {
            console.log("Signed up user:", user);
            navigate('/terms');
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/terms');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <button className="btn-exit" onClick={() => navigate('/')}>
                    <X size={24} />
                </button>
                <h2>הרשמה לאוואן</h2>
                <form onSubmit={handleSignup}>
                    <input type="text" placeholder="שם מלא" required />
                    <input type="email" placeholder="אימייל" required />
                    <input type="password" placeholder="סיסמה" required />
                    <button type="submit" className="btn-auth">הירשם</button>
                </form>

                <div className="auth-divider">
                    <span>או</span>
                </div>

                <div className="social-buttons">
                    <button className="btn-social" onClick={handleGoogleSignup}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
                        הרשמה עם Google
                    </button>
                    <button className="btn-social">
                        <img src="https://www.svgrepo.com/show/475638/apple-color.svg" alt="Apple" width="20" />
                        הרשמה עם Apple
                    </button>
                </div>

                <p>
                    כבר רשום? <Link to="/login">התחבר כאן</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
