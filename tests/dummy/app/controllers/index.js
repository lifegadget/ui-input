import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['designImage'],
  designImage: 'structure',
  
  designImages: [
    {id: 'structure', name: 'Component Structure'},
    {id: 'html-structure', name: 'HTML Structure'},
    {id: 'rules', name: 'Rule Library'},
  ]

});