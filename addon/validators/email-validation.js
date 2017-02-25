import Ember from 'ember';

const emailValidator = (options = {}) => (evt, value, currentState = {}) => {
  const priorState = currentState[options.name];
  let state;
  let code = 'ok';
  let warnError = null;
  let warn;
  let error;
  let createWarnError = (hash) => {
    return Ember.assign({}, {
      validator: options.name,
      currentValue: value,
      message: 'The email is not of a valid format',
    }, hash);
  };

  if(value === null || value === undefined || value === '') {
    state = 'empty';
  }
  else if (value && value.trim().search(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === -1) {
    state = 'invalid';
    code = 'invalid-structure';
    warnError = createWarnError({ state, code });
  } else if (options.domains) {
    // validate against a set number of DNS domains
    const domain = value.trim().replace(/(.*)(\.[a-zA-Z]{2,}$)/, "$2");
    if(Ember.A(options.domains).includes(domain)) {
      state = 'valid';
    } else {
      state = 'invalid';
      code = 'invalid-domain';
      warnError = createWarnError({ state, code })
    }
  } else {
    state = 'valid';
  }

  // Don't DUP errors/warns
  if(state !== priorState) {
    // Let config determine which severity to use
    if(options.errorOnInvalid) {
      error = warnError;
    } else {
      warn = warnError;
    }
  } else {
    state = null;
  }

  console.log('validated to: ', {state, code, priorState, error, warn });
  return { state, code, error, warn };
};

export default emailValidator;