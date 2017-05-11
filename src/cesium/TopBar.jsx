import React, {Component} from "react";

export default class TopBar extends Component {

  test() {
    console.log('test')
  }

    render() {
        return (
            <div className="top-bar">
                <div className="menu" onClick={this.test}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="user">
                  Place for user menu
                </div>
            </div>
        );
    }
}
