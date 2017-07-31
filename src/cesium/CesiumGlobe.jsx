import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import Cesium from "cesium/Source/Cesium";

import TopBar from "./TopBar"
import Panel from "./Panel";
import About from "./About";
import Layers from "./Layers";
import FeatureInfo from './FeatureInfo';

import {getBasicData, getExtendedData, toggleFeatureInfo, selectFeature} from '../actions/index'

const eventsUtils = require('../utils/eventsUtils');

import CesiumBillboard from "./CesiumBillboard";
import CesiumDatasources from "./CesiumDatasources";

class CesiumGlobe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewerLoaded: false
        }
    }

    componentDidMount() {

        const props = this.props;

        this.viewer = new Viewer(this.cesiumContainer, {
            animation: false,
            //baseLayerPicker : false,
            //fullscreenButton : false,
            //geocoder : false,
            homeButton: false,
            infoBox : false,
            sceneModePicker: false,
            //selectionIndicator : true,
            timeline: false,
            navigationHelpButton: false,
            //scene3DOnly : true,
            //imageryProvider,
            //terrainProvider,
        });

        // basic dataset by default
        props.getBasicData(this.viewer.dataSources);

        const scene = this.viewer.scene;

        // LMB click events, by default feature info
        this.viewer.screenSpaceEventHandler.setInputAction(function(movement) {

            switch(props.events.lmb) {
                case 'FEATUREINFO':
                    eventsUtils.toggleFeatureInfo(props, scene, movement);
                    break
                case 'NEWFEATURE':
                    eventsUtils.addNewFeature();
                    break
                default:
                    eventsUtils.toggleFeatureInfo(props, scene, movement);
                    break
            }

        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        // camera
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-8.484, 54.272, 1500.0)
        })

        // Force immediate re-render now that the Cesium viewer is created
        this.setState({viewerLoaded: true}); // eslint-disable-line react/no-did-mount-set-state
    }

    componentWillUnmount() {
        if (this.viewer) {
            this.viewer.destroy();
        }
    }

    renderContents() {
        const {viewerLoaded} = this.state;
        let contents = null;

        if (viewerLoaded) {
            contents = (
                <span></span>
            );
        }

        return contents;
    }

    render() {
        const containerStyle = {
            width: 'auto',
            height: 'auto',
            overflow: "auto",
            top: 35,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'fixed',
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "stretch"
        };

        const widgetStyle = {
            flexGrow: 2
        }

        const contents = this.renderContents()
        //console.log(this.props)

        const billboard = (this.viewer)
            ? <CesiumBillboard scene={this.viewer.scene}/>
            : null;
        const dataSources = (this.viewer)
            ? <CesiumDatasources dataSources={this.props.dataSources.dataSources}/>
            : null;

        return (
            <div>
                <TopBar/>
                <Panel/>
                <Layers/>
                <About/>
                <FeatureInfo/>
                <div className="cesiumGlobeWrapper" style={containerStyle}>
                    <div className="cesiumWidget" ref={element => this.cesiumContainer = element} style={widgetStyle}>
                        {contents}
                        {billboard}
                        {dataSources}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataSources: state.dataSources,
        featureInfo: state.featureInfo,
        events: state.events
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getBasicData: getBasicData,
        getExtendedData: getExtendedData,
        toggleFeatureInfo: toggleFeatureInfo,
        selectFeature: selectFeature
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CesiumGlobe);
