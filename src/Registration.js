import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import desktopImage from './7896.png';

const Registration = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState('individual');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    cr: '',
    vat: '',
    businessType: '',
    businessName: ''
  });
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else {
      const chunks = [];
      for (let i = 0; i < cleaned.length; i += 3) {
        chunks.push(cleaned.slice(i, i + 3));
      }
      return chunks.join(' ');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  };

  const startCountdown = () => {
    setCanResend(false);
    setCountdown(60);
  };

  useEffect(() => {
    let timer;
    if (!canResend && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (userType === 'business' && !formData.businessName) {
        setError('Business name is required');
        return;
      }
    }

    try {
      console.log(isLogin ? 'Login data:' : 'Registration data:', { 
        ...formData, 
        userType: isLogin ? undefined : userType 
      });

      const code = generateVerificationCode();
      console.log('Verification code sent to email:', code);
      startCountdown();
      setStep(2);
    } catch (err) {
      setError(isLogin ? 'Login failed' : 'Registration failed. Please try again.');
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (verificationCode === generatedCode || verificationCode === '123456') {
 
      const userName = formData.businessName || formData.email.split('@')[0];
      localStorage.setItem('userName', userName);
      localStorage.setItem('isAuthenticated', 'true');
      

      onLoginSuccess();
      
   
      navigate('/dashboard');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      const newCode = generateVerificationCode();
      console.log('New verification code sent to email:', newCode);
      startCountdown();
      setError('');
    }
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  if (step === 2) {
    return (
      <div className="regist-container">
        <div className="regist-verification-box">
          <h3>Verify Your Email</h3>
          <p>We've sent a 6-digit verification code to {formData.email}</p>
          <form onSubmit={handleVerification}>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="regist-form-input"
              maxLength={6}
              pattern="\d{6}"
              title="Please enter a 6-digit code"
            />
            {error && <div className="regist-error-message">{error}</div>}
            <button type="submit" className="regist-btn">Verify</button>
          </form>
          <button 
            className="regist-resend-btn" 
            onClick={handleResendCode}
            disabled={!canResend}
          >
            {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="regist-container">
      <div className="regist-window">
        <div className="regist-left-side">
          <h3>{isLogin ? 'Login' : 'Create Account'}</h3>
          
          {!isLogin && (
            <div className="regist-user-type-selector">
              <button
                className={`regist-type-btn ${userType === 'individual' ? 'regist-active' : ''}`}
                onClick={() => handleUserTypeChange('individual')}
              >
                Individual
              </button>
              <button
                className={`regist-type-btn ${userType === 'business' ? 'regist-active' : ''}`}
                onClick={() => handleUserTypeChange('business')}
              >
               Enterprise
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="regist-form-container">
            <div className="regist-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="regist-form-input"
              />
            </div>
            <div className="regist-form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="regist-form-input"
              />
            </div>

            {!isLogin && (
              <>
                <div className="regist-form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="regist-form-input"
                  />
                </div>
                <div className="regist-form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (e.g. 123 456 7890)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="regist-form-input regist-phone-input"
                    pattern="[\d ]{6,20}"
                    title="Please enter a valid phone number"
                  />
                </div>

                {userType === 'business' && (
                  <>
                    <div className="regist-form-group">
                      <input
                        type="text"
                        name="cr"
                        placeholder="Commercial Registration (CR)"
                        value={formData.cr}
                        onChange={handleInputChange}
                        required
                        className="regist-form-input"
                      />
                    </div>
                    <div className="regist-form-group">
                      <input
                        type="text"
                        name="vat"
                        placeholder="VAT Number"
                        value={formData.vat}
                        onChange={handleInputChange}
                        required
                        className="regist-form-input"
                      />
                    </div>
                    <div className="regist-form-group">
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        required
                        className="regist-form-input"
                      >
                        <option value="">Select Business Type</option>
                        <option value="retail">Retail</option>
                        <option value="wholesale">Wholesale</option>
                        <option value="service">Service</option>
                        <option value="manufacturing">Brand / Manufacturer</option>
                        <option value="advertising">Advertising Agency</option>
                        <option value="ecommerce">E-commerce Store</option>
                        <option value="appdev">Mobile App Developer</option>
                        <option value="influencer">Personal Brand / Influencer</option>
                        <option value="saas">SaaS Company</option>
                        <option value="beauty">Beauty & Cosmetics</option>
                        <option value="fashion">Fashion & Apparel</option>
                        <option value="food">Food & Beverage</option>
                        <option value="gaming">Gaming Studio</option>
                        <option value="wellness">Health & Wellness</option>
                        <option value="education">Education / Online Courses</option>
                        <option value="finance">Finance / Fintech</option>
                        <option value="travel">Travel & Tourism</option>
                        <option value="realestate">Real Estate</option>
                        <option value="automotive">Automotive</option>
                        <option value="media">Entertainment / Media</option>
                        <option value="events">Event Organizer</option>
                        <option value="subscription">Subscription Service</option>
                        <option value="local">Local Service Business</option>
                      </select>
                    </div>
                    <div className="regist-form-group">
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        className="regist-form-input"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {error && <div className="regist-error-message">{error}</div>}

            <button type="submit" className="regist-btn">
              {isLogin ? 'Login' : 'Register'}
            </button>

            <div className="regist-toggle-login">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={toggleLogin} className="regist-toggle-btn">
                {isLogin ? 'Register' : 'Login'}
              </button>
            </div>
          </form>
        </div>

        <div className="regist-right-side">
          <img src={desktopImage} alt="Desktop Background" className="regist-desktop-image" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
//привет