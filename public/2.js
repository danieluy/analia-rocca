webpackJsonp([2],{

/***/ 355:
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

var _DashLink = __webpack_require__(360);

var _DashLink2 = _interopRequireDefault(_DashLink);

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
// import PropTypes from 'prop-types';


var Dashboard = function (_React$PureComponent) {
  _inherits(Dashboard, _React$PureComponent);

  function Dashboard() {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this));

    _this.state = {
      user: null
    };
    _this.updateAuthStatus = _this.updateAuthStatus.bind(_this);
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateAuthStatus();
      _events2.default.on('AUTH_STATE_CHANGED', this.updateAuthStatus);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _events2.default.off('AUTH_STATE_CHANGED', this.updateAuthStatus);
    }
  }, {
    key: 'updateAuthStatus',
    value: function updateAuthStatus() {
      this.setState({
        user: firebase.getCurrentUser()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.user) return _react2.default.createElement(
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
}(_react2.default.PureComponent);

exports.default = Dashboard;

/***/ }),

/***/ 360:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQvRGFzaGJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Rhc2hib2FyZC9EYXNoTGluay5qcyJdLCJuYW1lcyI6WyJmaXJlYmFzZSIsIkRhc2hib2FyZCIsInN0YXRlIiwidXNlciIsInVwZGF0ZUF1dGhTdGF0dXMiLCJiaW5kIiwib24iLCJvZmYiLCJzZXRTdGF0ZSIsImdldEN1cnJlbnRVc2VyIiwic2lnbkluV2l0aEdvZ2xlIiwiUHVyZUNvbXBvbmVudCIsIkRhc2hMaW5rIiwiZGVzY3JpcHRpb24iLCJ0aXRsZSIsImljb24iLCJocmVmIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImVsZW1lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLFE7O0FBQ1o7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFMQTs7O0lBT01DLFM7OztBQUNKLHVCQUFjO0FBQUE7O0FBQUE7O0FBRVosVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLFlBQU07QUFESyxLQUFiO0FBR0EsVUFBS0MsZ0JBQUwsR0FBd0IsTUFBS0EsZ0JBQUwsQ0FBc0JDLElBQXRCLE9BQXhCO0FBTFk7QUFNYjs7Ozt3Q0FDbUI7QUFDbEIsV0FBS0QsZ0JBQUw7QUFDQSx1QkFBT0UsRUFBUCxDQUFVLG9CQUFWLEVBQWdDLEtBQUtGLGdCQUFyQztBQUNEOzs7MkNBQ3NCO0FBQ3JCLHVCQUFPRyxHQUFQLENBQVcsb0JBQVgsRUFBaUMsS0FBS0gsZ0JBQXRDO0FBQ0Q7Ozt1Q0FDa0I7QUFDakIsV0FBS0ksUUFBTCxDQUFjO0FBQ1pMLGNBQU1ILFNBQVNTLGNBQVQ7QUFETSxPQUFkO0FBR0Q7Ozs2QkFDUTtBQUNQLFVBQUksS0FBS1AsS0FBTCxDQUFXQyxJQUFmLEVBQ0UsT0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFdBQWY7QUFDRTtBQUNFLG1CQUFNLFlBRFI7QUFFRSxrQkFBSyxzQkFGUDtBQUdFLHlCQUFZLHFDQUhkO0FBSUUsa0JBQU07QUFKUixZQURGO0FBT0U7QUFDRSxtQkFBTSxhQURSO0FBRUUsa0JBQUssd0JBRlA7QUFHRSx5QkFBWSw4QkFIZDtBQUlFLGtCQUFNO0FBSlI7QUFQRjtBQURGLE9BREY7QUFrQkYsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBUSxXQUFVLGdCQUFsQixFQUFtQyxTQUFTSCxTQUFTVSxlQUFyRDtBQUFBO0FBQUE7QUFERixPQURGO0FBS0Q7Ozs7RUE3Q3FCLGdCQUFNQyxhOztrQkFnRGZWLFM7Ozs7Ozs7Ozs7Ozs7O0FDeERmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1XLFdBQVcsU0FBWEEsUUFBVztBQUFBLE1BQUdDLFdBQUgsUUFBR0EsV0FBSDtBQUFBLE1BQWdCQyxLQUFoQixRQUFnQkEsS0FBaEI7QUFBQSxNQUF1QkMsSUFBdkIsUUFBdUJBLElBQXZCO0FBQUEsTUFBNkJDLElBQTdCLFFBQTZCQSxJQUE3QjtBQUFBLFNBQ2Y7QUFBQTtBQUFBLE1BQU0sSUFBSUEsSUFBVixFQUFnQixXQUFVLFdBQTFCO0FBQ0dELFFBREg7QUFFRTtBQUFBO0FBQUE7QUFBS0Q7QUFBTCxLQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUlEO0FBQUo7QUFIRixHQURlO0FBQUEsQ0FBakI7O2tCQVFlRCxROzs7QUFFZkEsU0FBU0ssU0FBVCxHQUFxQjtBQUNuQkQsUUFBTSxvQkFBVUUsTUFBVixDQUFpQkMsVUFESjtBQUVuQk4sZUFBYSxvQkFBVUssTUFBVixDQUFpQkMsVUFGWDtBQUduQkwsU0FBTyxvQkFBVUksTUFBVixDQUFpQkMsVUFITDtBQUluQkosUUFBTSxvQkFBVUssT0FBVixDQUFrQkQ7QUFKTCxDQUFyQjs7QUFPQVAsU0FBU1MsWUFBVCxHQUF3QixFQUF4QixDIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vQ29udGFpbmVyL0NvbnRhaW5lcic7XG5pbXBvcnQgRGFzaExpbmsgZnJvbSAnLi9EYXNoTGluayc7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tICcuLi8uLi9maXJlYmFzZSc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBSb3VuZENvbGxlY3Rpb25zLCBSb3VuZEZvbGRlciB9IGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucyc7XG5cbmNsYXNzIERhc2hib2FyZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VyOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMgPSB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnVwZGF0ZUF1dGhTdGF0dXMoKTtcbiAgICBldmVudHMub24oJ0FVVEhfU1RBVEVfQ0hBTkdFRCcsIHRoaXMudXBkYXRlQXV0aFN0YXR1cyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZXZlbnRzLm9mZignQVVUSF9TVEFURV9DSEFOR0VEJywgdGhpcy51cGRhdGVBdXRoU3RhdHVzKTtcbiAgfVxuICB1cGRhdGVBdXRoU3RhdHVzKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcjogZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIH0pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS51c2VyKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhc2hib2FyZFwiPlxuICAgICAgICAgICAgPERhc2hMaW5rXG4gICAgICAgICAgICAgIHRpdGxlPVwiRG9jdW1lbnRvc1wiXG4gICAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL2RvY3VtZW50c1wiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiVmVyIGRvY3VtZW50b3MgY29tbyBmb3RvcyBvIFBERidzLlwiXG4gICAgICAgICAgICAgIGljb249ezxSb3VuZEZvbGRlciAvPn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RGFzaExpbmtcbiAgICAgICAgICAgICAgdGl0bGU9XCJDb2xlY2Npb25lc1wiXG4gICAgICAgICAgICAgIGhyZWY9XCIvZGFzaGJvYXJkL2NvbGxlY3Rpb25zXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJWZXIgeSBnZXN0aW9uYXIgY29sZWNjaW9uZXMuXCJcbiAgICAgICAgICAgICAgaWNvbj17PFJvdW5kQ29sbGVjdGlvbnMgLz59XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic2lnbi1pbi1idXR0b25cIiBvbkNsaWNrPXtmaXJlYmFzZS5zaWduSW5XaXRoR29nbGV9PlNpZ24gSW4gV2l0aCBHb29nbGU8L2J1dHRvbj5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRGFzaGJvYXJkL0Rhc2hib2FyZC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jb25zdCBEYXNoTGluayA9ICh7IGRlc2NyaXB0aW9uLCB0aXRsZSwgaWNvbiwgaHJlZiB9KSA9PiAoXG4gIDxMaW5rIHRvPXtocmVmfSBjbGFzc05hbWU9XCJkYXNoLWxpbmtcIj5cbiAgICB7aWNvbn1cbiAgICA8aDI+e3RpdGxlfTwvaDI+XG4gICAgPHA+e2Rlc2NyaXB0aW9ufTwvcD5cbiAgPC9MaW5rPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgRGFzaExpbms7XG5cbkRhc2hMaW5rLnByb3BUeXBlcyA9IHtcbiAgaHJlZjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBpY29uOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkXG59O1xuXG5EYXNoTGluay5kZWZhdWx0UHJvcHMgPSB7fTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0Rhc2hib2FyZC9EYXNoTGluay5qcyJdLCJzb3VyY2VSb290IjoiIn0=