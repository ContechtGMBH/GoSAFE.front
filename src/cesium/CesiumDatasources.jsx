import {Component} from "react";
//import {connect} from 'react-redux';

import Color from "cesium/Source/Core/Color";
import GeoJsonDataSource from "cesium/Source/DataSources/GeoJsonDataSource";

import layerTracks from "../assets/tracks.geojson";
import layerSignals from "../assets/signals.geojson";
import layerPlatforms from "../assets/platforms.geojson";

import layerCounties from "../assets/counties.geojson";


export default class CesiumBillboard extends Component {
    componentDidMount() {

      this.tracks = new GeoJsonDataSource.load(layerTracks, {

      });
      this.signals = new GeoJsonDataSource.load(layerSignals, {
            strokeWidth: 1,
            markerSymbol: 'rail',
            markerColor: Color.BLUE,

      });
      this.platforms = new GeoJsonDataSource.load(layerPlatforms, {
          stroke: Color.RED,
          strokeWidth: 10,

      });

      this.counties = new GeoJsonDataSource.load(layerCounties, {

      });

      const {dataSources} = this.props;


        if(dataSources) {
          dataSources.add(this.tracks);
          dataSources.add(this.signals);
          dataSources.add(this.platforms);
        }

    }

    render() {
        return null;
    }

    componentWillUnmount() {

    }
}
