import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import {Switch, Link, Route} from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import PersonCreate from './PersonCreate';
import PersonList from './PersonList'

export default class PersonCtrl extends Component{
    render(){

        return <Grid>
            <ButtonToolbar>

                <Link to='/person/create'><Button bsStyle="primary">Create new Person</Button></Link>
                <Link to='/person/list'><Button bsStyle="primary">See all persons</Button></Link>
            </ButtonToolbar>
            <Row>
                <Switch>

                    <Route path='/person/create' component={PersonCreate}/>
                    <Route path='/person/list' component={PersonList}/>
                </Switch>
            </Row>
        </Grid>;
    }
}
//<Route exact path='/' component={PersonList}/>
//<Link to='/'><Button bsStyle="primary">View Persons</Button></Link>