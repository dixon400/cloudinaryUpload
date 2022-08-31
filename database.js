const sqlite3 = require('sqlite3').verbose()
const path = require("path")
const db_name = path.join(__dirname, "data", "uploads.db");

const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            public_id text,
            tag text,
            format text,
            image_url text,
            original_filename text,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log({err})
                throw err
            }else{
                // Table just created, creating some rows
               console.log("Table created successfully")
            }
        });  
    }
});
module.exports = db