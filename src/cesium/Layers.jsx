import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import LayerOverview from './LayerOverview'


import {toggleLayers} from '../actions/index';

const legend = {
  tracks: '#ffff00',
  platforms: '#ff0000',
  signals: '#0000ff',
  counties: '#00ff00'

}

class Layers extends Component {

    constructor(props){
      super(props);

      this.state = {
        layerIndex: 0,
        colors: 'default'
      }
    }

    changeLayerIndex = (i) => {
      this.setState({layerIndex: i})
    }

    changeColors = (c) => {
      this.setState({colors: c})
    }

    render() {

        if (this.props.layers.display) {
          return (
              <Draggable cancel=".layers-row">
                  <div className="panel-layers">
                      <div className="header">
                          <div className="title">Layers</div>
                      </div>
                      <div className="panel-content">
                          <div className="layers-row">
                                <div className="layers-list">
                                    {this.props.dataSources && <LayersTree selected={this.state.layerIndex} dataSources={this.props.dataSources._dataSources} changeIndex={(i)=>this.changeLayerIndex(i)}/>}
                                 </div>
                                <div className="layers-overview">
                                    {this.props.dataSources && <LayerOverview dataSources={this.props.dataSources._dataSources[this.state.layerIndex]} />}
                                </div>
                          </div>
                      </div>

                      <div className="footer">
                          <div className="btn-container">
                              <div className="close-layers" onClick={() => this.props.toggleLayers(this.props.layers.display)}>Close</div>
                          </div>
                      </div>
                  </div>
              </Draggable>
          );
        } else {
          return null;
        }
    }
}

function mapStateToProps(state) {
    return {
      layers: state.layers,
      dataSources: state.dataSources.dataSources
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({toggleLayers: toggleLayers}, dispatch)
}

function LayersTree(props){
  return (<ul>
            {props.dataSources.map((item,index)=>{
              return <li key={index} onClick={()=>props.changeIndex(index)} className={(index === props.selected) ? 'selected-layer' : ''}>
                      <div className="legend-entry" style={{background: legend[item.name]}}></div> {item.name}
                    </li>
            })}
          </ul>)
}
/*
function LayerOverview(props){

  function graduatedColors(){
    let ents = props.dataSources._entityCollection._entities.values;
    let attr = [];
    ents.forEach((entity) => {
      attr.push(entity.properties['gid']._value)
    })
    let t = new Geostats(attr)
    let jenks = t.getClassJenks(4)

    if (ents[0].polyline){
      ents.forEach((entity) => {
        let v = entity.properties['gid']._value
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
        let v = entity.properties['gid']._value
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
        let v = entity.properties['gid']._value
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

  function defaultColor(layer){
    let ents = props.dataSources._entityCollection._entities.values;
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

  function changeStyle(e, layer){
    let style = e.target.value;
    console.log(style === 'default')
    if (style === 'default'){
      props.changeColors('default');
      defaultColor(layer);
    } else {
      props.changeColors('graduated');
      graduatedColors();
    }
  }

  return (<div>
    <div>Layer name: {props.dataSources.name}</div>
    <div>Number of features: {props.dataSources._entityCollection._entities.length}</div>
    <div>-----------</div>
    <label htmlFor="default">
    <input id="default" type="radio" name="display" value="default" onChange={(e) => changeStyle(e, props.dataSources.name)} checked={props.colors === 'default'} />Default Color
    </label>
    <label htmlFor="graduated">
    <input id="graduated" type="radio" name="display" value="graduated" onChange={(e) => changeStyle(e, props.dataSources.name)} checked={props.colors === 'graduated'} />Graduated Color
    </label>
    <div onClick={graduatedColors}>Graduated Colors</div>
    <div onClick={() => defaultColor(props.dataSources.name)}>Default Color</div>
  </div>)
}*/

export default connect(mapStateToProps, matchDispatchToProps)(Layers);
