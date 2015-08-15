import Ember from 'ember';

export default Ember.Object.extend({
  @computed
  aSimpleCP() {
    return true;
  }
});
