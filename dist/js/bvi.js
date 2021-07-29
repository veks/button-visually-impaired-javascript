/*!
  * Button visually impaired - v1.0.0 https://bvi.isvek.ru
  * Copyright 2014-2021 Oleg Korotenko <bvi@isvek.ru>.
  * Licensed MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.isvek = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    define(Gp, iteratorSymbol, function () {
      return this;
    });
    define(Gp, "toString", function () {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" ? module.exports : {});

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Button visually impaired (v1.0.0): util/index.js
   * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('prepend')) {
        return;
      }

      Object.defineProperty(item, 'prepend', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function prepend() {
          var argArr = Array.prototype.slice.call(arguments),
              docFrag = document.createDocumentFragment();
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          this.insertBefore(docFrag, this.firstChild);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
  }

  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "".concat(obj);
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  var isElement = function isElement(obj) {
    if (!obj || _typeof(obj) !== 'object') {
      return false;
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var checkConfig = function checkConfig(config, configTypes, configOptions) {
    Object.keys(configTypes).forEach(function (key) {
      var expectedTypes = configTypes[key];
      var value = config[key];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError("Bvi console: \u041E\u043F\u0446\u0438\u044F \"".concat(key, "\" \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0442\u0438\u043F \"").concat(valueType, "\", \u043E\u0436\u0438\u0434\u0430\u0435\u043C\u044B\u0439 \u0442\u0438\u043F \"").concat(expectedTypes, "\"."));
      }
    });
    Object.keys(configOptions).forEach(function (key) {
      var expectedOptions = configOptions[key];
      var value = config[key];

      if (!new RegExp(expectedOptions).test(value)) {
        throw new TypeError("Bvi console: \u041E\u043F\u0446\u0438\u044F \"".concat(key, "\" \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \"").concat(value, "\", \u043E\u0436\u0438\u0434\u0430\u0435\u043C\u044B\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \"").concat(expectedOptions, "\"."));
      }
    });
  };

  var plural = function plural(number) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['пиксель', 'пекселя', 'пикселей'];

    if (number % 10 === 1 && number % 100 !== 11) {
      return "".concat(number, " ").concat(text[0]);
    } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return "".concat(number, " ").concat(text[1]);
    } else {
      return "".concat(number, " ").concat(text[2]);
    }
  };

  var stringToBoolean = function stringToBoolean(string) {
    switch (string) {
      case 'on':
      case 'true':
      case '1':
        return true;

      default:
        return false;
    }
  };

  var wrapInner = function wrapInner(parent, wrapper, className) {
    if (typeof wrapper === 'string') {
      wrapper = document.createElement(wrapper);
    }

    parent.appendChild(wrapper).className = className;

    while (parent.firstChild !== wrapper) {
      wrapper.appendChild(parent.firstChild);
    }
  };

  var unwrap = function unwrap(wrapper) {
    var docFrag = document.createDocumentFragment();
    if (!wrapper) return;

    while (wrapper.firstChild) {
      var child = wrapper.removeChild(wrapper.firstChild);
      docFrag.appendChild(child);
    }

    wrapper.parentNode.replaceChild(docFrag, wrapper);
  };

  var getKey = function getKey(config, callback) {
    Object.keys(config).forEach(function (key) {
      if (typeof callback === 'function') {
        callback(key);
      }
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Button visually impaired (v1.0.0): util/cookie.js
   * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var setCookie = function setCookie() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var now = new Date();
    var time = now.getTime();
    time += 24 * 60 * 60 * 1000;
    now.setTime(time);
    document.cookie = "bvi_".concat(name, "=").concat(value, ";path=/;expires=").concat(now.toUTCString(), ";domain=").concat(location.host);
  };

  var getCookie = function getCookie() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    name = "bvi_".concat(name, "=");
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      if (cookie.indexOf(name) !== -1) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  };

  var removeCookie = function removeCookie() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    document.cookie = "bvi_".concat(name, "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=").concat(location.host);
  };

  /**
   * --------------------------------------------------------------------------
   * Button visually impaired (v1.0.0): i18n.js
   * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var lang = {
    'ru-RU': {
      'text': {
        'fontSize': 'Размер шрифта',
        'sitColors': 'Цвета сайта',
        'images': 'Изображения',
        'sound': 'Звук',
        'settings': 'Настройки',
        'regularVersionOfTheSite': 'Обычная версия сайта',
        'lineSpacing': 'Межстрочный интервал',
        'standard': 'Стандартный',
        'middle': 'Средний',
        'large': 'Большой',
        'spacingBetweenLetters': 'Интервал между буквами',
        'font': 'Шрифт',
        'sansSerif': 'Без засечек',
        'serif': 'С засечками',
        'built-inElements': 'Встроенные элементы (Видео, карты и тд.)',
        'on': 'Включить',
        'off': 'Выключить',
        'resetSettings': 'Сбросить настройки',
        'plural_0': 'пиксель',
        'plural_1': 'пекселя',
        'plural_2': 'пикселей'
      },
      'voice': {
        'panelOn': 'Версия сайта для слабови́дящий',
        'panelOff': 'Обычная версия сайта',
        'fontSizePlus': 'Размер шрифта увели́чен',
        'fontSizeMinus': 'Размер шрифта уме́ньшен',
        'siteColorBlackOnWhite': 'Цвет сайта черным по белому',
        'siteColorWhiteOnBlack': 'Цвет сайта белым по черному',
        'siteColorDarkBlueOnBlue': 'Цвет сайта тёмно-синим по голубому',
        'siteColorBeigeBrown': 'Цвет сайта кори́чневым по бе́жевому',
        'siteColorGreenOnDarkBrown': 'Цвет сайта зеленым по тёмно-коричневому',
        'imagesOn': 'Изображения включены',
        'imagesOF': 'Изображения выключены',
        'imagesGrayscale': 'Изображения чёрно-белые',
        'speechOn': 'Синтез речи включён',
        'speechOff': 'Синтез речи вы́ключен',
        'lineHeightStandard': 'Межстрочный интервал стандартный',
        'lineHeightMiddle': 'Межстрочный интервал средний',
        'lineHeightLarge': 'Межстрочный интервал большой',
        'LetterSpacingStandard': 'Интервал между буквами стандартный',
        'LetterSpacingMiddle': 'Интервал между буквами средний',
        'LetterSpacingLarge': 'Интервал между буквами большой',
        'fontSansSerif': 'Шрифт без засечек',
        'fontSerif': 'Шрифт с засечками',
        'built-inElementsOn': 'Встроенные элементы включены',
        'built-inElementsOFF': 'Встроенные элементы выключены',
        'resetSettings': 'Установлены настройки по умолча́нию',
        'panelShow': 'Панель открыта',
        'panelHide': 'Панель скрыта'
      }
    },
    'en-US': {
      'text': {
        'panelOn': 'Site version for visually impaired',
        'panelOff': 'Regular version of the site',
        'fontSize': 'Font size',
        'sitColors': 'Site colors',
        'images': 'Images',
        'sound': 'Sound',
        'settings': 'Settings',
        'regularVersionOfTheSite': 'Regular version of the site',
        'lineSpacing': 'Line spacing',
        'standard': 'Standard',
        'middle': 'Middle',
        'large': 'Large',
        'spacingBetweenLetters': 'Spacing between letters',
        'font': 'Font',
        'sansSerif': 'Sans serif',
        'serif': 'Serif',
        'built-inElements': 'Built-in elements (Videos, maps, etc.)',
        'on': 'On',
        'off': 'Off',
        'resetSettings': 'Reset settings',
        'plural_0': 'pixel',
        'plural_1': 'pixel',
        'plural_2': 'pixel'
      },
      'voice': {
        'fontSizePlus': 'Font size increased',
        'fontSizeMinus': 'Minus font size',
        'siteColorBlackOnWhite': 'Site color black on white',
        'siteColorWhiteOnBlack': 'Site color white on black',
        'siteColorDarkBlueOnBlue': 'Site color dark blue on cyan',
        'siteColorBeigeBrown': 'SiteColorBeigeBrown',
        'siteColorGreenOnDarkBrown': 'Site color green on dark brown',
        'imagesOn': 'Images enabled',
        'imagesOF': 'Images disabled',
        'imagesGrayscale': 'Images are black and white',
        'speechOn': 'Synthesis of speech enabled',
        'speechOff': 'Synthesis of speech is disabled',
        'lineHeightStandard': 'Line spacing standard',
        'lineHeightMiddle': 'Line spacing is average',
        'lineHeightLarge': 'Line spacing is large',
        'LetterSpacingStandard': 'Standard letter spacing',
        'LetterSpacingMiddle': 'Letter spacing is average',
        'LetterSpacingLarge': 'Large letter spacing',
        'fontSansSerif': 'Sans serif font',
        'fontSerif': 'Serif font',
        'built-inElementsOn': 'Built-in elements are enabled',
        'built-inElementsOFF': 'Built-in elements are disabled',
        'resetSettings': 'Default settings have been set',
        'panelShow': 'Panel show',
        'panelHide': 'Panel hide'
      }
    }
  };

  var I18n = /*#__PURE__*/function () {
    function I18n(options) {
      _classCallCheck(this, I18n);

      this._config = options;
    }

    _createClass(I18n, [{
      key: "t",
      value: function t(key) {
        return lang[this._config.lang]['text'][key];
      }
    }, {
      key: "v",
      value: function v(key) {
        return lang[this._config.lang]['voice'][key];
      }
      /*_readFile(url) {
        const request = new Request(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          cache: 'default'
        })
        return fetch(request).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw Error('Error')
          }
        }).then(data => {
          return data
        }).catch(error => {
          console.log(error)
        });
      }*/

    }]);

    return I18n;
  }();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var Default = {
    target: '.bvi-open',
    fontSize: 16,
    theme: 'white',
    images: 'grayscale',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    speech: true,
    fontFamily: 'arial',
    builtElements: false,
    fixedPanel: true,
    panelHide: false,
    reloadPage: false,
    lang: 'ru-RU'
  };
  var DefaultType = {
    target: 'string',
    fontSize: 'number',
    theme: 'string',
    images: '(string|boolean)',
    letterSpacing: 'string',
    lineHeight: 'string',
    speech: 'boolean',
    fontFamily: 'string',
    builtElements: 'boolean',
    fixedPanel: 'boolean',
    panelHide: 'boolean',
    reloadPage: 'boolean',
    lang: 'string'
  };
  var DefaultOptions = {
    target: '',
    fontSize: '([1-3][0-9])',
    theme: '(white|black|blue|brown|green)',
    images: '(true|false|grayscale)',
    letterSpacing: '(normal|average|big)',
    lineHeight: '(normal|average|big)',
    speech: '(true|false)',
    fontFamily: '(arial|times)',
    builtElements: '(true|false)',
    fixedPanel: '(true|false)',
    panelHide: '(true|false)',
    reloadPage: '(true|false)',
    lang: '(ru-RU|en-US)'
  };
  var synth = window.speechSynthesis;
  var supportSynthBrowser = !(typeof synth === 'undefined');
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Bvi = /*#__PURE__*/function () {
    function Bvi() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Bvi);

      this._config = this._getConfig(options);
      this._target = document.querySelectorAll(this._config.target);
      this._breakpoint = {
        'sm': 576,
        'md': 768,
        'lg': 992,
        'xl': 1200,
        'xxl': 1400
      };
      this._i18n = new I18n({
        lang: this._config.lang
      });

      if (!this._target) {
        return false;
      }

      console.log('Bvi console: ready Button visually impaired v2.1.0');

      this._target.forEach(function (target) {
        target.addEventListener('click', function (event) {
          event.preventDefault();

          if (typeof getCookie('panelActive') !== 'undefined') {
            return false;
          }

          setCookie('panelActive', true);
          getKey(_this._config, function (key) {
            setCookie(key, _this._config[key]);
          });

          _this._speech("".concat(_this._i18n.v('panelOn')));

          _this._init();
        }, false);
      });

      this._init();
    } // Private


    _createClass(Bvi, [{
      key: "_init",
      value: function _init() {
        var _this2 = this;

        var selectorBviBody = document.querySelector('.bvi-body');
        var panelActive = stringToBoolean(getCookie('panelActive'));

        this._target.forEach(function (element) {
          return element.style.display = 'none';
        });

        getKey(this._config, function (key) {
          if (typeof getCookie(key) === 'undefined') {
            removeCookie('panelActive');
          }
        });

        if (panelActive) {
          wrapInner(document.body, 'div', 'bvi-body');

          this._setSettings();

          this._getPanel();

          this._btn();

          this._images();

          this._speechPlayer();

          if (supportSynthBrowser && stringToBoolean(getCookie('speech'))) {
            setInterval(function () {
              if (synth.pending === false) {
                var play = document.querySelectorAll('.bvi-speech-play');
                var pause = document.querySelectorAll('.bvi-speech-pause');
                var resume = document.querySelectorAll('.bvi-speech-resume');
                var stop = document.querySelectorAll('.bvi-speech-stop');

                var el = function el(elements, callback) {
                  elements.forEach(function (element) {
                    return callback(element);
                  });
                };

                el(play, function (element) {
                  return element.classList.remove('disabled');
                });
                el(pause, function (element) {
                  return element.classList.add('disabled');
                });
                el(resume, function (element) {
                  return element.classList.add('disabled');
                });
                el(stop, function (element) {
                  return element.classList.add('disabled');
                });
              }
            }, 1000);
          }

          document.body.classList.add('bvi-active');
          var selectorBviPanel = document.querySelector('.bvi-panel').classList;

          var scroll = function scroll() {
            var scroll = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            if (_this2._config.fixedPanel && selectorBviPanel) {
              if (scroll > 200) {
                selectorBviPanel.add('bvi-fixed-top');
              } else {
                selectorBviPanel.remove('bvi-fixed-top');
              }
            }
          };

          window.addEventListener('scroll', scroll);
          scroll();
        } else {
          this._target.forEach(function (element) {
            return element.style.display = 'block';
          });

          this._speech("".concat(this._i18n.v('panelOff')));

          document.querySelectorAll('img').forEach(function (element) {
            if (element.classList.contains('bvi-img')) {
              element.classList.remove('bvi-img');
            }
          });
          document.querySelectorAll('body *').forEach(function (element) {
            if (element.classList.contains('bvi-background-image')) {
              element.classList.remove('bvi-background-image');
            }
          });
          removeCookie('panelActive');
          unwrap(selectorBviBody);
          Object.keys(this._config).forEach(function (key) {
            removeCookie(key);
          });

          this._speechPlayer();

          document.body.classList.remove('bvi-active');

          if (this._config.reloadPage) {
            document.location.reload();
          }
        }
      }
    }, {
      key: "_setSettings",
      value: function _setSettings() {
        for (var key in this._config) {
          if ('target' === key || 'reloadPage' === key || 'fixedPanel' === key || 'panelHide' === key) {
            continue;
          }

          if (this._config.hasOwnProperty(key)) {
            this._setAttrDataBviBody(key, getCookie(key));
          }
        }
      }
    }, {
      key: "_setAttrDataBviBody",
      value: function _setAttrDataBviBody() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        document.querySelector('.bvi-body').setAttribute("data-bvi-".concat(name), value);
      }
    }, {
      key: "_getPanel",
      value: function _getPanel() {
        var div = document.createElement('div');
        var btnFixed = document.createElement('div');
        var panelHide = stringToBoolean(getCookie('panelHide')) ? ' bvi-panel-hide' : '';
        var fontSize = plural(getCookie('fontSize'), ["".concat(this._i18n.t('plural_0')), "".concat(this._i18n.t('plural_1')), "".concat(this._i18n.t('plural_2'))]);
        div.setAttribute('class', "bvi-panel".concat(panelHide));
        div.innerHTML = "\n    <div class=\"bvi-block-settings\">\n        <div class=\"bvi-blocks bvi-block-center\">\n            <div class=\"bvi-block\">\n               <h1>".concat(this._i18n.t('fontSize'), " <span class=\"bvi-fontSize\">").concat(fontSize, "</span></h1>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-fontSize=\"minus\">\u0410-</a>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-fontSize=\"plus\">\u0410+</a>\n            </div>\n            <div class=\"bvi-block\">\n                <h1>").concat(this._i18n.t('sitColors'), "</h1>\n                <a href=\"#\" class=\"bvi-btn bvi-theme-white\" data-bvi-btn-theme=\"white\">\u0426</a>\n                <a href=\"#\" class=\"bvi-btn bvi-theme-black\" data-bvi-btn-theme=\"black\">\u0426</a>\n                <a href=\"#\" class=\"bvi-btn bvi-theme-blue\" data-bvi-btn-theme=\"blue\">\u0426</a>\n                <a href=\"#\" class=\"bvi-btn bvi-theme-brown\" data-bvi-btn-theme=\"brown\">\u0426</a>\n                <a href=\"#\" class=\"bvi-btn bvi-theme-green\" data-bvi-btn-theme=\"green\">\u0426</a>\n            </div>\n            <div class=\"bvi-block\">\n                <h1>").concat(this._i18n.t('images'), "</h1>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-images=\"true\"><i class=\"bvi-images bvi-images-on\"></i></a>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-images=\"false\"><i class=\"bvi-images bvi-images-off\"></i></a>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-images=\"grayscale\"><i class=\"bvi-images bvi-images-adjust\"></i></a>\n            </div>\n            <div class=\"bvi-block\">\n                <h1>").concat(this._i18n.t('sound'), "</h1>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-speech=\"false\"><i class=\"bvi-images bvi-images-volume-off\"></i></a>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-speech=\"true\"><i class=\"bvi-images bvi-images-volume-on\"></i></a>\n            </div>\n            <div class=\"bvi-block\">\n                <h1>").concat(this._i18n.t('settings'), "</h1>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn=\"settings-more\"><i class=\"bvi-images bvi-images-cog\"></i></a>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn=\"close\">").concat(this._i18n.t('regularVersionOfTheSite'), "</a>\n                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn=\"panel-hide\"><i class=\"bvi-images bvi-images-minus-square-o\"></i></a>\n            </div>\n        </div>\n    </div>\n    <div class=\"bvi-modal\">\n        <div class=\"bvi-modal-dialog\">\n            <div class=\"bvi-modal-content\">\n                <div class=\"bvi-modal-header\">\n                    <h3 class=\"bvi-modal-title\">").concat(this._i18n.t('settings'), "</h3>\n                    <a href=\"#\" class=\"bvi-btn bvi-modal-close\" data-bvi-btn=\"close-modal\">\xD7</a>\n                </div>\n                <div class=\"bvi-modal-body\">\n                    <div class=\"bvi-block-settings-more\">\n                         <div class=\"bvi-blocks bvi-block-center\">\n                            <div class=\"bvi-block\">\n                                <h1>").concat(this._i18n.t('lineSpacing'), "</h1>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-lineHeight=\"normal\">").concat(this._i18n.t('standard'), "</a>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-lineHeight=\"average\">").concat(this._i18n.t('middle'), "</a>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-lineHeight=\"big\">").concat(this._i18n.t('large'), "</a>\n                            </div>\n                            <div class=\"bvi-block\">\n                                <h1>").concat(this._i18n.t('spacingBetweenLetters'), "</h1>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-letterSpacing=\"normal\">").concat(this._i18n.t('standard'), "</a>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-letterSpacing=\"average\">").concat(this._i18n.t('middle'), "</a>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-letterSpacing=\"big\">").concat(this._i18n.t('large'), "</a>\n                            </div>\n                            <div class=\"bvi-block\">\n                                <h1>").concat(this._i18n.t('font'), "</h1>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-fontFamily=\"arial\">").concat(this._i18n.t('sansSerif'), "</a>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-fontFamily=\"times\">").concat(this._i18n.t('serif'), "</a>\n                            </div>\n                            <div class=\"bvi-block\">\n                                <h1>").concat(this._i18n.t('built-inElements'), "</h1>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-builtElements=\"true\">").concat(this._i18n.t('on'), "</a>\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn-builtElements=\"false\">").concat(this._i18n.t('off'), "</a><br>\n                            </div>\n                        </div>\n                        <div class=\"bvi-blocks bvi-block-end\">\n                            <div class=\"bvi-block\">\n                                <a href=\"#\" class=\"bvi-btn\" data-bvi-btn=\"reset-settings\">").concat(this._i18n.t('resetSettings'), "</a>\n                            </div>\n                        </div>\n                        <div class=\"bvi-blocks bvi-block-center\">\n                            <a href=\"https://bvi.isvek.ru\" class=\"bvi-copyright\" target=\"_blank\">bvi.isvek.ru</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ");
        btnFixed.innerHTML = "<a href=\"#\" class=\"bvi-btn bvi-no-styles\" data-bvi-btn=\"panel-show\"><i class=\"bvi-images bvi-images-eye bvi-no-styles\"></i></a>";
        document.body.prepend(div);
        document.querySelector('.bvi-body').prepend(btnFixed);
        var hide = !stringToBoolean(getCookie('panelHide')) ? ' bvi-btn-hide' : '';
        btnFixed.setAttribute('class', "bvi-btn-fixed-top".concat(hide));
      }
    }, {
      key: "_btn",
      value: function _btn() {
        var _this3 = this;

        var btnActive = function btnActive(element) {
          var btnData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

          if (btnData === 'close' || btnData === 'settings-more' || btnData === 'reset-settings' || btnData === 'close-modal' || btnData === 'panel-hide' || btnData === 'panel-show') {
            return false;
          }

          var _iterator = _createForOfIteratorHelper(element.parentNode.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var sibling = _step.value;
              sibling.classList.remove('active');
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          element.classList.add('active');
        };

        var btn = document.querySelectorAll('.bvi-btn');
        getKey(this._config, function (key) {
          if (key === '') return false;
          var active = document.querySelector("[data-bvi-btn-".concat(key, "=\"").concat(getCookie(key), "\"]"));

          if (active) {
            active.classList.add('active');
          }
        });
        btn.forEach(function (element) {
          element.addEventListener('click', function (event) {
            event.preventDefault();
            var btnData = event.target.getAttribute('data-bvi-btn');
            var btnDataFontSize = event.target.getAttribute('data-bvi-btn-fontSize');
            var btnDataTheme = event.target.getAttribute('data-bvi-btn-theme');
            var btnDataImages = event.target.getAttribute('data-bvi-btn-images');
            var btnDataSpeech = event.target.getAttribute('data-bvi-btn-speech');
            var btnDataLineHeight = event.target.getAttribute('data-bvi-btn-lineHeight');
            var btnDataLetterSpacing = event.target.getAttribute('data-bvi-btn-letterSpacing');
            var btnDataFontFamily = event.target.getAttribute('data-bvi-btn-fontFamily');
            var btnDataBuiltElements = event.target.getAttribute('data-bvi-btn-builtElements'); // Fontsize

            if (btnDataFontSize === 'minus') {
              var size = parseFloat(getCookie('fontSize')) - 1;
              var fontSize = plural(size, ["".concat(_this3._i18n.t('plural_0')), "".concat(_this3._i18n.t('plural_1')), "".concat(_this3._i18n.t('plural_2'))]);

              if (size !== 0) {
                document.querySelector('.bvi-fontSize').innerHTML = "".concat(fontSize);

                _this3._speech("".concat(_this3._i18n.v('fontSizeMinus')));

                _this3._setAttrDataBviBody('fontSize', size);

                setCookie('fontSize', size);
              }
            }

            if (btnDataFontSize === 'plus') {
              var _size = parseFloat(getCookie('fontSize')) + 1;

              var _fontSize = plural(_size, ["".concat(_this3._i18n.t('plural_0')), "".concat(_this3._i18n.t('plural_1')), "".concat(_this3._i18n.t('plural_2'))]);

              if (_size !== 40) {
                document.querySelector('.bvi-fontSize').innerHTML = "".concat(_fontSize);

                _this3._speech("".concat(_this3._i18n.v('fontSizePlus')));

                _this3._setAttrDataBviBody('fontSize', _size);

                setCookie('fontSize', _size);
              }
            } // Theme


            if (btnDataTheme === 'white') {
              _this3._speech("".concat(_this3._i18n.v('siteColorBlackOnWhite')));

              _this3._setAttrDataBviBody('theme', 'white');

              setCookie('theme', 'white');
            }

            if (btnDataTheme === 'black') {
              _this3._speech("".concat(_this3._i18n.v('siteColorWhiteOnBlack')));

              _this3._setAttrDataBviBody('theme', 'black');

              setCookie('theme', 'black');
            }

            if (btnDataTheme === 'blue') {
              _this3._speech("".concat(_this3._i18n.v('siteColorDarkBlueOnBlue')));

              _this3._setAttrDataBviBody('theme', 'blue');

              setCookie('theme', 'blue');
            }

            if (btnDataTheme === 'brown') {
              _this3._speech("".concat(_this3._i18n.v('siteColorBeigeBrown')));

              _this3._setAttrDataBviBody('theme', 'brown');

              setCookie('theme', 'brown');
            }

            if (btnDataTheme === 'green') {
              _this3._speech("".concat(_this3._i18n.v('siteColorGreenOnDarkBrown')));

              _this3._setAttrDataBviBody('theme', 'green');

              setCookie('theme', 'green');
            } // Images


            if (btnDataImages === 'true') {
              _this3._speech("".concat(_this3._i18n.v('imagesOn')));

              _this3._setAttrDataBviBody('images', 'true');

              setCookie('images', 'true');
            }

            if (btnDataImages === 'false') {
              _this3._speech("".concat(_this3._i18n.v('imagesOF')));

              _this3._setAttrDataBviBody('images', 'false');

              setCookie('images', 'false');
            }

            if (btnDataImages === 'grayscale') {
              _this3._speech("".concat(_this3._i18n.v('imagesGrayscale')));

              _this3._setAttrDataBviBody('images', 'grayscale');

              setCookie('images', 'grayscale');
            }

            if (btnDataSpeech === 'true') {
              _this3._setAttrDataBviBody('speech', 'true');

              setCookie('speech', 'true');

              _this3._speech("".concat(_this3._i18n.v('speechOn')));

              _this3._speechPlayer();
            }

            if (btnDataSpeech === 'false') {
              _this3._speech("".concat(_this3._i18n.v('speechOff')));

              _this3._setAttrDataBviBody('speech', 'false');

              setCookie('speech', 'false');

              _this3._speechPlayer();
            } // lineHeight


            if (btnDataLineHeight === 'normal') {
              _this3._speech("".concat(_this3._i18n.v('lineHeightStandard')));

              _this3._setAttrDataBviBody('lineHeight', 'normal');

              setCookie('lineHeight', 'normal');
            }

            if (btnDataLineHeight === 'average') {
              _this3._speech("".concat(_this3._i18n.v('lineHeightMiddle')));

              _this3._setAttrDataBviBody('lineHeight', 'average');

              setCookie('lineHeight', 'average');
            }

            if (btnDataLineHeight === 'big') {
              _this3._speech("".concat(_this3._i18n.v('lineHeightLarge')));

              _this3._setAttrDataBviBody('lineHeight', 'big');

              setCookie('lineHeight', 'big');
            } // letterSpacing


            if (btnDataLetterSpacing === 'normal') {
              _this3._speech("".concat(_this3._i18n.v('LetterSpacingStandard')));

              _this3._setAttrDataBviBody('letterSpacing', 'normal');

              setCookie('letterSpacing', 'normal');
            }

            if (btnDataLetterSpacing === 'average') {
              _this3._speech("".concat(_this3._i18n.v('LetterSpacingMiddle')));

              _this3._setAttrDataBviBody('letterSpacing', 'average');

              setCookie('letterSpacing', 'average');
            }

            if (btnDataLetterSpacing === 'big') {
              _this3._speech("".concat(_this3._i18n.v('LetterSpacingLarge')));

              _this3._setAttrDataBviBody('letterSpacing', 'big');

              setCookie('letterSpacing', 'big');
            } // fontFamily


            if (btnDataFontFamily === 'arial') {
              _this3._speech("".concat(_this3._i18n.v('fontSansSerif')));

              _this3._setAttrDataBviBody('fontFamily', 'arial');

              setCookie('fontFamily', 'arial');
            }

            if (btnDataFontFamily === 'times') {
              _this3._speech("".concat(_this3._i18n.v('fontSerif')));

              _this3._setAttrDataBviBody('fontFamily', 'times');

              setCookie('fontFamily', 'times');
            } // builtElements


            if (btnDataBuiltElements === 'true') {
              _this3._speech("".concat(_this3._i18n.v('built-inElementsOn')));

              _this3._setAttrDataBviBody('builtElements', 'true');

              setCookie('builtElements', 'true');
            }

            if (btnDataBuiltElements === 'false') {
              _this3._speech("".concat(_this3._i18n.v('built-inElementsOFF')));

              _this3._setAttrDataBviBody('builtElements', 'false');

              setCookie('builtElements', 'false');
            } // Settings more


            if (btnData === 'settings-more') {
              var blockSettingsMore = document.querySelector('.bvi-modal');
              blockSettingsMore.classList.toggle('show');
            }

            if (btnData === 'close') {
              setCookie('panelActive', false);
              document.querySelector('.bvi-panel').remove();

              _this3._init();
            }

            if (btnData === 'close-modal') {
              document.querySelector('.bvi-modal').classList.remove('show');
            }

            if (btnData === 'panel-hide') {
              _this3._speech("".concat(_this3._i18n.v('panelHide')));

              setCookie('panelHide', 'true');
              document.querySelector('.bvi-panel').classList.add('bvi-panel-hide');
              document.querySelector('.bvi-btn-fixed-top').classList.remove('bvi-btn-hide');
            }

            if (btnData === 'panel-show') {
              _this3._speech("".concat(_this3._i18n.v('panelShow')));

              setCookie('panelHide', 'false');
              document.querySelector('.bvi-panel').classList.remove('bvi-panel-hide');
              document.querySelector('.bvi-btn-fixed-top').classList.add('bvi-btn-hide');
            }

            if (btnData === 'reset-settings') {
              getKey(_this3._config, function (key) {
                _this3._setAttrDataBviBody(key, _this3._config[key]);

                setCookie(key, _this3._config[key]);
                var active = document.querySelector("[data-bvi-btn-".concat(key, "=\"").concat(getCookie(key), "\"]"));
                var btnAll = document.querySelectorAll("[data-bvi-btn-".concat(key));
                btnAll.forEach(function (element) {
                  if (btnAll && element.classList.contains('active')) {
                    element.classList.remove('active');
                  }
                });

                if (active) {
                  active.classList.add('active');
                }
              });

              _this3._speech("".concat(_this3._i18n.v('resetSettings')));
            }

            btnActive(event.target, btnData);
          }, true);
        });
        var closeModal = document.querySelector('.bvi-modal');

        window.onclick = function (event) {
          if (event.target === closeModal) {
            closeModal.classList.remove('show');
          }
        };
      }
    }, {
      key: "_images",
      value: function _images() {
        document.querySelectorAll('img').forEach(function (element) {
          if (!element.classList.contains('bvi-no-style')) {
            element.classList.add('bvi-img');

            if (element.classList.contains('')) ;
          }
        });
        document.querySelectorAll('.bvi-body *').forEach(function (element) {
          var style = getComputedStyle(element);

          if (style.backgroundImage !== 'none' && style.background !== 'none' && !element.classList.contains('bvi-no-style')) {
            element.classList.add('bvi-background-image');
          }
        });
      }
    }, {
      key: "_speechPlayer",
      value: function _speechPlayer() {
        var _this4 = this;

        var selectorSpeechText = document.querySelectorAll('.bvi-speech-text');
        var selectorSpeechBtn = document.querySelectorAll('.bvi-speech-btn');
        var selectorBviSpeech = document.querySelectorAll('.bvi-speech');

        if (supportSynthBrowser && stringToBoolean(getCookie('speech'))) {
          if (selectorBviSpeech) {
            if (selectorSpeechText) {
              selectorSpeechText.forEach(function (element) {
                return unwrap(element);
              });
            }

            if (selectorSpeechBtn) {
              selectorSpeechBtn.forEach(function (element) {
                return element.remove();
              });
            }

            selectorBviSpeech.forEach(function (element, index) {
              var id = "bvi-speech-text-id-".concat(index + 1);
              var div = document.createElement('div');
              wrapInner(element, 'div', "bvi-speech-text ".concat(id));
              div.className = 'bvi-speech-btn';
              div.innerHTML = "\n          <a href=\"#\" class=\"bvi-btn bvi-speech-play\">\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438</a>\n          <a href=\"#\" class=\"bvi-btn bvi-speech-pause disabled\">\u041F\u0430\u0443\u0437\u0430</a>\n          <a href=\"#\" class=\"bvi-btn bvi-speech-resume disabled\">\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</a>\n          <a href=\"#\" class=\"bvi-btn bvi-speech-stop disabled\">\u0421\u0442\u043E\u043F</i></a>\n        ";
              element.prepend(div);
            });
          }

          var selectorPlay = document.querySelectorAll('.bvi-speech-play');
          var selectorPause = document.querySelectorAll('.bvi-speech-pause');
          var selectorResume = document.querySelectorAll('.bvi-speech-resume');
          var selectorStop = document.querySelectorAll('.bvi-speech-stop');

          var el = function el(elements, callback) {
            elements.forEach(function (element) {
              element.addEventListener('click', function (event) {
                event.preventDefault();

                if (typeof callback === 'function') {
                  return callback(element, event);
                }
              }, false);
            });
          };

          el(selectorPlay, function (element, event) {
            var target = event.target;
            var text = target.parentNode.nextElementSibling;
            var closest = event.target.closest('.bvi-speech-btn');
            var play = document.querySelectorAll('.bvi-speech-play');
            var pause = document.querySelectorAll('.bvi-speech-pause');
            var resume = document.querySelectorAll('.bvi-speech-resume');
            var stop = document.querySelectorAll('.bvi-speech-stop');

            _this4._speech(text.textContent, text, true);

            play.forEach(function (element) {
              return element.classList.remove('disabled');
            });
            pause.forEach(function (element) {
              return element.classList.add('disabled');
            });
            resume.forEach(function (element) {
              return element.classList.add('disabled');
            });
            stop.forEach(function (element) {
              return element.classList.add('disabled');
            });
            target.classList.add('disabled');
            closest.querySelector('.bvi-speech-pause').classList.remove('disabled');
            closest.querySelector('.bvi-speech-stop').classList.remove('disabled');
          });
          el(selectorPause, function (element, event) {
            var target = event.target;
            var closest = event.target.closest('.bvi-speech-btn');
            target.classList.add('disabled');
            closest.querySelector('.bvi-speech-resume').classList.remove('disabled');
            synth.pause();
          });
          el(selectorResume, function (element, event) {
            var target = event.target;
            var closest = event.target.closest('.bvi-speech-btn');
            target.classList.add('disabled');
            closest.querySelector('.bvi-speech-pause').classList.remove('disabled');
            synth.resume();
          });
          el(selectorStop, function (element, event) {
            var target = event.target;
            var closest = event.target.closest('.bvi-speech-btn');
            target.classList.add('disabled');
            closest.querySelector('.bvi-speech-pause').classList.add('disabled');
            closest.querySelector('.bvi-speech-play').classList.remove('disabled');
            synth.cancel();
          });
        } else {
          if (selectorSpeechText) {
            selectorSpeechText.forEach(function (element) {
              return unwrap(element);
            });
          }

          if (selectorSpeechBtn) {
            selectorSpeechBtn.forEach(function (element) {
              return element.remove();
            });
          }
        }
      }
    }, {
      key: "_speech",
      value: function _speech(text) {
        var _this5 = this;

        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var echo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (supportSynthBrowser && stringToBoolean(getCookie('speech'))) {
          synth.cancel();
          var voices = synth.getVoices();
          var chunkLength = 120;
          var patternRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
          var array = [];
          var $text = text;

          var getWordAt = function getWordAt(str, pos) {
            str = String(str);
            pos = Number(pos) >>> 0;
            var left = str.slice(0, pos + 1).search(/\S+$/);
            var right = str.slice(pos).search(/\s/);

            if (right < 0) {
              return str.slice(left);
            }

            return str.slice(left, right + pos);
          };

          while ($text.length > 0) {
            array.push($text.match(patternRegex)[0]);
            $text = $text.substring(array[array.length - 1].length);
          }

          array.forEach(function (getText) {
            var utter = new SpeechSynthesisUtterance(getText.trim());
            utter.volume = 1;
            utter.rate = 1;
            utter.pitch = 1;
            utter.lang = "".concat(_this5._config.lang);

            for (var i = 0; i < voices.length; i++) {
              if (voices[i].lang === _this5._config.lang && voices[i].name === 'Microsoft Pavel - Russian (Russia)') {
                utter.voice = voices[i];
              }
            }

            if (echo) {
              utter.onboundary = function (event) {
                element.classList.add('bvi-highlighting');
                var world = getWordAt(event.utterance.text, event.charIndex);
                var textContent = element.textContent;
                var term = world.replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");
                var pattern = new RegExp("(" + term + ")", "gi");
                textContent = textContent.replace(pattern, "<mark>$1</mark>");
                textContent = textContent.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4");
                element.innerHTML = textContent;
              };

              utter.onend = function (event) {
                element.classList.remove('bvi-highlighting');
                var textContent = element.textContent;
                textContent = textContent.replace(/(<mark>$1<\/mark>)/, "$1");
                element.innerHTML = textContent;
              };
            }

            synth.speak(utter);
          });
        }
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread2(_objectSpread2({}, Default), config);
        checkConfig(config, DefaultType, DefaultOptions);
        return config;
      }
    }]);

    return Bvi;
  }();

  /**
   * --------------------------------------------------------------------------
   * Button visually impaired (v1.0.0): index.umd.js
   * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var index_umd = {
    Bvi: Bvi
  };

  return index_umd;

})));
//# sourceMappingURL=bvi.js.map
