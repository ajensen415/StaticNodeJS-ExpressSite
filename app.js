
//Variables to require express & data.json
const express = require('express');
const { projects } = require('./data.json');
const app = express();

//set view engine to pug
app.set('view engine', 'pug');

//creation of static route to serve staic files in the public folder
app.use('/static', express.static('public'));

//Index route
app.get('/', (req, res) => {
  res.render('index', { projects });
})

//About route
app.get('/about', (req, res, next) => {
  res.render('about');
})

//Individual project pages by ID
app.get('/project/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects[projectId];
  if (project) {
    res.render('project', { project });
  } else {
    next();
  }
});

//404 error handler
app.use( (req, res, next) => {
    const err = new Error('Sorry, the page you were looking for does not exist.');
    err.status = 404;
    console.log(`Error status ${err.status}: ${err.message}`);
    next(err);
});

//Global error handler
app.use( (err, req, res, next) => {
    console.log(err);
    res.locals.error = err;
    if (err.status === 404) {
        res.status(err.status).render("page-not-found", { err });
    } else {
        err.status = err.status || 500;
        err.message = "Something went wrong, please try again later.";
        console.log(`Error status ${err.status}: ${err.message}`);
        res.status(err.status).render('error', { err });
    }
});

//App listening on port 3000 & logging string to console
app.listen(3000, () => {
    console.log('App is listening to port 3000');
});