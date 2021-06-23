import React from "react"

import Log from "../utilities/Log"
import {config} from "../config"
import LineInput from "./LineInput"

export default class Controls extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            riders: {
                4: {
                    weight: 0
                },
                3: {
                    weight: 0
                },
                2: {
                    weight: 0
                },
                1: {
                    weight: 0
                }
            },
            windSpeed: "",
            windDegrees: "",
            windsInstructor: "",
            btRadio: "",
            comment: ""
        }
        this.styles.lineDiv[4] = {
            ...this.styles.lineDiv.base,
            backgroundColor: config.colors.red
        }
        this.styles.lineDiv[3] = {
            ...this.styles.lineDiv.base,
            backgroundColor: config.colors.blue
        }
        this.styles.lineDiv[2] = {
            ...this.styles.lineDiv.base,
            backgroundColor: config.colors.green
        }
        this.styles.lineDiv[1] = {
            ...this.styles.lineDiv.base,
            backgroundColor: config.colors.yellow
        }
        this.styles.inputL = {
            ...this.styles.input,
            width: "100px"
        }
    }

    styles = {
        lineDiv: {
            base: {
                display: "flex",
                justifyContent: "space-around",
                borderRadius: "5px",
                padding: "5px",
            }
        },
        label: {
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2em",
        },
        input: {
            width: "40px",
            borderRadius: "5px",
            border: "none",
            textAlign: "center",
            height: "1.2em",
            fontSize: "1.2em",
        },
        select: {
            width: "60px",
            borderRadius: "5px",
            border: "none",
            textAlign: "center",
            height: "1.3em",
            fontSize: "1.2em",
            background: "white",

        },
        container: {
            display: "flex",
            width: "100%",
            height: "160px",
            padding: "5px"
        },
        lineContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40%",
            height: "100%"
        },
        windContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40%",
            height: "100%",
            backgroundColor: "gray"
        }
    }

    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                this.props.createDispatch(this.state)
                this.clearInputs()
            }}>
                <div style={this.styles.container}>

                    <div style={this.styles.lineContainer}>
                        {[4,3,2,1].map(line => {
                            return (
                                <div key={`line${line}`} style={this.styles.lineDiv[line]}>
                                    {/* label */}
                                    <label style={this.styles.label}>{`${line}`}</label>

                                    {/* weight */}
                                    <input
                                        style={this.styles.input}
                                        type="number"
                                        value={this.state.riders[line].weight === 0 ? "" : this.state.riders[line].weight}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.riders)
                                            copy[line].weight = e.target.value
                                            this.setState({
                                                ...this.state,
                                                riders: copy
                                            })
                                        }}
                                    ></input>

                                    {/* front slider */}
                                    <select
                                        style={this.styles.select}
                                        value={this.state.riders[line].frontSlider || ""}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.riders)
                                            copy[line].frontSlider = e.target.value
                                            this.setState({
                                                ...this.state,
                                                riders: copy
                                            })
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
                                        value={this.state.riders[line].middleSlider || ""}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.riders)
                                            copy[line].middleSlider = e.target.value
                                            this.setState({
                                                ...this.state,
                                                riders: copy
                                            })
                                        }}
                                    >
                                        <option value="OLD_RED">SO2</option>
                                        <option value="NEW_RED">SN2</option>
                                        <option value=""></option>
                                    </select>

                                    {/* rear slider */}
                                    <select
                                        style={this.styles.select}
                                        value={this.state.riders[line].rearSlider || ""}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.riders)
                                            copy[line].rearSlider = e.target.value
                                            this.setState({
                                                ...this.state,
                                                riders: copy
                                            })
                                        }}
                                    >
                                        <option value="YELLOW">S3</option>
                                        <option value=""></option>
                                    </select>

                                    {/* added weight */}
                                    <input
                                        style={this.styles.input}
                                        type="number"
                                        value={this.state.riders[line].addedWeight}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.riders)
                                            copy[line].addedWeight = e.target.value
                                            this.setState({
                                                ...this.state,
                                                riders: copy
                                            })
                                        }}
                                    ></input>

                                    {/* trolley */}
                                    <input
                                        style={this.styles.input}
                                        type="number"
                                        value={this.state.riders[line].trolley}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.riders)
                                            copy[line].trolley = e.target.value
                                            this.setState({
                                                ...this.state,
                                                riders: copy
                                            })
                                        }}
                                    ></input>
                                </div>
                            )
                        })}
                    </div>

                    <div style={this.styles.windContainer}>
                        {/* wind speed input */}
                        <input
                            type="number"
                            style={this.styles.input}
                            value={this.state.windSpeed}
                            onChange={e => {
                                this.setState({
                                    ...this.state, 
                                    windSpeed: e.target.value
                                })
                            }}
                        ></input>

                        {/* wind degrees input */}
                        <input
                            type="number"
                            style={this.styles.input}
                            value={this.state.windDegrees}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    windDegrees: e.target.value
                                })
                            }}
                        ></input>

                        {/* winds instructor */}
                        <input
                            type="text"
                            style={this.styles.inputL}
                            value={this.state.windsInstructor}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    windsInstructor: e.target.value
                                })
                            }}
                        ></input>

                        {/* bt radio */}
                        <input
                            type="text"
                            style={this.styles.inputL}
                            value={this.state.btRadio}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    btRadio: e.target.value
                                })
                            }}
                        ></input>

                        {/* Comment Input */}
                        <textarea
                            value={this.state.comment}
                            placeholder="Add a comment"
                            onChange={(e) => {
                                this.setState({
                                    ...this.state,
                                    comment: e.target.value
                                })
                            }}
                        ></textarea>
                    </div>
                    

                    <input
                        type="submit"
                    ></input>
                </div>
            </form>
        )
    }

    clearInputs() {
        this.setState({
            riders: {
                4: {
                    weight: 0
                },
                3: {
                    weight: 0
                },
                2: {
                    weight: 0
                },
                1: {
                    weight: 0
                }
            },
            windSpeed: "",
            windDegrees: "",
            windsInstructor: "",
            btRadio: "",
            comment: ""
        })
    }
}