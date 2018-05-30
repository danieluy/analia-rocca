webpackJsonp([0],{

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Container = __webpack_require__(201);

var _Container2 = _interopRequireDefault(_Container);

var _InputDocument = __webpack_require__(363);

var _InputDocument2 = _interopRequireDefault(_InputDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var Documents = function (_React$PureComponent) {
  _inherits(Documents, _React$PureComponent);

  function Documents() {
    _classCallCheck(this, Documents);

    var _this = _possibleConstructorReturn(this, (Documents.__proto__ || Object.getPrototypeOf(Documents)).call(this));

    _this.state = {
      addDocumentOpen: false
    };
    return _this;
  }

  _createClass(Documents, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var addDocumentOpen = this.state.addDocumentOpen;

      return _react2.default.createElement(
        _Container2.default,
        null,
        !addDocumentOpen ? _react2.default.createElement(
          'button',
          { className: 'button', onClick: function onClick() {
              return _this2.setState({ addDocumentOpen: true });
            } },
          'Add Documents'
        ) : _react2.default.createElement(_InputDocument2.default, { done: function done() {
            return _this2.setState({ addDocumentOpen: false });
          } }) // TODO update list when done

      );
    }
  }]);

  return Documents;
}(_react2.default.PureComponent);

exports.default = Documents;

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(369),
    arraySome = __webpack_require__(372),
    cacheHas = __webpack_require__(373);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DocumentInfo = __webpack_require__(364);

var _DocumentInfo2 = _interopRequireDefault(_DocumentInfo);

var _InputFiles = __webpack_require__(365);

var _InputFiles2 = _interopRequireDefault(_InputFiles);

var _backend = __webpack_require__(202);

var _utils = __webpack_require__(16);

var _cloneDeep = __webpack_require__(207);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputDocument = function (_React$Component) {
  _inherits(InputDocument, _React$Component);

  function InputDocument() {
    _classCallCheck(this, InputDocument);

    var _this = _possibleConstructorReturn(this, (InputDocument.__proto__ || Object.getPrototypeOf(InputDocument)).call(this));

    _this.state = {
      files: null,
      previews: null
    };
    _this.handleFilesInput = _this.handleFilesInput.bind(_this);
    _this.uploadFiles = _this.uploadFiles.bind(_this);
    _this.handleDocumentInfoInput = _this.handleDocumentInfoInput.bind(_this);
    return _this;
  }

  _createClass(InputDocument, [{
    key: 'handleDocumentInfoInput',
    value: function handleDocumentInfoInput(index, info) {
      var previews = (0, _cloneDeep2.default)(this.state.previews);
      previews[index] = Object.assign(previews[index], { info: info });
      this.setState({ previews: previews });
    }
  }, {
    key: 'uploadFiles',
    value: function uploadFiles() {
      var _state = this.state,
          files = _state.files,
          previews = _state.previews;
      var done = this.props.done;
      // TODO improve alert

      if (!files || !files.length || !previews) return alert('Select a file');
      (0, _backend.postDocuments)({ files: files, filesInfo: previews.map(function (preview) {
          return preview.info;
        }) }).then(function (res) {
        console.log('postDocuments', res);
        done();
      }).catch(_utils.handleBackendError);
    }
  }, {
    key: 'handleFilesInput',
    value: function handleFilesInput(files) {
      this.setState({ files: files }, this.getPreviews);
    }
  }, {
    key: 'getPreviews',
    value: function getPreviews() {
      var _this2 = this;

      Promise.all(this.state.files.map(function (file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (e) {
            return resolve({ src: e.target.result, alt: 'Preview' });
          };
          reader.onerror = function (err) {
            return reject(err);
          };
          reader.readAsDataURL(file.pathOrBlob);
        });
      })).then(function (previews) {
        return _this2.setState({ previews: previews });
      }).catch(_utils.handleBackendError);
    }
  }, {
    key: 'removeFileAndPreview',
    value: function removeFileAndPreview(index) {
      var previews = this.state.previews.slice();
      var files = this.state.files.slice();
      /* const removedPreviews = */previews.splice(index, 1);
      /* const removedFiles = */files.splice(index, 1);
      this.setState({
        files: files.length ? files : null,
        previews: previews.length ? previews : null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          files = _state2.files,
          previews = _state2.previews;
      var done = this.props.done;

      return _react2.default.createElement(
        'div',
        { className: 'input-document' },
        !files && _react2.default.createElement(_InputFiles2.default, {
          onChange: this.handleFilesInput,
          fieldName: 'photo'
        }),
        previews && _react2.default.createElement(
          'div',
          { className: 'document-previews' },
          previews.map(function (preview, i) {
            return _react2.default.createElement(_DocumentInfo2.default, {
              key: preview.src,
              index: i,
              preview: _react2.default.createElement('img', { className: 'preview-image', src: preview.src, alt: preview.alt }),
              info: preview.info || {},
              onRemove: function onRemove(index) {
                _this3.removeFileAndPreview(index);
              },
              onChange: _this3.handleDocumentInfoInput
            });
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'toolbar right' },
          _react2.default.createElement(
            'button',
            { onClick: this.uploadFiles, className: 'button ok', style: { marginRight: '1rem' } },
            'Upload'
          ),
          _react2.default.createElement(
            'button',
            { onClick: done, className: 'button cancel' },
            'Cancel'
          )
        )
      );
    }
  }]);

  return InputDocument;
}(_react2.default.Component);

exports.default = InputDocument;


InputDocument.propTypes = {
  done: _propTypes2.default.func.isRequired
};

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DocumentInfo = function DocumentInfo(_ref) {
  var preview = _ref.preview,
      index = _ref.index,
      info = _ref.info,
      onRemove = _ref.onRemove,
      onChange = _ref.onChange;

  var handleInput = function handleInput(evt) {
    var _evt$target = evt.target,
        value = _evt$target.value,
        name = _evt$target.name;

    onChange(index, Object.assign({}, info, _defineProperty({}, name, value || null)));
  };
  return _react2.default.createElement(
    'div',
    { className: 'document-info' },
    _react2.default.createElement(
      'button',
      { className: 'close-card-button', onClick: function onClick() {
          return onRemove(index);
        } },
      '\xD7'
    ),
    _react2.default.createElement(
      'div',
      { className: 'preview' },
      preview
    ),
    _react2.default.createElement(
      'div',
      { className: 'form' },
      _react2.default.createElement('input', { name: 'title', value: info.title || '', type: 'text', placeholder: 'T\xEDtulo', onChange: handleInput }),
      _react2.default.createElement('input', { name: 'description', value: info.description || '', type: 'text', placeholder: 'Descripci\xF3n', onChange: handleInput }),
      _react2.default.createElement('input', { name: 'date', value: info.date || '', type: 'date', placeholder: 'A\xF1o', onChange: handleInput }),
      _react2.default.createElement('input', { name: 'width', value: info.width || '', type: 'number', placeholder: 'Ancho', onChange: handleInput }),
      _react2.default.createElement('input', { name: 'long', value: info.long || '', type: 'number', placeholder: 'Largo', onChange: handleInput }),
      _react2.default.createElement('input', { name: 'height', value: info.height || '', type: 'number', placeholder: 'Altura', onChange: handleInput }),
      _react2.default.createElement(
        'select',
        { name: 'material', onChange: handleInput, value: info.material },
        _react2.default.createElement(
          'option',
          { value: 'silver' },
          'Plata'
        ),
        _react2.default.createElement(
          'option',
          { value: 'gold' },
          'Oro'
        )
      )
    )
  );
};

exports.default = DocumentInfo;


DocumentInfo.propTypes = {
  preview: _propTypes2.default.element.isRequired,
  index: _propTypes2.default.number.isRequired,
  info: _propTypes2.default.object.isRequired,
  onRemove: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired
};

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = __webpack_require__(366);

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputFiles = function (_React$PureComponent) {
  _inherits(InputFiles, _React$PureComponent);

  function InputFiles(props) {
    _classCallCheck(this, InputFiles);

    var _this = _possibleConstructorReturn(this, (InputFiles.__proto__ || Object.getPrototypeOf(InputFiles)).call(this, props));

    _this.state = {
      files: null,
      errors: props.errors
    };
    _this.handleOnChange = _this.handleOnChange.bind(_this);
    _this.handleFilesSelection = _this.handleFilesSelection.bind(_this);
    _this.handleInput = _this.handleInput.bind(_this);
    return _this;
  }

  _createClass(InputFiles, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _isEqual2.default)(nextProps, this.props)) this.setState({
        errors: nextProps.errors
      });
    }
  }, {
    key: 'handleFilesSelection',
    value: function handleFilesSelection(filesToUpload) {
      this.setState({
        files: Array.from(filesToUpload),
        errors: {}
      }, this.handleInput);
    }
  }, {
    key: 'handleInput',
    value: function handleInput() {
      var _props = this.props,
          multiple = _props.multiple,
          onChange = _props.onChange,
          fieldName = _props.fieldName;
      var files = this.state.files;

      if (!multiple && files.length > 1) {
        var errors = Object.assign({}, this.state.errors);
        errors.multiple = 'Seleccione un único archivo.';
        this.setState({ errors: errors });
      } else if (multiple) onChange(files.map(function (file) {
        return { fieldName: fieldName, pathOrBlob: file };
      }));else onChange({ fieldName: fieldName, pathOrBlob: files[0] });
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange(evt) {
      evt.preventDefault();
      this.handleFilesSelection(evt.target.files);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var multiple = this.props.multiple;
      var _state = this.state,
          files = _state.files,
          errors = _state.errors;

      return _react2.default.createElement(
        'div',
        {
          className: 'upload-target',
          onDragOver: function onDragOver(evt) {
            evt.preventDefault();
          },
          onDrop: function onDrop(evt) {
            evt.preventDefault();
            _this2.handleFilesSelection(evt.dataTransfer.files);
          }
        },
        _react2.default.createElement(
          'label',
          { htmlFor: 'upload-input', id: 'upload-target-surrogate' },
          'Haz click aqu\xED o arrastra archivos para subirlos.'
        ),
        multiple ? _react2.default.createElement('input', {
          id: 'upload-input',
          type: 'file',
          onChange: this.handleOnChange,
          multiple: true
        }) : _react2.default.createElement('input', {
          id: 'upload-input',
          type: 'file',
          onChange: this.handleOnChange
        }),
        files ? _react2.default.createElement(
          'div',
          { id: 'upload-preview' },
          files.map(function (file, i) {
            return _react2.default.createElement(
              'p',
              { key: 'file-' + i },
              file.name
            );
          })
        ) : null,
        errors && _react2.default.createElement(
          'pre',
          { style: { color: '#F00' } },
          JSON.stringify(errors, null, 2)
        )
      );
    }
  }]);

  return InputFiles;
}(_react2.default.PureComponent);

exports.default = InputFiles;


InputFiles.propTypes = {
  multiple: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired,
  errors: _propTypes2.default.object,
  fieldName: _propTypes2.default.string.isRequired
};

InputFiles.defaultProps = {
  multiple: true,
  errors: {}
};

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(367);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(368),
    isObjectLike = __webpack_require__(11);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(208),
    equalArrays = __webpack_require__(359),
    equalByTag = __webpack_require__(374),
    equalObjects = __webpack_require__(377),
    getTag = __webpack_require__(29),
    isArray = __webpack_require__(28),
    isBuffer = __webpack_require__(50),
    isTypedArray = __webpack_require__(210);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(209),
    setCacheAdd = __webpack_require__(370),
    setCacheHas = __webpack_require__(371);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ 370:
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ 371:
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ 372:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ 373:
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(27),
    Uint8Array = __webpack_require__(212),
    eq = __webpack_require__(49),
    equalArrays = __webpack_require__(359),
    mapToArray = __webpack_require__(375),
    setToArray = __webpack_require__(376);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ 375:
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ 376:
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(211);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRG9jdW1lbnRzL0RvY3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEFycmF5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXREb2N1bWVudC9Eb2N1bWVudEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXRGaWxlcy9JbnB1dEZpbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbERlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU2V0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVBZGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlTb21lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsQnlUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsT2JqZWN0cy5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudHMiLCJzdGF0ZSIsImFkZERvY3VtZW50T3BlbiIsInNldFN0YXRlIiwiUHVyZUNvbXBvbmVudCIsIklucHV0RG9jdW1lbnQiLCJmaWxlcyIsInByZXZpZXdzIiwiaGFuZGxlRmlsZXNJbnB1dCIsImJpbmQiLCJ1cGxvYWRGaWxlcyIsImhhbmRsZURvY3VtZW50SW5mb0lucHV0IiwiaW5kZXgiLCJpbmZvIiwiT2JqZWN0IiwiYXNzaWduIiwiZG9uZSIsInByb3BzIiwibGVuZ3RoIiwiYWxlcnQiLCJmaWxlc0luZm8iLCJtYXAiLCJwcmV2aWV3IiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImdldFByZXZpZXdzIiwiUHJvbWlzZSIsImFsbCIsInJlc29sdmUiLCJyZWplY3QiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwic3JjIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImFsdCIsIm9uZXJyb3IiLCJlcnIiLCJyZWFkQXNEYXRhVVJMIiwiZmlsZSIsInBhdGhPckJsb2IiLCJzbGljZSIsInNwbGljZSIsImkiLCJyZW1vdmVGaWxlQW5kUHJldmlldyIsIm1hcmdpblJpZ2h0IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJEb2N1bWVudEluZm8iLCJvblJlbW92ZSIsIm9uQ2hhbmdlIiwiaGFuZGxlSW5wdXQiLCJldnQiLCJ2YWx1ZSIsIm5hbWUiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiZGF0ZSIsIndpZHRoIiwibG9uZyIsImhlaWdodCIsIm1hdGVyaWFsIiwiZWxlbWVudCIsIm51bWJlciIsIm9iamVjdCIsIklucHV0RmlsZXMiLCJlcnJvcnMiLCJoYW5kbGVPbkNoYW5nZSIsImhhbmRsZUZpbGVzU2VsZWN0aW9uIiwibmV4dFByb3BzIiwiZmlsZXNUb1VwbG9hZCIsIkFycmF5IiwiZnJvbSIsIm11bHRpcGxlIiwiZmllbGROYW1lIiwicHJldmVudERlZmF1bHQiLCJkYXRhVHJhbnNmZXIiLCJjb2xvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJib29sIiwic3RyaW5nIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFGQTs7O0lBSU1BLFM7OztBQUNKLHVCQUFjO0FBQUE7O0FBQUE7O0FBRVosVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLHVCQUFpQjtBQUROLEtBQWI7QUFGWTtBQUtiOzs7OzZCQUNRO0FBQUE7O0FBQUEsVUFDQ0EsZUFERCxHQUNxQixLQUFLRCxLQUQxQixDQUNDQyxlQUREOztBQUVQLGFBQ0U7QUFBQTtBQUFBO0FBQ0csU0FBQ0EsZUFBRCxHQUNHO0FBQUE7QUFBQSxZQUFRLFdBQVUsUUFBbEIsRUFBMkIsU0FBUztBQUFBLHFCQUFNLE9BQUtDLFFBQUwsQ0FBYyxFQUFFRCxpQkFBaUIsSUFBbkIsRUFBZCxDQUFOO0FBQUEsYUFBcEM7QUFBQTtBQUFBLFNBREgsR0FFRyx5REFBZSxNQUFNO0FBQUEsbUJBQU0sT0FBS0MsUUFBTCxDQUFjLEVBQUVELGlCQUFpQixLQUFuQixFQUFkLENBQU47QUFBQSxXQUFyQixHQUhOLENBRytFOztBQUgvRSxPQURGO0FBUUQ7Ozs7RUFqQnFCLGdCQUFNRSxhOztrQkFvQmZKLFM7Ozs7Ozs7QUN6QmY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vLi4vQ29udGFpbmVyL0NvbnRhaW5lcic7XG5pbXBvcnQgSW5wdXREb2N1bWVudCBmcm9tICcuLi8uLi9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQnO1xuXG5jbGFzcyBEb2N1bWVudHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWRkRG9jdW1lbnRPcGVuOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgYWRkRG9jdW1lbnRPcGVuIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyPlxuICAgICAgICB7IWFkZERvY3VtZW50T3BlblxuICAgICAgICAgID8gPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgYWRkRG9jdW1lbnRPcGVuOiB0cnVlIH0pfT5BZGQgRG9jdW1lbnRzPC9idXR0b24+XG4gICAgICAgICAgOiA8SW5wdXREb2N1bWVudCBkb25lPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgYWRkRG9jdW1lbnRPcGVuOiBmYWxzZSB9KX0gLz4gLy8gVE9ETyB1cGRhdGUgbGlzdCB3aGVuIGRvbmVcbiAgICAgICAgfVxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2N1bWVudHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRG9jdW1lbnRzL0RvY3VtZW50cy5qcyIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlTb21lID0gcmVxdWlyZSgnLi9fYXJyYXlTb21lJyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgc2VlbiA9IChiaXRtYXNrICYgQ09NUEFSRV9VTk9SREVSRURfRkxBRykgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgc3RhY2suc2V0KGFycmF5LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgYXJyYXkpO1xuXG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleCwgb3RoZXIsIGFycmF5LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICBpZiAoY29tcGFyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoc2Vlbikge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgaWYgKCFjYWNoZUhhcyhzZWVuLCBvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlZW4ucHVzaChvdGhJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHxcbiAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKVxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10oYXJyYXkpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQXJyYXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEFycmF5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IERvY3VtZW50SW5mbyBmcm9tICcuL0RvY3VtZW50SW5mbyc7XG5pbXBvcnQgSW5wdXRGaWxlcyBmcm9tICcuLi9JbnB1dEZpbGVzL0lucHV0RmlsZXMnO1xuaW1wb3J0IHsgcG9zdERvY3VtZW50cyB9IGZyb20gJy4uLy4uL2JhY2tlbmQnO1xuaW1wb3J0IHsgaGFuZGxlQmFja2VuZEVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2gvY2xvbmVEZWVwJztcblxuY2xhc3MgSW5wdXREb2N1bWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZpbGVzOiBudWxsLFxuICAgICAgcHJldmlld3M6IG51bGxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlRmlsZXNJbnB1dCA9IHRoaXMuaGFuZGxlRmlsZXNJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudXBsb2FkRmlsZXMgPSB0aGlzLnVwbG9hZEZpbGVzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEb2N1bWVudEluZm9JbnB1dCA9IHRoaXMuaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVEb2N1bWVudEluZm9JbnB1dChpbmRleCwgaW5mbykge1xuICAgIGNvbnN0IHByZXZpZXdzID0gY2xvbmVEZWVwKHRoaXMuc3RhdGUucHJldmlld3MpO1xuICAgIHByZXZpZXdzW2luZGV4XSA9IE9iamVjdC5hc3NpZ24ocHJldmlld3NbaW5kZXhdLCB7IGluZm8gfSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZpZXdzIH0pO1xuICB9XG4gIHVwbG9hZEZpbGVzKCkge1xuICAgIGNvbnN0IHsgZmlsZXMsIHByZXZpZXdzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZG9uZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBUT0RPIGltcHJvdmUgYWxlcnRcbiAgICBpZiAoIWZpbGVzIHx8ICFmaWxlcy5sZW5ndGggfHwgIXByZXZpZXdzKVxuICAgICAgcmV0dXJuIGFsZXJ0KCdTZWxlY3QgYSBmaWxlJyk7XG4gICAgcG9zdERvY3VtZW50cyh7IGZpbGVzLCBmaWxlc0luZm86IHByZXZpZXdzLm1hcChwcmV2aWV3ID0+IHByZXZpZXcuaW5mbykgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Bvc3REb2N1bWVudHMnLCByZXMpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGhhbmRsZUJhY2tlbmRFcnJvcik7XG4gIH1cbiAgaGFuZGxlRmlsZXNJbnB1dChmaWxlcykge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBmaWxlcyB9LCB0aGlzLmdldFByZXZpZXdzKTtcbiAgfVxuICBnZXRQcmV2aWV3cygpIHtcbiAgICBQcm9taXNlLmFsbCh0aGlzLnN0YXRlLmZpbGVzLm1hcChmaWxlID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gZSA9PiByZXNvbHZlKHsgc3JjOiBlLnRhcmdldC5yZXN1bHQsIGFsdDogJ1ByZXZpZXcnIH0pO1xuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBlcnIgPT4gcmVqZWN0KGVycik7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlLnBhdGhPckJsb2IpO1xuICAgIH0pKSlcbiAgICAgIC50aGVuKHByZXZpZXdzID0+IHRoaXMuc2V0U3RhdGUoeyBwcmV2aWV3cyB9KSlcbiAgICAgIC5jYXRjaChoYW5kbGVCYWNrZW5kRXJyb3IpO1xuICB9XG4gIHJlbW92ZUZpbGVBbmRQcmV2aWV3KGluZGV4KSB7XG4gICAgY29uc3QgcHJldmlld3MgPSB0aGlzLnN0YXRlLnByZXZpZXdzLnNsaWNlKCk7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLnN0YXRlLmZpbGVzLnNsaWNlKCk7XG4gICAgLyogY29uc3QgcmVtb3ZlZFByZXZpZXdzID0gKi8gcHJldmlld3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAvKiBjb25zdCByZW1vdmVkRmlsZXMgPSAqLyBmaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZmlsZXM6IGZpbGVzLmxlbmd0aCA/IGZpbGVzIDogbnVsbCxcbiAgICAgIHByZXZpZXdzOiBwcmV2aWV3cy5sZW5ndGggPyBwcmV2aWV3cyA6IG51bGxcbiAgICB9KTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBmaWxlcywgcHJldmlld3MgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkb25lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWRvY3VtZW50XCI+XG4gICAgICAgIHshZmlsZXMgJiYgKFxuICAgICAgICAgIDxJbnB1dEZpbGVzXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVGaWxlc0lucHV0fVxuICAgICAgICAgICAgZmllbGROYW1lPVwicGhvdG9cIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtwcmV2aWV3cyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2N1bWVudC1wcmV2aWV3c1wiPlxuICAgICAgICAgICAge3ByZXZpZXdzLm1hcCgocHJldmlldywgaSkgPT4gKFxuICAgICAgICAgICAgICA8RG9jdW1lbnRJbmZvXG4gICAgICAgICAgICAgICAga2V5PXtwcmV2aWV3LnNyY31cbiAgICAgICAgICAgICAgICBpbmRleD17aX1cbiAgICAgICAgICAgICAgICBwcmV2aWV3PXs8aW1nIGNsYXNzTmFtZT1cInByZXZpZXctaW1hZ2VcIiBzcmM9e3ByZXZpZXcuc3JjfSBhbHQ9e3ByZXZpZXcuYWx0fSAvPn1cbiAgICAgICAgICAgICAgICBpbmZvPXtwcmV2aWV3LmluZm8gfHwge319XG4gICAgICAgICAgICAgICAgb25SZW1vdmU9eyhpbmRleCkgPT4geyB0aGlzLnJlbW92ZUZpbGVBbmRQcmV2aWV3KGluZGV4KTsgfX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVEb2N1bWVudEluZm9JbnB1dH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2xiYXIgcmlnaHRcIj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMudXBsb2FkRmlsZXN9IGNsYXNzTmFtZT1cImJ1dHRvbiBva1wiIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMXJlbScgfX0+VXBsb2FkPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtkb25lfSBjbGFzc05hbWU9XCJidXR0b24gY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXYgPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXREb2N1bWVudDtcblxuSW5wdXREb2N1bWVudC5wcm9wVHlwZXMgPSB7XG4gIGRvbmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0lucHV0RG9jdW1lbnQvSW5wdXREb2N1bWVudC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBEb2N1bWVudEluZm8gPSAoeyBwcmV2aWV3LCBpbmRleCwgaW5mbywgb25SZW1vdmUsIG9uQ2hhbmdlIH0pID0+IHtcbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoZXZ0KSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSwgbmFtZSB9ID0gZXZ0LnRhcmdldDtcbiAgICBvbkNoYW5nZShpbmRleCwgT2JqZWN0LmFzc2lnbih7fSwgaW5mbywgeyBbbmFtZV06IHZhbHVlIHx8IG51bGwgfSkpO1xuICB9O1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdW1lbnQtaW5mb1wiPlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjbG9zZS1jYXJkLWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uUmVtb3ZlKGluZGV4KX0+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2aWV3XCI+e3ByZXZpZXd9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJ0aXRsZVwiIHZhbHVlPXtpbmZvLnRpdGxlIHx8ICcnfSB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVMOtdHVsb1wiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJkZXNjcmlwdGlvblwiIHZhbHVlPXtpbmZvLmRlc2NyaXB0aW9uIHx8ICcnfSB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRGVzY3JpcGNpw7NuXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSAvPlxuICAgICAgICA8aW5wdXQgbmFtZT1cImRhdGVcIiB2YWx1ZT17aW5mby5kYXRlIHx8ICcnfSB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiQcOxb1wiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJ3aWR0aFwiIHZhbHVlPXtpbmZvLndpZHRoIHx8ICcnfSB0eXBlPVwibnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJBbmNob1wiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJsb25nXCIgdmFsdWU9e2luZm8ubG9uZyB8fCAnJ30gdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiTGFyZ29cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwiaGVpZ2h0XCIgdmFsdWU9e2luZm8uaGVpZ2h0IHx8ICcnfSB0eXBlPVwibnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJBbHR1cmFcIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxzZWxlY3QgbmFtZT1cIm1hdGVyaWFsXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSB2YWx1ZT17aW5mby5tYXRlcmlhbH0+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNpbHZlclwiPlBsYXRhPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImdvbGRcIj5Pcm88L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvY3VtZW50SW5mbztcblxuRG9jdW1lbnRJbmZvLnByb3BUeXBlcyA9IHtcbiAgcHJldmlldzogUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZCxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgaW5mbzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0RvY3VtZW50SW5mby5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoL2lzRXF1YWwnO1xuXG5jbGFzcyBJbnB1dEZpbGVzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmaWxlczogbnVsbCxcbiAgICAgIGVycm9yczogcHJvcHMuZXJyb3JzXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZU9uQ2hhbmdlID0gdGhpcy5oYW5kbGVPbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRmlsZXNTZWxlY3Rpb24gPSB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICghaXNFcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGVycm9yczogbmV4dFByb3BzLmVycm9yc1xuICAgICAgfSk7XG4gIH1cbiAgaGFuZGxlRmlsZXNTZWxlY3Rpb24oZmlsZXNUb1VwbG9hZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZmlsZXM6IEFycmF5LmZyb20oZmlsZXNUb1VwbG9hZCksXG4gICAgICBlcnJvcnM6IHt9XG4gICAgfSwgdGhpcy5oYW5kbGVJbnB1dCk7XG4gIH1cbiAgaGFuZGxlSW5wdXQoKSB7XG4gICAgY29uc3QgeyBtdWx0aXBsZSwgb25DaGFuZ2UsIGZpZWxkTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGZpbGVzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghbXVsdGlwbGUgJiYgZmlsZXMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZXJyb3JzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5lcnJvcnMpO1xuICAgICAgZXJyb3JzLm11bHRpcGxlID0gJ1NlbGVjY2lvbmUgdW4gw7puaWNvIGFyY2hpdm8uJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvcnMgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG11bHRpcGxlKVxuICAgICAgb25DaGFuZ2UoZmlsZXMubWFwKGZpbGUgPT4gKHsgZmllbGROYW1lLCBwYXRoT3JCbG9iOiBmaWxlIH0pKSk7XG4gICAgZWxzZVxuICAgICAgb25DaGFuZ2UoeyBmaWVsZE5hbWUsIHBhdGhPckJsb2I6IGZpbGVzWzBdIH0pO1xuICB9XG4gIGhhbmRsZU9uQ2hhbmdlKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuaGFuZGxlRmlsZXNTZWxlY3Rpb24oZXZ0LnRhcmdldC5maWxlcyk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbXVsdGlwbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBmaWxlcywgZXJyb3JzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInVwbG9hZC10YXJnZXRcIlxuICAgICAgICBvbkRyYWdPdmVyPXsoZXZ0KSA9PiB7IGV2dC5wcmV2ZW50RGVmYXVsdCgpOyB9fVxuICAgICAgICBvbkRyb3A9eyhldnQpID0+IHtcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uKGV2dC5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInVwbG9hZC1pbnB1dFwiIGlkPVwidXBsb2FkLXRhcmdldC1zdXJyb2dhdGVcIj5cbiAgICAgICAgICBIYXogY2xpY2sgYXF1w60gbyBhcnJhc3RyYSBhcmNoaXZvcyBwYXJhIHN1YmlybG9zLlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICB7bXVsdGlwbGUgP1xuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgaWQ9XCJ1cGxvYWQtaW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9XG4gICAgICAgICAgICBtdWx0aXBsZVxuICAgICAgICAgIC8+IDpcbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGlkPVwidXBsb2FkLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgICAge2ZpbGVzID9cbiAgICAgICAgICA8ZGl2IGlkPVwidXBsb2FkLXByZXZpZXdcIj5cbiAgICAgICAgICAgIHtmaWxlcy5tYXAoKGZpbGUsIGkpID0+IDxwIGtleT17YGZpbGUtJHtpfWB9PntmaWxlLm5hbWV9PC9wPil9XG4gICAgICAgICAgPC9kaXY+IDpcbiAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgICAge2Vycm9ycyAmJiA8cHJlIHN0eWxlPXt7IGNvbG9yOiAnI0YwMCcgfX0+e0pTT04uc3RyaW5naWZ5KGVycm9ycywgbnVsbCwgMil9PC9wcmU+fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dEZpbGVzO1xuXG5JbnB1dEZpbGVzLnByb3BUeXBlcyA9IHtcbiAgbXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZXJyb3JzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBmaWVsZE5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufTtcblxuSW5wdXRGaWxlcy5kZWZhdWx0UHJvcHMgPSB7XG4gIG11bHRpcGxlOiB0cnVlLFxuICBlcnJvcnM6IHt9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSW5wdXRGaWxlcy9JbnB1dEZpbGVzLmpzIiwidmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnLi9fYmFzZUlzRXF1YWwnKTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlXG4gKiBlcXVpdmFsZW50LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyBjb21wYXJpbmcgYXJyYXlzLCBhcnJheSBidWZmZXJzLCBib29sZWFucyxcbiAqIGRhdGUgb2JqZWN0cywgZXJyb3Igb2JqZWN0cywgbWFwcywgbnVtYmVycywgYE9iamVjdGAgb2JqZWN0cywgcmVnZXhlcyxcbiAqIHNldHMsIHN0cmluZ3MsIHN5bWJvbHMsIGFuZCB0eXBlZCBhcnJheXMuIGBPYmplY3RgIG9iamVjdHMgYXJlIGNvbXBhcmVkXG4gKiBieSB0aGVpciBvd24sIG5vdCBpbmhlcml0ZWQsIGVudW1lcmFibGUgcHJvcGVydGllcy4gRnVuY3Rpb25zIGFuZCBET01cbiAqIG5vZGVzIGFyZSBjb21wYXJlZCBieSBzdHJpY3QgZXF1YWxpdHksIGkuZS4gYD09PWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uaXNFcXVhbChvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBvYmplY3QgPT09IG90aGVyO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbCh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0VxdWFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJhc2VJc0VxdWFsRGVlcCA9IHJlcXVpcmUoJy4vX2Jhc2VJc0VxdWFsRGVlcCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuXG4gKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdExpa2UodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBiYXNlSXNFcXVhbCwgc3RhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL19lcXVhbEFycmF5cycpLFxuICAgIGVxdWFsQnlUYWcgPSByZXF1aXJlKCcuL19lcXVhbEJ5VGFnJyksXG4gICAgZXF1YWxPYmplY3RzID0gcmVxdWlyZSgnLi9fZXF1YWxPYmplY3RzJyksXG4gICAgZ2V0VGFnID0gcmVxdWlyZSgnLi9fZ2V0VGFnJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IG9iaklzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob2JqZWN0KSxcbiAgICAgIG90aFRhZyA9IG90aElzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob3RoZXIpO1xuXG4gIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb2JqVGFnO1xuICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcblxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmIGlzQnVmZmVyKG9iamVjdCkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKG90aGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBvYmpJc0FyciA9IHRydWU7XG4gICAgb2JqSXNPYmogPSBmYWxzZTtcbiAgfVxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsRGVlcDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzRXF1YWxEZWVwLmpzXG4vLyBtb2R1bGUgaWQgPSAzNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKSxcbiAgICBzZXRDYWNoZUFkZCA9IHJlcXVpcmUoJy4vX3NldENhY2hlQWRkJyksXG4gICAgc2V0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19zZXRDYWNoZUhhcycpO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA9PSBudWxsID8gMCA6IHZhbHVlcy5sZW5ndGg7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0Q2FjaGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldENhY2hlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0Q2FjaGVBZGQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldENhY2hlQWRkLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlSGFzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUhhcy5qc1xuLy8gbW9kdWxlIGlkID0gMzcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlTb21lO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheVNvbWUuanNcbi8vIG1vZHVsZSBpZCA9IDM3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUhhcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2FjaGVIYXMuanNcbi8vIG1vZHVsZSBpZCA9IDM3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgVWludDhBcnJheSA9IHJlcXVpcmUoJy4vX1VpbnQ4QXJyYXknKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vX2VxdWFsQXJyYXlzJyksXG4gICAgbWFwVG9BcnJheSA9IHJlcXVpcmUoJy4vX21hcFRvQXJyYXknKSxcbiAgICBzZXRUb0FycmF5ID0gcmVxdWlyZSgnLi9fc2V0VG9BcnJheScpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gQ29lcmNlIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgYW5kIGRhdGVzIHRvIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICByZXR1cm4gZXEoK29iamVjdCwgK290aGVyKTtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICB2YXIgY29udmVydCA9IG1hcFRvQXJyYXk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUc7XG4gICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgIGlmIChvYmplY3Quc2l6ZSAhPSBvdGhlci5zaXplICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgYml0bWFzayB8PSBDT01QQVJFX1VOT1JERVJFRF9GTEFHO1xuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgICAgIHZhciByZXN1bHQgPSBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlT2YuY2FsbChvYmplY3QpID09IHN5bWJvbFZhbHVlT2YuY2FsbChvdGhlcik7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQnlUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsQnlUYWcuanNcbi8vIG1vZHVsZSBpZCA9IDM3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFRvQXJyYXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvQXJyYXk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDM3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0QWxsS2V5cyA9IHJlcXVpcmUoJy4vX2dldEFsbEtleXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBnZXRBbGxLZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGdldEFsbEtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxPYmplY3RzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbE9iamVjdHMuanNcbi8vIG1vZHVsZSBpZCA9IDM3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9