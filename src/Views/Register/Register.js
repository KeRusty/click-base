import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Fire from "../../Config/Firebase";
import Copyright from '../../Components/Copyright/Copyright';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {

    const classes = useStyles();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onSubmit = (e) => {

        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password === confirmPassword) {
            Fire.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    //this.props.history.push("/");
                    Fire.database().ref().child("users")
                        .push({
                            uid: user.user.uid,
                            email: user.user.email,
                            firstName: firstName,
                            lastName: lastName
                        });
                    enqueueSnackbar("User Created", { variant: 'success' });
                    props.history.push("/login")
                    setTimeout(() => closeSnackbar, 1000)
                })
                .catch(error => {
                    enqueueSnackbar(error.message, { variant: 'error' });
                    setTimeout(() => closeSnackbar, 10000)
                });

        } else {
            enqueueSnackbar("Passwords Do Not Match", { variant: 'error' });
        }

    }

    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline />

            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">Sign up</Typography>

                <form className={classes.form} noValidate onSubmit={onSubmit}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
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

                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                            />

                        </Grid>

                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign Up</Button>

                    <Grid container justify="flex-end">

                        <Grid item>

                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>

                        </Grid>

                    </Grid>

                </form>

            </div>

            <Box mt={5}>
                <Copyright />
            </Box>

        </Container>
    );
}