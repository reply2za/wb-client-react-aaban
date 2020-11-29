"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var _ImageListContext = _interopRequireDefault(require("../ImageList/ImageListContext"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'inline-block',
    position: 'relative',
    lineHeight: 0 // 🤷🏻‍♂️Fixes masonry item gap

  },

  /* Styles applied to an `img` element to ensure it covers the item. */
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },

  /* Styles applied to the root element if `variant="standard"`. */
  standard: {
    // For titlebar under list item
    display: 'flex',
    flexDirection: 'column',
    '& $img': {
      height: 'auto',
      flexGrow: 1
    }
  },

  /* Styles applied to the root element if `variant="woven"`. */
  woven: {
    height: '100%',
    alignSelf: 'center',
    '&:nth-child(even)': {
      height: '70%'
    }
  }
};
exports.styles = styles;
var ImageListItem = /*#__PURE__*/React.forwardRef(function ImageListItem(props, ref) {
  // TODO: - Use jsdoc @default?: "cols rows default values are for docs only"
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$cols = props.cols,
      cols = _props$cols === void 0 ? 1 : _props$cols,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'li' : _props$component,
      _props$rows = props.rows,
      rows = _props$rows === void 0 ? 1 : _props$rows,
      style = props.style,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "cols", "component", "rows", "style"]);

  var _React$useContext = React.useContext(_ImageListContext.default),
      _React$useContext$row = _React$useContext.rowHeight,
      rowHeight = _React$useContext$row === void 0 ? 'auto' : _React$useContext$row,
      gap = _React$useContext.gap,
      variant = _React$useContext.variant;

  var height = 'auto';

  if (variant === 'woven') {
    height = undefined;
  } else if (rowHeight !== 'auto') {
    height = rowHeight * rows + gap * (rows - 1);
  }

  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[variant], className),
    ref: ref,
    style: (0, _extends2.default)({
      height: height,
      gridColumnEnd: variant !== 'masonry' ? "span ".concat(cols) : undefined,
      gridRowEnd: variant !== 'masonry' ? "span ".concat(rows) : undefined,
      marginBottom: variant === 'masonry' ? gap : undefined
    }, style)
  }, other), React.Children.map(children, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The ImageListItem component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    if (child.type === 'img' || (0, _isMuiElement.default)(child, ['Image'])) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: (0, _clsx.default)(classes.img, child.props.className)
      });
    }

    return child;
  }));
});
process.env.NODE_ENV !== "production" ? ImageListItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * While you can pass any node as children, the main use case is for an img.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols: _propTypes.default.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Height of the item in number of grid rows.
   * @default 1
   */
  rows: _propTypes.default.number,

  /**
   * @ignore
   */
  style: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiImageListItem'
})(ImageListItem);

exports.default = _default;