import Ember from 'ember';
import layout from '../templates/components/ui-base-input';

import UiRulesMixin from '../mixins/ui-shared-rules';
import UiEventListenerMixin from '../mixins/ui-event-listener';
import UiStylingMixin from '../mixins/ui-shared-styling';
import UiSizeMixin from '../mixins/ui-shared-size';
import UiStatusMixin from '../mixins/ui-shared-status';
import UiAnimationMixin from '../mixins/ui-shared-animation';
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
  mouseEnter: function() {
    this.processEvents('mouseEnter');
  },
  mouseDown: function() {
    this.processEvents('mouseDown');
  },
  mouseUp: function() {
    this.processEvents('mouseUp');
  },
  mouseLeave: function() {
    this.processEvents('mouseLeave');
  },
  // form
  focusIn: function() {
    this.processEvents('focusIn');
  },
	focusOut: function(evt) {
    let eventType = 'focusOut';
    this.processEvents(eventType);
		return this.processRules('focusOut',eventType, evt);
	},
  change: function() {
    this.processEvents('change');
  },
  submit: function() {
    this.processEvents('submit');
  },
  // keyboard
	keyDown: function(evt) {
    let eventType = 'keyDown';
    this.processEvents(eventType);
    return this.processRules(eventType, evt);
	},
  
  processEvents: function(event) {
    let eventProp = Ember.String.capitalize(event);
    let animate = this.get(`animate${eventProp}`);
    let sound = this.get(`sound${eventProp}`);
    if(animate) {
      this.set('animate',animate);
    }
    if(sound) {
      this.set('sound',sound);
    }
  },
  
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
