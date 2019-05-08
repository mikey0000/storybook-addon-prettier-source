'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactElToString = _interopDefault(require('react-element-to-jsx-string'));
var prettier = _interopDefault(require('prettier/standalone'));
var parser = _interopDefault(require('prettier/parser-html'));
var SyntaxHighlighter = require('react-syntax-highlighter/prism-light');
var SyntaxHighlighter__default = _interopDefault(SyntaxHighlighter);
var jsx = _interopDefault(require('react-syntax-highlighter/languages/prism/jsx'));
var tomorrow = _interopDefault(require('react-syntax-highlighter/styles/prism/tomorrow'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".source {\n  padding: 40px;\n}\n\n.source h3 {\n  font-size: 25px;\n  line-height: 40px;\n  color: #444;\n  border-bottom: 1px solid #eee;\n}\n\n.source .code {\n  font-size: 14px;\n  margin: 24px 0 0 !important;\n}\n";
styleInject(css);

SyntaxHighlighter.registerLanguage('jsx', jsx);
var PrettierSource =
/*#__PURE__*/
function (_Component) {
  _inherits(PrettierSource, _Component);

  function PrettierSource(props) {
    var _this;

    _classCallCheck(this, PrettierSource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrettierSource).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "prettifyChildren", function (children, prettierOpts, reactElToStringOpts) {
      // react-element-to-jsx-string puts all object properties on a new line
      // We want prettier to handle that so we need remove all new lines then
      // spaces between tags caused by newline removal
      var stringifiedChildren = reactElToString(children, _objectSpread({
        sortProps: false
      }, reactElToStringOpts)).replace(/\n/g, '');
      var prettified = prettier.format(stringifiedChildren, _objectSpread({
        parser: 'html',
        plugins: [parser]
      }, prettierOpts));
      return prettified;
    });

    _this.state = {
      prettified: _this.prettifyChildren(props.children, props.prettierOpts, props.reactElToStringOpts)
    };
    return _this;
  }

  _createClass(PrettierSource, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var children = this.props.children;
      var newChildren = newProps.children;

      if (children !== newChildren) {
        this.setState({
          prettified: this.prettifyChildren(newProps.children, newProps.prettierOpts, newProps.reactElToStringOpts)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          syntaxHighlighterOpts = _this$props.syntaxHighlighterOpts;
      var prettified = this.state.prettified;
      return React__default.createElement("div", null, children, React__default.createElement("div", {
        className: "source"
      }, React__default.createElement("h3", null, "Story Source"), React__default.createElement(SyntaxHighlighter__default, _extends({
        language: "javascript",
        style: tomorrow,
        className: "code"
      }, syntaxHighlighterOpts), prettified)));
    }
  }]);

  return PrettierSource;
}(React.Component);

_defineProperty(PrettierSource, "propTypes", {
  /**
   * Child content
   * This is converted into code and displayed to user as well as
   * being rendered as a normal React child of the component
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),

  /** Options to override prettier config */
  prettierOpts: PropTypes.object,

  /** Options to override react-syntax-highlighter config */
  syntaxHighlighterOpts: PropTypes.object,

  /** Options to override react-element-to-jsx-string config */
  reactElToStringOpts: PropTypes.object
});

_defineProperty(PrettierSource, "defaultProps", {
  prettierOpts: {},
  syntaxHighlighterOpts: {},
  reactElToStringOpts: {}
});

function addPrettierSource(story, context, opts) {
  return React__default.createElement(PrettierSource, {
    prettierOpts: opts.prettier,
    syntaxHighlighterOpts: opts.syntaxHighlighter,
    reactElToStringOpts: opts.reactElToString
  }, story(context));
}

function withPrettierSource() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (story) {
    return function (context) {
      return addPrettierSource(story, context, opts);
    };
  };
}

exports.withPrettierSource = withPrettierSource;
exports.PrettierSource = PrettierSource;
