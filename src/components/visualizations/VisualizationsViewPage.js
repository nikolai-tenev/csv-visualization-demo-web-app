import React, {Component} from 'react';
import {observer} from "mobx-react";
import UserLayout from "../shared/UserLayout";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {applicationContext} from "../../services/ApplicationContext";
import {Link, withRouter} from "react-router-dom";
import {VISUALIZATIONS_PAGE_URL} from "../../configs/application-urls";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import printJS from "print-js";
import VisualizationChart from "../shared/VisualizationChart";

const css = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        height: "100%"
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

@withStyles(css)
@withRouter
@observer
class VisualizationsViewPage extends Component {
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
                    View visualization "{service.single.name}"
                </Typography>
                <Grid container spacing={3}>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleDownloadPdfClick}
                        >
                            Download as PDF
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to={VISUALIZATIONS_PAGE_URL}
                            variant="contained">
                            Go back to the list
                        </Button>
                    </Grid>
                </Grid>
                {this.props.match && this.props.match.params && this.props.match.params.id && <VisualizationChart id={this.props.match.params.id}/>}
            </Paper>
        </UserLayout>;
    }

    handleDownloadPdfClick = async () => {
        printJS({
            printable: "chart",
            type: "html",
            maxWidth: null,
            scanStyles: false,
            documentTitle: service.single.name,
        });
    };
}

export default VisualizationsViewPage;
