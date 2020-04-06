import React, {Component} from 'react';
import {createMuiTheme, CssBaseline, responsiveFontSizes} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import {
    DASHBOARD_PAGE_URL,
    DATASETS_CREATE_PAGE_URL,
    DATASETS_EDIT_PAGE_URL,
    DATASETS_PAGE_URL,
    DEFAULT_PAGE_URL,
    HOMEPAGE_URL,
    LOGIN_PAGE_URL,
    REGISTER_PAGE_URL,
    REGISTER_THANK_YOU_PAGE_URL,
    VISUALIZATIONS_CREATE_PAGE_URL,
    VISUALIZATIONS_EDIT_PAGE_URL,
    VISUALIZATIONS_PAGE_URL, VISUALIZATIONS_VIEW_PAGE_URL
} from "../configs/application-urls";
import RegisterPage from "./auth/RegisterPage";
import DashboardPage from "./DashboardPage";
import DatasetsListPage from "./datasets/DatasetsListPage";
import DatasetsEditPage from "./datasets/DatasetsEditPage";
import DatasetsCreatePage from "./datasets/DatasetsCreatePage";
import Snackbar from "@material-ui/core/Snackbar";
import {SNACKBAR_DURATION, SNACKBAR_POSITION} from "../configs/ui";
import {applicationContext} from "../services/ApplicationContext";
import {observer} from "mobx-react";
import Box from "@material-ui/core/Box";
import RegisterThankYouPage from "./auth/RegisterThankYouPage";
import PrivateRoute from "./auth/PrivateRoute";
import VisualizationsListPage from "./visualizations/VisualizationsListPage";
import VisualizationsCreatePage from "./visualizations/VisualizationsCreatePage";
import VisualizationsEditPage from "./visualizations/VisualizationsEditPage";
import {ThemeProvider} from "@material-ui/styles";
import VisualizationsViewPage from "./visualizations/VisualizationsViewPage";

const uiService = applicationContext.uiService;

let theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                display: "flex"
            }
        }
    }
});
theme = responsiveFontSizes(theme);

@observer
class Application extends Component {
    render() {
        return <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path={HOMEPAGE_URL} component={Redirect} to={DEFAULT_PAGE_URL}/>

                    <Route exact path={LOGIN_PAGE_URL} component={LoginPage}/>
                    <Route exact path={REGISTER_PAGE_URL} component={RegisterPage}/>
                    <Route exact path={REGISTER_THANK_YOU_PAGE_URL} component={RegisterThankYouPage}/>

                    <PrivateRoute exact path={DASHBOARD_PAGE_URL} component={DashboardPage}/>

                    <PrivateRoute exact path={DATASETS_PAGE_URL} component={DatasetsListPage}/>
                    <PrivateRoute exact path={DATASETS_CREATE_PAGE_URL} component={DatasetsCreatePage}/>
                    <PrivateRoute exact path={DATASETS_EDIT_PAGE_URL} component={DatasetsEditPage}/>

                    <PrivateRoute exact path={VISUALIZATIONS_PAGE_URL} component={VisualizationsListPage}/>
                    <PrivateRoute exact path={VISUALIZATIONS_CREATE_PAGE_URL} component={VisualizationsCreatePage}/>
                    <PrivateRoute exact path={VISUALIZATIONS_EDIT_PAGE_URL} component={VisualizationsEditPage}/>
                    <PrivateRoute exact path={VISUALIZATIONS_VIEW_PAGE_URL} component={VisualizationsViewPage}/>

                    <PrivateRoute exact path={VISUALIZATIONS_PAGE_URL} component={DatasetsListPage}/>
                </Switch>
            </BrowserRouter>
            <Box>
                {uiService.snackbars.map(snackbar => {
                    const onClose = () => uiService.closeSnackbar(snackbar.id);

                    return <Snackbar
                        key={snackbar.id}
                        anchorOrigin={SNACKBAR_POSITION}
                        open={true}
                        autoHideDuration={SNACKBAR_DURATION}
                        onClose={onClose}
                    >
                        <Alert elevation={6} variant="filled" onClose={onClose} severity={snackbar.type}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                })}
            </Box>
        </ThemeProvider>;
    }
}

export default Application;
