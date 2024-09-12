const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const jwtVerify = async (jwtPayload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: jwtPayload.id
            }
        });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};

const strategy = new JwtStrategy(jwtOptions, jwtVerify);
passport.use(strategy);

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
    prisma,
    passport, 
    generateToken
}