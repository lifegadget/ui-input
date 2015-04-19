import Ember from 'ember';
import layout from '../templates/components/ui-base-input';

import UiRulesMixin from '../mixins/ui-shared-rules';
import UiEventListenerMixin from '../mixins/ui-event-listener';
import UiStylingMixin from '../mixins/ui-shared-styling';
import UiSizeMixin from '../mixins/ui-shared-size';
import UiStatusMixin from '../mixins/ui-shared-status';
import UiAnimationMixin from '../mixins/ui-shared-animation';
import UiVibrationMixin from '../mixins/ui-shared-vibrations';
import UiColorMixin from '../mixins/ui-shared-color';
import UiTextAlignMixin from '../mixins/ui-shared-text-align';
import UiSoundEffectsMixin from '../mixins/ui-shared-sound-effects';

export default Ember.TextField.extend(
  UiRulesMixin, 
  UiEventListenerMixin, 
  UiStylingMixin, 
  UiSizeMixin, 
  UiTextAlignMixin, 
  UiStatusMixin,
  UiAnimationMixin,
  UiVibrationMixin,
  UiSoundEffectsMixin,
  UiColorMixin, {
    
  layout: layout,
	classNames: ['ui-input'],
	classNameBindings: ['statusClass','statusVisualize:visualize','square'],
	attributeBindings: ['type','size','pattern','visualStyleStyle:style'],
	pattern: null,
	type: 'text',
  emptyIsNull: false, // an empty value is either an empty string or null
    
	// EVENT HANDLING
  // mouse
  mouseEnter: function(evt) {
    return this.processEvents('mouseEnter',evt);
  },
  mouseDown: function(evt) {
    return this.processEvents('mouseDown',evt);
  },
  mouseUp: function(evt) {
    return this.processEvents('mouseUp',evt);
  },
  mouseLeave: function(evt) {
    return this.processEvents('mouseLeave',evt);
  },
  // form
  focusIn: function(evt) {
    return this.processEvents('focusIn',evt);
  },
	focusOut: function(evt) {
    return this.processEvents('focusOut', evt);
	},
  change: function(evt) {
    return this.processEvents('change', evt);
  },
  submit: function(evt) {
    return this.processEvents('submit', evt);
  },
  // keyboard
	keyDown: function(evt) {
    let eventType = 'keyDown';
    return this.processEvents(eventType, evt);
	},
  
  processEvents: function(eventType, evt) {
    let eventProp = Ember.String.capitalize(eventType, evt);
    let animate = this.get(`animate${eventProp}`);
    let sound = this.get(`sound${eventProp}`);
    if(animate) {
      this.set('animate',animate);
    }
    if(sound) {
      this.set('sound',sound);
    }
    return this.processRules(eventType,evt);
  },
  
  nullOrStringObserver: Ember.on('init', Ember.computed('value', function() {
    let { value, emptyIsNull } = this.getProperties('value', 'emptyIsNull');
    if (emptyIsNull && value === '') {
      this.set('value', null);
    }
  })),
  
	// MESSAGE QUEUEING
	messageQueue: [],
	/**
	 * Adds messages to queue. Queue items can be dismissed explictly or can timeout 
	 * if an 'expiry' is placed on the queue.
	 */
	addMessageQueue: function(message,options) {
		options = options || {};
		var now = new Date().getUTCMilliseconds();
		var expires = options.expiry ? now + options.expiry : null;
		this.set('messageQueue', this.get('messageQueue').concat({timestamp: new Date(), message: message, expires: expires}));
	}
  
  
});
