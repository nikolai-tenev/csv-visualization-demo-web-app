import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {APPLICATION_DRAWER_WIDTH} from "../configs/ui";
import clsx from "clsx";
import {applicationContext} from "../services/ApplicationContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {ChevronLeft, Dashboard as DashboardIcon, ExitToApp, Menu} from "@material-ui/icons";
import {Copyright} from "./shared/Copyright";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";
import {DASHBOARD_PAGE_URL, LOGIN_PAGE_URL, REGISTER_PAGE_URL} from "../configs/application-urls";
import {observer} from "mobx-react";

const css = (theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: APPLICATION_DRAWER_WIDTH,
        width: `calc(100% - ${APPLICATION_DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: APPLICATION_DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

@withStyles(css)
@observer
class DashboardPage extends Component {
    render() {
        const {classes} = this.props;
        const uiService = applicationContext.uiService;

        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return (
            <div className={classes.root}>
                <AppBar className={clsx(classes.appBar, uiService.drawerOpen && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, uiService.drawerOpen && classes.menuButtonHidden)}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        <IconButton color="inherit" onClick={this.handleLogoutClick}>
                            <ExitToApp/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !uiService.drawerOpen && classes.drawerPaperClose),
                    }}
                    open={uiService.drawerOpen}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeft/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button component={Link} to={DASHBOARD_PAGE_URL}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                        <ListItem button component={Link} to={DASHBOARD_PAGE_URL}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                        <ListItem button component={Link} to={LOGIN_PAGE_URL}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Login"/>
                        </ListItem>
                        <ListItem button component={Link} to={REGISTER_PAGE_URL}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Register"/>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper className={fixedHeightPaper}>
                                    CHART
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={fixedHeightPaper}>
                                    CHART
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={fixedHeightPaper}>
                                    CHART
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box pt={4}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
            </div>
        );
    }

    handleDrawerOpen = () => {
        applicationContext.uiService.openDrawer();
    };

    handleDrawerClose = () => {
        applicationContext.uiService.closeDrawer();
    };

    handleLogoutClick = () => {
    };
}

export default DashboardPage;
