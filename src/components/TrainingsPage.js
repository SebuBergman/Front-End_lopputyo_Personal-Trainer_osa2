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
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
        fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                setMsg("Training was deleted successfully");
                setOpen(true);
                fetchTrainings();
            }
            else {
                alert("Something went wrong!")
            }
        })
        }
    }

    const customerName = (params) => {
        console.log(params);
        return params.data.customer.firstname + " " + params.data.customer.lastname;
    };

    const columns = [
        { field: 'activity', sortable: true, filter: true, width: 150 },
        { field: 'duration', sortable: true, filter: true, width: 140 },
        { field: 'date', sortable: true, filter: true, width: 160 , valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH:mm") },
        {
            headerName: 'Customer',
            valueGetter: customerName,
            width: 160 ,
        },
        {
        headerName: '',
        width: 90,
        field: 'links.0.href',
        cellRenderer: params => 
        <IconButton color="error" onClick={() => deleteTraining(params.data.id)}>
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
            message={msg}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
        />
        </>
    )
}

export default TrainingsPage;