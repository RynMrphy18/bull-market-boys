const router = require('express').Router();
const {User, Holding, Transaction, Stock} = require('../../models');

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']},
        include: [
            {
                model: Holding
            }
        ]
    })
        .then(response => res.json(response))
        .catch(err => {
            return res.status(500).json(err);
        });
});

// create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(response => {
        req.session.save(() => {
            req.session.user_id = response.id;
            req.session.username = response.username;
            req.session.loggedIn = true;
    
            return res.json(response);
        });
    })
    .catch(err => {
        return res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(response => {
        if (!response) {
            res.statusMessage = 'Failed to login!';
            return res.status(400).json();
        }

        const validPassword = response.checkPassword(req.body.password);

        if (!validPassword) {
            res.statusMessage = 'Incorrect password!'
            return res.status(400).json();
        }

        req.session.save(() => {
            req.session.user_id = response.id;
            req.session.username = response.username;
            req.session.loggedIn = true;
    
        return res.json({ user: response, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            return res.status(204).end();
        });
    }else{
        return res.status(404).end();
    }
});

module.exports = router;