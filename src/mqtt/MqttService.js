import mqtt from "async-mqtt"
import Log from "../utilities/Log";

export default class MqttService {
    constructor(websocketUrl) {
        Log.debug("MQTT Client connecting...")
        try {     
            this.client = mqtt.connect(websocketUrl)
        } catch (err) {
            Log.error(err.stack)
            process.exit()
        }
        Log.debug("MQTT Client connected successfully")

        // When passing async functions as event listeners, make sure to have a try catch block

        const doStuff = async () => {

            console.log("Starting");
            try {
                this.client.subscribe("test");
            } catch (e){
                // Do something about it!
                console.log(e.stack);
                process.exit();
            }
        }

        this.client.on("connect", doStuff);
        this.client.on("message", (topic, message) => {
            console.log(message.toString())
        })
    }
}

