import React from 'react';
import { RevealLinks } from './utils/Links/RevealLinks'; // adjust the import path as needed

const ContactSection = () => {
  return (
    <div className="Section6" id='contact-section'>
      <h2 id="contactHead">Links</h2>
      <div className="links">
        <RevealLinks />
      </div>
    </div>
  );
};

export default ContactSection;
