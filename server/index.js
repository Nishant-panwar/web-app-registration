// Setting enviroment variables
require('./config');

const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors')
const registrationApi = require('./api/Registration');

// setting up cors
app.use(cors())

// express static middlware for static build files
app.use(express.static(path.join(__dirname, '../build')))

// test endpoint
app.get('/ping', (req, res) => {
    return res.send('pong')
})

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

// registration APIs
app.use('/api/registration', registrationApi);

app.listen(8080, () => {
    console.log(`Server started at port 8080`);
    const Redis  = require('./Database/Redis');
    Redis.init();
});
