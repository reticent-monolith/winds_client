import React from "react"
import axios from "axios"
import "./App.css"

import Log from "./utilities/Log"
import Controls from "./components/Controls"
import DispatchCard from "./components/DispatchCard"
import Dispatch from "./models/Dispatch"


const URL = "http://localhost:8080/"

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.getDispatches = this.getDispatches.bind(this)
        this.createDispatch = this.createDispatch.bind(this)
        this.updateDispatch = this.updateDispatch.bind(this)
        this.deleteDispatch = this.deleteDispatch.bind(this)

        this.state = {
            dispatches: [], // received from server
        }
    }

    componentDidMount() {
        this.getDispatches()
    }
    
    render() {
        return (
            <div>
                <Controls 
                createDispatch={this.createDispatch}
                />
                <div>
                    {this.state.dispatches.map(d => {
                        return (
                            <DispatchCard 
                            key={d._id}
                            data={d}
                            />
                            )
                        })}
                </div>
            </div>
        )
    }

    async getDispatches() {
        try {
            const response = await axios.get(`${URL}all/`)
            this.setState({dispatches: response.data})
        } catch (error) {
            Log.error(error)
        }
    }

    async createDispatch(dispatch) {
        const dispatchPayload = new Dispatch(dispatch)
        try {
            await axios.post(`${URL}add/`, dispatchPayload)
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }

    async updateDispatch(dispatch) {
        try {
            await axios.post(`${URL}update/`, dispatch)
        } catch (error) {
            Log.error(error)
        }
    }

    async deleteDispatch(id) {
        try {
            await axios.post(`${URL}delete/`, id)
        } catch (error) {
            Log.error(error)
        }
    }
}