const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.engine('handlebars', exphbs({helpers, defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

sequelize.sync({force: false})
    .then(() => {
        app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});