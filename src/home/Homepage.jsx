import React, {Component} from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

export default class Homepage extends Component {
    render(){
        return (
            <div className="container">
                <div className="logo">
                    <img src={logo} alt=""></img>
                </div>
                <h1 className="title">Visualization Platform development version</h1>
                <Link className="start" to="/platform">Start</Link>
                <br/>
                <small>Damian Michal Harasymczuk: harasymczuk@contecht.eu</small>
                <br/>
                <small> https://github.com/ContechtGMBH</small>
                    <br/>
                    <small> https://github.com/dmh126</small>
                <br/>
                <small> http://gosaferail.eu</small>
            </div>
        )
    }
}
