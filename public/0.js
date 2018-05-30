webpackJsonp([0],{

/***/ 358:
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

var _InputDocument = __webpack_require__(364);

var _InputDocument2 = _interopRequireDefault(_InputDocument);

var _FloatingActionButton = __webpack_require__(379);

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _icons = __webpack_require__(203);

var _Gallery = __webpack_require__(205);

var _Gallery2 = _interopRequireDefault(_Gallery);

var _backend = __webpack_require__(202);

var _utils = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var Documents = function (_React$Component) {
  _inherits(Documents, _React$Component);

  function Documents() {
    _classCallCheck(this, Documents);

    var _this = _possibleConstructorReturn(this, (Documents.__proto__ || Object.getPrototypeOf(Documents)).call(this));

    _this.state = {
      addDocumentOpen: false,
      documents: null
    };
    _this.getDocumentsFromBackend = _this.getDocumentsFromBackend.bind(_this);
    _this.onDocumentsUploadDone = _this.onDocumentsUploadDone.bind(_this);
    return _this;
  }

  _createClass(Documents, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getDocumentsFromBackend();
    }
  }, {
    key: 'getDocumentsFromBackend',
    value: function getDocumentsFromBackend() {
      var _this2 = this;

      (0, _backend.getDocuments)().then(function (documents) {
        return _this2.setState({ documents: documents });
      }).catch(_utils.handleBackendError);
    }
  }, {
    key: 'onDocumentsUploadDone',
    value: function onDocumentsUploadDone() {
      this.setState({ addDocumentOpen: false }, this.getDocumentsFromBackend);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          addDocumentOpen = _state.addDocumentOpen,
          documents = _state.documents;

      return _react2.default.createElement(
        _Container2.default,
        null,
        !addDocumentOpen ? _react2.default.createElement(
          _FloatingActionButton2.default,
          { action: function action() {
              return _this3.setState({ addDocumentOpen: true });
            } },
          _react2.default.createElement(_icons.RoundAdd, null)
        ) : _react2.default.createElement(_InputDocument2.default, { done: this.onDocumentsUploadDone }),
        documents ? _react2.default.createElement(_Gallery2.default, { photos: documents }) : _react2.default.createElement(
          'h4',
          null,
          'Loading Documents...'
        )
      );
    }
  }]);

  return Documents;
}(_react2.default.Component);

exports.default = Documents;

/***/ }),

/***/ 364:
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

var _DocumentInfo = __webpack_require__(365);

var _DocumentInfo2 = _interopRequireDefault(_DocumentInfo);

var _InputFiles = __webpack_require__(366);

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

/***/ 365:
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

/***/ 366:
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

var _isEqual = __webpack_require__(367);

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

/***/ 379:
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

var FloatingActionButton = function FloatingActionButton(_ref) {
  var children = _ref.children,
      action = _ref.action;
  return _react2.default.createElement(
    'button',
    { onClick: action, className: 'fab' },
    children
  );
};

exports.default = FloatingActionButton;


FloatingActionButton.propTypes = {
  children: _propTypes2.default.element.isRequired,
  action: _propTypes2.default.func.isRequired
};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRG9jdW1lbnRzL0RvY3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXREb2N1bWVudC9Eb2N1bWVudEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXRGaWxlcy9JbnB1dEZpbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9GbG9hdGluZ0FjdGlvbkJ1dHRvbi9GbG9hdGluZ0FjdGlvbkJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudHMiLCJzdGF0ZSIsImFkZERvY3VtZW50T3BlbiIsImRvY3VtZW50cyIsImdldERvY3VtZW50c0Zyb21CYWNrZW5kIiwiYmluZCIsIm9uRG9jdW1lbnRzVXBsb2FkRG9uZSIsInRoZW4iLCJzZXRTdGF0ZSIsImNhdGNoIiwiQ29tcG9uZW50IiwiSW5wdXREb2N1bWVudCIsImZpbGVzIiwicHJldmlld3MiLCJoYW5kbGVGaWxlc0lucHV0IiwidXBsb2FkRmlsZXMiLCJoYW5kbGVEb2N1bWVudEluZm9JbnB1dCIsImluZGV4IiwiaW5mbyIsIk9iamVjdCIsImFzc2lnbiIsImRvbmUiLCJwcm9wcyIsImxlbmd0aCIsImFsZXJ0IiwiZmlsZXNJbmZvIiwibWFwIiwicHJldmlldyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRQcmV2aWV3cyIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsInNyYyIsImUiLCJ0YXJnZXQiLCJyZXN1bHQiLCJhbHQiLCJvbmVycm9yIiwiZXJyIiwicmVhZEFzRGF0YVVSTCIsImZpbGUiLCJwYXRoT3JCbG9iIiwic2xpY2UiLCJzcGxpY2UiLCJpIiwicmVtb3ZlRmlsZUFuZFByZXZpZXciLCJtYXJnaW5SaWdodCIsInByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiRG9jdW1lbnRJbmZvIiwib25SZW1vdmUiLCJvbkNoYW5nZSIsImhhbmRsZUlucHV0IiwiZXZ0IiwidmFsdWUiLCJuYW1lIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImRhdGUiLCJ3aWR0aCIsImxvbmciLCJoZWlnaHQiLCJtYXRlcmlhbCIsImVsZW1lbnQiLCJudW1iZXIiLCJvYmplY3QiLCJJbnB1dEZpbGVzIiwiZXJyb3JzIiwiaGFuZGxlT25DaGFuZ2UiLCJoYW5kbGVGaWxlc1NlbGVjdGlvbiIsIm5leHRQcm9wcyIsImZpbGVzVG9VcGxvYWQiLCJBcnJheSIsImZyb20iLCJtdWx0aXBsZSIsImZpZWxkTmFtZSIsInByZXZlbnREZWZhdWx0IiwiZGF0YVRyYW5zZmVyIiwiY29sb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiUHVyZUNvbXBvbmVudCIsImJvb2wiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiLCJGbG9hdGluZ0FjdGlvbkJ1dHRvbiIsImNoaWxkcmVuIiwiYWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7O0FBUEE7OztJQVNNQSxTOzs7QUFDSix1QkFBYztBQUFBOztBQUFBOztBQUVaLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyx1QkFBaUIsS0FETjtBQUVYQyxpQkFBVztBQUZBLEtBQWI7QUFJQSxVQUFLQyx1QkFBTCxHQUErQixNQUFLQSx1QkFBTCxDQUE2QkMsSUFBN0IsT0FBL0I7QUFDQSxVQUFLQyxxQkFBTCxHQUE2QixNQUFLQSxxQkFBTCxDQUEyQkQsSUFBM0IsT0FBN0I7QUFQWTtBQVFiOzs7O3lDQUNvQjtBQUNuQixXQUFLRCx1QkFBTDtBQUNEOzs7OENBQ3lCO0FBQUE7O0FBQ3hCLG1DQUNHRyxJQURILENBQ1E7QUFBQSxlQUFhLE9B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Q0FBZWIsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QjtBQUFoQztBQTlCYixPQURGO0FBa0NEOzs7O0VBN0VzQixnQkFBTWMsYTs7a0JBZ0ZoQmYsVTs7O0FBRWZBLFdBQVdwQixTQUFYLEdBQXVCO0FBQ3JCNEIsWUFBVSxvQkFBVVEsSUFEQztBQUVyQi9CLFlBQVUsb0JBQVVKLElBQVYsQ0FBZUMsVUFGSjtBQUdyQm1CLFVBQVEsb0JBQVVGLE1BSEc7QUFJckJVLGFBQVcsb0JBQVVRLE1BQVYsQ0FBaUJuQztBQUpQLENBQXZCOztBQU9Ba0IsV0FBV2tCLFlBQVgsR0FBMEI7QUFDeEJWLFlBQVUsSUFEYztBQUV4QlAsVUFBUTtBQUZnQixDQUExQixDOzs7Ozs7Ozs7Ozs7OztBQzdGQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNa0IsdUJBQXVCLFNBQXZCQSxvQkFBdUI7QUFBQSxNQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSxNQUFhQyxNQUFiLFFBQWFBLE1BQWI7QUFBQSxTQUMzQjtBQUFBO0FBQUEsTUFBUSxTQUFTQSxNQUFqQixFQUF5QixXQUFVLEtBQW5DO0FBQTBDRDtBQUExQyxHQUQyQjtBQUFBLENBQTdCOztrQkFJZUQsb0I7OztBQUVmQSxxQkFBcUJ2QyxTQUFyQixHQUFpQztBQUMvQndDLFlBQVUsb0JBQVV2QixPQUFWLENBQWtCZixVQURHO0FBRS9CdUMsVUFBUSxvQkFBVXhDLElBQVYsQ0FBZUM7QUFGUSxDQUFqQyxDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vLi4vQ29udGFpbmVyL0NvbnRhaW5lcic7XG5pbXBvcnQgSW5wdXREb2N1bWVudCBmcm9tICcuLi8uLi9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQnO1xuaW1wb3J0IEZBQiBmcm9tICcuLi8uLi9jb21tb24vRmxvYXRpbmdBY3Rpb25CdXR0b24vRmxvYXRpbmdBY3Rpb25CdXR0b24nO1xuaW1wb3J0IHsgUm91bmRBZGQgfSBmcm9tICcuLi8uLi8uLi9hc3NldHMvaWNvbnMnO1xuaW1wb3J0IEdhbGxlcnkgZnJvbSAnLi4vLi4vR2FsbGVyeS9HYWxsZXJ5JztcbmltcG9ydCB7IGdldERvY3VtZW50cyB9IGZyb20gJy4uLy4uLy4uL2JhY2tlbmQnO1xuaW1wb3J0IHsgaGFuZGxlQmFja2VuZEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMnO1xuXG5jbGFzcyBEb2N1bWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhZGREb2N1bWVudE9wZW46IGZhbHNlLFxuICAgICAgZG9jdW1lbnRzOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmdldERvY3VtZW50c0Zyb21CYWNrZW5kID0gdGhpcy5nZXREb2N1bWVudHNGcm9tQmFja2VuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Eb2N1bWVudHNVcGxvYWREb25lID0gdGhpcy5vbkRvY3VtZW50c1VwbG9hZERvbmUuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5nZXREb2N1bWVudHNGcm9tQmFja2VuZCgpO1xuICB9XG4gIGdldERvY3VtZW50c0Zyb21CYWNrZW5kKCkge1xuICAgIGdldERvY3VtZW50cygpXG4gICAgICAudGhlbihkb2N1bWVudHMgPT4gdGhpcy5zZXRTdGF0ZSh7IGRvY3VtZW50cyB9KSlcbiAgICAgIC5jYXRjaChoYW5kbGVCYWNrZW5kRXJyb3IpO1xuICB9XG4gIG9uRG9jdW1lbnRzVXBsb2FkRG9uZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgYWRkRG9jdW1lbnRPcGVuOiBmYWxzZSB9LCB0aGlzLmdldERvY3VtZW50c0Zyb21CYWNrZW5kKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhZGREb2N1bWVudE9wZW4sIGRvY3VtZW50cyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgeyFhZGREb2N1bWVudE9wZW5cbiAgICAgICAgICA/IChcbiAgICAgICAgICAgIDxGQUIgYWN0aW9uPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgYWRkRG9jdW1lbnRPcGVuOiB0cnVlIH0pfT5cbiAgICAgICAgICAgICAgPFJvdW5kQWRkIC8+XG4gICAgICAgICAgICA8L0ZBQj5cbiAgICAgICAgICApXG4gICAgICAgICAgOiA8SW5wdXREb2N1bWVudCBkb25lPXt0aGlzLm9uRG9jdW1lbnRzVXBsb2FkRG9uZX0gLz5cbiAgICAgICAgfVxuICAgICAgICB7ZG9jdW1lbnRzXG4gICAgICAgICAgPyA8R2FsbGVyeSBwaG90b3M9e2RvY3VtZW50c30gLz5cbiAgICAgICAgICA6IDxoND5Mb2FkaW5nIERvY3VtZW50cy4uLjwvaDQ+XG4gICAgICAgIH1cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jdW1lbnRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRGFzaGJvYXJkL0RvY3VtZW50cy9Eb2N1bWVudHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBEb2N1bWVudEluZm8gZnJvbSAnLi9Eb2N1bWVudEluZm8nO1xuaW1wb3J0IElucHV0RmlsZXMgZnJvbSAnLi4vSW5wdXRGaWxlcy9JbnB1dEZpbGVzJztcbmltcG9ydCB7IHBvc3REb2N1bWVudHMgfSBmcm9tICcuLi8uLi9iYWNrZW5kJztcbmltcG9ydCB7IGhhbmRsZUJhY2tlbmRFcnJvciB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoL2Nsb25lRGVlcCc7XG5cbmNsYXNzIElucHV0RG9jdW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmaWxlczogbnVsbCxcbiAgICAgIHByZXZpZXdzOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzSW5wdXQgPSB0aGlzLmhhbmRsZUZpbGVzSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwbG9hZEZpbGVzID0gdGhpcy51cGxvYWRGaWxlcy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQgPSB0aGlzLmhhbmRsZURvY3VtZW50SW5mb0lucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXQoaW5kZXgsIGluZm8pIHtcbiAgICBjb25zdCBwcmV2aWV3cyA9IGNsb25lRGVlcCh0aGlzLnN0YXRlLnByZXZpZXdzKTtcbiAgICBwcmV2aWV3c1tpbmRleF0gPSBPYmplY3QuYXNzaWduKHByZXZpZXdzW2luZGV4XSwgeyBpbmZvIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2aWV3cyB9KTtcbiAgfVxuICB1cGxvYWRGaWxlcygpIHtcbiAgICBjb25zdCB7IGZpbGVzLCBwcmV2aWV3cyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRvbmUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gVE9ETyBpbXByb3ZlIGFsZXJ0XG4gICAgaWYgKCFmaWxlcyB8fCAhZmlsZXMubGVuZ3RoIHx8ICFwcmV2aWV3cylcbiAgICAgIHJldHVybiBhbGVydCgnU2VsZWN0IGEgZmlsZScpO1xuICAgIHBvc3REb2N1bWVudHMoeyBmaWxlcywgZmlsZXNJbmZvOiBwcmV2aWV3cy5tYXAocHJldmlldyA9PiBwcmV2aWV3LmluZm8pIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3N0RG9jdW1lbnRzJywgcmVzKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChoYW5kbGVCYWNrZW5kRXJyb3IpO1xuICB9XG4gIGhhbmRsZUZpbGVzSW5wdXQoZmlsZXMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZmlsZXMgfSwgdGhpcy5nZXRQcmV2aWV3cyk7XG4gIH1cbiAgZ2V0UHJldmlld3MoKSB7XG4gICAgUHJvbWlzZS5hbGwodGhpcy5zdGF0ZS5maWxlcy5tYXAoZmlsZSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGUgPT4gcmVzb2x2ZSh7IHNyYzogZS50YXJnZXQucmVzdWx0LCBhbHQ6ICdQcmV2aWV3JyB9KTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZXJyID0+IHJlamVjdChlcnIpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZS5wYXRoT3JCbG9iKTtcbiAgICB9KSkpXG4gICAgICAudGhlbihwcmV2aWV3cyA9PiB0aGlzLnNldFN0YXRlKHsgcHJldmlld3MgfSkpXG4gICAgICAuY2F0Y2goaGFuZGxlQmFja2VuZEVycm9yKTtcbiAgfVxuICByZW1vdmVGaWxlQW5kUHJldmlldyhpbmRleCkge1xuICAgIGNvbnN0IHByZXZpZXdzID0gdGhpcy5zdGF0ZS5wcmV2aWV3cy5zbGljZSgpO1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5zdGF0ZS5maWxlcy5zbGljZSgpO1xuICAgIC8qIGNvbnN0IHJlbW92ZWRQcmV2aWV3cyA9ICovIHByZXZpZXdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgLyogY29uc3QgcmVtb3ZlZEZpbGVzID0gKi8gZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZpbGVzOiBmaWxlcy5sZW5ndGggPyBmaWxlcyA6IG51bGwsXG4gICAgICBwcmV2aWV3czogcHJldmlld3MubGVuZ3RoID8gcHJldmlld3MgOiBudWxsXG4gICAgfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZmlsZXMsIHByZXZpZXdzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZG9uZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1kb2N1bWVudFwiPlxuICAgICAgICB7IWZpbGVzICYmIChcbiAgICAgICAgICA8SW5wdXRGaWxlc1xuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZXNJbnB1dH1cbiAgICAgICAgICAgIGZpZWxkTmFtZT1cInBob3RvXCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7cHJldmlld3MgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jdW1lbnQtcHJldmlld3NcIj5cbiAgICAgICAgICAgIHtwcmV2aWV3cy5tYXAoKHByZXZpZXcsIGkpID0+IChcbiAgICAgICAgICAgICAgPERvY3VtZW50SW5mb1xuICAgICAgICAgICAgICAgIGtleT17cHJldmlldy5zcmN9XG4gICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgcHJldmlldz17PGltZyBjbGFzc05hbWU9XCJwcmV2aWV3LWltYWdlXCIgc3JjPXtwcmV2aWV3LnNyY30gYWx0PXtwcmV2aWV3LmFsdH0gLz59XG4gICAgICAgICAgICAgICAgaW5mbz17cHJldmlldy5pbmZvIHx8IHt9fVxuICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoaW5kZXgpID0+IHsgdGhpcy5yZW1vdmVGaWxlQW5kUHJldmlldyhpbmRleCk7IH19XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRG9jdW1lbnRJbmZvSW5wdXR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sYmFyIHJpZ2h0XCI+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnVwbG9hZEZpbGVzfSBjbGFzc05hbWU9XCJidXR0b24gb2tcIiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzFyZW0nIH19PlVwbG9hZDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17ZG9uZX0gY2xhc3NOYW1lPVwiYnV0dG9uIGNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2ID5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0RG9jdW1lbnQ7XG5cbklucHV0RG9jdW1lbnQucHJvcFR5cGVzID0ge1xuICBkb25lOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgRG9jdW1lbnRJbmZvID0gKHsgcHJldmlldywgaW5kZXgsIGluZm8sIG9uUmVtb3ZlLCBvbkNoYW5nZSB9KSA9PiB7XG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUsIG5hbWUgfSA9IGV2dC50YXJnZXQ7XG4gICAgb25DaGFuZ2UoaW5kZXgsIE9iamVjdC5hc3NpZ24oe30sIGluZm8sIHsgW25hbWVdOiB2YWx1ZSB8fCBudWxsIH0pKTtcbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImRvY3VtZW50LWluZm9cIj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY2xvc2UtY2FyZC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblJlbW92ZShpbmRleCl9PiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlld1wiPntwcmV2aWV3fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwidGl0bGVcIiB2YWx1ZT17aW5mby50aXRsZSB8fCAnJ30gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlTDrXR1bG9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwiZGVzY3JpcHRpb25cIiB2YWx1ZT17aW5mby5kZXNjcmlwdGlvbiB8fCAnJ30gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXBjacOzblwiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJkYXRlXCIgdmFsdWU9e2luZm8uZGF0ZSB8fCAnJ30gdHlwZT1cImRhdGVcIiBwbGFjZWhvbGRlcj1cIkHDsW9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwid2lkdGhcIiB2YWx1ZT17aW5mby53aWR0aCB8fCAnJ30gdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiQW5jaG9cIiBvbkNoYW5nZT17aGFuZGxlSW5wdXR9IC8+XG4gICAgICAgIDxpbnB1dCBuYW1lPVwibG9uZ1wiIHZhbHVlPXtpbmZvLmxvbmcgfHwgJyd9IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIkxhcmdvXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSAvPlxuICAgICAgICA8aW5wdXQgbmFtZT1cImhlaWdodFwiIHZhbHVlPXtpbmZvLmhlaWdodCB8fCAnJ30gdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiQWx0dXJhXCIgb25DaGFuZ2U9e2hhbmRsZUlucHV0fSAvPlxuICAgICAgICA8c2VsZWN0IG5hbWU9XCJtYXRlcmlhbFwiIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gdmFsdWU9e2luZm8ubWF0ZXJpYWx9PlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzaWx2ZXJcIj5QbGF0YTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJnb2xkXCI+T3JvPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb2N1bWVudEluZm87XG5cbkRvY3VtZW50SW5mby5wcm9wVHlwZXMgPSB7XG4gIHByZXZpZXc6IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGluZm86IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSW5wdXREb2N1bWVudC9Eb2N1bWVudEluZm8uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9pc0VxdWFsJztcblxuY2xhc3MgSW5wdXRGaWxlcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZmlsZXM6IG51bGwsXG4gICAgICBlcnJvcnM6IHByb3BzLmVycm9yc1xuICAgIH07XG4gICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVGaWxlc1NlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAoIWlzRXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSlcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBlcnJvcnM6IG5leHRQcm9wcy5lcnJvcnNcbiAgICAgIH0pO1xuICB9XG4gIGhhbmRsZUZpbGVzU2VsZWN0aW9uKGZpbGVzVG9VcGxvYWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZpbGVzOiBBcnJheS5mcm9tKGZpbGVzVG9VcGxvYWQpLFxuICAgICAgZXJyb3JzOiB7fVxuICAgIH0sIHRoaXMuaGFuZGxlSW5wdXQpO1xuICB9XG4gIGhhbmRsZUlucHV0KCkge1xuICAgIGNvbnN0IHsgbXVsdGlwbGUsIG9uQ2hhbmdlLCBmaWVsZE5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBmaWxlcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoIW11bHRpcGxlICYmIGZpbGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGVycm9ycyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuZXJyb3JzKTtcbiAgICAgIGVycm9ycy5tdWx0aXBsZSA9ICdTZWxlY2Npb25lIHVuIMO6bmljbyBhcmNoaXZvLic7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtdWx0aXBsZSlcbiAgICAgIG9uQ2hhbmdlKGZpbGVzLm1hcChmaWxlID0+ICh7IGZpZWxkTmFtZSwgcGF0aE9yQmxvYjogZmlsZSB9KSkpO1xuICAgIGVsc2VcbiAgICAgIG9uQ2hhbmdlKHsgZmllbGROYW1lLCBwYXRoT3JCbG9iOiBmaWxlc1swXSB9KTtcbiAgfVxuICBoYW5kbGVPbkNoYW5nZShldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVzU2VsZWN0aW9uKGV2dC50YXJnZXQuZmlsZXMpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG11bHRpcGxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZmlsZXMsIGVycm9ycyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJ1cGxvYWQtdGFyZ2V0XCJcbiAgICAgICAgb25EcmFnT3Zlcj17KGV2dCkgPT4geyBldnQucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgb25Ecm9wPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5oYW5kbGVGaWxlc1NlbGVjdGlvbihldnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ1cGxvYWQtaW5wdXRcIiBpZD1cInVwbG9hZC10YXJnZXQtc3Vycm9nYXRlXCI+XG4gICAgICAgICAgSGF6IGNsaWNrIGFxdcOtIG8gYXJyYXN0cmEgYXJjaGl2b3MgcGFyYSBzdWJpcmxvcy5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAge211bHRpcGxlID9cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGlkPVwidXBsb2FkLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfVxuICAgICAgICAgICAgbXVsdGlwbGVcbiAgICAgICAgICAvPiA6XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBpZD1cInVwbG9hZC1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHtmaWxlcyA/XG4gICAgICAgICAgPGRpdiBpZD1cInVwbG9hZC1wcmV2aWV3XCI+XG4gICAgICAgICAgICB7ZmlsZXMubWFwKChmaWxlLCBpKSA9PiA8cCBrZXk9e2BmaWxlLSR7aX1gfT57ZmlsZS5uYW1lfTwvcD4pfVxuICAgICAgICAgIDwvZGl2PiA6XG4gICAgICAgICAgbnVsbFxuICAgICAgICB9XG4gICAgICAgIHtlcnJvcnMgJiYgPHByZSBzdHlsZT17eyBjb2xvcjogJyNGMDAnIH19PntKU09OLnN0cmluZ2lmeShlcnJvcnMsIG51bGwsIDIpfTwvcHJlPn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXRGaWxlcztcblxuSW5wdXRGaWxlcy5wcm9wVHlwZXMgPSB7XG4gIG11bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGVycm9yczogUHJvcFR5cGVzLm9iamVjdCxcbiAgZmllbGROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn07XG5cbklucHV0RmlsZXMuZGVmYXVsdFByb3BzID0ge1xuICBtdWx0aXBsZTogdHJ1ZSxcbiAgZXJyb3JzOiB7fVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0lucHV0RmlsZXMvSW5wdXRGaWxlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7IGNoaWxkcmVuLCBhY3Rpb24gfSkgPT4gKFxuICA8YnV0dG9uIG9uQ2xpY2s9e2FjdGlvbn0gY2xhc3NOYW1lPVwiZmFiXCI+e2NoaWxkcmVufTwvYnV0dG9uPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdBY3Rpb25CdXR0b247XG5cbkZsb2F0aW5nQWN0aW9uQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXG4gIGFjdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2NvbW1vbi9GbG9hdGluZ0FjdGlvbkJ1dHRvbi9GbG9hdGluZ0FjdGlvbkJ1dHRvbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=