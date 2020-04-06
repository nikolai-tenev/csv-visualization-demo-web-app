import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {DATASETS_PAGE_URL} from "../../configs/application-urls";
import Grid from "@material-ui/core/Grid";
import {isEmpty} from "lodash";
import {DATASET_CREATE, DATASET_EDIT} from "../../configs/validation-schemas";
import {DropzoneDialog} from "material-ui-dropzone";
import Typography from "@material-ui/core/Typography";

const css = (theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(3),
    },
    button: {
        marginLeft: theme.spacing(1),
    }
});

@withStyles(css)
@observer
class DatasetsForm extends Component {
    static propTypes = {
        values: PropTypes.object,
        handleSubmit: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            uploadDialogOpen: false,
            file: null
        };
    }

    render() {
        const {classes, values} = this.props;

        let initialValues = {name: ""};

        if (!isEmpty(values)) {
            initialValues = values;
        }

        return <Formik
            initialValues={initialValues}
            validationSchema={isEmpty(values) ? DATASET_CREATE : DATASET_EDIT}
            onSubmit={this.props.handleSubmit}
            enableReinitialize={true}
            validateOnBlur={false}
        >
            {({isSubmitting, setFieldValue, errors}) => (
                <Form noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Field component={TextField}
                                   id="name"
                                   label="Name"
                                   name="name"
                                   autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={this.handleOpenUploadDialog}>
                                Upload a dataset
                            </Button>
                            <DropzoneDialog
                                open={this.state.uploadDialogOpen}
                                onSave={(files) => this.handleUploadFiles(files, setFieldValue)}
                                acceptedFiles={['text/csv']}
                                dropzoneText="Drag and drop a dataset file here or click"
                                showPreviews={true}
                                maxFileSize={10000000}
                                filesLimit={1}
                                onClose={this.handleCloseUploadDialog}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.file && <Typography>Dataset to upload: {this.state.file.name}</Typography>}
                            {errors && errors.file && <Typography color="error">{errors.file}</Typography>}
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            component={Link}
                            to={DATASETS_PAGE_URL}
                            disabled={isSubmitting}
                        >
                            Go to the list
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>;
    }

    handleOpenUploadDialog = () => {
        this.setState({
            uploadDialogOpen: true,
        });
    };

    handleCloseUploadDialog = () => {
        this.setState({
            uploadDialogOpen: false
        });
    };

    handleUploadFiles = (files, setFieldValue) => {
        this.setState({
            file: files[0],
            uploadDialogOpen: false
        });

        setFieldValue("file", files[0]);
    };
}

export default DatasetsForm;
