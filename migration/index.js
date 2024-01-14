class Migration {
    db;
    constructor (db) {
        this.db = db
    }

    migrate(){
        this.db.serialize(() => {
            this.db.run(`
              CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL
              )
            `);
          });
    }
}

module.exports = {
    Migration
}