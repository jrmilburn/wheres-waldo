const express = require('express');
const { passport, prisma } = require('./config/passport');
const session = require('express-session');
const cors = require('cors');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const mapsRouter = require('./routes/maps');
const authenticationRouter = require('./routes/authenticationRouter');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3 * 24 * 60 * 60 * 1000
    },
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/maps', mapsRouter);
app.use('/', authenticationRouter);
app.use('/leaderboard', leaderboardRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App started on port ${PORT}`));