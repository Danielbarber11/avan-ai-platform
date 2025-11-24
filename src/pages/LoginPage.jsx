```javascript
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
        console.log("Logged in user:", user);
        // Here you might want to save user to context/state
        navigate('/home');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add real email/password auth logic here if needed
    navigate('/home');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="btn-exit" onClick={() => navigate('/')}>
            <X size={24} />
        </button>
        <h2>התחברות לאוואן</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="אימייל" required />
          <input type="password" placeholder="סיסמה" required />
          <button type="submit" className="btn-auth">התחבר</button>
        </form>
        
        <div className="auth-divider">
            <span>או</span>
        </div>

        <div className="social-buttons">
            <button className="btn-social" onClick={handleGoogleLogin}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
                התחבר עם Google
            </button>
            <button className="btn-social">
                <img src="https://www.svgrepo.com/show/475638/apple-color.svg" alt="Apple" width="20" />
                התחבר עם Apple
            </button>
        </div>

        <p>
          אין לך חשבון? <Link to="/signup">הירשם כאן</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
```
