"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adaptV4Theme;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _createBreakpoints = _interopRequireDefault(require("./createBreakpoints"));

var _createV4Spacing = _interopRequireDefault(require("./createV4Spacing"));

function adaptV4Theme(inputTheme) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(['Material-UI: adaptV4Theme() is deprecated.', 'Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme'].join('\n'));
  }

  var _inputTheme$defaultPr = inputTheme.defaultProps,
      defaultProps = _inputTheme$defaultPr === void 0 ? {} : _inputTheme$defaultPr,
      _inputTheme$mixins = inputTheme.mixins,
      mixins = _inputTheme$mixins === void 0 ? {} : _inputTheme$mixins,
      _inputTheme$overrides = inputTheme.overrides,
      overrides = _inputTheme$overrides === void 0 ? {} : _inputTheme$overrides,
      _inputTheme$palette = inputTheme.palette,
      palette = _inputTheme$palette === void 0 ? {} : _inputTheme$palette,
      _inputTheme$props = inputTheme.props,
      props = _inputTheme$props === void 0 ? {} : _inputTheme$props,
      _inputTheme$styleOver = inputTheme.styleOverrides,
      styleOverrides = _inputTheme$styleOver === void 0 ? {} : _inputTheme$styleOver,
      other = (0, _objectWithoutProperties2.default)(inputTheme, ["defaultProps", "mixins", "overrides", "palette", "props", "styleOverrides"]);
  var theme = (0, _extends3.default)({}, other, {
    components: {}
  }); // default props

  Object.keys(defaultProps).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.defaultProps = defaultProps[component];
    theme.components[component] = componentValue;
  });
  Object.keys(props).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.defaultProps = props[component];
    theme.components[component] = componentValue;
  }); // css overrides

  Object.keys(styleOverrides).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.styleOverrides = styleOverrides[component];
    theme.components[component] = componentValue;
  });
  Object.keys(overrides).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.styleOverrides = overrides[component];
    theme.components[component] = componentValue;
  }); // theme.spacing

  theme.spacing = (0, _createV4Spacing.default)(inputTheme.spacing); // theme.mixins.gutters

  var breakpoints = (0, _createBreakpoints.default)(inputTheme.breakpoints || {});
  var spacing = theme.spacing;
  theme.mixins = (0, _extends3.default)({
    gutters: function gutters() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _extends3.default)({
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
      }, styles, (0, _defineProperty2.default)({}, breakpoints.up('sm'), (0, _extends3.default)({
        paddingLeft: spacing(3),
        paddingRight: spacing(3)
      }, styles[breakpoints.up('sm')])));
    }
  }, mixins);
  var typeInput = palette.type,
      modeInput = palette.mode,
      paletteRest = (0, _objectWithoutProperties2.default)(palette, ["type", "mode"]);
  var finalMode = modeInput || typeInput || 'light';
  theme.palette = (0, _extends3.default)({
    // theme.palette.text.hint
    text: {
      hint: finalMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'
    },
    mode: finalMode,
    type: finalMode
  }, paletteRest);
  return theme;
}