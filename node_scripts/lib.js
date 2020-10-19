const chalk = require('chalk')

class Logger {
    static info() {
        console.log(chalk.green('[INFO]'), ...arguments)
    }

    static line(){
        console.log()
    }
}

module.exports = Logger