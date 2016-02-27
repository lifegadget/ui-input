import Ember from 'ember';

export function typeOf(params/*, hash*/) {
  return Ember.typeOf(params[0]);
}

export default Ember.Helper.helper(typeOf);
