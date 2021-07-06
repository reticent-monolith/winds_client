import mqtt from "async-mqtt"
import Log from "../utilities/Log";

export default class MqttService {
    constructor(websocketUrl, messageHandler) {
        Log.debug("MQTT Client connecting...")
        try {     
            this.client = mqtt.connect(websocketUrl)
        } catch (err) {
            Log.error(err.stack)
            process.exit()
        }

        this.client.on("connect", () => {
            Log.debug("MQTT Client connected successfully!")
            try {
                this.client.subscribe(["+/newRider", "+/confirmation", "+/ping"])
            } catch (err) {
                Log.error(err.stack)
                process.exit()
            }
        })

        this.client.on("message", function(topic, message) {
            messageHandler(topic, message)
        })
    }

    async send(purpose, message) {
        this.client.publish(purpose, message)
    }

    end() {
        this.client.end()
    }
}
