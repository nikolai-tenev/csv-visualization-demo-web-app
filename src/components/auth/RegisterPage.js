import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link as RouterLink, useHistory} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {LOGIN_PAGE_URL, REGISTER_THANK_YOU_PAGE_URL} from "../../configs/application-urls";
import GuestLayout from "../shared/GuestLayout";
import {Field, Form, Formik} from "formik";
import {USER_REGISTRATION} from "../../configs/validation-schemas";
import {TextField} from "formik-material-ui";
import {applicationContext} from "../../services/ApplicationContext";


const css = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const service = applicationContext.applicationService;
const uiService = applicationContext.uiService;

export default () => {
    const classes = css();
    const history = useHistory();

    return <GuestLayout>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
            Register
        </Typography>
        <Formik
            initialValues={{email: '', password: '', firstName: '', lastName: '', confirmPassword: ''}}
            validationSchema={USER_REGISTRATION}
            enableReinitialize={true}
            validateOnBlur={false}
            onSubmit={async (values, {setSubmitting}) => {
                try {
                    await service.register(values);
                    setSubmitting(false);
                    history.push(REGISTER_THANK_YOU_PAGE_URL);
                } catch (e) {
                    setSubmitting(false);
                    uiService.showErrorSnackbar({
                        message: "There was an error while trying to create a new user. Error: " + e.message
                    });

                    console.error(e);
                }
            }}
        >
            {({isSubmitting}) => (
                <Form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Field component={TextField}
                                   autoComplete="fname"
                                   name="firstName"
                                   variant="outlined"
                                   required
                                   fullWidth
                                   id="firstName"
                                   label="First Name"
                                   autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field component={TextField}
                                   variant="outlined"
                                   required
                                   fullWidth
                                   id="lastName"
                                   label="Last Name"
                                   name="lastName"
                                   autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField}
                                   variant="outlined"
                                   required
                                   fullWidth
                                   id="email"
                                   label="Email Address"
                                   name="email"
                                   autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField}
                                   variant="outlined"
                                   required
                                   fullWidth
                                   name="password"
                                   label="Password"
                                   type="password"
                                   id="password"
                                   autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField}
                                   variant="outlined"
                                   required
                                   fullWidth
                                   name="confirmPassword"
                                   label="Confirm password"
                                   type="password"
                                   id="confirmPassword"
                                   autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to={LOGIN_PAGE_URL} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    </GuestLayout>;
}
