import Ember from 'ember';
import layout from '../templates/components/ui-base-input';

import InputStatusMixin from '../mixins/input-status';
import InputCorrectionMixin from '../mixins/input-correction';
import UiEventListenerMixin from '../mixins/ui-event-listener';
import UiStylingMixin from '../mixins/ui-shared-styling';
import UiSizeMixin from '../mixins/ui-shared-size';
import UiStatusMixin from '../mixins/ui-shared-status';
import UiAnimationMixin from '../mixins/ui-shared-animation';
import UiColorMixin from '../mixins/ui-shared-color';
import UiTextAlignMixin from '../mixins/ui-shared-text-align';
import UiSoundEffectsMixin from '../mixins/ui-shared-sound-effects';


var isEmpty = Ember.isEmpty;
var typeOf = Ember.typeOf;

export default Ember.TextField.extend(
  InputStatusMixin, 
  InputCorrectionMixin, 
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
    this.processEvents('focusOut');
		return this.processCorrections('focusOut',evt);
	},
  change: function() {
    this.processEvents('change');
  },
  submit: function() {
    this.processEvents('submit');
  },
  // keyboard
	keyDown: function(evt) {
		return this.processCorrections('keyDown',evt);
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

  // emphasize: function(animationType) {
  //   // this.set('animationClass', animationType);
  //   var self = this;
  //   if (!isEmpty(animationType)) {
  //     this.$().addClass(`animated ${animationType}`).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
  //       self.$().removeClass(`${animationType} animated`);
  //     });
  //   }
  // },

	// VISUAL STYLE
  // visualStyle: null,
  // visualStyleClass: Ember.computed('visualStyle', function() { // class adjustments
  //   var style = this.get('visualStyle') || '';
  //   if (style.indexOf('square') > -1) {
  //     if(!this.get('align')) {
  //       this.set('align', 'center');
  //     }
  //     return style;
  //   } else {
  //     return null;
  //   }
  // }),
  // // direct style adjustments
  // visualStyleStyle: Ember.computed('visualStyle','_componentWidth',function() {
  //   var style = this.get('visualStyle') || '';
  //   if (style.indexOf('square') > -1) {
  //     var height = Number(this.get('_componentWidth')) - 30;
  //     var fontSize = height / 35;
  //     return `height: ${height}px; font-size: {$fontSize}em;`;
  //   } else {
  //     return null;
  //   }
  // }),
  
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
