import React, {Component} from "react";
import axios from "axios";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from '../assets/logo.png'

declare var __API_URL__ : String;

export default class Homepage extends Component {

    constructor(props) {
      super(props);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.signIn = this.signIn.bind(this);
      this.goToPlatform = this.goToPlatform.bind(this);
      this.showLogin = this.showLogin.bind(this);
      this.state = {
        email:'',
        password:'',
        error: false,
        login: false
      };
    }

    handleEmailChange(e){
        this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }

    signIn(){
        var self = this;
        axios.post(__API_URL__ + 'login', {login: this.state.email, password: this.state.password})
            .then(function(response){
                if (response.data){
                  self.setState({error: false})
                  self.goToPlatform()
                } else {
                  self.setState({error: true})
                }
            })
            .catch(function(error){
                console.log(error)
            })
    }

    goToPlatform(){
        localStorage.user = 'authorized'
        this.props.history.push('/platform');
    }

    showLogin(){
      this.setState({login: true})
    }

    render(){
        let warning = null;
        if (this.state.error){
          warning = <p className="warn"><small>Wrong email or password!</small></p>
        } else {
          warning = null;
        }

        let form = <div className="start" onClick={this.showLogin}>Start</div>

        if (this.state.login){
          form = <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={1500}
                  transitionEnter={false} transitionLeave={false}>
                  <form className="login-form">
                    <p>
                    <label><input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autoFocus /></label>
                    </p>
                    <p>
                    <label><input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required /></label>
                    </p>
                    {warning}
                    <p>
                    <button className="go" onClick={this.signIn} type="button">Go!</button>
                    </p>
                  </form>
                </ReactCSSTransitionGroup>
        }


        return (
            <div className="container">
                <div className="logo">
                    <img src={logo} alt=""></img>
                </div>
                <h1 className="title">Visualization Platform development version</h1>
                <div className="start-container">
                    {form}
                </div>
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
