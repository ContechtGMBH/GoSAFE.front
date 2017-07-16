import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import {toggleLayers} from '../actions/index'

class Layers extends Component {

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
                                         <ul>
                                             <li>Layer</li>
                                             <li>Layer</li>
                                         </ul>
                                     </div>
                                    <div className="layers-overview">
                                        Overview
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
    return {layers: state.layers}
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({toggleLayers: toggleLayers}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Layers);
