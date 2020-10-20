// 通知
let canNotify = false
Notification.requestPermission().then(permission => {
    canNotify = permission === 'granted'
})
function notify() {
    if (canNotify) new Notification(...arguments)
    else console.warn('Notification permission denied.')
}
// 倒计时代码
const code = {
    "Digit1": "1", "Digit2": "2", "Digit3": "3", "Digit4": "4", "Digit5": "5", "Digit6": "6", "Digit7": "7", "Digit8": "8", "Digit9": "9", "Digit0": "0",
    "KeyH": "h", "KeyM": "m", "KeyS": "s", "end": "end",
    "Backspace": "b"
}
const unit = {
    "h": "h",
    "m": "m",
    "s": "s",
    "ms": "ms",
}

function requestFullscreen() {
    const de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
//退出全屏
function exitFullscreen() {
    const de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
}

function fillDigit(str, width) {
    let res = str.toString()
    while (res.length < width) {
        res = '0' + res
    }
    return res
}

function next(state = '', data = '', input) {
    const end = input === 'end'
    const back = input === 'b'
    const mask = ['h', 'm', 's'].includes(input) ? input : 'd'
    let nextState = state
    let nextData = data
    if (back) {
        nextData = data.slice(0, data.length - 1)
        const last = nextData[nextData.length - 1]
        if (state[state.length - 1] !== 'd' || ['h', 'm', 's'].includes(last)) {
            nextState = state.slice(0, state.length - 1)
        }
    } else switch (state) {
        case '':
            if (end) break
            if (!input) {
                nextData = ''
                break
            }
            // d
            if (mask === 'd') {
                nextState = mask
                nextData = input
            }
            break
        case 'd':
            if (end) {
                nextState = 'ds'
                nextData += 's'
                break
            }
            // dh or dm or ds or d
            nextState = mask === 'd' ? 'd' : 'd' + mask
            nextData += input
            break
        case 'dh':
            if (end) break
            // dh or dhd
            if (mask === 'd') {
                nextState = 'dhd'
                nextData += input
            }
            break
        case 'dhd':
            if (end) {
                nextState = 'dhdm'
                nextData += 'm'
                break
            }
            // dhd or dhdm or dhds
            if (mask === 'd') {
                nextData += input
            } else if (mask === 'm') {
                nextData += input
                nextState = 'dhdm'
            } else if (mask === 's') {
                nextData += input
                nextState = 'dhds'
            }
            break
        case 'dhdm':
            if (end) break
            // dhdm or dhdmd
            if (mask === 'd') {
                nextState = 'dhdmd'
                nextData += input
            }
            break
        case 'dhdmd':
            if (end) {
                nextState = 'dhdmds'
                nextData += 's'
                break
            }
            // dhdmd or dhdmds
            if (mask === 'd') {
                nextData += input
            } else if (mask === 's') {
                nextData += input
                nextState = 'dhdmds'
            }
            break
        case 'dm':
            if (end) break
            // dm or dmd
            if (mask === 'd') {
                nextState = 'dmd'
                nextData += input
            }
            break
        case 'dmd':
            if (end) {
                nextState = 'dmds'
                nextData += 's'
                break
            }
            // dmd or dmds
            nextData.s += input
            if (mask === 'd') {
                nextData += input
            } else if (mask === 's') {
                nextData += input
                nextState = 'dmds'
            }
            break
        default:
            // dhdmds or dhds or dmds or ds
            break
    }
    return [nextState, nextData]
}
function getTimestamp(nstate, ndata) {
    const reg = new RegExp(('^' + nstate + '$').replaceAll('d', '([0-9]*)').replace('h', '(h)').replace('m', '(m)').replace('s', '(s)'))
    const m = ndata.match(reg)
    const arr = m.slice(1, m.length)
    const data = { h: 0, m: 0, s: 0 }
    for (let i = 0; i < arr.length / 2; i++) {
        data[arr[i * 2 + 1]] = arr[i * 2], 10
    }
    return parseInt(data.h) * 3600 * 1000 + parseInt(data.m) * 60 * 1000 + parseInt(data.s) * 1000
}
function parseTimestamp(timestamp) {
    let remain = timestamp
    const h = Math.floor(remain / 1000 / 3600)
    remain -= h * 1000 * 3600
    const m = Math.floor(remain / 1000 / 60)
    remain -= m * 1000 * 60
    const s = Math.floor(remain / 1000)
    remain -= s * 1000
    const ms = remain
    return { h, m, s, ms }
}
function formatTime(d) {
    let str = ''
    if (d.h > 0) str += d.h + '小时'
    if (d.m > 0) str += d.m + '分'
    if (d.s > 0) str += d.s + '秒'
    return str
}
document.addEventListener('DOMContentLoaded', () => {
    let string = ''
    let timestamp = 0
    let rawTimestamp = 0
    let timer = null
    let fullscreen = false
    const interval = 57
    const body = document.body
    const input = document.getElementById('input')
    const bg = document.getElementById('bg')
    bg.style.transition = `all ${interval}ms linear`
    const time = {}
    time.h = document.getElementById('time-h')
    time.m = document.getElementById('time-m')
    time.s = document.getElementById('time-s')
    time.ms = document.getElementById('time-ms')
    function setTimestamp(t) {
        timestamp = t > 0 ? t : 0
        const finished = !timestamp && rawTimestamp
        bg.style.width = rawTimestamp ? (timestamp / rawTimestamp * 100) + '%' : '100%'
        const d = parseTimestamp(timestamp)
        for (key in time) {
            if (key === 'ms') {
                time[key].innerText = fillDigit(d[key], 3)
            } else {
                time[key].innerText = fillDigit(d[key], 2)
            }
        }
        let title = formatTime(d) || '倒计时'
        if (finished) {
            body.classList.add('finished')
            notify('时间到！', {
                body: formatTime(parseTimestamp(rawTimestamp)),
                icon: './timer.png',
                vibrate: true
            })
        }
        else body.classList.remove('finished')
        document.title = title
    }
    function process(str) {
        toggleStart(false)
        let [state, data] = next()
        str.split('').filter(i => !!i).map(s => {
            [state, data] = next(state, data, s)
        })
        const [nstate, ndata] = next(state, data, 'end')
        rawTimestamp = getTimestamp(nstate, ndata)
        setTimestamp(rawTimestamp)
        input.innerText = data
        return { data, nstate, ndata }
    }
    function toggleStart(start = true) {
        if (timer || !start) {
            window.clearInterval(timer)
            timer = null
        } else {
            if (!timestamp) reset()
            else {
                timer = window.setInterval(() => {
                    setTimestamp(timestamp - interval)
                    if (timestamp === 0) toggleStart(false)
                }, interval)
            }
        }
    }
    function reset() {
        toggleStart(false)
        setTimestamp(rawTimestamp)
    }
    function clear() {
        string = ''
        process(string)
    }
    function toggleFullscreen() {
        if (fullscreen) {
            exitFullscreen()
            fullscreen = false
        } else {
            requestFullscreen()
            fullscreen = true
        }
    }
    body.addEventListener('keydown', e => {
        if (e.code === 'KeyR') reset()
        else if (e.code === 'KeyC') clear()
        else if (e.code === 'KeyF') toggleFullscreen()
        else if (e.code === 'Space' || e.code === 'Enter') toggleStart()
        else if (Object.keys(code).includes(e.code)) {
            string += code[e.code]
            process(string)
        }
    })
    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            fullscreen = true;
        } else {
            fullscreen = false;
        }
    });
    process(string)
})