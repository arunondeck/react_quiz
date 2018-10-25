import React, { Component } from 'react';
import {connect} from 'react-redux';
import {initApp} from './actions';
import FFContainer from './components/FFContainer';

class App extends Component {
  componentDidMount() {
      this.props.dispatch(initApp())
  }

  render() {
    return (
      <div className="app-root">
        <FFContainer/>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        state: state
    }
}

export default connect(mapStateToProps)(App);