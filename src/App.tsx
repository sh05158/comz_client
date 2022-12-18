import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { Menu, Login, Signup, Home, ChattingRoom } from '~/pages';
import { PAGE_PATHS } from '~/constants';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={PAGE_PATHS.HOME} component = {Home}/>
                    <Route path={PAGE_PATHS.LOGIN} component = {Login}/>
                    <Route path={PAGE_PATHS.CHATTING_ROOM} component = {ChattingRoom}/>
                    <Route path={PAGE_PATHS.SIGNUP} component = {Signup}/>
                    <Route path={PAGE_PATHS.MENU} component={Menu}/>
                    <Route path={PAGE_PATHS.DEFAULT} component={() => <Redirect to={PAGE_PATHS.HOME}/>}/>                   
                </Switch>
            </Router>
        )
    }
}

export default App;