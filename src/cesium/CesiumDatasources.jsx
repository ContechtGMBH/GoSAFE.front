import React, {Component} from "react";
import {connect} from 'react-redux';

class CesiumDatasources extends Component {
    componentDidMount() {}

    render() {
        if (this.props.dataSources.loading) {
            return (
                <div className="cssload-bg">
                    <div id="fountainG">
                        <div id="fountainG_1" className="fountainG"></div>
                        <div id="fountainG_2" className="fountainG"></div>
                        <div id="fountainG_3" className="fountainG"></div>
                        <div id="fountainG_4" className="fountainG"></div>
                        <div id="fountainG_5" className="fountainG"></div>
                        <div id="fountainG_6" className="fountainG"></div>
                        <div id="fountainG_7" className="fountainG"></div>
                        <div id="fountainG_8" className="fountainG"></div>
                    </div>
                </div>
            );
        } else {
            return null;
        }

    }

    componentWillUnmount() {}
}

function mapStateToProps(state) {
    return {dataSources: state.dataSources}
}

export default connect(mapStateToProps)(CesiumDatasources);
