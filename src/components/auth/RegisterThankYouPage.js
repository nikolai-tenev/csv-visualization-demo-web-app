import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import GuestLayout from "../shared/GuestLayout";
import {CheckCircleOutline} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {LOGIN_PAGE_URL} from "../../configs/application-urls";


const css = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default () => {
    const classes = css();

    return <GuestLayout>
        <Avatar className={classes.avatar}>
            <CheckCircleOutline/>
        </Avatar>
        <Typography component="h1" variant="h5">
            Thank you for creating an account on our platform.
            You can follow this <Link to={LOGIN_PAGE_URL}>link to login</Link>.
        </Typography>
    </GuestLayout>;
}
