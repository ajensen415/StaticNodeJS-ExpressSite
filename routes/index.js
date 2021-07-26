  
const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/', (req, res) => {
    res.locals = projects;
    res.render('index', { projects });
});

module.exports = router;