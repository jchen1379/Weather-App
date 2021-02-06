// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'SDE-BOOTCAMP1',
//     password: 'jchen240681379',
//     port: 5432
// })

// const getGeolocation = (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     const zipcode = req.params.zipcode;
//     pool.query(`SELECT * FROM weather_app_api where zipcode = ${zipcode}`, (error, results) => {
//         if (error) {
//             throw error;
//         }
//         res.status(200).json(results.rows);
//     })
// }

// module.exports = { getGeolocation };


const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

const getGeolocation = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const zipcode = req.params.zipcode;
    client.query(`SELECT * FROM weather_app_api where zipcode = ${zipcode}`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

module.exports = { getGeolocation };