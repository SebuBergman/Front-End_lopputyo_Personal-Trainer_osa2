import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingsPage() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(res => fetchTrainings())
        .catch(err => console.error(err))
       }
    }

    const customerName = (params) => {
        console.log(params);
        return params.data.customer.firstname + " " + params.data.customer.lastname;
    };

    const columns = [
        { field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format("HH:mm, DD-MMM-YY") },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Customer',
            valueGetter: customerName,
        },
        {
        headerName: '',
        width: 100,
        field: 'links.0.href',
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