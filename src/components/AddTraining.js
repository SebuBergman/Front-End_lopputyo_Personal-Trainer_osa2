import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';

function Addtraining({ addTraining, params }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        activity: '',
        duration: '',
        customer: params.value
    })

    const [customer, setCustomer] = React.useState({
        name: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            name: params.data.firstname + " " + params.data.lastname
        })
        console.log(params.value);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        console.log(params.value);
        console.log(training);
        addTraining(training);
        console.log(training);
        setTraining({
            date: '',
            activity: '',
            duration: '',
            customer: ''
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
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>New Training ({customer.name})</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Date"
                        value={training.date}
                        inputFormat="dd/MM/yyyy HH:mm"
                        mask="__/__/____ __:__"
                        onChange={(newValue) => {
                            setTraining({...training, date: newValue});
                        }}
                        renderInput={(params) => <TextField variant='standard' {...params} fullWidth />}
                    />
                    </LocalizationProvider>
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        helperText="E.g. Jogging, Gym, Swimming"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
                        helperText="in minutes"
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