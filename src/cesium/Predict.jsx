import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {prediction} from '../utils/dataUtils';

class Predict extends Component {

  constructor(props){
    super(props);

    this.state = {
      input: Array.from(Array(20), () => 0),
      output: ''
    }
  }

  handleInputChange = (i, e) => {
    let input = this.state.input;
    input[i] = parseFloat(e.target.value);
    this.setState({
      input: input
    })
  }

  predict = () => {
    let len = this.props.datasets.datasets[this.props.dataset]["meta"]["columns"]["data"].length;
    let input = this.state.input.slice(0, len);
    let data = {
      ctype: 'NaiveBayes',
      dataset: this.props.dataset,
      cdata: [input]
    }
    prediction(data,(err, res) => {
      let categorized_columns = this.props.datasets.datasets[this.props.dataset]["meta"]["categorized"];
      let target_categories = categorized_columns[this.props.datasets.datasets[this.props.dataset]["meta"]["columns"]["target"]]
      this.setState({
        output: target_categories[res.data.class[0]]
      })
    })
  }

  render() {
      return (
        <div className="predict-container">

          <div className="predict-table">
            <table>
              <thead>
                  <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                  </tr>
              </thead>
              <tbody>
                {
                  this.props.datasets.datasets[this.props.dataset]["meta"]["columns"]["data"].map((item,index) => {
                    return (
                      <tr key={index}>
                        <td style={{width: '325px'}}>{item}</td>
                        <td>
                          <input
                            style={{width: '75px'}}
                            type="number"
                            value={this.state.input[index]}
                            onChange={(e) => this.handleInputChange(index, e)}
                            />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <br/>
          <div>
            <select className="combobox">
              <option disabled value="">select</option>
                {
                  this.props.datasets.datasets[this.props.dataset].tools.map((tool, index) => {
                    return (
                      <option key={index}>{tool.type}</option>
                    )
                  })
                }
            </select>
            <button onClick={this.predict}>Predict</button>
            <br/>
            <br/>
            <div>{this.state.output}</div>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
    return {
      datasets: state.datasets
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Predict);
