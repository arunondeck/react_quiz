import React from 'react';
import {Col} from 'react-bootstrap/lib';
import {connect} from 'react-redux';

class FFSearchTimer extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.updateSearchTime)
            this.props.dispatch({type:'UPDATE_SEARCHTIME'});
    }    
    render()
    {
        return(
            <Col xs={12} md={2} mdOffset={10}>
                <div className='eta-block clearfix text-center'>
                    <Col xs={8}>Search Time </Col>
                    {
                        this.props.searchTime === 0 ? '' : <Col xs={4}>{this.props.searchTime}</Col>
                    }
                </div>
            </Col>
        )
    }
}

export default connect()(FFSearchTimer)