webpackJsonp([0],{/***/
10:/***/
function(t,e){},/***/
11:/***/
function(t,e,n){/* WEBPACK VAR INJECTION */
(function(e,n){/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */
!function(e,n){t.exports=n()}(0,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function r(t){return"function"==typeof t}function o(t){J=t}function i(t){K=t}
// vertx
function s(){return void 0!==D?function(){D(c)}:u()}function u(){
// Store setTimeout reference so es6-promise will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var t=setTimeout;return function(){return t(c,1)}}function c(){for(var t=0;t<q;t+=2){(0,I[t])(I[t+1]),I[t]=void 0,I[t+1]=void 0}q=0}function a(t,e){var n=this,r=new this.constructor(l);void 0===r[R]&&P(r);var o=n._state;if(o){var i=arguments[o-1];K(function(){return O(o,r,i,n._result)})}else j(n,r,t,e);return r}/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function f(t){/*jshint validthis:true */
var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(l);return w(n,t),n}function l(){}function h(){return new TypeError("You cannot resolve a promise with itself")}function v(){return new TypeError("A promises callback cannot return that same promise.")}function p(t){try{return t.then}catch(t){return tt.error=t,tt}}function d(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}function _(t,e,n){K(function(t){var r=!1,o=d(n,e,function(n){r||(r=!0,e!==n?w(t,n):g(t,n))},function(e){r||(r=!0,A(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,A(t,o))},t)}function y(t,e){e._state===Z?g(t,e._result):e._state===$?A(t,e._result):j(e,void 0,function(e){return w(t,e)},function(e){return A(t,e)})}function m(t,e,n){e.constructor===t.constructor&&n===a&&e.constructor.resolve===f?y(t,e):n===tt?(A(t,tt.error),tt.error=null):void 0===n?g(t,e):r(n)?_(t,e,n):g(t,e)}function w(e,n){e===n?A(e,h()):t(n)?m(e,n,p(n)):g(e,n)}function b(t){t._onerror&&t._onerror(t._result),E(t)}function g(t,e){t._state===X&&(t._result=e,t._state=Z,0!==t._subscribers.length&&K(E,t))}function A(t,e){t._state===X&&(t._state=$,t._result=e,K(b,t))}function j(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+Z]=n,o[i+$]=r,0===i&&t._state&&K(E,t)}function E(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?O(n,r,o,i):o(i);t._subscribers.length=0}}function M(t,e){try{return t(e)}catch(t){return tt.error=t,tt}}function O(t,e,n,o){var i=r(n),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=M(n,o),s===tt?(a=!0,u=s.error,s.error=null):c=!0,e===s)return void A(e,v())}else s=o,c=!0;e._state!==X||(i&&c?w(e,s):a?A(e,u):t===Z?g(e,s):t===$&&A(e,s))}function S(t,e){try{e(function(e){w(t,e)},function(e){A(t,e)})}catch(e){A(t,e)}}function T(){return et++}function P(t){t[R]=et++,t._state=void 0,t._result=void 0,t._subscribers=[]}function x(){return new Error("Array Methods must be provided an Array")}/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function C(t){return new nt(this,t).promise}/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function k(t){/*jshint validthis:true */
var e=this;return new e(V(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function L(t){/*jshint validthis:true */
var e=this,n=new e(l);return A(n,t),n}function N(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function F(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}/*global self*/
function H(){var t=void 0;if(void 0!==n)t=n;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=rt}var Y=void 0;Y=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var V=Y,q=0,D=void 0,J=void 0,K=function(t,e){I[q]=t,I[q+1]=e,2===(q+=2)&&(
// If len is 2, that means that we need to schedule an async flush.
// If additional callbacks are queued before the queue is flushed, they
// will be processed by this flush that we are scheduling.
J?J(c):Q())},U="undefined"!=typeof window?window:void 0,W=U||{},z=W.MutationObserver||W.WebKitMutationObserver,B="undefined"==typeof self&&void 0!==e&&"[object process]"==={}.toString.call(e),G="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,I=new Array(1e3),Q=void 0;
// Decide what async method to use to triggering processing of queued callbacks:
Q=B?
// node
function(){
// node version 0.10.x displays a deprecation warning when nextTick is used recursively
// see https://github.com/cujojs/when/issues/410 for details
return function(){return e.nextTick(c)}}():z?function(){var t=0,e=new z(c),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}():G?
// web worker
function(){var t=new MessageChannel;return t.port1.onmessage=c,function(){return t.port2.postMessage(0)}}():void 0===U?function(){try{var t=Function("return this")().require("vertx");return D=t.runOnLoop||t.runOnContext,s()}catch(t){return u()}}():u();var R=Math.random().toString(36).substring(2),X=void 0,Z=1,$=2,tt={error:null},et=0,nt=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(l),this.promise[R]||P(this.promise),V(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?g(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&g(this.promise,this._result))):A(this.promise,x())}return t.prototype._enumerate=function(t){for(var e=0;this._state===X&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===f){var o=p(t);if(o===a&&t._state!==X)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===rt){var i=new n(l);m(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===X&&(this._remaining--,t===$?A(r,n):this._result[e]=n),0===this._remaining&&g(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;j(t,void 0,function(t){return n._settledAt(Z,e,t)},function(t){return n._settledAt($,e,t)})},t}(),rt=function(){function t(e){this[R]=T(),this._result=this._state=void 0,this._subscribers=[],l!==e&&("function"!=typeof e&&N(),this instanceof t?S(this,e):F())}/**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */
/**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */
/**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */
return t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){var e=this,n=e.constructor;return e.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){throw e})})},t}();
// Strange compat..
return rt.prototype.then=a,rt.all=C,rt.race=k,rt.resolve=f,rt.reject=L,rt._setScheduler=o,rt._setAsap=i,rt._asap=K,rt.polyfill=H,rt.Promise=rt,rt})}).call(e,n(2),n(0))},/***/
4:/***/
function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});/* harmony import */
var r=n(1),o=n.n(r),i=n(3),s=n.n(i),u=n(10);n.n(u);n(11).polyfill(),o.a.use(s.a),window.Vue=o.a,
//兼容Ie
window.HTMLElement&&-1===Object.getOwnPropertyNames(HTMLElement.prototype).indexOf("dataset")&&Object.defineProperty(HTMLElement.prototype,"dataset",{get:function(){//定义一个空对象
for(var t=this.attributes,e=[],n=[],r={},o=0;o<t.length;o++)
//遍历节点的所有属性
"data-"==t[o].nodeName.slice(0,5)&&(
//如果属性名的前面5个字符符合"data-"
// 取出属性名的"data-"的后面的字符串放入name数组中
e.push(t[o].nodeName.slice(5)),
//取出对应的属性值放入value数组中
n.push(t[o].nodeValue));for(var i=0;i<e.length;i++)
//遍历name和value数组
r[e[i]]=n[i];return r}})}},[4]);