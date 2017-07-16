import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Draggable from 'react-draggable';

import {toggleAbout} from '../actions/index'

class About extends Component {

    render() {
            if (this.props.about.display) {
              return (
                  <Draggable cancel=".panel-content">
                      <div className="panel-about">
                          <div className="header">
                              <div className="title">About</div>
                          </div>
                          <div className="panel-content">
                              <span className="about-info">Authors: Damian Michal Harasymczuk</span>
                              <br/>
                              <span className="about-info">Company: Contecht GMBH</span>
                              <br/>
                              <span className="about-info">Contact: harasymczuk@contecht.eu</span>
                              <br/>
                              <span className="about-info">License: MIT</span>
                          </div>

                          <div className="footer">
                              <div className="btn-container">
                                  <div className="close" onClick={() => this.props.toggleAbout(this.props.about.display)}>Close</div>
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
    return {about: state.about}
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({toggleAbout: toggleAbout}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(About);
