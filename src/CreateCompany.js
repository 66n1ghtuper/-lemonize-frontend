import React, { useState, useEffect, useRef } from 'react';
import './CreateCompany.css';


import tiktokIcon from './r4.png';
import snapchatIcon from './r5.png';
import metaIcon from './r6.png';

const CreateCompany = () => {
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

 
  const platforms = [
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: tiktokIcon,
      color: '#000000', 
      activeColor: '#FE2C55', 
      gradient: 'linear-gradient(135deg,rgb(242, 24, 24) 0%,rgb(226, 74, 74) 100%)', 
      shadow: '0 8px 24px rgba(255, 0, 0, 0.52)', 
      particles: ['#000000', '#FE2C55', '#FFFFFF'] 
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: snapchatIcon,
      color: '#FFFC00', 
      activeColor: '#FFEA00',
      gradient: 'linear-gradient(135deg, #FFFC00 0%, #FFD700 100%)', 
      shadow: '0 8px 24px rgba(255, 255, 0, 0.5)', 
      particles: ['#FFFC00', '#FFD700', '#FFFFFF'] 
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
  const genders = ["Man", "Woman", "Other"];
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

  useEffect(() => {
    const calculatedTotal = dailyBudget * campaignDays;
    setTotalBudget(calculatedTotal);
    
   
    if (calculatedTotal < 50) {
      setBudgetError('Minimum total budget is $50');
    } else if (calculatedTotal > 10000000) {
      setBudgetError('Maximum total budget is $10,000,000');
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

  const handleSelectAll = () => {
    if (selectedObjectives.length === objectives.length) {
      setSelectedObjectives([]);
    } else {
      setSelectedObjectives([...objectives]);
    }
  };

  const handleMultiSelect = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const MultiSelectDropdown = ({ label, options, selected, onSelect }) => {
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

    const toggleOption = (option) => {
      onSelect(option);
    };

    return (
      <div className="form-group" ref={dropdownRef}>
        <label>{label}</label>
        <div 
          className={`multi-select-dropdown ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="selected-options">
            {selected.length > 0 ? selected.join(', ') : 'Select options...'}
          </div>
          <div className={`dropdown-options ${isOpen ? 'visible' : ''}`}>
            {options.map((option, index) => (
              <div 
                key={index} 
                className={`option ${selected.includes(option) ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option);
                }}
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
              '--platform-active-color': platform.activeColor
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
          onClick={() => setStep(2)}
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
      <div className="select-all">
        <input 
          type="checkbox" 
          id="selectAll"
          checked={selectedObjectives.length === objectives.length}
          onChange={handleSelectAll}
        />
        <label htmlFor="selectAll">Select All</label>
      </div>
      <div className="objectives-list">
        {objectives.map((objective, index) => (
          <div key={index} className="objective-item">
            <input
              type="checkbox"
              id={`objective-${index}`}
              checked={selectedObjectives.includes(objective)}
              onChange={() => handleObjectiveSelect(objective)}
            />
            <label htmlFor={`objective-${index}`}>{objective}</label>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={() => setStep(1)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => setStep(3)}
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
      />

      <div className="form-group">
        <label>Custom Audiences</label>
        <input
          type="text"
          value={customAudiences}
          onChange={(e) => setCustomAudiences(e.target.value)}
          placeholder="Enter custom audiences, separated by commas"
        />
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={() => setStep(2)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => setStep(4)}
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
        <button className="back-btn" onClick={() => setStep(3)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => setStep(5)}
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
      setDailyBudget(value);
    };

    const handleDailyBudgetSliderChange = (e) => {
      setDailyBudget(parseInt(e.target.value));
    };

    const handleDaysChange = (e) => {
      const value = e.target.value === "" ? "" : parseInt(e.target.value) || 0;
      setCampaignDays(value);
    };

    const handleDaysSliderChange = (e) => {
      setCampaignDays(parseInt(e.target.value));
    };

    const handleBlur = () => {
      if (campaignDays === "" || campaignDays < 1) {
        setCampaignDays(1);
      } else if (campaignDays > 365) {
        setCampaignDays(365);
      }
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(amount);
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
                  min="1"
                  max="10000000"
                  value={dailyBudget === "" ? "" : dailyBudget}
                  onChange={handleDailyBudgetChange}
                  className="budget-input"
                  placeholder={dailyBudget === "" ? "Enter amount" : ""}
                  onWheel={(e) => e.target.blur()}
                />
                <input
                  type="range"
                  min="1"
                  max="10000000"
                  value={dailyBudget || 0}
                  onChange={handleDailyBudgetSliderChange}
                  className="budget-slider"
                />
              </div>
              <div className="budget-range">
                <span>Min: $1</span>
                <span>Max: $10,000,000</span>
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
                  onBlur={handleBlur}
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
          <button className="back-btn" onClick={() => setStep(4)}>
            Back
          </button>
          <button 
            className="next-btn"
            onClick={() => setStep(6)}
            disabled={!!budgetError || (dailyBudget || 0) * (campaignDays || 0) < 50 || (dailyBudget || 0) * (campaignDays || 0) > 10000000}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderStep6 = () => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(amount);
    };

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
          <button className="back-btn" onClick={() => setStep(5)}>
            Back
          </button>
          <button 
            className="submit-btn"
            onClick={() => alert(`Campaign submitted successfully with total budget of ${formatCurrency(totalBudget)}!`)}
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
        <h1>Create New Campaign</h1>
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
      </div>
    </div>
  );
};

export default CreateCompany;



