import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {toggleAbout} from '../actions/index'

class About extends Component {

    render() {
            if (this.props.about.display) {
              return (
                  <div className="panel-about">
                      <h4>GoSafe Rail Visualization Platform</h4>
                      <hr/>
                      <span>Authors: Damian Michal Harasymczuk</span>
                      <br/>
                      <span>Company: Contecht GMBH</span>
                      <br/>
                      <span>Contact: harasymczuk@contecht.eu</span>
                      <br/>
                      <span>License: MIT</span>
                      <div className="close" onClick={() => this.props.toggleAbout(this.props.about.display)}>Close</div>
                  </div>
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
