import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import NavigationBar from '../NavigationBar/NavigationBar';
import Footer from '../Footer/Footer';

import './Home.css';
import { useState, useRef } from 'react';

function Home() {
    const [listingTitle, setListingTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rent, setRent] = useState("");
    const [address, setAddress] = useState("");
    const [noOfRooms, setNoOfRooms] = useState(0);
    // const [contactMethod, setContactMethod] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    const listingRef = useRef(null);
    const descriptionRef = useRef(null);
    const rentRef = useRef(null);
    const addressRef = useRef(null);
    const noOfRoomsRef = useRef(null);
    const contactInfoRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

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

    // function to reset listing information and input values after successful submission
    function resetValues() {
        setListingTitle("");
        setDescription("");
        setRent("");
        setAddress("");
        setNoOfRooms(0);
        setContactInfo("");

        listingRef.current.value = null;
        descriptionRef.current.value = null;
        rentRef.current.value = null;
        addressRef.current.value = null
        noOfRoomsRef.current.value = null;
        contactInfoRef.current.value = null;
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

        // if no title is entered, do NOT call the api
        if(!listingTitle) {
            alert("Please enter a listing title!");
            return;
        }

        // if no address is entered, do NOT call the api
        if(!address) {
            alert("Please enter an address!");
            return;
        }

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
                body: JSON.stringify({ newListing: newListing })
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            } else {
                resetValues();
                // open the dialog to show successful creation of the listing
                setIsOpen(true);
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
                            <Form.Control onChange={handleListingTitleChange} ref={listingRef} placeholder="Enter listing title" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={4} onChange={handleDescriptionChange} ref={descriptionRef} placeholder="Description" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rent</Form.Label>
                            <Form.Control onChange={handleRentChange} ref={rentRef} placeholder="Rent" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={4} onChange={handleAddressChange} ref={addressRef} placeholder="Address" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Number of Rooms</Form.Label>
                            <Form.Control type="number" onChange={handleNoOfRoomsChange} ref={noOfRoomsRef} placeholder="Number of rooms" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contact Information</Form.Label>
                            <Form.Control onChange={handleContactInfoChange} ref={contactInfoRef} placeholder="Contact information" />
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

                        <Button variant="outlined" color="warning" onClick={createListing}>
                            Create Listing
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        <Dialog
            open={isOpen}
            onClose={() => { setIsOpen(false) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Your listing has been created!"}
            </DialogTitle>

            <DialogContent>
                <DotLottieReact
                    src="https://lottie.host/d09aa58d-e347-42d5-a12c-07195d6bb3db/HEv2kCFNy4.lottie"
                    loop
                    autoplay
                />
                <DialogContentText id="alert-dialog-description">
                    Sit back and relax! We will notify you when your listing gets any responses.
                    Provided we are not asleep, of course.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="success" onClick={() => setIsOpen(false)}>Yay!</Button>
            </DialogActions>
        </Dialog>
        <Footer />
    </div>);
}

export default Home;