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
            width: "100%",
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
            fontSize: "1.2em",
            marginRight: "10px"
        },
        select: {
            width: "60px",
            borderRadius: "5px",
            border: "none",
            textAlign: "center",
            height: "1.3em",
            fontSize: "1.2em",
            background: "white",
            marginRight: "10px"

        }
    }

    render() {
        return (
            <div style={this.styles.lineDiv}>

                {/* label */}
                <label style={this.styles.label}>{`${this.props.line}`}</label>

                {/* weight */}
                <input
                    style={this.styles.input}
                    type="number"
                    value={this.props.data.weight}
                    onChange={e => {
                        this.props.setState(
                            this.props.line,
                            "weight",
                            e.target.value
                        )
                    }}
                ></input>

                {/* front slider */}
                <select
                    style={this.styles.select}
                    value={this.props.data.frontSlider || ""}
                    onChange={e => {
                        this.props.setState(
                            this.props.line,
                            "frontSlider",
                            e.target.value
                        )
                    }}
                >
                    <option value="BLACK">S1</option>
                    <option value="OLD_RED">SO2</option>
                    <option value="NEW_RED">SN2</option>
                    <option value=""></option>
                </select>

                {/* middle slider */}
                <select
                    style={this.styles.select}
                    value={this.props.data.middleSlider || ""}
                    onChange={e => {
                        this.props.setState(
                            this.props.line,
                            "middleSlider",
                            e.target.value
                        )
                    }}
                >
                    <option value="OLD_RED">SO2</option>
                    <option value="NEW_RED">SN2</option>
                    <option value=""></option>
                </select>

                {/* rear slider */}
                <select
                    style={this.styles.select}
                    value={this.props.data.rearSlider || ""}
                    onChange={e => {
                        this.props.setState(
                            this.props.line,
                            "rearSlider",
                            e.target.value
                        )
                    }}
                >
                    <option value="YELLOW">S3</option>
                    <option value=""></option>
                </select>

                {/* added weight */}
                <input
                    style={this.styles.input}
                    type="number"
                    value={this.props.data.addedWeight}
                    onChange={e => {
                        this.props.setState(
                            this.props.line,
                            "addedWeight",
                            e.target.value
                        )
                    }}
                ></input>

                {/* trolley */}
                <input
                    style={this.styles.input}
                    type="number"
                    value={this.props.data.trolley}
                    onChange={e => {
                        this.props.setState(
                            this.props.line,
                            "trolley",
                            e.target.value
                        )
                    }}
                ></input>

            </div>
        )
    }
}