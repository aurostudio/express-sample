import _ from 'lodash';
import mongoose from 'mongoose';

module.exports = () => {
    const { Schema } = mongoose;

    /* Create a schema */
    const UserProfileSchema = new Schema({
        Address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
        FirstName: { type: String, maxLength: 50, required: true, index: true },
        MiddleName: { type: String, maxLength: 50, required: true },
        LastName: { type: String, maxLength: 50, required: true, index: true },
        DateOfBirth: { type: String, maxLength: 20 },
        Gender: { type: String, maxLength: 10, required: true },
        NationalId: { type: String, maxLength: 15, required: true },
        SIN: { type: String, maxLength: 10, required: true },
        PhoneNumber: { type: String },
        Language: { type: Array },
        Timezone: { type: String, maxLength: 50 },
        CreatedAt: { type: Date, default: Date.now },
        UpdatedAt: { type: Date, default: Date.now },
    });

    /* Get UserProfile document */
    UserProfileSchema.methods.getUserProfile = function (profileId) {
        return new Promise((resolve, reject) => {
            UserProfile.find({ _id: profileId, IsActive: true }).then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false)
                .then((up) => resolve(up)
                    .catch((error) => reject(error)));
        });
    };

    /* Save data to UserProfile collection */
    UserProfileSchema.methods.saveUserProfile = function (data) {
        return new Promise((resolve, reject) => {
            UserProfile.create(data).then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false)
                .then((up) => resolve(up)
                    .catch((error) => reject(error)));
        });
    };

    /* Update data to UserProfile collection */
    UserProfileSchema.methods.updateUserProfile = function (data, profileId) {
        return new Promise((resolve, reject) => {
            UserProfile.findByIdAndUpdate(profileId, { $set: data }, { new: true }).then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false)
                .then((up) => resolve(up)
                    .catch((error) => reject(error)));
        });
    };

    /* Archive UserProfile document */
    UserProfileSchema.methods.archiveUserProfile = function (profileId) {
        return new Promise((resolve, reject) => {
            UserProfile.findByIdAndUpdate(profileId, { $set: { IsActive: false } }, { new: true }).then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false)
                .then((up) => resolve(up)
                    .catch((error) => reject(error)));
        });
    };

    /* Delete UserProfile document */
    UserProfileSchema.methods.removeUserProfile = function (profileId) {
        return new Promise((resolve, reject) => {
            UserProfile.findByIdAndRemove(profileId).then((userProfile) => !_.isEmpty(userProfile) ? userProfile : false)
                .then((up) => resolve(up)
                    .catch((error) => reject(error)));
        });
    };

    /* Create a table with the predefined schema */
    return mongoose.model('UserProfile', UserProfileSchema);
};
