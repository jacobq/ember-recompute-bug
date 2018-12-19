# ember-recompute-bug

## Steps to reproduce problem

* (...git clone, npm install, and all that jazz...)
* ember s
* Click "Push new object into a" button
* Observe doubleEach count increase twice as fast as doubleEach2.
  The only difference between those two computed properties is that
  the one with the problem (multiple evaluations) has an observer that returns a value
  and the other (doubleEach2) does not.

