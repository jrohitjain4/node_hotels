const mongoose = require('mongoose');

// Define the MenuItem schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    is_sambhar: {
        type: Boolean,
    },
    is_chutney: {
        type: Boolean,
    }
});

// Create the MenuItem model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
