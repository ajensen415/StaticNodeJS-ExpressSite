
const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

// Display a random project if user goes to /projects only route
router.get('/', (req, res) => {
    const randomProjectNumber = Math.floor(Math.random() * (projects.length - 1));
    res.redirect(`/projects/${randomProjectNumber}`);
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    if (projects[id]) {
        res.render('project', projects[id]);
    } else {
        const err = new Error(`Sorry, we couldn't find that project.`);
        err.status = 404;
        console.log(`Error Status ${err.status}: ${err.message}`);
        next(err);
    }
});

module.exports = router;