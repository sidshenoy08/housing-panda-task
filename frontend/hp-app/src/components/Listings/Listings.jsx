import Table from 'react-bootstrap/Table'

import NavigationBar from '../NavigationBar/NavigationBar';
import { useEffect, useState } from 'react';

function Listings() {
    const [houseListings, setHouseListings] = useState([]);

    async function fetchListings() {
        const url = "http://127.0.0.1:8080/listings";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setHouseListings(json);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchListings();
    }, []);

    return (<>
        <NavigationBar />
        <h1 className="heading">Current Listings</h1>

        {houseListings.length > 0 ? <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Listing Title</th>
                    <th>Description</th>
                    <th>Rent</th>
                    <th>Address</th>
                    <th>Number of Rooms</th>
                    <th>Contact Information</th>
                </tr>
            </thead>
            <tbody>
                {houseListings.map((houseListing, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{houseListing.title}</td>
                        <td>{houseListing.description}</td>
                        <td>{houseListing.rent}</td>
                        <td>{houseListing.address}</td>
                        <td>{houseListing.no_rooms}</td>
                        <td>{houseListing.contact_info}</td>
                    </tr>
                ))}
            </tbody>
        </Table> : <h3 className="heading">No current listings to show!</h3> }
    </>);
}

export default Listings;