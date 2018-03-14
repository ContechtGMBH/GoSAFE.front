import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import {toggleFeatureInfo, elementsData, neighbourhoodData} from '../actions/index'

class FeatureInfo extends Component {

    generateRows() {
        /*
         * Generates <table> rows from properties object
         */
        var data = this.props.selectedFeature.properties;
        var rows = [];
        Object.entries(data).forEach(
            ([key, value]) => {
              if ((key !== "geometry") && (key !== "bbox")){rows.push(<tr key={key}><td>{key}</td><td>{value}</td></tr>)}
            }
        );
        return rows

    }

    render() {
            if (this.props.featureInfo.display) {
                var rows = this.generateRows();
              return (
                  <Draggable cancel=".panel-content">
                      <div className="panel-feature-info">
                          <div className="-feature-info-header">
                              <div className="feature-info-title">Feature</div>
                          </div>
                          <div className="feature-info-panel-content">
                              <table className="feature-info-properties-table">
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </table>
                            {(this.props.selectedFeature.name) ?
                                <div className="elements-btn-container">
                                  <button
                                    className="show-elements"
                                    onClick={() => this.props.elementsData(this.props.selectedFeature.properties.id, this.props.dataSources)}
                                    >
                                    Show elements
                                  </button>
                                  <button
                                    className="show-elements"
                                    onClick={() => this.props.neighbourhoodData(this.props.selectedFeature.properties.geometry, this.props.dataSources)}
                                    >
                                    Show neighbourhood
                                  </button>
                                </div> : null
                            }
                          </div>

                          <div className="feature-info-footer">
                              <div className="feature-info-btn-container">
                                  <div
                                    className="feature-info-close"
                                    onClick={() => this.props.toggleFeatureInfo(this.props.featureInfo.display)}
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
        featureInfo: state.featureInfo,
        selectedFeature: state.selectedFeature,
        dataSources: state.tracks.dataSources
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        toggleFeatureInfo: toggleFeatureInfo,
        elementsData: elementsData,
        neighbourhoodData: neighbourhoodData
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(FeatureInfo);
