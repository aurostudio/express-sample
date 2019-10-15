import _ from 'lodash';
import validator from 'validator';

const Config = global._config;
const Utils = global._utils;
const Middleware = global._middlewares;
const UserModel = global._mongo.User();

export const user = {
    signUp: async (request, response) => {
        const { email, password, promoCode, pushToken } = request.body;

        // Validate User's email
        if (typeof email != 'string' || typeof password != 'string') {
            return response.json({
                _ok: false,
                _message: 'Invalid email or password.'
            });
        }

        if (email.length == 0 || email.length > Config.maxEmailLength || !validator.isEmail(email)) {
            return response.json({
                _ok: false,
                _message: 'Invalid email address.'
            });
        }

        // Validate User's password
        if (password.length > Config.maxPasswordLength) {
            return response.json({
                _ok: false,
                _message: 'Password too long.'
            });
        }

        if (password.length < Config.minPasswordLength) {
            return response.json({
                _ok: false,
                _message: 'Password too short.'
            });
        }

        const isUserExisted = !_.isNull(Middleware.checkUserDuplicated(email));
        if (isUserExisted) {
            return response.json({
                _ok: false,
                _message: 'Account already exists.'
            });
        }

        const formattedCouponCode = (typeof promoCode == 'string') ? promoCode.trim().toUpperCase() : null;
        const userParams = {
            Email: email,
            Password: password,

        }

        await UserModel.saveUser()

    },
    setUserOnlineStatus: async (request, response) => {
        const userId = request.param('uid');
        const status = request.param('status');

        if (!_.isUndefined(userId) && !_.isUndefined(status)) {
            Utils.Logger.showLog(Logger.Type.ERROR, `Server 500. Invalid params.`);

            return response.status(500).json({
                _error: 'Server 500 Error.',
                _message: Utils.Errors.client.HTTP_500,
                _ok: false,
            });
        }

        await UserModel.setUserOnlineStatus(userId, status)
            .then((result) => {
                Utils.Logger.showLog(Logger.Type.INFO, `User<id: ${userId}> - Online status updated.`);

                return response.status(200).json({
                    _uid: userId,
                    _ok: true,
                });
            })
            .catch((error) => {
                Utils.Logger.showLog(Logger.Type.ERROR, `User<id: ${userId}> - Failed to update the online status.`);

                return response.status(500).json({
                    _error: error,
                    _message: Utils.Errors.client.HTTP_500,
                    _ok: false,
                });
            });
    },
    getUserById: (request, response, next) => {
        try {
            const userId = request.query.userId;

            if (!_.isEmpty(userId)) {
                return new Promise((resolve, reject) => {
                    UserModel.getUserById(userId)
                        .then(userObj => {
                            if (!_.isEmpty(userObj)) {
                                data = userObj;
                            }

                            resolve(response.status(200).json({
                                _data: data,
                                _ok: true
                            }));
                        }).catch((error) => {
                            // reject(error);
                            reject(response.status(500).json({
                                _error: error,
                                _message: Errors.system.HTTP_500,
                                _ok: false,
                            }));
                        });
                });
            } else {
                return response.status(200).json({
                    _message: 'userId is empty',
                    _data: data,
                    _ok: false
                });
            }
        } catch (error) {
            return response.status(500).json({
                _error: error,
                _message: Errors.system.HTTP_500,
                _ok: false
            });
        }
    },

    getAllUsers: (request, response, next) => {
        try {
            return new Promise((resolve, reject) => {
                UserModel.getAllUsers()
                    .then(userObj => {
                        if (!_.isEmpty(userObj)) {
                            data = userObj;
                        }

                        resolve(response.status(200).json({
                            _data: data,
                            _ok: true
                        }));
                    }).catch((error) => {
                        // reject(error);
                        reject(response.status(500).json({
                            _error: error.toString(),
                            _message: Errors.system.HTTP_500,
                            _ok: false,
                        }));
                    });
            });
        } catch (error) {
            return response.status(500).json({
                _error: error.toString(),
                _message: Errors.system.HTTP_500,
                _ok: false
            });
        }
    },

    activateUser: (request, response, next) => {
        try {
            const userId = request.query.userId;
            const status = (request.query.status === 'true');

            if (_.isBoolean(status) & !_.isEmpty(userId)) {
                return new Promise((resolve, reject) => {
                    UserModel.activateUser(userId, status)
                        .then(userObj => {
                            if (!_.isEmpty(userObj)) {
                                data = userObj;
                            }

                            resolve(response.status(200).json({
                                _data: data,
                                _ok: true
                            }));
                        }).catch((error) => {
                            reject(response.status(500).json({
                                _error: error,
                                _message: Errors.system.HTTP_500,
                                _ok: false,
                            }));
                        });
                });
            } else {
                return response.status(200).json({
                    _message: 'userId or status is empty',
                    _data: data,
                    _ok: false
                });
            }
        } catch (error) {
            return response.status(500).json({
                _error: error,
                _message: Errors.system.HTTP_500,
                _ok: false
            });
        }
    },

    archiveUser: (request, response, next) => {
        try {
            const userId = request.query.userId;

            if (!_.isEmpty(userId)) {
                return new Promise((resolve, reject) => {
                    UserModel.archiveUser(userId)
                        .then(userObj => {
                            if (!_.isEmpty(userObj)) {
                                data = userObj;
                            }

                            resolve(response.status(200).json({
                                _data: data,
                                _ok: true
                            }));
                        }).catch((error) => {
                            reject(response.status(500).json({
                                _error: error,
                                _message: Errors.system.HTTP_500,
                                _ok: false,
                            }));
                        });
                });
            } else {
                return response.status(200).json({
                    _message: 'userId is empty',
                    _data: data,
                    _ok: false
                });
            }
        } catch (error) {
            return response.status(500).json({
                _error: error,
                _message: Errors.system.HTTP_500,
                _ok: false
            });
        }
    },

    restoreUser: (request, response, next) => {
        try {
            const userId = request.query.userId;

            if (!_.isEmpty(userId)) {
                return new Promise((resolve, reject) => {
                    UserModel.restoreUser(userId)
                        .then(userObj => {
                            if (!_.isEmpty(userObj)) {
                                data = userObj;
                            }

                            resolve(response.status(200).json({
                                _data: data,
                                _ok: true
                            }));
                        }).catch((error) => {
                            reject(response.status(500).json({
                                _error: error,
                                _message: Errors.system.HTTP_500,
                                _ok: false,
                            }));
                        });
                });
            } else {
                return response.status(200).json({
                    _message: 'userId is empty',
                    _data: data,
                    _ok: false
                });
            }
        } catch (error) {
            return response.status(500).json({
                _error: error,
                _message: Errors.system.HTTP_500,
                _ok: false
            });
        }
    },
};
