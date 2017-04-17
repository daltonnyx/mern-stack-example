let content = document.getElementById('root');

const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
        title: 'Error in console when click Add'
    },
    {
        id: 2, status: 'Assigned', owner: 'Nyx',
        created: new Date('2017-04-10'), effort: 3, completionDate: undefined,
        title: 'Issue with node JS'
    },
    {
        id: 3, status: 'Closed', owner: 'Eddie',
        created: new Date('2016-08-15'), effort: 10, completionDate: new Date('2016-08-25'),
        title: 'Missing bottom border on panel'
    },
];

class IssueList extends React.Component {
    render() {
        return (
            <div>
                <h1> Issue Tracker </h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={issues} />
                <hr />
                <IssueAdd />
            </div>
        );
    }
}

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is issue filter section</div>
        );
    }
}

class IssueTable extends React.Component {
    render() {
        const borderedStyle = {border: "1px solid silver", padding: 5};
        return (
            <table style={{borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th style={borderedStyle}>ID</th>
                        <th style={borderedStyle}>Title</th> 
                        <th style={borderedStyle}>Owner</th> 
                        <th style={borderedStyle}>Created</th> 
                        <th style={borderedStyle}>Status</th> 
                        <th style={borderedStyle}>Completion Date</th> 
                        <th style={borderedStyle}>Effort</th> 
                    </tr>
                </thead>
                <tbody>
                {this.props.issues.map( issue => <IssueRow key={`issue-${issue.id}`} issue={issue} /> )}
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>This is a form to add issue</div>
        );
    }
}

class IssueRow extends React.Component {
    render() {
        const borderedStyle = {border: "1px solid silver", padding: 4};
        let issue = this.props.issue;
        return (
            <tr>
                <td style={borderedStyle}>{issue.id}</td>
                <td style={borderedStyle}>{issue.title}</td>
                <td style={borderedStyle}>{issue.owner}</td>
                <td style={borderedStyle}>{issue.created.toDateString()}</td>
                <td style={borderedStyle}>{issue.status}</td>
                <td style={borderedStyle}>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
                <td style={borderedStyle}>{issue.effort}</td>
            </tr>
        );
    }
}

ReactDOM.render(<IssueList />, content);
