import React, {Component} from 'react';
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import {DASHBOARD_PAGE_URL, DATASETS_EDIT_PAGE_URL, DATASETS_PAGE_URL, LOGIN_PAGE_URL, REGISTER_PAGE_URL} from "./configs/application-urls";
import RegisterPage from "./components/auth/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import DatasetsListPage from "./components/datasets/DatasetsListPage";
import DatasetsEditPage from "./components/datasets/DatasetsEditPage";

class Application extends Component {
    render() {
        return <>
            <CssBaseline/>
            <BrowserRouter>
                <Switch>
                    <Route exact path={LOGIN_PAGE_URL} component={LoginPage}/>
                    <Route exact path={REGISTER_PAGE_URL} component={RegisterPage}/>
                    <Route exact path={DASHBOARD_PAGE_URL} component={DashboardPage}/>
                    <Route exact path={DATASETS_PAGE_URL} component={DatasetsListPage}/>
                    <Route exact path={DATASETS_EDIT_PAGE_URL} component={DatasetsEditPage}/>
                </Switch>
            </BrowserRouter>
        </>;
    }
}

export default Application;
