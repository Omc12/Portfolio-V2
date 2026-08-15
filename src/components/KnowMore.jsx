import React from 'react'
import DecryptedText from './utils/DecryptingText/DecryptingText'

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <p 
      onClick={scrollToTop} 
      style={{ cursor: 'pointer', color: 'black' }}
    >
      Back to Top
    </p>
  );
};

const KnowMore = () => {
  return (
    <div className='Section7'>
      <div className='section7Head'>
        <p id='plus'>+</p>
        <BackToTop />
        <p id='plus'>+</p>
      </div>
      <div className='section7Sub'>
        <h3 id='h31'>Want To</h3>
        <h2>
          <DecryptedText 
            text='know more'
            speed={60}
            maxIterations={10}
            characters="know more"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
          />
        </h2>
        <h3 id='h32' >About Me?</h3>
      </div>
      <div className="resumeDownloadContainer">
        <a 
          href="/Resume-Om_Chimurkar.pdf" 
          download="Resume-Om_Chimurkar.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="resumeDownloadBtn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download Resume</span>
        </a>
      </div>
      <div className='section7Tail'>
        <p id='plus'>+</p>
        <p>2026 © Om Chimurkar. All rights reserved.</p>
        <p id='plus'>+</p>
      </div>
    </div>
  )
}

export default KnowMore;
