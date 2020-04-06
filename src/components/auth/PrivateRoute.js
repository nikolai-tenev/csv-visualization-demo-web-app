import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Redirect, Route, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {applicationContext} from "../../services/ApplicationContext";
import {LOGIN_PAGE_URL} from "../../configs/application-urls";
import Loading from "../shared/Loading";

const service = applicationContext.applicationService;

@withRouter
@observer
class PrivateRoute extends Component {
    static propTypes = {
        component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    };

    render() {

        const {component: Cmp, ...rest} = this.props;
        const isAuthenticated = service.isAuthenticated;
        const isLoading = service.loading;

        return <Route {...rest} render={(props) => {
            if (!isAuthenticated && isLoading === true) {
                return <Loading/>;
            }

            if (isAuthenticated) {
                return <Cmp {...props} {...rest} />;
            } else {
                return <Redirect to={{
                    pathname: LOGIN_PAGE_URL,
                }}/>;
            }
        }}/>;
    }
}

export default PrivateRoute;
