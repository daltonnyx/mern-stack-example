//Load modules
const express = require('express');

const app = express();

app.use(express.static('static'));

const issuesArray = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
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


app.get('/api/issues', (req,res) => {
 const metadata = {total_count: issuesArray.length};
 console.log("send back response");
 res.json({_metadata: metadata, records: issuesArray});
});

app.listen(3000,function(){
    console.log("App started at port 3000");
});
