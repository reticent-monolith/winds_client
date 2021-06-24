import React from "react"
import axios from "axios"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Log from "./utilities/Log"
import Controls from "./components/Controls"
import DispatchCard from "./components/DispatchCard"
import Dispatch from "./models/Dispatch"
import ContextMenu from "./components/ContextMenu";
import Modal from 'react-modal'
import { config } from "./config";


const URL = "http://localhost:8080/"
const TODAY = new Date(Date.now()).toJSON().split("T")[0]

document.addEventListener("contextmenu", e => {
    e.preventDefault()
})
export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.getDispatches = this.getDispatches.bind(this)
        this.createDispatch = this.createDispatch.bind(this)
        this.updateDispatch = this.updateDispatch.bind(this)
        this.deleteDispatch = this.deleteDispatch.bind(this)
        this.purgeDatabase = this.purgeDatabase.bind(this)
        this.getDispatchById = this.getDispatchById.bind(this)

        Modal.setAppElement('#root');

        this.state = {
            dispatches: [], // received from server
            id: "",
            editModalIsOpen: false,
            currentlyEditing: {
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
        }
    }

    componentDidMount() {
        this.getDispatches()
    }

    styles = {
        list: {
            marginTop: "200px"
        },
        editModal: {
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              zIndex: "10"
            },
            content: {
              position: 'absolute',
              top: '30%',
              left: '15%',
              right: 'auto',
              bottom: 'auto',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
              zIndex: "11",
              display: "flex",
              fontSize: "0.8em"
            },
            generalDiv: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "250px",
                marginRight: "10px"
            },
            row: {
                display: "flex",
                justifyContent: "space-between",
                margin: "5px 0"
            },
            ridersDiv: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            },
            rider: {
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "5px",
            },
            inputS: {
                width: "40px",
                textAlign: "center"
            }, 
            inputL: {
                width: "120px",
                textAlign: "center"
            },
            span: {
                color: "white",
                margin: "0 5px"
            }
          }
    }
    
    render() {
        return (
            <div>
                <ContextMenu 
                    id={this.state.id} 
                    delete={this.deleteDispatch}
                    dispatches={this.state.dispatches}
                    get={this.getDispatchById}
                    openEditModal={this.openEditModal}
                />
                <Modal
                    isOpen={this.state.editModalIsOpen}
                    onRequestClose={this.closeEditModal}
                    contentspan="Edit Modal"
                    style={this.styles.editModal}
                    onAfterOpen={this.afterOpenEditModal}
                >
                    <div style={this.styles.editModal.generalDiv}>
                        <div style={this.styles.editModal.row}>
                            {/* windSpeed */}
                            <span>Wind Speed</span>
                            <input
                                value={this.state.currentlyEditing.windSpeed}
                                style={this.styles.editModal.inputS}
                                onChange={e => {
                                    this.setState({
                                        ...this.state,
                                        currentlyEditing: {
                                            ...this.state.currentlyEditing,
                                            windSpeed: e.target.value
                                        }
                                    })
                                }}
                            ></input>
                        </div>
                        
                        <div style={this.styles.editModal.row}>
                            {/* windDegrees */}
                            <span >Wind Degrees</span>
                            <input
                                value={this.state.currentlyEditing.windDegrees}
                                style={this.styles.editModal.inputS}
                                onChange={e => {
                                    this.setState({
                                        ...this.state,
                                        currentlyEditing: {
                                            ...this.state.currentlyEditing,
                                            windDegrees: e.target.value
                                        }
                                    })
                                }}
                            ></input>
                        </div>
                        
                        <div style={this.styles.editModal.row}>
                            {/* windsInstructor */}
                            <span>Winds Instructor</span>
                            <input
                                value={this.state.currentlyEditing.windsInstructor}
                                style={this.styles.editModal.inputL}
                                onChange={e => {
                                    this.setState({
                                        ...this.state,
                                        currentlyEditing: {
                                            ...this.state.currentlyEditing,
                                            windsInstructor: e.target.value
                                        }
                                    })
                                }}
                            ></input>
                        </div>

                        <div style={this.styles.editModal.row}>
                            {/* btRadio */}
                            <span>Big Top Radio</span>
                            <input
                                value={this.state.currentlyEditing.btRadio}
                                style={this.styles.editModal.inputL}
                                onChange={e => {
                                    this.setState({
                                        ...this.state,
                                        currentlyEditing: {
                                            ...this.state.currentlyEditing,
                                            btRadio: e.target.value
                                        }
                                    })
                                }}
                            ></input>
                        </div>

                        {/* comment */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span>Comment</span>
                            <textarea
                                value={this.state.currentlyEditing.comment}
                                onChange={e => {
                                    this.setState({
                                        ...this.state,
                                        currentlyEditing: {
                                            ...this.state.currentlyEditing,
                                            comment: e.target.value
                                        }
                                    })
                                }}
                            ></textarea>
                        </div>
                    </div>

                    <div style={this.styles.editModal.ridersDiv}>
                        {[4,3,2,1].map( l => {
                            return (
                                <div
                                    key={l}
                                    style={{
                                        ...this.styles.editModal.rider,
                                        backgroundColor: config.colors[l]
                                    }}
                                >
                                    <span style={this.styles.editModal.span}>Weight</span>
                                    <input
                                        value={this.state.currentlyEditing.riders[l].weight}
                                        style={this.styles.editModal.inputS}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.currentlyEditing.riders)
                                            copy[l].weight = e.target.value
                                            this.setState({
                                                ...this.state,
                                                currentlyEditing: {
                                                    ...this.state.currentlyEditing,
                                                    riders: copy
                                                }
                                            })
                                        }}
                                    ></input>
                                    <span style={this.styles.editModal.span}>Front</span>
                                    <select
                                        // style={this.styles.editModal.select}
                                        value={this.state.currentlyEditing.riders[l].frontSlider || ""}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.currentlyEditing.riders)
                                            copy[l].frontSlider = e.target.value
                                            copy[l].addedWeight = 0
                                            this.setState({
                                                ...this.state,
                                                currentlyEditing: {
                                                    ...this.state.currentlyEditing,
                                                    riders: copy
                                                }
                                            })
                                        }}
                                    >
                                        <option value="BLACK">S1</option>
                                        <option value="OLD_RED">SO2</option>
                                        <option value="NEW_RED">SN2</option>
                                        <option value=""></option>
                                    </select>
                                    <span style={this.styles.editModal.span}>Middle</span>
                                    <select
                                        // style={this.styles.editModal.select}
                                        value={this.state.currentlyEditing.riders[l].middleSlider || ""}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.currentlyEditing.riders)
                                            copy[l].middleSlider = e.target.value
                                            copy[l].addedWeight = 0
                                            this.setState({
                                                ...this.state,
                                                currentlyEditing: {
                                                    ...this.state.currentlyEditing,
                                                    riders: copy
                                                }
                                            })
                                        }}
                                    >
                                        <option value="OLD_RED">SO2</option>
                                        <option value="NEW_RED">SN2</option>
                                        <option value=""></option>
                                    </select>
                                    <span style={this.styles.editModal.span}>Rear</span>
                                    <select
                                        // style={this.styles.editModal.select}
                                        value={this.state.currentlyEditing.riders[l].rearSlider || ""}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.currentlyEditing.riders)
                                            copy[l].rearSlider = e.target.value
                                            copy[l].addedWeight = 0
                                            this.setState({
                                                ...this.state,
                                                currentlyEditing: {
                                                    ...this.state.currentlyEditing,
                                                    riders: copy
                                                }
                                            })
                                        }}
                                    >
                                        <option value="YELLOW">S3</option>
                                        <option value=""></option>
                                    </select>
                                    <span style={this.styles.editModal.span}>Added</span>
                                    <input
                                        value={this.state.currentlyEditing.riders[l].addedWeight}
                                        style={this.styles.editModal.inputS}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.currentlyEditing.riders)
                                            copy[l].addedWeight = e.target.value
                                            this.setState({
                                                ...this.state,
                                                currentlyEditing: {
                                                    ...this.state.currentlyEditing,
                                                    riders: copy
                                                }
                                            })
                                        }}
                                    ></input>
                                    <span style={this.styles.editModal.span}>Speed</span>
                                    <input
                                        value={this.state.currentlyEditing.riders[l].speed}
                                        style={this.styles.editModal.inputS}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.currentlyEditing.riders)
                                            copy[l].speed = e.target.value
                                            this.setState({
                                                ...this.state,
                                                currentlyEditing: {
                                                    ...this.state.currentlyEditing,
                                                    riders: copy
                                                }
                                            })
                                        }}
                                    ></input>
                                    <span style={this.styles.editModal.span}>Trolley</span>
                                    <input
                                        value={this.state.currentlyEditing.riders[l].trolley}
                                        style={this.styles.editModal.inputS}
                                        onChange={e => {
                                            const copy = Object.assign({}, this.state.currentlyEditing.riders)
                                            copy[l].trolley = e.target.value
                                            this.setState({
                                                ...this.state,
                                                currentlyEditing: {
                                                    ...this.state.currentlyEditing,
                                                    riders: copy
                                                }
                                            })
                                        }}
                                    ></input>
                                </div>
                            )
                        })}
                    </div>
                </Modal>


                <Controls 
                    createDispatch={this.createDispatch}
                    purge={this.purgeDatabase}
                />
                {/* The dispatches from today as cards */}
                <div style={this.styles.list}>
                    {this.state.dispatches.map(d => {
                        const dispatch = new Dispatch(d)
                        if (dispatch.dateTime.split("T")[0] === TODAY) {
                            return (
                                <DispatchCard 
                                    key={dispatch._id}
                                    data={dispatch}
                                    mouseEnter={this.handleMouseEnter}
                                    mouseLeave={this.handleMouseLeave}
                                />
                            )
                        } else return null
                    })}
                </div>
            </div>
        )
    }

    async getDispatches() {
        try {
            const response = await axios.get(`${URL}all`)
            this.setState({dispatches: response.data.map( d => {
                return new Dispatch(d)
            })})
        } catch (error) {
            Log.error(error)
        }
    }

    async createDispatch(dispatch) {
        const dispatchPayload = new Dispatch(dispatch)
        delete dispatchPayload._id
        try {
            await axios.post(`${URL}add`, dispatchPayload)
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }

    async updateDispatch(dispatch) {
        try {
            await axios.post(`${URL}update`, dispatch)
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }

    async deleteDispatch(id) {
        try {
            await axios.post(`${URL}delete`, id)
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }

    async purgeDatabase() {
        try {
            await axios.delete(`${URL}purge`)
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }

    async getDispatchById(id) {
        try {
            const dispatch = await axios.get(`${URL}get/${id}`)
            this.getDispatches()
            return dispatch
        } catch (error) {
            Log.error(error)
        }
    }

    handleMouseEnter = (id) => {
        this.setState({
            id: id 
        })
    }

    handleMouseLeave = () => {
        this.setState({
            id: ""
        })
    }

    openEditModal = (dispatch) => {
        this.setState({
            currentlyEditing: dispatch,
            editModalIsOpen: true
        })
    }

    afterOpenEditModal = () => {
        this.setState({
            beforeEdit: Object.assign({}, this.state.currentlyEditing)
        })
        console.log(this.state.currentlyEditing.riders[4].weight)
    }

    closeEditModal = () => {
        if (
            // check to see if a change is needed, but doesnt check each rider!
            // JSON.stringify(this.state.currentlyEditing) !== JSON.stringify(this.state.beforeEdit)
            true
        ) {
            this.updateDispatch(this.state.currentlyEditing)
        }
        this.setState({editModalIsOpen: false})
    }

    editModalIsOpen = () => {

    }
}