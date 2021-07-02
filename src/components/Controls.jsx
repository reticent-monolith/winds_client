import React from "react"
import Button from 'react-bootstrap/Button';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from 'date-fns/esm/locale'
import {config} from "../config"
import Log from "../utilities/Log";
import CommentModal from "../components/modals/CommentModal"
import MqttService from "../mqtt/MqttService";
import drip from "../res/sounds/drip.mp3"
import UIfx from "uifx"

// Register locale for DatePickers
registerLocale('enGB', enGB)

const WS_URL = "ws://192.168.1.133:8883"

export default class Controls extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dispatch: {
                riders: {
                    4: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0,
                        frontSlider: "",
                        middleSlider: "",
                        rearSlider: "",
                        speed: 0
                    },
                    3: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0,
                        frontSlider: "",
                        middleSlider: "",
                        rearSlider: "",
                        speed: 0
                    },
                    2: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0,
                        frontSlider: "",
                        middleSlider: "",
                        rearSlider: "",
                        speed: 0
                    },
                    1: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0,
                        frontSlider: "",
                        middleSlider: "",
                        rearSlider: "",
                        speed: 0
                    }
                },
                windSpeed: "",
                windDegrees: "",
                windsInstructor: "",
                btRadio: "",
                comment: ""
            },
            confirmations: {
                4: false,
                3: false,
                2: false,
                1: false
            },
            commentModalIsOpen: false,
            startDate: new Date(),
            endDate: new Date()

                
        }

        this.styles = {
            lineDiv: {
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
            },
            label: {
                color: "white",
                fontWeight: "bold",
                fontSize: "1em",
                paddingBottom: "0",
                height: "1.1em"
            },
            input: {
                width: "40px",
                borderRadius: "5px",
                border: "none",
                textAlign: "center",
                height: "1.2em",
                fontSize: "1.2em",
                backgroundColor: config.colors.light
            },
            inputL: {
                width: "80px",
                borderRadius: "5px",
                border: "none",
                textAlign: "center",
                height: "1.2em",
                fontSize: "1.2em",
                backgroundColor: config.colors.light
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
                justifyContent: "center",
                width: "100%",
                minWidth: "1080px",
                height: "200px",
                padding: "5px",
                background: "white",
                zIndex: "2",
                position: "fixed",
                top: "0px",
                paddingBottom: "20px"
            },
            lineContainer: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "400px",
                height: "100%"
            },
            windContainer: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: "0 10px",
                width: "200px",
                height: "100%",
                borderRadius: "5px",
                row: {
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    label: {
                        color: "black",
                        fontSize: "0.7em"
                    }
                }
            },
            textArea: {
                border: "none",
                borderRadius: "5px",
                width: "500px",
                height: "300px"
            },
            
            topLabels: {
                fontSize: "0.7em",
                width: "90%",
                textAlign: "center",
                display: "flex",
                padding: "0 15px 0 30px",
                justifyContent: "space-between",
                weight: {width: "34px"},
                front: {width: "60px"},
                middle: {width: "60px"},
                rear: {width: "60px"},
                added: {width: "44px"},
                trolley: {width: "44px"},
            },
            buttonContainer: {
                display: "flex",
                flexDirection: "column",
                width: "200px",
                justifyContent: "space-between"
            },
            button: {
                height: "40px"
            },
            confirmed: {
                fontSize: "0.7em",
                fontWeight: "bold"
            }
        }

        // set up drip sound effect
        this.confirmSound = new UIfx(
            drip,
            {volume: 1}
        )
        this.unconfirmSound = new UIfx(
            drip,
            {volume: 1}
        );
        this.dataReceivedSound = new UIfx(
            drip,
            {volume: 1}
        );
    }

    //   +-------------+
    //  | App Methods |
    // +-------------+

    handleMessage = (topicString, message) => {
        // split topic for line and purpose
        let [line, topic] = topicString.split("/")

        try {
            line = parseInt(line, 10)
        } catch (err) {
            Log.error(err)
            return
        }

        if (topic !== "confirmation") {
            this.setState({
                ...this.state,
                dispatch: {
                    ...this.state.dispatch,
                    riders: {
                        ...this.state.dispatch.riders,
                        [line]: {
                            ...this.state.dispatch.riders[line],
                            [topic]: parseInt(message.toString())
                        }
                    }
                }
            })
            this.dataReceivedSound.play()
        } else {
            this.setState({
                ...this.state,
                confirmations: {
                    ...this.state.confirmations,
                    [line]: message.toString() === "true" ? true : false
                }
            })
            if (message.toString() === "true") {
                this.confirmSound.play()
            } else {
                this.unconfirmSound.play()
            }
        }

    }


    clearInputs = () => {
        this.setState({
            ...this.state,
            dispatch: {
                riders: {
                    4: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0
                    },
                    3: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0
                    },
                    2: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0
                    },
                    1: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0
                    }
                },
                windSpeed: "",
                windDegrees: "",
                windsInstructor: "",
                btRadio: "",
                comment: ""
            },
            confirmations: {
                4: false,
                3: false,
                2: false,
                1: false
            }
        })
    }

    openCommentModal = () => {
        this.setState({
            commentModalIsOpen: true
        })
    }

    editComment = (comment) => {
        this.setState({
            ...this.state,
            dispatch: {
                ...this.state.dispatch,
                comment: comment
            }
        })
    }

    closeCommentModal = () => {
        this.setState({
            commentModalIsOpen: false
        })
    }

    checkIfConfirmed = line => {
        let style = {
            fontSize: "0.7em",
            fontWeight: "bold",
            color: "white"
        }
        if (this.state.confirmations[line] === true) {
            style.visibility = "visible"
        } else {
            style.visibility = "hidden"
        }
        return style
    }

    //   +-----------------+
    //  | React Lifecycle |
    // +-----------------+

    componentDidMount() {
        this.client = new MqttService(WS_URL, this.handleMessage)
    }

    componentWillUnmount() {
        this.client.end()
    }


    render() {
        const {dispatch, startDate, endDate} = this.state
        return (
            <div style={this.styles.container}>
                <CommentModal 
                    isOpen={this.state.commentModalIsOpen}
                    close={this.closeCommentModal}
                    editComment={this.editComment}
                />
                <div style={this.styles.buttonContainer}>
                    {/* date picker */}
                    <DatePicker
                        selected={startDate}
                        dateFormat="yyyy-MM-dd"
                        locale="enGB"
                        onChange={date => {
                            this.setState({
                                startDate: new Date(date),
                                endDate: new Date(date)
                            })
                        }}
                    >
                    </DatePicker>

                    <DatePicker
                        selected={endDate}
                        dateFormat="yyyy-MM-dd"
                        locale="enGB"
                        onChange={date => {
                            this.setState({ endDate: new Date(date) })
                        }}
                    >
                    </DatePicker>

                    <Button
                        style={this.styles.button}
                        variant="primary"
                        onClick={e => {
                            Log.debug(new Date(startDate).toJSON())
                            Log.debug(endDate)
                            this.props.getByRange(
                                new Date(startDate).toJSON().toString().split("T")[0], 
                                new Date(endDate).toJSON().toString().split("T")[0]
                            )
                        }}
                    >Apply</Button>

                </div>
                <div style={this.styles.lineContainer}>
                    <div style={this.styles.topLabels}>
                        <span style={this.styles.topLabels.weight}>Weight</span>
                        <span style={this.styles.topLabels.front}>Front</span>
                        <span style={this.styles.topLabels.middle}>Middle</span>
                        <span style={this.styles.topLabels.rear}>Rear</span>
                        <span style={this.styles.topLabels.added}>Added</span>
                        <span style={this.styles.topLabels.trolley}>Trolley</span>
                    </div>
                    
                    {[4,3,2,1].map(line => {
                        return (
                            <div key={`line${line}`} style={{
                                ...this.styles.lineDiv,
                                backgroundColor: config.colors[line]
                            }}>
                                {/* label */}
                                <label style={this.styles.label}>{`${line}`}</label>

                                {/* weight */}
                                <input
                                    style={this.styles.input}
                                    type="number"
                                    value={dispatch.riders[line].weight === 0 ? "" : dispatch.riders[line].weight}
                                    onFocus={e => e.currentTarget.select()}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...dispatch,
                                                riders: {
                                                    ...dispatch.riders,
                                                    [line]: {
                                                        ...dispatch.riders[line],
                                                        weight: e.target.value
                                                    }
                                                }
                                            }
                                        })
                                    }}
                                ></input>

                                {/* front slider */}
                                <select
                                    style={this.styles.select}
                                    value={dispatch.riders[line].frontSlider || ""}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...dispatch,
                                                riders: {
                                                    ...dispatch.riders,
                                                    [line]: {
                                                        ...dispatch.riders[line],
                                                        frontSlider: e.target.value,
                                                        addedWeight: 0
                                                    }
                                                }
                                            }
                                        })
                                        this.client.send(line, "frontSlider", e.target.value)
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
                                    value={dispatch.riders[line].middleSlider || ""}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...dispatch,
                                                riders: {
                                                    ...dispatch.riders,
                                                    [line]: {
                                                        ...dispatch.riders[line],
                                                        middleSlider: e.target.value,
                                                        addedWeight: 0
                                                    }
                                                }
                                            }
                                        })
                                        this.client.send(line, "middleSlider", e.target.value)
                                    }}
                                >
                                    <option value="OLD_RED">SO2</option>
                                    <option value="NEW_RED">SN2</option>
                                    <option value=""></option>
                                </select>

                                {/* rear slider */}
                                <select
                                    style={this.styles.select}
                                    value={dispatch.riders[line].rearSlider || ""}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...dispatch,
                                                riders: {
                                                    ...dispatch.riders,
                                                    [line]: {
                                                        ...dispatch.riders[line],
                                                        rearSlider: e.target.value,
                                                        addedWeight: 0
                                                    }
                                                }
                                            }
                                        })
                                        this.client.send(line, "rearSlider", e.target.value)
                                    }}
                                >
                                    <option value="YELLOW">S3</option>
                                    <option value=""></option>
                                </select>

                                {/* added weight */}
                                <input
                                    style={this.styles.input}
                                    type="number"
                                    value={dispatch.riders[line].addedWeight === 0 ? "" : dispatch.riders[line].addedWeight}
                                    onFocus={e => e.currentTarget.select()}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...dispatch,
                                                riders: {
                                                    ...dispatch.riders,
                                                    [line]: {
                                                        ...dispatch.riders[line],
                                                        addedWeight: e.target.value,
                                                        frontSlider: null,
                                                        middleSlider: null,
                                                        rearSlider: null
                                                    }
                                                }
                                            }
                                        })
                                       // this.client.send(line, "addedWeight", e.target.value)
                                    }}
                                    onBlur={e=>{this.client.send(line, "frontSlider", e.target.value)}}
                                ></input>

                                {/* trolley */}
                                <input
                                    style={this.styles.input}
                                    type="number"
                                    value={dispatch.riders[line].trolley === 0 ? "" : dispatch.riders[line].trolley}
                                    onFocus={e => e.currentTarget.select()}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...dispatch,
                                                riders: {
                                                    ...dispatch.riders,
                                                    [line]: {
                                                        ...dispatch.riders[line],
                                                        trolley: e.target.value
                                                    }
                                                }
                                            }
                                        })
                                    }}
                                ></input>

                                <span
                                    style={this.checkIfConfirmed(line)}
                                >READY</span> 

                            </div>
                        )
                    })}
                </div>

                <div style={this.styles.windContainer}>
                    <div style={this.styles.windContainer.row}>
                        {/* wind speed input */}
                        <label style={this.styles.windContainer.row.label}>Wind Speed (mph)</label>
                        <input
                            type="number"
                            style={this.styles.input}
                            value={dispatch.windSpeed}
                            onFocus={e => e.currentTarget.select()}
                            onChange={e => {
                                this.setState({
                                    ...this.state, 
                                    dispatch: {
                                        ...dispatch,
                                        windSpeed: e.target.value
                                    }
                                })
                            }}
                        ></input>
                    </div>

                    <div style={this.styles.windContainer.row}>
                        {/* wind degrees input */}
                        <label style={this.styles.windContainer.row.label}>Wind Degrees</label>
                        <input
                            type="number"
                            style={this.styles.input}
                            value={dispatch.windDegrees}
                            onFocus={e => e.currentTarget.select()}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    dispatch: {
                                        ...dispatch,
                                        windDegrees: e.target.value
                                    }
                                })
                            }}
                        ></input>
                    </div>


                    <div style={this.styles.windContainer.row}>
                        {/* winds instructor */}
                        <label style={this.styles.windContainer.row.label}>Winds Instructor</label>
                        <input
                            type="text"
                            style={this.styles.inputL}
                            value={dispatch.windsInstructor}
                            onFocus={e => e.currentTarget.select()}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    dispatch: {
                                        ...dispatch,
                                        windsInstructor: e.target.value
                                    }
                                })
                            }}
                        ></input>
                    </div>

                    <div style={this.styles.windContainer.row}>
                        {/* bt radio */}
                        <label style={this.styles.windContainer.row.label}>Big Top Radio</label>
                        <input
                            type="text"
                            style={this.styles.inputL}
                            value={dispatch.btRadio}
                            onFocus={e => e.currentTarget.select()}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    dispatch: {
                                        ...dispatch,
                                        btRadio: e.target.value
                                    }
                                })
                            }}
                        ></input>
                    </div>

                    <Button
                        style={this.styles.button}
                        onClick={this.openCommentModal}
                    >Add a comment</Button> 
                </div>
                
                <div style={this.styles.buttonContainer}>
                    <Button
                        style={this.styles.button}
                        variant="success"
                        onClick={e => {
                            this.props.createDispatch(dispatch)
                            this.clearInputs()
                        }}
                    >Dispatch</Button>
                    <Button
                        style={this.styles.button}
                        variant="warning"
                        onClick={this.clearInputs}
                    >Clear</Button>
                    <Button
                        style={this.styles.button}
                        variant="danger"
                        onClick={this.props.purge}
                    >Purge</Button>
                </div>
            </div>
        )
    }
}
