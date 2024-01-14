const sqlite3 = require('sqlite3').verbose()
const { Model } = require('./model/index')
const { Migration } = require('./migration/index')
const {UserController} = require('./controller/userController')

const db = new sqlite3.Database('mydatabase.db');
const model = new Model(db);
const migration = new Migration(db);

migration.migrate()

const userController = new UserController(model)

userController.getAll()

db.close()