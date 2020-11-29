"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("@material-ui/utils");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _transitions = require("../styles/transitions");

var _utils2 = require("../transitions/utils");

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _utils3 = require("../utils");

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 0,
      overflow: 'hidden',
      transition: theme.transitions.create('height'),
      '&$horizontal': {
        height: 'auto',
        width: 0,
        transition: theme.transitions.create('width')
      }
    },

    /* Pseudo-class applied to the root element if `orientation="horizontal"`. */
    horizontal: {},

    /* Styles applied to the root element when the transition has entered. */
    entered: {
      height: 'auto',
      overflow: 'visible',
      '&$horizontal': {
        width: 'auto'
      }
    },

    /* Styles applied to the root element when the transition has exited and `collapsedSize` != 0px. */
    hidden: {
      visibility: 'hidden'
    },

    /* Styles applied to the outer wrapper element. */
    wrapper: {
      // Hack to get children with a negative margin to not falsify the height computation.
      display: 'flex',
      width: '100%',
      '&$horizontal': {
        width: 'auto',
        height: '100%'
      }
    },

    /* Styles applied to the inner wrapper element. */
    wrapperInner: {
      width: '100%',
      '&$horizontal': {
        width: 'auto',
        height: '100%'
      }
    }
  };
};
/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */


exports.styles = styles;
var Collapse = /*#__PURE__*/React.forwardRef(function Collapse(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$collapsedSize = props.collapsedSize,
      collapsedSizeProp = _props$collapsedSize === void 0 ? '0px' : _props$collapsedSize,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      inProp = props.in,
      onEnter = props.onEnter,
      onEntered = props.onEntered,
      onEntering = props.onEntering,
      onExit = props.onExit,
      onExited = props.onExited,
      onExiting = props.onExiting,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'vertical' : _props$orientation,
      style = props.style,
      _props$timeout = props.timeout,
      timeout = _props$timeout === void 0 ? _transitions.duration.standard : _props$timeout,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _reactTransitionGroup.Transition : _props$TransitionComp,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "collapsedSize", "component", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "orientation", "style", "timeout", "TransitionComponent"]);
  var theme = (0, _useTheme.default)();
  var timer = React.useRef();
  var wrapperRef = React.useRef(null);
  var autoTransitionDuration = React.useRef();
  var collapsedSize = typeof collapsedSizeProp === 'number' ? "".concat(collapsedSizeProp, "px") : collapsedSizeProp;
  var isHorizontal = orientation !== "vertical";
  var size = isHorizontal ? 'width' : 'height';
  React.useEffect(function () {
    return function () {
      clearTimeout(timer.current);
    };
  }, []);
  var nodeRef = React.useRef(null);
  var handleRef = (0, _utils3.useForkRef)(ref, nodeRef);

  var normalizedTransitionCallback = function normalizedTransitionCallback(callback) {
    return function (maybeIsAppearing) {
      if (callback) {
        var node = nodeRef.current; // onEnterXxx and onExitXxx callbacks have a different arguments.length value.

        if (maybeIsAppearing === undefined) {
          callback(node);
        } else {
          callback(node, maybeIsAppearing);
        }
      }
    };
  };

  var getWrapperSize = function getWrapperSize() {
    return wrapperRef.current ? wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'] : 0;
  };

  var handleEnter = normalizedTransitionCallback(function (node, isAppearing) {
    if (wrapperRef.current && isHorizontal) {
      // Set absolute position to get the size of collapsed content
      wrapperRef.current.style.position = 'absolute';
    }

    node.style[size] = collapsedSize;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  var handleEntering = normalizedTransitionCallback(function (node, isAppearing) {
    var wrapperSize = getWrapperSize();

    if (wrapperRef.current && isHorizontal) {
      // After the size is read reset the position back to default
      wrapperRef.current.style.position = '';
    }

    var _getTransitionProps = (0, _utils2.getTransitionProps)({
      style: style,
      timeout: timeout
    }, {
      mode: 'enter'
    }),
        transitionDuration = _getTransitionProps.duration;

    if (timeout === 'auto') {
      var duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = "".concat(duration2, "ms");
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : "".concat(transitionDuration, "ms");
    }

    node.style[size] = "".concat(wrapperSize, "px");

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  var handleEntered = normalizedTransitionCallback(function (node, isAppearing) {
    node.style[size] = 'auto';

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  var handleExit = normalizedTransitionCallback(function (node) {
    node.style[size] = "".concat(getWrapperSize(), "px");

    if (onExit) {
      onExit(node);
    }
  });
  var handleExited = normalizedTransitionCallback(onExited);
  var handleExiting = normalizedTransitionCallback(function (node) {
    var wrapperSize = getWrapperSize();

    var _getTransitionProps2 = (0, _utils2.getTransitionProps)({
      style: style,
      timeout: timeout
    }, {
      mode: 'exit'
    }),
        transitionDuration = _getTransitionProps2.duration;

    if (timeout === 'auto') {
      // TODO: rename getAutoHeightDuration to something more generic (width support)
      // Actually it just calculates animation duration based on size
      var duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = "".concat(duration2, "ms");
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : "".concat(transitionDuration, "ms");
    }

    node.style[size] = collapsedSize;

    if (onExiting) {
      onExiting(node);
    }
  });

  var addEndListener = function addEndListener(next) {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
    }
  };

  return /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends3.default)({
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: addEndListener,
    nodeRef: nodeRef,
    timeout: timeout === 'auto' ? null : timeout
  }, other), function (state, childProps) {
    return /*#__PURE__*/React.createElement(Component, (0, _extends3.default)({
      className: (0, _clsx.default)(classes.root, className, isHorizontal && classes.horizontal, {
        'entered': classes.entered,
        'exited': !inProp && collapsedSize === '0px' && classes.hidden
      }[state]),
      style: (0, _extends3.default)((0, _defineProperty2.default)({}, isHorizontal ? 'minWidth' : 'minHeight', collapsedSize), style),
      ref: handleRef
    }, childProps), /*#__PURE__*/React.createElement("div", {
      className: (0, _clsx.default)(classes.wrapper, isHorizontal && classes.horizontal),
      ref: wrapperRef
    }, /*#__PURE__*/React.createElement("div", {
      className: (0, _clsx.default)(classes.wrapperInner, isHorizontal && classes.horizontal)
    }, children)));
  });
});
process.env.NODE_ENV !== "production" ? Collapse.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content node to be collapsed.
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
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _utils.elementTypeAcceptingRef,

  /**
   * If `true`, the component will transition in.
   */
  in: _propTypes.default.bool,

  /**
   * @ignore
   */
  onEnter: _propTypes.default.func,

  /**
   * @ignore
   */
  onEntered: _propTypes.default.func,

  /**
   * @ignore
   */
  onEntering: _propTypes.default.func,

  /**
   * @ignore
   */
  onExit: _propTypes.default.func,

  /**
   * @ignore
   */
  onExited: _propTypes.default.func,

  /**
   * @ignore
   */
  onExiting: _propTypes.default.func,

  /**
   * The collapse transition orientation.
   * @default 'vertical'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })])
} : void 0;
Collapse.muiSupportAuto = true;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiCollapse'
})(Collapse);

exports.default = _default;