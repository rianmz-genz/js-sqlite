class UserController {
    model;
    constructor(model) {
        this.model = model;
    }
    create(name, email) {
        this.model.create('users', ['name', 'email'], [name, email], message => {
            console.log(message);
        });
        
    }
    getAll() {
        this.model.getAll('users', users => {
            console.table(users)
        })
    }
    update(id, name, email) {
        this.model.update('users', id, { name, email }, message => {
            console.log(message);
        });
        
    }
    getById(id) {
        this.model.getById('users', id, user => {
            console.table(user)
        })
        
    }
    delete(id) {
        this.model.delete('users', id, message => {
            console.log(message);
        });
    }
}

module.exports = {
    UserController
}