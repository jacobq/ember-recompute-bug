import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this._reset();
  },
  _reset() {
    this.setProperties({
      a: [],
      messages: [],
      counts: {
        a: 0,
        e: 0,
        de: 0,
        de2: 0,
      }
    });
  },
  log(message) {
    // eslint-disable-next-line no-console
    console.log(message);
    this.messages.pushObject(`${Date.now()}: ${message}`);
  },

  _inc(counter) {
    scheduleOnce('afterRender', () => {
      this.incrementProperty(counter);
    })
  },

  arrayCP: computed('a.[]', function() {
    this.log('arrayCP computing');
    this._inc('counts.a');
    return this.a.firstObject;
  }),
  eachCP: computed('a.@each.a', function() {
    this.log('eachCP computing');
    this._inc('counts.e');
    return this.a.firstObject;
  }),
  doubleEachCP: computed('a.@each.{a,b}', function() {
    this.log('doubleEachCP computing');
    this._inc('counts.de');
    return this.a.firstObject;
  }),
  doubleEachCP2: computed('a.@each.{a,b}', function() {
    this.log('doubleEachCP2 computing');
    this._inc('counts.de2');
    return this.a.firstObject;
  }),

  _arrayCPObserver: observer('arrayCP', function() {
    this.log('_arrayCPObserver firing');
    return this.arrayCP;
  }),
  _eachCPObserver: observer('eachCP', function() {
    this.log('_eachCPObserver firing');
    return this.eachCP;
  }),
  _doubleEachCPObserver: observer('doubleEachCP', function() {
    this.log('_doubleEachCPObserver firing');
    return this.doubleEachCP; 
  }),
  _doubleEachCPObserverWithoutReturn: observer('doubleEachCP2', function() {
    this.log('_doubleEach2CPObserver firing');
    // no return value here
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
