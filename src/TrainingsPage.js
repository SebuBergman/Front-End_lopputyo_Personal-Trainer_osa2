import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function TrainingsPage() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    const deleteUrl = `https://customerrest.herokuapp.com/api/trainings/16`

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(deleteUrl, { method: 'DELETE' })
            .then(response => {
            if (response.ok) {
                setOpen(true);
                fetchTrainings();
            }
            else {
                alert('Something went wrong');
            }
            })
        }
    }

    const columns = [
        { field: 'date', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'id', sortable: true, filter: true },
        {
        headerName: '',
        width: 100,
        field: '_links.self.href',
        cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteTraining(params.value)}>
            <DeleteIcon />
            </IconButton>
        }
    ]

    return (
        <>
        <div className="ag-theme-material" style={{ height: 600, width: '90%' }}>
            <AgGridReact
            columnDefs={columns}
            rowData={trainings}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            />
        </div>
        <Snackbar
            open={open}
            message="Training deleted"
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
        />
        </>
    )
}

export default TrainingsPage;