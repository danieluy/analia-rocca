webpackJsonp([0],{

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _backend = __webpack_require__(271);

var _Container = __webpack_require__(272);

var _Container2 = _interopRequireDefault(_Container);

var _CollectionList = __webpack_require__(516);

var _CollectionList2 = _interopRequireDefault(_CollectionList);

var _InputDocument = __webpack_require__(518);

var _InputDocument2 = _interopRequireDefault(_InputDocument);

var _utils = __webpack_require__(52);

var _firebase = __webpack_require__(90);

var firebase = _interopRequireWildcard(_firebase);

var _events = __webpack_require__(36);

var _events2 = _interopRequireDefault(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard() {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this));

    _this.state = {
      user: null,
      collections: null,
      addDocumentOpen: false
    };
    _this.updateAuthStatus = _this.updateAuthStatus.bind(_this);
    _this.getCollectionsFromBackend = _this.getCollectionsFromBackend.bind(_this);
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateAuthStatus();
      this.getCollectionsFromBackend();
      _events2.default.on('AUTH_STATE_CHANGED', this.updateAuthStatus);
      _events2.default.on('AUTH_STATE_CHANGED', this.getCollectionsFromBackend);
    }
  }, {
    key: 'updateAuthStatus',
    value: function updateAuthStatus() {
      this.setState({
        user: firebase.getCurrentUser()
      });
    }
  }, {
    key: 'getCollectionsFromBackend',
    value: function getCollectionsFromBackend() {
      var _this2 = this;

      (0, _backend.getCollections)().then(function (collections) {
        return _this2.setState({ collections: collections });
      }).catch(function (err) {
        return (0, _utils.handleBackendError)(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.user) {
        var addDocumentOpen = this.state.addDocumentOpen;

        return _react2.default.createElement(
          _Container2.default,
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Dashboard'
          ),
          !addDocumentOpen ? _react2.default.createElement(
            'button',
            { className: 'button', onClick: function onClick() {
                return _this3.setState({ addDocumentOpen: true });
              } },
            'Add Documents'
          ) : _react2.default.createElement(_InputDocument2.default, { done: function done() {
              return _this3.setState({ addDocumentOpen: false });
            } }) // TODO update list when done
          ,
          _react2.default.createElement(
            'h2',
            null,
            'Collections'
          ),
          this.state.collections ? this.state.collections.map(function (collection) {
            return _react2.default.createElement(_CollectionList2.default, {
              key: 'collection-list-' + collection.title.es,
              collection: collection
            });
          }) : _react2.default.createElement(
            'h4',
            null,
            'Loading...'
          )
        );
      }
      return _react2.default.createElement(
        _Container2.default,
        null,
        _react2.default.createElement(
          'button',
          { className: 'sign-in-button', onClick: firebase.signInWithGogle },
          'Sign In With Google'
        )
      );
    }
  }]);

  return Dashboard;
}(_react2.default.Component);

exports.default = Dashboard;

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(524),
    arraySome = __webpack_require__(527),
    cacheHas = __webpack_require__(528);

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

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _ListGallery = __webpack_require__(517);

var _ListGallery2 = _interopRequireDefault(_ListGallery);

var _Collection2 = __webpack_require__(273);

var _Collection3 = _interopRequireDefault(_Collection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectionList = function (_Collection) {
  _inherits(CollectionList, _Collection);

  function CollectionList() {
    _classCallCheck(this, CollectionList);

    return _possibleConstructorReturn(this, (CollectionList.__proto__ || Object.getPrototypeOf(CollectionList)).apply(this, arguments));
  }

  _createClass(CollectionList, [{
    key: 'render',
    value: function render() {
      var _props$collection = this.props.collection,
          title = _props$collection.title,
          photos = _props$collection.photos;

      return _react2.default.createElement(
        'div',
        { className: 'collection' },
        _react2.default.createElement(
          'h2',
          null,
          title.es
        ),
        _react2.default.createElement(_ListGallery2.default, { photos: photos })
      );
    }
  }]);

  return CollectionList;
}(_Collection3.default);

exports.default = CollectionList;

/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _Carousel = __webpack_require__(275);

var _Carousel2 = _interopRequireDefault(_Carousel);

var _Gallery2 = __webpack_require__(274);

var _Gallery3 = _interopRequireDefault(_Gallery2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var ListGallery = function (_Gallery) {
  _inherits(ListGallery, _Gallery);

  function ListGallery() {
    _classCallCheck(this, ListGallery);

    return _possibleConstructorReturn(this, (ListGallery.__proto__ || Object.getPrototypeOf(ListGallery)).call(this));
  }

  _createClass(ListGallery, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.photos) return _react2.default.createElement(
        'div',
        null,
        this.state.photos.map(function (photo, i) {
          return _react2.default.createElement(
            'div',
            { key: 'galley-image-' + i },
            _react2.default.createElement(
              'button',
              { onClick: function onClick() {
                  return _this2.setState({ open: true, index: i });
                } },
              _react2.default.createElement('img', {
                src: photo.src,
                alt: photo.alt,
                style: { maxWidth: 200, maxHeight: 200 }
              })
            ),
            _react2.default.createElement('br', null)
          );
        }),
        this.state.open && _react2.default.createElement(_Carousel2.default, {
          photos: this.state.photos,
          onClose: function onClose() {
            return _this2.setState({ open: false });
          },
          index: this.state.index
        })
      );
      return _react2.default.createElement(
        'h4',
        null,
        'Loading...'
      );
    }
  }]);

  return ListGallery;
}(_Gallery3.default);

exports.default = ListGallery;

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DocumentInfo = __webpack_require__(519);

var _DocumentInfo2 = _interopRequireDefault(_DocumentInfo);

var _InputFiles = __webpack_require__(520);

var _InputFiles2 = _interopRequireDefault(_InputFiles);

var _backend = __webpack_require__(271);

var _utils = __webpack_require__(52);

var _cloneDeep = __webpack_require__(276);

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

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

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

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = __webpack_require__(521);

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

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(522);

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

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(523),
    isObjectLike = __webpack_require__(24);

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

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(277),
    equalArrays = __webpack_require__(515),
    equalByTag = __webpack_require__(529),
    equalObjects = __webpack_require__(532),
    getTag = __webpack_require__(55),
    isArray = __webpack_require__(54),
    isBuffer = __webpack_require__(92),
    isTypedArray = __webpack_require__(279);

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

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(278),
    setCacheAdd = __webpack_require__(525),
    setCacheHas = __webpack_require__(526);

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

/***/ 525:
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

/***/ 526:
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

/***/ 527:
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

/***/ 528:
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

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(53),
    Uint8Array = __webpack_require__(281),
    eq = __webpack_require__(91),
    equalArrays = __webpack_require__(515),
    mapToArray = __webpack_require__(530),
    setToArray = __webpack_require__(531);

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

/***/ 530:
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

/***/ 531:
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

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(280);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRGFzaGJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsQXJyYXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vQ29sbGVjdGlvbkxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvR2FsbGVyeS9MaXN0R2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXREb2N1bWVudC9Eb2N1bWVudEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXRGaWxlcy9JbnB1dEZpbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbERlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU2V0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVBZGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlTb21lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsQnlUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsT2JqZWN0cy5qcyJdLCJuYW1lcyI6WyJmaXJlYmFzZSIsIkRhc2hib2FyZCIsInN0YXRlIiwidXNlciIsImNvbGxlY3Rpb25zIiwiYWRkRG9jdW1lbnRPcGVuIiwidXBkYXRlQXV0aFN0YXR1cyIsImJpbmQiLCJnZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kIiwib24iLCJzZXRTdGF0ZSIsImdldEN1cnJlbnRVc2VyIiwidGhlbiIsImNhdGNoIiwiZXJyIiwibWFwIiwiY29sbGVjdGlvbiIsInRpdGxlIiwiZXMiLCJzaWduSW5XaXRoR29nbGUiLCJDb21wb25lbnQiLCJDb2xsZWN0aW9uTGlzdCIsInByb3BzIiwicGhvdG9zIiwiTGlzdEdhbGxlcnkiLCJwaG90byIsImkiLCJvcGVuIiwiaW5kZXgiLCJzcmMiLCJhbHQiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsIklucHV0RG9jdW1lbnQiLCJmaWxlcyIsInByZXZpZXdzIiwiaGFuZGxlRmlsZXNJbnB1dCIsInVwbG9hZEZpbGVzIiwiaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQiLCJpbmZvIiwiT2JqZWN0IiwiYXNzaWduIiwiZG9uZSIsImxlbmd0aCIsImFsZXJ0IiwiZmlsZXNJbmZvIiwicHJldmlldyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRQcmV2aWV3cyIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJyZXN1bHQiLCJvbmVycm9yIiwicmVhZEFzRGF0YVVSTCIsImZpbGUiLCJwYXRoT3JCbG9iIiwic2xpY2UiLCJzcGxpY2UiLCJyZW1vdmVGaWxlQW5kUHJldmlldyIsIm1hcmdpblJpZ2h0IiwicHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJEb2N1bWVudEluZm8iLCJvblJlbW92ZSIsIm9uQ2hhbmdlIiwiaGFuZGxlSW5wdXQiLCJldnQiLCJ2YWx1ZSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImRhdGUiLCJ3aWR0aCIsImxvbmciLCJoZWlnaHQiLCJtYXRlcmlhbCIsImVsZW1lbnQiLCJudW1iZXIiLCJvYmplY3QiLCJJbnB1dEZpbGVzIiwiZXJyb3JzIiwiaGFuZGxlT25DaGFuZ2UiLCJoYW5kbGVGaWxlc1NlbGVjdGlvbiIsIm5leHRQcm9wcyIsImZpbGVzVG9VcGxvYWQiLCJBcnJheSIsImZyb20iLCJtdWx0aXBsZSIsImZpZWxkTmFtZSIsInByZXZlbnREZWZhdWx0IiwiZGF0YVRyYW5zZmVyIiwiY29sb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiUHVyZUNvbXBvbmVudCIsImJvb2wiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7SUFBWUEsUTs7QUFDWjs7Ozs7Ozs7Ozs7OztBQVBBOzs7SUFTTUMsUzs7O0FBQ0osdUJBQWM7QUFBQTs7QUFBQTs7QUFFWixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxJQURLO0FBRVhDLG1CQUFhLElBRkY7QUFHWEMsdUJBQWlCO0FBSE4sS0FBYjtBQUtBLFVBQUtDLGdCQUFMLEdBQXdCLE1BQUtBLGdCQUFMLENBQXNCQyxJQUF0QixPQUF4QjtBQUNBLFVBQUtDLHlCQUFMLEdBQWlDLE1BQUtBLHlCQUFMLENBQStCRCxJQUEvQixPQUFqQztBQVJZO0FBU2I7Ozs7d0NBQ21CO0FBQ2xCLFdBQUtELGdCQUFMO0FBQ0EsV0FBS0UseUJBQUw7QUFDQSx1QkFBT0MsRUFBUCxDQUFVLG9CQUFWLEVBQWdDLEtBQUtILGdCQUFyQztBQUNBLHVCQUFPRyxFQUFQLENBQVUsb0JBQVYsRUFBZ0MsS0FBS0QseUJBQXJDO0FBQ0Q7Ozt1Q0FDa0I7QUFDakIsV0FBS0UsUUFBTCxDQUFj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RUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOzs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOzs7Ozs7OztBQ2pCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbnMgfSBmcm9tICcuLi8uLi9iYWNrZW5kJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vQ29udGFpbmVyL0NvbnRhaW5lcic7XG5pbXBvcnQgQ29sbGVjdGlvbkxpc3QgZnJvbSAnLi4vQ29sbGVjdGlvbi9Db2xsZWN0aW9uTGlzdCc7XG5pbXBvcnQgSW5wdXREb2N1bWVudCBmcm9tICcuLi9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQnO1xuaW1wb3J0IHsgaGFuZGxlQmFja2VuZEVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSAnLi4vLi4vZmlyZWJhc2UnO1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuLi8uLi9ldmVudHMnO1xuXG5jbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VyOiBudWxsLFxuICAgICAgY29sbGVjdGlvbnM6IG51bGwsXG4gICAgICBhZGREb2N1bWVudE9wZW46IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMgPSB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQgPSB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMoKTtcbiAgICB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQoKTtcbiAgICBldmVudHMub24oJ0FVVEhfU1RBVEVfQ0hBTkdFRCcsIHRoaXMudXBkYXRlQXV0aFN0YXR1cyk7XG4gICAgZXZlbnRzLm9uKCdBVVRIX1NUQVRFX0NIQU5HRUQnLCB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQpO1xuICB9XG4gIHVwZGF0ZUF1dGhTdGF0dXMoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyOiBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgfSk7XG4gIH1cbiAgZ2V0Q29sbGVjdGlvbnNGcm9tQmFja2VuZCgpIHtcbiAgICBnZXRDb2xsZWN0aW9ucygpXG4gICAgICAudGhlbihjb2xsZWN0aW9ucyA9PiB0aGlzLnNldFN0YXRlKHsgY29sbGVjdGlvbnMgfSkpXG4gICAgICAuY2F0Y2goZXJyID0+IGhhbmRsZUJhY2tlbmRFcnJvcihlcnIpKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudXNlcikge1xuICAgICAgY29uc3QgeyBhZGREb2N1bWVudE9wZW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgIDxoMT5EYXNoYm9hcmQ8L2gxPlxuICAgICAgICAgIHshYWRkRG9jdW1lbnRPcGVuXG4gICAgICAgICAgICA/IDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFkZERvY3VtZW50T3BlbjogdHJ1ZSB9KX0+QWRkIERvY3VtZW50czwvYnV0dG9uPlxuICAgICAgICAgICAgOiA8SW5wdXREb2N1bWVudCBkb25lPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgYWRkRG9jdW1lbnRPcGVuOiBmYWxzZSB9KX0gLz4gLy8gVE9ETyB1cGRhdGUgbGlzdCB3aGVuIGRvbmVcbiAgICAgICAgICB9XG4gICAgICAgICAgPGgyPkNvbGxlY3Rpb25zPC9oMj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5jb2xsZWN0aW9uc1xuICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmNvbGxlY3Rpb25zLm1hcChjb2xsZWN0aW9uID0+IChcbiAgICAgICAgICAgICAgPENvbGxlY3Rpb25MaXN0XG4gICAgICAgICAgICAgICAga2V5PXtgY29sbGVjdGlvbi1saXN0LSR7Y29sbGVjdGlvbi50aXRsZS5lc31gfVxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb249e2NvbGxlY3Rpb259XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgOiA8aDQ+TG9hZGluZy4uLjwvaDQ+XG4gICAgICAgICAgfVxuXG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic2lnbi1pbi1idXR0b25cIiBvbkNsaWNrPXtmaXJlYmFzZS5zaWduSW5XaXRoR29nbGV9PlNpZ24gSW4gV2l0aCBHb29nbGU8L2J1dHRvbj5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRGFzaGJvYXJkL0Rhc2hib2FyZC5qcyIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlTb21lID0gcmVxdWlyZSgnLi9fYXJyYXlTb21lJyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgc2VlbiA9IChiaXRtYXNrICYgQ09NUEFSRV9VTk9SREVSRURfRkxBRykgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgc3RhY2suc2V0KGFycmF5LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgYXJyYXkpO1xuXG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleCwgb3RoZXIsIGFycmF5LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICBpZiAoY29tcGFyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoc2Vlbikge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgaWYgKCFjYWNoZUhhcyhzZWVuLCBvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlZW4ucHVzaChvdGhJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHxcbiAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKVxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10oYXJyYXkpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQXJyYXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEFycmF5cy5qc1xuLy8gbW9kdWxlIGlkID0gNTE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGlzdEdhbGxlcnkgZnJvbSAnLi4vR2FsbGVyeS9MaXN0R2FsbGVyeSc7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuL0NvbGxlY3Rpb24nO1xuXG5jbGFzcyBDb2xsZWN0aW9uTGlzdCBleHRlbmRzIENvbGxlY3Rpb24ge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0aXRsZSwgcGhvdG9zIH0gPSB0aGlzLnByb3BzLmNvbGxlY3Rpb247XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGVjdGlvblwiPlxuICAgICAgICA8aDI+e3RpdGxlLmVzfTwvaDI+XG4gICAgICAgIDxMaXN0R2FsbGVyeSBwaG90b3M9e3Bob3Rvc30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbkxpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uL0NvbGxlY3Rpb25MaXN0LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9DYXJvdXNlbCc7XG5pbXBvcnQgR2FsbGVyeSBmcm9tICcuL0dhbGxlcnknO1xuXG5jbGFzcyBMaXN0R2FsbGVyeSBleHRlbmRzIEdhbGxlcnkge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUucGhvdG9zKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5waG90b3MubWFwKChwaG90bywgaSkgPT4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2BnYWxsZXktaW1hZ2UtJHtpfWB9PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBvcGVuOiB0cnVlLCBpbmRleDogaSB9KX0gPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17cGhvdG8uc3JjfVxuICAgICAgICAgICAgICAgICAgYWx0PXtwaG90by5hbHR9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogMjAwLCBtYXhIZWlnaHQ6IDIwMCB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHt0aGlzLnN0YXRlLm9wZW4gJiZcbiAgICAgICAgICAgIDxDYXJvdXNlbFxuICAgICAgICAgICAgICBwaG90b3M9e3RoaXMuc3RhdGUucGhvdG9zfVxuICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgb3BlbjogZmFsc2UgfSl9XG4gICAgICAgICAgICAgIGluZGV4PXt0aGlzLnN0YXRlLmluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICByZXR1cm4gPGg0PkxvYWRpbmcuLi48L2g0PjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0R2FsbGVyeTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0dhbGxlcnkvTGlzdEdhbGxlcnkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBEb2N1bWVudEluZm8gZnJvbSAnLi9Eb2N1bWVudEluZm8nO1xuaW1wb3J0IElucHV0RmlsZXMgZnJvbSAnLi4vSW5wdXRGaWxlcy9JbnB1dEZpbGVzJztcbmltcG9ydCB7IHBvc3REb2N1bWVudHMgfSBmcm9tICcuLi8uLi9iYWNrZW5kJztcbmltcG9ydCB7IGhhbmRsZUJhY2tlbmRFcnJvciB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoL2Nsb25lRGVlcCc7XG5cbmNsYXNzIElucHV0RG9jdW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmaWxlczogbnVsbCxcbiAgICAgIHByZXZpZXdzOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzSW5wdXQgPSB0aGlzLmhhbmRsZUZpbGVzSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwbG9hZEZpbGVzID0gdGhpcy51cGxvYWRGaWxlcy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQgPSB0aGlzLmhhbmRsZURvY3VtZW50SW5mb0lucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQoaW5kZXgsIGluZm8pIHtcbiAgICBjb25zdCBwcmV2aWV3cyA9IGNsb25lRGVlcCh0aGlzLnN0YXRlLnByZXZpZXdzKTtcbiAgICBwcmV2aWV3c1tpbmRleF0gPSBPYmplY3QuYXNzaWduKHByZXZpZXdzW2luZGV4XSwgeyBpbmZvIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2aWV3cyB9KTtcbiAgfVxuICB1cGxvYWRGaWxlcygpIHtcbiAgICBjb25zdCB7IGZpbGVzLCBwcmV2aWV3cyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRvbmUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gVE9ETyBpbXByb3ZlIGFsZXJ0XG4gICAgaWYgKCFmaWxlcyB8fCAhZmlsZXMubGVuZ3RoIHx8ICFwcmV2aWV3cylcbiAgICAgIHJldHVybiBhbGVydCgnU2VsZWN0IGEgZmlsZScpO1xuICAgIHBvc3REb2N1bWVudHMoeyBmaWxlcywgZmlsZXNJbmZvOiBwcmV2aWV3cy5tYXAocHJldmlldyA9PiBwcmV2aWV3LmluZm8pIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3N0RG9jdW1lbnRzJywgcmVzKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChoYW5kbGVCYWNrZW5kRXJyb3IpO1xuICB9XG4gIGhhbmRsZUZpbGVzSW5wdXQoZmlsZXMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZmlsZXMgfSwgdGhpcy5nZXRQcmV2aWV3cyk7XG4gIH1cbiAgZ2V0UHJldmlld3MoKSB7XG4gICAgUHJvbWlzZS5hbGwodGhpcy5zdGF0ZS5maWxlcy5tYXAoZmlsZSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGUgPT4gcmVzb2x2ZSh7IHNyYzogZS50YXJnZXQucmVzdWx0LCBhbHQ6ICdQcmV2aWV3JyB9KTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZXJyID0+IHJlamVjdChlcnIpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZS5wYXRoT3JCbG9iKTtcbiAgICB9KSkpXG4gICAgICAudGhlbihwcmV2aWV3cyA9PiB0aGlzLnNldFN0YXRlKHsgcHJldmlld3MgfSkpXG4gICAgICAuY2F0Y2goaGFuZGxlQmFja2VuZEVycm9yKTtcbiAgfVxuICByZW1vdmVGaWxlQW5kUHJldmlldyhpbmRleCkge1xuICAgIGNvbnN0IHByZXZpZXdzID0gdGhpcy5zdGF0ZS5wcmV2aWV3cy5zbGljZSgpO1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5zdGF0ZS5maWxlcy5zbGljZSgpO1xuICAgIC8qIGNvbnN0IHJlbW92ZWRQcmV2aWV3cyA9ICovIHByZXZpZXdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgLyogY29uc3QgcmVtb3ZlZEZpbGVzID0gKi8gZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZpbGVzOiBmaWxlcy5sZW5ndGggPyBmaWxlcyA6IG51bGwsXG4gICAgICBwcmV2aWV3czogcHJldmlld3MubGVuZ3RoID8gcHJldmlld3MgOiBudWxsXG4gICAgfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZmlsZXMsIHByZXZpZXdzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZG9uZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1kb2N1bWVudFwiPlxuICAgICAgICB7IWZpbGVzICYmIChcbiAgICAgICAgICA8SW5wdXRGaWxlc1xuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZXNJbnB1dH1cbiAgICAgICAgICAgIGZpZWxkTmFtZT1cInBob3RvXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7cHJldmlld3MgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdW1lbnQtcHJldmlld3NcIj5cbiAgICAgICAgICAgIHtwcmV2aWV3cy5tYXAoKHByZXZpZXcsIGkpID0+IChcbiAgICAgICAgICAgICAgPERvY3VtZW50SW5mb1xuICAgICAgICAgICAgICAgIGtleT17cHJldmlldy5zcmN9XG4gICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgcHJldmlldz17PGltZyBjbGFzc05hbWU9XCJwcmV2aWV3LWltYWdlXCIgc3JjPXtwcmV2aWV3LnNyY30gYWx0PXtwcmV2aWV3LmFsdH0gLz59XG4gICAgICAgICAgICAgICAgaW5mbz17cHJldmlldy5pbmZvIHx8IHt9fVxuICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoaW5kZXgpID0+IHsgdGhpcy5yZW1vdmVGaWxlQW5kUHJldmlldyhpbmRleCk7IH19XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sYmFyIHJpZ2h0XCI+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnVwbG9hZEZpbGVzfSBjbGFzc05hbWU9XCJidXR0b24gb2tcIiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzFyZW0nIH19PlVwbG9hZDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17ZG9uZX0gY2xhc3NOYW1lPVwiYnV0dG9uIGNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2ID5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0RG9jdW1lbnQ7XG5cbklucHV0RG9jdW1lbnQucHJvcFR5cGVzID0ge1xuICBkb25lOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgRG9jdW1lbnRJbmZvID0gKHsgcHJldmlldywgaW5kZXgsIGluZm8sIG9uUmVtb3ZlLCBvbkNoYW5nZSB9KSA9PiB7XG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUsIG5hbWUgfSA9IGV2dC50YXJnZXQ7XG4gICAgb25DaGFuZ2UoaW5kZXgsIE9iamVjdC5hc3NpZ24oe30sIGluZm8sIHsgW25hbWVdOiB2YWx1ZSB8fCBudWxsIH0pKTtcbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3VtZW50LWluZm9cIj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY2xvc2UtY2FyZC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblJlbW92ZShpbmRleCl9PiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlld1wiPntwcmV2aWV3fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwidGl0bGVcIiB2YWx1ZT17aW5mby50aXRsZSB8fCAnJ30gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlTDrXR1bG9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwiZGVzY3JpcHRpb25cIiB2YWx1ZT17aW5mby5kZXNjcmlwdGlvbiB8fCAnJ30gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXBjacOzblwiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJkYXRlXCIgdmFsdWU9e2luZm8uZGF0ZSB8fCAnJ30gdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIkHDsW9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwid2lkdGhcIiB2YWx1ZT17aW5mby53aWR0aCB8fCAnJ30gdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiQW5jaG9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwibG9uZ1wiIHZhbHVlPXtpbmZvLmxvbmcgfHwgJyd9IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIkxhcmdvXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSAvPlxuICAgICAgICA8aW5wdXQgbmFtZT1cImhlaWdodFwiIHZhbHVlPXtpbmZvLmhlaWdodCB8fCAnJ30gdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiQWx0dXJhXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSAvPlxuICAgICAgICA8c2VsZWN0IG5hbWU9XCJtYXRlcmlhbFwiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gdmFsdWU9e2luZm8ubWF0ZXJpYWx9PlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzaWx2ZXJcIj5QbGF0YTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJnb2xkXCI+T3JvPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb2N1bWVudEluZm87XG5cbkRvY3VtZW50SW5mby5wcm9wVHlwZXMgPSB7XG4gIHByZXZpZXc6IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGluZm86IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSW5wdXREb2N1bWVudC9Eb2N1bWVudEluZm8uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9pc0VxdWFsJztcblxuY2xhc3MgSW5wdXRGaWxlcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZmlsZXM6IG51bGwsXG4gICAgICBlcnJvcnM6IHByb3BzLmVycm9yc1xuICAgIH07XG4gICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVGaWxlc1NlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAoIWlzRXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSlcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBlcnJvcnM6IG5leHRQcm9wcy5lcnJvcnNcbiAgICAgIH0pO1xuICB9XG4gIGhhbmRsZUZpbGVzU2VsZWN0aW9uKGZpbGVzVG9VcGxvYWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZpbGVzOiBBcnJheS5mcm9tKGZpbGVzVG9VcGxvYWQpLFxuICAgICAgZXJyb3JzOiB7fVxuICAgIH0sIHRoaXMuaGFuZGxlSW5wdXQpO1xuICB9XG4gIGhhbmRsZUlucHV0KCkge1xuICAgIGNvbnN0IHsgbXVsdGlwbGUsIG9uQ2hhbmdlLCBmaWVsZE5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBmaWxlcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoIW11bHRpcGxlICYmIGZpbGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGVycm9ycyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuZXJyb3JzKTtcbiAgICAgIGVycm9ycy5tdWx0aXBsZSA9ICdTZWxlY2Npb25lIHVuIMO6bmljbyBhcmNoaXZvLic7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtdWx0aXBsZSlcbiAgICAgIG9uQ2hhbmdlKGZpbGVzLm1hcChmaWxlID0+ICh7IGZpZWxkTmFtZSwgcGF0aE9yQmxvYjogZmlsZSB9KSkpO1xuICAgIGVsc2VcbiAgICAgIG9uQ2hhbmdlKHsgZmllbGROYW1lLCBwYXRoT3JCbG9iOiBmaWxlc1swXSB9KTtcbiAgfVxuICBoYW5kbGVPbkNoYW5nZShldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uKGV2dC50YXJnZXQuZmlsZXMpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG11bHRpcGxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZmlsZXMsIGVycm9ycyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJ1cGxvYWQtdGFyZ2V0XCJcbiAgICAgICAgb25EcmFnT3Zlcj17KGV2dCkgPT4geyBldnQucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgb25Ecm9wPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5oYW5kbGVGaWxlc1NlbGVjdGlvbihldnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ1cGxvYWQtaW5wdXRcIiBpZD1cInVwbG9hZC10YXJnZXQtc3Vycm9nYXRlXCI+XG4gICAgICAgICAgSGF6IGNsaWNrIGFxdcOtIG8gYXJyYXN0cmEgYXJjaGl2b3MgcGFyYSBzdWJpcmxvcy5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAge211bHRpcGxlID9cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGlkPVwidXBsb2FkLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfVxuICAgICAgICAgICAgbXVsdGlwbGVcbiAgICAgICAgICAvPiA6XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBpZD1cInVwbG9hZC1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHtmaWxlcyA/XG4gICAgICAgICAgPGRpdiBpZD1cInVwbG9hZC1wcmV2aWV3XCI+XG4gICAgICAgICAgICB7ZmlsZXMubWFwKChmaWxlLCBpKSA9PiA8cCBrZXk9e2BmaWxlLSR7aX1gfT57ZmlsZS5uYW1lfTwvcD4pfVxuICAgICAgICAgIDwvZGl2PiA6XG4gICAgICAgICAgbnVsbFxuICAgICAgICB9XG4gICAgICAgIHtlcnJvcnMgJiYgPHByZSBzdHlsZT17eyBjb2xvcjogJyNGMDAnIH19PntKU09OLnN0cmluZ2lmeShlcnJvcnMsIG51bGwsIDIpfTwvcHJlPn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXRGaWxlcztcblxuSW5wdXRGaWxlcy5wcm9wVHlwZXMgPSB7XG4gIG11bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGVycm9yczogUHJvcFR5cGVzLm9iamVjdCxcbiAgZmllbGROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn07XG5cbklucHV0RmlsZXMuZGVmYXVsdFByb3BzID0ge1xuICBtdWx0aXBsZTogdHJ1ZSxcbiAgZXJyb3JzOiB7fVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0lucHV0RmlsZXMvSW5wdXRGaWxlcy5qcyIsInZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJy4vX2Jhc2VJc0VxdWFsJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICogZXF1aXZhbGVudC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2Qgc3VwcG9ydHMgY29tcGFyaW5nIGFycmF5cywgYXJyYXkgYnVmZmVycywgYm9vbGVhbnMsXG4gKiBkYXRlIG9iamVjdHMsIGVycm9yIG9iamVjdHMsIG1hcHMsIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsXG4gKiBzZXRzLCBzdHJpbmdzLCBzeW1ib2xzLCBhbmQgdHlwZWQgYXJyYXlzLiBgT2JqZWN0YCBvYmplY3RzIGFyZSBjb21wYXJlZFxuICogYnkgdGhlaXIgb3duLCBub3QgaW5oZXJpdGVkLCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIEZ1bmN0aW9ucyBhbmQgRE9NXG4gKiBub2RlcyBhcmUgY29tcGFyZWQgYnkgc3RyaWN0IGVxdWFsaXR5LCBpLmUuIGA9PT1gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmlzRXF1YWwob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogb2JqZWN0ID09PSBvdGhlcjtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXF1YWwodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNFcXVhbC5qc1xuLy8gbW9kdWxlIGlkID0gNTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlSXNFcXVhbERlZXAgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbERlZXAnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtib29sZWFufSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLlxuICogIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3RMaWtlKHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgYmFzZUlzRXF1YWwsIHN0YWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzRXF1YWwuanNcbi8vIG1vZHVsZSBpZCA9IDUyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3RhY2sgPSByZXF1aXJlKCcuL19TdGFjaycpLFxuICAgIGVxdWFsQXJyYXlzID0gcmVxdWlyZSgnLi9fZXF1YWxBcnJheXMnKSxcbiAgICBlcXVhbEJ5VGFnID0gcmVxdWlyZSgnLi9fZXF1YWxCeVRhZycpLFxuICAgIGVxdWFsT2JqZWN0cyA9IHJlcXVpcmUoJy4vX2VxdWFsT2JqZWN0cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBvYmpJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG9iamVjdCksXG4gICAgICBvdGhUYWcgPSBvdGhJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG90aGVyKTtcblxuICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbERlZXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0VxdWFsRGVlcC5qc1xuLy8gbW9kdWxlIGlkID0gNTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyksXG4gICAgc2V0Q2FjaGVBZGQgPSByZXF1aXJlKCcuL19zZXRDYWNoZUFkZCcpLFxuICAgIHNldENhY2hlSGFzID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVIYXMnKTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPT0gbnVsbCA/IDAgOiB2YWx1ZXMubGVuZ3RoO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldENhY2hlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXRDYWNoZS5qc1xuLy8gbW9kdWxlIGlkID0gNTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlQWRkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUFkZC5qc1xuLy8gbW9kdWxlIGlkID0gNTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUhhcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVIYXMuanNcbi8vIG1vZHVsZSBpZCA9IDUyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5U29tZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlTb21lLmpzXG4vLyBtb2R1bGUgaWQgPSA1Mjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBgY2FjaGVgIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVIYXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzXG4vLyBtb2R1bGUgaWQgPSA1Mjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIFVpbnQ4QXJyYXkgPSByZXF1aXJlKCcuL19VaW50OEFycmF5JyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL19lcXVhbEFycmF5cycpLFxuICAgIG1hcFRvQXJyYXkgPSByZXF1aXJlKCcuL19tYXBUb0FycmF5JyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gQ09NUEFSRV9VTk9SREVSRURfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEJ5VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEJ5VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSA1Mjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA1MzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb0FycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA1MzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdldEFsbEtleXMgPSByZXF1aXJlKCcuL19nZXRBbGxLZXlzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsT2JqZWN0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZXF1YWxPYmplY3RzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==