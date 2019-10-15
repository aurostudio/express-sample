import _ from 'lodash';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

module.exports = () => {
    const { Schema } = mongoose;

    /* Create a schema */
    const UserSchema = new Schema({
        UserProfile: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
        Email: { type: String, maxLength: 100, required: true, index: true },
        Username: { type: String, maxLength: 30, index: true },
        Password: { type: String, maxLength: 64, required: true },
        AvatarColor: { type: String, maxLength: 10 },
        PilotCode: { type: String, maxLength: 6 },
        ActivationCode: { type: String, maxLength: 6 },
        ResetCode: { type: String, maxLength: 19 },
        ResetExpiration: { type: Date },
        PromotionCode: { type: String, maxLength: 11 },
        ReferralId: { type: Number },
        NumberOfReferrals: { type: Number },
        VerificationDate: { type: Date },
        IsDiscountAvailable: { type: Boolean, default: false },
        IsPushEnabled: { type: Boolean, default: false },
        IsEmailEnabled: { type: Boolean, default: false },
        IsVerified: { type: Boolean, default: false },
        IsActive: { type: Boolean, default: false },
        IsOnline: { type: Boolean, default: false },
        IsArchived: { type: Boolean, default: false },
        LastLoginDate: { type: Date },
        CreatedAt: { type: Date, default: Date.now },
        UpdatedAt: { type: Date, default: Date.now },
    });

    /* Encrypt users' passwords using bcrypt */
	UserSchema.pre('save', function(next) {
		// Assign user model to variable user
		const user = this;

		// Generate a salt and callback
		bcrypt.genSalt(salt, function(error, salt) {
			if (error) { return next(error); }

			// Hash (encrypt) our password using the salt
			bcrypt.hash(user.Password, salt, null, function(_error, hash) {
				if (_error) { return next(_error); }

				// Overwrite plain text password with encrypted password
				user.Password = hash;
				next();
			});
		});

	});

    /* Decrypt and compare users' passwords */
    UserSchema.methods.comparePassword = (userPassword, callback) => {
        bcrypt.compare(userPassword, this.Password, (error, isMatch) => {
            return error ? callback(error, null) : callback(null, isMatch);
        });
    };

    /* Save Data to User collection */
    UserSchema.methods.saveUser = (data) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').create(data)
                .then((newUser) => resolve(newUser))
                .catch(error => reject(error));
        });
    };

    /* Get All Users */
    UserSchema.methods.getAllUsers = () => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').find().then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false).lean()
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* Get User by UserId */
    UserSchema.methods.getUserById = (userId) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').find({ _id: userId }).then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false).lean()
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* Get User by Email */
    UserSchema.methods.getUserByEmail = (email) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').find({ Email: email }).then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false).lean()
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* Activate User */
    UserSchema.methods.activateUser = (userId) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').findByIdAndUpdate(userId, { $set: { IsActive: true } }, { new: true }).then((user) => !_.isEmpty(user) ? user : false)
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* De-Activate User */
    UserSchema.methods.deactivateUser = (userId) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').findByIdAndUpdate(userId, { $set: { IsActive: false } }, { new: true }).then((user) => !_.isEmpty(user) ? user : false)
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* Set User Public */
    UserSchema.methods.setUserPublic = (userId) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').findByIdAndUpdate(userId, { $set: { IsPublic: true } }, { new: true }).then((user) => !_.isEmpty(user) ? user : false)
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* Set User Un-Public */
    UserSchema.methods.setUserUnPublic = (userId) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').findByIdAndUpdate(userId, { $set: { IsPublic: false } }, { new: true }).then((user) => !_.isEmpty(user) ? user : false)
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* Set User Online Status */
    UserSchema.methods.setUserOnlineStatus = (userId, status) => {
        return new Promise((resolve, reject) => {
            mongoose.model('User').findByIdAndUpdate(userId, { $set: { IsOnline: status } }, { new: true }).then((user) => !_.isEmpty(user) ? user : false)
                .then((result) => resolve(result)
                    .catch((error) => reject(error)));
        });
    };

    /* Create a collection with the predefined schema */
    return mongoose.model('User', UserSchema);
};
