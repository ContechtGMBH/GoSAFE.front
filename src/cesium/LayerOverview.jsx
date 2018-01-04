import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Geostats from 'geostats';

import Cesium from "cesium/Source/Cesium";

import {toggleLayers} from '../actions/index';

const legend = {
  tracks: '#ffff00',
  platforms: '#ff0000',
  signals: '#0000ff',
  counties: '#00ff00'

}

class LayerOverview extends Component {

    constructor(props){
      super(props);

      this.state = {
        layerIndex: 0,
        colors: 'default'
      }

    }

    graduatedColors = (attribute) => {
      let ents = this.props.dataSources._entityCollection._entities.values;
      let attr = [];
      ents.forEach((entity) => {
        attr.push(entity.properties[attribute]._value)
      })
      let t = new Geostats(attr)
      let jenks = t.getClassJenks(4)

      if (ents[0].polyline){
        ents.forEach((entity) => {
          let v = entity.properties[attribute]._value
          if (v < jenks[1]){
            entity.polyline.material.color = Cesium.Color.ORANGERED
          } else if (v < jenks[2]) {
            entity.polyline.material.color = Cesium.Color.YELLOW
          } else if (v < jenks[3]) {
            entity.polyline.material.color = Cesium.Color.GREENYELLOW
          } else {
            entity.polyline.material.color = Cesium.Color.LIME
          }
        })
      } else if (ents[0].polygon){
        ents.forEach((entity) => {
          let v = entity.properties[attribute]._value
          if (v < jenks[1]){
            entity.polygon.material.color = Cesium.Color.ORANGERED
          } else if (v < jenks[2]) {
            entity.polygon.material.color = Cesium.Color.YELLOW
          } else if (v < jenks[3]) {
            entity.polygon.material.color = Cesium.Color.GREENYELLOW
          } else {
            entity.polygon.material.color = Cesium.Color.LIME
          }
        })
      } else {
        ents.forEach((entity) => {
          let v = entity.properties[attribute]._value
          if (v < jenks[1]){
            entity.point.color = Cesium.Color.ORANGERED
          } else if (v < jenks[2]) {
            entity.point.color = Cesium.Color.YELLOW
          } else if (v < jenks[3]) {
            entity.point.color = Cesium.Color.GREENYELLOW
          } else {
            entity.point.color = Cesium.Color.LIME
          }
        })
      }
    }

    defaultColor = (layer) => {
      let ents = this.props.dataSources._entityCollection._entities.values;
      if (ents[0].polyline){
        ents.forEach((entity) => {
          entity.polyline.material.color = Cesium.Color.fromCssColorString(legend[layer])
        })
      } else if (ents[0].polygon){
        ents.forEach((entity) => {
          entity.polygon.material.color = Cesium.Color.fromCssColorString(legend[layer])
        })
      } else {
        ents.forEach((entity) => {
          entity.point.color = Cesium.Color.fromCssColorString(legend[layer])
        })
      }

    }

    changeStyle = (e, layer) => {
      let style = e.target.value;
      if (style === 'default'){
        this.changeColors('default');
        this.defaultColor(layer);
      } else {
        this.changeColors('graduated');
        this.graduatedColors(this.props.dataSources.colors.attribute);
      }
      //this.setState(this.state)
    }

    changeLayerIndex = (i) => {
      this.setState({layerIndex: i})
    }

    changeColors = (c) => {
      if (this.props.dataSources.colors.style === 'default'){
        this.props.dataSources.colors.style = 'graduated'
      } else {
        this.props.dataSources.colors.style = 'default'
      }
      this.setState(this.state)
    }

    changeStyleAttribute = (e) => {
      this.props.dataSources.colors.attribute = e.target.value;
      this.setState(this.state)
      this.graduatedColors(this.props.dataSources.colors.attribute);
    }

    showLayer = () => {
      this.props.dataSources.show = !this.props.dataSources.show
      this.setState(this.state)
    }


    render() {
      return (<div>
        <div>Layer name: {this.props.dataSources.name}</div>
        <div>Number of features: {this.props.dataSources._entityCollection._entities.length}</div>
        <div>Show: <input type="checkbox" onChange={this.showLayer} checked={this.props.dataSources.show} /></div>
        <div>-----------</div>
        <label htmlFor="default">
        <input id="default" type="radio" name="display" value="default" onChange={(e) => this.changeStyle(e, this.props.dataSources.name)} checked={this.props.dataSources.colors.style === 'default'} />Default Color
        </label>
        <label htmlFor="graduated">
        <input id="graduated" type="radio" name="display" value="graduated" onChange={(e) => this.changeStyle(e, this.props.dataSources.name)} checked={this.props.dataSources.colors.style === 'graduated'} />Graduated Color
        </label>
        {(this.props.dataSources.colors.style === 'graduated') && <div className="layer-overview-graduated">
          <div className="layer-overview-graduated-attribute">
            Attribute: 
            <select className="layer-overview-combobox" onChange={(e) => this.changeStyleAttribute(e)} value={this.props.dataSources.colors.attribute}>
              <option value="gid">gid</option>
            </select>
          </div>
          <div className="layer-overview-graduated-legend">
            <div><div className="legend-entry" style={{background: '#FF4500'}}></div> Low</div>
            <div><div className="legend-entry" style={{background: '#FFFF00'}}></div> Medium</div>
            <div><div className="legend-entry" style={{background: '#ADFF2F'}}></div> High</div>
            <div><div className="legend-entry" style={{background: '#00FF00'}}></div> Extremely High</div>
          </div>
        </div>}
      </div>)
    }
}

function mapStateToProps(state) {
    return {
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({toggleLayers: toggleLayers}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LayerOverview);
