import React, {Component} from "react";
import {connect} from 'react-redux';
import {v1} from 'uuid';
import Wkt from 'wicket/wicket'

import CONSTRAINTS from '../utils/newNodeConstraints'

const wkt = new Wkt.Wkt();


class AddNewNode extends Component {

    constructor(props){
      super(props);

      this.state = {
        graph: {nodes: [], links: []},
        newNodeProperties: '{"id": "' + v1() + '"}', // unique ID is created by default
        newNodePropertiesValid: true,
        newNodeRelationship: "ADDITIONAL_INFO",
        newNodeLabel: "INFO",
        newNodeGeometry: "",
        newNodeGeometryValid: true
      }
    }

    handlePropertiesChange = (e) => {
      /*
       *  New node properties input handler
       *  (1) input must be a valid JSON object
       */
      try {
        JSON.parse(e.target.value) // (1)
        this.setState({newNodePropertiesValid: true})
      } catch (err) {
        this.setState({newNodePropertiesValid: false})
      }
      this.setState({newNodeProperties: e.target.value})
    }

    handleRelationshipChange = (e) => {
      /*
       *  New node relationship with the parent nodes
       *  (1) new node label depends on this relationship
       */
      let firstLabel = CONSTRAINTS.labels[e.target.value][0] // (1)
      this.setState({
        newNodeRelationship: e.target.value,
        newNodeLabel: firstLabel
      })
    }

    handleLabelChange = (e) => {
      /*
       *  New node label handler
       */
      this.setState({newNodeLabel: e.target.value})
    }

    handleGeometryChange = (e) => {
      /*
       *  New node geometry handler
       *  (1) must be a valid WKT stringify
       *  !!! this motherfucker has an ugly console.log if can't parse a string,
       *      must be removed from the module, otherwise we've got a log onChange !!!
       */
      try {
        wkt.read(e.target.value)
        this.setState({newNodeGeometryValid: true})
      } catch (err) {
        if (e.target.value){
          this.setState({newNodeGeometryValid: false})
        } else {
          this.setState({newNodeGeometryValid: true})
        }
      }

      this.setState({newNodeGeometry: e.target.value})
    }

    createNewNode = () => {
      /*
       *  Creates a new node, adds to the graph and database (TODO)
       *  (1) node properties must be a simple, plain (not nested) JSON object,
       *  where values are always typeof 'string'
       *  (2) geometry must be a valid WKT and if is empty, should be skipped (TODO)
       */
      let node = {}
      let properties = JSON.parse(this.state.newNodeProperties)
      Object.keys(properties).forEach(k => {
        if (typeof properties[k] !== "string") { // (1)
          properties[k] = JSON.stringify(properties[k])
        }
      })
      node.id = properties.id;
      node.properties = properties;
      node.label = this.state.newNodeLabel;
      let relationship = this.state.newNodeRelationship;

      let newNode = {
        node: node,
        relationship: relationship
      }

      this.props.toggleAddNode(newNode)

    }



    render() {

          let relationships = CONSTRAINTS.relationships[this.props.selectedNode.label]; // available relationships depend on the parents label
          if (!relationships){
            relationships = []
          }

          return (
            <div className="node-details">
              <button
                onClick={()=>this.props.toggleAddNode()}
                >
                Back
              </button>
              <div>
                <div>Relationship</div>
                <div>
                  <select
                    value={this.state.newNodeRelationship}
                    onChange={(e) => this.handleRelationshipChange(e)}
                    >
                    {
                      relationships.map((item,index) => {
                         return <option key={index} value={item}>{item}</option>
                      })
                    }
                    <option
                      value={"ADDITIONAL_INFO"}
                      >
                      ADDITIONAL_INFO
                    </option>

                  </select>
                </div>
              </div>
              <div>
                <div>Label</div>
                <div>
                  <select
                    value={this.state.newNodeLabel}
                    onChange={(e) => this.handleLabelChange(e)}
                    >
                    {
                      CONSTRAINTS.labels[this.state.newNodeRelationship].map((item,index) => {
                        return <option key={index} value={item}>{item}</option>
                      })
                    }
                    {
                      (this.state.newNodeRelationship === "ADDITIONAL_INFO") ?
                          <option value={"INFO"}>INFO</option> :
                          null
                    }

                  </select>
                </div>
              </div>
              <div>
                <div>Properties</div>
                <div>
                  <textarea
                    onChange={(e) => this.handlePropertiesChange(e)}
                    defaultValue={this.state.newNodeProperties}
                    className={
                      (this.state.newNodePropertiesValid) ?
                        "new-node-properties" :
                        "new-node-properties invalid-input"
                    }
                    >
                  </textarea>
                  {
                    (this.state.newNodePropertiesValid) ?
                      null :
                      <small>Must be a valid JSON object!</small>
                  }
              </div>
              </div>

              <div>
                <div>Geometry</div>
                <div>
                  <textarea
                    onChange={(e) => this.handleGeometryChange(e)}
                    >
                  </textarea>
                  {
                    (this.state.newNodeGeometryValid) ?
                      null :
                      <small>Must be a valid WKT string or empty string!</small>
                  }
                </div>
              </div>

              <div>
                <button
                  onClick={() => this.createNewNode()}
                  disabled={!(this.state.newNodePropertiesValid && this.state.newNodeGeometryValid)}
                  >
                  Create new node
                </button>
              </div>
            </div>
          );
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




export default connect(mapStateToProps)(AddNewNode);
