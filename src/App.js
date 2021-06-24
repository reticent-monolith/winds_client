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


const URL = "http://localhost:8080/"

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
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
              zIndex: "11"
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
                    contentLabel="Edit Modal"
                    style={this.styles.editModal}
                    onAfterOpen={this.afterOpenEditModal}
                >
                    <div>
                        {/* comment */}
                        <label>Comment</label>
                        <input
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
                        ></input>
                    </div>
                </Modal>


                <Controls 
                    createDispatch={this.createDispatch}
                    purge={this.purgeDatabase}
                />
                <div style={this.styles.list}>
                    {this.state.dispatches.map(d => {
                        return (
                            <DispatchCard 
                                key={d._id}
                                data={d}
                                mouseEnter={this.handleMouseEnter}
                                mouseLeave={this.handleMouseLeave}
                            />
                            )
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
    }

    closeEditModal = () => {
        if (
            JSON.stringify(this.state.currentlyEditing) !== JSON.stringify(this.state.beforeEdit)
        ) {
            this.updateDispatch(this.state.currentlyEditing)
        }
        this.setState({editModalIsOpen: false})
    }

    editModalIsOpen = () => {

    }
}