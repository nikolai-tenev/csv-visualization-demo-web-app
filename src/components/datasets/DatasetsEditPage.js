import React, {Component} from 'react';
import {observer} from "mobx-react";
import UserLayout from "../shared/UserLayout";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DatasetsForm from "./DatasetsForm";
import {applicationContext} from "../../services/ApplicationContext";
import {withRouter} from "react-router-dom";
import {DATASETS_PAGE_URL} from "../../configs/application-urls";

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

const service = applicationContext.datasetsService;
const uiService = applicationContext.uiService;

@withStyles(css)
@withRouter
@observer
class DatasetsEditPage extends Component {
    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;
            service.loadSingle(id);
        } else {
            this.props.history.push(DATASETS_PAGE_URL);
        }
    }

    render() {
        const {classes} = this.props;

        return <UserLayout>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Dataset "{service.single.name}"
                </Typography>
                <DatasetsForm
                    values={service.single}
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

export default DatasetsEditPage;
