import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { bool, map } from '@ember/object/computed';

window.x = Ember.Object.extend({
  x: map('a', function(a) {
    return Ember.Object.create(a);
  }),
  y: computed('x.@each.{a,b}', function() {
    console.log('computing y');
    return this.x[0];
  }),
  _a: observer('y', function() {
    return this.y;
  }),
}).create();

export default Controller.extend({
  zzz: window.x,
})
