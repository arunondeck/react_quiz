import React from 'react'
import {connect} from 'react-redux';
import {Button, Col} from 'react-bootstrap/lib/';
import {requestFindFalcone} from '../actions/';

class FFSendArmyControl extends React.Component{
    handleSendArmyBtnClick = (e) => {
        this.props.dispatch(requestFindFalcone());
    }
    render(){
        return(
            <Col xs={12} md={4} mdOffset={4}>
                <Button disabled={!this.props.armyReady} onClick={this.props.armyReady ? this.handleSendArmyBtnClick : null} bsStyle="primary" bsSize="large" block>
                    Send Army
                </Button>
            </Col>
        )
    }
}

export default connect()(FFSendArmyControl)