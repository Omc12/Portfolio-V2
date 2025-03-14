import React from 'react'
import DecryptedText from './imports/DecryptingText/DecryptingText'

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
        <h3 id='h32'>About Me?</h3>
      </div>
      <div className='section7Tail'>
        <p id='plus'>+</p>
        <p>2025 © All rights reserved.</p>
        <p id='plus'>+</p>
      </div>
    </div>
  )
}

export default KnowMore;
