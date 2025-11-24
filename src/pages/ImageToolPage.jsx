import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Cloud, Settings, LogOut, Send,
    Image as ImageIcon, Download, Share2, Edit,
    History, X, Plus, CheckCircle, AlertTriangle, Key
} from 'lucide-react';
import { saveToCloud, getFromCloud, getApiKey, setApiKey } from '../services/jsonbin';
import './CodeToolPage.css'; // Reusing the layout styles

const ImageToolPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { type: 'bot', content: 'שלום! אני אוואן (Gemini 3). אני כאן כדי לעזור לך ליצור ולערוך תמונות מדהימות.' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [currentImage, setCurrentImage] = useState(null);
    const [isThinking, setIsThinking] = useState(false);
    const [showAd, setShowAd] = useState(false);
    const [adTimer, setAdTimer] = useState(5);
    const [showGallery, setShowGallery] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);
    const [mode, setMode] = useState('create'); // 'create' or 'edit'

    // Key Modal State
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [apiKeyInput, setApiKeyInput] = useState('');

    // Particles effect
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${10 + Math.random() * 20}s`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${5 + Math.random() * 10}px`,
        height: `${5 + Math.random() * 10}px`
    }));

    // Load history on mount
    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const history = await getFromCloud();
        setGalleryImages(history);
    };

    const handleSaveKey = () => {
        if (apiKeyInput.trim()) {
            setApiKey(apiKeyInput.trim());
            setShowKeyModal(false);
            alert('המפתח נשמר בהצלחה! כעת התמונות יישמרו בענן.');
            loadHistory(); // Try to load history with new key
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const newMessages = [...messages, { type: 'user', content: inputMessage }];
        setMessages(newMessages);
        setInputMessage('');
        setIsThinking(true);

        // Simulate Ad logic
        if (Math.random() > 0.7) {
            setShowAd(true);
            setAdTimer(5);
        }

        setTimeout(async () => {
            let botResponse = { type: 'bot', content: 'יוצר תמונה...' };

            // Mock Image Generation
            const mockImageUrl = `https://picsum.photos/800/600?random=${Math.random()}`;

            botResponse.content = 'הנה התמונה שיצרתי עבורך. מה דעתך?';
            setCurrentImage(mockImageUrl);

            // Save to cloud (JSONBin)
            const newImage = {
                url: mockImageUrl,
                prompt: inputMessage,
                timestamp: new Date()
            };

            const result = await saveToCloud(newImage);
            if (!result.success && result.error === 'missing_key') {
                setShowKeyModal(true); // Prompt user for key if missing
            } else if (result.success) {
                setGalleryImages(prev => [newImage, ...prev]);
            }

            setMessages([...newMessages, botResponse]);
            setIsThinking(false);
        }, 3000);
    };

    const handleAdClose = () => {
        if (adTimer === 0) setShowAd(false);
    };

    useEffect(() => {
        let interval;
        if (showAd && adTimer > 0) {
            interval = setInterval(() => setAdTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showAd, adTimer]);

    const handleLogout = () => navigate('/');

    return (
        <div className="home-page">
            <div className="particles-container">
                {particles.map(p => (
                    <div key={p.id} className="particle" style={{
                        left: p.left,
                        width: p.width,
                        height: p.height,
                        animationDuration: p.animationDuration,
                        animationDelay: p.animationDelay
                    }}></div>
                ))}
            </div>

            <nav className="navbar glass-panel">
                <div className="nav-brand">
                    <button className="nav-btn" onClick={() => navigate('/home')} style={{ marginLeft: '1rem' }}>
                        <ArrowRight size={20} />
                    </button>
                    <ImageIcon size={20} style={{ marginRight: '0.5rem', color: '#ec4899' }} />
                    Avan <span style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '0.5rem' }}>Image Studio</span>
                </div>
                <div className="nav-actions">
                    <button className="nav-btn" title="הגדרת מפתח ענן" onClick={() => setShowKeyModal(true)}>
                        <Key size={20} color={getApiKey() ? '#10b981' : '#64748b'} />
                    </button>
                    <button className="nav-btn" title="היסטוריה" onClick={() => setShowGallery(true)}>
                        <History size={20} />
                    </button>
                    <button className="nav-btn" title="התנתקות" onClick={handleLogout}>
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>

            <div className="dashboard-container" style={{ flexDirection: 'row-reverse' }}>
                {/* Preview Area */}
                <div className="preview-area">
                    {showAd && (
                        <div className="ad-overlay">
                            <div className="ad-content">
                                <div className="ad-badge">פרסומת</div>
                                <h2 className="ad-title">Avan Ads</h2>
                                <p className="ad-text">פרסומת זו מממנת את השימוש החינמי שלך.</p>
                                <button className="ad-btn" onClick={handleAdClose} disabled={adTimer > 0}>
                                    {adTimer > 0 ? `אפשר לסגור בעוד ${adTimer}...` : 'סגור פרסומת'}
                                </button>
                                <div className="ad-timer">Avan Safe Ad System</div>
                            </div>
                        </div>
                    )}

                    <div className="preview-header">
                        <div className="preview-title">
                            <ImageIcon size={16} /> תצוגה מקדימה
                        </div>
                        <div className="preview-actions">
                            {currentImage && (
                                <>
                                    <button className="action-btn" title="ערוך תמונה" onClick={() => setMode('edit')}>
                                        <Edit size={14} /> ערוך
                                    </button>
                                    <button className="action-btn" title="שתף">
                                        <Share2 size={14} /> שתף
                                    </button>
                                    <button className="action-btn" title="הורד">
                                        <Download size={14} /> הורד
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="preview-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {isThinking && !showAd ? (
                            <div className="empty-state">
                                <div className="spinner"></div>
                                <p>Gemini 3 יוצר תמונה...</p>
                            </div>
                        ) : currentImage ? (
                            <img src={currentImage} alt="Generated" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }} />
                        ) : (
                            <div className="empty-state" style={{ position: 'relative', width: '100%', height: '100%' }}>
                                {!showAd && (
                                    <>
                                        <div className="hero-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                                            <div className="blob blob-1"></div>
                                            <div className="blob blob-2"></div>
                                        </div>
                                        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                                            <ImageIcon size={64} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                            <p>התמונה שלך תופיע כאן</p>
                                            <div className="ad-placeholder-text" style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#64748b', border: '1px dashed #475569', padding: '1rem', borderRadius: '8px' }}>
                                                שטח פרסום (מופיע כשאין תמונה)
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="chat-interface glass-panel">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.type}`}>
                                <div className={`avatar ${msg.type}`}>
                                    {msg.type === 'user' ? <div className="user-avatar-circle">U</div> : <div className="bot-avatar-circle">AI</div>}
                                </div>
                                <div className="bubble">{msg.content}</div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="message bot">
                                <div className="avatar bot"><div className="bot-avatar-circle">AI</div></div>
                                <div className="bubble" style={{ opacity: 0.7 }}>...</div>
                            </div>
                        )}
                    </div>
                    <div className="chat-input-area">
                        {mode === 'edit' ? (
                            <div className="edit-mode-controls" style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                                <button className="btn-auth" style={{ flex: 1 }} onClick={() => document.getElementById('file-upload').click()}>
                                    <Plus size={16} /> הוסף תמונה לעריכה
                                </button>
                                <input type="file" id="file-upload" hidden onChange={(e) => {
                                    if (e.target.files[0]) {
                                        setCurrentImage(URL.createObjectURL(e.target.files[0]));
                                        setMessages([...messages, { type: 'bot', content: 'תמונה נטענה בהצלחה! מה תרצה לשנות בה?' }]);
                                    }
                                }} />
                                <button className="btn-exit" onClick={() => setMode('create')}>ביטול</button>
                            </div>
                        ) : (
                            <form className="input-wrapper" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder="תאר את התמונה שברצונך ליצור..."
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                />
                                <button type="submit" className="send-btn">
                                    <Send size={20} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Gallery Modal */}
            {showGallery && (
                <div className="modal-overlay" onClick={() => setShowGallery(false)}>
                    <div className="modal-content" style={{ maxWidth: '800px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowGallery(false)}><X size={24} /></button>
                        <h3>הגלריה שלי (ענן)</h3>
                        <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                            {galleryImages.length === 0 ? (
                                <p>עדיין לא יצרת תמונות או שלא הגדרת מפתח ענן.</p>
                            ) : (
                                galleryImages.map((img, idx) => (
                                    <div key={idx} className="gallery-item" onClick={() => { setCurrentImage(img.url); setShowGallery(false); }}>
                                        <img src={img.url} alt="History" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Key Configuration Modal */}
            {showKeyModal && (
                <div className="modal-overlay" onClick={() => setShowKeyModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowKeyModal(false)}><X size={24} /></button>
                        <h3>הגדרת שמירה בענן (JSONBin)</h3>
                        <p>כדי לשמור את התמונות שלך בענן (ולא בדפדפן), עליך להזין מפתח אישי מ-JSONBin.io.</p>
                        <ol style={{ textAlign: 'right', margin: '1rem 0', paddingRight: '1.5rem' }}>
                            <li>הירשם לאתר <a href="https://jsonbin.io" target="_blank" rel="noreferrer">jsonbin.io</a> (חינם).</li>
                            <li>העתק את ה-Master Key מהדשבורד.</li>
                            <li>הדבק אותו כאן למטה.</li>
                        </ol>
                        <input
                            type="text"
                            placeholder="הדבק את ה-Master Key כאן"
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                        <button className="btn-auth" onClick={handleSaveKey}>שמור מפתח</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageToolPage;
