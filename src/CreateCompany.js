import React, { useState, useEffect, useRef } from 'react';
import './CreateCompany.css';

import tiktokIcon from './r4.png';
import snapchatIcon from './r5.png';
import metaIcon from './r6.png';

const CreateCompany = () => {

  const loadStateFromURL = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const stateParam = params.get('state');
      if (!stateParam) {
        console.log('No state parameter in URL');
        return null;
      }
      
      const decoded = decodeURIComponent(stateParam);
      if (!decoded) {
        console.log('Failed to decode state parameter');
        return null;
      }
      
      const parsed = JSON.parse(decoded);
      console.log('Parsed state from URL:', parsed);
      
      if (typeof parsed !== 'object' || parsed === null) {
        console.error('Invalid state format');
        return null;
      }
      
      return parsed;
    } catch (e) {
      console.error('Error loading state from URL:', e);
      return null;
    }
  };

  // Функция для сохранения состояния в URL
  const saveStateToURL = (state) => {
    const fullState = {
      campaign_step: step,
      campaign_platform: selectedPlatform,
      campaign_objectives: selectedObjectives,
      campaign_age: age,
      campaign_gender: gender,
      campaign_country: country,
      campaign_language: language,
      campaign_interests: interests,
      campaign_customAudiences: customAudiences,
      campaign_title: title,
      campaign_videoFormat: videoFormat,
      campaign_websiteUrl: websiteUrl,
      campaign_contentType: contentType,
      campaign_dailyBudget: dailyBudget,
      campaign_campaignDays: campaignDays,
      campaign_totalBudget: totalBudget,
      ...state
    };
    
    // Удаляем только полностью пустые значения
    const cleanedState = Object.fromEntries(
      Object.entries(fullState).filter(([_, value]) => 
        value !== null && value !== undefined && 
        (typeof value !== 'string' || value.trim() !== '') &&
        (!Array.isArray(value) || value.length > 0)
      )
    );
    
    try {
      const params = new URLSearchParams();
      params.set('state', encodeURIComponent(JSON.stringify(cleanedState)));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
      console.log('Saved state to URL:', newUrl);
    } catch (e) {
      console.error('Error saving state to URL:', e);
    }
  };


  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedObjectives, setSelectedObjectives] = useState([]);
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);
  const [language, setLanguage] = useState([]);
  const [interests, setInterests] = useState([]);
  const [customAudiences, setCustomAudiences] = useState('');
  const [title, setTitle] = useState('');
  const [videoFormat, setVideoFormat] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [contentType, setContentType] = useState('');
  const [dailyBudget, setDailyBudget] = useState(50);
  const [campaignDays, setCampaignDays] = useState(7);
  const [totalBudget, setTotalBudget] = useState(350);
  const [budgetError, setBudgetError] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

 
  useEffect(() => {
    const urlState = loadStateFromURL();
    console.log('Loaded state from URL:', urlState);
    
    if (urlState) {
      if (urlState.campaign_step !== undefined) setStep(urlState.campaign_step);
      if (urlState.campaign_platform !== undefined) setSelectedPlatform(urlState.campaign_platform);
      if (urlState.campaign_objectives !== undefined) setSelectedObjectives(urlState.campaign_objectives);
      if (urlState.campaign_age !== undefined) setAge(urlState.campaign_age);
      if (urlState.campaign_gender !== undefined) setGender(urlState.campaign_gender);
      if (urlState.campaign_country !== undefined) setCountry(urlState.campaign_country);
      if (urlState.campaign_language !== undefined) setLanguage(urlState.campaign_language);
      if (urlState.campaign_interests !== undefined) setInterests(urlState.campaign_interests);
      if (urlState.campaign_customAudiences !== undefined) setCustomAudiences(urlState.campaign_customAudiences);
      if (urlState.campaign_title !== undefined) setTitle(urlState.campaign_title);
      if (urlState.campaign_videoFormat !== undefined) setVideoFormat(urlState.campaign_videoFormat);
      if (urlState.campaign_websiteUrl !== undefined) setWebsiteUrl(urlState.campaign_websiteUrl);
      if (urlState.campaign_contentType !== undefined) setContentType(urlState.campaign_contentType);
      if (urlState.campaign_dailyBudget !== undefined) setDailyBudget(urlState.campaign_dailyBudget);
      if (urlState.campaign_campaignDays !== undefined) setCampaignDays(urlState.campaign_campaignDays);
      if (urlState.campaign_totalBudget !== undefined) setTotalBudget(urlState.campaign_totalBudget);
    }
  }, []);


  useEffect(() => {
    saveStateToURL();
  }, [
    step, selectedPlatform, selectedObjectives, age, gender, country, language,
    interests, customAudiences, title, videoFormat, websiteUrl, contentType,
    dailyBudget, campaignDays, totalBudget
  ]);


  useEffect(() => {
    const handlePopState = () => {
      const urlState = loadStateFromURL();
      if (urlState && urlState.campaign_step !== undefined) {
        setStep(urlState.campaign_step);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const goToStep = (newStep) => {
    setStep(newStep);
  };

  const platforms = [
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: tiktokIcon,
      color: '#FF3D00',
      activeColor: '#FF5722',
      gradient: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(255, 87, 34, 0.8) 100%)',
      shadow: '0 8px 24px rgba(255, 87, 34, 0.5)',
      particles: ['#FF3D00', '#FF5722', '#FFFFFF']
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: snapchatIcon,
      color: '#FFC300',
      activeColor: '#FFB700',
      gradient: 'linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(130, 126, 0) 100%)',
      shadow: '0 8px 24px rgba(130, 126, 0, 0.5)',
      particles: ['#FFC300', '#FFD700', '#FFFFFF']
    },
    {
      id: 'meta',
      name: 'Meta',
      icon: metaIcon,
      color: '#1877F2', 
      activeColor: '#4A90E2',
      gradient: 'linear-gradient(135deg, #1877F2 0%, #4A90E2 100%)', 
      shadow: '0 8px 24px rgba(24, 119, 242, 0.5)', 
      particles: ['#1877F2', '#4A90E2', '#FFFFFF'] 
    }
  ];
  
  const objectives = [
    "Awareness",
    "Traffic",
    "Engagement",
    "Video Views",
    "Lead Generation",
    "App Installs",
    "Conversions",
    "Catalog sales",
    "Store visits"
  ];

  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
  const genders = ["Man", "Woman"];
  const countries = [
    "USA", "Canada", "UK", "Germany", "France", "Japan", "Australia", 
    "Brazil", "India", "China", "Russia", "South Africa", "Mexico", 
    "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Finland", 
    "New Zealand", "Argentina", "Chile", "Turkey", "Saudi Arabia", 
    "United Arab Emirates", "Singapore", "South Korea", "Thailand", 
    "Vietnam", "Malaysia", "Philippines", "Indonesia", "Egypt", 
    "Nigeria", "Kenya", "Colombia", "Peru", "Iraq", "Iran", 
    "Bangladesh", "Pakistan", "Other"
  ];  
  const languages = ["English", "Spanish", "French", "German", "Japanese", "Other"];
  const interestsList = ["Sports", "Music", "Travel", "Gaming", "Reading", "Cooking", "Technology"];
  const videoFormats = ["Square (1:1)", "Vertical (9:16)"];
  const contentTypes = ["Video", "Static"];
  const customAudiencesList = ["Existing Customers", "Website Visitors", "Email Subscribers", "Lookalike Audiences"];

  useEffect(() => {
    const calculatedTotal = dailyBudget * campaignDays;
    setTotalBudget(calculatedTotal);
    
    if (calculatedTotal < 50) {
      setBudgetError('Minimum total budget is $50');
    } else if (calculatedTotal > 36500000) { 
      setBudgetError('Maximum total budget is $36,500,000');
    } else {
      setBudgetError('');
    }
  }, [dailyBudget, campaignDays]);

  const handleObjectiveSelect = (objective) => {
    if (selectedObjectives.includes(objective)) {
      setSelectedObjectives(selectedObjectives.filter(item => item !== objective));
    } else {
      setSelectedObjectives([...selectedObjectives, objective]);
    }
  };

  const handleMultiSelect = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]); 
    }
  };
  
  const MultiSelectDropdown = ({ label, options, selected, onSelect, className, direction = 'down' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleOption = (option, e) => {
      e.stopPropagation();
      onSelect(option);
    };
  
    const handleDropdownToggle = (e) => {
      e.stopPropagation();
      setIsOpen(prev => !prev);
    };
  
    return (
      <div className={`form-group ${className || ''}`} ref={dropdownRef}>
        <label>{label}</label>
        <div 
          className={`multi-select-dropdown ${isOpen ? 'open' : ''}`}
          onClick={handleDropdownToggle}
        >
          <div className="selected-options">
            {selected.length > 0 ? selected.join(', ') : 'Select options...'}
          </div>
          {isOpen && (
            <div 
              className={`dropdown-options ${direction === 'up' ? 'direction-up' : ''} visible`}
              onClick={(e) => e.stopPropagation()}
            >
              {options.map((option, index) => (
                <div 
                  key={index} 
                  className={`option ${selected.includes(option) ? 'selected' : ''}`}
                  onClick={(e) => toggleOption(option, e)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    readOnly
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = () => {
    setShowConfirmationModal(true);
  };

  const confirmSubmission = () => {
   
    window.history.replaceState(null, '', window.location.pathname);
    
    setShowConfirmationModal(false);
    alert(`Campaign submitted successfully with total budget of ${formatCurrency(totalBudget)}!`);

    setStep(1);
    setSelectedPlatform(null);
    setSelectedObjectives([]);
    setAge([]);
    setGender([]);
    setCountry([]);
    setLanguage([]);
    setInterests([]);
    setCustomAudiences('');
    setTitle('');
    setVideoFormat('');
    setWebsiteUrl('');
    setContentType('');
    setDailyBudget(50);
    setCampaignDays(7);
    setTotalBudget(350);
  };

  const ConfirmationModal = () => {
    if (!showConfirmationModal) return null;

    return (
      <div className="lkabin-modal-overlay">
        <div className="lkabin-modal">
          <div className="lkabin-modal-header">
            <h3>Confirm Campaign Creation</h3>
          </div>
          <div className="lkabin-modal-body">
            <p>Are you sure you want to create this campaign with a total budget of {formatCurrency(totalBudget)}?</p>
            <p>This action cannot be undone.</p>
          </div>
          <div className="lkabin-modal-buttons">
            <button 
              className="lkabin-modal-cancel"
              onClick={() => setShowConfirmationModal(false)}
            >
              Cancel
            </button>
            <button 
              className="lkabin-modal-confirm"
              onClick={confirmSubmission}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h2>Select Platform</h2>
      <div className="platform-buttons">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            className={`platform-btn ${selectedPlatform === platform.id ? 'active' : ''}`}
            onClick={() => setSelectedPlatform(platform.id)}
            style={{
              '--platform-color': platform.color,
              '--platform-active-color': platform.activeColor,
              'flex': '1',
              'minWidth': '200px' 
            }}
          >
            <img 
              src={platform.icon} 
              alt={platform.name} 
              className="platform-icon" 
            />
            {platform.name}
          </button>
        ))}
      </div>
  
      <div className="navigation-buttons">
        <div></div>
        <button 
          className="next-btn" 
          onClick={() => goToStep(2)}
          disabled={!selectedPlatform}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h2>Select Objectives</h2>
      <div className="objectives-list">
        {objectives.map((objective, index) => (
          <button 
            key={index} 
            className={`objective-item ${selectedObjectives.includes(objective) ? 'selected' : ''}`}
            onClick={() => handleObjectiveSelect(objective)}
            type="button"
          >
            <div className="objective-checkbox">
              <input
                type="checkbox"
                id={`objective-${index}`}
                checked={selectedObjectives.includes(objective)}
                readOnly
              />
              <span className="checkmark"></span>
            </div>
            <label htmlFor={`objective-${index}`}>{objective}</label>
          </button>
        ))}
      </div>
  
      <div className="navigation-buttons">
        <button className="back-btn" onClick={() => goToStep(1)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => goToStep(3)}
          disabled={selectedObjectives.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h2>Targeting Options</h2>
      
      <MultiSelectDropdown
        label="Age"
        options={ageRanges}
        selected={age}
        onSelect={(option) => handleMultiSelect(option, age, setAge)}
      />
  
      <MultiSelectDropdown
        label="Gender"
        options={genders}
        selected={gender}
        onSelect={(option) => handleMultiSelect(option, gender, setGender)}
      />
  
      <MultiSelectDropdown
        label="Demographic"
        options={countries}
        selected={country}
        onSelect={(option) => handleMultiSelect(option, country, setCountry)}
      />
  
      <MultiSelectDropdown
        label="Language"
        options={languages}
        selected={language}
        onSelect={(option) => handleMultiSelect(option, language, setLanguage)}
      />

      <MultiSelectDropdown
        label="Interests"
        options={interestsList}
        selected={interests}
        onSelect={(option) => handleMultiSelect(option, interests, setInterests)}
        direction="up"
      />

      <MultiSelectDropdown
        label="Custom Audiences"
        options={customAudiencesList}
        selected={customAudiences.split(',').map(item => item.trim()).filter(item => item)}
        onSelect={(option) => {
          const current = customAudiences.split(',').map(item => item.trim()).filter(item => item);
          if (current.includes(option)) {
            setCustomAudiences(current.filter(item => item !== option).join(', '));
          } else {
            setCustomAudiences([...current, option].join(', '));
          }
        }}
        direction="up"
      />
  
      <div className="navigation-buttons">
        <button className="back-btn" onClick={() => goToStep(2)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => goToStep(4)}
          disabled={age.length === 0 || gender.length === 0 || country.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h2>Campaign Details</h2>
      
      <div className="form-group">
        <label>Headline</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter campaign title"
          required
        />
      </div>

      <div className="form-group">
        <label>Content Type</label>
        <select 
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          required
        >
          <option value="">Select content type</option>
          {contentTypes.map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Ad Format</label>
        <select 
          value={videoFormat}
          onChange={(e) => setVideoFormat(e.target.value)}
          required
        >
          <option value="">Select format</option>
          {videoFormats.map((format, i) => (
            <option key={i} value={format}>{format}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Website URL</label>
        <input 
          type="url" 
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://example.com"
          required
        />
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={() => goToStep(3)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => goToStep(5)}
          disabled={!title || !contentType || !videoFormat || !websiteUrl}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => {
    const handleDailyBudgetChange = (e) => {
      const value = e.target.value === "" ? "" : parseInt(e.target.value) || 0;

      const validatedValue = value < 50 ? 50 : value;
      setDailyBudget(validatedValue);
    };

    const handleDailyBudgetBlur = () => {
      if (dailyBudget < 50) {
        setDailyBudget(50);
      } else if (dailyBudget > 100000) {
        setDailyBudget(100000);
      }
    };

    const handleDailyBudgetSliderChange = (e) => {
      const value = parseInt(e.target.value);
      setDailyBudget(value < 50 ? 50 : value);
    };

    const handleDaysChange = (e) => {
      const value = e.target.value === "" ? "" : parseInt(e.target.value) || 0;
      setCampaignDays(value);
    };

    const handleDaysSliderChange = (e) => {
      setCampaignDays(parseInt(e.target.value));
    };

    const handleDaysBlur = () => {
      if (campaignDays === "" || campaignDays < 1) {
        setCampaignDays(1);
      } else if (campaignDays > 365) {
        setCampaignDays(365);
      }
    };

    return (
      <div className="form-step">
        <h2>Budget & Forecast</h2>
        
        <div className="budget-section">
          <div className="budget-row">
            <div className="form-group">
              <label>Budget per day</label>
              <div className="budget-input-container">
                <input
                  type="number"
                  min="50"
                  max="100000"
                  value={dailyBudget === "" ? "" : dailyBudget}
                  onChange={handleDailyBudgetChange}
                  onBlur={handleDailyBudgetBlur}
                  className="budget-input"
                  placeholder={dailyBudget === "" ? "Enter amount" : ""}
                  onWheel={(e) => e.target.blur()}
                />
                <input
                  type="range"
                  min="50"
                  max="100000"
                  value={dailyBudget || 50}
                  onChange={handleDailyBudgetSliderChange}
                  className="budget-slider"
                />
              </div>
              <div className="budget-range">
                <span>Min: $50</span>
                <span>Max: $100,000</span>
              </div>
            </div>

            <div className="form-group">
              <label>Amount of days</label>
              <div className="budget-input-container">
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={campaignDays === "" ? "" : campaignDays}
                  onChange={handleDaysChange}
                  onBlur={handleDaysBlur}
                  className="budget-input"
                  placeholder={campaignDays === "" ? "Enter days" : ""}
                  onWheel={(e) => e.target.blur()}
                />
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={campaignDays || 0}
                  onChange={handleDaysSliderChange}
                  className="budget-slider"
                />
              </div>
              <div className="budget-range">
                <span>Min: 1 day</span>
                <span>Max: 365 days</span>
              </div>
            </div>
          </div>

          {budgetError && (
            <div className="budget-error-message">
              {budgetError}
            </div>
          )}

          <div className="budget-summary">
            <h3>Budget Summary</h3>
            <div className="summary-row">
              <span>Budget per day:</span>
              <span>{dailyBudget === "" ? "$0" : formatCurrency(dailyBudget)}</span>
            </div>
            <div className="summary-row">
              <span>Amount of days:</span>
              <span>{campaignDays === "" ? "0" : campaignDays} days</span>
            </div>
            <div className="summary-row total">
              <span>Total Budget:</span>
              <span>{formatCurrency((dailyBudget || 0) * (campaignDays || 0))}</span>
            </div>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="back-btn" onClick={() => goToStep(4)}>
            Back
          </button>
          <button 
            className="next-btn"
            onClick={() => goToStep(6)}
            disabled={!!budgetError || (dailyBudget || 0) * (campaignDays || 0) < 50 || (dailyBudget || 0) * (campaignDays || 0) > 36500000}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderStep6 = () => {
    return (
      <div className="form-step">
        <h2>Campaign Summary</h2>
        
        <div className="summary-section">
          <div className="summary-grid">
            <div className="summary-item">
              <strong>Platform:</strong> {selectedPlatform}
            </div>
            <div className="summary-item">
              <strong>Objectives:</strong> {selectedObjectives.join(', ')}
            </div>
            <div className="summary-item">
              <strong>Age:</strong> {age.join(', ')}
            </div>
            <div className="summary-item">
              <strong>Gender:</strong> {gender.join(', ')}
            </div>
            <div className="summary-item">
              <strong>Demographic:</strong> {country.join(', ')}
            </div>
            <div className="summary-item">
              <strong>Languages:</strong> {language.join(', ')}
            </div>
            <div className="summary-item">
              <strong>Interest:</strong> {interests.join(', ')}
            </div>
            <div className="summary-item">
              <strong>Custom Audiences:</strong> {customAudiences}
            </div>
            <div className="summary-item">
              <strong>Headline:</strong> {title}
            </div>
            <div className="summary-item">
              <strong>Content Type:</strong> {contentType}
            </div>
            <div className="summary-item">
              <strong>Ad Format:</strong> {videoFormat}
            </div>
            <div className="summary-item">
              <strong>Website URL:</strong> {websiteUrl}
            </div>
            <div className="summary-item">
              <strong>Daily Budget:</strong> {formatCurrency(dailyBudget)}
            </div>
            <div className="summary-item">
              <strong>Campaign Duration:</strong> {campaignDays} days
            </div>
            <div className="summary-item">
              <strong>Total Budget:</strong> {formatCurrency(totalBudget)}
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button className="back-btn" onClick={() => goToStep(5)}>
            Back
          </button>
          <button 
            className="submit-btn"
            onClick={handleSubmit}
          >
            Create Company
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="campaign-form-container">
      <div className="form-content">
        <h4>Create New Campaign</h4>
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
          <div className={`progress-step ${step >= 5 ? 'active' : ''}`}>5</div>
        </div>
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}

        <ConfirmationModal />
      </div>
    </div>
  );
};

export default CreateCompany;