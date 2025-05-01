import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';


import NavigationBar from '../NavigationBar/NavigationBar';
import Footer from '../Footer/Footer';

import './Home.css';
import { useState } from 'react';

function Home() {
    const [listingTitle, setListingTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rent, setRent] = useState("");
    const [address, setAddress] = useState("");
    const [noOfRooms, setNoOfRooms] = useState(0);
    // const [contactMethod, setContactMethod] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    function handleListingTitleChange(event) {
        setListingTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleRentChange(event) {
        setRent(event.target.value);
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    function handleNoOfRoomsChange(event) {
        setNoOfRooms(event.target.value);
    }

    // function handleContactMethodChange(event) {
    //     setContactMethod(event.target.value);
    // }

    function handleContactInfoChange(event) {
        setContactInfo(event.target.value);
    }

    // function ContactMethodInput({ contactMethod }) {
    //     if (contactMethod.trim().length === 0) {
    //         return <></>;
    //     } else if (contactMethod === "email") {
    //         return <>
    //             <Form.Label>Email Address</Form.Label>
    //             <Form.Control type="email" value={contactInfo} onChange={handleContactInfoChange} placeholder="Email address" />
    //         </>;
    //     } else {
    //         return <>
    //             <Form.Label>Phone Number</Form.Label>
    //             <Form.Control type="tel" value={contactInfo} onChange={handleContactInfoChange} placeholder="Phone number" />
    //         </>
    //     }
    // }

    async function createListing() {
        const newListing = [];
        newListing.push(listingTitle);
        newListing.push(description);
        newListing.push(rent);
        newListing.push(address);
        newListing.push(parseInt(noOfRooms));
        newListing.push(contactInfo);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/newlisting`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newListing: newListing})
            });

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (<div>
        <NavigationBar />

        <h1 className="heading">Create a new listing!</h1>

        <Container>
            <Row>
                <Col>
                    <DotLottieReact
                        src="https://lottie.host/4db86b73-0a6a-4ae9-9acc-0f8fe15f8faa/EbebXBkR8i.lottie"
                        loop
                        autoplay
                    />
                </Col>

                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Listing Title</Form.Label>
                            <Form.Control onChange={handleListingTitleChange} placeholder="Enter listing title" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={4} onChange={handleDescriptionChange} placeholder="Description" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rent</Form.Label>
                            <Form.Control onChange={handleRentChange} placeholder="Rent" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={4} onChange={handleAddressChange} placeholder="Address" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Number of Rooms</Form.Label>
                            <Form.Control type="number" onChange={handleNoOfRoomsChange} placeholder="Number of rooms" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contact Information</Form.Label>
                            <Form.Control onChange={handleContactInfoChange} placeholder="Contact information" />
                        </Form.Group>

                        {/* <Form.Group className="mb-3">
                            <Form.Label>Preferred Method of Contact</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Email"
                                name="contactMethod"
                                value="email"
                                onChange={handleContactMethodChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Phone"
                                name="contactMethod"
                                value="phone"
                                onChange={handleContactMethodChange}
                            />
                        </Form.Group> */}

                        {/* <Form.Group className="mb-3">
                            <ContactMethodInput contactMethod={contactMethod} />
                        </Form.Group> */}

                        <Button variant="primary" onClick={createListing}>
                            Create Listing
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        <Footer />
    </div>);
}

export default Home;