export default class Validator {

  constructor(name, fn, options = {}) {
    options.name = name;
    this.name = name;
    this.fn = fn(options);
    console.log('options are: ', options);
    this.trigger = options.trigger || 'change';
    this.context = options.context || {};
    this.callbacks = options.callbacks || [];
    delete options.callbacks;
    delete options.context;
    delete options.name;
    delete options.trigger;
    this.options = options;
  }

  serialize() {
    return {
      name: this.name,
      fn: this.fn,
      context: this.context,
      trigger: this.trigger,
      callbacks: this.callbacks,
      options: this.options
    };
  }
}
