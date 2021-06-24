import React from 'react'
import { config } from '../config';
import Button from 'react-bootstrap/esm/Button';

export default class ContextMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            xPos: "0px",
            yPos: "0px",
            showMenu: false,
            id: ""
        }
        this.handleEditClick = this.handleEditClick.bind(this)
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
        document.addEventListener("contextmenu", this.handleContextMenu);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    handleClick = (e) => {
        if (this.state.showMenu) this.setState({ showMenu: false });
    };

    handleContextMenu = (e) => {
        e.preventDefault();
        if (this.props.id !== "") {
            this.setState({
                xPos: `${e.pageX}px`,
                yPos: `${e.pageY}px`,
                showMenu: true,
                id: this.props.id
            });
        }
    }

    render() {
        const { showMenu, xPos, yPos } = this.state;

        if (showMenu)
            return (
                <div
                    className="menu"
                    style={{
                        top: yPos,
                        left: xPos,
                        position: "absolute",
                        zIndex: "5",
                        backgroundColor: config.colors.light,
                        border: "2px solid",
                        borderColor: config.colors.gray,
                        borderRadius: "5px",
                        height: "100px",
                        width: "fit-content",
                        padding: "5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <Button
                        variant="warning"
                        style={{
                            width: "80px"
                        }}
                        onClick={this.handleEditClick}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        style={{
                            width: "80px"
                        }}
                        onClick={() => {
                            if (this.state.id !== "") {
                                this.props.delete(this.state.id)
                            }
                        }}
                    >
                        Delete
                    </Button>
                </div>
            );
        else return null;
    }

    async handleEditClick() {
        let dispatch = ""
        if (this.state.id !== "") {
            if (this.props.dispatches.length > 0) {
                dispatch = this.props.dispatches.find(d => {
                    return d._id === this.state.id  
                })
                this.props.openEditModal(dispatch)
            }
            
        }
    }

}