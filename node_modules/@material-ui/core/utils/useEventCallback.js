"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useEventCallback;

var React = _interopRequireWildcard(require("react"));

var _useEnhancedEffect = _interopRequireDefault(require("./useEnhancedEffect"));

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @param {function} fn
 */
function useEventCallback(fn) {
  var ref = React.useRef(fn);
  (0, _useEnhancedEffect.default)(function () {
    ref.current = fn;
  });
  return React.useCallback(function () {
    return (0, ref.current).apply(void 0, arguments);
  }, []);
}