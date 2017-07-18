import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactTooltip from 'react-tooltip'

import {togglePanel, getExtendedData, getBasicData, getDataRequested} from '../actions/index'

const tooltip = "GoSafe enables to choose between two datasets. \n By default it runs with the basic one. If you are working on a decent machine with fast internet connection, you can extend the dataset to full batch with additional layers and attributes. Click on this button to switch between datasets.";

class TopBar extends Component {

    render() {
        return (
            <div className="top-bar">
                <div className="menu" onClick={() => this.props.togglePanel(this.props.panel.display)}></div>
                <div className="user">
                    <label className="switch" data-tip={tooltip}>
                        <input type="checkbox" title="This is the text of the tooltip" onChange={(event) => {
                            (event.target.checked)
                                ? this.props.getExtendedData(this.props.dataSources.dataSources)
                                : this.props.getBasicData(this.props.dataSources.dataSources)
                        }}/>
                        <span className="slider round"></span>
                        <ReactTooltip multiline={true} place="bottom"/>
                    </label>
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
