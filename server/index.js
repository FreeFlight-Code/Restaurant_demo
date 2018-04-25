require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')
    , config = require('./config');

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: config.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

massive({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  ssl: true
}).then( db => {
  app.set('db', db);
})

passport.use(new Auth0Strategy({
  domain: config.AUTH_DOMAIN,
  clientID: config.AUTH_CLIENT_ID,
  clientSecret: config.AUTH_CLIENT_SECRET,
  callbackURL: config.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

  const db = app.get('db');

  db.find_user([ profile.identities[0].user_id ])
  .then( user => {
   if ( user[0] ) {

     return done( null, { id: user[0].id } );

   } else {

     db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.identities[0].user_id])
     .then( user => {
        return done( null, { id: user[0].id } );
     })

   }
  })


}));
/*******************************************************************************
 * 
 *      MY ENDPOINTS RESTFUL
 * 
 *******************************************************************************8*/
const api = require('./api.js');

// product queries
app.get('/api/allproducts', api.allProducts);
app.get('/api/product/:id', api.product);
app.put('/api/product', api.editProduct);
app.post('/api/product', api.addProduct);
app.delete('/api/product/:id', api.deleteProduct);
//user queries









//*********************       LOGIN/AUTH ENDPOINTS       **********************************8 */
app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/browsing',
  failureRedirect: 'http://localhost:3000/#/'
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  app.get('db').find_session_user([obj.id])
  .then( user => {
    return done(null, user[0]);
  })
});

app.get('/auth/me', (req, res, next) => {
  if (!req.user) {
    return res.status(404).send('User not found');
  } else {
    return res.status(200).send(req.user);
  }
})

app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect(302, 'http://localhost:3000/#/');
})

let PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})    


//This is what the config file should look like

// module.exports = {


//   //input myself

//   PORT: ,
//   SESSION_SECRET: '',
//   SECRET: '',


//   //massive db info can host on heroku

//   DB_HOST:'',
//   DB_PORT:'',
//   DB_DATABASE:'',
//   DB_USER:"",
//   DB_PASSWORD:"",


//   //auth0 info

//   AUTH_DOMAIN:'',
//   AUTH_CLIENT_ID:'',
//   AUTH_CLIENT_SECRET:'',
//   AUTH_CALLBACK:''
// };
