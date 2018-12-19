import Controller from '@ember/controller';
import EmberObject, { computed, observer } from '@ember/object';
import { map } from '@ember/object/computed';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('messages', []);
  },
  log(message) {
    // eslint-disable-next-line no-console
    console.log(message);
    this.messages.pushObject(`${Date.now()}: ${message}`);
  },

  a: null,
  x: map('a', function(a) {
    return EmberObject.create(a);
  }),
  y: computed('x.@each.{a,b}', function() {
    this.log('computing y; returning x[0]');
    return this.x[0];
  }),
  _a: observer('y', function() {
    this.log('_a (observer) firing; returning y');
    return this.y;
  }),

  actions: {
    setA() {
      this.log('setA action running');
      this.set('a', [{
        a: 1,
        b: 2
      }]);
    }
  }
})
