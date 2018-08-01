import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import Predict from './Predict'

import {toggleStatistics, loadDatasets} from '../actions/index'

class Statistics extends Component {

  constructor(props){
    super(props);

    this.state = {
      selectedDataset: "",
      inputForm: []
    }
  }

    componentDidMount(){
      this.props.loadDatasets()
    }

    changeDataset = (e) => {
      let ds = e.target.value;
      this.setState({
        selectedDataset: ds
      })
    }

    render() {
            if (this.props.statistics.display) {
              return (
                  <Draggable cancel=".statistics-panel-content">
                      <div className="panel-statistics">
                          <div className="statistics-header">
                              <div className="statistics-title">Statistics</div>
                          </div>
                          <div className="statistics-panel-content">
                            <div className="statistics-chart-controls">
                              <div>Dataset: </div>
                              {
                                (this.props.datasets.datasets) ?
                                <select className="combobox" onChange={this.changeDataset} value={this.state.selectedDataset}>
                                  <option disabled value="">select</option>
                                  {
                                    Object.keys(this.props.datasets.datasets).map((key, index) => {
                                      return (
                                        <option key={index} value={key}>{key}</option>
                                      )
                                    })
                                  }
                                </select> : null
                              }
                              <br/>
                              <br/>
                              <br/>
                              {
                                (this.state.selectedDataset) ?
                                <table>
                                  <thead>
                                      <tr>
                                          <th>Model</th>
                                          <th>Accuracy</th>
                                          <th>F1 score</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      this.props.datasets.datasets[this.state.selectedDataset]["tools"]
                                      .map((item, index)=>{
                                        return (<tr key={index}>
                                                  <td>{item.type}</td>
                                                  <td>{item["params"]["accuracy"].toFixed(4)}</td>
                                                  <td>{item["params"]["f1"].toFixed(4)}</td>
                                                </tr>)
                                      })
                                    }
                                  </tbody>
                                </table> : null
                              }
                              <br/>
                              <br/>
                              <br/>
                              {
                                (this.state.selectedDataset) ?
                                <div>
                                  <div>Predict: <b>{this.props.datasets.datasets[this.state.selectedDataset]["meta"]["columns"]["target"]}</b></div>
                                </div> : null
                              }

                            </div>
                            <div className="statistics-chart">
                              {
                                (this.state.selectedDataset) ?
                                <Predict dataset={this.state.selectedDataset} /> : null
                              }
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
      loadDatasets: loadDatasets
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Statistics);
