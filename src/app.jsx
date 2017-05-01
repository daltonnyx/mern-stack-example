let content = document.getElementById('root');
const IssueRow = props => (
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

const IssueTable = props => {
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
        fetch('http://localhost:3000/api/issues').then(res =>
           res.json()
        ).then(resData => {
            resData.records.forEach(issue => {
                issue.created = new Date(issue.created);
                if(issue.completionDate)
                    issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({issues: resData.records});
        });
    }

    createIssue(newIssue) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let postFetch = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newIssue),

        };
        fetch('http://localhost:3000/api/issues', postFetch).then(res => {
            if(res.ok) {
                res.json().then(data => {
                    data.records.forEach(i => {
                        i.created = new Date(i.created);
                        if(i.completionDate)
                            i.completionDate = new Date(i.completionDate);
                    });
                    this.setState({issues: data.records});    
                })
            }
            else {
                res.json().then(error => {
                    console.log(error.message);
                });
            }
        }).catch(err => {
            console.log(err.message);
        });
        
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


ReactDOM.render(<IssueList />, content);
