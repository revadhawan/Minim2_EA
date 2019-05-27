'use strict'

//Importar librerías
const express = require('express')
const BodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const cors = require ('cors')
const api = require('./backend/routes')

//Método use
app.use(BodyParser.urlencoded({ extended: false}))

//Middlewares
app.use(cors({origin: '*'}))

//Permitir peticiones con formato de mensaje JSON
app.use(BodyParser.json())

//Ficheros hbs
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))

//View engine = .hbs
app.set('view engine', '.hbs')

app.use('/api', api)

//Renderizar login
app.get('/login', (req, res) => {
    res.render('login')
})

module.exports = app