import React, { useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useWillUnmount, useDidMount, useDidUpdate } from '../lib/hooks';
import { isFunction } from '../lib/utils';

const PressButton = ({ callback }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const pressButtonElement = useRef(null);
  useDidMount(() => {
    if (hasSpeechSupport) {
      pressButtonElement.current.addEventListener('mousedown', pressingDown, false);
      pressButtonElement.current.addEventListener('mouseup', notPressingDown, false);
      pressButtonElement.current.addEventListener('mouseleave', notPressingDown, false);
      pressButtonElement.current.addEventListener('touchstart', pressingDown, false);
      pressButtonElement.current.addEventListener('touchend', notPressingDown, false);
    }
  });
  useWillUnmount(() => {
    if (hasSpeechSupport) {
      pressButtonElement.current.removeEventListener('mousedown', pressingDown);
      pressButtonElement.current.removeEventListener('mouseup', notPressingDown);
      pressButtonElement.current.removeEventListener('mouseleave', notPressingDown);
      pressButtonElement.current.removeEventListener('touchstart', pressingDown);
      pressButtonElement.current.removeEventListener('touchend', notPressingDown);
    }
  });
  useDidUpdate(() => {
    if (hasSpeechSupport) {
      const customEvent = new CustomEvent('onSpeechRecognitionText', {detail: transcript});
      document.dispatchEvent(customEvent);
    }
  }, [transcript]);
  
  let timerID;
  let counter = 0;
  let pressHoldDuration = 15;
  const hasSpeechSupport = SpeechRecognition.browserSupportsSpeechRecognition();


  function pressingDown(e) {
    // Start the timer
    requestAnimationFrame(timer);
    e.preventDefault();
    // console.log('Pressing!');
  }

  function notPressingDown(e) {
    // Stop the timer
    cancelAnimationFrame(timerID);
    counter = 0;
    pressButtonElement.current.style.setProperty('--scale-value', 1);
    pressButtonElement.current.style.setProperty('background-color', '#EEE');
    // console.log('Not pressing!');
    SpeechRecognition.stopListening();
    if (isFunction(callback)) {
      callback(transcript);
    }
    resetTranscript();
  }

  function timer() {
    if (counter < pressHoldDuration) {
      timerID = requestAnimationFrame(timer);
      counter++;
      pressButtonElement.current.style.setProperty('--scale-value', 1 + counter / pressHoldDuration * 0.3 );
    } else {
      pressButtonElement.current.style.setProperty('background-color', 'red');
      SpeechRecognition.startListening();
    }
  }

  if (!hasSpeechSupport) {
    console.warn('SpeechRecognition not supported by this browser!');
    return null;
  }
  return (
    <div className='container'>
      <div ref={pressButtonElement} id='micButton' />
    </div>
  );
};

export default PressButton;
