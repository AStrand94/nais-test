import React, {Component} from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import ListGroup from 'react-bootstrap/lib/ListGroup';

export default class PersonList extends Component{

    constructor(props){
        super(props);

        this.state = {
            persons: [],
            isLoaded: false
        }
    }

    componentDidMount(){
        fetch("/api/person/list")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        persons: result
                    });
                }
            )
    }

    render(){
        return <ListGroup>
            {this.state.persons.map((p,i) => (
                <ListGroupItem key={i}>
                    {p.firstName} {p.lastName}
                </ListGroupItem>
            ))}
        </ListGroup>

    }

    removePerson = () => {
        this.setState({
            persons: this.state.persons.splice(0,this.state.persons.length-1)
        });
    }

}