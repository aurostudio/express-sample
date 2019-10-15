import chalk from 'chalk';

module.exports = () => {
    const Type = {
        INFO: 'INFO',
        WARNING: 'WARNING',
        ERROR: 'ERROR',
    };

    const showLog = (type, message) => {
        const finalMessage = `${type} :: ${message}`;
        switch (type) {
            case Type.INFO:
                console.log(chalk.blueBright(finalMessage));
            case Type.WARNING:
                console.log(chalk.yellow(finalMessage));
            case Type.ERROR:
                console.log(chalk.red(finalMessage));
            default:
                console.log(chalk.green(finalMessage));
        }
    };

    return {
        Type,
        showLog,
    };
}
