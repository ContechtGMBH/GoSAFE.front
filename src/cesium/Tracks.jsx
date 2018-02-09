import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import { Graph } from 'react-d3-graph';

import {toggleLayers} from '../actions/index';
import {getGraph, getAdjacentNodes} from '../utils/dataUtils';
import {colorSelectedFeature} from '../utils/eventsUtils';

const myConfig = {
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    highlightDegree: 0,
    //automaticRearrangeAfterDropNode: true,
    node: {
        color: 'lightgreen',
        size: 1200,
        strokeColor: '#000000',
        highlightStrokeColor: '#000000',
        fontSize: 10,
        highlightFontSize: 12,
        labelProperty: 'label',
        strokeWidth: 1,
        highlightStrokeWidth: 4
    },
    link: {
        highlightColor: 'red',
        color: '#808080'
    },
    height: 400,
    width: 655
}

class Tracks extends Component {

    constructor(props){
      super(props);

      this.state = {
        layerIndex: 0,
        colors: 'default',
        graph: {nodes: [], links: []},
        selectedNode: null,
        selectedTrackId: null,
        trackRelationship: null
      }
    }

    changeLayerIndex = (i) => {
      this.setState({layerIndex: i})
    }

    changeColors = (c) => {
      this.setState({colors: c})
    }

    selectTrack = (id) =>{

      getGraph({id: id}, (err,data)=>{
        this.setState({graph: {nodes: [], links: []}, selectedTrackId: id, selectedNode: null})
        this.setState({graph: data.data})
      })
    }

    onClickNode = (node) => {
      let selectedNode = this.state.graph.nodes.filter((n) => n.id === node)
      let trackRelationships = this.state.graph.links.filter((item) => { return (
        (item.source === this.state.selectedTrackId) && (item.target === node))
      })[0]
      let trackRelationship = "-"
      if (trackRelationships){
        trackRelationship = trackRelationships.label
      }
      this.setState({selectedNode: selectedNode[0], trackRelationship: trackRelationship})
    }

    expandNode = (id, label) => {
      getAdjacentNodes({id: id, label: label}, (err,data) => {
        this.setState({
          graph: {
            nodes: this.state.graph.nodes.concat(data.data.nodes),
            links: this.state.graph.links.concat(data.data.links)
          }
        })
      })
    }

    removeNode = (node) => {
      let filteredNodes = this.state.graph.nodes.filter((n) => n.id !== node)
      let filteredRelationships = this.state.graph.links.filter((item) => ((item.source !== node) && (item.target !== node) ))
      this.setState({
        graph: {
          selectedNode: null,
          trackRelationship: null,
          nodes: filteredNodes,
          links: filteredRelationships
        }
      })
    }

    zoomToNode = () => {
      let selectedNode = this.state.selectedNode;
      let entity = this.props.dataSources.getById(selectedNode.id)
      if (entity){
        colorSelectedFeature(entity)
        this.props.viewer.zoomTo(entity)
      }

    }

    render() {
        if (this.props.layers.display) {
          return (
              <Draggable cancel=".layers-row">
                  <div className="panel-layers">
                      <div className="header">
                          <div className="title">Tracks</div>
                      </div>
                      <div className="panel-content">
                          <div className="layers-row">
                                <div className="layers-list">
                                  <ul>
                                  {this.props.tracks.map((item,index)=>{
                                    return (<li className={(this.state.selectedTrackId === item)? "track-list-item selected-track-item" : "track-list-item" } key={index} onClick={()=>this.selectTrack(item)} >{item}</li>)
                                  })}
                                </ul>
                                 </div>
                                <div className="layers-overview">
                                    <div className="graph">
                                      {(this.state.graph.nodes.length) ? <Graph id='graph-id' data={this.state.graph} config={myConfig} onClickNode={this.onClickNode} /> : null}
                                    </div>
                                    <div className="track-details">{<span>Selected track: {this.state.selectedTrackId}</span>}</div>
                                </div>
                                <div className="node-details">
                                    {(this.state.selectedNode) ?
                                    <div>
                                      <div className="node-label">{this.state.selectedNode.label}</div>
                                      <ul className="node-properties">
                                      {
                                        Object.keys(this.state.selectedNode.properties).map((k,index) => {
                                          if (k === 'geometry'){
                                            return <li className="node-property-item" key={index} title={this.state.selectedNode.properties[k]}><b>{k}:</b> {this.state.selectedNode.properties[k].substring(0,25)}...</li>
                                          }
                                          return <li className="node-property-item" key={index}><b>{k}:</b> {this.state.selectedNode.properties[k]}</li>
                                        })
                                      }
                                    </ul>
                                    <div className="track-relationship">
                                      <div className="node-details-header">Track relationship</div>
                                      <span style={{color: '#ff6666'}}>
                                      {
                                        this.state.trackRelationship
                                      }
                                      </span>
                                    </div>
                                    <div className="node-actions">
                                      <div className="node-details-header">Actions</div>
                                      <button onClick={()=>this.expandNode(this.state.selectedNode.id, this.state.selectedNode.label)}>Expand</button>
                                      <button onClick={()=>this.removeNode(this.state.selectedNode.id)}>Remove</button>
                                      { (this.state.selectedNode.label === 'Track') ? <button onClick={()=>this.zoomToNode()}>Zoom</button> : null }
                                    </div>
                                  </div> : null}
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
      dataSources: state.tracks.dataSources,
      tracks: state.tracks.tracks,
      viewer: state.viewer.viewer
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({toggleLayers: toggleLayers}, dispatch)
}



export default connect(mapStateToProps, matchDispatchToProps)(Tracks);
