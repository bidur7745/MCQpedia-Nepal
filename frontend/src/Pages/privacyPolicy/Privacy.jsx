import React from 'react';
import './privacy.css';

const PrivacyTerms = () => {
  return (
    <div className="privacy-terms-container">
      {/* Privacy Policy Section */}
      <section className="policy-section">
        <h2 className="policy-header">Privacy Policy</h2>
        <p className="last-updated"><strong>Last Updated:</strong> 6 October, 2024</p>
        
        <p className="policy-content">
          This Privacy Policy outlines how <strong>MCQpedia Nepal</strong> collects, uses, and shares information when you access our services.
          By using our website, you agree to the terms described in this Privacy Policy.
        </p>

        <p className="policy-content">
          <strong>Company</strong> ("We," "Us," or "Our") refers to MCQpedia Nepal. <strong>Service</strong> refers to our website and any 
          services offered through it. <strong>Personal Data</strong> includes identifiable information such as email address, first and 
          last names, location details, and usage data. <strong>You/Your</strong> refers to the individual accessing our services.
        </p>

        <p className="policy-content">
          We may request Personal Data to provide and improve our services. This may include your name, email address, and other 
          identifiable information. We use cookies and similar tracking technologies to analyze usage patterns and enhance user experience. 
          You may choose to disable cookies, though some site functionality may be impacted.
        </p>

        <p className="policy-content">
          MCQpedia Nepal may use your data for providing and maintaining our Service, communicating updates, and enhancing user 
          experience and security. Your Personal Data is only shared under limited circumstances such as with third-party providers 
          that assist in delivering our services or in case of business transfers.
        </p>

        <p className="policy-content">
          Your information may be transferred and processed in locations outside your province or country. By providing your data, 
          you consent to this transfer under applicable privacy laws. We retain your data only as long as necessary for the purposes 
          outlined in this Privacy Policy.
        </p>

        <p className="policy-content">
          While we strive to protect your data, no method of transmission or storage is entirely secure. We employ commercially 
          reasonable measures to protect your data but cannot guarantee absolute security.
        </p>

        <p className="policy-footer">
          For questions about this Privacy Policy, contact us at <a href="mailto:siwakoti.bidur7745@gmail.com">siwakoti.bidur7745@gmail.com</a>.
        </p>
      </section>

    </div>
  );
};

export default PrivacyTerms;
