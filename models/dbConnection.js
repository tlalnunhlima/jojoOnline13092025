const mongoose = require('mongoose');

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://jojoOnline:jojoOnline@cluster0.24mkr.mongodb.net/jojo_database?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Export mongoose to use in other files (optional)
module.exports = mongoose;

