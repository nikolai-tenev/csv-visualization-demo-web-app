import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Copyright} from "../shared/Copyright";
import {Field, Form, Formik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {REGISTER_PAGE_URL} from "../../configs/application-urls";

const css = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
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

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = "Email is required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = "Invalid email address";
                        }

                        if (!values.password) {
                            errors.password = "Password is required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form className={classes.form} noValidate>
                            <Field as={TextField}
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
                            <Field as={TextField}
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
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
