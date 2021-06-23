import React from "react"
import Log from "../utilities/Log"
import {config} from "../config"
import RiderCard from "./RiderCard"


export default class DispatchCard extends React.Component {

    componentDidMount() {
        Log.debug(`Dispatch ${this.props.data._id} Loaded`)
    }

    styles = {
        color: config.colors.red
    }

    render() {
        return (
            <div>
                {this.props.data._id}
                <div>

                </div>
                
                <RiderCard line="4"/>
                <RiderCard line="3"/>
                <RiderCard line="2"/>
                <RiderCard line="1"/>
                
                <div>

                </div>

                <div>

                </div>

                <div>

                </div>

                <div>

                </div>


            </div>
        )
    }
}