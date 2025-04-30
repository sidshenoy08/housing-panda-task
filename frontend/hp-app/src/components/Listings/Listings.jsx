import Table from 'react-bootstrap/Table'

import NavigationBar from '../NavigationBar/NavigationBar';

function Listings() {
    return (<>
        <NavigationBar />
        <h1>Current Listings</h1>
        <Table striped bordered hover>
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
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
            </tbody>
        </Table>
    </>);
}

export default Listings;