const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const authInit = ((passport) => {

    const logger = global.logger;
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: process.env.APP_SECRET
    };

    /* Create JWT strategy */
    passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
        const UserModel = global._mongo.User;
        const UserId = payload.UserId || '';

        UserModel.findOne({ UserId }).then((userObj, error) => {
            if (error) {
                logger.fatal(error);
                return done(error, false);
            }
            if (userObj) return done(null, userObj);

            return done(null, false);
        }).catch((error) => {
            logger.fatal(error);
            return done(null, false);
        });
    }));

    /* Create Local strategy */
    passport.use(new LocalStrategy({ passReqToCallback: true }, function (request, username, password, done) {
        const UserModel = global._mongo.User;

        UserModel.findOne({ Username: username }).then((userObj, error) => {
            if (error) {
                logger.fatal(error);
                return done(error);
            }
            if (_.isEmpty(userObj)) {
                return done(null, false);
            }

            userObj.comparePassword(password, function (error, isMatch) {
                if (error) { return done(error); }
                if (!isMatch) { return done(null, false); }
                return done(null, userObj);
            });
        });
    }));
});

export default authInit;
