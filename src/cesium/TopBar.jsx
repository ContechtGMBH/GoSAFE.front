import React, {Component} from "react";

export default class TopBar extends Component {

  test() {
    console.log('test')
  }

    render() {
        return (
            <div className="top-bar">
                <div className="menu" onClick={this.test}>

                </div>
                <div className="user">
                  User menu goes here
                </div>
            </div>
        );
    }
}
