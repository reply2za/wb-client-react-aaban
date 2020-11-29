import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { borders, compose, display, flexbox, grid, palette, positions, shadows, sizing, spacing, typography, css } from '@material-ui/system';
import clsx from 'clsx';
import styled from '../styles/experimentalStyled';
export var styleFunction = css(compose(borders, display, flexbox, grid, positions, palette, shadows, sizing, spacing, typography));

function omit(input, fields) {
  var output = {};
  Object.keys(input).forEach(function (prop) {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
}
/**
 * @ignore - do not document.
 */


var BoxRoot = /*#__PURE__*/React.forwardRef(function StyledComponent(props, ref) {
  var children = props.children,
      clone = props.clone,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      other = _objectWithoutProperties(props, ["children", "clone", "className", "component"]);

  var spread = omit(other, styleFunction.filterProps);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, _extends({
      className: clsx(children.props.className, className)
    }, spread));
  }

  if (typeof children === 'function') {
    return children(_extends({
      className: className
    }, spread));
  }

  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: className
  }, spread), children);
});
process.env.NODE_ENV !== "production" ? BoxRoot.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  clone: PropTypes.bool,
  component: PropTypes.elementType
} : void 0;

var shouldForwardProp = function shouldForwardProp(prop) {
  return styleFunction.filterProps.indexOf(prop) === -1;
};
/**
 * @ignore - do not document.
 */


var Box = styled(BoxRoot, {
  shouldForwardProp: shouldForwardProp
}, {
  muiName: 'MuiBox'
})(styleFunction);
export default Box;