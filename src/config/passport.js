const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        async (email, password, done) => {
           try {
            const user = await userModel.getUserByEmail(email);
 
            if (!user) {
              return done(null, false);
            }
 
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
 
            if (!isPasswordValid) {
               return done(null, false);
            }
 
            return done(null, user);
           } catch (error) {
             return done(error, false);
           }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await userModel.getUserById(userId);
    
        if (!user) {
            return done(null, false);
        }
    
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});