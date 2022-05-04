import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from '@mui/lab/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function Addtraining({ addTraining, params }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        activity: '',
        duration: '',
        customers: ''
    })
    
    /*const [customername, setCustomername] = React.useState({
        customers: params.data.customer.firstname
    })*/

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            customers: params.data.firstname + " " + params.data.lastname
        })
        console.log(params);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        addTraining(training);
        setTraining({
            date: '',
            activity: '',
            duration: '',
            customers: ''
        })
    }

    const inputChanged = (event, data) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training ({training.customers})</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        value={training.date}
                        inputFormat="dd.MM.yyyy"
                        mask="__.__.____"
                        onChange={(newValue) => {
                            setTraining({...training, date: newValue});
                        }}
                        renderInput={(params) => <TextField variant='standard' {...params} />}
                    />
                    </LocalizationProvider>
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Addtraining;