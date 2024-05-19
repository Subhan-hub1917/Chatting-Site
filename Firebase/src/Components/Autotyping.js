import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutoTyping = () => {
  const [typingText, setTypingText] = useState("");
  const words = [ 'Friends', 'Purpose','Privacy'];
  const typingSpeed = 250; // Decreased typing speed to 50 milliseconds
  const deletingSpeed = 250; // Speed of deleting in milliseconds
  const delay = 1200; // Delay before typing starts in milliseconds

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typingTimeout;

    const type = () => {
      const currentWord = words[currentIndex];
      let newTypingText = '';

      if (isDeleting) {
        currentText = currentWord.substring(0, currentText.length - 1);
      } else {
        currentText = currentWord.substring(0, currentText.length + 1);
      }

      newTypingText = currentText;
      setTypingText(newTypingText);

      if (!isDeleting && currentText === currentWord) {
        isDeleting = true;
        typingTimeout = deletingSpeed;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % words.length;
        typingTimeout = delay;
      } else {
        typingTimeout = isDeleting ? deletingSpeed : typingSpeed;
      }

      setTimeout(type, typingTimeout);
    };

    setTimeout(type, delay);

    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <div className="container">
      <h4>Let' Communicate With <span className='text-Purple'> {typingText}   </span></h4>
    </div>
  );

  }
  export default AutoTyping;