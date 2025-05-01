const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

// route for fetching all the active listings
app.get("/listings", (request, response) => {
    const client = new Client({
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        database: process.env.DBNAME,
    });

    client
        .connect()
        .then(() => {
            console.log("Connected to the database!");

            client.query('SELECT * FROM house_listings', (err, result) => {
                if (err) {
                    console.error(`Error executing query: ${err}`);
                } else {
                    console.log('Query was executed successfully!');
                    response.send(JSON.stringify(result.rows));
                }

                client
                    .end()
                    .then(() => {
                        console.log('Connection to PostgreSQL closed');
                    })
                    .catch((err) => {
                        console.error(`Error closing connection: ${err}`);
                    });
            });
        })
        .catch((err) => {
            console.log(`Error while connecting to the database: ${err}`);
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
}); 