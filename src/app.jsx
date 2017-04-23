let content = document.getElementById('root');

const issues = [
    {
        id: 1, status: 'Closed', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
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
    constructor() {
        super();
        this.state = {issues : []};
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        window.setTimeout(() => { this.setState({issues: issues}) }, 300);
    }

    createIssue(newIssue) {
        let newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({issues: newIssues});
    }

    createTestIssue() {
        this.createIssue({
            title: 'New issue with is auto created',
            owner: 'Nyx',
            created: new Date(),
            status: 'New'
        });
    }
    
    render() {
        
        return (
            <div>
                <h1> Issue Tracker </h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
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


class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handlerSumbit = this.handlerSumbit.bind(this);
    }

    handlerSumbit(e) {
        e.preventDefault();
        let form = e.target;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
        });
        form.reset();
    }

    render() {
        return (
            <div> 
                <form name="issueForm" onSubmit={this.handlerSumbit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <input type="submit" name="submit" value="Add" />
                </form>
            </div>
        );
    }
}


const IssueRow = (props) => (
            <tr>
                <td>{props.issue.id}</td>
                <td>{props.issue.title}</td>
                <td>{props.issue.owner}</td>
                <td>{props.issue.created.toDateString()}</td>
                <td>{props.issue.status}</td>
                <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
                <td>{props.issue.effort}</td>
            </tr>
        );

const IssueTable = (props) => {
    const issueList = props.issues.map( i => <IssueRow key={i.id} issue={i}/> );
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th> 
                    <th>Owner</th> 
                    <th>Created</th> 
                    <th>Status</th> 
                    <th>Completion Date</th> 
                    <th>Effort</th> 
                </tr>
            </thead>
            <tbody>
            {issueList}
            </tbody>
        </table>
    );
};

ReactDOM.render(<IssueList />, content);
