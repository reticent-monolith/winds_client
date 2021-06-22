export default class Dispatch {
    constructor(dispatchState) {
        const date = new Date()
        this.date = [
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        ]
        this.time = [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ]
        this.riders = dispatchState.riders
        this.windSpeed = dispatchState.windSpeed
        this.windDegrees = dispatchState.windDegrees
        this.windsInstructor = dispatchState.windsInstructor
        this.btRadio = dispatchState.btRadio
        this.comment = dispatchState.comment
    }
}