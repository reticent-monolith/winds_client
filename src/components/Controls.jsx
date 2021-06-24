import React from "react"
import ReactModal from "react-modal"
import {config} from "../config"
import Button from 'react-bootstrap/Button';

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
                    },
                    3: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0,
                    },
                    2: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0,
                    },
                    1: {
                        weight: 0,
                        trolley: 0,
                        addedWeight: 0,
                    }
                },
                windSpeed: "",
                windDegrees: "",
                windsInstructor: "",
                btRadio: "",
                comment: ""
            },
            commentModalIsOpen: false
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

        this.openCommentModal = this.openCommentModal.bind(this)
        this.closeCommentModal = this.closeCommentModal.bind(this)
        this.afterOpenCommentModal = this.afterOpenCommentModal.bind(this)
        this.clearInputs = this.clearInputs.bind(this)
    }

    styles = {
        lineDiv: {
            base: {
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
            }
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
        commentModal: {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                zIndex: "3"
            },
            content: {
                position: 'absolute',
                top: '30%',
                left: '30%',
                right: 'auto',
                bottom: 'auto',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px',
                zIndex: "4"
            }
        },
        topLabels: {
            fontSize: "0.7em",
            textAlign: "center",
            display: "flex",
            padding: "0 15px 0 30px",
            justifyContent: "space-between",
            weight: {width: "44px"},
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
        }
    }

    render() {
        return (
            <div style={this.styles.container}>
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
                            <div key={`line${line}`} style={this.styles.lineDiv[line]}>
                                {/* label */}
                                <label style={this.styles.label}>{`${line}`}</label>

                                {/* weight */}
                                <input
                                    style={this.styles.input}
                                    type="number"
                                    value={this.state.dispatch.riders[line].weight === 0 ? "" : this.state.dispatch.riders[line].weight}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...this.state.dispatch,
                                                riders: {
                                                    ...this.state.dispatch.riders,
                                                    [line]: {
                                                        ...this.state.dispatch.riders[line],
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
                                    value={this.state.dispatch.riders[line].frontSlider || ""}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...this.state.dispatch,
                                                riders: {
                                                    ...this.state.dispatch.riders,
                                                    [line]: {
                                                        ...this.state.dispatch.riders[line],
                                                        frontSlider: e.target.value,
                                                        addedWeight: 0
                                                    }
                                                }
                                            }
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
                                    value={this.state.dispatch.riders[line].middleSlider || ""}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...this.state.dispatch,
                                                riders: {
                                                    ...this.state.dispatch.riders,
                                                    [line]: {
                                                        ...this.state.dispatch.riders[line],
                                                        middleSlider: e.target.value,
                                                        addedWeight: 0
                                                    }
                                                }
                                            }
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
                                    value={this.state.dispatch.riders[line].rearSlider || ""}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...this.state.dispatch,
                                                riders: {
                                                    ...this.state.dispatch.riders,
                                                    [line]: {
                                                        ...this.state.dispatch.riders[line],
                                                        rearSlider: e.target.value,
                                                        addedWeight: 0
                                                    }
                                                }
                                            }
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
                                    value={this.state.dispatch.riders[line].addedWeight === 0 ? "" : this.state.dispatch.riders[line].addedWeight}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...this.state.dispatch,
                                                riders: {
                                                    ...this.state.dispatch.riders,
                                                    [line]: {
                                                        ...this.state.dispatch.riders[line],
                                                        addedWeight: e.target.value,
                                                        frontSlider: null,
                                                        middleSlider: null,
                                                        rearSlider: null
                                                    }
                                                }
                                            }
                                        })
                                    }}
                                ></input>

                                {/* trolley */}
                                <input
                                    style={this.styles.input}
                                    type="number"
                                    value={this.state.dispatch.riders[line].trolley === 0 ? "" : this.state.dispatch.riders[line].trolley}
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            dispatch: {
                                                ...this.state.dispatch,
                                                riders: {
                                                    ...this.state.dispatch.riders,
                                                    [line]: {
                                                        ...this.state.dispatch.riders[line],
                                                        trolley: e.target.value
                                                    }
                                                }
                                            }
                                        })
                                    }}
                                ></input>
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
                            value={this.state.dispatch.windSpeed}
                            onChange={e => {
                                this.setState({
                                    ...this.state, 
                                    dispatch: {
                                        ...this.state.dispatch,
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
                            value={this.state.dispatch.windDegrees}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    dispatch: {
                                        ...this.state.dispatch,
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
                            value={this.state.dispatch.windsInstructor}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    dispatch: {
                                        ...this.state.dispatch,
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
                            value={this.state.dispatch.btRadio}
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    dispatch: {
                                        ...this.state.dispatch,
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
                    <ReactModal
                        isOpen={this.state.commentModalIsOpen}
                        onAfterOpen={this.afterOpenCommentModal}
                        onRequestClose={this.closeCommentModal}
                        contentLabel="Add a comment"
                        style={this.styles.commentModal}
                    >
                        {/* Comment Input */}
                        <textarea
                            style={this.styles.textArea}
                            value={this.state.dispatch.comment}
                            placeholder="Add a comment"
                            onChange={e => {
                                this.setState({
                                    ...this.state,
                                    dispatch: {
                                        ...this.state.dispatch,
                                        comment: e.target.value
                                    }
                                })
                            }}
                        ></textarea>
                    </ReactModal>

                </div>
                
                <div style={this.styles.buttonContainer}>
                    <Button
                        style={this.styles.button}
                        variant="success"
                        onClick={e => {
                            this.props.createDispatch(this.state.dispatch)
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

    clearInputs() {
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
            } 
        })
    }

    openCommentModal() {
        this.setState({
            ...this.state,
            commentModalIsOpen: true
        })
    }

    afterOpenCommentModal() {

    }

    closeCommentModal() {
        this.setState({
            ...this.state,
            commentModalIsOpen: false
        })
    }
}