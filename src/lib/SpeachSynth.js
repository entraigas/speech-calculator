const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

const browserSupport = ('speechSynthesis' in window) ? true : false;

function getVoices() {
  return window.speechSynthesis.getVoices();
}

function speak(params) {
  const { text, pitch = 1, rate = 1.4, volume = 1, lang = 'en-US' } = params;
  if(!text) {
    throw new Error('speak() need a text argument');
  }
  const msg = new SpeechSynthesisUtterance();
  // msg.voiceURI = 'native';
  msg.text = text;
  msg.lang = lang;
  msg.pitch = pitch; // 0 to 2
  msg.rate = rate; // 0.1 to 10
  msg.volume = volume; // 0 to 1
  if (isChrome) {
    // fix for chrome!
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.speak(msg);
}

const mapOperations = {
  '-': 'minus',
  '+': 'plus',
  '/': 'divided',
  'x': 'by',
  '=': 'equal',
  '.': 'point',
};
const arrOperations = Object.keys(mapOperations);

const say = (value) => {
  if (arrOperations.includes(value)) {
    const text = mapOperations[value];
    speak({ text });
  } else {
    speak({ text: value });
  }
};

export { browserSupport, getVoices, speak, say };

