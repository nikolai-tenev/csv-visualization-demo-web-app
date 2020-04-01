import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Field, Form, Formik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {REGISTER_PAGE_URL} from "../../configs/application-urls";
import GuestLayout from "../shared/GuestLayout";
import {USER_LOGIN} from "../../configs/validation-schemas";
import {TextField} from "formik-material-ui";

const css = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default () => {
    const classes = css();

    return <GuestLayout>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={USER_LOGIN}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form className={classes.form} noValidate>
                    <Field component={TextField}
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           autoComplete="email"
                           autoFocus
                    />
                    <Field component={TextField}
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isSubmitting}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to={REGISTER_PAGE_URL} variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    </GuestLayout>;
}
