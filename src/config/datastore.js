import chalk from 'chalk';

const mongoConfig = {
    url: process.env.MONGO_HOST,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
};

const mongodb = async (mongoose) => {
    return await mongoose.connect(mongoConfig.url, {
        auth: {
            user: mongoConfig.user,
            password: mongoConfig.password,
        },
        useCreateIndex: true,
        useNewUrlParser: true,
    })
        .then(() => console.log(chalk.yellow('\u2713 Connected to MongoDB')))
        .catch((error) => console.log(chalk.red('>> Error: ', error)));
};

const postgresql = () => {

};

export default {
    mongodb,
    postgresql
};
