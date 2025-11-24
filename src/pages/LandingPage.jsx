import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [activeFeature, setActiveFeature] = useState(null);

    const features = [
        { id: 'story', title: 'יצירת סיפורים', desc: 'תן לאוואן ליצור עבורך עולמות קסומים וסיפורים מרתקים בהתאמה אישית.' },
        { id: 'image', title: 'יצירת תמונות', desc: 'הפוך את הדמיון למציאות עם מחולל התמונות המתקדם שלנו.' },
        { id: 'edit', title: 'עריכת תמונות', desc: 'כלים מקצועיים לעריכה ושיפור תמונות בקלות ובמהירות.' },
        { id: 'code', title: 'יצירת קוד', desc: 'עוזר תכנות חכם לכתיבת קוד נקי, יעיל ומהיר.' },
        { id: 'bot', title: 'בוט AI', desc: 'בן שיחה אינטליגנטי לכל שאלה, בעיה או סתם בשביל הכיף.' },
    ];

    const handleFeatureClick = (feature) => {
        setActiveFeature(feature);
    };

    const closeModal = () => {
        setActiveFeature(null);
    };

    const handleGuestEntry = () => {
        navigate('/terms');
    };

    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-bg">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <div className="blob blob-3"></div>
                </div>

                <div className="hero-content">
                    <h1 className="title-ivan">Avan</h1>

                    <div className="cards-container">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="feature-card"
                                onClick={() => handleFeatureClick(feature)}
                            >
                                {feature.title}
                            </div>
                        ))}
                    </div>

                    <div className="auth-buttons">
                        <div className="auth-row">
                            <button className="btn btn-primary" onClick={() => navigate('/login')}>התחברות</button>
                            <button className="btn btn-outline" onClick={() => navigate('/signup')}>הרשמה</button>
                        </div>
                        <button className="btn btn-guest" onClick={handleGuestEntry}>היכנס כאורח</button>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {activeFeature && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <X size={24} />
                        </button>
                        <h3>{activeFeature.title}</h3>
                        <p>{activeFeature.desc}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
