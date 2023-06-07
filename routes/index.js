const commentsRouter = require('./commentsRouter');
const moviesRouter = require('./moviesRouter');
const sessionsRouter = require('./sessionsRouter');
const theatersRouter = require('./theatersRouter');
const usersRouter = require('./usersRouter');

function routerApi(app){
    app.use('/comments',commentsRouter);
    app.use('/movies',moviesRouter);
    app.use('/sessions',sessionsRouter);
    app.use('/theaters',theatersRouter);
    app.use('/users',usersRouter);
}

module.exports = routerApi;