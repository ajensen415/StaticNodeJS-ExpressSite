//Variables to require the necessary dependencies 
const express = require('express');
const app = express();

const mainRoute = require('./routes');
//const indexRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const projectRoutes = require('./routes/projects');

//set view engine to pug
app.set('view engine', 'pug');

//serve static files to express
app.use('/static', express.static('public'));

//route render
app.use(mainRoute);
app.use('/about', aboutRoute);
app.use('/projects', projectRoutes);

//404 error handler
app.use( (req, res, next) => {
    const err = new Error('Sorry, the page you were looking for does not exist.');
    err.status = 404;
    console.log(`Error status ${err.status}: ${err.message}`);
    next(err);
});

//global error handler
app.use( (err, req, res, next) => {
    res.locals.error = err;

    if (err.status === 404) {
        res.status(err.status).render("page-not-found", { err });
    } else {
        err.status = err.status || 500;
        err.message = "Something went wrtong, please try again later.";
        console.log(`Error status ${err.status}: ${err.message}`);
        res.status(err.status).render('error', { err });
    }
});

//App listening on port 3000 & logging string to console
app.listen(3000, () => {
    console.log('App is listening to port 3000');
});
