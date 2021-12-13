const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParse = require('body-parser')
const app = express()
const indexRoutes = require('./src/routes/index')
const bcrypt = require('bcrypt');


app.set('port', process.env.PORT || 2124)
app.set('views',path.join(__dirname,'src/views'))
app.set('view engine', 'ejs')

app.use(bodyParse.json());
app.use(logger('dev'))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'src/views')))
app.use(bodyParse.urlencoded({extended:false}))

app.use('/', indexRoutes)

app.listen(app.get('port'),()=>{
    console.log("Servidor Ejecutandose", app.get('port'))
})