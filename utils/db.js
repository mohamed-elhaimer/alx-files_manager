const { MongoClient } = require('mongodb');

const { env } = process;

class DBClient {
  constructor() {
    const host = env.DB_HOST || 'localhost';
    const port = env.DB_PORT || 27017;
    const database = env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = database;

    this.client.connect().catch((err) => {
      console.error('MongoDB client connection error:', err);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.client.db(this.dbName).collection('users').countDocuments();
  }

  async nbFiles() {
    return this.client.db(this.dbName).collection('files').countDocuments();
  }

  db() {
    return this.client.db(this.dbName);
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
