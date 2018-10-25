import React from 'react';
import {Alert, Col} from 'react-bootstrap/lib';
import FFSelector from './FFSelector';

export default class FFSelectorMain extends React.Component{
    render(){
        return(
            <div>
                    <Col xs={12}>
                        <Alert bsStyle="info">
                            Select the planets you want to send armies to search in
                        </Alert>
                    </Col>
                    {
                        this.props.armies.map((army, id) => (
                            <Col key={id} xs={12} md={3}>
                                <FFSelector  
                                    armyID={id} 
                                    availablePlanets={this.props.availableAssets.availablePlanets}
                                    availableVehicles={this.props.availableAssets.availableVehicles}
                                    army={this.props.armies[id]}
                                />
                            </Col>
                        ))
                    }
            </div>
        )
    }
}