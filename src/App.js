import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import CesiumGlobe from "./cesium/CesiumGlobe";
import Homepage from './home/Homepage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/platform" component={CesiumGlobe} />
                </div>
            </Router>
        );
    }
}

export default App;
