import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {observer} from "mobx-react";
import UserLayout from "./shared/UserLayout";
import VisualizationChart from "./shared/VisualizationChart";
import {applicationContext} from "../services/ApplicationContext";
import Typography from "@material-ui/core/Typography";

const css = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 440,
    },
});

const service = applicationContext.visualizationsService;

@withStyles(css)
@observer
class DashboardPage extends Component {
    componentDidMount() {
        service.loadDashboardVisualizations();
    }

    render() {
        const {classes} = this.props;
        const visualizations = service.dashboardVisualizations;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return <UserLayout>
            <Grid container spacing={3}>
                {visualizations && visualizations.map(v => (
                    <Grid key={v.id} item xs={12} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <Typography component="h1" variant="h4" align="center" gutterBottom>
                                {v.name}
                            </Typography>
                            <VisualizationChart id={v.id}/>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </UserLayout>;
    }
}

export default DashboardPage;
