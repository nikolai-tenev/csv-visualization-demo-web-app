import React, {Component} from 'react';
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import {LOGIN_PAGE_URL, REGISTER_PAGE_URL} from "./configs/application-urls";
import RegisterPage from "./components/auth/RegisterPage";

class Application extends Component {
    render() {
        return <>
            <CssBaseline/>
            <BrowserRouter>
                <Switch>
                    <Route exact path={LOGIN_PAGE_URL} component={LoginPage}/>
                    <Route exact path={REGISTER_PAGE_URL} component={RegisterPage}/>
                </Switch>
            </BrowserRouter>
        </>;
    }
}

export default Application;
