import React from "react";
import Typography from "@material-ui/core/Typography";

export const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © CSV Analytics '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
);
