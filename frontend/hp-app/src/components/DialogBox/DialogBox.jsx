import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogBox({ isOpen, setIsOpen }) {
    return (
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
                <Button onClick={() => setIsOpen(false)}>Yay!</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogBox;