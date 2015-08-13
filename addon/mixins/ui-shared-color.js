import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const {computed, observer, $, A, run, on, typeOf, debug, defineProperty, get, set, inject, isEmpty} = Ember;  // jshint ignore:line

export default Ember.Mixin.create({

  classNameBindings: ['_colorClass','_focusColorClass'],

  mood: null, // can be a "class", null, or an explicit style value
  _mood: computed('mood','style','group.mood', function() {
    let validStyles = Ember.A([
      'default','success','primary','info','warning','error'
    ]);
    let {mood,style} = this.getProperties('mood','style');
    let groupMood = this.get('group.mood');
    if(groupMood) {
      mood = groupMood;
    }
    let prefixed = mood === 'none' ? style : `input-${mood}`;

    if(validStyles.contains(mood)) {
      return prefixed;
    }

    return null;
  }),
  focusColor: null, // can be a "class", null, or an explicit style value
  _focusColorClass: Ember.on('init', Ember.computed('focusColor','style', function() {
    let validStyles = Ember.A([
      'default','success','primary','info','warning','error'
    ]);
    let style = this.get('style');
    let color = this.get('focusColor');
    let prefixed = color === 'none' ? style : `input-focused-${color}`;

    if(validStyles.contains(color)) {
      return prefixed;
    }

    return null;
  })),
  // Stylistic atomic color (picked up by shared-styling.js)
  textColor: null,
  backgroundColor: null,
  borderColor: null,
  outlineColor: null,
});
