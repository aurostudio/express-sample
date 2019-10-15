
import cors from 'cors';
import jwt from 'jwt-simple';
import passport from 'passport';
import chalk from 'chalk';

const routers = ((ExpressRouter) => {
    const isAuthenticated = passport.authenticate('jwt', { session: false, failureRedirect: '/login' });
    const { validateSignUp, checkUserEmailDuplicated, checkUsernameDuplicated } = global._middlewares.User;

    const UserController = global._controllers.User.default;
    const UserProfileController = global._controllers.UserProfile.default;

    ExpressRouter.get('/', function (request, response, next) {	// eslint-disable-line no-unused-vars
        console.log(chalk.green('\n>> Testing GET, it works!!!'));
        return response.json({
            message: 'Welcome to API.',
        });
    });

    ExpressRouter.post('/', function (request, response, next) { // eslint-disable-line no-unused-vars
        console.log(chalk.green('\n>> Testing POST, it works!!!'));
        return response.send('It works!!!YEAH!!!');
    });

    /* Authentication */
    ExpressRouter.post('/login', function (request, response, next) {
        passport.authenticate('local', function (error, user, info) {	// eslint-disable-line no-unused-vars
            if (error) { return next(error); }
            if (!user) {
                return response.send('Hey, wrong password!!!');
                //return response.redirect();
            }
            const token = jwt.encode({ UserId: user.UserId, iat: new Date().getTime() }, process.env.APP_SECRET);

            return response.json({ '_rs': 200, token: token });
        })(request, response, next);
    });

    /* User */
    ExpressRouter.post('/user/signup', validateSignUp, checkUsernameDuplicated, checkUserEmailDuplicated, UserController.signUp);
    ExpressRouter.get('/user/id/get', UserController.getUserById);
    ExpressRouter.get('/user/get/all', UserController.getAllUsers);
    ExpressRouter.put('/user/online/status/set', UserController.setUserOnlineStatus);
    ExpressRouter.put('/user/activate', UserController.activateUser);
    ExpressRouter.put('/user/archive', UserController.archiveUser);
    ExpressRouter.put('/user/restore', UserController.restoreUser);

    /* UserProfile */
    // ExpressRouter.post('/userprofile/save', UserProfileController.saveUserProfile);
    // ExpressRouter.get('/userprofile/get', UserProfileController.getUserProfileById);
    // ExpressRouter.put('/userprofile/update', UserProfileController.updateUserProfile);
    // ExpressRouter.put('/userprofile/archive', UserProfileController.archiveUserProfile);
    // ExpressRouter.put('/userprofile/restore', UserProfileController.restoreUser);
    // ExpressRouter.delete('/userprofile/remove', UserProfileController.removeUserProfile);

    return ExpressRouter;
});

export default routers;
