import React from "react"
import axios from "axios"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

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
        this.purgeDatabase = this.purgeDatabase.bind(this)

        this.state = {
            dispatches: [], // received from server
        }
    }

    componentDidMount() {
        this.getDispatches()
    }

    componentDidUpdate() {
        Log.debug("Latest dispatch in app state")
        console.log(this.state.dispatches[0])
    }

    styles = {
        list: {
            marginTop: "200px"
        }
    }
    
    render() {
        return (
            <div>
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
            Log.debug("Raw response")
            console.log(response.data.reverse()[0])

            this.setState({dispatches: response.data.map( d => {
                return new Dispatch(d)
            })})
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
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }

    async deleteDispatch(id) {
        try {
            await axios.post(`${URL}delete/`, id)
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }

    async purgeDatabase() {
        try {
            await axios.delete(`${URL}purge/`)
            this.getDispatches()
        } catch (error) {
            Log.error(error)
        }
    }
}