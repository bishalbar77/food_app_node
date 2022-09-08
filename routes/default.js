const router = require('express').Router();

router.get('/', async (req, res) => {
    return res.status(200).send("404 | This website is for API Use Only.");
});

module.exports = router;