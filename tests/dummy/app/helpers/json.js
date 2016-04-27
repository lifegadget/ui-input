import Ember from 'ember';

export function json(params/*, hash*/) {
  return JSON.stringify(params[0], null, 2);
}

export default Ember.Helper.helper(json);
