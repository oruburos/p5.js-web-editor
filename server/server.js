import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import path from 'path';
import basicAuth from 'express-basic-auth';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/config.dev';

// Import all required modules
import users from './routes/user.routes';
import sessions from './routes/session.routes';
import projects from './routes/project.routes';
import files from './routes/file.routes';
import aws from './routes/aws.routes';
import serverRoutes from './routes/server.routes';
import embedRoutes from './routes/embed.routes';
import assetRoutes from './routes/asset.routes';
import { requestsOfTypeJSON } from './utils/requestsOfType';

import { renderIndex } from './views/index';
import { get404Sketch } from './views/404Page';

const app = new Express();
const MongoStore = connectMongo(session);

app.get('/health', (req, res) => res.json({ success: true }));

// For basic auth, in setting up beta editor
if (process.env.BASIC_USERNAME && process.env.BASIC_PASSWORD) {
  app.use(basicAuth({
    users: {
      [process.env.BASIC_USERNAME]: process.env.BASIC_PASSWORD
    },
    challenge: true
  }));
}

const corsOriginsWhitelist = [
  /p5js\.org$/,
];

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  corsOriginsWhitelist.push(/localhost/);
}

const mongoConnectionString = process.env.MONGO_URL;
app.set('trust proxy', true);

// Enable Cross-Origin Resource Sharing (CORS) for all origins
const corsMiddleware = cors({
  credentials: true,
  origin: corsOriginsWhitelist,
});
app.use(corsMiddleware);
// Enable pre-flight OPTIONS route for all end-points
app.options('*', corsMiddleware);

// Body parser, cookie parser, sessions, serve public assets

app.use(Express.static(path.resolve(__dirname, '../dist/static'), {
  maxAge: process.env.STATIC_MAX_AGE || (process.env.NODE_ENV === 'production' ? '1d' : '0')
}));

// setting middleware
app.use(Express.static('public'));
/* app.get('/public', (req, res) => {
  res.send('An alligator approaches!');
}); */

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  proxy: true,
  name: 'sessionId',
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new MongoStore({
    url: mongoConnectionString,
    autoReconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', requestsOfTypeJSON(), users);
app.use('/api', requestsOfTypeJSON(), sessions);
app.use('/api', requestsOfTypeJSON(), files);
app.use('/api', requestsOfTypeJSON(), projects);
app.use('/api', requestsOfTypeJSON(), aws);
app.use(assetRoutes);
// this is supposed to be TEMPORARY -- until i figure out
// isomorphic rendering
app.use('/', serverRoutes);

app.use('/', embedRoutes);
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// configure passport
require('./config/passport');
// const passportConfig = require('./config/passport');

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.get('/', (req, res) => {
  res.sendFile(renderIndex());
});

// Handle API errors
app.use('/api', (error, req, res, next) => {
  if (error && error.code && !res.headersSent) {
    res.status(error.code).json({ error: error.message });
    return;
  }

  next(error);
});


// Handle missing routes.
app.get('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    get404Sketch(html => res.send(html));
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found.' });
    return;
  }
  res.type('txt').send('Not found.');
});

// start app
app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`p5js web editor is running on port: ${process.env.PORT}!`); // eslint-disable-line
  }
});

export default app;
