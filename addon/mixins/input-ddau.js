import Ember from 'ember';

export default Ember.Mixin.create({
  /**
   * Provide a DDAU "action" or "mut" response
   * @param  {string } action The name of the exposed action property
   * @param  {hash}    options   A options of attributes that are passed back to a "action"
   * @param  {mixed}   value  A value that is passed to the "update" function (aka, mut helper) if available
   * @return {boolean}        Pass back true if `mut` not used; if used then proxies mut's response back
   */
  handleDDAU(action, value, options) {
    if (this.get(action)) {
      return this.get(action)(value, options);
    } else {
      return false;
    }
  }
});
