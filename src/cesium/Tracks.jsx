import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import { Graph } from 'react-d3-graph';

import AddNewNode from './AddNewNode'

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
        trackRelationship: null,
        addNodeView: false,
        deletedRelationships: [],
        trackSearchPhrase: "",
        filteredTracksList: []
      }
    }

    changeLayerIndex = (i) => {
      this.setState({layerIndex: i})
    }

    changeColors = (c) => {
      this.setState({colors: c})
    }

    handleTrackSearch = (e) => {
      /*
       *  Search input handler, if empty display from props, else from state
       */
      let phrase = e.target.value;
      let filteredTracks = this.props.tracks.filter((item) => (item) ? (item.includes(phrase)) : false)
      this.setState({filteredTracksList: filteredTracks, trackSearchPhrase: phrase})
    }

    selectTrack = (id) =>{
      /*
       *  Select a track from the list
       */
      getGraph({id: id}, (err,data)=>{
        this.setState({graph: {nodes: [], links: []}, selectedTrackId: id, selectedNode: null, deletedRelationships: []})
        this.setState({graph: data.data})
      })
    }

    onClickNode = (node) => {
      /*
       *  When a node is clicked on the canvas it is set as selected
       */
      let selectedNode = this.state.graph.nodes.filter((n) => n.id === node)
      let trackRelationships = this.state.graph.links.filter((item) => { return (
        (item.source === this.state.selectedTrackId) && (item.target === node))
      })[0]
      let trackRelationship = "-"
      if (trackRelationships){
        trackRelationship = trackRelationships.label
      }
      this.setState({
        selectedNode: selectedNode[0],
        trackRelationship: trackRelationship,
        addNodeView: false,
        newNodePropertiesValid: true
      })
    }

    expandNode = (id, label) => {
      /*
       * When the expand button is clicked '(n)-[r]-(e) RETURN n,r,e' query is executed
       * (1) nodes and relationships are added to the Graph
       * (2) if there are old nodes related to any new node, relations between them are recreated from 'deletedRelationships'
       * (3) duplicates are removed
       */
      getAdjacentNodes({id: id, label: label}, (err,data) => {
        let nodes = this.state.graph.nodes.concat(data.data.nodes)
        let links = this.state.graph.links.concat(data.data.links) // (1)
        this.state.deletedRelationships.forEach((item) => {
          if (
            (nodes.some(n => n.id === item.target)) && (nodes.some(n => n.id === item.source)) // (2)
          ) {
            links.push(item)
          }
        })
        nodes = nodes.filter((node, index, self) => {
          return index === self.findIndex(n => n.id === node.id) // (3)
        })
        links = links.filter((link_, index, self) => {
          return index === self.findIndex(li => {
            return (((li.source === link_.source) && (li.target === link_.target)) ||
                   ((li.source === link_.target) && (li.target === link_.source))) // (3) ;---DDDDD
          })
        })
        this.setState({
          graph: {
            nodes: nodes,
            links: links
          }
        })
      })
    }

    removeNode = (node) => {
      /*
       *  When remove button is clicked node and it's relationships are deleted
       *  (1) deleted relationships are saved and if deleted node is back, they'll be restored
       */
      let filteredNodes = this.state.graph.nodes.filter((n) => n.id !== node)
      let filteredRelationships = this.state.graph.links.filter((item) => ((item.source !== node) && (item.target !== node) ))
      let deletedRelationships = this.state.graph.links.filter((item) => ((item.source === node) || (item.target === node) )) // (1)
      this.setState({
        graph: {
          nodes: filteredNodes,
          links: filteredRelationships
        },
        selectedNode: null,
        trackRelationship: null,
        deletedRelationships: this.state.deletedRelationships.concat(deletedRelationships)
      })
    }

    zoomToNode = () => {
      /*
       *  Zoom Cesium camera to the selected node, if it is on the map
       *  option available only for tracks
       */
      let selectedNode = this.state.selectedNode;
      let entity = this.props.dataSources.getById(selectedNode.id)
      if (entity){
        colorSelectedFeature(entity)
        this.props.viewer.zoomTo(entity)
      }

    }

    toggleAddNode = (created) => {
      /*
       *  Function connected to the different events
       *  (1) toggles 'AddNewNode' component
       *  (2) if 'created' is undefined it only switch the state
       *  otherwise it creates a new node and relationship and adds it to the graph
       *  use {() => this.toggleAddNode()} to switch only
       *  use {() => his.toggleAddNode(obj)} to switch and create a new node
       */
      let currentState = this.state.addNodeView;
      this.setState({
        addNodeView: !currentState // (1)
      })

      if (created){ // (2)
        this.setState({graph: {nodes: [], links: []}})
        let graph = this.state.graph;
        graph.nodes = graph.nodes.concat(created.node)
        let relationship = {
          source: this.state.selectedNode.id,
          target: created.node.properties.id,
          label: created.relationship
        }
        graph.links = graph.links.concat(relationship)
        this.setState({
          graph: graph
        })
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
                                <div className="tracks-selection">
                                  <div className="tracks-search">
                                    <input
                                      className="tracks-search-input"
                                      type="text"
                                      placeholder="Search..."
                                      onChange={(e) => this.handleTrackSearch(e)}
                                      value={this.state.trackSearchPhrase}
                                      >
                                    </input>
                                  </div>
                                  <div className="layers-list">
                                    <ul>
                                      {
                                        (this.state.trackSearchPhrase) ?

                                          this.state.filteredTracksList.map((item,index)=>{
                                          return (<li
                                                    className={
                                                                (this.state.selectedTrackId === item) ?
                                                                  "track-list-item selected-track-item" :
                                                                  "track-list-item"
                                                              }
                                                    key={index}
                                                    onClick={()=>this.selectTrack(item)}
                                                    >
                                                    {item}
                                                  </li>)
                                                })

                                        :

                                          this.props.tracks.map((item,index)=>{
                                          return (<li
                                                    className={
                                                                (this.state.selectedTrackId === item) ?
                                                                  "track-list-item selected-track-item" :
                                                                  "track-list-item"
                                                              }
                                                    key={index}
                                                    onClick={()=>this.selectTrack(item)}
                                                    >
                                                    {item}
                                                  </li>)
                                                })

                                      }

                                    </ul>
                                   </div>
                                </div>
                                <div className="layers-overview">
                                    <div className="graph">
                                      {
                                        (this.state.graph.nodes.length) ?
                                        <Graph
                                          id='graph-id'
                                          data={this.state.graph}
                                          config={myConfig}
                                          onClickNode={this.onClickNode}
                                          /> :
                                          null
                                      }
                                    </div>
                                    <div className="track-details">
                                      {
                                        <span>Selected track: {this.state.selectedTrackId}</span>
                                      }
                                    </div>
                                </div>
                                <div className="node-details">
                                    {
                                      (this.state.selectedNode && (!this.state.addNodeView)) ?
                                        <div>
                                          <div className="node-label">{this.state.selectedNode.label}</div>
                                          <ul className="node-properties">
                                          {
                                            Object.keys(this.state.selectedNode.properties).map((k,index) => {
                                              if (k === 'geometry'){
                                                return (<li
                                                        className="node-property-item"
                                                        key={index}
                                                        title={this.state.selectedNode.properties[k]}
                                                        >
                                                        <b>{k}:</b> {this.state.selectedNode.properties[k].substring(0,25)}...
                                                      </li>)
                                              }
                                              return (<li
                                                        className="node-property-item"
                                                        key={index}
                                                        >
                                                        <b>{k}:</b> {this.state.selectedNode.properties[k]}
                                                      </li>)
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
                                          <button
                                            onClick={()=>this.expandNode(this.state.selectedNode.id, this.state.selectedNode.label)}
                                            >
                                            Expand
                                          </button>
                                          <button
                                            onClick={()=>this.removeNode(this.state.selectedNode.id)}
                                            >
                                            Remove
                                          </button>
                                          {
                                            (this.state.selectedNode.label === 'Track') ?
                                              <button onClick={()=>this.zoomToNode()}>Zoom</button> :
                                              null
                                            }
                                          <button
                                            onClick={()=>this.toggleAddNode()}
                                            >
                                            Add
                                          </button>
                                        </div>
                                      </div> :
                                      null
                                    }
                                    {
                                      (this.state.selectedNode && this.state.addNodeView) ?
                                        <AddNewNode
                                          toggleAddNode={(created)=>{this.toggleAddNode(created)}}
                                          selectedNode={this.state.selectedNode}
                                          /> :
                                          null
                                    }
                                </div>
                          </div>
                      </div>

                      <div className="footer">
                          <div className="btn-container">
                              <div
                                className="close-layers"
                                onClick={() => this.props.toggleLayers(this.props.layers.display)}
                                >
                                Close
                              </div>
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
