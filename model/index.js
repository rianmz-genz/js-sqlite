class Model {
    db;
    constructor(db) {
        this.db = db;
    }

    // Create a record
    create(table, columns, values, callback) {
        // Ensure columns and values arrays have the same length
        if (columns.length !== values.length) {
            throw new Error('Columns and values must have the same length');
        }

        // Construct the SQL query dynamically
        const placeholders = Array.from({ length: values.length }, () => '?').join(', ');
        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

        const stmt = this.db.prepare(query);
        stmt.run(...values);
        stmt.finalize(err => {
            if (err) {
                callback(`Error: ${err.message}`);
            } else {
                callback('Success: Record created successfully');
            }
        });
    }

    // Read all records
    getAll(table, callback) {
        const query = `SELECT * FROM ${table}`;
        this.db.all(query, (err, rows) => {
            if (err) throw err;
            callback(rows);
        });
    }

    // Read a record by ID
    getById(table, id, callback) {
        const query = `SELECT * FROM ${table} WHERE id = ?`;
        this.db.get(query, [id], (err, row) => {
            if (err) throw err;
            callback(row);
        });
    }

    // Update a record by ID
    update(table, id, data, callback) {
        // Extract columns and values from the data object
        const columns = Object.keys(data);
        const values = Object.values(data);

        // Construct the SET part of the SQL query dynamically
        const setClause = columns.map(col => `${col} = ?`).join(', ');
        const query = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

        const stmt = this.db.prepare(query);
        stmt.run(...values, id);
        stmt.finalize(err => {
            if (err) {
                callback(`Error: ${err.message}`);
            } else {
                callback('Success: Record updated successfully');
            }
        });
    }

    // Delete a record by ID
    delete(table, id, callback) {
        const query = `DELETE FROM ${table} WHERE id = ?`;
        const stmt = this.db.prepare(query);
        stmt.run(id);
        stmt.finalize(err => {
            if (err) {
                callback(`Error: ${err.message}`);
            } else {
                callback('Success: Record deleted successfully');
            }
        });
    }
}

module.exports = {
    Model
};
