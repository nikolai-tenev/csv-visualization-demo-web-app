import React, {Component} from 'react';
import {observer} from "mobx-react";
import UserLayout from "../shared/UserLayout";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DatasetsForm from "./DatasetsForm";
import {applicationContext} from "../../services/ApplicationContext";
import {DATASETS_EDIT_PAGE_URL} from "../../configs/application-urls";
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

const service = applicationContext.datasetsService;
const uiService = applicationContext.uiService;

@withStyles(css)
@withRouter
@observer
class DatasetsCreatePage extends Component {
    render() {
        const {classes} = this.props;

        return <UserLayout>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    New Dataset
                </Typography>
                <DatasetsForm
                    handleSubmit={this.handleSubmit}
                />
            </Paper>
        </UserLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        try {
            const result = await service.save(values);

            uiService.showSuccessSnackbar({message: "Record successfully created!"});
            this.props.history.push(DATASETS_EDIT_PAGE_URL.replace(":id", result.id));
        } catch (e) {
            setSubmitting(false);
            uiService.showErrorSnackbar({message: "There was a problem while trying to create record!"});
            console.error(e);
        }
    };
}

export default DatasetsCreatePage;
