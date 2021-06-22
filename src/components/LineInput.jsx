import React from "react"

import Log from "../utilities/Log"
import { config } from "../config"

export default class LineInput extends React.Component {
    constructor(props) {
        super(props)
        switch (this.props.line) {
            case 4: this.styles.lineDiv.backgroundColor = config.colors.red; break;
            case 3: this.styles.lineDiv.backgroundColor = config.colors.blue; break;
            case 2: this.styles.lineDiv.backgroundColor = config.colors.green; break;
            default: this.styles.lineDiv.backgroundColor = config.colors.yellow;
        }
    }

    styles = {
        lineDiv: {
            backgroundColor: "gray",
            width: "40%",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px"
        },
        label: {
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2em",
            marginRight: "10px"
        },
        input: {
            width: "35px",
            borderRadius: "5px",
            border: "none",
            textAlign: "center",
            height: "1.2em",
            fontSize: "1.2em"
        }
    }

    render() {
        return (
            <div style={this.styles.lineDiv}>
                <label style={this.styles.label}>{`${this.props.line}`}</label>
                <input
                style={this.styles.input}
                type="number"
                ></input>
            </div>
        )
    }
}