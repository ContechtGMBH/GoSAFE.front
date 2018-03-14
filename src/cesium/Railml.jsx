import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import {toggleRailml, railmlData} from '../actions/index'

class Railml extends Component {

    constructor(props, context) {
      super(props, context);

      this.state = {
        crs: '29901',
        file: null
      }

      this.chooseCrs = this.chooseCrs.bind(this);
      this.chooseFile = this.chooseFile.bind(this);
      this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(){
        const data = new FormData();
        data.append('file', this.state.file);
        data.append('crs', this.state.crs);
        //this.props.railmlData(data, this.props.dataSources.dataSources)
    }

    chooseFile(e){
      this.setState({file: e.target.files[0]})
    }

    chooseCrs(e){
      this.setState({crs: e.target.value})
    }

    render() {

            const crs = [{name: 'Irish', epsg: '29901'}, {name: 'WGS 84', epsg: '4326'}]

            let button;
            if (this.state.file){
              button = <button className="upload-btn" onClick={this.uploadFile}>Upload</button>
            } else {
              button = null;
            }

            if (this.props.railml.display) {
              return (
                  <Draggable cancel=".panel-content">
                      <div className="panel-railml">
                          <div className="railml-header">
                              <div className="railml-title">Railml</div>
                          </div>
                          <div className="railml-panel-content">
                                <div className="railml-container">
                                  Input CRS:
                                  <select className="select-btn" onChange={this.chooseCrs} value={this.state.crs}>
                                    {crs.map((item, index) => {
                                      return <option key={index} value={item.epsg}>{item.name}</option>
                                    })}
                                  </select>
                                  <br/>
                                  <br/>
                                  File:
                                  <input type="file" accept=".xml, .railml" onChange={this.chooseFile}></input>
                                  <br/>
                                  <br/>
                                  {button}
                                </div>

                          </div>

                          <div className="railml-footer">
                              <div className="railml-btn-container">
                                  <div className="railml-close" onClick={() => this.props.toggleRailml(this.props.railml.display)}>Close</div>
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
      railml: state.railml,
      dataSources: state.dataSources
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
      toggleRailml: toggleRailml,
      railmlData: railmlData
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Railml);
