import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import fire from "../../Config/Firebase";
import StorageKeys from "../../Config/StorageKeys";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));


export default function AppNavBar(props) {
    const classes = useStyles();

    const logOutUser = () => {
        fire.auth().signOut();
        localStorage.removeItem(StorageKeys.token);
        localStorage.removeItem(StorageKeys.user);
        props.props.history.push("/")
    };


    return (
        <React.Fragment>

            <CssBaseline />

            <AppBar position="relative">

                <Toolbar>

                    <HomeWorkIcon className={classes.icon} />

                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>{props.heading}</Typography>

                    <Button color="inherit" onClick={logOutUser}>Log out</Button>

                </Toolbar>

            </AppBar>

        </React.Fragment>
    );
}