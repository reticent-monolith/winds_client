import React from "react"
import Log from "../utilities/Log"
import {config} from "../config"
import RiderCard from "./RiderCard"


export default class DispatchCard extends React.Component {

    componentDidMount() {
        Log.debug(`Dispatch ${this.props.data._id} Loaded`)
    }

    styles = {
        container: {
            display: "flex",
            width: "95%",
            justifyContent: "space-between"
        },
        time: {
            display: "flex",
            alignItems: "center"

        },
        wind: {
            display: "flex",
            justifyContent: "space-between",
            width: "100px",
            alignItems: "center",
            
            speed: {

            },
            fastSpeed: {
                color: "red",
                fontWeight: "bold"
            },
            mph: {
                fontSize: "0.7em"
            },
            degrees: {

            }
        }
    }

    render() {
        return (
            <div style={this.styles.container}>
                {this.time()}
                <RiderCard color={config.colors.red} rider={this.props.data.riders[4]}/>
                <RiderCard color={config.colors.blue} rider={this.props.data.riders[3]}/>
                <RiderCard color={config.colors.green} rider={this.props.data.riders[2]}/>
                <RiderCard color={config.colors.yellow} rider={this.props.data.riders[1]}/>
                {this.wind()}
            </div>
        )
    }

    time() {

        
        const time = this.props.data.time
        
        Log.debug(`${time} for ${this.props.data._id}`)


        // const hours = 
        //     this.props.data.time[0].toString().length < 2 ? `0${this.props.data.time[0]}` : this.props.data.time[0]
        // const minutes = 
        //     this.props.data.time[1].toString().length < 2 ? `0${this.props.data.time[1]}` : this.props.data.time[1]
        // const seconds = 
        //     this.props.data.time[2].toString().length < 2 ? `0${this.props.data.time[2]}` : this.props.data.time[2]
        // return (
        //     <div style={this.styles.time}>
        //         <span>{`${hours}:${minutes}:${seconds}`}</span>
        //     </div>
        // ) 
    }

    wind() {
        const speedStyle = this.props.data.windSpeed > 45 ? this.styles.wind.fastSpeed : this.styles.wind.speed
        return (
            <div style={this.styles.wind}>
                <span style={speedStyle}>{this.props.data.windSpeed} <span style={speedStyle}>mph</span></span>
                <span style={this.styles.wind.degrees}>{this.props.data.windDegrees}</span>
            </div>
        )
    }
}