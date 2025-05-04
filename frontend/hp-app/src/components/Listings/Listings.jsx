import NavigationBar from '../NavigationBar/NavigationBar';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

function Listings() {
    const [houseListings, setHouseListings] = useState([]);

    const headerColumns = [
        { field: 'title', headerName: 'Listing Title', width: 100 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'rent', headerName: 'Rent', width: 300 },
        { field: 'no_rooms', headerName: 'Number of Rooms', width: 150 },
        { field: 'contact_info', headerName: 'Contact Information', width: 400 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    // function to fetch all the active house listings
    async function fetchListings() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/listings`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setHouseListings(json);
        } catch (error) {
            console.error(error.message);
        }
    }

    // function to assign unique id for each house listing
    function getRowId(row) {
        return (row.title + row.address);
    }

    // fetch the listings when the page is first rendered
    useEffect(() => {
        // manually set body background color to orange
        document.body.style.backgroundColor = "#FA812F";
        fetchListings();
    }, []);

    return (<div style={{ backgroundColor: '#FA812F' }}>
        <NavigationBar />
        <h1 className="heading">Current Listings</h1>
        {houseListings.length > 0 ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ height: 400, width: '90%' }}>
                <DataGrid
                    getRowId={getRowId}
                    rows={houseListings}
                    columns={headerColumns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box> : <h3 className="heading">No current listings to show!</h3>}
    </div>);
}

export default Listings;