import Ember from 'ember';

export default Ember.Object.extend({
  aSimpleCP: Ember.computed(function() {
    return true;
  })
});
