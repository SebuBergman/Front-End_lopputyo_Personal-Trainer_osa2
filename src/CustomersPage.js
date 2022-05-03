import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomersPage() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCars(data.content))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, { method: 'DELETE' })
            .then(response => {
            if (response.ok) {
                setOpen(true);
                fetchCars();
            }
            else {
                alert('Something went wrong');
            }
            })
        }
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true, width: 140 },
        { field: 'lastname', sortable: true, filter: true, width: 140 },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 110 },
        { field: 'city', sortable: true, filter: true, width: 110 },
        {
        headerName: '',
        width: 100,
        field: '_links.self.href',
        cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteCar(params.value)}>
            <DeleteIcon />
            </IconButton>
        }
    ]

    return (
        <>
        <div className="ag-theme-material" style={{ height: 600, width: '90%' }}>
            <AgGridReact
            columnDefs={columns}
            rowData={cars}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            />
        </div>
        <Snackbar
            open={open}
            message="Car deleted"
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
        />
        </>
    )
}

export default CustomersPage;