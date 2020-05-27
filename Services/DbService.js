const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbname = 'Todo';
const Client = new MongoClient(url, { useNewUrlParser: true });

async function connectToDB() {
    await Client.connect();

    return Client.db(dbname);
}

module.exports.connectToDB = connectToDB;