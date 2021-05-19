const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();

//conectando base de datos
mongoose.connect('mongodb://localhost/crud-mongo')
  .then(db => console.log('Db conectada'))
  .catch(err => console.log(err));

// importando rutas
const indexRoutes = require('./routes/index')

// configuraciones 
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//routes 

app.use('/',indexRoutes)
// iniciando el server
app.listen(app.get('port'), () => {
  console.log(`Server en puerto ${app.get('port')}`);
});