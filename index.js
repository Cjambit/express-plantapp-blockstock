const express = require('express');
const logger = require('./middleware/logger');

const app = express();

// Initialize the middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/stock', require('./routes/api/stock'));
app.use('/api/block', require('./routes/api/block'));

const PORT = 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!!!`));