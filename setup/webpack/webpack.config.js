const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
    entry: ['webpack/hot/poll?1000', './src/index'],
    watch: true,
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                BUILD_TARGET: JSON.stringify('server.js'),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                APP_NAME: JSON.stringify(process.env.APP_NAME),
                APP_VERSION: JSON.stringify(process.env.APP_NAME),
                APP_SID: JSON.stringify(process.env.APP_SID),
                APP_SECRET: JSON.stringify(process.env.APP_SECRET),
                APP_URL: JSON.stringify(process.env.APP_URL),
                APP_PORT: JSON.stringify(process.env.APP_PORT),
                MAX_AGE: JSON.stringify(process.env.MAX_AGE),
                DATABASE: {
                    MONGO: {
                        HOST: JSON.stringify(process.env.DATABASE.MONGO.HOST),
                        USER: JSON.stringify(process.env.DATABASE.MONGO.USER),
                        PASSWORD: JSON.stringify(process.env.DATABASE.MONGO.PASSWORD)
                    }
                },
                STRIPE: {
                    PUBLISHABLE_KEY: JSON.stringify(process.env.PUBLISHABLE_KEY),
                    SECRET_KEY: JSON.stringify(process.env.SECRET_KEY),
                    CHARGE_DESCRIPTION: JSON.stringify(process.env.CHARGE_DESCRIPTION)
                },
                ALGOLIA: {
                    APPLICATION_ID: JSON.stringify(process.env.ALGOLIA.APPLICATION_ID),
                    API_KEY: JSON.stringify(process.env.ALGOLIA.API_KEY)
                },
                PUSH: {
                    APP_ID: 'b3d21027',
                    PUBLIC_KEY: JSON.stringify(process.env.PUSH.PUBLIC_KEY),
                    SECRET_KEY: JSON.stringify(process.env.PUSH.SECRET_KEY)
                },
                INSTANT_CASHBACK: {
                    AUTH_TOKEN: JSON.stringify(process.env.INSTANT_CASHBACK.AUTH_TOKEN)
                },
                DATA_DIRECTORY: JSON.stringify(process.env.DATA_DIRECTORY)

            }
        })
    ],
    output: { path: path.join(__dirname, '../../dist'), filename: 'server.js' }
};
