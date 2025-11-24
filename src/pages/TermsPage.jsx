import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
<p>אנא אשר את התנאים והמדיניות כדי להמשיך</p>
                </div >

                <div className="terms-content">
                    {legalText}
                </div>

                <div className="terms-actions">
                    <button className="btn-agree" onClick={() => navigate('/home')}>הסכם להכל</button>

                    <div className="btn-close-container">
                        <button className="btn-close" onClick={() => navigate('/')}>
                            <span>יציאה</span>
                            <X size={24} />
                        </button>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default TermsPage;
