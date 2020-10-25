const chalk = require('chalk')

class Logger {
    static info() {
        console.log(chalk.green('[INFO]'), ...arguments)
    }

    static line(){
        console.log()
    }

    static error(){
        console.error(chalk.red('[ERROR]'), ...arguments)
    }
}

module.exports = Logger