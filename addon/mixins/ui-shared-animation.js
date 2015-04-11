import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_animateClass'],

  animate: null,
  _animator: Ember.observer('animate', function() {
    let animate = this.get('animate');
    let defaultAnimation = 'pulse';
    if(animate) {
      animate = animate === true ? defaultAnimation : animate;
      this.$().addClass(`animated ${animate}`);
      this.$().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        this.$().removeClass('animated ' + animate);
        this.set('animate', null);
      });
    }
  })
  
  
  
});
