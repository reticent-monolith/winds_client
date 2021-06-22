import React from "react"

import Log from "../utilities/Log"
import {config} from "../config"

export default class Controls extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            riders: {
                4: {
                    weight: ""
                },
                3: {
                    weight: ""
                },
                2: {
                    weight: ""
                },
                1: {
                    weight: ""
                }
            },
            windSpeed: "0.0",
            windDegrees: "0",
            windsInstructor: "",
            btRadio: "",
            comment: ""
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.props.createDispatch(this.state)
                }}>
                    <input 
                    type="text"
                    value={this.state.comment}
                    placeholder="Add a comment"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            comment: e.target.value
                        })
                    }}
                    ></input>

                    <input
                    type="submit"
                    ></input>
                </form>
            </div>
        )
    }
}