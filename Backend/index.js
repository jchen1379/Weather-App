const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries');
const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to zipcode geolocation lookup API!');
})

app.get('/test', (req, res) => {
    res.send('This is version 2');
})

app.get('/api/zipcode/:zipcode', db.getGeolocation);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})