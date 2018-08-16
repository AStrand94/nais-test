import React, {Component} from 'react';
import {Alert, Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

export default class PersonCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastName: "",
            firstName: "",
            id: ""
        };

        this.handlePersonChange = this.handlePersonChange.bind(this);
        this.createPerson = this.createPerson.bind(this);
    }

    createPerson() {
        const data = this.state;
        fetch('/api/person/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }
            )
        }).then(() => this.showSuccessMsg(true)).catch(() => this.showSuccessMsg(false))
    }

    showSuccessMsg(success) {
        let msg = undefined;
        if (success) {
            msg = document.getElementById("successAlert");
            msg.style.display = "block";
        } else {
            msg = document.getElementById("errAlert");
            msg.style.display = "block";
        }
        window.setTimeout(PersonCreate.hideMsg(msg), 3000)
    }

    static hideMsg(element) {
        element.style.display = 'none'
    }

    handlePersonChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        const style = {display: 'none'};
        return <div>
            <Alert id="successAlert" bsStyle="success" style={style}>Person {this.state.firstName} created</Alert>
            <Alert id="errAlert" bsStyle="danger" style={style}>Failed to create {this.state.firstName}</Alert>
            <form>
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Create person</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="firstName"
                        name="firstName"
                        onChange={this.handlePersonChange}
                    />
                </FormGroup>

                <FormGroup
                    controlId="formBasicText"
                >
                    <FormControl
                        type="text"
                        placeholder="lastName"
                        name="lastName"
                        onChange={this.handlePersonChange}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type="text"
                        placeholder="id"
                        name="id"
                        onChange={this.handlePersonChange}
                    />
                </FormGroup>

                <Button onClick={this.createPerson}>Create</Button>
            </form>
        </div>
    }
}