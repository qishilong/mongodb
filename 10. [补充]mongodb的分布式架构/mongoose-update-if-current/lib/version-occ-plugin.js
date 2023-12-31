"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.versionOCCPlugin = versionOCCPlugin;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
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
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * Implement optimistic concurrency control using a schema's version key.
 *
 * @param {mongoose.Schema} schema - A Mongoose schema to be plugged into.
 */
function versionOCCPlugin(schema) {
  if (schema.$implicitlyCreated) {
    // Implicit creation mean that it's an internal model, aka subdocument.
    // In this case, we don't want to add hooks, because methods are not existing and it's not relevant.
    return;
  } // Get version key name

  var versionKey = schema.get("versionKey");
  (0, _assert["default"])(
    versionKey,
    "document schema must have a version key"
  ); // Add pre-save hook to check version

  schema.pre("save", function (next) {
    // Condition the save on the versions matching
    this.$where = _objectSpread(
      {},
      this.$where,
      _defineProperty({}, versionKey, this[versionKey])
    ); // Increment the version atomically
    if (this.increment) {
      this.increment(); // Invoke next hook
    }

    next();
  });
}
//# sourceMappingURL=version-occ-plugin.js.map
