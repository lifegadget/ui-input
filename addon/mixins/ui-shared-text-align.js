import Ember from 'ember';

var TextAlignmentSupport = Ember.Mixin.create({
  
  classNameBindings: ['_textAlignClass'],
  textAlign: 'left',
  _textAlignClass: Ember.computed('textAlign', function() {
    let alignment = this.get('textAlign');
    
    return `text-align-${alignment}`;
  })
  
});


TextAlignmentSupport[Ember.NAME_KEY] = 'Text Alignment';
export default TextAlignmentSupport; 