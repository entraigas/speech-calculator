function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

 function isString(value) {
  return (typeof value === 'string' || value instanceof String);
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  let ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

function isNumeric(value) {
  if (!isString(value)) {
    return false // we only process strings!
  }
  return !isNaN(value) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      && !isNaN(parseFloat(value)) // ...and ensure strings of whitespace fail
}

function isEmpty(value) {
  // check for empty values
  if(value === '' || value === false || value === null || value === undefined) {
    return true;
  }

  // check for empty array
  if(isArray(value) && value.length === 0) {
    return true;
  }

  // check for empty object
  if(isPlainObject(value) && Object.keys().length === 0) {
    return true;
  }

  return false;
}

function has(obj, key) {
  return (isObject(obj) && obj.hasOwnProperty(key))
}

function size(value) {
  if (isString(value) || isArray(value)) {
    return value.length;
  }
  if (isPlainObject(value)) {
    return Object.keys(value);
  }
  return 0;
}

const isDigit = (value) => {
  const arrDigits = Array.from('1234567890');
  return arrDigits.includes(value);
}

function getLastChar(string) {
  return string.slice(-1);
}

export {isString, isArray, isObject, isPlainObject, isNumeric, isEmpty, isFunction, has, size, isDigit, getLastChar};
