import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';


export default Controller.extend({
  init() {
    this._super(...arguments);
    this._reset();
  },
  _reset() {
    this.set('a', []);
    this.set('messages', []);
  },
  log(message) {
    // eslint-disable-next-line no-console
    console.log(message);
    this.messages.pushObject(`${Date.now()}: ${message}`);
  },

  y: computed('a.@each.{a,b}', function() {
    this.log('computing y; returning a[0]');
    return this.a.firstObject;
  }),
  _a: observer('y', function() {
    this.log('_a (observer) firing; returning y');
    return this.y;
  }),

  actions: {
    reset() {
      this._reset();
    },
    setA() {
      this.log('setA action running');
      this.set('a', []);
    },
    pushA() {
      this.log('pushA action running');
      this.a.pushObject({ a: Math.random(), b: Math.random() });
    }
  }
})
