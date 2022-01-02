const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forcast = require('./utils/forecast')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Mausam',
        name: 'Ashutosh Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashutosh Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ashutosh Singh'
    })
})

app.get('/weather', (req, res) => {
    const loc = req.query.address;
    if (!loc) {
        return res.send({
            error: 'You must provide a location'
        });
    }
    geoCode(loc, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({
                error: err
            });
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            const { description, temperature, iconUrl } = data;
            res.send({
                forecast: description,
                temperature: temperature,
                address: loc,
                location,
                iconUrl
            })
        })
    });

});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Ashutosh Singh',
        msg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Ashutosh Singh',
        msg: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})