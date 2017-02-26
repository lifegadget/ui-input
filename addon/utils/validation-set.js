import Ember from 'ember';
export default class ValidationSet {

  constructor(evt, value, priorStatus) {
    this.evt = evt;
    this.value = value;
    this.priorStatus = priorStatus;
    this.state = {};
    this.code = {};
    this.options = {};
    this.errors = {};
    this.warnings = {};
    this.status = {};
  }

  validate(validations) {
    validations.forEach(v => {
      if (!v || !v.name || !v.fn ) {
        console.warn(`Invalid validator passed in. You must have at least a valid name and callback function. Validator passed in: `, v);

        return false;
      }
      const result = v.fn(this.evt, this.value);
      v.callbacks.map(cb => cb(result));
      const { state, code, options, error, warning } = result;
      this.status[v.name] = {
        state,
        code,
        trigger: v.trigger,
        options,
        warning,
        error
      }
      if(warning) {
        this.warnings[v.name] = Ember.assign({trigger: v.trigger}, warning);
      }
      if(error) {
        this.errors[v.name] = Ember.assign({trigger: v.trigger}, error);
      }
    });
  }

  sendActions(ddau) {
    if (this.value === this.priorValue) {
      return true;
    }

    ddau('onValidation', this.status, {
      warnings: this.warnings,
      errors: this.errors,
      evt: this.evt,
      value: this.value,
    });

    if(Object.keys(this.warnings).length > 0) {
      ddau('onWarning', this.warnings, { evt: this.evt, value: this.value });
    }

    if(this.errors.length > 0) {
      ddau('onError', this.errors, { evt: this.evt, value: this.value });
    }
  }

  updatedState() {
    return Ember.assign({value: this.value}, this.status);
  }

}
