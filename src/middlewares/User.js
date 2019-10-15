
const UserModel = global._mongo.User();

const checkUserDuplicated = (email) => {
    UserModel.getUserByEmail(email)
        .then((result) => result)
        .catch((error) => error);
};

export default {
    checkUserDuplicated,
}
