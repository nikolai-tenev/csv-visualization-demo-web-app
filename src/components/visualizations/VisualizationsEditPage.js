import React, {Component} from 'react';
import {observer} from "mobx-react";
import UserLayout from "../shared/UserLayout";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import VisualizationsForm from "./VisualizationsForm";
import {applicationContext} from "../../services/ApplicationContext";
import {withRouter} from "react-router-dom";
import {VISUALIZATIONS_PAGE_URL} from "../../configs/application-urls";

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
class VisualizationsEditPage extends Component {
    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;
            service.loadSingle(id);
        } else {
            this.props.history.push(VISUALIZATIONS_PAGE_URL);
        }
    }

    render() {
        const {classes} = this.props;

        return <UserLayout>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Visualization "{service.single.name}"
                </Typography>
                <VisualizationsForm
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
                        ...service.single
                    }}
                    handleSubmit={this.handleSubmit}
                />
            </Paper>
        </UserLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        try {
            await service.save({...values, id: this.props.match.params.id});
            uiService.showSuccessSnackbar({message: "Record successfully updated!"});
        } catch (e) {
            uiService.showErrorSnackbar({message: "There was a problem while trying to update record!"});
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };
}

export default VisualizationsEditPage;
