import Ember from 'ember';
var typeOf = Ember.typeOf;
var RulesSupport = Ember.Mixin.create({
  rules: [], // the rules configured for a specific instance (often overridden with default types by subclasses of base-input)
  defaultRules: [], // meant to be used by subclasses to set default rules which won't collide with container setting rules property
  _rules: Ember.computed('rules', function() {
    let rules = this.get('rules');
    if(rules === null || rules === false) {
      rules=[];
    }
    if(typeOf(rules) === 'string') {
      rules = rules.split(',');
    }
    if(typeOf(rules) !== 'array') {
      console.warn('%s had invalid rules assigned to it: %o', this.get('elementId'), rules);
      rules = [];
    } 
    
    return rules.concat(this.get('defaultRules'));
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
    let events, defaults;
    // iterate over each rule    
    rules.forEach( (rule) => {
      let ruleDefinition = library.get(rule);
      try {
        events = new Set(ruleDefinition.events); // ensure its a set (allows it to be defined as array)
        defaults = new Map(ruleDefinition.defaults); // ensure its a map (allows it to be defined as array or arrays too)        
      } catch (e) {
        console.warn('There was a problem with %s processing rule %s. Couldn\'t set either events or defaults: %o', this.get('elementId'), rule, ruleDefinition);
        return false;
      }
      if (events.has(eventType)) {
        if (!ruleDefinition.rule || typeOf(ruleDefinition.rule) !== 'function') {
          return;
        }
        let ruleName = Ember.String.capitalize(rule);
        // set defaults if appropriate
        let actionTypes = new Set(['animate','sound','status','vibrate']);
        actionTypes.forEach( (action) => {
          let actionRuleVariable = `${action}Rule${ruleName}`;
          if(defaults.has(action) && Ember.A([null,'undefined']).contains(typeOf(this.get(actionRuleVariable)))) {
            this.set(actionRuleVariable, defaults.get(action));
          }          
        });
        // parse parameters
        let params = this.get(`ruleParams${ruleName}`) || {};
        if(typeOf(params) === 'string') {
          try {
            params = JSON.parse(params);
          } catch(e) {
            if(!isNaN(Number(params))) {
              params = Number(params);
            }
            params = { value: params };
          }
        }
        if(typeOf(params) !== 'object') {
          params = { value: params };
        }
        if(Ember.A(['number','boolean','array','date']).contains(typeOf(params))) {
          params = { value: params };
        }
        // execute rule
        let result = ruleDefinition.rule(this, eventType, evt, params);
        if(typeOf(result) === 'boolean') {
          result = result ? {trigger: true, cancel: false} : {trigger: false, cancel: false};
        }
        if(result.trigger) {
          actionTypes.forEach( (action) => {
           let setting = this.get(`${action}Rule${ruleName}`);
           // Note: rules can explicitly state a false value for an action; cancelling the action from taking
           // place even if an action property was set
           if(setting && result[action] !== false) {
             this.set(action, setting);
           }
         }); // end actionTypes loop
        }
       // process messages that came with the result
       if(result.message) {
         // TODO: implement
       }
      
       if(result.cancel) {
         evt.preventDefault();
         return false;
       } 
      
       return true;
     } // end eventType conditional
   }); // end rules loop
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