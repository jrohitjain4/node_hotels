const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotel'; // Replace with your database URL

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Export mongoose for use in other files
module.exports = mongoose;
