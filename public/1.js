webpackJsonp([1],{

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

var _CollectionList = __webpack_require__(362);

var _CollectionList2 = _interopRequireDefault(_CollectionList);

var _backend = __webpack_require__(202);

var _utils = __webpack_require__(16);

var _events = __webpack_require__(17);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';


var Collections = function (_React$PureComponent) {
  _inherits(Collections, _React$PureComponent);

  function Collections() {
    _classCallCheck(this, Collections);

    var _this = _possibleConstructorReturn(this, (Collections.__proto__ || Object.getPrototypeOf(Collections)).call(this));

    _this.state = {
      collections: null
    };
    _this.getCollectionsFromBackend = _this.getCollectionsFromBackend.bind(_this);
    return _this;
  }

  _createClass(Collections, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getCollectionsFromBackend();
      _events2.default.on('AUTH_STATE_CHANGED', this.getCollectionsFromBackend);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _events2.default.off('AUTH_STATE_CHANGED', this.getCollectionsFromBackend);
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
      var collections = this.state.collections;

      return _react2.default.createElement(
        _Container2.default,
        null,
        collections ? collections.map(function (collection, i) {
          console.log(i, collection);
          return _react2.default.createElement(_CollectionList2.default, {
            key: 'collection-list-' + i,
            collection: collection
          });
        }) : _react2.default.createElement(
          'h4',
          null,
          'Cargando Colecciones...'
        )
      );
    }
  }]);

  return Collections;
}(_react2.default.PureComponent);

exports.default = Collections;

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

var _ListGallery = __webpack_require__(363);

var _ListGallery2 = _interopRequireDefault(_ListGallery);

var _Collection2 = __webpack_require__(204);

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
          (0, _utils.translate)(title)
        ),
        _react2.default.createElement(_ListGallery2.default, { photos: documents })
      );
    }
  }]);

  return CollectionList;
}(_Collection3.default);

exports.default = CollectionList;


CollectionList.propTypes = {
  collection: _propTypes2.default.shape({
    title: _propTypes2.default.object,
    documents: _propTypes2.default.arrayOf(_propTypes2.default.object)
  }).isRequired
};

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

var _Carousel = __webpack_require__(206);

var _Carousel2 = _interopRequireDefault(_Carousel);

var _Gallery2 = __webpack_require__(205);

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

      if (this.state.photos) {
        var photos = this.state.photos;

        return _react2.default.createElement(
          'div',
          null,
          photos.map(function (photo, i) {
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
            photos: photos,
            onClose: function onClose() {
              return _this2.setState({ open: false });
            },
            index: this.state.index
          })
        );
      }
      return _react2.default.createElement(
        'h4',
        null,
        'Loading List Gallery...'
      );
    }
  }]);

  return ListGallery;
}(_Gallery3.default);

exports.default = ListGallery;

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvQ29sbGVjdGlvbnMvQ29sbGVjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbi9Db2xsZWN0aW9uTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9HYWxsZXJ5L0xpc3RHYWxsZXJ5LmpzIl0sIm5hbWVzIjpbIkNvbGxlY3Rpb25zIiwic3RhdGUiLCJjb2xsZWN0aW9ucyIsImdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQiLCJiaW5kIiwib24iLCJvZmYiLCJ0aGVuIiwic2V0U3RhdGUiLCJjYXRjaCIsImVyciIsIm1hcCIsImNvbGxlY3Rpb24iLCJpIiwiY29uc29sZSIsImxvZyIsIlB1cmVDb21wb25lbnQiLCJDb2xsZWN0aW9uTGlzdCIsInByb3BzIiwidGl0bGUiLCJkb2N1bWVudHMiLCJwcm9wVHlwZXMiLCJzaGFwZSIsIm9iamVjdCIsImFycmF5T2YiLCJpc1JlcXVpcmVkIiwiTGlzdEdhbGxlcnkiLCJwaG90b3MiLCJwaG90byIsIm9wZW4iLCJpbmRleCIsInNyYyIsImFsdCIsIm1heFdpZHRoIiwibWF4SGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7OztBQUxBOzs7SUFPTUEsVzs7O0FBQ0oseUJBQWM7QUFBQTs7QUFBQTs7QUFFWixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsbUJBQWE7QUFERixLQUFiO0FBR0EsVUFBS0MseUJBQUwsR0FBaUMsTUFBS0EseUJBQUwsQ0FBK0JDLElBQS9CLE9BQWpDO0FBTFk7QUFNYjs7Ozt3Q0FDbUI7QUFDbEIsV0FBS0QseUJBQUw7QUFDQSx1QkFBT0UsRUFBUCxDQUFVLG9CQUFWLEVBQWdDLEtBQUtGLHlCQUFyQztBQUNEOzs7MkNBQ3NCO0FBQ3JCLHVCQUFPRyxHQUFQLENBQVcsb0JB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Y3QnO1xuLy8gaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vLi4vQ29udGFpbmVyL0NvbnRhaW5lcic7XG5pbXBvcnQgQ29sbGVjdGlvbkxpc3QgZnJvbSAnLi4vLi4vQ29sbGVjdGlvbi9Db2xsZWN0aW9uTGlzdCc7XG5pbXBvcnQgeyBnZXRDb2xsZWN0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2JhY2tlbmQnO1xuaW1wb3J0IHsgaGFuZGxlQmFja2VuZEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMnO1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuLi8uLi8uLi9ldmVudHMnO1xuXG5jbGFzcyBDb2xsZWN0aW9ucyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsZWN0aW9uczogbnVsbFxuICAgIH07XG4gICAgdGhpcy5nZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kID0gdGhpcy5nZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5nZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kKCk7XG4gICAgZXZlbnRzLm9uKCdBVVRIX1NUQVRFX0NIQU5HRUQnLCB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGV2ZW50cy5vZmYoJ0FVVEhfU1RBVEVfQ0hBTkdFRCcsIHRoaXMuZ2V0Q29sbGVjdGlvbnNGcm9tQmFja2VuZCk7XG4gIH1cbiAgZ2V0Q29sbGVjdGlvbnNGcm9tQmFja2VuZCgpIHtcbiAgICBnZXRDb2xsZWN0aW9ucygpXG4gICAgICAudGhlbihjb2xsZWN0aW9ucyA9PiB0aGlzLnNldFN0YXRlKHsgY29sbGVjdGlvbnMgfSkpXG4gICAgICAuY2F0Y2goZXJyID0+IGhhbmRsZUJhY2tlbmRFcnJvcihlcnIpKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjb2xsZWN0aW9ucyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAge2NvbGxlY3Rpb25zXG4gICAgICAgICAgPyBjb2xsZWN0aW9ucy5tYXAoKGNvbGxlY3Rpb24sIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGksIGNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPENvbGxlY3Rpb25MaXN0XG4gICAgICAgICAgICAgICAga2V5PXtgY29sbGVjdGlvbi1saXN0LSR7aX1gfVxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb249e2NvbGxlY3Rpb259XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IDxoND5DYXJnYW5kbyBDb2xlY2Npb25lcy4uLjwvaDQ+XG4gICAgICAgIH1cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbnM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvQ29sbGVjdGlvbnMvQ29sbGVjdGlvbnMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBMaXN0R2FsbGVyeSBmcm9tICcuLi9HYWxsZXJ5L0xpc3RHYWxsZXJ5JztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vQ29sbGVjdGlvbic7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbmNsYXNzIENvbGxlY3Rpb25MaXN0IGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRpdGxlLCBkb2N1bWVudHMgfSA9IHRoaXMucHJvcHMuY29sbGVjdGlvbjtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsZWN0aW9uXCI+XG4gICAgICAgIDxoMj57dHJhbnNsYXRlKHRpdGxlKX08L2gyPlxuICAgICAgICA8TGlzdEdhbGxlcnkgcGhvdG9zPXtkb2N1bWVudHN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb25MaXN0O1xuXG5Db2xsZWN0aW9uTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGNvbGxlY3Rpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZG9jdW1lbnRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KVxuICB9KS5pc1JlcXVpcmVkXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbi9Db2xsZWN0aW9uTGlzdC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENhcm91c2VsIGZyb20gJy4vQ2Fyb3VzZWwnO1xuaW1wb3J0IEdhbGxlcnkgZnJvbSAnLi9HYWxsZXJ5JztcblxuY2xhc3MgTGlzdEdhbGxlcnkgZXh0ZW5kcyBHYWxsZXJ5IHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnBob3Rvcykge1xuICAgICAgY29uc3QgeyBwaG90b3MgfSA9IHRoaXMuc3RhdGU7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtwaG90b3MubWFwKChwaG90bywgaSkgPT4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2BnYWxsZXktaW1hZ2UtJHtpfWB9PlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBvcGVuOiB0cnVlLCBpbmRleDogaSB9KX0gPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17cGhvdG8uc3JjfVxuICAgICAgICAgICAgICAgICAgYWx0PXtwaG90by5hbHR9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogMjAwLCBtYXhIZWlnaHQ6IDIwMCB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHt0aGlzLnN0YXRlLm9wZW4gJiZcbiAgICAgICAgICAgIDxDYXJvdXNlbFxuICAgICAgICAgICAgICBwaG90b3M9e3Bob3Rvc31cbiAgICAgICAgICAgICAgb25DbG9zZT17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IG9wZW46IGZhbHNlIH0pfVxuICAgICAgICAgICAgICBpbmRleD17dGhpcy5zdGF0ZS5pbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiA8aDQ+TG9hZGluZyBMaXN0IEdhbGxlcnkuLi48L2g0PjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0R2FsbGVyeTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0dhbGxlcnkvTGlzdEdhbGxlcnkuanMiXSwic291cmNlUm9vdCI6IiJ9