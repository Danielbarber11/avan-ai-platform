import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AccessibilityStatement = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                }}
            >
                <ArrowRight /> חזרה
            </button>

            <h1>הצהרת נגישות</h1>
            <p>אייבן AI מחויבת לספק אתר נגיש לקהל הרחב ככל האפשר, ללא קשר לטכנולוגיה או ליכולת פיזית.</p>

            <h2>רמת הנגישות</h2>
            <p>אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013.</p>
            <p>התאמות הנגישות בוצעו עפ"י המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.0 הבינלאומי.</p>

            <h2>תיקונים והתאמות שבוצעו</h2>
            <ul>
                <li>האתר מותאם לכל סוגי הדפדפנים המודרניים.</li>
                <li>האתר מותאם לכל סוגי הפלטפורמות - מובייל, טאבלטים ודסקטופ.</li>
                <li>האתר מותאם לאנשים עם לקות ראייה - אפשרות להגדלת טקסט ושינוי ניגודיות.</li>
                <li>האתר מותאם לניווט מקלדת.</li>
            </ul>

            <h2>יצירת קשר</h2>
            <p>אם נתקלתם בבעיה בנושא נגישות, נשמח לקבל משוב ולתקן בהקדם.</p>
            <p>אימייל: accessibility@ivan.ai</p>
        </div>
    );
};

export default AccessibilityStatement;
