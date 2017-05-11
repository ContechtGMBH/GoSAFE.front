import React, {Component} from "react";

export default class Panel extends Component {

    render() {
        return (
            <div className="panel-main">
                <div className="tabs">
                    <a className="tab">tab1</a>
                    <a className="tab">tab2</a>
                    <a className="tab">tab3</a>
                    <hr/>
                </div>
                <div className="tab-content">
                    <input type="checkbox"/> Tracks
                </div>
            </div>
        );
    }
}
