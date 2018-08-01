import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import {toggleRealtime} from '../actions/index'

import {getCurrentTrains} from '../utils/dataUtils';
import Cesium from "cesium/Source/Cesium";

class Realtime extends Component {

    constructor(props){
      super(props);

      this.state = {
        trains: []
      }
    }

    getTrains = () => {
      getCurrentTrains( (error, trains) => {
        if (error) throw error;
        // Remove existing realtime objects
        /*this.props.viewer.entities.values.forEach((entity) => {
          if (entity.name === 'realtime') {
            this.props.viewer.entities.remove(entity)
          }
        })*/
        trains.data.forEach((item) => {
          let code = item["TrainCode"][0]
          let direction = item["Direction"][0]
          let position = {
            x: parseFloat(item["TrainLongitude"][0]),
            y: parseFloat(item["TrainLatitude"][0])
          }
          if (position.x && position.y){

            let existing = this.props.viewer.entities.getById(code);
            if (existing){
              existing.position = Cesium.Cartesian3.fromDegrees(position.x, position.y)
            } else {
              let pin = new Cesium.PinBuilder().fromMakiIconId('rail', Cesium.Color.CORAL, 48)
              this.props.viewer.entities.add({
                id : code,
                name: 'realtime',
                position : Cesium.Cartesian3.fromDegrees(position.x, position.y),
                properties: {
                  'Train Code': code,
                  'Direction': direction
                },
                billboard : {
                  image : pin,
                  verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                }
              });
            }
          }
        })
        this.setState({trains: trains.data})
      } )
    }

    render() {
            if (this.props.realtime.display) {
              return (
                  <Draggable cancel=".realtime-panel-content">
                      <div className="panel-realtime">
                          <div className="realtime-header">
                              <div className="statistics-title">Realtime</div>
                          </div>
                          <div className="realtime-panel-content">
                            <button className="realtime-refresh-btn" onClick={() => this.getTrains()}>REFRESH</button>
                            <table className="realtime-table">
                              <thead>
                                {
                                  (this.state.trains.length) ?
                                  <tr>
                                      <th>Code</th>
                                      <th>Status</th>
                                      <th>Direction</th>
                                      <th>Message</th>
                                  </tr> : null
                                }
                              </thead>
                              <tbody>
                                {
                                  this.state.trains.map((item,index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{item["TrainCode"][0]}</td>
                                        <td>{item["TrainStatus"][0]}</td>
                                        <td>{item["Direction"][0]}</td>
                                        <td>{item["PublicMessage"][0].replace(/\\n/g, ', ')}</td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>

                            </table>
                          </div>

                          <div className="realtime-footer">
                              <div className="realtime-btn-container">
                                  <div className="realtime-close" onClick={() => this.props.toggleRealtime(this.props.realtime.display)}>Close</div>
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
      realtime: state.realtime,
      viewer: state.viewer.viewer
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
      toggleRealtime: toggleRealtime,
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Realtime);
