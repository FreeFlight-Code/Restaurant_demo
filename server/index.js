require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true
}).then( db => {
  app.set('db', db);
})

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

  const db = app.get('db');

  db.db_create();
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
app.post('/api/product', api.addProduct);
app.put('/api/product', api.editProduct);
app.delete('/api/product/:id', api.deleteProduct);
//user queries
//cartqueries
app.get('/api/getCart', api.getCart);
app.post('/api/replaceCart', api.replaceCart);







//*********************       LOGIN/AUTH ENDPOINTS       **********************************8 */
app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: `${process.env.LOCALHOST}/#/browsing`,
  failureRedirect: `${process.env.LOCALHOST}/#/`
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  app.get('db').find_session_user([obj.id])
  .then( user => {
    // console.log(user)
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
  return res.redirect(302, `http://localhost:3000`);
})

let PORT = process.env.BE_PORT;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
