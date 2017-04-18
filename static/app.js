'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var content = document.getElementById('root');

var issues = [{
    id: 1, status: 'Open', owner: 'Ravan',
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

        _this.state = { issues: issues };
        window.setTimeout(_this.createTestIssue.bind(_this), 2000);
        return _this;
    }

    _createClass(IssueList, [{
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var newIssues = this.state.issues.splice();
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
                create: new Date(),
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
                React.createElement(IssueAdd, null)
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

var IssueTable = function (_React$Component3) {
    _inherits(IssueTable, _React$Component3);

    function IssueTable() {
        _classCallCheck(this, IssueTable);

        return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
    }

    _createClass(IssueTable, [{
        key: 'render',
        value: function render() {
            var borderedStyle = { border: "1px solid silver", padding: 5 };
            var issueList = this.props.issues.map(function (i) {
                return React.createElement(IssueRow, { key: i.id, issue: i });
            });
            return React.createElement(
                'table',
                { style: { borderCollapse: "collapse" } },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'ID'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Title'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Owner'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Created'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Status'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Completion Date'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
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
        }
    }]);

    return IssueTable;
}(React.Component);

var IssueAdd = function (_React$Component4) {
    _inherits(IssueAdd, _React$Component4);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        return _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).apply(this, arguments));
    }

    _createClass(IssueAdd, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a form to add issue'
            );
        }
    }]);

    return IssueAdd;
}(React.Component);

var IssueRow = function (_React$Component5) {
    _inherits(IssueRow, _React$Component5);

    function IssueRow() {
        _classCallCheck(this, IssueRow);

        return _possibleConstructorReturn(this, (IssueRow.__proto__ || Object.getPrototypeOf(IssueRow)).apply(this, arguments));
    }

    _createClass(IssueRow, [{
        key: 'render',
        value: function render() {
            var borderedStyle = { border: "1px solid silver", padding: 4 };
            var issue = this.props.issue;
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { style: borderedStyle },
                    issue.id
                ),
                React.createElement(
                    'td',
                    { style: borderedStyle },
                    issue.title
                ),
                React.createElement(
                    'td',
                    { style: borderedStyle },
                    issue.owner
                ),
                React.createElement(
                    'td',
                    { style: borderedStyle },
                    issue.created.toDateString()
                ),
                React.createElement(
                    'td',
                    { style: borderedStyle },
                    issue.status
                ),
                React.createElement(
                    'td',
                    { style: borderedStyle },
                    issue.completionDate ? issue.completionDate.toDateString() : ''
                ),
                React.createElement(
                    'td',
                    { style: borderedStyle },
                    issue.effort
                )
            );
        }
    }]);

    return IssueRow;
}(React.Component);

IssueRow.defaultProps = {
    issue: {
        title: '-- No title --'
    }
};

ReactDOM.render(React.createElement(IssueList, null), content);