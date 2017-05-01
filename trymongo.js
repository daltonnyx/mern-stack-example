'use strict';
const MongoClient = require('mongodb').MongoClient;
function usage() {
    console.log('Usage:');
    console.log('node', __filename, '<option>');
    console.log('Where option is one of:');
    console.log('   callbacks   Use the callbacks paradigm');
    console.log('   promises    Use the Promises paradigm');
    console.log('   generator   Use the Generator paradigm');
    console.log('   async       Use Async module');
}

if(process.argv.length < 3) {
    console.log('Incorrect number of arg');
    usage();
}
else {
    if(process.argv[2] === 'callbacks') {
        testWithCallbacks();
    }
    else if(process.argv[2] === 'promises') {
        testWithPromises();
    }
    else if(process.argv[2] === 'generator') {
        testWithGenerator();
    }
    else if(process.argv[2] === 'async') {
        testWithAsync();
    }
    else {
        console.log("Invalid option:" + process.argv[2]);
        usage();
    }
}

function testWithCallbacks() {
    MongoClient.connect('mongodb://localhost/playground', (err, db) => {
        db.collection('employees').insertOne({id: 1, name: 'A.Callback'}, (err, result) => {
            db.collection('employees').find({id: 1}).toArray((err,docs) => {
                console.log(docs);
                db.close();
            });
        });
    });
}

function testWithPromises() {
    let db;
    MongoClient.connect('mongodb://localhost/playground').then(connection => {
        db = connection;
        return db.collection('employees').insertOne({id: 1, name: 'B.Promise'});
    }).then(result => {
        return db.collection('employees').find({id: 1}).toArray();
    }).then(docs => {
        console.log(docs);
        db.close();
    }).catch(err => {
        console.log(err);
    });
}

function testWithGenerator() {
    const co = require('co');
    co(function*() {
        const db = yield MongoClient.connect('mongodb://localhost/playground');
        
        const result = yield db.collection('employees').insertOne({id: 1, name: 'C.Generator'});

        console.log(result.insertedId);
        
        const docs = yield db.collection('employees').find({id: 1}).toArray();

        console.log(docs);

        db.close();
    }).catch(err => {
        console.log('ERROR',err);
    });
}

function testWithAsync() {
    const async = require('async');
    let db;
    async.waterfall([
        next => {
            MongoClient.connect('mongodb://localhost/playground', next);
        },
        (connection, next) => {
            db = connection;
            db.collection('employees').insertOne({id: 1, name: 'D. Async'}, next);
        },
        (result, next) => {
            console.log(result.insertedId);
            db.collection('employees').find({id: 1}).toArray(next);
        },
        (docs, next) => {
            console.log(docs);
            db.close();
            next(null,'Done');
        }
    ], (err, result) => {
        if(err)
            console.log(err);
        else
            console.log(result);
    });
}
