var db = new Mongo().getDB('issuetracker');
db.issues.remove({});
db.issues.insert([
    {
        status: 'Open', owner: {first: 'Ryan', last: 'N'},
        created: new Date('2016-05-03'), effort: 5, completionDate: undefined,
        title: 'Error in console when click Add'
    },
    {
        status: 'Assigned', owner: {first: 'Nyx', last: 'N'},
        created: new Date('2016-02-03'), effort: 7, completionDate: undefined,
        title: 'Error when connect to MongoDB'
    },
    {
        status: 'Closed', owner: {first: 'Bob', last: 'N'},
        created: new Date('2017-01-01'), effort: 5, completionDate: undefined,
        title: 'Missing bottom panel'
    },
    
]);

db.issues.createIndex({status: 1});
db.issues.createIndex({'owner.first': 1});
db.issues.createIndex({created: 1});
