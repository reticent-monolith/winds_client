export default class Log {
    static debug(text, obj) {
        console.debug(`|#| WINDS DEBUG: ${text}`)
        console.log(obj)
        console.debug("|#| ======================================")
    }

    static error(text) {
        console.error(`|!!| WINDS ERROR: ${text}`)
    }
}