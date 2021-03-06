import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import Cesium from "cesium/Source/Cesium";

import TopBar from "./TopBar"
import Panel from "./Panel";
import About from "./About";
import Tracks from "./Tracks";
import FeatureInfo from './FeatureInfo';
import Statistics from './Statistics';
import Railml from './Railml';
import Realtime from './Realtime';

import {getBasicData, getExtendedData, toggleFeatureInfo, selectFeature, tracksData, shareViewer} from '../actions/index'

const eventsUtils = require('../utils/eventsUtils');

import CesiumDatasources from "./CesiumDatasources";

class CesiumGlobe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewerLoaded: false
        }
    }

    componentWillMount() {
        if (localStorage.user === 'authorized'){
            console.log('Welcome to the GoSafe Visualization Platform')
        } else {
            this.props.history.push('/');
        }
    }

    componentDidMount() {

        const props = this.props;

        // Contecht Bing key
        Cesium.BingMapsApi.defaultKey ='AgQvXY2xmr8TZslgExzJr3w9XWiVDqQjGABA3zSDqTrGNQzt8jQZUI1UsfnNLvVJ'

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
        props.tracksData(this.viewer.entities);

        const scene = this.viewer.scene;

        // DELFT 3D
        /*
        this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: 'http://localhost:3001/test'
        }))
        var tilesetBuildings = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: 'http://localhost:3001/delft3d/Building'
        }))
        var tilesetWater = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: 'http://localhost:3001/delft3d/WaterBody'
        }))
        var tilesetPlants = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: 'http://localhost:3001/delft3d/PlantCover'
        }))
        tilesetBuildings.style = new Cesium.Cesium3DTileStyle({
          color: 'color("red")'
        })
        tilesetWater.style = new Cesium.Cesium3DTileStyle({
          color: 'color("blue")'
        })
        tilesetPlants.style = new Cesium.Cesium3DTileStyle({
          color: 'color("chartreuse")'
        })

        var s = [{id: 1, value: 3},{id: 2, value: 5},{id: 3, value: 3},{id: 4, value: 7},{id: 5, value: 11},{id: 6, value: 9},{id: 7, value: 2},{id: 8, value: 6},{id: 9, value: 7},{id: 10, value: 13},]

        statisticsUtils.calculateBreaks(s, 5)*/

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

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // camera
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-8.5, 53.0, 450000.0)
        })
        // Force immediate re-render now that the Cesium viewer is created
        this.setState({viewerLoaded: true}); // eslint-disable-line react/no-did-mount-set-state

        this.viewer.scene.debugShowFramesPerSecond = true;

        props.shareViewer(this.viewer)
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

        const dataSources = (this.viewer)
            ? <CesiumDatasources dataSources={this.props.dataSources.dataSources}/>
            : null;

        return (
            <div>
                <TopBar/>
                <Panel/>
                <Tracks/>
                <About/>
                <FeatureInfo/>
                <Statistics/>
                <Railml />
                <Realtime />
                <div className="cesiumGlobeWrapper" style={containerStyle}>
                    <div className="cesiumWidget" ref={element => this.cesiumContainer = element} style={widgetStyle}>
                        {contents}
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
        selectFeature: selectFeature,
        tracksData: tracksData,
        shareViewer: shareViewer
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CesiumGlobe);
