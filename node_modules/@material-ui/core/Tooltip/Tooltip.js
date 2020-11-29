"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testReset = testReset;
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _colorManipulator = require("../styles/colorManipulator");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Grow = _interopRequireDefault(require("../Grow"));

var _Popper = _interopRequireDefault(require("../Popper"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _useId = _interopRequireDefault(require("../utils/useId"));

var _useIsFocusVisible2 = _interopRequireDefault(require("../utils/useIsFocusVisible"));

var _useControlled3 = _interopRequireDefault(require("../utils/useControlled"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

function arrowGenerator() {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '0 100%'
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '100% 0'
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '100% 100%'
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '0 0'
      }
    }
  };
}

var styles = function styles(theme) {
  return {
    /* Styles applied to the Popper component. */
    popper: {
      zIndex: theme.zIndex.tooltip,
      pointerEvents: 'none' // disable jss-rtl plugin

    },

    /* Styles applied to the Popper component unless `disableInteractive={true}`. */
    popperInteractive: {
      pointerEvents: 'auto'
    },

    /* Styles applied to the Popper component if `arrow={true}`. */
    popperArrow: arrowGenerator(),

    /* Styles applied to the tooltip (label wrapper) element. */
    tooltip: {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette.grey[700], 0.92),
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.common.white,
      fontFamily: theme.typography.fontFamily,
      padding: '4px 8px',
      fontSize: theme.typography.pxToRem(11),
      maxWidth: 300,
      wordWrap: 'break-word',
      fontWeight: theme.typography.fontWeightMedium
    },

    /* Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
    tooltipArrow: {
      position: 'relative',
      margin: '0'
    },

    /* Styles applied to the arrow element. */
    arrow: {
      overflow: 'hidden',
      position: 'absolute',
      width: '1em',
      height: '0.71em'
      /* = width / sqrt(2) = (length of the hypotenuse) */
      ,
      boxSizing: 'border-box',
      color: (0, _colorManipulator.alpha)(theme.palette.grey[700], 0.9),
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)'
      }
    },

    /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
    touch: {
      padding: '8px 16px',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: "".concat(round(16 / 14), "em"),
      fontWeight: theme.typography.fontWeightRegular
    },

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
    tooltipPlacementLeft: (0, _defineProperty2.default)({
      transformOrigin: 'right center',
      margin: '0 24px '
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight: (0, _defineProperty2.default)({
      transformOrigin: 'left center',
      margin: '0 24px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop: (0, _defineProperty2.default)({
      transformOrigin: 'center bottom',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom: (0, _defineProperty2.default)({
      transformOrigin: 'center top',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    })
  };
};

exports.styles = styles;
var hystersisOpen = false;
var hystersisTimer = null;

function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer);
}

var Tooltip = /*#__PURE__*/React.forwardRef(function Tooltip(props, ref) {
  var _props$arrow = props.arrow,
      arrow = _props$arrow === void 0 ? false : _props$arrow,
      children = props.children,
      classes = props.classes,
      _props$describeChild = props.describeChild,
      describeChild = _props$describeChild === void 0 ? false : _props$describeChild,
      _props$disableFocusLi = props.disableFocusListener,
      disableFocusListener = _props$disableFocusLi === void 0 ? false : _props$disableFocusLi,
      _props$disableHoverLi = props.disableHoverListener,
      disableHoverListener = _props$disableHoverLi === void 0 ? false : _props$disableHoverLi,
      _props$disableTouchLi = props.disableTouchListener,
      disableTouchListener = _props$disableTouchLi === void 0 ? false : _props$disableTouchLi,
      _props$enterDelay = props.enterDelay,
      enterDelay = _props$enterDelay === void 0 ? 100 : _props$enterDelay,
      _props$enterNextDelay = props.enterNextDelay,
      enterNextDelay = _props$enterNextDelay === void 0 ? 0 : _props$enterNextDelay,
      _props$enterTouchDela = props.enterTouchDelay,
      enterTouchDelay = _props$enterTouchDela === void 0 ? 700 : _props$enterTouchDela,
      _props$followCursor = props.followCursor,
      followCursor = _props$followCursor === void 0 ? false : _props$followCursor,
      idProp = props.id,
      _props$disableInterac = props.disableInteractive,
      disableInteractive = _props$disableInterac === void 0 ? false : _props$disableInterac,
      _props$leaveDelay = props.leaveDelay,
      leaveDelay = _props$leaveDelay === void 0 ? 0 : _props$leaveDelay,
      _props$leaveTouchDela = props.leaveTouchDelay,
      leaveTouchDelay = _props$leaveTouchDela === void 0 ? 1500 : _props$leaveTouchDela,
      onClose = props.onClose,
      onOpen = props.onOpen,
      openProp = props.open,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottom' : _props$placement,
      _props$PopperComponen = props.PopperComponent,
      PopperComponent = _props$PopperComponen === void 0 ? _Popper.default : _props$PopperComponen,
      PopperProps = props.PopperProps,
      title = props.title,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _Grow.default : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = (0, _objectWithoutProperties2.default)(props, ["arrow", "children", "classes", "describeChild", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "disableInteractive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]);
  var theme = (0, _useTheme.default)();

  var _React$useState = React.useState(),
      childNode = _React$useState[0],
      setChildNode = _React$useState[1];

  var _React$useState2 = React.useState(null),
      arrowRef = _React$useState2[0],
      setArrowRef = _React$useState2[1];

  var ignoreNonTouchEvents = React.useRef(false);
  var closeTimer = React.useRef();
  var enterTimer = React.useRef();
  var leaveTimer = React.useRef();
  var touchTimer = React.useRef();

  var _useControlled = (0, _useControlled3.default)({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  }),
      _useControlled2 = (0, _slicedToArray2.default)(_useControlled, 2),
      openState = _useControlled2[0],
      setOpenState = _useControlled2[1];

  var open = openState;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var _React$useRef = React.useRef(openProp !== undefined),
        isControlled = _React$useRef.current; // eslint-disable-next-line react-hooks/rules-of-hooks


    React.useEffect(function () {
      if (childNode && childNode.disabled && !isControlled && title !== '' && childNode.tagName.toLowerCase() === 'button') {
        console.error(['Material-UI: You are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Add a simple wrapper element, such as a `span`.'].join('\n'));
      }
    }, [title, childNode, isControlled]);
  }

  var id = (0, _useId.default)(idProp);
  React.useEffect(function () {
    return function () {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);

  var handleOpen = function handleOpen(event) {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen) {
      onOpen(event);
    }
  };

  var handleEnter = function handleEnter() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      var childrenProps = children.props;

      if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
        childrenProps.onMouseOver(event);
      }

      if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
        return;
      } // Remove the title ahead of time.
      // We don't want to wait for the next render commit.
      // We would risk displaying two tooltips at the same time (native + this one).


      if (childNode) {
        childNode.removeAttribute('title');
      }

      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);

      if (enterDelay || hystersisOpen && enterNextDelay) {
        event.persist();
        enterTimer.current = setTimeout(function () {
          handleOpen(event);
        }, hystersisOpen ? enterNextDelay : enterDelay);
      } else {
        handleOpen(event);
      }
    };
  };

  var _useIsFocusVisible = (0, _useIsFocusVisible2.default)(),
      isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
      handleBlurVisible = _useIsFocusVisible.onBlur,
      handleFocusVisible = _useIsFocusVisible.onFocus,
      focusVisibleRef = _useIsFocusVisible.ref; // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.


  var _React$useState3 = React.useState(false),
      setChildIsFocusVisible = _React$useState3[1];

  var handleBlur = function handleBlur(event) {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
    }
  };

  var handleFocus = function handleFocus() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      // Workaround for https://github.com/facebook/react/issues/7769
      // The autoFocus of React might trigger the event before the componentDidMount.
      // We need to account for this eventuality.
      if (!childNode) {
        setChildNode(event.currentTarget);
      }

      handleFocusVisible(event);

      if (isFocusVisibleRef.current === true) {
        setChildIsFocusVisible(true);
        handleEnter()(event);
      }

      var childrenProps = children.props;

      if (childrenProps.onFocus && forward) {
        childrenProps.onFocus(event);
      }
    };
  };

  var handleClose = (0, _useEventCallback.default)(
  /**
   * @param {React.SyntheticEvent | Event} event
   */
  function (event) {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(function () {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(function () {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  });

  var handleLeave = function handleLeave() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      var childrenProps = children.props;

      if (event.type === 'blur') {
        if (childrenProps.onBlur && forward) {
          childrenProps.onBlur(event);
        }

        handleBlur(event);
      }

      if (event.type === 'mouseleave' && childrenProps.onMouseLeave && event.currentTarget === childNode) {
        childrenProps.onMouseLeave(event);
      }

      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      event.persist();
      leaveTimer.current = setTimeout(function () {
        handleClose(event);
      }, leaveDelay);
    };
  };

  var detectTouchStart = function detectTouchStart(event) {
    ignoreNonTouchEvents.current = true;
    var childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  var handleTouchStart = function handleTouchStart(event) {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(touchTimer.current);
    event.persist();
    touchTimer.current = setTimeout(function () {
      handleEnter()(event);
    }, enterTouchDelay);
  };

  var handleTouchEnd = function handleTouchEnd(event) {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(function () {
      handleClose(event);
    }, leaveTouchDelay);
  };

  React.useEffect(function () {
    if (!open) {
      return undefined;
    }
    /**
     * @param {KeyboardEvent} nativeEvent
     */


    function handleKeyDown(nativeEvent) {
      // IE 11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);
  var handleUseRef = (0, _useForkRef.default)(setChildNode, ref);
  var handleFocusRef = (0, _useForkRef.default)(focusVisibleRef, handleUseRef);
  var handleRef = (0, _useForkRef.default)(children.ref, handleFocusRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  }

  var positionRef = React.useRef({
    x: 0,
    y: 0
  });
  var popperRef = React.useRef();

  var handleMouseMove = function handleMouseMove(event) {
    var childrenProps = children.props;

    if (childrenProps.handleMouseMove) {
      childrenProps.handleMouseMove(event);
    }

    positionRef.current = {
      x: event.clientX,
      y: event.clientY
    };

    if (popperRef.current) {
      popperRef.current.scheduleUpdate();
    }
  };

  var nameOrDescProps = {};
  var titleIsString = typeof title === 'string';

  if (describeChild) {
    nameOrDescProps['title'] = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  var childrenProps = (0, _extends2.default)({}, nameOrDescProps, other, children.props, {
    className: (0, _clsx.default)(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }, followCursor ? {
    onMouseMove: handleMouseMove
  } : {});

  if (process.env.NODE_ENV !== 'production') {
    childrenProps['data-mui-internal-clone-element'] = true; // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useEffect(function () {
      if (childNode && !childNode.getAttribute('data-mui-internal-clone-element')) {
        console.error(['Material-UI: The `children` component of the Tooltip is not forwarding its props correctly.', 'Please make sure that props are spread on the same element that the ref is applied to.'].join('\n'));
      }
    }, [childNode]);
  }

  var interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = handleEnter();
    childrenProps.onMouseLeave = handleLeave();

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleEnter(false);
      interactiveWrapperListeners.onMouseLeave = handleLeave(false);
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = handleFocus();
    childrenProps.onBlur = handleLeave();

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus(false);
      interactiveWrapperListeners.onBlur = handleLeave(false);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (children.props.title) {
      console.error(['Material-UI: You have provided a `title` prop to the child of <Tooltip />.', "Remove this title prop `".concat(children.props.title, "` or the Tooltip component.")].join('\n'));
    }
  }

  var mergedPopperProps = React.useMemo(function () {
    return (0, _utils.deepmerge)({
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: Boolean(arrowRef),
            element: arrowRef
          }
        }
      }
    }, PopperProps);
  }, [arrowRef, PopperProps]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(children, childrenProps), /*#__PURE__*/React.createElement(PopperComponent, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.popper, !disableInteractive && classes.popperInteractive, arrow && classes.popperArrow),
    placement: placement,
    anchorEl: followCursor ? {
      clientHeight: 0,
      clientWidth: 0,
      getBoundingClientRect: function getBoundingClientRect() {
        return {
          top: positionRef.current.y,
          left: positionRef.current.x,
          right: positionRef.current.x,
          bottom: positionRef.current.y,
          width: 0,
          height: 0
        };
      }
    } : childNode,
    popperRef: popperRef,
    open: childNode ? open : false,
    id: id,
    transition: true
  }, interactiveWrapperListeners, mergedPopperProps), function (_ref) {
    var placementInner = _ref.placement,
        TransitionPropsInner = _ref.TransitionProps;
    return /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends2.default)({
      timeout: theme.transitions.duration.shorter
    }, TransitionPropsInner, TransitionProps), /*#__PURE__*/React.createElement("div", {
      className: (0, _clsx.default)(classes.tooltip, classes["tooltipPlacement".concat((0, _capitalize.default)(placementInner.split('-')[0]))], ignoreNonTouchEvents.current && classes.touch, arrow && classes.tooltipArrow)
    }, title, arrow ? /*#__PURE__*/React.createElement("span", {
      className: classes.arrow,
      ref: setArrowRef
    }) : null));
  }));
});
process.env.NODE_ENV !== "production" ? Tooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: _propTypes.default.bool,

  /**
   * Tooltip reference element.
   */
  children: _utils.elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: _propTypes.default.bool,

  /**
   * Do not respond to focus events.
   * @default false
   */
  disableFocusListener: _propTypes.default.bool,

  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: _propTypes.default.bool,

  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: _propTypes.default.bool,

  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: _propTypes.default.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: _propTypes.default.number,

  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: _propTypes.default.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: _propTypes.default.number,

  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: _propTypes.default.bool,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: _propTypes.default.string,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: _propTypes.default.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: _propTypes.default.number,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: _propTypes.default.func,

  /**
   * If `true`, the tooltip is shown.
   */
  open: _propTypes.default.bool,

  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: _propTypes.default.elementType,

  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps: _propTypes.default.object,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTooltip',
  flip: false
})(Tooltip);

exports.default = _default;