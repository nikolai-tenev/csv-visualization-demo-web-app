import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {APPLICATION_DRAWER_WIDTH} from "../../configs/ui";
import clsx from "clsx";
import {applicationContext} from "../../services/ApplicationContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import {ChevronLeft, Dashboard as DashboardIcon, ExitToApp, Menu} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";
import {DASHBOARD_PAGE_URL, DATASETS_PAGE_URL, LOGIN_PAGE_URL, REGISTER_PAGE_URL} from "../../configs/application-urls";
import {observer} from "mobx-react";
import Avatar from "@material-ui/core/Avatar";
import {Copyright} from "./Copyright";
import Box from "@material-ui/core/Box";

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
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    toolbarLogo: {
        marginLeft: "auto",
        marginRight: "auto",
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
});

@withStyles(css)
@observer
class UserLayout extends Component {
    render() {
        const {classes} = this.props;
        const uiService = applicationContext.uiService;


        return <div className={classes.root}>
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
                    <Avatar className={classes.toolbarLogo} alt="Corona Analytics" src="/android-chrome-512x512.png"/>
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
                    <ListItem button component={Link} to={DATASETS_PAGE_URL}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Datasets"/>
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
                    {this.props.children}
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>;
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

export default UserLayout;
