const logLevel = ['debug', 'log', 'warn', 'error']
const logLevelHas = (level) => {
    return logLevel.indexOf(level) >= 0
}

class Logger {
    constructor(prefix, level = 'log') {
        this.level = level
        this.setPrefix(prefix)
        this.methodToColorMap = {
            debug: '#7f8c8d', // Gray
            log: '#2ecc71', // Green
            warn: '#f39c12', // Yellow
            error: '#c0392b', // Red
            groupCollapsed: '#3498db', // Blue
            group: null, // No colored prefix on group
            groupEnd: null // No colored prefix on groupEnd
        }
        for (const method of Object.keys(this.methodToColorMap)) {
            this[method] = (...args) => {
                this._print(method, args)
            }
        }
    }

    _print(method, args) {
        const styles = [
            `color: ${this.methodToColorMap[method]}`,
            'font-weight: bold'
        ]
        const logPrefix = ['%c' + this.prefix, styles.join(';')]
        if (this._shouldDo(method)) {
            console[method](...logPrefix, ...args)
        }
    }

    setLogLevel(level) {
        if (!logLevelHas(level)) return false
        else {
            this.level = level
        }
    }

    _shouldDo(method) {
        if (logLevelHas(method)) {
            return logLevel.indexOf(method) >= logLevel.indexOf(this.level)
        } else {
            return true
        }
    }

    setPrefix(prefix) {
        this.prefix = prefix ? `[${prefix}]` : ''
    }

    getPrefix() {
        return this.prefix.slice(1, this.prefix.length - 1) || ''
    }
}

export { Logger }
