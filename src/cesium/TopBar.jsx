import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {togglePanel} from '../actions/index'

class TopBar extends Component {

  test() {
    console.log('test')
  }

    render() {
        return (
            <div className="top-bar">
                <div className="menu" onClick={() => this.props.togglePanel(this.props.panel.display)}>

                </div>
                <div className="user">
                  User menu goes here
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {panel: state.panel, about: state.about}
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({togglePanel: togglePanel}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TopBar);
