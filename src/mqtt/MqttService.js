import mqtt from "async-mqtt"
import Log from "../utilities/Log";

export default class MqttService {
    constructor(websocketUrl) {
        Log.debug("MQTT Client connecting...")
        this.client = mqtt.connect(websocketUrl)

        // When passing async functions as event listeners, make sure to have a try catch block

        const doStuff = async () => {

            console.log("Starting");
            try {
                await this.client.publish("wow/so/cool", "It works!");
                // This line doesn't run until the server responds to the publish
                await this.client.end();
                // This line doesn't run until the client has disconnected without error
                console.log("Done");
            } catch (e){
                // Do something about it!
                console.log(e.stack);
                process.exit();
            }
        }

        this.client.on("connect", doStuff);
    }
}