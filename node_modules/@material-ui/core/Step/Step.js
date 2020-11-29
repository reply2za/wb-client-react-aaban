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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("./StepContext"));

var styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    paddingLeft: 8,
    paddingRight: 8
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {},

  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    flex: 1,
    position: 'relative'
  },

  /* Pseudo-class applied to the root element if `completed={true}`. */
  completed: {}
};
exports.styles = styles;
var Step = /*#__PURE__*/React.forwardRef(function Step(props, ref) {
  var activeProp = props.active,
      children = props.children,
      classes = props.classes,
      className = props.className,
      completedProp = props.completed,
      disabledProp = props.disabled,
      _props$expanded = props.expanded,
      expanded = _props$expanded === void 0 ? false : _props$expanded,
      index = props.index,
      last = props.last,
      other = (0, _objectWithoutProperties2.default)(props, ["active", "children", "classes", "className", "completed", "disabled", "expanded", "index", "last"]);

  var _React$useContext = React.useContext(_StepperContext.default),
      activeStep = _React$useContext.activeStep,
      connector = _React$useContext.connector,
      alternativeLabel = _React$useContext.alternativeLabel,
      orientation = _React$useContext.orientation,
      nonLinear = _React$useContext.nonLinear;

  var _activeProp = activeProp,
      active = _activeProp === void 0 ? false : _activeProp,
      _completedProp = completedProp,
      completed = _completedProp === void 0 ? false : _completedProp,
      _disabledProp = disabledProp,
      disabled = _disabledProp === void 0 ? false : _disabledProp;

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  var contextValue = React.useMemo(function () {
    return {
      index: index,
      last: last,
      expanded: expanded,
      icon: index + 1,
      active: active,
      completed: completed,
      disabled: disabled
    };
  }, [index, last, expanded, active, completed, disabled]);
  var newChildren = /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[orientation], className, alternativeLabel && classes.alternativeLabel, completed && classes.completed),
    ref: ref
  }, other), connector && alternativeLabel && index !== 0 ? connector : null, children);
  return /*#__PURE__*/React.createElement(_StepContext.default.Provider, {
    value: contextValue
  }, connector && !alternativeLabel && index !== 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, connector, newChildren) : newChildren);
});
process.env.NODE_ENV !== "production" ? Step.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Sets the step as active. Is passed to child components.
   */
  active: _propTypes.default.bool,

  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: _propTypes.default.bool,

  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: _propTypes.default.bool,

  /**
   * Expand the step.
   * @default false
   */
  expanded: _propTypes.default.bool,

  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index: _propTypes.default.number,

  /**
   * If `true`, the Step will be displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last: _propTypes.default.bool
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStep'
})(Step);

exports.default = _default;