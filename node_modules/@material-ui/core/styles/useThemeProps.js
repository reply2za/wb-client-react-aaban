"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useThemeProps;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _styles = require("@material-ui/styles");

var _useTheme = _interopRequireDefault(require("./useTheme"));

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function useThemeProps(_ref) {
  var inputProps = _ref.props,
      name = _ref.name;
  var props = (0, _extends2.default)({}, inputProps);

  var contextTheme = (0, _useTheme.default)() || _defaultTheme.default;

  var more = (0, _styles.getThemeProps)({
    theme: contextTheme,
    name: name,
    props: props
  });
  var theme = more.theme || contextTheme;
  var isRtl = theme.direction === 'rtl';
  return (0, _extends2.default)({
    theme: theme,
    isRtl: isRtl
  }, more);
}