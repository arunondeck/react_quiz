import React from 'react';
import {connect} from 'react-redux';
import {Row, Grid, Col, PageHeader} from 'react-bootstrap/lib';
import Sidebar from './Sidebar';
import FFSelectorMain from './FFSelectorMain';
import FFSearchETA from './FFSearchETA';
import FFSendArmyControl from './FFSendArmyControl';
import FFArmyResult from './FFArmyResult';
import {ClipLoader} from 'react-spinners';

class FFContainer extends React.Component{
    handleResetBtnClick = () => {
        this.props.dispatch({type:'RESET_APP'});
    }

    render(){
        const findScreen=(
            <Col xs={12}>
                <Col className="sidebar" md={3} lg={2}>
                    <Sidebar assets={{planets: this.props.state.planets, vehicles: this.props.state.vehicles}}/>
                </Col>
                <Col className="main" md={9} lg={10}>
                    <Row>
                        <FFSearchETA updateSearchTime={this.props.state.updateSearchTime} searchTime={this.props.state.searchTime}></FFSearchETA>
                    </Row>
                    <Row>
                        <FFSelectorMain
                            armyCount={this.props.state.armyCount} 
                            armies={this.props.state.armies}
                            availableAssets={{availablePlanets: this.props.state.availablePlanets,availableVehicles: this.props.state.availableVehicles}}
                        />
                    </Row>
                    <Row>
                        <FFSendArmyControl armyReady={this.props.state.armyReady}/>
                    </Row>
                </Col>
            </Col> 
        );
        const loader = (
            <Col xs={12} md={10} mdOffset={1}>
                <div className='loading sweet-loading'>
                    <ClipLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={true}
                    />
                </div> 
          </Col>
        );
        const armySentScreen = (
            <Col xs={12} md={8} mdOffset={2}>
                <FFArmyResult armyResult={this.props.state.armyResult}></FFArmyResult> 
            </Col>
        );
        return(
            <Grid fluid={true}>
                <Row>
                    <Col xs={12}>
                    <PageHeader className=''>
                            Finding Falcone
                            <small onClick={this.handleResetBtnClick} title='Reset Application' className='pull-right reset-link'>Reset</small>
                    </PageHeader>
                    </Col>
                </Row>
                <Row>
                    {this.props.state.initialized ? this.props.state.armySent? armySentScreen : findScreen : loader}
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return{
        state: state
    }
}

export default connect(mapStateToProps)(FFContainer);