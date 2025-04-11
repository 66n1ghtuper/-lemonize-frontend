import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="lemonize-section">
        <h2><span className="emoji">🚀</span> What is Lemonize?</h2>
        <p>Lemonize is an all-in-one media buying platform that empowers businesses of all sizes to create, launch, and optimize ad campaigns across top social media channels — including Meta (Facebook, Instagram, WhatsApp), TikTok, and Snapchat — all through a simple, centralized Portal or App.</p>

        <h2><span className="emoji">🌟</span> Why Lemonize?</h2>
        <ul>
          <li><strong>✅ Multi-Platform Ad Creation</strong><br/>
          Easily build and launch campaigns across three major social platforms from a single dashboard — no need to switch between tools.</li>
          
          <li><strong>✅ Smart Campaign Management</strong><br/>
          Define campaign goals (e.g. Awareness, Traffic, Conversions), target precise audiences, set budgets, and monitor performance in real-time.</li>
          
          <li><strong>✅ Unified Dashboard</strong><br/>
          View campaign results and key metrics like reach, CPM, CPR, conversion rates — all in one place, across all connected platforms.</li>
          
          <li><strong>✅ Built for Teams & Agencies</strong><br/>
          Manage enterprise accounts with multi-user roles (Admin, Manager, Analyst), secure access, and agency tools for streamlined collaboration.</li>
          
          <li><strong>✅ Easy Sign-Up for All</strong><br/>
          Individuals can get started with just an email and phone number.<br/>
          Businesses can register with company details like CR, VAT, and payment info.</li>
        </ul>

        <h2><span className="emoji">🧠</span> Powerful Ad Tools</h2>
        <ul>
          <li><strong>Dynamic Creative</strong><br/>
          Automatically deliver the best-performing ad versions using AI-based optimization.</li>
          
          <li><strong>Custom Audiences</strong><br/>
          Retarget users who've engaged with your brand or content before.</li>
          
          <li><strong>A/B Testing</strong><br/>
          Compare different creatives and strategies to learn what works best.</li>
          
          <li><strong>Demographic & Interest Targeting</strong><br/>
          Reach people based on age, location, gender, lifestyle, and behavior.</li>
        </ul>

        <h2><span className="emoji">💳</span> Flexible Payment & Wallet System</h2>
        <p>Add/Withdraw funds via Visa, MasterCard, or Mada (Saudi Arabia's national payment network).<br/>
        Seamlessly manage budgets, refunds, and top-ups through a built-in wallet system.</p>

        <h2><span className="emoji">🔒</span> Secure & Scalable</h2>
        <p>Full authentication system with role-based access<br/>
        Data export, 2FA security, and API integrations<br/>
        Designed to scale for startups and enterprise advertisers alike</p>
      </div>
    </div>
  );
};

export default Dashboard;