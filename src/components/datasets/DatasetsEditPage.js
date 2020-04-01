import React, {Component} from 'react';
import {observer} from "mobx-react";
import UserLayout from "../shared/UserLayout";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {DATASETS_PAGE_URL} from "../../configs/application-urls";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

@withStyles(css)
@observer
class DatasetsEditPage extends Component {
    render() {
        const {classes} = this.props;

        return <UserLayout>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Dataset "Some fancy dataset"
                </Typography>
                <Formik
                    initialValues={{}}
                    // validationSchema={}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Field component={TextField}
                                           id="name"
                                           label="Name"
                                           name="name"
                                           autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field component={TextField}
                                           id="name"
                                           label="Name"
                                           name="name"
                                           autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field component={TextField}
                                           id="name"
                                           label="Name"
                                           name="name"
                                           autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field component={TextField}
                                           id="name"
                                           label="Name"
                                           name="name"
                                           autoFocus
                                    />
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
                </Formik>
            </Paper>
        </UserLayout>;
    }
}

export default DatasetsEditPage;
