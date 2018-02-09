import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import ReactTooltip from 'react-tooltip'

import {togglePanel, getExtendedData, getBasicData, getDataRequested} from '../actions/index'

class TopBar extends Component {

    render() {
        return (
            <div className="top-bar">
                <div className="menu" onClick={() => this.props.togglePanel(this.props.panel.display)}></div>
                <div className="user">
                    <div className="user-menu">User menu goes here</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {panel: state.panel, about: state.about, dataSources: state.dataSources}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        togglePanel: togglePanel,
        getExtendedData: getExtendedData,
        getBasicData: getBasicData,
        getDataRequested: getDataRequested
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TopBar);
