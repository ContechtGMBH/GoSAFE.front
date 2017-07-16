import React, {Component} from "react";
import {connect} from 'react-redux';

import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import Cesium from "cesium/Source/Cesium";

import TopBar from "./TopBar"
import Panel from "./Panel";
import About from "./About";
import Layers from "./Layers";

import CesiumBillboard from "./CesiumBillboard";
import CesiumDatasources from "./CesiumDatasources";

class CesiumGlobe extends Component {
    constructor (props){
      super(props);

      this.state = {
          viewerLoaded : false,
      }
    }


    componentDidMount() {

        this.viewer = new Viewer(this.cesiumContainer, {
            animation : false,
            //baseLayerPicker : false,
            //fullscreenButton : false,
            //geocoder : false,
            homeButton : false,
            //infoBox : false,
            sceneModePicker : false,
            //selectionIndicator : true,
            timeline : false,
            navigationHelpButton : false,
            //scene3DOnly : true,
            //imageryProvider,
            //terrainProvider,
        });

        this.viewer.camera.flyTo({destination : Cesium.Cartesian3.fromDegrees(-8.484, 54.272, 1500.0)})

        // Force immediate re-render now that the Cesium viewer is created
        this.setState({viewerLoaded : true}); // eslint-disable-line react/no-did-mount-set-state
    }

    componentWillUnmount() {
        if(this.viewer) {
            this.viewer.destroy();
        }
    }


    renderContents() {
        const {viewerLoaded} = this.state;
        let contents = null;

        if(viewerLoaded) {
            contents = (
                <span>
                </span>
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
            display : "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems : "stretch",
        };

        const widgetStyle = {
            flexGrow : 2
        }

        const contents = this.renderContents()
        //console.log(this.props)

        const billboard = (this.viewer) ? <CesiumBillboard scene={this.viewer.scene} /> : null;
        const dataSources = (this.viewer) ? <CesiumDatasources dataSources={this.viewer.dataSources} /> : null;

        return (
            <div>
            <TopBar />
            <Panel/>
            <Layers/>
            <About/>
                <div className="cesiumGlobeWrapper" style={containerStyle}>
                    <div
                        className="cesiumWidget"
                        ref={ element => this.cesiumContainer = element }
                        style={widgetStyle}
                    >
                        {contents}
                        {billboard}
                        {dataSources}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
  return {
    testing: state.test
  }
}

export default connect(mapStateToProps)(CesiumGlobe);
