import React from 'react';
import {Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap/lib';

export default class Sidebar extends React.Component{
    formatString = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ');
    }

    render()
    {
        return(
            <Row>
                <Col xs={12}>
                    Planets
                    <ListGroup className='sidebar-list list-planets'>
                    {
                        this.props.assets.planets.map((planet, id) => (
                            <ListGroupItem key = {id}>
                                <div className='planet-name'>{planet.name}</div>
                                <div className='planet-info'>
                                    {Object.keys(planet).map((prop) => prop !== 'name' ? <div key={prop}>{this.formatString(prop) + ':'  + planet[prop]}</div> : '')}
                                </div>
                            </ListGroupItem>
                        ))
                    }
                    </ListGroup>
                </Col>
                <Col xs={12}>
                    Vehicles
                    <ListGroup className='sidebar-list list-vehicles'>
                    {   
                        this.props.assets.vehicles.map((vehicle, id) => (
                            <ListGroupItem key = {id}>
                                <div className='vehicle-name'>{vehicle.name}</div>
                                <div className='vehicle-info'> 
                                    {Object.keys(vehicle).map((prop) => prop !== 'name' ? <div key={prop}>{this.formatString(prop) + ':'  + vehicle[prop]}</div> : '')}
                                </div>
                            </ListGroupItem>
                        ))
                    }
                    </ListGroup>
                </Col>
            </Row>
        )
    }
}