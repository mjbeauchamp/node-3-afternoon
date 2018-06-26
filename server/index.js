const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
//Require your middleware
const checkForSession = require('./middlewares/checkForSession');
//require your "controllers", i.e. the callbacks for your get, post, etc. endpoints
const swag = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');
const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
//This will apply the checkForSession middleware to ALL endpoints that come after it
app.use(checkForSession)
//Sets it up so the server and React are both run on one server
app.use( express.static( `${__dirname}/build`));

//Swag endpoint
app.get('/api/swag', swag.read);

//Auth endpoints
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

//Cart endpoints
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//Search endpoint
app.get('/api/search', search_controller.search);


const port = process.env.PORT;





app.listen(port, () => {
    console.log('Server listening on port ' + port)
})