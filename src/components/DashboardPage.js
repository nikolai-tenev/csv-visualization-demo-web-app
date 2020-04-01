import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {observer} from "mobx-react";
import UserLayout from "./shared/UserLayout";

const css = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

@withStyles(css)
@observer
class DashboardPage extends Component {
    render() {
        const {classes} = this.props;

        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return <UserLayout>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper className={fixedHeightPaper}>
                        CHART
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={fixedHeightPaper}>
                        CHART
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={fixedHeightPaper}>
                        CHART
                    </Paper>
                </Grid>
            </Grid>
        </UserLayout>;
    }
}

export default DashboardPage;
