const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

sequelize.sync({force: false})
    .then(() => {
        app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});