import React from 'react';
import {Col, Panel, Alert} from 'react-bootstrap/lib/'
import {ClipLoader} from 'react-spinners';

export default class FFArmyResult extends React.Component{
    render(){
        const sendingArmy =  (
            <div className='loading sweet-loading'>
                <div className='loading-msg'> Army is being deployed</div>
                <ClipLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={true}
                />
          </div> 
        );
        const armyReturned = (
            <div>
                <Alert bsStyle="info">
                    Army Deployment Result
                </Alert>
                <Panel bsStyle={this.props.armyResult.status ? 'success' : 'warning'}>
                    <Panel.Heading>{this.props.armyResult.status ? 'Victory! Falcone Found!' : 'Search Failed'}</Panel.Heading>
                    <Panel.Body>
                        {this.props.armyResult.status ? 'Congragulations King Shan! Queen Al Falcone was found on planet ' + this.props.armyResult.planet_name + '!' : 'Apologies my King. Army failed in finding Queen Al Facone'}
                    </Panel.Body>
                </Panel>
            </div>
        );
        console.log(this.props);
        return(
            <Col xs={12}>
                {this.props.armyResult.hasOwnProperty('status')? armyReturned : sendingArmy}
            </Col>
        )
    }
}