import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import Box from "@material-ui/core/Box";
import {Copyright} from "./Copyright";

const css = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default (props) => {
    const classes = css();

    return <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            {props.children}
        </div>
        <Box mt={5}>
            <Copyright/>
        </Box>
    </Container>
}
