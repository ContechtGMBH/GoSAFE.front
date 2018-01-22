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
        console.log(this.props.dataSources)
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

export default connect(mapStateToProps, matchDispatchToProps)(Layers);
