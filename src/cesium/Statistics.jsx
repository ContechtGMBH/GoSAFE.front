import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import {toggleStatistics, loadDataset} from '../actions/index'

import BarChart from '../d3/BarChart'

class Statistics extends Component {

    render() {
            if (this.props.statistics.display) {
              return (
                  <Draggable cancel=".panel-content">
                      <div className="panel-statistics">
                          <div className="statistics-header">
                              <div className="statistics-title">Statistics</div>
                          </div>
                          <div className="statistics-panel-content">
                            <div className="statistics-chart-controls">
                              <div>An example d3 barchart...</div>
                              <br/>
                              <select className="combobox" onChange={event => this.props.loadDataset(event.target.value)}>
                                <option value="DATASET1">Dataset 1</option>
                                <option value="DATASET2">Dataset 2</option>
                                <option value="DATASET3">Dataset 3</option>
                              </select>
                            </div>
                            <div className="statistics-chart">
                              <BarChart data={this.props.datasets.dataset} size={[300, 300]}/>
                            </div>
                          </div>

                          <div className="statistics-footer">
                              <div className="statistics-btn-container">
                                  <div className="statistics-close" onClick={() => this.props.toggleStatistics(this.props.statistics.display)}>Close</div>
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
      statistics: state.statistics,
      datasets: state.datasets
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
      toggleStatistics: toggleStatistics,
      loadDataset: loadDataset
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Statistics);
