import { Logger } from './logger.js'
const logger = new Logger('')

export function print() {
    const prefix = logger.getPrefix()
    logger.setPrefix('CODE')
    logger.log(...arguments)
    logger.setPrefix(prefix)
}

export function important(){
    logger.warn(...arguments)
}

export function note() {
    logger.log(...arguments)
}

export function section(name, arg1, arg2) {
    let f,g
    if(!arg1) g = logger.groupCollapsed
    else if (arg2) {
        g = logger.groupCollapsed
        f = arg2
    } else{
        g = logger.group
        f = arg1
    }
    g(name)
    if(f)f()
    logger.groupEnd()
}