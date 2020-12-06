const express= require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const {MongoClient} = require('mongodb');
const PORT = process.env.PORT || 3002;
const cors = require('cors')

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(cors());
//Admin route
require('./middleware/middleware')(app);


//Listen at PORT

app.listen(PORT, async() => {
    console.log(`Listening at ${PORT}` );
});
