//Load modules
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());

const issuesArray = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
        title: 'Title'
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


app.get('/api/issues', (req,res) => {
 const metadata = {total_count: issuesArray.length};
 console.log("send back response");
 res.json({_metadata: metadata, records: issuesArray});
});

app.post('/api/issues', (req, res) => {
 const newIssue = req.body;
 console.log(req.body);
 newIssue.id = issuesArray.length + 1;
 newIssue.created = new Date();
 if(!newIssue.status)
    newIssue.status = 'New';
 issuesArray.push(newIssue);
 res.json({_metadata: {total_count: issuesArray.length}, records: issuesArray});
});

app.listen(3000,function(){
    console.log("App started at port 3000");
});
