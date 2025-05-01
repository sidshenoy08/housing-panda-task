const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

// fetch config details from .env file
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

// function to create the database client for the local database
function createDBCLient() {
    return new Client({
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        database: process.env.DBNAME,
    });
}

// route for fetching all the active listings
app.get("/listings", (request, response) => {
    // create the db client
    const client = createDBCLient();

    client
        .connect()
        .then(() => {
            client.query('SELECT * FROM house_listings', (err, result) => {
                if (err) {
                    console.error(`Error executing query: ${err}`);
                } else {
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

// route for creating a new house listing
// called when the user presses the submit button
app.post("/newlisting", (request, response) => {
    // basic input sanitation to avoid sparse entries
    if (!request.body.newListing[1]) {
        request.body.newListing[1] = "No description provided";
    }

    if (!request.body.newListing[2]) {
        request.body.newListing[2] = "No rent specified. Maybe it is your lucky day!";
    }

    if (!request.body.newListing[4]) {
        request.body.newListing[4] = null;
    }

    if (!request.body.newListing[5]) {
        request.body.newListing[5] = "No contact information provided. Carrier pigeon anyone?";
    }

    // create the db client
    const client = createDBCLient();
    
    client
        .connect()
        .then(() => {
            const insertQuery = {
                text: 'INSERT INTO house_listings VALUES($1, $2, $3, $4, $5, $6)',
                values: request.body.newListing
            };

            client.query(insertQuery, (err, result) => {
                if (err) {
                    console.error(`Error executing query: ${err}`);
                } else {
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