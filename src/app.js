const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup static handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirPath)) // in use to show template from public directory (static)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        content: 'this is home page',
        name: 'Fariz Hazmi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        content: 'this is about page',
        name: 'Fariz Hazmi'
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'this is help page',
        name: 'Fariz Hazmi'
    })
})

app.get('/weather', (req, res) => {
    var address = req.query.address

    // validate query address
    if(!address){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(address, (geocodeError, {latitude, longitude, location} = {}) => { // implementation destructuring concept
        if(geocodeError){
            return res.send({
                error: geocodeError
            })
        }
        forecast(latitude, longitude, (forecastError, {forecast, icon, temperature}) =>{
            if(forecastError){
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                forecast: forecast,
                icon: icon,
                location: location,
                address: address,
                temperature: temperature
            })
        })
    })
})

app.get('/help/*', (req, res) => { // Handle urls that were not found
    res.render('help404', {
        title: '404 Not found',
        content: 'Help article not found',
        name: 'Fariz Hazmi'
    })
}) 

app.get('*', (req, res) => { // Handle urls that were not found
    res.render('help', {
        title: '404 Not found',
        content: '404 Page not found',
        name: 'Fariz Hazmi'
    })
})

app.listen(3000, () => {
    console.log('Server is up to port 3000')
})