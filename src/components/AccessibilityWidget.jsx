import React, { useState, useEffect } from 'react';
import { Accessibility, X, RefreshCw } from 'lucide-react';
import './AccessibilityWidget.css';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [contrast, setContrast] = useState('normal');

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        document.body.classList.remove('high-contrast');
        if (contrast === 'high') {
            document.body.classList.add('high-contrast');
        }
    }, [fontSize, contrast]);

    const resetSettings = () => {
        setFontSize(100);
        setContrast('normal');
    };

    return (
        <div className="accessibility-widget">
            <button
                className="accessibility-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="תפריט נגישות"
            >
                <Accessibility size={24} />
            </button>

            {isOpen && (
                <div className="accessibility-menu">
                    <div className="menu-header">
                        <h3>כלי נגישות</h3>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                    </div>

                    <div className="menu-section">
                        <label>גודל טקסט</label>
                        <div className="controls">
                            <button onClick={() => setFontSize(prev => Math.max(80, prev - 10))}>A-</button>
                            <span>{fontSize}%</span>
                            <button onClick={() => setFontSize(prev => Math.min(150, prev + 10))}>A+</button>
                        </div>
                    </div>

                    <div className="menu-section">
                        <label>ניגודיות</label>
                        <div className="controls">
                            <button
                                className={contrast === 'normal' ? 'active' : ''}
                                onClick={() => setContrast('normal')}
                            >
                                רגילה
                            </button>
                            <button
                                className={contrast === 'high' ? 'active' : ''}
                                onClick={() => setContrast('high')}
                            >
                                גבוהה
                            </button>
                        </div>
                    </div>

                    <div className="menu-actions">
                        <button className="btn-reset" onClick={resetSettings}>
                            <RefreshCw size={16} />
                            איפוס הגדרות
                        </button>
                        <a href="/accessibility-statement" className="btn-statement">
                            הצהרת נגישות
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessibilityWidget;
