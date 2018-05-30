webpackJsonp([5],{

/***/ 355:
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

var _backend = __webpack_require__(204);

var _Container = __webpack_require__(201);

var _Container2 = _interopRequireDefault(_Container);

var _DashLink = __webpack_require__(357);

var _DashLink2 = _interopRequireDefault(_DashLink);

var _utils = __webpack_require__(16);

var _firebase = __webpack_require__(48);

var firebase = _interopRequireWildcard(_firebase);

var _events = __webpack_require__(17);

var _events2 = _interopRequireDefault(_events);

var _icons = __webpack_require__(203);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import CollectionList from '../Collection/CollectionList';
// import InputDocument from '../InputDocument/InputDocument';

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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _events2.default.off('AUTH_STATE_CHANGED', this.updateAuthStatus);
      _events2.default.off('AUTH_STATE_CHANGED', this.getCollectionsFromBackend);
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
      if (this.state.user) {
        // const { addDocumentOpen, collections } = this.state;
        var _props = this.props,
            config = _props.config,
            window = _props.window;

        return _react2.default.createElement(
          _Container2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'dashboard' },
            _react2.default.createElement(_DashLink2.default, {
              title: 'Documentos',
              href: '/dashboard/documents',
              description: 'Ver documentos como fotos o PDF\'s.',
              icon: _react2.default.createElement(_icons.RoundFolder, null)
            }),
            _react2.default.createElement(_DashLink2.default, {
              title: 'Colecciones',
              href: '/dashboard/collections',
              description: 'Ver y gestionar colecciones.',
              icon: _react2.default.createElement(_icons.RoundCollections, null)
            })
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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(47);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DashLink = function DashLink(_ref) {
  var description = _ref.description,
      title = _ref.title,
      icon = _ref.icon,
      href = _ref.href;
  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: href, className: 'dash-link' },
    icon,
    _react2.default.createElement(
      'h2',
      null,
      title
    ),
    _react2.default.createElement(
      'p',
      null,
      description
    )
  );
};

exports.default = DashLink;


DashLink.propTypes = {
  href: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string.isRequired,
  icon: _propTypes2.default.element.isRequired
};

DashLink.defaultProps = {};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRGFzaGJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Rhc2hib2FyZC9EYXNoTGluay5qcyJdLCJuYW1lcyI6WyJmaXJlYmFzZSIsIkRhc2hib2FyZCIsInN0YXRlIiwidXNlciIsImNvbGxlY3Rpb25zIiwiYWRkRG9jdW1lbnRPcGVuIiwidXBkYXRlQXV0aFN0YXR1cyIsImJpbmQiLCJnZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kIiwib24iLCJvZmYiLCJzZXRTdGF0ZSIsImdldEN1cnJlbnRVc2VyIiwidGhlbiIsImNhdGNoIiwiZXJyIiwicHJvcHMiLCJjb25maWciLCJ3aW5kb3ciLCJzaWduSW5XaXRoR29nbGUiLCJDb21wb25lbnQiLCJEYXNoTGluayIsImRlc2NyaXB0aW9uIiwidGl0bGUiLCJpY29uIiwiaHJlZiIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJlbGVtZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0lBQVlBLFE7O0FBQ1o7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTs7SUFFTUMsUzs7O0FBQ0osdUJBQWM7QUFBQTs7QUFBQTs7QUFFWixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxJQURLO0FBRVhDLG1CQUFhLElBRkY7QUFHWEMsdUJBQWlCO0FBSE4sS0FBYjtBQUtBLFVBQUtDLGdCQUFMLEdBQXdCLE1BQUtBLGdCQUFMLENBQXNCQyxJQUF0QixPQUF4QjtBQUNBLFVBQUtDLHlCQUFMLEdBQWlDLE1BQUtBLHlCQUFMLENBQStCRCxJQUEvQixPQUFqQztBQVJZO0FBU2I7Ozs7d0NBQ21CO0FBQ2xCLFdBQUtELGdCQUFMO0FBQ0EsV0FBS0UseUJBQUw7QUFDQSx1QkFBT0MsRUFBUCxDQUFVLG9CQUFWLEVBQWdDLEtBQUtILGdCQUFyQztBQUNBLHVCQUFPRyxFQUFQLENBQVUsb0JBQVYsRUFBZ0MsS0FBS0QseUJBQXJDO0FBQ0Q7OzsyQ0FDc0I7QUFDckIsdUJBQU9FLEdBQVAsQ0FBVyxvQkFBWCxFQUFpQyxLQUFLSixnQkFBdEM7QUFDQSx1QkFBT0ksR0FBUCxDQUFXLG9CQUFYLEVBQWlDLEtBQUtGLHlCQUF0QztBQUNEOzs7dUNBQ2tCO0FBQ2pCLFdBQUtHLFFBQUwsQ0FBYztBQUNaUixjQUFNSCxTQUFTWSxjQUFUO0FBRE0sT0FBZDtBQUdEOzs7Z0RBQzJCO0FBQUE7O0FBQzFCLHFDQUNHQyxJQURILENBQ1E7QUFBQSxlQUFlLE9BQUtGLFFBQUwsQ0FBYyxFQUFFUCx3QkFBRixFQUFkLENBQWY7QUFBQSxPQURSLEVBRUdVLEtBRkgsQ0FFUztBQUFBLGVBQU8sK0JBQW1CQyxHQUFuQixDQUFQO0FBQUEsT0FGVDtBQUdEOzs7NkJBQ1E7QUFDUCxVQUFJLEtBQUtiLEtBQUwsQ0FBV0MsSUFBZixFQUFxQjtBQUNuQjtBQURtQixxQkFFUSxLQUFLYSxLQUZiO0FBQUEsWUFFWEMsTUFGVyxVQUVYQSxNQUZXO0FBQUEsWUFFSEMsTUFGRyxVQUVIQSxNQUZHOztBQUduQixlQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsV0FBZjtBQUNFO0FBQ0UscUJBQU0sWUFEUjtBQUVFLG9CQUFLLHNCQUZQO0FBR0UsMkJBQVkscUNBSGQ7QUFJRSxvQkFBTTtBQUpSLGNBREY7QUFPRTtBQUNFLHFCQUFNLGFBRFI7QUFFRSxvQkFBSyx3QkFGUDtBQUdFLDJCQUFZLDhCQUhkO0FBSUUsb0JBQU07QUFKUjtBQVBGO0FBREYsU0FERjtBQXlDRDtBQUNELGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQVEsV0FBVSxnQkFBbEIsRUFBbUMsU0FBU2xCLFNBQVNtQixlQUFyRDtBQUFBO0FBQUE7QUFERixPQURGO0FBS0Q7Ozs7RUFsRnFCLGdCQUFNQyxTOztrQkFxRmZuQixTOzs7Ozs7Ozs7Ozs7OztBQ2pHZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNb0IsV0FBVyxTQUFYQSxRQUFXO0FBQUEsTUFBR0MsV0FBSCxRQUFHQSxXQUFIO0FBQUEsTUFBZ0JDLEtBQWhCLFFBQWdCQSxLQUFoQjtBQUFBLE1BQXVCQyxJQUF2QixRQUF1QkEsSUFBdkI7QUFBQSxNQUE2QkMsSUFBN0IsUUFBNkJBLElBQTdCO0FBQUEsU0FDZjtBQUFBO0FBQUEsTUFBTSxJQUFJQSxJQUFWLEVBQWdCLFdBQVUsV0FBMUI7QUFDR0QsUUFESDtBQUVFO0FBQUE7QUFBQTtBQUFLRDtBQUFMLEtBRkY7QUFHRTtBQUFBO0FBQUE7QUFBSUQ7QUFBSjtBQUhGLEdBRGU7QUFBQSxDQUFqQjs7a0JBUWVELFE7OztBQUVmQSxTQUFTSyxTQUFULEdBQXFCO0FBQ25CRCxRQUFNLG9CQUFVRSxNQUFWLENBQWlCQyxVQURKO0FBRW5CTixlQUFhLG9CQUFVSyxNQUFWLENBQWlCQyxVQUZYO0FBR25CTCxTQUFPLG9CQUFVSSxNQUFWLENBQWlCQyxVQUhMO0FBSW5CSixRQUFNLG9CQUFVSyxPQUFWLENBQWtCRDtBQUpMLENBQXJCOztBQU9BUCxTQUFTUyxZQUFULEdBQXdCLEVBQXhCLEMiLCJmaWxlIjoiNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbnMgfSBmcm9tICcuLi8uLi9iYWNrZW5kJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vQ29udGFpbmVyL0NvbnRhaW5lcic7XG5pbXBvcnQgRGFzaExpbmsgZnJvbSAnLi9EYXNoTGluayc7XG5pbXBvcnQgeyBoYW5kbGVCYWNrZW5kRXJyb3IgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tICcuLi8uLi9maXJlYmFzZSc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBSb3VuZENvbGxlY3Rpb25zLCBSb3VuZEZvbGRlciB9IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucyc7XG4vLyBpbXBvcnQgQ29sbGVjdGlvbkxpc3QgZnJvbSAnLi4vQ29sbGVjdGlvbi9Db2xsZWN0aW9uTGlzdCc7XG4vLyBpbXBvcnQgSW5wdXREb2N1bWVudCBmcm9tICcuLi9JbnB1dERvY3VtZW50L0lucHV0RG9jdW1lbnQnO1xuXG5jbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VyOiBudWxsLFxuICAgICAgY29sbGVjdGlvbnM6IG51bGwsXG4gICAgICBhZGREb2N1bWVudE9wZW46IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMgPSB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQgPSB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMoKTtcbiAgICB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQoKTtcbiAgICBldmVudHMub24oJ0FVVEhfU1RBVEVfQ0hBTkdFRCcsIHRoaXMudXBkYXRlQXV0aFN0YXR1cyk7XG4gICAgZXZlbnRzLm9uKCdBVVRIX1NUQVRFX0NIQU5HRUQnLCB0aGlzLmdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGV2ZW50cy5vZmYoJ0FVVEhfU1RBVEVfQ0hBTkdFRCcsIHRoaXMudXBkYXRlQXV0aFN0YXR1cyk7XG4gICAgZXZlbnRzLm9mZignQVVUSF9TVEFURV9DSEFOR0VEJywgdGhpcy5nZXRDb2xsZWN0aW9uc0Zyb21CYWNrZW5kKTtcbiAgfVxuICB1cGRhdGVBdXRoU3RhdHVzKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcjogZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIH0pO1xuICB9XG4gIGdldENvbGxlY3Rpb25zRnJvbUJhY2tlbmQoKSB7XG4gICAgZ2V0Q29sbGVjdGlvbnMoKVxuICAgICAgLnRoZW4oY29sbGVjdGlvbnMgPT4gdGhpcy5zZXRTdGF0ZSh7IGNvbGxlY3Rpb25zIH0pKVxuICAgICAgLmNhdGNoKGVyciA9PiBoYW5kbGVCYWNrZW5kRXJyb3IoZXJyKSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnVzZXIpIHtcbiAgICAgIC8vIGNvbnN0IHsgYWRkRG9jdW1lbnRPcGVuLCBjb2xsZWN0aW9ucyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IHsgY29uZmlnLCB3aW5kb3cgfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFzaGJvYXJkXCI+XG4gICAgICAgICAgICA8RGFzaExpbmtcbiAgICAgICAgICAgICAgdGl0bGU9XCJEb2N1bWVudG9zXCJcbiAgICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvZG9jdW1lbnRzXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJWZXIgZG9jdW1lbnRvcyBjb21vIGZvdG9zIG8gUERGJ3MuXCJcbiAgICAgICAgICAgICAgaWNvbj17PFJvdW5kRm9sZGVyIC8+fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxEYXNoTGlua1xuICAgICAgICAgICAgICB0aXRsZT1cIkNvbGVjY2lvbmVzXCJcbiAgICAgICAgICAgICAgaHJlZj1cIi9kYXNoYm9hcmQvY29sbGVjdGlvbnNcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIlZlciB5IGdlc3Rpb25hciBjb2xlY2Npb25lcy5cIlxuICAgICAgICAgICAgICBpY29uPXs8Um91bmRDb2xsZWN0aW9ucyAvPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7LyogPERhc2hMaW5rXG4gICAgICAgICAgICAgIHRpdGxlPVwiRG9jdW1lbnRvc1wiXG4gICAgICAgICAgICAgIGljb249ezxSb3VuZEZvbGRlciAvPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgeyFhZGREb2N1bWVudE9wZW5cbiAgICAgICAgICAgICAgICA/IDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFkZERvY3VtZW50T3BlbjogdHJ1ZSB9KX0+QWRkIERvY3VtZW50czwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDogPElucHV0RG9jdW1lbnQgZG9uZT17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGFkZERvY3VtZW50T3BlbjogZmFsc2UgfSl9IC8+IC8vIFRPRE8gdXBkYXRlIGxpc3Qgd2hlbiBkb25lXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvRGFzaExpbms+ICovfVxuICAgICAgICAgICAgey8qIDxEYXNoTGlua1xuICAgICAgICAgICAgICB0aXRsZT1cIkNvbGVjY2lvbmVzXCJcbiAgICAgICAgICAgICAgaWNvbj17PFJvdW5kQ29sbGVjdGlvbnMgLz59XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmNvbGxlY3Rpb25zXG4gICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmNvbGxlY3Rpb25zLm1hcChjb2xsZWN0aW9uID0+IChcbiAgICAgICAgICAgICAgICAgIDxDb2xsZWN0aW9uTGlzdFxuICAgICAgICAgICAgICAgICAgICBrZXk9e2Bjb2xsZWN0aW9uLWxpc3QtJHt0cmFuc2xhdGUoY29sbGVjdGlvbi50aXRsZSl9YH1cbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbj17Y29sbGVjdGlvbn1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICA6IDxoND5DYXJnYW5kbyBDb2xlY2Npb25lcy4uLjwvaDQ+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvRGFzaExpbms+ICovfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNpZ24taW4tYnV0dG9uXCIgb25DbGljaz17ZmlyZWJhc2Uuc2lnbkluV2l0aEdvZ2xlfT5TaWduIEluIFdpdGggR29vZ2xlPC9idXR0b24+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0Rhc2hib2FyZC9EYXNoYm9hcmQuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY29uc3QgRGFzaExpbmsgPSAoeyBkZXNjcmlwdGlvbiwgdGl0bGUsIGljb24sIGhyZWYgfSkgPT4gKFxuICA8TGluayB0bz17aHJlZn0gY2xhc3NOYW1lPVwiZGFzaC1saW5rXCI+XG4gICAge2ljb259XG4gICAgPGgyPnt0aXRsZX08L2gyPlxuICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gIDwvTGluaz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hMaW5rO1xuXG5EYXNoTGluay5wcm9wVHlwZXMgPSB7XG4gIGhyZWY6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaWNvbjogUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZFxufTtcblxuRGFzaExpbmsuZGVmYXVsdFByb3BzID0ge307XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRGFzaExpbmsuanMiXSwic291cmNlUm9vdCI6IiJ9