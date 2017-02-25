import Ember from 'ember';
export default class ValidationSet {

  constructor(evt, value, priorValue) {
    this.evt = evt;
    this.value = value;
    this.priorValue = priorValue;
    this.state = {};
    this.code = {};
    this.options = {};
    this.errors = [];
    this.warn = [];
    this.status = {};
  }

  validate(validations) {
    validations.forEach(v => {
      if (!v || !v.name || !v.fn ) {
        console.warn(`Invalid validator passed in. You must have at least a valid name and callback function. Validator passed in: `, v);

        return false;
      }
      const status = v.fn(this.evt, this.value);
      v.callbacks.map(cb => cb(status));
      const { state, code, options, error, warning } = status;
      this.status[v.name] = {
        state,
        code,
        options
      }
      this.state[v.name] = state;
      this.code[v.name] = code;
      this.options[v.name] = options;
      if(warning) {
        this.warn.push(error);
      }
      if(error) {
        this.errors.push(error);
      }
    });
  }

  sendActions(ddau) {
    console.log('sending actions', this.status, this.value, this.priorValue);
    if (this.value === this.priorValue) {
      return true;
    }

    ddau('onValidation', this.status, {
      warn: this.warn,
      errors: this.errors,
      evt: this.evt,
      value: this.value,
    });

    if(this.warn.length > 0) {
      ddau('onWarning', this.warn, { warn: this.warn, evt: this.evt, value: this.value });
    }

    if(this.errors.length > 0) {
      ddau('onError', this.errors, { errors: this.errors, evt: this.evt, value: this.value });
    }
  }

  updatedState(priorState) {
    return Ember.assign({}, priorState, this.state);
  }

}
