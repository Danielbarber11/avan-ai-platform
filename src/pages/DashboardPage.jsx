import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Image, Video, BookOpen, LogOut, Settings, Sparkles } from 'lucide-react';
<Sparkles size={24} style={{ marginRight: '0.5rem', color: '#ec4899' }} />
Avan < span style = {{ fontSize: '0.9rem', opacity: 0.7, marginLeft: '0.5rem' }}> Hub</span >
                </div >
    <div className="nav-actions">
        <button className="nav-btn" title="הגדרות">
            <Settings size={20} />
        </button>
        <button className="nav-btn" title="התנתקות" onClick={() => navigate('/')}>
            <LogOut size={20} />
        </button>
    </div>
            </nav >

    <div className="hub-container">
        <div className="hub-header">
            <h1>ברוך הבא לאוואן</h1>
            <p>בחר את הכלי שברצונך להשתמש בו היום</p>
        </div>

        <div className="tools-grid">
            {tools.map((tool) => (
                <div
                    key={tool.id}
                    className={`tool-card ${!tool.active ? 'disabled' : ''}`}
                    onClick={() => tool.active && navigate(tool.path)}
                >
                    <div className="tool-icon">{tool.icon}</div>
                    <h3>{tool.title}</h3>
                    <p>{tool.desc}</p>
                    {!tool.active && <span className="badge-coming-soon">בקרוב</span>}
                </div>
            ))}
        </div>
    </div>
        </div >
    );
};

export default DashboardPage;
