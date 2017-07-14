import React, {Component} from "react";
//import {connect} from 'react-redux';
import series from 'async/series';
const dataUtils = require('../utils/dataUtils');
const layersStyles = require('../assets/styles');


export default class CesiumBillboard extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    dataReceived(){
        this.setState({loading: false})
    }

    componentDidMount() {

        const {dataSources} = this.props;


        series([
            function(callback) {
                dataUtils.getLayer(dataSources, 'tracks', layersStyles.default, function(err, data){
                    callback(null, data);
                })
            },
            function(callback) {
                dataUtils.getLayer(dataSources, 'signals', layersStyles.blueTrain, function(err, data){
                    callback(null, data);
                })
            },
            function(callback) {
                dataUtils.getLayer(dataSources, 'platforms', layersStyles.redThick, function(err, data){
                    callback(null, data);
                })
            }
        ], function(error, results){
            setTimeout(function(){this.dataReceived()}.bind(this), 7000);

        }.bind(this))

    }

    render() {
        if (this.state.loading){
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
