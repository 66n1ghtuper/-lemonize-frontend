import React, { useState, useEffect, useRef } from 'react';
import './CreateCompany.css';

const CreateCompany = () => {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedObjectives, setSelectedObjectives] = useState([]);
  

  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);
  const [language, setLanguage] = useState([]);
  const [interests, setInterests] = useState([]);
  const [customAudiences, setCustomAudiences] = useState([]);
  const [showCustomAudienceInput, setShowCustomAudienceInput] = useState(false);
  const [newCustomAudience, setNewCustomAudience] = useState('');
  

  const [title, setTitle] = useState('');
  const [videoFormat, setVideoFormat] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [contentType, setContentType] = useState('');
  

  const [budget, setBudget] = useState(50);

  const objectives = [
    "Awareness",
    "Traffic",
    "Engagement",
    " Video Views",
    "Lead Generation",
    "App Installs ",
    "Conversions",
    "Catalog sales",
    "Store visits"
  ];

  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
  const genders = ["Man", "Woman", "Other"];
  const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Brazil",
    "India",
    "China",
    "Russia",
    "South Africa",
    "Mexico",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "Finland",
    "New Zealand",
    "Argentina",
    "Chile",
    "Turkey",
    "Saudi Arabia",
    "United Arab Emirates",
    "Singapore",
    "South Korea",
    "Thailand",
    "Vietnam",
    "Malaysia",
    "Philippines",
    "Indonesia",
    "Egypt",
    "Nigeria",
    "Kenya",
    "Colombia",
    "Peru",
    "Iraq",
    "Iran",
    "Bangladesh",
    "Pakistan",
    "Other"
  ];  
  const languages = ["English", "Spanish", "French", "German", "Japanese", "Other"];
  const interestsList = ["Sports", "Music", "Travel", "Gaming", "Reading", "Cooking", "Technology"];
  const videoFormats = ["Square (1:1)", "Vertical (9:16)"];
  const contentTypes = ["Video", "Static"];

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

  const handleAddCustomAudience = () => {
    if (newCustomAudience.trim() && !customAudiences.includes(newCustomAudience)) {
      setCustomAudiences([...customAudiences, newCustomAudience]);
      setNewCustomAudience('');
      setShowCustomAudienceInput(false);
    }
  };

  const handleRemoveCustomAudience = (audience) => {
    setCustomAudiences(customAudiences.filter(item => item !== audience));
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
        <button 
          className={`platform-btn ${selectedPlatform === 'tiktok' ? 'active' : ''}`}
          onClick={() => setSelectedPlatform('tiktok')}
        >
          TikTok
        </button>
        <button 
          className={`platform-btn ${selectedPlatform === 'snapchat' ? 'active' : ''}`}
          onClick={() => setSelectedPlatform('snapchat')}
        >
          Snapchat
        </button>
        <button 
          className={`platform-btn ${selectedPlatform === 'meta' ? 'active' : ''}`}
          onClick={() => setSelectedPlatform('meta')}
        >
          Meta
        </button>
      </div>

      {selectedPlatform && (
        <div className="objectives-container">
          <h3>Select Objectives</h3>
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
        </div>
      )}

      <div className="navigation-buttons">
        <div></div> {/* Empty div for spacing */}
        <button 
          className="next-btn" 
          onClick={() => setStep(2)}
          disabled={!selectedPlatform || selectedObjectives.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
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
        <div className="custom-audiences-container">
          {customAudiences.map((audience, index) => (
            <div key={index} className="custom-audience-tag">
              {audience}
              <button 
                className="remove-audience-btn"
                onClick={() => handleRemoveCustomAudience(audience)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {showCustomAudienceInput ? (
          <div className="add-audience-input">
            <input
              type="text"
              value={newCustomAudience}
              onChange={(e) => setNewCustomAudience(e.target.value)}
              placeholder="Enter audience name"
            />
            <button 
              className="add-audience-btn"
              onClick={handleAddCustomAudience}
            >
              Add
            </button>
            <button 
              className="cancel-audience-btn"
              onClick={() => setShowCustomAudienceInput(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            className="add-custom-audience-btn"
            onClick={() => setShowCustomAudienceInput(true)}
          >
            + Add Custom Audience
          </button>
        )}
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={() => setStep(1)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => setStep(3)}
          disabled={age.length === 0 || gender.length === 0 || country.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
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
        <button className="back-btn" onClick={() => setStep(2)}>
          Back
        </button>
        <button 
          className="next-btn"
          onClick={() => setStep(4)}
          disabled={!title || !contentType || !videoFormat || !websiteUrl}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h2>Budget</h2>
      
      <div className="summary-section">
        <h3>Campaign Summary</h3>
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
            <strong>Custom Audiences:</strong> {customAudiences.join(', ')}
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
        </div>
      </div>

      <div className="form-group">
        <label>Budget & Forecast (${budget})</label>
        <input 
          type="range" 
          min="50" 
          max="10000000" 
          step="50"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <div className="budget-range">
          <span>$50</span>
          <span>$10,000,000</span>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={() => setStep(3)}>
          Back
        </button>
        <button 
          className="submit-btn"
          onClick={() => alert('Campaign submitted successfully!')}
        >
          Launch Review
        </button>
      </div>
    </div>
  );

  return (
    <div className="campaign-form-container">
      <div className="form-content">
        <h1>Create New Campaign</h1>
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
        </div>
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default CreateCompany;