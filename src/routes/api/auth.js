const express = require('express');
const router = express.Router();
// @route GET api/auth/test
// @desc TESTS AUTH ROUTE
// @access Public
router.get('/test', (req, res) => {
    res.json({
        msg: "Auth Works"
    })
});

module.exports = router;