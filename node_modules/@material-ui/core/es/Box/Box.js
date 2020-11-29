import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { borders, compose, display, flexbox, grid, palette, positions, shadows, sizing, spacing, typography, css } from '@material-ui/system';
import clsx from 'clsx';
import styled from '../styles/experimentalStyled';
export const styleFunction = css(compose(borders, display, flexbox, grid, positions, palette, shadows, sizing, spacing, typography));

function omit(input, fields) {
  const output = {};
  Object.keys(input).forEach(prop => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
}
/**
 * @ignore - do not document.
 */


const BoxRoot = /*#__PURE__*/React.forwardRef(function StyledComponent(props, ref) {
  const {
    children,
    clone,
    className,
    component: Component = 'div'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "clone", "className", "component"]);

  const spread = omit(other, styleFunction.filterProps);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, _extends({
      className: clsx(children.props.className, className)
    }, spread));
  }

  if (typeof children === 'function') {
    return children(_extends({
      className
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

const shouldForwardProp = prop => styleFunction.filterProps.indexOf(prop) === -1;
/**
 * @ignore - do not document.
 */


const Box = styled(BoxRoot, {
  shouldForwardProp
}, {
  muiName: 'MuiBox'
})(styleFunction);
export default Box;