const router = require('express').Router();
const {User} = require('../../models');

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(response => {
        if(!response){
            return res.status(404).json({message: 'No user found with this id.'});
        }
        return res.json(response);
    })
    .catch(err => {
        console.log(err);
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
            return res.status(400).json({message: 'No user with that username!'});
        }
        
        const validPassword = response.checkPassword(req.body.password);
        
        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect password!' });
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