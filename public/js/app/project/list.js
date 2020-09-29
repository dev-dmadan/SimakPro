/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
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
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
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
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
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
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
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
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
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

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

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
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
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
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
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
          context.arg = undefined;
        }

        return !! caught;
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

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
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

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
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

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
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
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/sweetalert2/dist/sweetalert2.all.js":
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/dist/sweetalert2.all.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
* sweetalert2 v9.17.2
* Released under the MIT License.
*/
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, function () { 'use strict';

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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var consolePrefix = 'SweetAlert2:';
  /**
   * Filter the unique values into a new array
   * @param arr
   */

  var uniqueArray = function uniqueArray(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }

    return result;
  };
  /**
   * Capitalize the first letter of a string
   * @param str
   */

  var capitalizeFirstLetter = function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  /**
   * Returns the array of object values (Object.values isn't supported in IE11)
   * @param obj
   */

  var objectValues = function objectValues(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };
  /**
   * Convert NodeList to Array
   * @param nodeList
   */

  var toArray = function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };
  /**
   * Standardise console warnings
   * @param message
   */

  var warn = function warn(message) {
    console.warn("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Standardise console errors
   * @param message
   */

  var error = function error(message) {
    console.error("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Private global state for `warnOnce`
   * @type {Array}
   * @private
   */

  var previousWarnOnceMessages = [];
  /**
   * Show a console warning, but only if it hasn't already been shown
   * @param message
   */

  var warnOnce = function warnOnce(message) {
    if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };
  /**
   * Show a one-time console warning about deprecated params/methods
   */

  var warnAboutDepreation = function warnAboutDepreation(deprecatedParam, useInstead) {
    warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
  };
  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   * @param arg
   */

  var callIfFunction = function callIfFunction(arg) {
    return typeof arg === 'function' ? arg() : arg;
  };
  var hasToPromiseFn = function hasToPromiseFn(arg) {
    return arg && typeof arg.toPromise === 'function';
  };
  var asPromise = function asPromise(arg) {
    return hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);
  };
  var isPromise = function isPromise(arg) {
    return arg && Promise.resolve(arg) === arg;
  };

  var DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  var isJqueryElement = function isJqueryElement(elem) {
    return _typeof(elem) === 'object' && elem.jquery;
  };

  var isElement = function isElement(elem) {
    return elem instanceof Element || isJqueryElement(elem);
  };

  var argsToParams = function argsToParams(args) {
    var params = {};

    if (_typeof(args[0]) === 'object' && !isElement(args[0])) {
      _extends(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach(function (name, index) {
        var arg = args[index];

        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error("Unexpected type of ".concat(name, "! Expected \"string\" or \"Element\", got ").concat(_typeof(arg)));
        }
      });
    }

    return params;
  };

  var swalPrefix = 'swal2-';
  var prefix = function prefix(items) {
    var result = {};

    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }

    return result;
  };
  var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'toast-column', 'show', 'hide', 'close', 'title', 'header', 'content', 'html-container', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error']);
  var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

  var getContainer = function getContainer() {
    return document.body.querySelector(".".concat(swalClasses.container));
  };
  var elementBySelector = function elementBySelector(selectorString) {
    var container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  var elementByClass = function elementByClass(className) {
    return elementBySelector(".".concat(className));
  };

  var getPopup = function getPopup() {
    return elementByClass(swalClasses.popup);
  };
  var getIcons = function getIcons() {
    var popup = getPopup();
    return toArray(popup.querySelectorAll(".".concat(swalClasses.icon)));
  };
  var getIcon = function getIcon() {
    var visibleIcon = getIcons().filter(function (icon) {
      return isVisible(icon);
    });
    return visibleIcon.length ? visibleIcon[0] : null;
  };
  var getTitle = function getTitle() {
    return elementByClass(swalClasses.title);
  };
  var getContent = function getContent() {
    return elementByClass(swalClasses.content);
  };
  var getHtmlContainer = function getHtmlContainer() {
    return elementByClass(swalClasses['html-container']);
  };
  var getImage = function getImage() {
    return elementByClass(swalClasses.image);
  };
  var getProgressSteps = function getProgressSteps() {
    return elementByClass(swalClasses['progress-steps']);
  };
  var getValidationMessage = function getValidationMessage() {
    return elementByClass(swalClasses['validation-message']);
  };
  var getConfirmButton = function getConfirmButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.confirm));
  };
  var getCancelButton = function getCancelButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.cancel));
  };
  var getActions = function getActions() {
    return elementByClass(swalClasses.actions);
  };
  var getHeader = function getHeader() {
    return elementByClass(swalClasses.header);
  };
  var getFooter = function getFooter() {
    return elementByClass(swalClasses.footer);
  };
  var getTimerProgressBar = function getTimerProgressBar() {
    return elementByClass(swalClasses['timer-progress-bar']);
  };
  var getCloseButton = function getCloseButton() {
    return elementByClass(swalClasses.close);
  }; // https://github.com/jkup/focusable/blob/master/index.js

  var focusable = "\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex=\"0\"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n";
  var getFocusableElements = function getFocusableElements() {
    var focusableElementsWithTabindex = toArray(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
    .sort(function (a, b) {
      a = parseInt(a.getAttribute('tabindex'));
      b = parseInt(b.getAttribute('tabindex'));

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 0;
    });
    var otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(function (el) {
      return el.getAttribute('tabindex') !== '-1';
    });
    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(function (el) {
      return isVisible(el);
    });
  };
  var isModal = function isModal() {
    return !isToast() && !document.body.classList.contains(swalClasses['no-backdrop']);
  };
  var isToast = function isToast() {
    return document.body.classList.contains(swalClasses['toast-shown']);
  };
  var isLoading = function isLoading() {
    return getPopup().hasAttribute('data-loading');
  };

  var states = {
    previousBodyPadding: null
  };
  var setInnerHtml = function setInnerHtml(elem, html) {
    // #1926
    elem.textContent = '';

    if (html) {
      var parser = new DOMParser();
      var parsed = parser.parseFromString(html, "text/html");
      toArray(parsed.querySelector('head').childNodes).forEach(function (child) {
        elem.appendChild(child);
      });
      toArray(parsed.querySelector('body').childNodes).forEach(function (child) {
        elem.appendChild(child);
      });
    }
  };
  var hasClass = function hasClass(elem, className) {
    if (!className) {
      return false;
    }

    var classList = className.split(/\s+/);

    for (var i = 0; i < classList.length; i++) {
      if (!elem.classList.contains(classList[i])) {
        return false;
      }
    }

    return true;
  };

  var removeCustomClasses = function removeCustomClasses(elem, params) {
    toArray(elem.classList).forEach(function (className) {
      if (!(objectValues(swalClasses).indexOf(className) !== -1) && !(objectValues(iconTypes).indexOf(className) !== -1) && !(objectValues(params.showClass).indexOf(className) !== -1)) {
        elem.classList.remove(className);
      }
    });
  };

  var applyCustomClass = function applyCustomClass(elem, params, className) {
    removeCustomClasses(elem, params);

    if (params.customClass && params.customClass[className]) {
      if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
        return warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(_typeof(params.customClass[className]), "\""));
      }

      addClass(elem, params.customClass[className]);
    }
  };
  function getInput(content, inputType) {
    if (!inputType) {
      return null;
    }

    switch (inputType) {
      case 'select':
      case 'textarea':
      case 'file':
        return getChildByClass(content, swalClasses[inputType]);

      case 'checkbox':
        return content.querySelector(".".concat(swalClasses.checkbox, " input"));

      case 'radio':
        return content.querySelector(".".concat(swalClasses.radio, " input:checked")) || content.querySelector(".".concat(swalClasses.radio, " input:first-child"));

      case 'range':
        return content.querySelector(".".concat(swalClasses.range, " input"));

      default:
        return getChildByClass(content, swalClasses.input);
    }
  }
  var focusInput = function focusInput(input) {
    input.focus(); // place cursor at end of text in text input

    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      var val = input.value;
      input.value = '';
      input.value = val;
    }
  };
  var toggleClass = function toggleClass(target, classList, condition) {
    if (!target || !classList) {
      return;
    }

    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }

    classList.forEach(function (className) {
      if (target.forEach) {
        target.forEach(function (elem) {
          condition ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        condition ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };
  var addClass = function addClass(target, classList) {
    toggleClass(target, classList, true);
  };
  var removeClass = function removeClass(target, classList) {
    toggleClass(target, classList, false);
  };
  var getChildByClass = function getChildByClass(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };
  var applyNumericalStyle = function applyNumericalStyle(elem, property, value) {
    if (value || parseInt(value) === 0) {
      elem.style[property] = typeof value === 'number' ? "".concat(value, "px") : value;
    } else {
      elem.style.removeProperty(property);
    }
  };
  var show = function show(elem) {
    var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    elem.style.opacity = '';
    elem.style.display = display;
  };
  var hide = function hide(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };
  var toggle = function toggle(elem, condition, display) {
    condition ? show(elem, display) : hide(elem);
  }; // borrowed from jquery $(elem).is(':visible') implementation

  var isVisible = function isVisible(elem) {
    return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
  };
  /* istanbul ignore next */

  var isScrollable = function isScrollable(elem) {
    return !!(elem.scrollHeight > elem.clientHeight);
  }; // borrowed from https://stackoverflow.com/a/46352119

  var hasCssAnimation = function hasCssAnimation(elem) {
    var style = window.getComputedStyle(elem);
    var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };
  var contains = function contains(haystack, needle) {
    if (typeof haystack.contains === 'function') {
      return haystack.contains(needle);
    }
  };
  var animateTimerProgressBar = function animateTimerProgressBar(timer) {
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var timerProgressBar = getTimerProgressBar();

    if (isVisible(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }

      setTimeout(function () {
        timerProgressBar.style.transition = "width ".concat(timer / 1000, "s linear");
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  var stopTimerProgressBar = function stopTimerProgressBar() {
    var timerProgressBar = getTimerProgressBar();
    var timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    var timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    var timerProgressBarPercent = parseInt(timerProgressBarWidth / timerProgressBarFullWidth * 100);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
  };

  // Detect Node env
  var isNodeEnv = function isNodeEnv() {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  var sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <div class=\"").concat(swalClasses.header, "\">\n     <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.error, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.question, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.warning, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.info, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.success, "\"></div>\n     <img class=\"").concat(swalClasses.image, "\" />\n     <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n     <button type=\"button\" class=\"").concat(swalClasses.close, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.content, "\">\n     <div id=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses['html-container'], "\"></div>\n     <input class=\"").concat(swalClasses.input, "\" />\n     <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n     <div class=\"").concat(swalClasses.range, "\">\n       <input type=\"range\" />\n       <output></output>\n     </div>\n     <select class=\"").concat(swalClasses.select, "\"></select>\n     <div class=\"").concat(swalClasses.radio, "\"></div>\n     <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n       <input type=\"checkbox\" />\n       <span class=\"").concat(swalClasses.label, "\"></span>\n     </label>\n     <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n     <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   </div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\">OK</button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\">Cancel</button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\"></div>\n   <div class=\"").concat(swalClasses['timer-progress-bar-container'], "\">\n     <div class=\"").concat(swalClasses['timer-progress-bar'], "\"></div>\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');

  var resetOldContainer = function resetOldContainer() {
    var oldContainer = getContainer();

    if (!oldContainer) {
      return false;
    }

    oldContainer.parentNode.removeChild(oldContainer);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    return true;
  };

  var oldInputVal; // IE11 workaround, see #1109 for details

  var resetValidationMessage = function resetValidationMessage(e) {
    if (Swal.isVisible() && oldInputVal !== e.target.value) {
      Swal.resetValidationMessage();
    }

    oldInputVal = e.target.value;
  };

  var addInputChangeListeners = function addInputChangeListeners() {
    var content = getContent();
    var input = getChildByClass(content, swalClasses.input);
    var file = getChildByClass(content, swalClasses.file);
    var range = content.querySelector(".".concat(swalClasses.range, " input"));
    var rangeOutput = content.querySelector(".".concat(swalClasses.range, " output"));
    var select = getChildByClass(content, swalClasses.select);
    var checkbox = content.querySelector(".".concat(swalClasses.checkbox, " input"));
    var textarea = getChildByClass(content, swalClasses.textarea);
    input.oninput = resetValidationMessage;
    file.onchange = resetValidationMessage;
    select.onchange = resetValidationMessage;
    checkbox.onchange = resetValidationMessage;
    textarea.oninput = resetValidationMessage;

    range.oninput = function (e) {
      resetValidationMessage(e);
      rangeOutput.value = range.value;
    };

    range.onchange = function (e) {
      resetValidationMessage(e);
      range.nextSibling.value = range.value;
    };
  };

  var getTarget = function getTarget(target) {
    return typeof target === 'string' ? document.querySelector(target) : target;
  };

  var setupAccessibility = function setupAccessibility(params) {
    var popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  var setupRTL = function setupRTL(targetElement) {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
    }
  };
  /*
   * Add modal + backdrop to DOM
   */


  var init = function init(params) {
    // Clean up the old popup container if it exists
    var oldContainerExisted = resetOldContainer();
    /* istanbul ignore if */

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    var container = document.createElement('div');
    container.className = swalClasses.container;

    if (oldContainerExisted) {
      addClass(container, swalClasses['no-transition']);
    }

    setInnerHtml(container, sweetHTML);
    var targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param); // Object
    } else if (_typeof(param) === 'object') {
      handleObject(param, target); // Plain string
    } else if (param) {
      setInnerHtml(target, param);
    }
  };

  var handleObject = function handleObject(param, target) {
    // JQuery element(s)
    if (param.jquery) {
      handleJqueryElem(target, param); // For other objects use their string representation
    } else {
      setInnerHtml(target, param.toString());
    }
  };

  var handleJqueryElem = function handleJqueryElem(target, elem) {
    target.textContent = '';

    if (0 in elem) {
      for (var i = 0; (i in elem); i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  var animationEndEvent = function () {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (isNodeEnv()) {
      return false;
    }

    var testEl = document.createElement('div');
    var transEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      OAnimation: 'oAnimationEnd oanimationend',
      animation: 'animationend'
    };

    for (var i in transEndEventNames) {
      if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  }();

  // https://github.com/twbs/bootstrap/blob/master/js/src/modal.js

  var measureScrollbar = function measureScrollbar() {
    var scrollDiv = document.createElement('div');
    scrollDiv.className = swalClasses['scrollbar-measure'];
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  var renderActions = function renderActions(instance, params) {
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton(); // Actions (buttons) wrapper

    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(actions);
    } // Custom class


    applyCustomClass(actions, params, 'actions'); // Render confirm button

    renderButton(confirmButton, 'confirm', params); // render Cancel Button

    renderButton(cancelButton, 'cancel', params);

    if (params.buttonsStyling) {
      handleButtonsStyling(confirmButton, cancelButton, params);
    } else {
      removeClass([confirmButton, cancelButton], swalClasses.styled);
      confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
      cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
    }

    if (params.reverseButtons) {
      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
    }
  };

  function handleButtonsStyling(confirmButton, cancelButton, params) {
    addClass([confirmButton, cancelButton], swalClasses.styled); // Buttons background colors

    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }

    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    } // Loading state


    if (!isLoading()) {
      var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
      confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
      confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
    }
  }

  function renderButton(button, buttonType, params) {
    toggle(button, params["show".concat(capitalizeFirstLetter(buttonType), "Button")], 'inline-block');
    setInnerHtml(button, params["".concat(buttonType, "ButtonText")]); // Set caption text

    button.setAttribute('aria-label', params["".concat(buttonType, "ButtonAriaLabel")]); // ARIA label
    // Add buttons custom classes

    button.className = swalClasses[buttonType];
    applyCustomClass(button, params, "".concat(buttonType, "Button"));
    addClass(button, params["".concat(buttonType, "ButtonClass")]);
  }

  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }

  function handlePositionParam(container, position) {
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }

  function handleGrowParam(container, grow) {
    if (grow && typeof grow === 'string') {
      var growClass = "grow-".concat(grow);

      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    }
  }

  var renderContainer = function renderContainer(instance, params) {
    var container = getContainer();

    if (!container) {
      return;
    }

    handleBackdropParam(container, params.backdrop);

    if (!params.backdrop && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }

    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow); // Custom class

    applyCustomClass(container, params, 'container'); // Set queue step attribute for getQueueStep() method

    var queueStep = document.body.getAttribute('data-swal2-queue-step');

    if (queueStep) {
      container.setAttribute('data-queue-step', queueStep);
      document.body.removeAttribute('data-swal2-queue-step');
    }
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateProps = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };

  var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
  var renderInput = function renderInput(instance, params) {
    var content = getContent();
    var innerParams = privateProps.innerParams.get(instance);
    var rerender = !innerParams || params.input !== innerParams.input;
    inputTypes.forEach(function (inputType) {
      var inputClass = swalClasses[inputType];
      var inputContainer = getChildByClass(content, inputClass); // set attributes

      setAttributes(inputType, params.inputAttributes); // set class

      inputContainer.className = inputClass;

      if (rerender) {
        hide(inputContainer);
      }
    });

    if (params.input) {
      if (rerender) {
        showInput(params);
      } // set custom class


      setCustomClass(params);
    }
  };

  var showInput = function showInput(params) {
    if (!renderInputType[params.input]) {
      return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
    }

    var inputContainer = getInputContainer(params.input);
    var input = renderInputType[params.input](inputContainer, params);
    show(input); // input autofocus

    setTimeout(function () {
      focusInput(input);
    });
  };

  var removeAttributes = function removeAttributes(input) {
    for (var i = 0; i < input.attributes.length; i++) {
      var attrName = input.attributes[i].name;

      if (!(['type', 'value', 'style'].indexOf(attrName) !== -1)) {
        input.removeAttribute(attrName);
      }
    }
  };

  var setAttributes = function setAttributes(inputType, inputAttributes) {
    var input = getInput(getContent(), inputType);

    if (!input) {
      return;
    }

    removeAttributes(input);

    for (var attr in inputAttributes) {
      // Do not set a placeholder for <input type="range">
      // it'll crash Edge, #1298
      if (inputType === 'range' && attr === 'placeholder') {
        continue;
      }

      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  var setCustomClass = function setCustomClass(params) {
    var inputContainer = getInputContainer(params.input);

    if (params.customClass) {
      addClass(inputContainer, params.customClass.input);
    }
  };

  var setInputPlaceholder = function setInputPlaceholder(input, params) {
    if (!input.placeholder || params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  var getInputContainer = function getInputContainer(inputType) {
    var inputClass = swalClasses[inputType] ? swalClasses[inputType] : swalClasses.input;
    return getChildByClass(getContent(), inputClass);
  };

  var renderInputType = {};

  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = function (input, params) {
    if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
      input.value = params.inputValue;
    } else if (!isPromise(params.inputValue)) {
      warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(_typeof(params.inputValue), "\""));
    }

    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  renderInputType.file = function (input, params) {
    setInputPlaceholder(input, params);
    return input;
  };

  renderInputType.range = function (range, params) {
    var rangeInput = range.querySelector('input');
    var rangeOutput = range.querySelector('output');
    rangeInput.value = params.inputValue;
    rangeInput.type = params.input;
    rangeOutput.value = params.inputValue;
    return range;
  };

  renderInputType.select = function (select, params) {
    select.textContent = '';

    if (params.inputPlaceholder) {
      var placeholder = document.createElement('option');
      setInnerHtml(placeholder, params.inputPlaceholder);
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }

    return select;
  };

  renderInputType.radio = function (radio) {
    radio.textContent = '';
    return radio;
  };

  renderInputType.checkbox = function (checkboxContainer, params) {
    var checkbox = getInput(getContent(), 'checkbox');
    checkbox.value = 1;
    checkbox.id = swalClasses.checkbox;
    checkbox.checked = Boolean(params.inputValue);
    var label = checkboxContainer.querySelector('span');
    setInnerHtml(label, params.inputPlaceholder);
    return checkboxContainer;
  };

  renderInputType.textarea = function (textarea, params) {
    textarea.value = params.inputValue;
    setInputPlaceholder(textarea, params);

    if ('MutationObserver' in window) {
      // #1699
      var initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
      var popupPadding = parseInt(window.getComputedStyle(getPopup()).paddingLeft) + parseInt(window.getComputedStyle(getPopup()).paddingRight);

      var outputsize = function outputsize() {
        var contentWidth = textarea.offsetWidth + popupPadding;

        if (contentWidth > initialPopupWidth) {
          getPopup().style.width = "".concat(contentWidth, "px");
        } else {
          getPopup().style.width = null;
        }
      };

      new MutationObserver(outputsize).observe(textarea, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    return textarea;
  };

  var renderContent = function renderContent(instance, params) {
    var content = getContent().querySelector("#".concat(swalClasses.content)); // Content as HTML

    if (params.html) {
      parseHtmlToContainer(params.html, content);
      show(content, 'block'); // Content as plain text
    } else if (params.text) {
      content.textContent = params.text;
      show(content, 'block'); // No content
    } else {
      hide(content);
    }

    renderInput(instance, params); // Custom class

    applyCustomClass(getContent(), params, 'content');
  };

  var renderFooter = function renderFooter(instance, params) {
    var footer = getFooter();
    toggle(footer, params.footer);

    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    } // Custom class


    applyCustomClass(footer, params, 'footer');
  };

  var renderCloseButton = function renderCloseButton(instance, params) {
    var closeButton = getCloseButton();
    setInnerHtml(closeButton, params.closeButtonHtml); // Custom class

    applyCustomClass(closeButton, params, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
  };

  var renderIcon = function renderIcon(instance, params) {
    var innerParams = privateProps.innerParams.get(instance); // if the give icon already rendered, apply the custom class without re-rendering the icon

    if (innerParams && params.icon === innerParams.icon && getIcon()) {
      applyCustomClass(getIcon(), params, 'icon');
      return;
    }

    hideAllIcons();

    if (!params.icon) {
      return;
    }

    if (Object.keys(iconTypes).indexOf(params.icon) !== -1) {
      var icon = elementBySelector(".".concat(swalClasses.icon, ".").concat(iconTypes[params.icon]));
      show(icon); // Custom or default content

      setContent(icon, params);
      adjustSuccessIconBackgoundColor(); // Custom class

      applyCustomClass(icon, params, 'icon'); // Animate icon

      addClass(icon, params.showClass.icon);
    } else {
      error("Unknown icon! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.icon, "\""));
    }
  };

  var hideAllIcons = function hideAllIcons() {
    var icons = getIcons();

    for (var i = 0; i < icons.length; i++) {
      hide(icons[i]);
    }
  }; // Adjust success icon background color to match the popup background color


  var adjustSuccessIconBackgoundColor = function adjustSuccessIconBackgoundColor() {
    var popup = getPopup();
    var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

    for (var i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }
  };

  var setContent = function setContent(icon, params) {
    icon.textContent = '';

    if (params.iconHtml) {
      setInnerHtml(icon, iconContent(params.iconHtml));
    } else if (params.icon === 'success') {
      setInnerHtml(icon, "\n      <div class=\"swal2-success-circular-line-left\"></div>\n      <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n      <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n      <div class=\"swal2-success-circular-line-right\"></div>\n    ");
    } else if (params.icon === 'error') {
      setInnerHtml(icon, "\n      <span class=\"swal2-x-mark\">\n        <span class=\"swal2-x-mark-line-left\"></span>\n        <span class=\"swal2-x-mark-line-right\"></span>\n      </span>\n    ");
    } else {
      var defaultIconHtml = {
        question: '?',
        warning: '!',
        info: 'i'
      };
      setInnerHtml(icon, iconContent(defaultIconHtml[params.icon]));
    }
  };

  var iconContent = function iconContent(content) {
    return "<div class=\"".concat(swalClasses['icon-content'], "\">").concat(content, "</div>");
  };

  var renderImage = function renderImage(instance, params) {
    var image = getImage();

    if (!params.imageUrl) {
      return hide(image);
    }

    show(image, ''); // Src, alt

    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt); // Width, height

    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight); // Class

    image.className = swalClasses.image;
    applyCustomClass(image, params, 'image');
  };

  var currentSteps = [];
  /*
   * Global function for chaining sweetAlert popups
   */

  var queue = function queue(steps) {
    var Swal = this;
    currentSteps = steps;

    var resetAndResolve = function resetAndResolve(resolve, value) {
      currentSteps = [];
      resolve(value);
    };

    var queueResult = [];
    return new Promise(function (resolve) {
      (function step(i, callback) {
        if (i < currentSteps.length) {
          document.body.setAttribute('data-swal2-queue-step', i);
          Swal.fire(currentSteps[i]).then(function (result) {
            if (typeof result.value !== 'undefined') {
              queueResult.push(result.value);
              step(i + 1, callback);
            } else {
              resetAndResolve(resolve, {
                dismiss: result.dismiss
              });
            }
          });
        } else {
          resetAndResolve(resolve, {
            value: queueResult
          });
        }
      })(0);
    });
  };
  /*
   * Global function for getting the index of current popup in queue
   */

  var getQueueStep = function getQueueStep() {
    return getContainer() && getContainer().getAttribute('data-queue-step');
  };
  /*
   * Global function for inserting a popup to the queue
   */

  var insertQueueStep = function insertQueueStep(step, index) {
    if (index && index < currentSteps.length) {
      return currentSteps.splice(index, 0, step);
    }

    return currentSteps.push(step);
  };
  /*
   * Global function for deleting a popup from the queue
   */

  var deleteQueueStep = function deleteQueueStep(index) {
    if (typeof currentSteps[index] !== 'undefined') {
      currentSteps.splice(index, 1);
    }
  };

  var createStepElement = function createStepElement(step) {
    var stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    setInnerHtml(stepEl, step);
    return stepEl;
  };

  var createLineElement = function createLineElement(params) {
    var lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);

    if (params.progressStepsDistance) {
      lineEl.style.width = params.progressStepsDistance;
    }

    return lineEl;
  };

  var renderProgressSteps = function renderProgressSteps(instance, params) {
    var progressStepsContainer = getProgressSteps();

    if (!params.progressSteps || params.progressSteps.length === 0) {
      return hide(progressStepsContainer);
    }

    show(progressStepsContainer);
    progressStepsContainer.textContent = '';
    var currentProgressStep = parseInt(params.currentProgressStep === undefined ? getQueueStep() : params.currentProgressStep);

    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }

    params.progressSteps.forEach(function (step, index) {
      var stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);

      if (index === currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }

      if (index !== params.progressSteps.length - 1) {
        var lineEl = createLineElement(params);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };

  var renderTitle = function renderTitle(instance, params) {
    var title = getTitle();
    toggle(title, params.title || params.titleText);

    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }

    if (params.titleText) {
      title.innerText = params.titleText;
    } // Custom class


    applyCustomClass(title, params, 'title');
  };

  var renderHeader = function renderHeader(instance, params) {
    var header = getHeader(); // Custom class

    applyCustomClass(header, params, 'header'); // Progress steps

    renderProgressSteps(instance, params); // Icon

    renderIcon(instance, params); // Image

    renderImage(instance, params); // Title

    renderTitle(instance, params); // Close button

    renderCloseButton(instance, params);
  };

  var renderPopup = function renderPopup(instance, params) {
    var popup = getPopup(); // Width

    applyNumericalStyle(popup, 'width', params.width); // Padding

    applyNumericalStyle(popup, 'padding', params.padding); // Background

    if (params.background) {
      popup.style.background = params.background;
    } // Classes


    addClasses(popup, params);
  };

  var addClasses = function addClasses(popup, params) {
    // Default Class + showClass when updating Swal.update({})
    popup.className = "".concat(swalClasses.popup, " ").concat(isVisible(popup) ? params.showClass.popup : '');

    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    } // Custom class


    applyCustomClass(popup, params, 'popup');

    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    } // Icon class (#1842)


    if (params.icon) {
      addClass(popup, swalClasses["icon-".concat(params.icon)]);
    }
  };

  var render = function render(instance, params) {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderHeader(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);

    if (typeof params.onRender === 'function') {
      params.onRender(getPopup());
    }
  };

  /*
   * Global function to determine if SweetAlert2 popup is shown
   */

  var isVisible$1 = function isVisible$$1() {
    return isVisible(getPopup());
  };
  /*
   * Global function to click 'Confirm' button
   */

  var clickConfirm = function clickConfirm() {
    return getConfirmButton() && getConfirmButton().click();
  };
  /*
   * Global function to click 'Cancel' button
   */

  var clickCancel = function clickCancel() {
    return getCancelButton() && getCancelButton().click();
  };

  function fire() {
    var Swal = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Swal, args);
  }

  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */
  function mixin(mixinParams) {
    var MixinSwal = /*#__PURE__*/function (_this) {
      _inherits(MixinSwal, _this);

      var _super = _createSuper(MixinSwal);

      function MixinSwal() {
        _classCallCheck(this, MixinSwal);

        return _super.apply(this, arguments);
      }

      _createClass(MixinSwal, [{
        key: "_main",
        value: function _main(params) {
          return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, _extends({}, mixinParams, params));
        }
      }]);

      return MixinSwal;
    }(this);

    return MixinSwal;
  }

  /**
   * Show spinner instead of Confirm button
   */

  var showLoading = function showLoading() {
    var popup = getPopup();

    if (!popup) {
      Swal.fire();
    }

    popup = getPopup();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    show(actions);
    show(confirmButton, 'inline-block');
    addClass([popup, actions], swalClasses.loading);
    confirmButton.disabled = true;
    popup.setAttribute('data-loading', true);
    popup.setAttribute('aria-busy', true);
    popup.focus();
  };

  var RESTORE_FOCUS_TIMEOUT = 100;

  var globalState = {};

  var focusPreviousActiveElement = function focusPreviousActiveElement() {
    if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  }; // Restore previous active (focused) element


  var restoreActiveElement = function restoreActiveElement() {
    return new Promise(function (resolve) {
      var x = window.scrollX;
      var y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(function () {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      /* istanbul ignore if */

      if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        // IE doesn't have scrollX/scrollY support
        window.scrollTo(x, y);
      }
    });
  };

  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   */

  var getTimerLeft = function getTimerLeft() {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };
  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var stopTimer = function stopTimer() {
    if (globalState.timeout) {
      stopTimerProgressBar();
      return globalState.timeout.stop();
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var resumeTimer = function resumeTimer() {
    if (globalState.timeout) {
      var remaining = globalState.timeout.start();
      animateTimerProgressBar(remaining);
      return remaining;
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var toggleTimer = function toggleTimer() {
    var timer = globalState.timeout;
    return timer && (timer.running ? stopTimer() : resumeTimer());
  };
  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   */

  var increaseTimer = function increaseTimer(n) {
    if (globalState.timeout) {
      var remaining = globalState.timeout.increase(n);
      animateTimerProgressBar(remaining, true);
      return remaining;
    }
  };
  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   */

  var isTimerRunning = function isTimerRunning() {
    return globalState.timeout && globalState.timeout.isRunning();
  };

  var defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    icon: undefined,
    iconHtml: undefined,
    toast: false,
    animation: true,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    customClass: undefined,
    target: 'body',
    backdrop: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusCancel: false,
    showCloseButton: false,
    closeButtonHtml: '&times;',
    closeButtonAriaLabel: 'Close this dialog',
    showLoaderOnConfirm: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    onBeforeOpen: undefined,
    onOpen: undefined,
    onRender: undefined,
    onClose: undefined,
    onAfterClose: undefined,
    onDestroy: undefined,
    scrollbarPadding: true
  };
  var updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'footer', 'hideClass', 'html', 'icon', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'onAfterClose', 'onClose', 'onDestroy', 'progressSteps', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'text', 'title', 'titleText'];
  var deprecatedParams = {
    animation: 'showClass" and "hideClass'
  };
  var toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusCancel', 'heightAuto', 'keydownListenerCapture'];
  /**
   * Is valid parameter
   * @param {String} paramName
   */

  var isValidParameter = function isValidParameter(paramName) {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };
  /**
   * Is valid parameter for Swal.update() method
   * @param {String} paramName
   */

  var isUpdatableParameter = function isUpdatableParameter(paramName) {
    return updatableParams.indexOf(paramName) !== -1;
  };
  /**
   * Is deprecated parameter
   * @param {String} paramName
   */

  var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
    return deprecatedParams[paramName];
  };

  var checkIfParamIsValid = function checkIfParamIsValid(param) {
    if (!isValidParameter(param)) {
      warn("Unknown parameter \"".concat(param, "\""));
    }
  };

  var checkIfToastParamIsValid = function checkIfToastParamIsValid(param) {
    if (toastIncompatibleParams.indexOf(param) !== -1) {
      warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
    }
  };

  var checkIfParamIsDeprecated = function checkIfParamIsDeprecated(param) {
    if (isDeprecatedParameter(param)) {
      warnAboutDepreation(param, isDeprecatedParameter(param));
    }
  };
  /**
   * Show relevant warnings for given params
   *
   * @param params
   */


  var showWarningsForParams = function showWarningsForParams(params) {
    for (var param in params) {
      checkIfParamIsValid(param);

      if (params.toast) {
        checkIfToastParamIsValid(param);
      }

      checkIfParamIsDeprecated(param);
    }
  };



  var staticMethods = /*#__PURE__*/Object.freeze({
    isValidParameter: isValidParameter,
    isUpdatableParameter: isUpdatableParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickCancel: clickCancel,
    getContainer: getContainer,
    getPopup: getPopup,
    getTitle: getTitle,
    getContent: getContent,
    getHtmlContainer: getHtmlContainer,
    getImage: getImage,
    getIcon: getIcon,
    getIcons: getIcons,
    getCloseButton: getCloseButton,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getCancelButton: getCancelButton,
    getHeader: getHeader,
    getFooter: getFooter,
    getTimerProgressBar: getTimerProgressBar,
    getFocusableElements: getFocusableElements,
    getValidationMessage: getValidationMessage,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    queue: queue,
    getQueueStep: getQueueStep,
    insertQueueStep: insertQueueStep,
    deleteQueueStep: deleteQueueStep,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft,
    stopTimer: stopTimer,
    resumeTimer: resumeTimer,
    toggleTimer: toggleTimer,
    increaseTimer: increaseTimer,
    isTimerRunning: isTimerRunning
  });

  /**
   * Enables buttons and hide loader.
   */

  function hideLoading() {
    // do nothing if popup is closed
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return;
    }

    var domCache = privateProps.domCache.get(this);

    if (!innerParams.showConfirmButton) {
      hide(domCache.confirmButton);

      if (!innerParams.showCancelButton) {
        hide(domCache.actions);
      }
    }

    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  function getInput$1(instance) {
    var innerParams = privateProps.innerParams.get(instance || this);
    var domCache = privateProps.domCache.get(instance || this);

    if (!domCache) {
      return null;
    }

    return getInput(domCache.content, innerParams.input);
  }

  var fixScrollbar = function fixScrollbar() {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    } // if the body has overflow


    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = "".concat(states.previousBodyPadding + measureScrollbar(), "px");
    }
  };
  var undoScrollbar = function undoScrollbar() {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = "".concat(states.previousBodyPadding, "px");
      states.previousBodyPadding = null;
    }
  };

  /* istanbul ignore file */

  var iOSfix = function iOSfix() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop;
      document.body.style.top = "".concat(offset * -1, "px");
      addClass(document.body, swalClasses.iosfix);
      lockBodyScroll();
      addBottomPaddingForTallPopups(); // #1948
    }
  };

  var addBottomPaddingForTallPopups = function addBottomPaddingForTallPopups() {
    var safari = !navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i);

    if (safari) {
      var bottomPanelHeight = 44;

      if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
        getContainer().style.paddingBottom = "".concat(bottomPanelHeight, "px");
      }
    }
  };

  var lockBodyScroll = function lockBodyScroll() {
    // #1246
    var container = getContainer();
    var preventTouchMove;

    container.ontouchstart = function (e) {
      preventTouchMove = shouldPreventTouchMove(e.target);
    };

    container.ontouchmove = function (e) {
      if (preventTouchMove) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  };

  var shouldPreventTouchMove = function shouldPreventTouchMove(target) {
    var container = getContainer();

    if (target === container) {
      return true;
    }

    if (!isScrollable(container) && target.tagName !== 'INPUT' && // #1603
    !(isScrollable(getContent()) && // #1944
    getContent().contains(target))) {
      return true;
    }

    return false;
  };

  var undoIOSfix = function undoIOSfix() {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  /* istanbul ignore file */

  var isIE11 = function isIE11() {
    return !!window.MSInputMethodContext && !!document.documentMode;
  }; // Fix IE11 centering sweetalert2/issues/933


  var fixVerticalPositionIE = function fixVerticalPositionIE() {
    var container = getContainer();
    var popup = getPopup();
    container.style.removeProperty('align-items');

    if (popup.offsetTop < 0) {
      container.style.alignItems = 'flex-start';
    }
  };

  var IEfix = function IEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      fixVerticalPositionIE();
      window.addEventListener('resize', fixVerticalPositionIE);
    }
  };
  var undoIEfix = function undoIEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      window.removeEventListener('resize', fixVerticalPositionIE);
    }
  };

  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  var setAriaHidden = function setAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el === getContainer() || contains(el, getContainer())) {
        return;
      }

      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
      }

      el.setAttribute('aria-hidden', 'true');
    });
  };
  var unsetAriaHidden = function unsetAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateMethods = {
    swalPromiseResolve: new WeakMap()
  };

  /*
   * Instance method to close sweetAlert
   */

  function removePopupAndResetState(instance, container, isToast$$1, onAfterClose) {
    if (isToast$$1) {
      triggerOnAfterCloseAndDispose(instance, onAfterClose);
    } else {
      restoreActiveElement().then(function () {
        return triggerOnAfterCloseAndDispose(instance, onAfterClose);
      });
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (container.parentNode && !document.body.getAttribute('data-swal2-queue-step')) {
      container.parentNode.removeChild(container);
    }

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
      undoIEfix();
      unsetAriaHidden();
    }

    removeBodyClasses();
  }

  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['toast-column']]);
  }

  function close(resolveValue) {
    var popup = getPopup();

    if (!popup) {
      return;
    }

    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return;
    }

    var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    removeClass(popup, innerParams.showClass.popup);
    addClass(popup, innerParams.hideClass.popup);
    var backdrop = getContainer();
    removeClass(backdrop, innerParams.showClass.backdrop);
    addClass(backdrop, innerParams.hideClass.backdrop);
    handlePopupAnimation(this, popup, innerParams);

    if (typeof resolveValue !== 'undefined') {
      resolveValue.isDismissed = typeof resolveValue.dismiss !== 'undefined';
      resolveValue.isConfirmed = typeof resolveValue.dismiss === 'undefined';
    } else {
      resolveValue = {
        isDismissed: true,
        isConfirmed: false
      };
    } // Resolve Swal promise


    swalPromiseResolve(resolveValue || {});
  }

  var handlePopupAnimation = function handlePopupAnimation(instance, popup, innerParams) {
    var container = getContainer(); // If animation is supported, animate

    var animationIsSupported = animationEndEvent && hasCssAnimation(popup);
    var onClose = innerParams.onClose,
        onAfterClose = innerParams.onAfterClose;

    if (onClose !== null && typeof onClose === 'function') {
      onClose(popup);
    }

    if (animationIsSupported) {
      animatePopup(instance, popup, container, onAfterClose);
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, isToast(), onAfterClose);
    }
  };

  var animatePopup = function animatePopup(instance, popup, container, onAfterClose) {
    globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, isToast(), onAfterClose);
    popup.addEventListener(animationEndEvent, function (e) {
      if (e.target === popup) {
        globalState.swalCloseEventFinishedCallback();
        delete globalState.swalCloseEventFinishedCallback;
      }
    });
  };

  var triggerOnAfterCloseAndDispose = function triggerOnAfterCloseAndDispose(instance, onAfterClose) {
    setTimeout(function () {
      if (typeof onAfterClose === 'function') {
        onAfterClose();
      }

      instance._destroy();
    });
  };

  function setButtonsDisabled(instance, buttons, disabled) {
    var domCache = privateProps.domCache.get(instance);
    buttons.forEach(function (button) {
      domCache[button].disabled = disabled;
    });
  }

  function setInputDisabled(input, disabled) {
    if (!input) {
      return false;
    }

    if (input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');

      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'cancelButton'], false);
  }
  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'cancelButton'], true);
  }
  function enableInput() {
    return setInputDisabled(this.getInput(), false);
  }
  function disableInput() {
    return setInputDisabled(this.getInput(), true);
  }

  function showValidationMessage(error) {
    var domCache = privateProps.domCache.get(this);
    setInnerHtml(domCache.validationMessage, error);
    var popupComputedStyle = window.getComputedStyle(domCache.popup);
    domCache.validationMessage.style.marginLeft = "-".concat(popupComputedStyle.getPropertyValue('padding-left'));
    domCache.validationMessage.style.marginRight = "-".concat(popupComputedStyle.getPropertyValue('padding-right'));
    show(domCache.validationMessage);
    var input = this.getInput();

    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedBy', swalClasses['validation-message']);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  } // Hide block with validation message

  function resetValidationMessage$1() {
    var domCache = privateProps.domCache.get(this);

    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }

    var input = this.getInput();

    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedBy');
      removeClass(input, swalClasses.inputerror);
    }
  }

  function getProgressSteps$1() {
    var domCache = privateProps.domCache.get(this);
    return domCache.progressSteps;
  }

  var Timer = /*#__PURE__*/function () {
    function Timer(callback, delay) {
      _classCallCheck(this, Timer);

      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    _createClass(Timer, [{
      key: "start",
      value: function start() {
        if (!this.running) {
          this.running = true;
          this.started = new Date();
          this.id = setTimeout(this.callback, this.remaining);
        }

        return this.remaining;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.running) {
          this.running = false;
          clearTimeout(this.id);
          this.remaining -= new Date() - this.started;
        }

        return this.remaining;
      }
    }, {
      key: "increase",
      value: function increase(n) {
        var running = this.running;

        if (running) {
          this.stop();
        }

        this.remaining += n;

        if (running) {
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "getTimerLeft",
      value: function getTimerLeft() {
        if (this.running) {
          this.stop();
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return this.running;
      }
    }]);

    return Timer;
  }();

  var defaultInputValidators = {
    email: function email(string, validationMessage) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },
    url: function url(string, validationMessage) {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(function (key) {
        if (params.input === key) {
          params.inputValidator = defaultInputValidators[key];
        }
      });
    }
  }

  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }
  /**
   * Set type, text and actions on popup
   *
   * @param params
   * @returns {boolean}
   */


  function setParameters(params) {
    setDefaultInputValidators(params); // showLoaderOnConfirm && preConfirm

    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    } // params.animation will be actually used in renderPopup.js
    // but in case when params.animation is a function, we need to call that function
    // before popup (re)initialization, so it'll be possible to check Swal.isVisible()
    // inside the params.animation function


    params.animation = callIfFunction(params.animation);
    validateCustomTargetElement(params); // Replace newlines with <br> in title

    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }

    init(params);
  }

  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {Array} params
   */

  var openPopup = function openPopup(params) {
    var container = getContainer();
    var popup = getPopup();

    if (typeof params.onBeforeOpen === 'function') {
      params.onBeforeOpen(popup);
    }

    var bodyStyles = window.getComputedStyle(document.body);
    var initialBodyOverflow = bodyStyles.overflowY;
    addClasses$1(container, popup, params); // scrolling is 'hidden' until animation is done, after that 'auto'

    setScrollingVisibility(container, popup);

    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
      setAriaHidden();
    }

    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }

    if (typeof params.onOpen === 'function') {
      setTimeout(function () {
        return params.onOpen(popup);
      });
    }

    removeClass(container, swalClasses['no-transition']);
  };

  function swalOpenAnimationFinished(event) {
    var popup = getPopup();

    if (event.target !== popup) {
      return;
    }

    var container = getContainer();
    popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
    container.style.overflowY = 'auto';
  }

  var setScrollingVisibility = function setScrollingVisibility(container, popup) {
    if (animationEndEvent && hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
    } else {
      container.style.overflowY = 'auto';
    }
  };

  var fixScrollContainer = function fixScrollContainer(container, scrollbarPadding, initialBodyOverflow) {
    iOSfix();
    IEfix();

    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
      fixScrollbar();
    } // sweetalert2/issues/1247


    setTimeout(function () {
      container.scrollTop = 0;
    });
  };

  var addClasses$1 = function addClasses(container, popup, params) {
    addClass(container, params.showClass.backdrop);
    show(popup); // Animate popup right after showing it

    addClass(popup, params.showClass.popup);
    addClass([document.documentElement, document.body], swalClasses.shown);

    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }
  };

  var handleInputOptionsAndValue = function handleInputOptionsAndValue(instance, params) {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(params.input) !== -1 && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
      handleInputValue(instance, params);
    }
  };
  var getInputValue = function getInputValue(instance, innerParams) {
    var input = instance.getInput();

    if (!input) {
      return null;
    }

    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);

      case 'radio':
        return getRadioValue(input);

      case 'file':
        return getFileValue(input);

      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  var getCheckboxValue = function getCheckboxValue(input) {
    return input.checked ? 1 : 0;
  };

  var getRadioValue = function getRadioValue(input) {
    return input.checked ? input.value : null;
  };

  var getFileValue = function getFileValue(input) {
    return input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;
  };

  var handleInputOptions = function handleInputOptions(instance, params) {
    var content = getContent();

    var processInputOptions = function processInputOptions(inputOptions) {
      return populateInputOptions[params.input](content, formatInputOptions(inputOptions), params);
    };

    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
      showLoading();
      asPromise(params.inputOptions).then(function (inputOptions) {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (_typeof(params.inputOptions) === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
    }
  };

  var handleInputValue = function handleInputValue(instance, params) {
    var input = instance.getInput();
    hide(input);
    asPromise(params.inputValue).then(function (inputValue) {
      input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : "".concat(inputValue);
      show(input);
      input.focus();
      instance.hideLoading();
    })["catch"](function (err) {
      error("Error in inputValue promise: ".concat(err));
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
  };

  var populateInputOptions = {
    select: function select(content, inputOptions, params) {
      var select = getChildByClass(content, swalClasses.select);

      var renderOption = function renderOption(parent, optionLabel, optionValue) {
        var option = document.createElement('option');
        option.value = optionValue;
        setInnerHtml(option, optionLabel);

        if (params.inputValue.toString() === optionValue.toString()) {
          option.selected = true;
        }

        parent.appendChild(option);
      };

      inputOptions.forEach(function (inputOption) {
        var optionValue = inputOption[0];
        var optionLabel = inputOption[1]; // <optgroup> spec:
        // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
        // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
        // check whether this is a <optgroup>

        if (Array.isArray(optionLabel)) {
          // if it is an array, then it is an <optgroup>
          var optgroup = document.createElement('optgroup');
          optgroup.label = optionValue;
          optgroup.disabled = false; // not configurable for now

          select.appendChild(optgroup);
          optionLabel.forEach(function (o) {
            return renderOption(optgroup, o[1], o[0]);
          });
        } else {
          // case of <option>
          renderOption(select, optionLabel, optionValue);
        }
      });
      select.focus();
    },
    radio: function radio(content, inputOptions, params) {
      var radio = getChildByClass(content, swalClasses.radio);
      inputOptions.forEach(function (inputOption) {
        var radioValue = inputOption[0];
        var radioLabel = inputOption[1];
        var radioInput = document.createElement('input');
        var radioLabelElement = document.createElement('label');
        radioInput.type = 'radio';
        radioInput.name = swalClasses.radio;
        radioInput.value = radioValue;

        if (params.inputValue.toString() === radioValue.toString()) {
          radioInput.checked = true;
        }

        var label = document.createElement('span');
        setInnerHtml(label, radioLabel);
        label.className = swalClasses.label;
        radioLabelElement.appendChild(radioInput);
        radioLabelElement.appendChild(label);
        radio.appendChild(radioLabelElement);
      });
      var radios = radio.querySelectorAll('input');

      if (radios.length) {
        radios[0].focus();
      }
    }
  };
  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   * @param inputOptions
   */

  var formatInputOptions = function formatInputOptions(inputOptions) {
    var result = [];

    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach(function (value, key) {
        var valueFormatted = value;

        if (_typeof(valueFormatted) === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    } else {
      Object.keys(inputOptions).forEach(function (key) {
        var valueFormatted = inputOptions[key];

        if (_typeof(valueFormatted) === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    }

    return result;
  };

  var handleConfirmButtonClick = function handleConfirmButtonClick(instance, innerParams) {
    instance.disableButtons();

    if (innerParams.input) {
      handleConfirmWithInput(instance, innerParams);
    } else {
      confirm(instance, innerParams, true);
    }
  };
  var handleCancelButtonClick = function handleCancelButtonClick(instance, dismissWith) {
    instance.disableButtons();
    dismissWith(DismissReason.cancel);
  };

  var handleConfirmWithInput = function handleConfirmWithInput(instance, innerParams) {
    var inputValue = getInputValue(instance, innerParams);

    if (innerParams.inputValidator) {
      instance.disableInput();
      var validationPromise = Promise.resolve().then(function () {
        return asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage));
      });
      validationPromise.then(function (validationMessage) {
        instance.enableButtons();
        instance.enableInput();

        if (validationMessage) {
          instance.showValidationMessage(validationMessage);
        } else {
          confirm(instance, innerParams, inputValue);
        }
      });
    } else if (!instance.getInput().checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage);
    } else {
      confirm(instance, innerParams, inputValue);
    }
  };

  var succeedWith = function succeedWith(instance, value) {
    instance.closePopup({
      value: value
    });
  };

  var confirm = function confirm(instance, innerParams, value) {
    if (innerParams.showLoaderOnConfirm) {
      showLoading(); // TODO: make showLoading an *instance* method
    }

    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      var preConfirmPromise = Promise.resolve().then(function () {
        return asPromise(innerParams.preConfirm(value, innerParams.validationMessage));
      });
      preConfirmPromise.then(function (preConfirmValue) {
        if (isVisible(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      });
    } else {
      succeedWith(instance, value);
    }
  };

  var addKeydownHandler = function addKeydownHandler(instance, globalState, innerParams, dismissWith) {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (!innerParams.toast) {
      globalState.keydownHandler = function (e) {
        return keydownHandler(instance, e, dismissWith);
      };

      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = true;
    }
  }; // Focus handling

  var setFocus = function setFocus(innerParams, index, increment) {
    var focusableElements = getFocusableElements(); // search for visible elements and select the next possible match

    for (var i = 0; i < focusableElements.length; i++) {
      index = index + increment; // rollover to first item

      if (index === focusableElements.length) {
        index = 0; // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }

      return focusableElements[index].focus();
    } // no visible focusable elements, focus the popup


    getPopup().focus();
  };
  var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
  ];
  var escKeys = ['Escape', 'Esc' // IE11
  ];

  var keydownHandler = function keydownHandler(instance, e, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (innerParams.stopKeydownPropagation) {
      e.stopPropagation();
    } // ENTER


    if (e.key === 'Enter') {
      handleEnter(instance, e, innerParams); // TAB
    } else if (e.key === 'Tab') {
      handleTab(e, innerParams); // ARROWS - switch focus between buttons
    } else if (arrowKeys.indexOf(e.key) !== -1) {
      handleArrows(); // ESC
    } else if (escKeys.indexOf(e.key) !== -1) {
      handleEsc(e, innerParams, dismissWith);
    }
  };

  var handleEnter = function handleEnter(instance, e, innerParams) {
    // #720 #721
    if (e.isComposing) {
      return;
    }

    if (e.target && instance.getInput() && e.target.outerHTML === instance.getInput().outerHTML) {
      if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
        return; // do not submit
      }

      clickConfirm();
      e.preventDefault();
    }
  };

  var handleTab = function handleTab(e, innerParams) {
    var targetElement = e.target;
    var focusableElements = getFocusableElements();
    var btnIndex = -1;

    for (var i = 0; i < focusableElements.length; i++) {
      if (targetElement === focusableElements[i]) {
        btnIndex = i;
        break;
      }
    }

    if (!e.shiftKey) {
      // Cycle to the next button
      setFocus(innerParams, btnIndex, 1);
    } else {
      // Cycle to the prev button
      setFocus(innerParams, btnIndex, -1);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  var handleArrows = function handleArrows() {
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton(); // focus Cancel button if Confirm button is currently focused

    if (document.activeElement === confirmButton && isVisible(cancelButton)) {
      cancelButton.focus(); // and vice versa
    } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
      confirmButton.focus();
    }
  };

  var handleEsc = function handleEsc(e, innerParams, dismissWith) {
    if (callIfFunction(innerParams.allowEscapeKey)) {
      e.preventDefault();
      dismissWith(DismissReason.esc);
    }
  };

  var handlePopupClick = function handlePopupClick(instance, domCache, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (innerParams.toast) {
      handleToastClick(instance, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache); // Ignore click events that had mousedown on the container but mouseup on the popup

      handleContainerMousedown(domCache);
      handleModalClick(instance, domCache, dismissWith);
    }
  };

  var handleToastClick = function handleToastClick(instance, domCache, dismissWith) {
    // Closing toast by internal click
    domCache.popup.onclick = function () {
      var innerParams = privateProps.innerParams.get(instance);

      if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
        return;
      }

      dismissWith(DismissReason.close);
    };
  };

  var ignoreOutsideClick = false;

  var handleModalMousedown = function handleModalMousedown(domCache) {
    domCache.popup.onmousedown = function () {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup

        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleContainerMousedown = function handleContainerMousedown(domCache) {
    domCache.container.onmousedown = function () {
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

        if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleModalClick = function handleModalClick(instance, domCache, dismissWith) {
    domCache.container.onclick = function (e) {
      var innerParams = privateProps.innerParams.get(instance);

      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }

      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
        dismissWith(DismissReason.backdrop);
      }
    };
  };

  function _main(userParams) {
    showWarningsForParams(userParams);

    if (globalState.currentInstance) {
      globalState.currentInstance._destroy();
    }

    globalState.currentInstance = this;
    var innerParams = prepareParams(userParams);
    setParameters(innerParams);
    Object.freeze(innerParams); // clear the previous timer

    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    } // clear the restore focus timeout


    clearTimeout(globalState.restoreFocusTimeout);
    var domCache = populateDomCache(this);
    render(this, innerParams);
    privateProps.innerParams.set(this, innerParams);
    return swalPromise(this, domCache, innerParams);
  }

  var prepareParams = function prepareParams(userParams) {
    var showClass = _extends({}, defaultParams.showClass, userParams.showClass);

    var hideClass = _extends({}, defaultParams.hideClass, userParams.hideClass);

    var params = _extends({}, defaultParams, userParams);

    params.showClass = showClass;
    params.hideClass = hideClass; // @deprecated

    if (userParams.animation === false) {
      params.showClass = {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation'
      };
      params.hideClass = {};
    }

    return params;
  };

  var swalPromise = function swalPromise(instance, domCache, innerParams) {
    return new Promise(function (resolve) {
      // functions to handle all closings/dismissals
      var dismissWith = function dismissWith(dismiss) {
        instance.closePopup({
          dismiss: dismiss
        });
      };

      privateMethods.swalPromiseResolve.set(instance, resolve);

      domCache.confirmButton.onclick = function () {
        return handleConfirmButtonClick(instance, innerParams);
      };

      domCache.cancelButton.onclick = function () {
        return handleCancelButtonClick(instance, dismissWith);
      };

      domCache.closeButton.onclick = function () {
        return dismissWith(DismissReason.close);
      };

      handlePopupClick(instance, domCache, dismissWith);
      addKeydownHandler(instance, globalState, innerParams, dismissWith);

      if (innerParams.toast && (innerParams.input || innerParams.footer || innerParams.showCloseButton)) {
        addClass(document.body, swalClasses['toast-column']);
      } else {
        removeClass(document.body, swalClasses['toast-column']);
      }

      handleInputOptionsAndValue(instance, innerParams);
      openPopup(innerParams);
      setupTimer(globalState, innerParams, dismissWith);
      initFocus(domCache, innerParams); // Scroll container to top on open (#1247, #1946)

      setTimeout(function () {
        domCache.container.scrollTop = 0;
      });
    });
  };

  var populateDomCache = function populateDomCache(instance) {
    var domCache = {
      popup: getPopup(),
      container: getContainer(),
      content: getContent(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      cancelButton: getCancelButton(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(instance, domCache);
    return domCache;
  };

  var setupTimer = function setupTimer(globalState$$1, innerParams, dismissWith) {
    var timerProgressBar = getTimerProgressBar();
    hide(timerProgressBar);

    if (innerParams.timer) {
      globalState$$1.timeout = new Timer(function () {
        dismissWith('timer');
        delete globalState$$1.timeout;
      }, innerParams.timer);

      if (innerParams.timerProgressBar) {
        show(timerProgressBar);
        setTimeout(function () {
          if (globalState$$1.timeout.running) {
            // timer can be already stopped at this point
            animateTimerProgressBar(innerParams.timer);
          }
        });
      }
    }
  };

  var initFocus = function initFocus(domCache, innerParams) {
    if (innerParams.toast) {
      return;
    }

    if (!callIfFunction(innerParams.allowEnterKey)) {
      return blurActiveElement();
    }

    if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
      return domCache.cancelButton.focus();
    }

    if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
      return domCache.confirmButton.focus();
    }

    setFocus(innerParams, -1, 1);
  };

  var blurActiveElement = function blurActiveElement() {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  };

  /**
   * Updates popup parameters.
   */

  function update(params) {
    var popup = getPopup();
    var innerParams = privateProps.innerParams.get(this);

    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
      return warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
    }

    var validUpdatableParams = {}; // assign valid params from `params` to `defaults`

    Object.keys(params).forEach(function (param) {
      if (Swal.isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn("Invalid parameter to update: \"".concat(param, "\". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js"));
      }
    });

    var updatedParams = _extends({}, innerParams, validUpdatableParams);

    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: _extends({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  function _destroy() {
    var domCache = privateProps.domCache.get(this);
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return; // This instance has already been destroyed
    } // Check if there is another Swal closing


    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    } // Check if there is a swal disposal defer timer


    if (globalState.deferDisposalTimer) {
      clearTimeout(globalState.deferDisposalTimer);
      delete globalState.deferDisposalTimer;
    }

    if (typeof innerParams.onDestroy === 'function') {
      innerParams.onDestroy();
    }

    disposeSwal(this);
  }

  var disposeSwal = function disposeSwal(instance) {
    // Unset this.params so GC will dispose it (#1569)
    delete instance.params; // Unset globalState props so GC will dispose globalState (#1569)

    delete globalState.keydownHandler;
    delete globalState.keydownTarget; // Unset WeakMaps so GC will be able to dispose them (#1569)

    unsetWeakMaps(privateProps);
    unsetWeakMaps(privateMethods);
  };

  var unsetWeakMaps = function unsetWeakMaps(obj) {
    for (var i in obj) {
      obj[i] = new WeakMap();
    }
  };



  var instanceMethods = /*#__PURE__*/Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput$1,
    close: close,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationMessage: showValidationMessage,
    resetValidationMessage: resetValidationMessage$1,
    getProgressSteps: getProgressSteps$1,
    _main: _main,
    update: update,
    _destroy: _destroy
  });

  var currentInstance;

  var SweetAlert = /*#__PURE__*/function () {
    function SweetAlert() {
      _classCallCheck(this, SweetAlert);

      // Prevent run in Node env
      if (typeof window === 'undefined') {
        return;
      } // Check for the existence of Promise


      if (typeof Promise === 'undefined') {
        error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
      }

      currentInstance = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var outerParams = Object.freeze(this.constructor.argsToParams(args));
      Object.defineProperties(this, {
        params: {
          value: outerParams,
          writable: false,
          enumerable: true,
          configurable: true
        }
      });

      var promise = this._main(this.params);

      privateProps.promise.set(this, promise);
    } // `catch` cannot be the name of a module export, so we define our thenable methods here instead


    _createClass(SweetAlert, [{
      key: "then",
      value: function then(onFulfilled) {
        var promise = privateProps.promise.get(this);
        return promise.then(onFulfilled);
      }
    }, {
      key: "finally",
      value: function _finally(onFinally) {
        var promise = privateProps.promise.get(this);
        return promise["finally"](onFinally);
      }
    }]);

    return SweetAlert;
  }(); // Assign instance methods from src/instanceMethods/*.js to prototype


  _extends(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor


  _extends(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility


  Object.keys(instanceMethods).forEach(function (key) {
    SweetAlert[key] = function () {
      if (currentInstance) {
        var _currentInstance;

        return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
      }
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '9.17.2';

  var Swal = SweetAlert;
  Swal["default"] = Swal;

  return Swal;

}));
if (typeof this !== 'undefined' && this.Sweetalert2){  this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}

"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row;padding:0}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;padding:0;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex-basis:auto!important;width:auto;height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-no-transition{transition:none!important}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center;padding:0 1.8em}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent!important;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:\"\";display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(50,100,150,.4)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;height:.25em;overflow:hidden;border-bottom-right-radius:.3125em;border-bottom-left-radius:.3125em}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;align-items:center;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close::-moz-focus-inner{border:0}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0 1.6em;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::-ms-input-placeholder,.swal2-input::-ms-input-placeholder,.swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent!important}body.swal2-no-backdrop .swal2-container>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-container.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-top-left,body.swal2-no-backdrop .swal2-container.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-top-end,body.swal2-no-backdrop .swal2-container.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-container.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-left,body.swal2-no-backdrop .swal2-container.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-end,body.swal2-no-backdrop .swal2-container.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom-left,body.swal2-no-backdrop .swal2-container.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-bottom-end,body.swal2-no-backdrop .swal2-container.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}");

/***/ }),

/***/ "./resources/js/app/project/list.js":
/*!******************************************!*\
  !*** ./resources/js/app/project/list.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./resources/js/app/project/project.js");
/* harmony import */ var _libraries_dataTable_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libraries/dataTable/dataTable */ "./resources/js/libraries/dataTable/dataTable.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



Shimmer(true);
var dataTable = new _libraries_dataTable_dataTable__WEBPACK_IMPORTED_MODULE_2__["DataTable"]({
  element: '#project-table',
  mappingData: ['date', 'name', 'owner', 'city', 'progress', 'total', 'sisa', 'project_status'],
  url: 'projects/list',
  event: {
    onDoubleClick: function onDoubleClick(e, id) {
      editRecord(id);
    }
  },
  action: {
    onEdit: function onEdit(id) {
      editRecord(id);
    },
    onDelete: function () {
      var _onDelete = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(id) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _project__WEBPACK_IMPORTED_MODULE_1__["Project"]["delete"]({
                  id: id,
                  withConfirm: true
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onDelete(_x) {
        return _onDelete.apply(this, arguments);
      }

      return onDelete;
    }()
  },
  isAutoInit: false
});
document.addEventListener('DOMContentLoaded', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(e) {
    var isError;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isError = false;
            _context2.prev = 1;
            _context2.next = 4;
            return init();

          case 4:
            _context2.next = 10;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            Alert({
              title: 'Something wrong happen',
              message: _context2.t0,
              type: AlertHelper.Error
            });
            isError = true;

          case 10:
            _context2.prev = 10;
            Shimmer(false);

            if (!isError) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return");

          case 14:
            return _context2.finish(10);

          case 15:
            document.querySelector('#project-new-button').addEventListener('click', function () {
              window.location.href = "".concat(APP_URL, "/projects/create");
            });
            document.querySelector('#refresh-button').addEventListener('click', function () {
              dataTable.reload();
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6, 10, 15]]);
  }));

  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}());

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return dataTable.init();

          case 3:
            _context3.next = 5;
            return renderModal();

          case 5:
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            throw _context3.t0;

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _init.apply(this, arguments);
}

function renderModal() {
  return _renderModal.apply(this, arguments);
}

function _renderModal() {
  _renderModal = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _renderModal.apply(this, arguments);
}

function editRecord(id) {
  window.location.href = "".concat(APP_URL, "/projects/").concat(id, "/edit");
}

/***/ }),

/***/ "./resources/js/app/project/project.js":
/*!*********************************************!*\
  !*** ./resources/js/app/project/project.js ***!
  \*********************************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
/* harmony import */ var _libraries_controller_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libraries/controller/controller */ "./resources/js/libraries/controller/controller.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Project = /*#__PURE__*/function (_Controller) {
  _inherits(Project, _Controller);

  var _super = _createSuper(Project);

  _createClass(Project, null, [{
    key: "routeName",
    // _created_by;
    // _updated_by;
    get: function get() {
      return 'projects';
    }
  }]);

  function Project() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        code = _ref.code,
        owner = _ref.owner,
        date = _ref.date,
        city = _ref.city,
        address = _ref.address,
        luas_area = _ref.luas_area,
        estimasi = _ref.estimasi,
        sub_total = _ref.sub_total,
        cco = _ref.cco,
        total = _ref.total,
        dp = _ref.dp,
        sisa = _ref.sisa,
        progress = _ref.progress,
        project_status = _ref.project_status;

    _classCallCheck(this, Project);

    _this = _super.call(this, 'projects');

    _defineProperty(_assertThisInitialized(_this), "_name", void 0);

    _defineProperty(_assertThisInitialized(_this), "_code", void 0);

    _defineProperty(_assertThisInitialized(_this), "_owner", void 0);

    _defineProperty(_assertThisInitialized(_this), "_date", void 0);

    _defineProperty(_assertThisInitialized(_this), "_city", void 0);

    _defineProperty(_assertThisInitialized(_this), "_address", void 0);

    _defineProperty(_assertThisInitialized(_this), "_luas_area", void 0);

    _defineProperty(_assertThisInitialized(_this), "_estimasi", void 0);

    _defineProperty(_assertThisInitialized(_this), "_sub_total", void 0);

    _defineProperty(_assertThisInitialized(_this), "_cco", void 0);

    _defineProperty(_assertThisInitialized(_this), "_total", void 0);

    _defineProperty(_assertThisInitialized(_this), "_dp", void 0);

    _defineProperty(_assertThisInitialized(_this), "_sisa", void 0);

    _defineProperty(_assertThisInitialized(_this), "_progress", void 0);

    _defineProperty(_assertThisInitialized(_this), "_project_status", void 0);

    if (arguments[0] != undefined && arguments.length > 0 && _typeof(arguments[0]) == 'object') {
      _this.name = name;
      _this.code = code;
      _this.owner = owner;
      _this.date = date;
      _this.city = city;
      _this.address = address;
      _this.luas_area = luas_area;
      _this.estimasi = estimasi;
      _this.sub_total = sub_total;
      _this.cco = cco;
      _this.total = total;
      _this.dp = dp;
      _this.sisa = sisa;
      _this.progress = progress;
      _this.project_status = project_status;
    }

    return _this;
  }

  _createClass(Project, [{
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(value) {
      var _value = value != undefined ? value.trim() : null;

      this.addProperty('name', _value);
      this._name = _value;
    }
  }, {
    key: "code",
    get: function get() {
      return this._code;
    },
    set: function set(value) {
      var _value = value != undefined ? value.trim() : null;

      this.addProperty('code', _value);
      this._code = _value;
    }
  }, {
    key: "owner",
    get: function get() {
      return this._owner;
    },
    set: function set(value) {
      var _value = value != undefined ? value.trim() : null;

      this.addProperty('owner', _value);
      this._owner = _value;
    }
  }, {
    key: "date",
    get: function get() {
      return this._date;
    },
    set: function set(value) {
      var _value = value != undefined ? value.trim() : null;

      this.addProperty('date', _value);
      this._date = _value;
    }
  }, {
    key: "city",
    get: function get() {
      return this._city;
    },
    set: function set(value) {
      var _value = value != undefined ? value.trim() : null;

      this.addProperty('city', _value);
      this._city = _value;
    }
  }, {
    key: "address",
    get: function get() {
      return this._address;
    },
    set: function set(value) {
      var _value = value != undefined ? value.trim() : null;

      this.addProperty('address', _value);
      this._address = _value;
    }
  }, {
    key: "luas_area",
    get: function get() {
      return this._luas_area;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;

      this.addProperty('luas_area', _value);
      this._luas_area = _value;
    }
  }, {
    key: "estimasi",
    get: function get() {
      return this._estimasi;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseInt(value.trim()) : 0;

      this.addProperty('estimasi', _value);
      this._estimasi = _value;
    }
  }, {
    key: "sub_total",
    get: function get() {
      return this._sub_total;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;

      this.addProperty('sub_total', _value);
      this._sub_total = _value;
    }
  }, {
    key: "cco",
    get: function get() {
      return this._cco;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;

      this.addProperty('cco', _value);
      this._cco = _value;
    }
  }, {
    key: "total",
    get: function get() {
      return this._total;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;

      this.addProperty('total', _value);
      this._total = _value;
    }
  }, {
    key: "dp",
    get: function get() {
      return this._dp;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;

      this.addProperty('dp', _value);
      this._dp = _value;
    }
  }, {
    key: "sisa",
    get: function get() {
      return this._sisa;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseFloat(value.trim()) : 0;

      this.addProperty('sisa', _value);
      this._sisa = _value;
    }
  }, {
    key: "progress",
    get: function get() {
      return this._progress;
    },
    set: function set(value) {
      var _value = value != undefined && value.trim() != '' && !isNaN(value) ? parseInt(value.trim()) : 0;

      this.addProperty('progress', _value);
      this._progress = _value;
    }
  }, {
    key: "project_status",
    get: function get() {
      return this._project_status;
    },
    set: function set(value) {
      var _value = value != undefined && _typeof(value) == 'object' ? {
        id: value.id.trim(),
        name: value.name.trim()
      } : value != undefined && typeof value == 'string' ? value.trim() : null;

      this.addProperty('project_status_id', _value);
      this._project_status = _value;
    }
  }], [{
    key: "attribute",
    get: function get() {
      return {
        page: {
          name: '#project-page-name',
          code: '#project-page-code',
          owner: '#project-page-owner',
          date: '#project-page-date',
          city: '#project-page-city',
          address: '#project-page-address',
          luas_area: '#project-page-luas_area',
          estimasi: '#project-page-estimasi',
          sub_total: '#project-page-sub_total',
          cco: '#project-page-cco',
          total: '#project-page-total',
          dp: '#project-page-dp',
          sisa: '#project-page-sisa',
          progress: '#project-page-progress',
          project_status: '#project-page-project_status'
        }
      };
    }
  }]);

  return Project;
}(_libraries_controller_controller__WEBPACK_IMPORTED_MODULE_0__["Controller"]);

/***/ }),

/***/ "./resources/js/libraries/alert/alert.js":
/*!***********************************************!*\
  !*** ./resources/js/libraries/alert/alert.js ***!
  \***********************************************/
/*! exports provided: AlertHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertHelper", function() { return AlertHelper; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var AlertHelper = /*#__PURE__*/function () {
  function AlertHelper() {
    _classCallCheck(this, AlertHelper);
  }
  /** Alert Type */


  _createClass(AlertHelper, null, [{
    key: "Alert",

    /** End Toastr Position */

    /**
     * Alert with sweetAlert2 style
     * @param {string} title 
     * @param {string} message
     * @param {string} type
     * @returns {void}
     */
    value: function Alert() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$title = _ref.title,
          title = _ref$title === void 0 ? null : _ref$title,
          message = _ref.message,
          _ref$type = _ref.type,
          type = _ref$type === void 0 ? AlertHelper.Success : _ref$type;

      var message_ = '';

      if (arguments.length > 0 && typeof arguments[0] === 'string') {
        message_ = arguments[0];
      } else if (arguments.length > 0 && _typeof(arguments[0]) === 'object') {
        message_ = message;
      }

      return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        icon: type,
        title: title != undefined ? title : 'Information',
        text: message_
      });
    }
    /**
     * Toastr with sweetAlert2 mixin style
     * @param {string} message 
     * @param {string} type
     * @param {string} position
     * @returns {void}
     */

  }, {
    key: "Toastr",
    value: function Toastr() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          message = _ref2.message,
          _ref2$type = _ref2.type,
          type = _ref2$type === void 0 ? AlertHelper.Success : _ref2$type,
          _ref2$position = _ref2.position,
          position = _ref2$position === void 0 ? AlertHelper.TopEnd : _ref2$position;

      var message_ = '';

      if (arguments.length > 0 && typeof arguments[0] === 'string') {
        message_ = arguments[0];
      } else if (arguments.length > 0 && _typeof(arguments[0]) === 'object') {
        message_ = message;
      }

      var Toast = sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: function onOpen(toast) {
          toast.addEventListener('mouseenter', sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.stopTimer);
          toast.addEventListener('mouseleave', sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.resumeTimer);
        }
      });
      return Toast.fire({
        icon: type,
        title: message_
      });
    }
    /**
     * Confirm alert with sweetAlert2 style
     * @param {string} title
     * @param {string} message
     * @param {string} type 
     */

  }, {
    key: "Confirm",
    value: function () {
      var _Confirm = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _ref3,
            _ref3$title,
            title,
            _ref3$message,
            message,
            _ref3$type,
            type,
            confirmALert,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref3 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref3$title = _ref3.title, title = _ref3$title === void 0 ? null : _ref3$title, _ref3$message = _ref3.message, message = _ref3$message === void 0 ? null : _ref3$message, _ref3$type = _ref3.type, type = _ref3$type === void 0 ? AlertHelper.Question : _ref3$type;
                _context.next = 3;
                return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
                  title: title != undefined ? title : 'Are you sure?',
                  text: message != undefined ? message : '',
                  icon: type,
                  showCancelButton: true,
                  confirmButtonColor: '#3490dc',
                  cancelButtonColor: '#e3342f',
                  confirmButtonText: 'Yes'
                });

              case 3:
                confirmALert = _context.sent;
                return _context.abrupt("return", confirmALert.value != undefined ? confirmALert.value : false);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function Confirm() {
        return _Confirm.apply(this, arguments);
      }

      return Confirm;
    }()
  }, {
    key: "Success",
    get: function get() {
      return 'success';
    }
  }, {
    key: "Error",
    get: function get() {
      return 'error';
    }
  }, {
    key: "Warning",
    get: function get() {
      return 'warning';
    }
  }, {
    key: "Info",
    get: function get() {
      return 'info';
    }
  }, {
    key: "Question",
    get: function get() {
      return 'question';
    }
    /** End Alert Type */

    /** Toastr Position */

  }, {
    key: "Top",
    get: function get() {
      return 'top';
    }
  }, {
    key: "TopStart",
    get: function get() {
      return 'top-start';
    }
  }, {
    key: "TopEnd",
    get: function get() {
      return 'top-end';
    }
  }, {
    key: "Center",
    get: function get() {
      return 'center';
    }
  }, {
    key: "CenterStart",
    get: function get() {
      return 'center-start';
    }
  }, {
    key: "Bottom",
    get: function get() {
      return 'bottom';
    }
  }, {
    key: "BottomStart",
    get: function get() {
      return 'bottom-start';
    }
  }, {
    key: "BottomEnd",
    get: function get() {
      return 'bottom-end';
    }
  }]);

  return AlertHelper;
}();

/***/ }),

/***/ "./resources/js/libraries/controller/controller.js":
/*!*********************************************************!*\
  !*** ./resources/js/libraries/controller/controller.js ***!
  \*********************************************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../httpClient/httpClient */ "./resources/js/libraries/httpClient/httpClient.js");
/* harmony import */ var _libraries_alert_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libraries/alert/alert */ "./resources/js/libraries/alert/alert.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }




var _data = new WeakMap();

var _routeName = new WeakMap();

var _getValueFromElement = new WeakSet();

var _getValueInputElement = new WeakSet();

var _getValueSelectElement = new WeakSet();

var _getValuTextAreaElement = new WeakSet();

var Controller = /*#__PURE__*/function () {
  function Controller(routeName) {
    _classCallCheck(this, Controller);

    _getValuTextAreaElement.add(this);

    _getValueSelectElement.add(this);

    _getValueInputElement.add(this);

    _getValueFromElement.add(this);

    _data.set(this, {
      writable: true,
      value: null
    });

    _routeName.set(this, {
      writable: true,
      value: void 0
    });

    if (this.constructor === Controller) {
      throw new Error("Can't instantiate this class");
    }

    _classPrivateFieldSet(this, _routeName, routeName);
  }

  _createClass(Controller, [{
    key: "addProperty",
    value: function addProperty(name, value) {
      if (_classPrivateFieldGet(this, _data) == undefined || _classPrivateFieldGet(this, _data) == null) {
        _classPrivateFieldSet(this, _data, {});
      }

      _classPrivateFieldGet(this, _data)[name] = _typeof(value) == 'object' && value != undefined ? value.id : value;
    }
  }, {
    key: "setAllProperty",
    value: function setAllProperty(attributes) {
      try {
        for (var key in attributes) {
          if (!attributes.hasOwnProperty(key)) {
            continue;
          }

          var element = document.querySelector(attributes[key]);

          if (element != undefined) {
            this[key] = _classPrivateMethodGet(this, _getValueFromElement, _getValueFromElement2).call(this, element);
          }
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _ref,
            _ref$uri,
            uri,
            _ref$method,
            method,
            _ref$headers,
            headers,
            _ref$body,
            body,
            _uri,
            _method,
            _headers,
            _body,
            _args = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref$uri = _ref.uri, uri = _ref$uri === void 0 ? null : _ref$uri, _ref$method = _ref.method, method = _ref$method === void 0 ? null : _ref$method, _ref$headers = _ref.headers, headers = _ref$headers === void 0 ? null : _ref$headers, _ref$body = _ref.body, body = _ref$body === void 0 ? null : _ref$body;
                _uri = uri || "".concat(APP_URL, "/").concat(this.routeName);
                _method = method || _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].POST;
                _headers = headers || {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": Controller.getCSRF()
                };
                _body = _classPrivateFieldGet(this, _data);
                ;
                _context.prev = 6;

                if (body != undefined && _typeof(body) == 'object') {
                  Object.keys(body).forEach(function (key) {
                    _body[key] = body[key];
                  });
                }

                _context.next = 10;
                return _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].Request({
                  uri: _uri,
                  method: _method,
                  headers: _headers,
                  body: _body
                });

              case 10:
                return _context.abrupt("return", _context.sent);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](6);
                throw _context.t0;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 13]]);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(_ref2) {
        var id, _ref2$uri, uri, _ref2$method, method, _ref2$headers, headers, _ref2$body, body, _method, _headers, _body, _uri;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref2.id, _ref2$uri = _ref2.uri, uri = _ref2$uri === void 0 ? null : _ref2$uri, _ref2$method = _ref2.method, method = _ref2$method === void 0 ? null : _ref2$method, _ref2$headers = _ref2.headers, headers = _ref2$headers === void 0 ? null : _ref2$headers, _ref2$body = _ref2.body, body = _ref2$body === void 0 ? null : _ref2$body;
                _method = method || _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].PUT;
                _headers = headers || {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": Controller.getCSRF()
                };
                _body = _classPrivateFieldGet(this, _data);
                _context2.prev = 4;

                if (!(id == undefined || id.trim() == '')) {
                  _context2.next = 7;
                  break;
                }

                throw "Id must required and can't be empty";

              case 7:
                _uri = uri || "".concat(APP_URL, "/").concat(this.routeName, "/").concat(id);

                if (body != undefined && _typeof(body) == 'object') {
                  Object.keys(body).forEach(function (key) {
                    _body[key] = body[key];
                  });
                }

                _context2.next = 11;
                return _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].Request({
                  uri: _uri,
                  method: _method,
                  headers: _headers,
                  body: _body
                });

              case 11:
                return _context2.abrupt("return", _context2.sent);

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](4);
                throw _context2.t0;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 14]]);
      }));

      function update(_x) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "routeName",
    get: function get() {
      return _classPrivateFieldGet(this, _routeName);
    }
  }], [{
    key: "getAllProperty",
    value: function getAllProperty(attributes) {
      var data = {};

      for (var key in attributes) {
        if (!attributes.hasOwnProperty(key)) {
          continue;
        }

        var element = document.querySelector(attributes[key]);

        if (element != undefined) {
          data[key] = element;
        }
      }

      return data;
    }
  }, {
    key: "getCSRF",
    value: function getCSRF() {
      return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(_ref3) {
        var id, _ref3$uri, uri, _ref3$method, method, _ref3$headers, headers, _ref3$body, body, _ref3$withConfirm, withConfirm, _method, _headers, _body, isSuccess, isWithConfirmBoolean, isWithConfirmObject, isWithConfirmValid, _uri, afterDeleteMessage, confirm_, deleteRecord;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref3.id, _ref3$uri = _ref3.uri, uri = _ref3$uri === void 0 ? null : _ref3$uri, _ref3$method = _ref3.method, method = _ref3$method === void 0 ? null : _ref3$method, _ref3$headers = _ref3.headers, headers = _ref3$headers === void 0 ? null : _ref3$headers, _ref3$body = _ref3.body, body = _ref3$body === void 0 ? null : _ref3$body, _ref3$withConfirm = _ref3.withConfirm, withConfirm = _ref3$withConfirm === void 0 ? null : _ref3$withConfirm;
                _method = method || _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].DELETE;
                _headers = headers || {
                  "Content-Type": "application/json",
                  "X-CSRF-TOKEN": Controller.getCSRF()
                };
                _body = body || {};
                isSuccess = false;
                isWithConfirmBoolean = typeof withConfirm == 'boolean' ? true : false;
                isWithConfirmObject = withConfirm != undefined && _typeof(withConfirm) == 'object' && (withConfirm.hasOwnProperty('afterMessage') || withConfirm.hasOwnProperty('confirmMessage')) ? true : false;
                isWithConfirmValid = isWithConfirmBoolean || isWithConfirmObject ? true : false;
                _context3.prev = 8;

                if (!(id == undefined || id.trim() == '')) {
                  _context3.next = 11;
                  break;
                }

                throw "Id must required and can't be empty";

              case 11:
                _uri = uri || "".concat(APP_URL, "/").concat(this.routeName, "/").concat(id);

                if (!(withConfirm == null || withConfirm == false)) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 15;
                return _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].Request({
                  uri: _uri,
                  method: _method,
                  headers: _headers,
                  body: _body
                });

              case 15:
                return _context3.abrupt("return", _context3.sent);

              case 16:
                if (isWithConfirmValid) {
                  _context3.next = 18;
                  break;
                }

                throw 'With Confirm is Not Valid';

              case 18:
                afterDeleteMessage = isWithConfirmBoolean ? 'Delete is successfully' : isWithConfirmObject ? withConfirm.afterMessage : 'Delete is successfully';

                if (!(isWithConfirmObject && withConfirm.confirmMessage)) {
                  _context3.next = 25;
                  break;
                }

                _context3.next = 22;
                return _libraries_alert_alert__WEBPACK_IMPORTED_MODULE_2__["AlertHelper"].Confirm({
                  title: withConfirm.confirmMessage
                });

              case 22:
                _context3.t0 = _context3.sent;
                _context3.next = 28;
                break;

              case 25:
                _context3.next = 27;
                return _libraries_alert_alert__WEBPACK_IMPORTED_MODULE_2__["AlertHelper"].Confirm();

              case 27:
                _context3.t0 = _context3.sent;

              case 28:
                confirm_ = _context3.t0;

                if (confirm_) {
                  _context3.next = 31;
                  break;
                }

                return _context3.abrupt("return", false);

              case 31:
                _context3.next = 33;
                return _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].Request({
                  uri: _uri,
                  method: _method,
                  headers: _headers,
                  body: _body
                });

              case 33:
                deleteRecord = _context3.sent;

                if (deleteRecord) {
                  _libraries_alert_alert__WEBPACK_IMPORTED_MODULE_2__["AlertHelper"].Alert({
                    message: afterDeleteMessage
                  });
                  isSuccess = true;
                }

                _context3.next = 42;
                break;

              case 37:
                _context3.prev = 37;
                _context3.t1 = _context3["catch"](8);
                console.error(_context3.t1);

                if (withConfirm != undefined) {
                  _libraries_alert_alert__WEBPACK_IMPORTED_MODULE_2__["AlertHelper"].Alert({
                    title: 'Something wrong happen',
                    message: _context3.t1,
                    type: _libraries_alert_alert__WEBPACK_IMPORTED_MODULE_2__["AlertHelper"].Error
                  });
                }

                throw _context3.t1;

              case 42:
                if (!isWithConfirmValid) {
                  _context3.next = 44;
                  break;
                }

                return _context3.abrupt("return", isSuccess);

              case 44:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 37]]);
      }));

      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "show",
    value: function () {
      var _show = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(_ref4) {
        var id, _ref4$uri, uri, _ref4$method, method, _ref4$headers, headers, _ref4$body, body, _method, _headers, _body, _uri;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref4.id, _ref4$uri = _ref4.uri, uri = _ref4$uri === void 0 ? null : _ref4$uri, _ref4$method = _ref4.method, method = _ref4$method === void 0 ? null : _ref4$method, _ref4$headers = _ref4.headers, headers = _ref4$headers === void 0 ? null : _ref4$headers, _ref4$body = _ref4.body, body = _ref4$body === void 0 ? null : _ref4$body;
                _method = method || _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].GET;
                _headers = headers || {
                  "Content-Type": "application/json"
                };
                _body = body || {};
                _context4.prev = 4;

                if (!(id == undefined || id.trim() == '')) {
                  _context4.next = 7;
                  break;
                }

                throw "Id must required and can't be empty";

              case 7:
                _uri = uri || "".concat(APP_URL, "/").concat(this.routeName, "/").concat(id);
                _context4.next = 10;
                return _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].Request({
                  uri: _uri,
                  method: _method,
                  headers: _headers,
                  body: _body
                });

              case 10:
                return _context4.abrupt("return", _context4.sent);

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](4);
                throw _context4.t0;

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 13]]);
      }));

      function show(_x3) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  }]);

  return Controller;
}();

var _getValueFromElement2 = function _getValueFromElement2(element) {
  var value;
  var elementType = element.nodeName;

  switch (elementType) {
    case 'SELECT':
      value = _classPrivateMethodGet(this, _getValueSelectElement, _getValueSelectElement2).call(this, element);
      break;

    case 'TEXTAREA':
      value = _classPrivateMethodGet(this, _getValuTextAreaElement, _getValuTextAreaElement2).call(this, element);
      break;

    case 'INPUT':
    default:
      value = _classPrivateMethodGet(this, _getValueInputElement, _getValueInputElement2).call(this, element);
      break;
  }

  return value;
};

var _getValueInputElement2 = function _getValueInputElement2(element) {
  var value;
  var inputType = element.type;

  switch (inputType) {
    case 'radio':
      break;

    case 'checkbox':
      break;

    case 'text':
    case 'number':
    default:
      value = element.value;
      break;
  }

  return value;
};

var _getValueSelectElement2 = function _getValueSelectElement2(element) {
  var value;
  value = element.value == null || element.value.trim() == '' ? null : {
    id: value.value,
    name: value.selectedOptions[0].text
  };
  return value;
};

var _getValuTextAreaElement2 = function _getValuTextAreaElement2(element) {
  return element.value;
};

/***/ }),

/***/ "./resources/js/libraries/dataTable/dataTable.js":
/*!*******************************************************!*\
  !*** ./resources/js/libraries/dataTable/dataTable.js ***!
  \*******************************************************/
/*! exports provided: DataTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTable", function() { return DataTable; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../httpClient/httpClient */ "./resources/js/libraries/httpClient/httpClient.js");
/* harmony import */ var _alert_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../alert/alert */ "./resources/js/libraries/alert/alert.js");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }




var _element = new WeakMap();

var _tableType = new WeakMap();

var _paginationType = new WeakMap();

var _mappingData = new WeakMap();

var _url = new WeakMap();

var _onClick = new WeakMap();

var _onDoubleClick = new WeakMap();

var _onRightClick = new WeakMap();

var _actionType = new WeakMap();

var _onEdit = new WeakMap();

var _onDelete = new WeakMap();

var _renderRow = new WeakMap();

var _renderTile = new WeakMap();

var _pagination = new WeakMap();

var _showMoreId = new WeakMap();

var _selected = new WeakMap();

var _filter = new WeakMap();

var _icons = new WeakMap();

var _renderTheadAction = new WeakSet();

var _renderMenuAction = new WeakSet();

var _renderTileAction = new WeakSet();

var _setDisableEditAction = new WeakSet();

var _setDisableDeleteAction = new WeakSet();

var _renderButtonAction = new WeakSet();

var _renderShowMore = new WeakSet();

var _removeSelectedRow = new WeakSet();

var _handlingNextPage = new WeakSet();

var _isSelected = new WeakSet();

var _setPagination = new WeakSet();

var DataTable = /*#__PURE__*/function () {
  function DataTable(_ref) {
    var element = _ref.element,
        _ref$tableType = _ref.tableType,
        tableType = _ref$tableType === void 0 ? DataTable.TableType.List : _ref$tableType,
        _ref$paginationType = _ref.paginationType,
        paginationType = _ref$paginationType === void 0 ? DataTable.PaginationType.ShowMore : _ref$paginationType,
        mappingData = _ref.mappingData,
        url = _ref.url,
        _ref$event = _ref.event,
        event = _ref$event === void 0 ? null : _ref$event,
        _ref$action = _ref.action,
        action = _ref$action === void 0 ? null : _ref$action,
        _ref$renderRow = _ref.renderRow,
        renderRow = _ref$renderRow === void 0 ? null : _ref$renderRow,
        _ref$renderTile = _ref.renderTile,
        renderTile = _ref$renderTile === void 0 ? null : _ref$renderTile,
        _ref$isAutoInit = _ref.isAutoInit,
        isAutoInit = _ref$isAutoInit === void 0 ? true : _ref$isAutoInit;

    _classCallCheck(this, DataTable);

    _setPagination.add(this);

    _isSelected.add(this);

    _handlingNextPage.add(this);

    _removeSelectedRow.add(this);

    _renderShowMore.add(this);

    _renderButtonAction.add(this);

    _setDisableDeleteAction.add(this);

    _setDisableEditAction.add(this);

    _renderTileAction.add(this);

    _renderMenuAction.add(this);

    _renderTheadAction.add(this);

    _element.set(this, {
      writable: true,
      value: void 0
    });

    _tableType.set(this, {
      writable: true,
      value: void 0
    });

    _paginationType.set(this, {
      writable: true,
      value: void 0
    });

    _mappingData.set(this, {
      writable: true,
      value: void 0
    });

    _url.set(this, {
      writable: true,
      value: void 0
    });

    _onClick.set(this, {
      writable: true,
      value: void 0
    });

    _onDoubleClick.set(this, {
      writable: true,
      value: void 0
    });

    _onRightClick.set(this, {
      writable: true,
      value: void 0
    });

    _actionType.set(this, {
      writable: true,
      value: void 0
    });

    _onEdit.set(this, {
      writable: true,
      value: void 0
    });

    _onDelete.set(this, {
      writable: true,
      value: void 0
    });

    _renderRow.set(this, {
      writable: true,
      value: void 0
    });

    _renderTile.set(this, {
      writable: true,
      value: void 0
    });

    _pagination.set(this, {
      writable: true,
      value: void 0
    });

    _showMoreId.set(this, {
      writable: true,
      value: void 0
    });

    _selected.set(this, {
      writable: true,
      value: void 0
    });

    _filter.set(this, {
      writable: true,
      value: void 0
    });

    _icons.set(this, {
      writable: true,
      value: {
        menu: '<i class="fa fa-ellipsis-v"></i>',
        showMore: '<i class="fas fa-angle-double-down"></i>',
        edit: '<i class="far fa-edit"></i>',
        "delete": '<i class="far fa-trash-alt"></i>',
        view: '',
        asc: '',
        desc: ''
      }
    });

    try {
      this.tableType = tableType;
      this.element = element;

      if (tableType == DataTable.TableType.List) {
        this.mappingData = mappingData;
        this.renderRow = renderRow;
      } else {
        this.renderTile = renderTile;
      }

      this.paginationType = paginationType;
      this.url = url;
      this.event = event;
      this.action = action;

      if (isAutoInit) {
        this.init();
      }
    } catch (error) {
      Alert({
        title: 'Error in DataTable',
        message: error,
        type: _alert_alert__WEBPACK_IMPORTED_MODULE_2__["AlertHelper"].Error
      });
      throw error;
    }
  }

  _createClass(DataTable, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var data, totalHeading, totalMappingData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = _classPrivateFieldGet(this, _paginationType);
                _context.next = _context.t0 === DataTable.PaginationType.Default ? 4 : _context.t0 === DataTable.PaginationType.ShowMore ? 5 : _context.t0 === DataTable.PaginationType.Infinite ? 7 : 8;
                break;

              case 4:
                return _context.abrupt("break", 9);

              case 5:
                _classPrivateMethodGet(this, _renderShowMore, _renderShowMore2).call(this);

                return _context.abrupt("break", 9);

              case 7:
                return _context.abrupt("break", 9);

              case 8:
                return _context.abrupt("break", 9);

              case 9:
                _context.next = 11;
                return this.getData(1);

              case 11:
                data = _context.sent;

                if (!(_classPrivateFieldGet(this, _tableType) == DataTable.TableType.List)) {
                  _context.next = 18;
                  break;
                }

                totalHeading = _classPrivateFieldGet(this, _element).tHead.children[0].childElementCount;
                totalMappingData = _classPrivateFieldGet(this, _mappingData).length;

                if (!(totalHeading != totalMappingData)) {
                  _context.next = 17;
                  break;
                }

                throw "The number of column don't match the number of headings";

              case 17:
                if (_classPrivateFieldGet(this, _actionType) == DataTable.ActionType.Default) {
                  _classPrivateMethodGet(this, _renderTheadAction, _renderTheadAction2).call(this);
                } else {
                  _classPrivateMethodGet(this, _renderMenuAction, _renderMenuAction2).call(this);
                }

              case 18:
                this.addRows(data);
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t1 = _context["catch"](0);
                throw new Error(_context.t1);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 21]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * addRow
     * @param {object} data 
     */

  }, {
    key: "addRow",
    value: function addRow(data) {
      var _this = this;

      var tbody = _classPrivateFieldGet(this, _element).tBodies[0];

      var tr = document.createElement('tr'); // const tr_data_id = document.createAttribute("data-id");
      // tr_data_id.value = data.Id || data.id;
      // tr.setAttributeNode(tr_data_id);

      _classPrivateFieldGet(this, _mappingData).forEach(function (item) {
        var td = document.createElement('td');
        var valueTd = data[item] && _typeof(data[item]) == 'object' ? data[item].hasOwnProperty('id') || data[item].hasOwnProperty('Id') ? data[item]['name'] || data[item]['Name'] : '' : data[item] || '';
        td.textContent = valueTd;
        td.addEventListener('click', function () {
          _classPrivateMethodGet(_this, _removeSelectedRow, _removeSelectedRow2).call(_this);

          tr.classList.toggle('selected-row');

          _classPrivateFieldSet(_this, _selected, data.Id || data.id);

          if (_classPrivateFieldGet(_this, _onEdit) != undefined && _classPrivateFieldGet(_this, _actionType) == DataTable.ActionType.Menu) {
            _classPrivateMethodGet(_this, _setDisableEditAction, _setDisableEditAction2).call(_this, false);
          }

          if (_classPrivateFieldGet(_this, _onDelete) != undefined && _classPrivateFieldGet(_this, _actionType) == DataTable.ActionType.Menu) {
            _classPrivateMethodGet(_this, _setDisableDeleteAction, _setDisableDeleteAction2).call(_this, false);
          }
        });
        tr.appendChild(td);
      });

      if (_classPrivateFieldGet(this, _onEdit) != undefined || _classPrivateFieldGet(this, _onDelete) != undefined) {
        if (_classPrivateFieldGet(this, _actionType) == DataTable.ActionType.Default) {
          tr.appendChild(_classPrivateMethodGet(this, _renderButtonAction, _renderButtonAction2).call(this, data.Id || data.id));
        }
      }

      tbody.appendChild(tr);

      if (_classPrivateFieldGet(this, _renderRow) != undefined) {
        _classPrivateFieldGet(this, _renderRow).call(this, tr, tr.cells, data);
      }

      if (_classPrivateFieldGet(this, _onClick) != undefined) {
        tr.classList.toggle('clickable-row', true);
        tr.addEventListener('click', function (event) {
          _classPrivateFieldGet(_this, _onClick).call(_this, event, data.Id || data.id);
        });
      }

      if (_classPrivateFieldGet(this, _onDoubleClick) != undefined) {
        tr.classList.toggle('clickable-row', true);
        tr.addEventListener('dblclick', function (event) {
          _classPrivateFieldGet(_this, _onDoubleClick).call(_this, event, data.Id || data.id);
        });
      }
    }
    /**
     * addTile
     * @param {object} data 
     */

  }, {
    key: "addTile",
    value: function addTile(data) {
      var _this2 = this;

      var card = document.createElement('div');
      card.setAttribute('class', 'card card-custom-shadow-tile');
      var cardBody = document.createElement('div');
      cardBody.setAttribute('class', 'card-body');

      var renderTile = _classPrivateFieldGet(this, _renderTile).call(this, data, {
        edit: _classPrivateFieldGet(this, _onEdit),
        "delete": _classPrivateFieldGet(this, _onDelete)
      });

      if (_classPrivateFieldGet(this, _onEdit) != undefined || _classPrivateFieldGet(this, _onDelete) != undefined) {
        if (_classPrivateFieldGet(this, _actionType) == DataTable.ActionType.Custom) {
          if (typeof renderTile == 'string') {
            cardBody.innerHTML += renderTile;
          } else {
            cardBody.appendChild(renderTile);
          }
        } else {
          var contentCardBody = document.createElement('div');
          contentCardBody.setAttribute('class', 'row align-items-md-center');
          contentCardBody.appendChild(_classPrivateMethodGet(this, _renderTileAction, _renderTileAction2).call(this));

          if (typeof renderTile == 'string') {
            contentCardBody.innerHTML += '<div class="col">' + renderTile + '</div>';
          } else {
            var _div = document.createElement('div');

            _div.setAttribute('class', 'col');

            _div.appendChild(renderTile);

            contentCardBody.appendChild(_div);
          }

          if (_classPrivateFieldGet(this, _onEdit) != undefined) {
            contentCardBody.querySelector('.action-edit').addEventListener('click', function () {
              if (!data.id) {
                return;
              }

              _classPrivateFieldGet(_this2, _onEdit).call(_this2, data.id);
            });
          }

          if (_classPrivateFieldGet(this, _onDelete) != undefined) {
            contentCardBody.querySelector('.action-delete').addEventListener('click', function () {
              if (!data.id) {
                return;
              }

              _classPrivateFieldGet(_this2, _onDelete).call(_this2, data.id).then(function (res) {
                if (res) {
                  _this2.reload();
                }
              });
            });
          }

          cardBody.appendChild(contentCardBody);
        }
      } else {
        if (typeof renderTile == 'string') {
          cardBody.innerHTML += renderTile;
        } else {
          cardBody.appendChild(renderTile);
        }
      }

      card.appendChild(cardBody);
      card.addEventListener('click', function () {
        _classPrivateMethodGet(_this2, _removeSelectedRow, _removeSelectedRow2).call(_this2);

        card.classList.toggle('selected-row');

        _classPrivateFieldSet(_this2, _selected, data.Id || data.id);
      });

      _classPrivateFieldGet(this, _element).appendChild(card);

      if (_classPrivateFieldGet(this, _onClick) != undefined) {
        card.classList.toggle('clickable-row', true);
        card.addEventListener('click', function (event) {
          _classPrivateFieldGet(_this2, _onClick).call(_this2, event, data.Id || data.id);
        });
      }

      if (_classPrivateFieldGet(this, _onDoubleClick) != undefined) {
        card.classList.toggle('clickable-row', true);
        card.addEventListener('dblclick', function (event) {
          _classPrivateFieldGet(_this2, _onDoubleClick).call(_this2, event, data.Id || data.id);
        });
      }
    }
    /**
     * addRows
     * @param {[object]} data 
     */

  }, {
    key: "addRows",
    value: function addRows(data) {
      var _this3 = this;

      data.forEach(function (item) {
        if (_classPrivateFieldGet(_this3, _tableType) == DataTable.TableType.List) {
          _this3.addRow(item);
        } else {
          _this3.addTile(item);
        }
      });
    }
  }, {
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var page,
            res,
            filter,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                page = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 1;
                _context2.prev = 1;
                filter = _classPrivateFieldGet(this, _filter) != undefined ? _classPrivateFieldGet(this, _filter) : null;

                if (!filter) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 6;
                return _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].Request({
                  uri: _classPrivateFieldGet(this, _url) + page,
                  method: _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].POST,
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: {
                    filters: filter
                  }
                });

              case 6:
                res = _context2.sent;
                _context2.next = 12;
                break;

              case 9:
                _context2.next = 11;
                return _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].Request({
                  uri: _classPrivateFieldGet(this, _url) + page,
                  method: _httpClient_httpClient__WEBPACK_IMPORTED_MODULE_1__["HTTPClient"].GET
                });

              case 11:
                res = _context2.sent;

              case 12:
                _classPrivateMethodGet(this, _setPagination, _setPagination2).call(this, {
                  total: res.total,
                  perPage: res.per_page,
                  currentPage: res.current_page,
                  lastPage: res.last_page,
                  from: res.from,
                  to: res.to,
                  isCanNext: res.next_page_url != null ? true : false
                });

                return _context2.abrupt("return", res.data);

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 16]]);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: "clearData",
    value: function clearData() {
      if (_classPrivateFieldGet(this, _tableType) == DataTable.TableType.List) {
        _classPrivateFieldGet(this, _element).replaceChild(document.createElement('tbody'), _classPrivateFieldGet(this, _element).tBodies[0]);
      } else {
        while (_classPrivateFieldGet(this, _element).firstChild) {
          _classPrivateFieldGet(this, _element).removeChild(_classPrivateFieldGet(this, _element).firstChild);
        }
      }
    }
  }, {
    key: "nextPage",
    value: function () {
      var _nextPage = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var page, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                page = this.currentPage;

                if (_classPrivateFieldGet(this, _paginationType) == DataTable.PaginationType.Default) {
                  this.clearData();
                }

                page += 1;

                if (!(this.currentPage < this.lastPage)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 7;
                return this.getData(page);

              case 7:
                data = _context3.sent;
                this.addRows(data);
                return _context3.abrupt("return", true);

              case 10:
                return _context3.abrupt("return", false);

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                throw new Error(_context3.t0);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 13]]);
      }));

      function nextPage() {
        return _nextPage.apply(this, arguments);
      }

      return nextPage;
    }()
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var resetPaging,
            page,
            data,
            _args4 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resetPaging = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
                _context4.prev = 1;

                _classPrivateMethodGet(this, _removeSelectedRow, _removeSelectedRow2).call(this);

                _classPrivateFieldSet(this, _selected, null);

                page = this.currentPage;

                if (resetPaging) {
                  page = 1;
                  this.clearData();
                }

                _context4.next = 8;
                return this.getData(page);

              case 8:
                data = _context4.sent;
                this.addRows(data);

                if (_classPrivateFieldGet(this, _actionType) == DataTable.ActionType.Menu) {
                  _classPrivateMethodGet(this, _setDisableEditAction, _setDisableEditAction2).call(this, true);

                  _classPrivateMethodGet(this, _setDisableDeleteAction, _setDisableDeleteAction2).call(this, true);
                }

                return _context4.abrupt("return", true);

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](1);
                throw new Error(_context4.t0);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 14]]);
      }));

      function reload() {
        return _reload.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: "tableType",

    /**
     * @param {string} value
     */
    set: function set(value) {
      if (typeof value != 'string' || value != undefined && value.trim() == '') {
        throw new Error('Table Type must be string');
      }

      var isCorrectTableType = [DataTable.TableType.List, DataTable.TableType.Tile].filter(function (item) {
        return item == value;
      }).length > 0 ? true : false;

      if (!isCorrectTableType) {
        throw new Error('Table Type is not registered');
      }

      _classPrivateFieldSet(this, _tableType, value);
    }
    /**
     * @param {string} value
     */

  }, {
    key: "element",
    set: function set(value) {
      if (typeof value == 'string') {
        _classPrivateFieldSet(this, _element, document.querySelector(value));
      } else if (_classPrivateFieldGet(this, _tableType) == DataTable.TableType.Default) {
        if (value.nodeName && value.nodeName == 'TABLE') {
          _classPrivateFieldSet(this, _element, value);
        } else {
          throw new Error('Element must be Id of table element or table element');
        }
      } else if (_classPrivateFieldGet(this, _tableType) == DataTable.TableType.Tile) {
        if (value.nodeName && value.nodeName != 'TABLE') {
          _classPrivateFieldSet(this, _element, value);
        } else {
          throw new Error('Element must be Id of tile element or tile element (not table)');
        }
      } else {
        throw new Error("Element can't be empty");
      }
    }
    /**
     * @param {string} value
     */

  }, {
    key: "paginationType",
    set: function set(value) {
      if (typeof value != 'string' || value != undefined && value.trim() == '') {
        throw new Error('Pagination Type must be string');
      }

      var isCorrectPaginationType = [DataTable.PaginationType.Default, DataTable.PaginationType.ShowMore, DataTable.PaginationType.Infinite].filter(function (item) {
        return item == value;
      }).length > 0 ? true : false;

      if (!isCorrectPaginationType) {
        throw new Error('Pagination Type is not registered');
      }

      _classPrivateFieldSet(this, _paginationType, value);
    }
    /**
     * @param {[string]} value
     */

  }, {
    key: "mappingData",
    set: function set(value) {
      if (value == undefined || _typeof(value) != 'object' || value.length < 1) {
        throw new Error('Mapping Data must be array');
      }

      _classPrivateFieldSet(this, _mappingData, value);
    }
    /**
     * @param {string} value
     */

  }, {
    key: "url",
    set: function set(value) {
      if (typeof value != 'string') {
        throw new Error('Url must be string');
      }

      _classPrivateFieldSet(this, _url, value.includes(APP_URL) ? value : "".concat(APP_URL, "/").concat(value.trim(), "?page="));
    }
    /**
     * @param {{ onClick: void; onDoubleClick: void; }} value
     */

  }, {
    key: "event",
    set: function set(value) {
      if (value != undefined && _typeof(value) != 'object') {
        throw new Error('Event must be object');
      }

      if (value != undefined && _typeof(value) == 'object') {
        if (value.hasOwnProperty('onClick') && value.hasOwnProperty('onDoubleClick')) {
          throw new Error("On click and Double click can't be declare together");
        }

        if (value.hasOwnProperty('onClick') && value.onClick != undefined) {
          this.onClick = value.onClick;
        }

        if (value.hasOwnProperty('onDoubleClick') && value.onDoubleClick != undefined) {
          this.onDoubleClick = value.onDoubleClick;
        } // if(value.hasOwnProperty('onRightClick') && value.onRightClick != undefined) {
        //     this.onRightClick = value.onRightClick;
        // }

      }
    }
    /**
     * @param {{ type: string; onEdit: void; onDelete: promise; }} value
     */

  }, {
    key: "action",
    set: function set(value) {
      if (value != undefined && _typeof(value) != 'object') {
        throw new Error('Action must be object');
      }

      if (value != undefined && _typeof(value) == 'object') {
        if (value.hasOwnProperty('type') && value.type != undefined && typeof value.type == 'string') {
          var actionList = [DataTable.ActionType.Default, DataTable.ActionType.Menu, DataTable.ActionType.Menu];
          var isExist = actionList.filter(function (item) {
            return item = value.type;
          }).length > 0 ? true : false;

          if (!isExist) {
            throw new Error('Action Type must be object Default or Menu or Custom');
          }

          _classPrivateFieldSet(this, _actionType, value.type);
        } else {
          _classPrivateFieldSet(this, _actionType, DataTable.ActionType.Default);
        }

        if (value.hasOwnProperty('onEdit') && value.onEdit != undefined) {
          this.onEdit = value.onEdit;
        }

        if (value.hasOwnProperty('onDelete') && value.onDelete != undefined) {
          this.onDelete = value.onDelete;
        }
      }
    }
    /**
     * @param {void} value
     */

  }, {
    key: "onClick",
    set: function set(value) {
      if (typeof value != 'function') {
        throw new Error('Event onClick must be function');
      }

      _classPrivateFieldSet(this, _onClick, value);
    }
    /**
     * @param {void} value
     */

  }, {
    key: "onDoubleClick",
    set: function set(value) {
      if (typeof value != 'function') {
        throw new Error('Event onDoubleClick must be function');
      }

      _classPrivateFieldSet(this, _onDoubleClick, value);
    } // set onRightClick() {
    // }

    /**
     * @param {void} value
     */

  }, {
    key: "onEdit",
    set: function set(value) {
      if (typeof value != 'function') {
        throw new Error('Action onEdit must be function');
      }

      _classPrivateFieldSet(this, _onEdit, value);
    }
    /**
     * @param {promise} value
     */

  }, {
    key: "onDelete",
    set: function set(value) {
      if (typeof value != 'function') {
        throw new Error('Action onDelete must be function');
      }

      _classPrivateFieldSet(this, _onDelete, value);
    }
    /**
     * @param {void} value
     */

  }, {
    key: "renderRow",
    set: function set(value) {
      if (value != undefined && _typeof(value) != 'object') {
        if (typeof value != 'function') {
          throw new Error('Render Row must be function');
        }
      }

      _classPrivateFieldSet(this, _renderRow, value);
    }
    /**
     * @param {void} value
     */

  }, {
    key: "renderTile",
    set: function set(value) {
      if (typeof value != 'function') {
        throw new Error('Render Tile must be function');
      }

      _classPrivateFieldSet(this, _renderTile, value);
    }
  }, {
    key: "selected",
    get: function get() {
      return _classPrivateFieldGet(this, _selected);
    }
  }, {
    key: "currentPage",
    get: function get() {
      return _classPrivateFieldGet(this, _pagination) && _classPrivateFieldGet(this, _pagination).currentPage ? _classPrivateFieldGet(this, _pagination).currentPage : 1;
    }
  }, {
    key: "lastPage",
    get: function get() {
      return _classPrivateFieldGet(this, _pagination) && _classPrivateFieldGet(this, _pagination).lastPage ? _classPrivateFieldGet(this, _pagination).lastPage : 1;
    }
  }, {
    key: "totalData",
    get: function get() {
      return _classPrivateFieldGet(this, _pagination) && _classPrivateFieldGet(this, _pagination).total ? _classPrivateFieldGet(this, _pagination).total : 0;
    }
  }, {
    key: "isCanNextPage",
    get: function get() {
      return _classPrivateFieldGet(this, _pagination) && _classPrivateFieldGet(this, _pagination).isCanNext ? _classPrivateFieldGet(this, _pagination).isCanNext : false;
    }
  }], [{
    key: "TableType",
    get: function get() {
      return {
        List: 'List',
        Tile: 'Tile'
      };
    }
  }, {
    key: "PaginationType",
    get: function get() {
      return {
        Default: 'Default',
        ShowMore: 'Show More',
        Infinite: 'Infinite Scroll'
      };
    }
  }, {
    key: "ActionType",
    get: function get() {
      return {
        Default: 'Default',
        Menu: 'Menu',
        Custom: 'Custom'
      };
    }
  }]);

  return DataTable;
}();

var _renderTheadAction2 = function _renderTheadAction2() {
  if ((_classPrivateFieldGet(this, _onEdit) != undefined || _classPrivateFieldGet(this, _onDelete) != undefined) && _classPrivateFieldGet(this, _actionType) == DataTable.ActionType.Default) {
    var tHead = _classPrivateFieldGet(this, _element).tHead.children[0];

    var th = document.createElement('th');
    th.textContent = 'Action';
    tHead.appendChild(th);
  }
};

var _renderMenuAction2 = function _renderMenuAction2() {
  var _this4 = this;

  if ((_classPrivateFieldGet(this, _onEdit) != undefined || _classPrivateFieldGet(this, _onDelete) != undefined) && _classPrivateFieldGet(this, _actionType) == DataTable.ActionType.Menu) {
    var btnGroup = _classPrivateFieldGet(this, _element).parentElement.parentElement.previousElementSibling;

    var icon = _classPrivateFieldGet(this, _icons).menu;

    var listAction = [];

    if (_classPrivateFieldGet(this, _onEdit) != undefined) {
      var aEdit = document.createElement('a');
      var aEditClass = 'dropdown-item disabled action-edit';
      aEdit.setAttribute('class', aEditClass);
      aEdit.href = 'javascript:void(0)';
      aEdit.textContent = 'Edit';
      aEdit.addEventListener('click', function () {
        var id = _this4.selected || null;

        if (!id) {
          return;
        }

        _classPrivateFieldGet(_this4, _onEdit).call(_this4, id);
      });
      listAction.push(aEdit);
    }

    if (_classPrivateFieldGet(this, _onDelete) != undefined) {
      var aDelete = document.createElement('a');
      var aDeleteClass = 'dropdown-item disabled action-delete';
      aDelete.setAttribute('class', aDeleteClass);
      aDelete.href = 'javascript:void(0)';
      aDelete.textContent = 'Delete';
      aDelete.addEventListener('click', function () {
        var id = _this4.selected || null;

        if (!id) {
          return;
        }

        _classPrivateFieldGet(_this4, _onDelete).call(_this4, id).then(function (res) {
          if (res) {
            _this4.reload();
          }
        });
      });
      listAction.push(aDelete);
    }

    var menuAction = document.createElement('button');
    menuAction.setAttribute('class', 'btn');
    menuAction.setAttribute('data-toggle', 'dropdown');
    menuAction.setAttribute('aria-haspopup', 'true');
    menuAction.setAttribute('aria-expanded', "false");
    menuAction.innerHTML = icon;
    var dropdownAction = document.createElement('div');
    dropdownAction.setAttribute('class', 'dropdown-menu');
    dropdownAction.setAttribute('aria-labelledby', 'menuAction');
    listAction.forEach(function (item) {
      dropdownAction.appendChild(item);
    });
    btnGroup.appendChild(menuAction);
    btnGroup.appendChild(dropdownAction);
  }
};

var _renderTileAction2 = function _renderTileAction2() {
  var groupAction = document.createElement('div');

  if ((_classPrivateFieldGet(this, _onEdit) != undefined || _classPrivateFieldGet(this, _onDelete) != undefined) && _classPrivateFieldGet(this, _tableType) == DataTable.TableType.Tile) {
    groupAction.setAttribute('class', 'col-3 col-md-auto order-md-last text-right');
    var listAction = [];

    if (_classPrivateFieldGet(this, _onEdit) != undefined) {
      var aEdit = document.createElement('a');
      var aEditClass = 'dropdown-item action-edit';
      aEdit.setAttribute('class', aEditClass);
      aEdit.href = 'javascript:void(0)';
      aEdit.textContent = 'Edit';
      listAction.push(aEdit);
    }

    if (_classPrivateFieldGet(this, _onDelete) != undefined) {
      var aDelete = document.createElement('a');
      var aDeleteClass = 'dropdown-item action-delete';
      aDelete.setAttribute('class', aDeleteClass);
      aDelete.href = 'javascript:void(0)';
      aDelete.textContent = 'Delete';
      listAction.push(aDelete);
    }

    var menuAction = document.createElement('button');
    menuAction.setAttribute('class', 'btn btn-icons btn-rounded btn-light');
    menuAction.setAttribute('data-toggle', 'dropdown');
    menuAction.setAttribute('aria-haspopup', 'true');
    menuAction.setAttribute('aria-expanded', "false");
    menuAction.innerHTML = '<i class="fa fa-ellipsis-v pt-1"></i>';
    var dropdownAction = document.createElement('div');
    dropdownAction.setAttribute('class', 'dropdown-menu');
    dropdownAction.setAttribute('aria-labelledby', 'menuAction');
    listAction.forEach(function (item) {
      dropdownAction.appendChild(item);
    });
    groupAction.appendChild(menuAction);
    groupAction.appendChild(dropdownAction);
  } else {
    return null;
  }

  return groupAction;
};

var _setDisableEditAction2 = function _setDisableEditAction2(isDisable) {
  var actionMenu = _classPrivateFieldGet(this, _element).parentElement.parentElement.previousElementSibling.lastElementChild;

  var actionEdit = actionMenu.querySelector('.action-edit');

  if (isDisable) {
    actionEdit.classList.toggle('disabled', true);
  } else {
    actionEdit.classList.remove('disabled');
  }
};

var _setDisableDeleteAction2 = function _setDisableDeleteAction2(isDisable) {
  var actionMenu = _classPrivateFieldGet(this, _element).parentElement.parentElement.previousElementSibling.lastElementChild;

  var actionDelete = actionMenu.querySelector('.action-delete');

  if (isDisable) {
    actionDelete.classList.toggle('disabled', true);
  } else {
    actionDelete.classList.remove('disabled');
  }
};

var _renderButtonAction2 = function _renderButtonAction2(id) {
  var _this5 = this;

  var td = document.createElement('td');

  var editIcon = _classPrivateFieldGet(this, _icons).edit;

  var deleteIcon = _classPrivateFieldGet(this, _icons)["delete"];

  if (_classPrivateFieldGet(this, _onEdit) != undefined) {
    var aEdit = document.createElement('a');
    aEdit.setAttribute('class', 'mr-2');
    aEdit.setAttribute('href', 'javascript:void(0)');
    aEdit.setAttribute('style', 'color: #28A745');
    aEdit.innerHTML = editIcon;
    aEdit.addEventListener('click', function () {
      _classPrivateFieldGet(_this5, _onEdit).call(_this5, id);
    });
    td.appendChild(aEdit);
  }

  if (_classPrivateFieldGet(this, _onDelete) != undefined) {
    var aDelete = document.createElement('a');
    aDelete.setAttribute('class', 'mr-2');
    aDelete.setAttribute('href', 'javascript:void(0)');
    aDelete.setAttribute('style', 'color: red');
    aDelete.innerHTML = deleteIcon;
    aDelete.addEventListener('click', function () {
      _classPrivateFieldGet(_this5, _onDelete).call(_this5, id).then(function (res) {
        if (res) {
          _this5.reload();
        }
      });
    });
    td.appendChild(aDelete);
  }

  return td;
};

var _renderShowMore2 = function _renderShowMore2() {
  var _this6 = this;

  var showMoreId = "".concat(_classPrivateFieldGet(this, _element).id, "-dataTable-show-more");

  _classPrivateFieldSet(this, _showMoreId, showMoreId);

  var icon = _classPrivateFieldGet(this, _icons).showMore;

  var span = document.createElement('span');
  span.setAttribute('class', 'd-flex justify-content-center');
  span.setAttribute('style', 'display:none;');
  span.innerHTML = "<a href=\"javascript:void(0)\" style=\"display:none\" id=\"".concat(showMoreId, "\"><p>").concat(icon, " Show more</p></a>");

  _classPrivateFieldGet(this, _element).parentElement.appendChild(span);

  document.querySelector("#".concat(showMoreId)).addEventListener('click', function (e) {
    _this6.nextPage();
  });
};

var _removeSelectedRow2 = function _removeSelectedRow2() {
  var row = _classPrivateFieldGet(this, _tableType) == DataTable.TableType.List ? document.querySelectorAll("#".concat(_classPrivateFieldGet(this, _element).id, " tr")) : document.querySelectorAll("#".concat(_classPrivateFieldGet(this, _element).id, " .card"));
  var rowLength = row.length;

  for (var i = 0; i < rowLength; i++) {
    row[i].classList.remove('selected-row');
  }
};

var _handlingNextPage2 = function _handlingNextPage2() {
  var nextPage;

  switch (_classPrivateFieldGet(this, _paginationType)) {
    case DataTable.PaginationType.Default:
      break;

    case DataTable.PaginationType.ShowMore:
      nextPage = document.querySelector("#".concat(_classPrivateFieldGet(this, _showMoreId)));
      break;

    case DataTable.PaginationType.Infinite:
      break;

    default:
      break;
  }

  nextPage.style.display = this.isCanNextPage ? 'block' : 'none';
};

var _isSelected2 = function _isSelected2() {
  return _classPrivateFieldGet(this, _selected) != null && _classPrivateFieldGet(this, _selected).trim() != '' ? true : false;
};

var _setPagination2 = function _setPagination2(_ref2) {
  var total = _ref2.total,
      perPage = _ref2.perPage,
      currentPage = _ref2.currentPage,
      lastPage = _ref2.lastPage,
      from = _ref2.from,
      to = _ref2.to,
      isCanNext = _ref2.isCanNext;

  _classPrivateFieldSet(this, _pagination, {
    total: total,
    perPage: perPage,
    currentPage: currentPage,
    lastPage: lastPage,
    from: from,
    to: to,
    isCanNext: isCanNext
  });

  _classPrivateMethodGet(this, _handlingNextPage, _handlingNextPage2).call(this);
};

/***/ }),

/***/ "./resources/js/libraries/httpClient/httpClient.js":
/*!*********************************************************!*\
  !*** ./resources/js/libraries/httpClient/httpClient.js ***!
  \*********************************************************/
/*! exports provided: HTTPClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTPClient", function() { return HTTPClient; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTTPClient = /*#__PURE__*/function () {
  function HTTPClient() {
    _classCallCheck(this, HTTPClient);
  }

  _createClass(HTTPClient, null, [{
    key: "isContentTypeJSON",

    /** End Available Content Type */
    value: function isContentTypeJSON(headers) {
      return headers.has('Content-Type') && headers.get('Content-Type') == HTTPClient.CONTENT_TYPE_JSON;
    }
  }, {
    key: "isContentTypeForm",
    value: function isContentTypeForm(headers) {
      return headers.has('Content-Type') && headers.get('Content-Type') == HTTPClient.CONTENT_TYPE_FORM;
    }
  }, {
    key: "isContentTypeFormData",
    value: function isContentTypeFormData(body) {
      return _typeof(body) == 'object' && body instanceof FormData;
    }
  }, {
    key: "Request",
    value: function () {
      var _Request = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var _ref$uri, uri, method, _ref$headers, headers, _ref$body, body, _ref$isSelfHandling, isSelfHandling, req, options;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$uri = _ref.uri, uri = _ref$uri === void 0 ? null : _ref$uri, method = _ref.method, _ref$headers = _ref.headers, headers = _ref$headers === void 0 ? null : _ref$headers, _ref$body = _ref.body, body = _ref$body === void 0 ? null : _ref$body, _ref$isSelfHandling = _ref.isSelfHandling, isSelfHandling = _ref$isSelfHandling === void 0 ? false : _ref$isSelfHandling;
                _context.prev = 1;
                _context.t0 = method;
                _context.next = _context.t0 === HTTPClient.GET ? 5 : _context.t0 === HTTPClient.POST ? 7 : _context.t0 === HTTPClient.PUT ? 9 : _context.t0 === HTTPClient.PATCH ? 11 : _context.t0 === HTTPClient.DELETE ? 13 : 15;
                break;

              case 5:
                options = HTTPClient.buildOptions({
                  method: HTTPClient.GET,
                  headers: headers
                });
                return _context.abrupt("break", 17);

              case 7:
                options = HTTPClient.buildOptions({
                  method: HTTPClient.POST,
                  headers: headers,
                  body: body
                });
                return _context.abrupt("break", 17);

              case 9:
                options = HTTPClient.buildOptions({
                  method: HTTPClient.PUT,
                  headers: headers,
                  body: body
                });
                return _context.abrupt("break", 17);

              case 11:
                options = HTTPClient.buildOptions({
                  method: HTTPClient.PATCH,
                  headers: headers,
                  body: body
                });
                return _context.abrupt("break", 17);

              case 13:
                options = HTTPClient.buildOptions({
                  method: HTTPClient.DELETE,
                  headers: headers
                });
                return _context.abrupt("break", 17);

              case 15:
                options = HTTPClient.buildOptions({
                  method: HTTPClient.GET,
                  headers: headers
                });
                return _context.abrupt("break", 17);

              case 17:
                _context.next = 19;
                return fetch(uri, options);

              case 19:
                req = _context.sent;

                if (!isSelfHandling) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt("return", req);

              case 24:
                _context.next = 26;
                return HTTPClient.handlingResponse(req);

              case 26:
                return _context.abrupt("return", _context.sent);

              case 27:
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t1 = _context["catch"](1);
                throw new Error(_context.t1);

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 29]]);
      }));

      function Request(_x) {
        return _Request.apply(this, arguments);
      }

      return Request;
    }()
  }, {
    key: "handlingResponse",
    value: function () {
      var _handlingResponse = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(response) {
        var contentType;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (response.ok) {
                  _context2.next = 3;
                  break;
                }

                throw "HTTP Request Error: ".concat(response.status);

              case 3:
                contentType = response.headers.get("content-type");

                if (!(contentType && contentType.indexOf("application/json") !== -1)) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 7;
                return response.json();

              case 7:
                return _context2.abrupt("return", _context2.sent);

              case 10:
                if (!(contentType && (contentType.indexOf("text/html") !== -1 || contentType.indexOf("text/plain") !== -1))) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 13;
                return response.text();

              case 13:
                return _context2.abrupt("return", _context2.sent);

              case 14:
                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 16]]);
      }));

      function handlingResponse(_x2) {
        return _handlingResponse.apply(this, arguments);
      }

      return handlingResponse;
    }()
  }, {
    key: "handlingDownload",
    value: function () {
      var _handlingDownload = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(response, filename) {
        var blob, url, a;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return response.blob();

              case 3:
                blob = _context3.sent;
                url = window.URL.createObjectURL(blob);
                a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 14]]);
      }));

      function handlingDownload(_x3, _x4) {
        return _handlingDownload.apply(this, arguments);
      }

      return handlingDownload;
    }()
  }, {
    key: "buildOptions",
    value: function buildOptions(_ref2) {
      var method = _ref2.method,
          _ref2$headers = _ref2.headers,
          headers = _ref2$headers === void 0 ? null : _ref2$headers,
          _ref2$body = _ref2.body,
          body = _ref2$body === void 0 ? null : _ref2$body;
      var options = {};

      try {
        switch (method) {
          case HTTPClient.GET:
            options.method = HTTPClient.GET;
            break;

          case HTTPClient.POST:
            options.method = HTTPClient.POST;
            break;

          case HTTPClient.PUT:
            options.method = HTTPClient.PUT;
            break;

          case HTTPClient.PATCH:
            options.method = HTTPClient.PATCH;
            break;

          case HTTPClient.DELETE:
            options.method = HTTPClient.DELETE;
            break;

          default:
            options.method = HTTPClient.GET;
            break;
        }

        options.headers = new Headers();

        if (headers != undefined && _typeof(headers) == 'object') {
          Object.keys(headers).forEach(function (key) {
            if (!options.headers.has(key)) {
              options.headers.append(key, headers[key]);
            }
          });
        }

        if (method == HTTPClient.POST || method == HTTPClient.PUT || method == HTTPClient.PATCH) {
          if (body != undefined && _typeof(body) == 'object') {
            if (HTTPClient.isContentTypeJSON(options.headers)) {
              options.body = JSON.stringify(body);
            } else if (HTTPClient.isContentTypeForm(options.headers)) {
              var urlencoded = new URLSearchParams();
              Object.keys(body).forEach(function (key) {
                urlencoded.append(key, body[key]);
              });
              options.body = urlencoded;
            } else if (HTTPClient.isContentTypeFormData(body)) {
              var formdata = new FormData();
              Object.keys(body).forEach(function (key) {
                formdata.append(key, body[key]);
              });
              options.body = formdata;
              delete options.headers;
            }
          }
        }
      } catch (error) {
        throw error;
      }

      return options;
    }
  }, {
    key: "GET",

    /** Available Method */
    get: function get() {
      return 'GET';
    }
  }, {
    key: "POST",
    get: function get() {
      return 'POST';
    }
  }, {
    key: "PUT",
    get: function get() {
      return 'PUT';
    }
  }, {
    key: "PATCH",
    get: function get() {
      return 'PATCH';
    }
  }, {
    key: "DELETE",
    get: function get() {
      return 'DELETE';
    }
    /** End Available Method */

    /** Available Content Type */

  }, {
    key: "CONTENT_TYPE_JSON",
    get: function get() {
      return "application/json";
    }
  }, {
    key: "CONTENT_TYPE_FORM",
    get: function get() {
      return "application/x-www-form-urlencoded";
    }
  }]);

  return HTTPClient;
}();

/***/ }),

/***/ 5:
/*!************************************************!*\
  !*** multi ./resources/js/app/project/list.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\_Projects\_PHP\SimakPro\resources\js\app\project\list.js */"./resources/js/app/project/list.js");


/***/ })

/******/ });