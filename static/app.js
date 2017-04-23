'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var content = document.getElementById('root');

var issues = [{
    id: 1, status: 'Closed', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined
}, {
    id: 2, status: 'Assigned', owner: 'Nyx',
    created: new Date('2017-04-10'), effort: 3, completionDate: undefined,
    title: 'Issue with node JS'
}, {
    id: 3, status: 'Closed', owner: 'Eddie',
    created: new Date('2016-08-15'), effort: 10, completionDate: new Date('2016-08-25'),
    title: 'Missing bottom border on panel'
}];

var IssueList = function (_React$Component) {
    _inherits(IssueList, _React$Component);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this.state = { issues: [] };
        _this.createIssue = _this.createIssue.bind(_this);
        return _this;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            window.setTimeout(function () {
                _this2.setState({ issues: issues });
            }, 300);
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var newIssues = this.state.issues.slice();
            newIssue.id = this.state.issues.length + 1;
            newIssues.push(newIssue);
            this.setState({ issues: newIssues });
        }
    }, {
        key: 'createTestIssue',
        value: function createTestIssue() {
            this.createIssue({
                title: 'New issue with is auto created',
                owner: 'Nyx',
                created: new Date(),
                status: 'New'
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    ' Issue Tracker '
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: this.state.issues }),
                React.createElement('hr', null),
                React.createElement(IssueAdd, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(React.Component);

var IssueFilter = function (_React$Component2) {
    _inherits(IssueFilter, _React$Component2);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is issue filter section'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

var IssueAdd = function (_React$Component3) {
    _inherits(IssueAdd, _React$Component3);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        var _this4 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this4.handlerSumbit = _this4.handlerSumbit.bind(_this4);
        return _this4;
    }

    _createClass(IssueAdd, [{
        key: 'handlerSumbit',
        value: function handlerSumbit(e) {
            e.preventDefault();
            var form = e.target;
            this.props.createIssue({
                owner: form.owner.value,
                title: form.title.value,
                status: 'New',
                created: new Date()
            });
            form.reset();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { name: 'issueForm', onSubmit: this.handlerSumbit },
                    React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                    React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                    React.createElement('input', { type: 'submit', name: 'submit', value: 'Add' })
                )
            );
        }
    }]);

    return IssueAdd;
}(React.Component);

var IssueRow = function IssueRow(props) {
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            props.issue.id
        ),
        React.createElement(
            'td',
            null,
            props.issue.title
        ),
        React.createElement(
            'td',
            null,
            props.issue.owner
        ),
        React.createElement(
            'td',
            null,
            props.issue.created.toDateString()
        ),
        React.createElement(
            'td',
            null,
            props.issue.status
        ),
        React.createElement(
            'td',
            null,
            props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
        ),
        React.createElement(
            'td',
            null,
            props.issue.effort
        )
    );
};

var IssueTable = function IssueTable(props) {
    var issueList = props.issues.map(function (i) {
        return React.createElement(IssueRow, { key: i.id, issue: i });
    });
    return React.createElement(
        'table',
        null,
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'ID'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'Created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issueList
        )
    );
};

ReactDOM.render(React.createElement(IssueList, null), content);