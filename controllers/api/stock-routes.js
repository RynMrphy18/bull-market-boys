const router = require('express').Router();

router.get('/:symbol', (req, res) => {
    console.log(req.params.symbol);
});

module.exports = router;