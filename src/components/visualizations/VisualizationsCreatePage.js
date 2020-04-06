import React, {Component} from 'react';
import {observer} from "mobx-react";
import UserLayout from "../shared/UserLayout";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import VisualizationsForm from "./VisualizationsForm";
import {applicationContext} from "../../services/ApplicationContext";
import {VISUALIZATIONS_EDIT_PAGE_URL} from "../../configs/application-urls";
import {withRouter} from "react-router-dom";

const css = (theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(3),
    },
    button: {
        marginLeft: theme.spacing(1),
    }
});

const service = applicationContext.visualizationsService;
const uiService = applicationContext.uiService;

@withStyles(css)
@withRouter
@observer
class VisualizationsCreatePage extends Component {
    render() {
        const {classes} = this.props;

        return <UserLayout>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    New Visualization
                </Typography>
                <VisualizationsForm
                    handleSubmit={this.handleSubmit}
                    initialValues={{
                        name: "",
                        dataset: "",
                        showOnDashboard: false,
                        xAxis: "",
                        yAxis: "",
                        xAxisAggregateSum: false,
                        yAxisAggregateSum: false,
                        xAxisAggregateAvg: false,
                        yAxisAggregateAvg: false,
                    }}
                />
            </Paper>
        </UserLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        try {
            const result = await service.save(values);

            uiService.showSuccessSnackbar({message: "Record successfully created!"});
            this.props.history.push(VISUALIZATIONS_EDIT_PAGE_URL.replace(":id", result.id));
        } catch (e) {
            setSubmitting(false);
            uiService.showErrorSnackbar({message: "There was a problem while trying to create record!"});
            console.error(e);
        }
    };
}

export default VisualizationsCreatePage;
