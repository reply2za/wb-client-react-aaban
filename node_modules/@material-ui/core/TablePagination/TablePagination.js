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

var _utils = require("@material-ui/utils");

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _InputBase = _interopRequireDefault(require("../InputBase"));

var _MenuItem = _interopRequireDefault(require("../MenuItem"));

var _Select = _interopRequireDefault(require("../Select"));

var _TableCell = _interopRequireDefault(require("../TableCell"));

var _Toolbar = _interopRequireDefault(require("../Toolbar"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _TablePaginationActions = _interopRequireDefault(require("./TablePaginationActions"));

var _useId = _interopRequireDefault(require("../utils/useId"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(14),
      overflow: 'auto',
      // Increase the specificity to override TableCell.
      '&:last-child': {
        padding: 0
      }
    },

    /* Styles applied to the Toolbar component. */
    toolbar: {
      minHeight: 52,
      paddingRight: 2
    },

    /* Styles applied to the spacer element. */
    spacer: {
      flex: '1 1 100%'
    },

    /* Styles applied to the caption Typography components if `variant="caption"`. */
    caption: {
      flexShrink: 0
    },
    // TODO v5: `.selectRoot` should be merged with `.input`

    /* Styles applied to the Select component root element. */
    selectRoot: {
      marginRight: 32,
      marginLeft: 8
    },

    /* Styles applied to the Select component `select` class. */
    select: {
      paddingLeft: 8,
      paddingRight: 24,
      textAlign: 'right',
      textAlignLast: 'right' // Align <select> on Chrome.

    },
    // TODO v5: remove

    /* Styles applied to the Select component `icon` class. */
    selectIcon: {},

    /* Styles applied to the `InputBase` component. */
    input: {
      color: 'inherit',
      fontSize: 'inherit',
      flexShrink: 0
    },

    /* Styles applied to the MenuItem component. */
    menuItem: {},

    /* Styles applied to the internal `TablePaginationActions` component. */
    actions: {
      flexShrink: 0,
      marginLeft: 20
    }
  };
};

exports.styles = styles;

function defaultLabelDisplayedRows(_ref) {
  var from = _ref.from,
      to = _ref.to,
      count = _ref.count;
  return "".concat(from, "-").concat(to, " of ").concat(count !== -1 ? count : "more than ".concat(to));
}

function defaultGetAriaLabel(type) {
  return "Go to ".concat(type, " page");
}
/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */


var TablePagination = /*#__PURE__*/React.forwardRef(function TablePagination(props, ref) {
  var _props$ActionsCompone = props.ActionsComponent,
      ActionsComponent = _props$ActionsCompone === void 0 ? _TablePaginationActions.default : _props$ActionsCompone,
      backIconButtonProps = props.backIconButtonProps,
      classes = props.classes,
      className = props.className,
      colSpanProp = props.colSpan,
      _props$component = props.component,
      Component = _props$component === void 0 ? _TableCell.default : _props$component,
      count = props.count,
      _props$getItemAriaLab = props.getItemAriaLabel,
      getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab,
      _props$labelDisplayed = props.labelDisplayedRows,
      labelDisplayedRows = _props$labelDisplayed === void 0 ? defaultLabelDisplayedRows : _props$labelDisplayed,
      _props$labelRowsPerPa = props.labelRowsPerPage,
      labelRowsPerPage = _props$labelRowsPerPa === void 0 ? 'Rows per page:' : _props$labelRowsPerPa,
      nextIconButtonProps = props.nextIconButtonProps,
      onPageChange = props.onPageChange,
      onRowsPerPageChange = props.onRowsPerPageChange,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      _props$rowsPerPageOpt = props.rowsPerPageOptions,
      rowsPerPageOptions = _props$rowsPerPageOpt === void 0 ? [10, 25, 50, 100] : _props$rowsPerPageOpt,
      _props$SelectProps = props.SelectProps,
      SelectProps = _props$SelectProps === void 0 ? {} : _props$SelectProps,
      _props$showFirstButto = props.showFirstButton,
      showFirstButton = _props$showFirstButto === void 0 ? false : _props$showFirstButto,
      _props$showLastButton = props.showLastButton,
      showLastButton = _props$showLastButton === void 0 ? false : _props$showLastButton,
      other = (0, _objectWithoutProperties2.default)(props, ["ActionsComponent", "backIconButtonProps", "classes", "className", "colSpan", "component", "count", "getItemAriaLabel", "labelDisplayedRows", "labelRowsPerPage", "nextIconButtonProps", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "SelectProps", "showFirstButton", "showLastButton"]);
  var colSpan;

  if (Component === _TableCell.default || Component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  var selectId = (0, _useId.default)(SelectProps.id);
  var labelId = (0, _useId.default)(SelectProps.labelId);
  var MenuItemComponent = SelectProps.native ? 'option' : _MenuItem.default;
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    colSpan: colSpan,
    ref: ref
  }, other), /*#__PURE__*/React.createElement(_Toolbar.default, {
    className: classes.toolbar
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.spacer
  }), rowsPerPageOptions.length > 1 && /*#__PURE__*/React.createElement(_Typography.default, {
    color: "inherit",
    variant: "body2",
    className: classes.caption,
    id: labelId
  }, labelRowsPerPage), rowsPerPageOptions.length > 1 && /*#__PURE__*/React.createElement(_Select.default, (0, _extends2.default)({
    classes: {
      select: classes.select,
      icon: classes.selectIcon
    },
    input: /*#__PURE__*/React.createElement(_InputBase.default, {
      className: (0, _clsx.default)(classes.input, classes.selectRoot)
    }),
    value: rowsPerPage,
    onChange: onRowsPerPageChange,
    id: selectId,
    labelId: labelId
  }, SelectProps), rowsPerPageOptions.map(function (rowsPerPageOption) {
    return /*#__PURE__*/React.createElement(MenuItemComponent, {
      className: classes.menuItem,
      key: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption,
      value: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
    }, rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption);
  })), /*#__PURE__*/React.createElement(_Typography.default, {
    color: "inherit",
    variant: "body2",
    className: classes.caption
  }, labelDisplayedRows({
    from: count === 0 ? 0 : page * rowsPerPage + 1,
    to: count !== -1 ? Math.min(count, (page + 1) * rowsPerPage) : (page + 1) * rowsPerPage,
    count: count === -1 ? -1 : count,
    page: page
  })), /*#__PURE__*/React.createElement(ActionsComponent, {
    className: classes.actions,
    backIconButtonProps: backIconButtonProps,
    count: count,
    nextIconButtonProps: nextIconButtonProps,
    onPageChange: onPageChange,
    page: page,
    rowsPerPage: rowsPerPage,
    showFirstButton: showFirstButton,
    showLastButton: showLastButton,
    getItemAriaLabel: getItemAriaLabel
  })));
});
process.env.NODE_ENV !== "production" ? TablePagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent: _propTypes.default.elementType,

  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
   */
  backIconButtonProps: _propTypes.default.object,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   */
  colSpan: _propTypes.default.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: _propTypes.default.number.isRequired,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: _propTypes.default.func,

  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }) {
   *   return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: _propTypes.default.func,

  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: _propTypes.default.node,

  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps: _propTypes.default.object,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: _propTypes.default.func.isRequired,

  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {object} event The event source of the callback.
   */
  onRowsPerPageChange: _propTypes.default.func,

  /**
   * The zero-based index of the current page.
   */
  page: (0, _utils.chainPropTypes)(_propTypes.default.number.isRequired, function (props) {
    var count = props.count,
        page = props.page,
        rowsPerPage = props.rowsPerPage;

    if (count === -1) {
      return null;
    }

    var newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    if (page < 0 || page > newLastPage) {
      return new Error('Material-UI: The page prop of a TablePagination is out of range ' + "(0 to ".concat(newLastPage, ", but page is ").concat(page, ")."));
    }

    return null;
  }),

  /**
   * The number of rows per page.
   */
  rowsPerPage: _propTypes.default.number.isRequired,

  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    value: _propTypes.default.number.isRequired
  })]).isRequired),

  /**
   * Props applied to the rows per page [`Select`](/api/select/) element.
   * @default {}
   */
  SelectProps: _propTypes.default.object,

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: _propTypes.default.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: _propTypes.default.bool
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTablePagination'
})(TablePagination);

exports.default = _default;