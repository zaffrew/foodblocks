import React from 'react'
import SplashScreen from "./src/components/splash.js";
import Home from "./home";

const splashTransitionTime = 2000;
const username = "Vedant";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: username,
            screen: "splash"
        }
    }

    componentDidMount() {
        setTimeout(()=> {
            this.setState({
                username: this.state.username,
                screen: 'home'
            })
        }, splashTransitionTime)
    }

    render() {
        if (this.state.screen === 'splash') {
            return (
                <SplashScreen name={this.state.username}/>
            );
        } else if (this.state.screen === 'home') {
            return (
              <Home/>
            );
        }
    }
}
