const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('./db'); // Import mongoose (cos to MongoDB)
const Person = require('./models/person'); // Import theon model
const MenuItem = require('./models/Menu'); // Case-sensi
 // Import the MenuItem model

const app = express();
app.use(bodyParser.json());

// Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to my hotel');
});

// Example Route
app.get("/idli", (req, res) => {
    const custo_idli = {
        name: 'rava idli',
        size: '10 cm',
        is_sambhar: true,
        is_chutney: false
    };
    res.send(custo_idli);
});

// POST Route to Add a Menu Item
app.post('/menu', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();

        console.log('Menu item saved:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving menu item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET Route to Retrieve Menu Items
app.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu items retrieved:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error retrieving menu items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST Route to Add a Person
app.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log('Person saved:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET Route to Retrieve All People
app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('People retrieved:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error retrieving people:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/person/:workType', async (req, res) => {
    try {
        console.log('Request received'); // Log request
        const workType = req.params.workType;
        console.log('workType:', workType); // Log parameter

        if (['chef', 'manager', 'waiter'].includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log('Response:', response); // Log database response
            res.status(200).json(response);
        } else {
            console.log('Invalid work type'); // Log invalid type
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error retrieving people:', err); // Log errors
        res.status(500).json({ error: 'Internal server error' });
    }
});

//yes
// Start the Server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
