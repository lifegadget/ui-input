import Ember from 'ember';

export default Ember.Mixin.create({
  handleDDAU(action, hash, value) {
    if (this.attrs[action] && this.attrs[action].update) {
      this.attrs[action].update(value);
      return true;
    } else if (this.attrs[action]) {
      return this.attrs[action](hash);
    } else {
      return false;
    }
  }
});
