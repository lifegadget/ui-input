import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_textAlignClass'],
  textAlign: 'left',
  _textAlignClass: Ember.computed('textAlign', function() {
    let alignment = this.get('textAlign');
    
    return `text-align-${alignment}`;
  })
  
});
