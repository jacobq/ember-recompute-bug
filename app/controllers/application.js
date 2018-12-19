import Controller from '@ember/controller';
import EmberObject, { computed, observer } from '@ember/object';
import { map } from '@ember/object/computed';

window.x = EmberObject.extend({
  x: map('a', function(a) {
    return EmberObject.create(a);
  }),
  y: computed('x.@each.{a,b}', function() {
    // eslint-disable-next-line no-console
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
