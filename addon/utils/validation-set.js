import Ember from 'ember';
const { get } = Ember;
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
    this.clearedErrors = {};
    this.clearedWarnings = {};
    this.status = {};
  }

  /**
   * If there has been a change in the "value" that's being validated, 
   * then run through all validations assigned to the UI component and 
   * build a notification action and optionally error and warning actions
   */
  validate(validations) {
    if(this.value === this.priorStatus.value && this.priorStatus.hasInitialized) {
      return;
    }
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
      // Set when entering new warning/error state
      if(warning && warning.code !== get(this.priorStatus, `${v.name}.warning.code`)) {
        this.warnings[v.name] = Ember.assign({trigger: v.trigger}, warning);
      }
      if(error && error.code !== get(this.priorStatus, `${v.name}.error.code`)) {
        this.errors[v.name] = Ember.assign({trigger: v.trigger}, error);
      }
      // Clear when leaving an warning/error state
      if(!warning && get(this.priorStatus, `warnings.${v.name}.state`) !== 'ok') {
        this.clearedWarnings[v.name] = {
          trigger: v.trigger,
          state: 'ok',
          code: 'cleared-warning',
          clearedCode: get(this.priorStatus, `warnings.${v.name}.code`)
        };
        delete this.warnings[v.name];
      }
      if(!error && get(this.priorStatus, `${v.name}.error.state`) !== 'ok') {
        this.clearedErrors[v.name] = {
          trigger: v.trigger,
          state: 'ok',
          code: 'cleared-error',
          clearedCode: get(this.priorStatus, `${v.name}.error.code`)
        };
        delete this.errors[v.name];
      }      

    });
  }

  sendActions(ddau) {
    if (this.value === this.priorStatus && this.value !== undefined) {
      return true;
    }

    let priorNotifications = '';
    Object.keys(this.priorStatus.status || {}).map((validation) => {
      const code = [get(this.priorStatus, `status.${validation}.code`)];
      const state = [get(this.priorStatus, `status.${validation}.state`)];
      priorNotifications += `${validation}:${code}/${state}`;
    });
    let currentNotifications ='';
    Object.keys(this.status).map((validation) => {
      currentNotifications += validation + ':' + this.status[validation].code + '/' + this.status[validation].state + '||';
    });

    ddau('onValidation', this.status, {
      warnings: this.warnings,
      errors: this.errors,
      evt: this.evt,
      value: this.value,
    });


    if (priorNotifications !== currentNotifications) {
      if(Object.keys(this.warnings).length > 0) {
        ddau('onWarning', this.warnings, { evt: this.evt, value: this.value });
      }
      if(Object.keys(this.errors).length > 0) {
        ddau('onError', this.errors, { evt: this.evt, value: this.value });
      }
      if(Object.keys(this.clearedWarnings).length > 0 && this.priorStatus.hasInitialized) {
        ddau('onWarning', this.clearedWarnings, { evt: this.evt, value: this.value });
      }
      if(Object.keys(this.clearedErrors).length > 0 && this.priorStatus.hasInitialized) {
        ddau('onError', this.clearedErrors, { evt: this.evt, value: this.value });
      }
    }
  }

  updatedState() {
    return {
      value: this.value, 
      evt: this.evt, 
      hasInitialized: true, 
      status: this.status,
      errors: this.errors,
      warnings: this.warnings
    };
  }
}
