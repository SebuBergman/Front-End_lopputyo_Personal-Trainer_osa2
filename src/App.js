import TrainingsPage from './TrainingsPage';
import CustomersPage from './CustomersPage';
import Home from './Home';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './App.css';

function App() {
    //App handles tabs - Home/Songs/Albums/TestPage
    //Also render's the whole shabang through index.js ofc
    const [value, setValue] = useState('home');
    const handleTabChange = (event, value) => {
        setValue(value);
    };

    return (
    <div className="App">
        <Tabs value={value} onChange={handleTabChange}>
            <Tab value="home" label="Home" />
            <Tab value="customers" label="Customers" />
            <Tab value="training" label="Training" />
        </Tabs>
        {value === 'home' && <Home />}
        {value === 'customers' && <CustomersPage />}
        {value === 'training' && <TrainingsPage />}
    </div>);
}

export default App;