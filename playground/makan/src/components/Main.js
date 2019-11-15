import React from 'react'
import SplashScreen from "./splash";
import Home from "./home";

const splashTransition = 3000

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Muprhy",
            screen: "splash"
        }
    }

    componentDidMount() {
        setTimeout(()=> {
            this.setState({
                username: this.state.username,
                screen: 'home'
            })
        },splashTransition)
    }

    render() {
        if (this.state.screen == 'splash') {
            return (
                <SplashScreen name={this.state.username}/>
            );
        } else if (this.state.screen == 'home') {
            return (
              <Home/>
            );
        }
    }
}
