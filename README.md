## Configuration Details

Both the backend and frontend directories have separate README files with the required steps to set up the files.

## Database Schema

CREATE TABLE house_listings( \
    title VARCHAR(255), \
    description TEXT, \
    rent VARCHAR(255), \
    address TEXT, \
    no_rooms INTEGER, \
    contact_info VARCHAR(255), \
    PRIMARY KEY (title, address) \
); 

Assume that each listing should have a unique title and address pair. This will prevent users from creating multiple listings for the same address with the same information.

## App Interface

### Home Page
<img width="1465" alt="Screenshot 2025-05-04 at 2 58 38 PM" src="https://github.com/user-attachments/assets/a413c799-470a-47ab-b1e1-284fded9f099" />

### Listing Confirmation Dialog
<img width="787" alt="Screenshot 2025-05-04 at 3 00 32 PM" src="https://github.com/user-attachments/assets/e887cc38-f06a-48a7-bcfe-90cb390c410f" />

### Listings Page
<img width="1441" alt="Screenshot 2025-05-04 at 3 46 46 PM" src="https://github.com/user-attachments/assets/3cad61cd-6d04-4bfd-adee-7799a568359b" />

## Improvements

### Interface

1. More detailed and appealing frontend.
2. A more attractive method of displaying the active listings.
3. Detailed messages to the user in case of application failures.

### Backend

1. Better user input sanitation.
2. Database normalization and better schema design to support future enhancement roadmaps.
3. Filtering and search options to view specific listings.
