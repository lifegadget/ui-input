import Ember from 'ember';
var typeOf = Ember.typeOf;

var RulesSupport = Ember.Mixin.create({
  rules: [], // the rules configured for a specific instance (often overridden with default types by subclasses of base-input)
  _rules: Ember.computed('rules', function() {
    let rules = this.get('rules');
    if(typeOf(rules) === 'string') {
      rules = rules.split(',');
    }
    if(typeOf(rules) !== 'array') {
      console.warn('%s had invalid rules assigned to it: %o', this.get('elementId'), rules);
      return [];
    } else {
      return rules;
    }
  }),
  /**
   * Builds a master list of all rules that are AVAILABLE to a given Input class
   */
  _rulesLibrary: Ember.computed('_rulesBaseLibrary','_rulesTypeLibrary', '_rulesUserLibrary', function() {
    let { _rulesBaseLibrary, _rulesTypeLibrary, _rulesUserLibrary } = this.getProperties('_rulesBaseLibrary','_rulesTypeLibrary', '_rulesUserLibrary');
    let base = _rulesBaseLibrary ? _rulesBaseLibrary : []; // base library available to all controls
    let inputType = _rulesTypeLibrary ? _rulesTypeLibrary : []; // libraries brought in by a specific "type" (aka, subclass of base-input)
    let user = _rulesUserLibrary ? _rulesUserLibrary : []; // the containing object can pass in its own library items

    return new Map(base.concat(inputType).concat(user));
  }),
  libraryItems: Ember.computed('_rulesBaseLibrary','_rulesTypeLibrary', '_rulesUserLibrary', function() {
    return this.get('_rulesLibrary').keys();
  }),
  
  /**
   * Processes the rules associated with a given event-type (e.g, mouseUp, focusIn, etc.)
   */
  processRules: function(eventType, evt, options) {
    options = options || {};
    let rules = Ember.A(this.get('_rules'));
    let library = this.get('_rulesLibrary');
    // iterate over each rule    
    rules.forEach(function(rule) {
      let ruleDefinition = library.get(rule);
      let defaults = {
        animate: true,
        sound: true,
        cancel: false,
        status: true
      };
      try {
        let test = ruleDefinition.rule;
      } catch(e) {
        console.warn('Problem with rule %s, ignoring rule: %o', rule, ruleDefinition); 
        return;
      }
      let ruleName = Ember.String.capitalize(rule);
      if(Ember.A(ruleDefinition.events).contains(eventType)) {
        // set defaults if appropriate
        if(ruleDefinition.defaults.has('animate') && typeOf(this.get(`animateRule${ruleName}`)) === 'undefined') {
          this.set(`animateRule${ruleName}`, ruleDefinition.defaults.get('animate'));
        }
        if(ruleDefinition.defaults.has('sound') && typeOf(this.get(`soundRule${ruleName}`)) === 'undefined') {
          this.set(`soundRule${ruleName}`, ruleDefinition.defaults.get('sound'));
        }
        console.log('rule defaults: %o', ruleDefinition.defaults);
        
        
        if(ruleDefinition.defaultAnimation && typeOf(this.get(`animateRule${ruleName}`)) === 'undefined') {
          this.set(`animateRule${ruleName}`, ruleDefinition.defaultAnimation);
        }
        if(ruleDefinition.defaultSound && this.get(`soundRule${ruleName}`) === null) {
          this.set(`soundRule${ruleName}`, ruleDefinition.defaultSound);
        }
        // execute rule
        let result = ruleDefinition.rule(this, eventType, evt);
        for (let prop in defaults) {
          if(result && !result.hasOwnProperty(prop)) {
            result[prop] = defaults[prop];
          }
        }
        console.log('result now: %o', result);
        let animationType = this.get(`animateRule${ruleName}`);
        let soundType = this.get(`soundRule${ruleName}`);
        if(result.animate && animationType) {
          this.set('animate', animationType);
        }
        if(result.sound && soundType) {
          this.set('sound', soundType);
        }
        if(result.message) {
          // TODO: implement
        }
        if(result.status) {
          this.set('status', result.status);
        }
        if(result.cancel) {
          evt.preventDefault();
          return false;
        } else {
          return true;
        }
      }
    }, this); 
  },
  
  /**
   * For now anyway, there are NO rules which are common to all Input Types
   */
  _rulesBaseLibrary: [],
  
  // REFERENCE VARIABLES
  _KEYBOARD: {
    controlKeys: Ember.A([8,9,27,36,37,39,38,40,46]), // 8:delete, 9:tab, 27: escape, 36:home, 37:left, 39:right, 38:up, 40:down, 46: backspace
    numericKeys: Ember.A([48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,187,189]), // 48-57 are standard, 96-105 are numpad numeric keys, - and + symbols are 187/189
    modifierKeys: Ember.A([16,17,18]), // 16: shift, 17: cntrl, 18: alt
    decimalPlace: Ember.A([190]),
    // allows checking of key combinations; by default just checks 
    // for ctrl-A/cmd-A but options array allows setting what is allowed
    keyCombos: function(evt, options) {
      options = options || {};
      var isAcceptable = false;
      var config = [
        { id: 'ctrlKey', value: options.ctrlKey || [65,86] }, // ctrl-A, ctrl-v
        { id: 'shiftKey', value: options.shiftKey || [] },
        { id: 'metaKey', value: options.metaKey || [65,82,86] }, // 65: cmd/win-A, cmd/win-R, cmd-v
        { id: 'altKey', value: options.altKey || [] },
      ];
      config.forEach(function(item) {
        if (evt[item.id]) {
          if (Ember.A(item.value).contains(evt.keyCode)) {
            isAcceptable = true;
          }
        }
      });
			
      return isAcceptable;
    }
  },
  
  
});

RulesSupport[Ember.NAME_KEY] = 'Rules Support';
export default RulesSupport; 