"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _styledEngine = _interopRequireDefault(require("@material-ui/styled-engine"));

var _styles = require("@material-ui/styles");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

var getStyleOverrides = function getStyleOverrides(name, theme) {
  var styleOverrides = {};

  if (theme && theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    styleOverrides = theme.components[name].styleOverrides;
  }

  return styleOverrides;
};

var getVariantStyles = function getVariantStyles(name, theme) {
  var variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  var variantsStyles = {};
  variants.forEach(function (definition) {
    var key = (0, _styles.propsToClassKey)(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

var variantsResolver = function variantsResolver(props, styles, theme, name) {
  var _theme$components, _theme$components$nam;

  var _props$styleProps = props.styleProps,
      styleProps = _props$styleProps === void 0 ? {} : _props$styleProps;
  var variantsStyles = {};
  var themeVariants = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$nam = _theme$components[name]) === null || _theme$components$nam === void 0 ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(function (themeVariant) {
      var isMatch = true;
      Object.keys(themeVariant.props).forEach(function (key) {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles = (0, _extends2.default)({}, variantsStyles, styles[(0, _styles.propsToClassKey)(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
};

var shouldForwardProp = function shouldForwardProp(prop) {
  return prop !== 'styleProps' && prop !== 'theme';
};

var experimentalStyled = function experimentalStyled(tag, options) {
  var muiOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var name = muiOptions.muiName;
  var defaultStyledResolver = (0, _styledEngine.default)(tag, (0, _extends2.default)({
    shouldForwardProp: shouldForwardProp,
    label: name
  }, options));

  var muiStyledResolver = function muiStyledResolver() {
    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }

    var stylesWithDefaultTheme = styles.map(function (stylesArg) {
      return typeof stylesArg === 'function' ? function (_ref) {
        var themeInput = _ref.theme,
            rest = (0, _objectWithoutProperties2.default)(_ref, ["theme"]);
        return stylesArg((0, _extends2.default)({
          theme: isEmpty(themeInput) ? _defaultTheme.default : themeInput
        }, rest));
      } : stylesArg;
    });

    if (name && muiOptions.overridesResolver) {
      stylesWithDefaultTheme.push(function (props) {
        var theme = isEmpty(props.theme) ? _defaultTheme.default : props.theme;
        return muiOptions.overridesResolver(props, getStyleOverrides(name, theme), name);
      });
    }

    if (name) {
      stylesWithDefaultTheme.push(function (props) {
        var theme = isEmpty(props.theme) ? _defaultTheme.default : props.theme;
        return variantsResolver(props, getVariantStyles(name, theme), theme, name);
      });
    }

    return defaultStyledResolver.apply(void 0, (0, _toConsumableArray2.default)(stylesWithDefaultTheme));
  };

  return muiStyledResolver;
};

var _default = experimentalStyled;
exports.default = _default;