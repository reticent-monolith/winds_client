export default class Dispatch {
    constructor(dispatchState) {
        this.date = new Date(Date.now()).toJSON().split("T")[0]
        this.time = new Date(Date.now()).toJSON().split("T")[1].split(".")[0]
        this.riders = dispatchState.riders
        this.windSpeed = dispatchState.windSpeed
        this.windDegrees = dispatchState.windDegrees
        this.windsInstructor = dispatchState.windsInstructor
        this.btRadio = dispatchState.btRadio
        this.comment = dispatchState.comment
    }
}