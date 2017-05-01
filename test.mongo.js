var db = new Mongo().getDB('playground');
db.employees.insert({name: {first: 'ABC', last: 'XYZ'}, age: 44});
db.employees.find().pretty();
