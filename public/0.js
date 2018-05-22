webpackJsonp([0],{

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _backend = __webpack_require__(201);

var _Container = __webpack_require__(202);

var _Container2 = _interopRequireDefault(_Container);

var _CollectionList = __webpack_require__(358);

var _CollectionList2 = _interopRequireDefault(_CollectionList);

var _InputDocument = __webpack_require__(360);

var _InputDocument2 = _interopRequireDefault(_InputDocument);

var _Section = __webpack_require__(375);

var _Section2 = _interopRequireDefault(_Section);

var _utils = __webpack_require__(16);

var _firebase = __webpack_require__(48);

var firebase = _interopRequireWildcard(_firebase);

var _events = __webpack_require__(17);

var _events2 = _interopRequireDefault(_events);

var _icons = __webpack_require__(265);

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
            'div',
            { className: 'dashboard' },
            _react2.default.createElement(
              _Section2.default,
              {
                title: 'Documentos',
                icon: _react2.default.createElement(_icons.RoundFolder, null)
              },
              !addDocumentOpen ? _react2.default.createElement(
                'button',
                { className: 'button', onClick: function onClick() {
                    return _this3.setState({ addDocumentOpen: true });
                  } },
                'Add Documents'
              ) : _react2.default.createElement(_InputDocument2.default, { done: function done() {
                  return _this3.setState({ addDocumentOpen: false });
                } }) // TODO update list when done

            ),
            _react2.default.createElement(
              _Section2.default,
              {
                title: 'Colecciones',
                icon: _react2.default.createElement(_icons.RoundCollections, null)
              },
              this.state.collections ? this.state.collections.map(function (collection) {
                return _react2.default.createElement(_CollectionList2.default, {
                  key: 'collection-list-' + (0, _utils.translate)(collection.title),
                  collection: collection
                });
              }) : _react2.default.createElement(
                'h4',
                null,
                'Cargando Colecciones...'
              )
            )
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

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(366),
    arraySome = __webpack_require__(369),
    cacheHas = __webpack_require__(370);

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

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _ListGallery = __webpack_require__(359);

var _ListGallery2 = _interopRequireDefault(_ListGallery);

var _Collection2 = __webpack_require__(203);

var _Collection3 = _interopRequireDefault(_Collection2);

var _utils = __webpack_require__(16);

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
          documents = _props$collection.documents;

      return _react2.default.createElement(
        'div',
        { className: 'collection' },
        _react2.default.createElement(
          'h2',
          null,
          (0, _utils.translate)(title.es)
        ),
        _react2.default.createElement(_ListGallery2.default, { photos: documents })
      );
    }
  }]);

  return CollectionList;
}(_Collection3.default);

exports.default = CollectionList;

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Carousel = __webpack_require__(205);

var _Carousel2 = _interopRequireDefault(_Carousel);

var _Gallery2 = __webpack_require__(204);

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

/***/ 360:
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

var _DocumentInfo = __webpack_require__(361);

var _DocumentInfo2 = _interopRequireDefault(_DocumentInfo);

var _InputFiles = __webpack_require__(362);

var _InputFiles2 = _interopRequireDefault(_InputFiles);

var _backend = __webpack_require__(201);

var _utils = __webpack_require__(16);

var _cloneDeep = __webpack_require__(206);

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

/***/ 361:
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

/***/ 362:
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

var _isEqual = __webpack_require__(363);

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

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(364);

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

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(365),
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

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(207),
    equalArrays = __webpack_require__(357),
    equalByTag = __webpack_require__(371),
    equalObjects = __webpack_require__(374),
    getTag = __webpack_require__(29),
    isArray = __webpack_require__(28),
    isBuffer = __webpack_require__(50),
    isTypedArray = __webpack_require__(209);

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

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(208),
    setCacheAdd = __webpack_require__(367),
    setCacheHas = __webpack_require__(368);

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

/***/ 367:
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

/***/ 368:
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

/***/ 369:
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

/***/ 370:
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

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(27),
    Uint8Array = __webpack_require__(211),
    eq = __webpack_require__(49),
    equalArrays = __webpack_require__(357),
    mapToArray = __webpack_require__(372),
    setToArray = __webpack_require__(373);

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

/***/ 372:
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

/***/ 373:
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

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(210);

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


/***/ }),

/***/ 375:
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

var Section = function Section(_ref) {
  var children = _ref.children,
      title = _ref.title,
      icon = _ref.icon,
      open = _ref.open;
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    open ? _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        'h2',
        null,
        title
      ),
      children
    ) : _react2.default.createElement(
      'div',
      { className: 'section' },
      icon,
      _react2.default.createElement(
        'h2',
        null,
        title
      )
    )
  );
};

exports.default = Section;


Section.propTypes = {
  open: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.element]).isRequired,
  title: _propTypes2.default.string.isRequired,
  icon: _propTypes2.default.element.isRequired
};

Section.defaultProps = {
  open: false
};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRGFzaGJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsQXJyYXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vQ29sbGVjdGlvbkxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvR2FsbGVyeS9MaXN0R2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXREb2N1bWVudC9Eb2N1bWVudEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXRGaWxlcy9JbnB1dEZpbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbERlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU2V0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVBZGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlTb21lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsQnlUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsT2JqZWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvU2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJmaXJlYmFzZSIsIkRhc2hib2FyZCIsInN0YXRlIiwidXNlciIsImNvbGxlY3Rpb25zIiwiYWRkRG9jdW1lbnRPcGVuIiwidXBkYXRlQXV0aFN0YXR1cyIsImJpbmQiLCJnZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kIiwib24iLCJzZXRTdGF0ZSIsImdldEN1cnJlbnRVc2VyIiwidGhlbiIsImNhdGNoIiwiZXJyIiwibWFwIiwiY29sbGVjdGlvbiIsInRpdGxlIiwic2lnbkluV2l0aEdvZ2xlIiwiQ29tcG9uZW50IiwiQ29sbGVjdGlvbkxpc3QiLCJwcm9wcyIsImRvY3VtZW50cyIsImVzIiwiTGlzdEdhbGxlcnkiLCJwaG90b3MiLCJwaG90byIsImkiLCJvcGVuIiwiaW5kZXgiLCJzcmMiLCJhbHQiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsIklucHV0RG9jdW1lbnQiLCJmaWxlcyIsInByZXZpZXdzIiwiaGFuZGxlRmlsZXNJbnB1dCIsInVwbG9hZEZpbGVzIiwiaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQiLCJpbmZvIiwiT2JqZWN0IiwiYXNzaWduIiwiZG9uZSIsImxlbmd0aCIsImFsZXJ0IiwiZmlsZXNJbmZvIiwicHJldmlldyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRQcmV2aWV3cyIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJyZXN1bHQiLCJvbmVycm9yIiwicmVhZEFzRGF0YVVSTCIsImZpbGUiLCJwYXRoT3JCbG9iIiwic2xpY2UiLCJzcGxpY2UiLCJyZW1vdmVGaWxlQW5kUHJldmlldyIsIm1hcmdpblJpZ2h0IiwicHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJEb2N1bWVudEluZm8iLCJvblJlbW92ZSIsIm9uQ2hhbmdlIiwiaGFuZGxlSW5wdXQiLCJldnQiLCJ2YWx1ZSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImRhdGUiLCJ3aWR0aCIsImxvbmciLCJoZWlnaHQiLCJtYXRlcmlhbCIsImVsZW1lbnQiLCJudW1iZXIiLCJvYmplY3QiLCJJbnB1dEZpbGVzIiwiZXJyb3JzIiwiaGFuZGxlT25DaGFuZ2UiLCJoYW5kbGVGaWxlc1NlbGVjdGlvbiIsIm5leHRQcm9wcyIsImZpbGVzVG9VcGxvYWQiLCJBcnJheSIsImZyb20iLCJtdWx0aXBsZSIsImZpZWxkTmFtZSIsInByZXZlbnREZWZhdWx0IiwiZGF0YVRyYW5zZmVyIiwiY29sb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiUHVyZUNvbXBvbmVudCIsImJvb2wiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiLCJTZWN0aW9uIiwiY2hpbGRyZW4iLCJpY29uIiwib25lT2ZUeXBlIiwiYXJyYXlPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0lBQVlBLFE7O0FBQ1o7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFUQTs7O0lBV01DLFM7OztBQUNKLHVCQUFjO0FBQUE7O0FBQUE7O0FBRVosVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLFlBQU0sSUFESztBQUVYQyxtQkFBYSxJQUZGO0FBR1hDLHVCQUFpQjtBQUhOLEtBQWI7QUFLQSxVQUFLQyxnQkFBTCxHQUF3QixNQUFLQSxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBeEI7QUFDQSxVQUFLQyx5QkFBTCxHQUFpQyxNQUFLQSx5QkFBTCxDQUErQkQsSUFBL0IsT0FBakM7QUFSWTtBQVNiOzs7O3dDQUNtQjtBQUNsQixXQUFLRCxnQkFBTDtBQUNBLFdBQUtFLHlCQUFMO0FB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Q0E7Ozs7OztBQUVBLElBQU1rQixVQUFVLFNBQVZBLE9BQVU7QUFBQSxNQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSxNQUFhNUYsS0FBYixRQUFhQSxLQUFiO0FBQUEsTUFBb0I2RixJQUFwQixRQUFvQkEsSUFBcEI7QUFBQSxNQUEwQmxGLElBQTFCLFFBQTBCQSxJQUExQjtBQUFBLFNBQ2Q7QUFBQSxvQkFBTyxRQUFQO0FBQUE7QUFDR0EsV0FFRztBQUFBLHNCQUFPLFFBQVA7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFLWDtBQUFMLE9BREY7QUFFRzRGO0FBRkgsS0FGSCxHQVFHO0FBQUE7QUFBQSxRQUFLLFdBQVUsU0FBZjtBQUNHQyxVQURIO0FBRUU7QUFBQTtBQUFBO0FBQUs3RjtBQUFMO0FBRkY7QUFUTixHQURjO0FBQUEsQ0FBaEI7O2tCQW1CZTJGLE87OztBQUVmQSxRQUFRdEMsU0FBUixHQUFvQjtBQUNsQjFDLFFBQU0sb0JBQVU2RSxJQURFO0FBRWxCSSxZQUFVLG9CQUFVRSxTQUFWLENBQW9CLENBQzVCLG9CQUFVQyxPQUFWLENBQWtCLG9CQUFVMUIsT0FBNUIsQ0FENEIsRUFFNUIsb0JBQVVBLE9BRmtCLENBQXBCLEVBR1BkLFVBTGU7QUFNbEJ2RCxTQUFPLG9CQUFVeUYsTUFBVixDQUFpQmxDLFVBTk47QUFPbEJzQyxRQUFNLG9CQUFVeEIsT0FBVixDQUFrQmQ7QUFQTixDQUFwQjs7QUFVQW9DLFFBQVFELFlBQVIsR0FBdUI7QUFDckIvRSxRQUFNO0FBRGUsQ0FBdkIsQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBnZXRDb2xsZWN0aW9ucyB9IGZyb20gJy4uLy4uL2JhY2tlbmQnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuLi9Db250YWluZXIvQ29udGFpbmVyJztcbmltcG9ydCBDb2xsZWN0aW9uTGlzdCBmcm9tICcuLi9Db2xsZWN0aW9uL0NvbGxlY3Rpb25MaXN0JztcbmltcG9ydCBJbnB1dERvY3VtZW50IGZyb20gJy4uL0lucHV0RG9jdW1lbnQvSW5wdXREb2N1bWVudCc7XG5pbXBvcnQgU2VjdGlvbiBmcm9tICcuL1NlY3Rpb24nO1xuaW1wb3J0IHsgaGFuZGxlQmFja2VuZEVycm9yLCB0cmFuc2xhdGUgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tICcuLi8uLi9maXJlYmFzZSc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBSb3VuZENvbGxlY3Rpb25zLCBSb3VuZEZvbGRlciB9IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucyc7XG5cbmNsYXNzIERhc2hib2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHVzZXI6IG51bGwsXG4gICAgICBjb2xsZWN0aW9uczogbnVsbCxcbiAgICAgIGFkZERvY3VtZW50T3BlbjogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMudXBkYXRlQXV0aFN0YXR1cyA9IHRoaXMudXBkYXRlQXV0aFN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZ2V0Q29sbGVjdGlvbnNGcm9tQmFja2VuZCA9IHRoaXMuZ2V0Q29sbGVjdGlvbnNGcm9tQmFja2VuZC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMudXBkYXRlQXV0aFN0YXR1cygpO1xuICAgIHRoaXMuZ2V0Q29sbGVjdGlvbnNGcm9tQmFja2VuZCgpO1xuICAgIGV2ZW50cy5vbignQVVUSF9TVEFURV9DSEFOR0VEJywgdGhpcy51cGRhdGVBdXRoU3RhdHVzKTtcbiAgICBldmVudHMub24oJ0FVVEhfU1RBVEVfQ0hBTkdFRCcsIHRoaXMuZ2V0Q29sbGVjdGlvbnNGcm9tQmFja2VuZCk7XG4gIH1cbiAgdXBkYXRlQXV0aFN0YXR1cygpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVzZXI6IGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICB9KTtcbiAgfVxuICBnZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kKCkge1xuICAgIGdldENvbGxlY3Rpb25zKClcbiAgICAgIC50aGVuKGNvbGxlY3Rpb25zID0+IHRoaXMuc2V0U3RhdGUoeyBjb2xsZWN0aW9ucyB9KSlcbiAgICAgIC5jYXRjaChlcnIgPT4gaGFuZGxlQmFja2VuZEVycm9yKGVycikpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS51c2VyKSB7XG4gICAgICBjb25zdCB7IGFkZERvY3VtZW50T3BlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmRcIj5cbiAgICAgICAgICAgIDxTZWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPVwiRG9jdW1lbnRvc1wiXG4gICAgICAgICAgICAgIGljb249ezxSb3VuZEZvbGRlciAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgeyFhZGREb2N1bWVudE9wZW5cbiAgICAgICAgICAgICAgICA/IDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFkZERvY3VtZW50T3BlbjogdHJ1ZSB9KX0+QWRkIERvY3VtZW50czwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDogPElucHV0RG9jdW1lbnQgZG9uZT17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFkZERvY3VtZW50T3BlbjogZmFsc2UgfSl9IC8+IC8vIFRPRE8gdXBkYXRlIGxpc3Qgd2hlbiBkb25lXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvU2VjdGlvbj5cbiAgICAgICAgICAgIDxTZWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPVwiQ29sZWNjaW9uZXNcIlxuICAgICAgICAgICAgICBpY29uPXs8Um91bmRDb2xsZWN0aW9ucyAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUuY29sbGVjdGlvbnNcbiAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuY29sbGVjdGlvbnMubWFwKGNvbGxlY3Rpb24gPT4gKFxuICAgICAgICAgICAgICAgICAgPENvbGxlY3Rpb25MaXN0XG4gICAgICAgICAgICAgICAgICAgIGtleT17YGNvbGxlY3Rpb24tbGlzdC0ke3RyYW5zbGF0ZShjb2xsZWN0aW9uLnRpdGxlKX1gfVxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uPXtjb2xsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgIDogPGg0PkNhcmdhbmRvIENvbGVjY2lvbmVzLi4uPC9oND5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9TZWN0aW9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNpZ24taW4tYnV0dG9uXCIgb25DbGljaz17ZmlyZWJhc2Uuc2lnbkluV2l0aEdvZ2xlfT5TaWduIEluIFdpdGggR29vZ2xlPC9idXR0b24+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0Rhc2hib2FyZC9EYXNoYm9hcmQuanMiLCJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL19TZXRDYWNoZScpLFxuICAgIGFycmF5U29tZSA9IHJlcXVpcmUoJy4vX2FycmF5U29tZScpLFxuICAgIGNhY2hlSGFzID0gcmVxdWlyZSgnLi9fY2FjaGVIYXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVIYXMoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLnB1c2gob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEFycmF5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZXF1YWxBcnJheXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExpc3RHYWxsZXJ5IGZyb20gJy4uL0dhbGxlcnkvTGlzdEdhbGxlcnknO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9Db2xsZWN0aW9uJztcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuY2xhc3MgQ29sbGVjdGlvbkxpc3QgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdGl0bGUsIGRvY3VtZW50cyB9ID0gdGhpcy5wcm9wcy5jb2xsZWN0aW9uO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxlY3Rpb25cIj5cbiAgICAgICAgPGgyPnt0cmFuc2xhdGUodGl0bGUuZXMpfTwvaDI+XG4gICAgICAgIDxMaXN0R2FsbGVyeSBwaG90b3M9e2RvY3VtZW50c30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbkxpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uL0NvbGxlY3Rpb25MaXN0LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9DYXJvdXNlbCc7XG5pbXBvcnQgR2FsbGVyeSBmcm9tICcuL0dhbGxlcnknO1xuXG5jbGFzcyBMaXN0R2FsbGVyeSBleHRlbmRzIEdhbGxlcnkge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUucGhvdG9zKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5waG90b3MubWFwKChwaG90bywgaSkgPT4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2BnYWxsZXktaW1hZ2UtJHtpfWB9PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBvcGVuOiB0cnVlLCBpbmRleDogaSB9KX0gPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17cGhvdG8uc3JjfVxuICAgICAgICAgICAgICAgICAgYWx0PXtwaG90by5hbHR9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogMjAwLCBtYXhIZWlnaHQ6IDIwMCB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHt0aGlzLnN0YXRlLm9wZW4gJiZcbiAgICAgICAgICAgIDxDYXJvdXNlbFxuICAgICAgICAgICAgICBwaG90b3M9e3RoaXMuc3RhdGUucGhvdG9zfVxuICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgb3BlbjogZmFsc2UgfSl9XG4gICAgICAgICAgICAgIGluZGV4PXt0aGlzLnN0YXRlLmluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICByZXR1cm4gPGg0PkxvYWRpbmcuLi48L2g0PjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0R2FsbGVyeTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0dhbGxlcnkvTGlzdEdhbGxlcnkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBEb2N1bWVudEluZm8gZnJvbSAnLi9Eb2N1bWVudEluZm8nO1xuaW1wb3J0IElucHV0RmlsZXMgZnJvbSAnLi4vSW5wdXRGaWxlcy9JbnB1dEZpbGVzJztcbmltcG9ydCB7IHBvc3REb2N1bWVudHMgfSBmcm9tICcuLi8uLi9iYWNrZW5kJztcbmltcG9ydCB7IGhhbmRsZUJhY2tlbmRFcnJvciB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoL2Nsb25lRGVlcCc7XG5cbmNsYXNzIElucHV0RG9jdW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmaWxlczogbnVsbCxcbiAgICAgIHByZXZpZXdzOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzSW5wdXQgPSB0aGlzLmhhbmRsZUZpbGVzSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwbG9hZEZpbGVzID0gdGhpcy51cGxvYWRGaWxlcy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQgPSB0aGlzLmhhbmRsZURvY3VtZW50SW5mb0lucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQoaW5kZXgsIGluZm8pIHtcbiAgICBjb25zdCBwcmV2aWV3cyA9IGNsb25lRGVlcCh0aGlzLnN0YXRlLnByZXZpZXdzKTtcbiAgICBwcmV2aWV3c1tpbmRleF0gPSBPYmplY3QuYXNzaWduKHByZXZpZXdzW2luZGV4XSwgeyBpbmZvIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2aWV3cyB9KTtcbiAgfVxuICB1cGxvYWRGaWxlcygpIHtcbiAgICBjb25zdCB7IGZpbGVzLCBwcmV2aWV3cyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRvbmUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gVE9ETyBpbXByb3ZlIGFsZXJ0XG4gICAgaWYgKCFmaWxlcyB8fCAhZmlsZXMubGVuZ3RoIHx8ICFwcmV2aWV3cylcbiAgICAgIHJldHVybiBhbGVydCgnU2VsZWN0IGEgZmlsZScpO1xuICAgIHBvc3REb2N1bWVudHMoeyBmaWxlcywgZmlsZXNJbmZvOiBwcmV2aWV3cy5tYXAocHJldmlldyA9PiBwcmV2aWV3LmluZm8pIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3N0RG9jdW1lbnRzJywgcmVzKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChoYW5kbGVCYWNrZW5kRXJyb3IpO1xuICB9XG4gIGhhbmRsZUZpbGVzSW5wdXQoZmlsZXMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZmlsZXMgfSwgdGhpcy5nZXRQcmV2aWV3cyk7XG4gIH1cbiAgZ2V0UHJldmlld3MoKSB7XG4gICAgUHJvbWlzZS5hbGwodGhpcy5zdGF0ZS5maWxlcy5tYXAoZmlsZSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGUgPT4gcmVzb2x2ZSh7IHNyYzogZS50YXJnZXQucmVzdWx0LCBhbHQ6ICdQcmV2aWV3JyB9KTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZXJyID0+IHJlamVjdChlcnIpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZS5wYXRoT3JCbG9iKTtcbiAgICB9KSkpXG4gICAgICAudGhlbihwcmV2aWV3cyA9PiB0aGlzLnNldFN0YXRlKHsgcHJldmlld3MgfSkpXG4gICAgICAuY2F0Y2goaGFuZGxlQmFja2VuZEVycm9yKTtcbiAgfVxuICByZW1vdmVGaWxlQW5kUHJldmlldyhpbmRleCkge1xuICAgIGNvbnN0IHByZXZpZXdzID0gdGhpcy5zdGF0ZS5wcmV2aWV3cy5zbGljZSgpO1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5zdGF0ZS5maWxlcy5zbGljZSgpO1xuICAgIC8qIGNvbnN0IHJlbW92ZWRQcmV2aWV3cyA9ICovIHByZXZpZXdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgLyogY29uc3QgcmVtb3ZlZEZpbGVzID0gKi8gZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZpbGVzOiBmaWxlcy5sZW5ndGggPyBmaWxlcyA6IG51bGwsXG4gICAgICBwcmV2aWV3czogcHJldmlld3MubGVuZ3RoID8gcHJldmlld3MgOiBudWxsXG4gICAgfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZmlsZXMsIHByZXZpZXdzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZG9uZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1kb2N1bWVudFwiPlxuICAgICAgICB7IWZpbGVzICYmIChcbiAgICAgICAgICA8SW5wdXRGaWxlc1xuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZXNJbnB1dH1cbiAgICAgICAgICAgIGZpZWxkTmFtZT1cInBob3RvXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7cHJldmlld3MgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdW1lbnQtcHJldmlld3NcIj5cbiAgICAgICAgICAgIHtwcmV2aWV3cy5tYXAoKHByZXZpZXcsIGkpID0+IChcbiAgICAgICAgICAgICAgPERvY3VtZW50SW5mb1xuICAgICAgICAgICAgICAgIGtleT17cHJldmlldy5zcmN9XG4gICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgcHJldmlldz17PGltZyBjbGFzc05hbWU9XCJwcmV2aWV3LWltYWdlXCIgc3JjPXtwcmV2aWV3LnNyY30gYWx0PXtwcmV2aWV3LmFsdH0gLz59XG4gICAgICAgICAgICAgICAgaW5mbz17cHJldmlldy5pbmZvIHx8IHt9fVxuICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoaW5kZXgpID0+IHsgdGhpcy5yZW1vdmVGaWxlQW5kUHJldmlldyhpbmRleCk7IH19XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sYmFyIHJpZ2h0XCI+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnVwbG9hZEZpbGVzfSBjbGFzc05hbWU9XCJidXR0b24gb2tcIiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzFyZW0nIH19PlVwbG9hZDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17ZG9uZX0gY2xhc3NOYW1lPVwiYnV0dG9uIGNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2ID5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0RG9jdW1lbnQ7XG5cbklucHV0RG9jdW1lbnQucHJvcFR5cGVzID0ge1xuICBkb25lOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgRG9jdW1lbnRJbmZvID0gKHsgcHJldmlldywgaW5kZXgsIGluZm8sIG9uUmVtb3ZlLCBvbkNoYW5nZSB9KSA9PiB7XG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUsIG5hbWUgfSA9IGV2dC50YXJnZXQ7XG4gICAgb25DaGFuZ2UoaW5kZXgsIE9iamVjdC5hc3NpZ24oe30sIGluZm8sIHsgW25hbWVdOiB2YWx1ZSB8fCBudWxsIH0pKTtcbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3VtZW50LWluZm9cIj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY2xvc2UtY2FyZC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblJlbW92ZShpbmRleCl9PiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlld1wiPntwcmV2aWV3fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwidGl0bGVcIiB2YWx1ZT17aW5mby50aXRsZSB8fCAnJ30gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlTDrXR1bG9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwiZGVzY3JpcHRpb25cIiB2YWx1ZT17aW5mby5kZXNjcmlwdGlvbiB8fCAnJ30gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXBjacOzblwiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJkYXRlXCIgdmFsdWU9e2luZm8uZGF0ZSB8fCAnJ30gdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIkHDsW9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwid2lkdGhcIiB2YWx1ZT17aW5mby53aWR0aCB8fCAnJ30gdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiQW5jaG9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwibG9uZ1wiIHZhbHVlPXtpbmZvLmxvbmcgfHwgJyd9IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIkxhcmdvXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSAvPlxuICAgICAgICA8aW5wdXQgbmFtZT1cImhlaWdodFwiIHZhbHVlPXtpbmZvLmhlaWdodCB8fCAnJ30gdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiQWx0dXJhXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSAvPlxuICAgICAgICA8c2VsZWN0IG5hbWU9XCJtYXRlcmlhbFwiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gdmFsdWU9e2luZm8ubWF0ZXJpYWx9PlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzaWx2ZXJcIj5QbGF0YTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJnb2xkXCI+T3JvPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb2N1bWVudEluZm87XG5cbkRvY3VtZW50SW5mby5wcm9wVHlwZXMgPSB7XG4gIHByZXZpZXc6IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGluZm86IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSW5wdXREb2N1bWVudC9Eb2N1bWVudEluZm8uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9pc0VxdWFsJztcblxuY2xhc3MgSW5wdXRGaWxlcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZmlsZXM6IG51bGwsXG4gICAgICBlcnJvcnM6IHByb3BzLmVycm9yc1xuICAgIH07XG4gICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVGaWxlc1NlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAoIWlzRXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSlcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBlcnJvcnM6IG5leHRQcm9wcy5lcnJvcnNcbiAgICAgIH0pO1xuICB9XG4gIGhhbmRsZUZpbGVzU2VsZWN0aW9uKGZpbGVzVG9VcGxvYWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZpbGVzOiBBcnJheS5mcm9tKGZpbGVzVG9VcGxvYWQpLFxuICAgICAgZXJyb3JzOiB7fVxuICAgIH0sIHRoaXMuaGFuZGxlSW5wdXQpO1xuICB9XG4gIGhhbmRsZUlucHV0KCkge1xuICAgIGNvbnN0IHsgbXVsdGlwbGUsIG9uQ2hhbmdlLCBmaWVsZE5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBmaWxlcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoIW11bHRpcGxlICYmIGZpbGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGVycm9ycyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuZXJyb3JzKTtcbiAgICAgIGVycm9ycy5tdWx0aXBsZSA9ICdTZWxlY2Npb25lIHVuIMO6bmljbyBhcmNoaXZvLic7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtdWx0aXBsZSlcbiAgICAgIG9uQ2hhbmdlKGZpbGVzLm1hcChmaWxlID0+ICh7IGZpZWxkTmFtZSwgcGF0aE9yQmxvYjogZmlsZSB9KSkpO1xuICAgIGVsc2VcbiAgICAgIG9uQ2hhbmdlKHsgZmllbGROYW1lLCBwYXRoT3JCbG9iOiBmaWxlc1swXSB9KTtcbiAgfVxuICBoYW5kbGVPbkNoYW5nZShldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uKGV2dC50YXJnZXQuZmlsZXMpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG11bHRpcGxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZmlsZXMsIGVycm9ycyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJ1cGxvYWQtdGFyZ2V0XCJcbiAgICAgICAgb25EcmFnT3Zlcj17KGV2dCkgPT4geyBldnQucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgb25Ecm9wPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5oYW5kbGVGaWxlc1NlbGVjdGlvbihldnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ1cGxvYWQtaW5wdXRcIiBpZD1cInVwbG9hZC10YXJnZXQtc3Vycm9nYXRlXCI+XG4gICAgICAgICAgSGF6IGNsaWNrIGFxdcOtIG8gYXJyYXN0cmEgYXJjaGl2b3MgcGFyYSBzdWJpcmxvcy5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAge211bHRpcGxlID9cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGlkPVwidXBsb2FkLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfVxuICAgICAgICAgICAgbXVsdGlwbGVcbiAgICAgICAgICAvPiA6XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBpZD1cInVwbG9hZC1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHtmaWxlcyA/XG4gICAgICAgICAgPGRpdiBpZD1cInVwbG9hZC1wcmV2aWV3XCI+XG4gICAgICAgICAgICB7ZmlsZXMubWFwKChmaWxlLCBpKSA9PiA8cCBrZXk9e2BmaWxlLSR7aX1gfT57ZmlsZS5uYW1lfTwvcD4pfVxuICAgICAgICAgIDwvZGl2PiA6XG4gICAgICAgICAgbnVsbFxuICAgICAgICB9XG4gICAgICAgIHtlcnJvcnMgJiYgPHByZSBzdHlsZT17eyBjb2xvcjogJyNGMDAnIH19PntKU09OLnN0cmluZ2lmeShlcnJvcnMsIG51bGwsIDIpfTwvcHJlPn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXRGaWxlcztcblxuSW5wdXRGaWxlcy5wcm9wVHlwZXMgPSB7XG4gIG11bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGVycm9yczogUHJvcFR5cGVzLm9iamVjdCxcbiAgZmllbGROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn07XG5cbklucHV0RmlsZXMuZGVmYXVsdFByb3BzID0ge1xuICBtdWx0aXBsZTogdHJ1ZSxcbiAgZXJyb3JzOiB7fVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0lucHV0RmlsZXMvSW5wdXRGaWxlcy5qcyIsInZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJy4vX2Jhc2VJc0VxdWFsJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICogZXF1aXZhbGVudC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2Qgc3VwcG9ydHMgY29tcGFyaW5nIGFycmF5cywgYXJyYXkgYnVmZmVycywgYm9vbGVhbnMsXG4gKiBkYXRlIG9iamVjdHMsIGVycm9yIG9iamVjdHMsIG1hcHMsIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsXG4gKiBzZXRzLCBzdHJpbmdzLCBzeW1ib2xzLCBhbmQgdHlwZWQgYXJyYXlzLiBgT2JqZWN0YCBvYmplY3RzIGFyZSBjb21wYXJlZFxuICogYnkgdGhlaXIgb3duLCBub3QgaW5oZXJpdGVkLCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIEZ1bmN0aW9ucyBhbmQgRE9NXG4gKiBub2RlcyBhcmUgY29tcGFyZWQgYnkgc3RyaWN0IGVxdWFsaXR5LCBpLmUuIGA9PT1gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmlzRXF1YWwob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogb2JqZWN0ID09PSBvdGhlcjtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXF1YWwodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNFcXVhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBiYXNlSXNFcXVhbERlZXAgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbERlZXAnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtib29sZWFufSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLlxuICogIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3RMaWtlKHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgYmFzZUlzRXF1YWwsIHN0YWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzRXF1YWwuanNcbi8vIG1vZHVsZSBpZCA9IDM2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU3RhY2sgPSByZXF1aXJlKCcuL19TdGFjaycpLFxuICAgIGVxdWFsQXJyYXlzID0gcmVxdWlyZSgnLi9fZXF1YWxBcnJheXMnKSxcbiAgICBlcXVhbEJ5VGFnID0gcmVxdWlyZSgnLi9fZXF1YWxCeVRhZycpLFxuICAgIGVxdWFsT2JqZWN0cyA9IHJlcXVpcmUoJy4vX2VxdWFsT2JqZWN0cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBvYmpJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG9iamVjdCksXG4gICAgICBvdGhUYWcgPSBvdGhJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG90aGVyKTtcblxuICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbERlZXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0VxdWFsRGVlcC5qc1xuLy8gbW9kdWxlIGlkID0gMzY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyksXG4gICAgc2V0Q2FjaGVBZGQgPSByZXF1aXJlKCcuL19zZXRDYWNoZUFkZCcpLFxuICAgIHNldENhY2hlSGFzID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVIYXMnKTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPT0gbnVsbCA/IDAgOiB2YWx1ZXMubGVuZ3RoO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldENhY2hlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXRDYWNoZS5qc1xuLy8gbW9kdWxlIGlkID0gMzY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlQWRkO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUFkZC5qc1xuLy8gbW9kdWxlIGlkID0gMzY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUhhcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVIYXMuanNcbi8vIG1vZHVsZSBpZCA9IDM2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5U29tZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlTb21lLmpzXG4vLyBtb2R1bGUgaWQgPSAzNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBgY2FjaGVgIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVIYXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIFVpbnQ4QXJyYXkgPSByZXF1aXJlKCcuL19VaW50OEFycmF5JyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL19lcXVhbEFycmF5cycpLFxuICAgIG1hcFRvQXJyYXkgPSByZXF1aXJlKCcuL19tYXBUb0FycmF5JyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gQ09NUEFSRV9VTk9SREVSRURfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEJ5VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEJ5VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAzNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb0FycmF5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAzNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdldEFsbEtleXMgPSByZXF1aXJlKCcuL19nZXRBbGxLZXlzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsT2JqZWN0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZXF1YWxPYmplY3RzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFNlY3Rpb24gPSAoeyBjaGlsZHJlbiwgdGl0bGUsIGljb24sIG9wZW4gfSkgPT4gKFxuICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAge29wZW5cbiAgICAgID8gKFxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgIClcbiAgICAgIDogKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cbiAgICAgICAgICB7aWNvbn1cbiAgICAgICAgICA8aDI+e3RpdGxlfTwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgPC9SZWFjdC5GcmFnbWVudCA+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uO1xuXG5TZWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuZWxlbWVudCksXG4gICAgUHJvcFR5cGVzLmVsZW1lbnRcbiAgXSkuaXNSZXF1aXJlZCxcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaWNvbjogUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZFxufTtcblxuU2VjdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIG9wZW46IGZhbHNlXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRGFzaGJvYXJkL1NlY3Rpb24uanMiXSwic291cmNlUm9vdCI6IiJ9