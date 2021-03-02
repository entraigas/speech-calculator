import React, { useState } from "react";
import Store from "./contexts/store";
import { say } from './lib/SpeachSynth';
import { isEmpty, getLastChar, isDigit } from './lib/utils';
import { useDidMount } from './lib/hooks';
import Keyboard from './components/Keyboard.jsx';
import Panel from './components/Panel.jsx';
import PressButton from './components/PressButton.jsx';
import './App.css';

const arrSpecialChars = Array.from('-+/x');
const allAllowedCharsRegex = new RegExp('^[0-9\\+-x\\/]+$');

function App() {  
  useDidMount(() => {
    document.addEventListener('onSpeechRecognitionText', (evt) => {
      const transcript = evt.detail
        .toLowerCase()
        .replaceAll(' ', '')
        .replaceAll('by','*')
        .replaceAll('minus','-')
        .replaceAll('divided','/');
      if (allAllowedCharsRegex.test(transcript)) {
        setText(transcript);
      }
      // console.log('onSpeechRecognitionText', transcript);
    });
  });
  const [text, setText] = useState('');

  const addText = (char) => {
    // initial state rules
    if (isEmpty(text)) {
      if (isDigit(char) || char === '-' || char === '.') {
        say(char);
        setText( text + char);
      }
      return;
    }
    if (isDigit(char)) {
      // no problems with adding digits
      say(char);
      setText( text + char);
      return;  
    }
    // handle operator overwrite
    const lastChar = getLastChar(text);
    if(arrSpecialChars.includes(lastChar) && arrSpecialChars.includes(char)) {
      // replace
      say(char);
      setText(text.slice(0, -1) + char);
      return;
    }
    if (lastChar === '.' && char === '.') {
      return;
    }
    // has an expression?
    const regex = new RegExp('^-?[0-9]*.?[0-9]*[-+x/][0-9]*.?[0-9]+$');
    if (regex.test(text)) {
      try {
        const newText = eval(text.replaceAll('x', '*')).toString();
        if (char === '=') {
          setText( newText );
          say(newText);
        } else {
          setText( newText + char);
          say(newText + char);
        }
        return;
      } catch {
        console.error(`Could not process ${text}`);
      }
    } else {
      say(char);
      if (char === '=') {
        setText(text);
      } else {
        setText( text + char);
      }
    }
  }

  const removeText = () => {
    setText(text.slice(0, -1));
  }

  const resetText = () => {
    setText('');
  }

  return (
    <Store.Provider value={{ text, add: addText, remove: removeText, reset: resetText}}>
      <div>
        <Panel />
        <Keyboard />
        <PressButton />
      </div>
    </Store.Provider>
  );
}

export default App;
