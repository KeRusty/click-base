import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

import AppNavBar from '../../Components/AppNavBar/AppNavBar';
import Copyright from '../../Components/Copyright/Copyright'
import Fire from "../../Config/Firebase";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));




export default function Checkout(props) {
    const classes = useStyles();

    const [value, setValue] = React.useState('female');

    const [cities, setCities] = useState([])

    const [categories, setCategories] = useState([])

    const [numbers, setNumbers] = useState(true);

    const handleChange = event => {
        setValue(event.target.value);
    };

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    useEffect(() => {

        const cityData = Fire.database().ref("cities").orderByKey();
        const categoryData = Fire.database().ref("categories").orderByKey();
        const numberData = Fire.database().ref("numberList").orderByKey();

        cityData.on("value", snapshot => {
            const dataList = snapshot.val();

            const values = Object.values(dataList)

            setCities(values)
        });

        categoryData.on("value", snapshot => {
            const dataList = snapshot.val();

            const values = Object.values(dataList)

            setCategories(values)
        });


        numberData.on("value", snapshot => {
            const dataList = snapshot.val();

            const values = Object.values(dataList)

            setNumbers(values)
        });

    }, [])

    /*useEffect(() => {

        const categoryData = Fire.database().ref("categories").orderByKey();
        categoryData.on("value", snapshot => {
            const dataList = snapshot.val();

            const values = Object.values(dataList)

            setCategories(values)
        });

    }, [])*/



    const onSubmit = (e) => {

        e.preventDefault();

        const number = e.target.number.value;
        const city = e.target.city.value;
        const category = e.target.category.value;

        console.log(number, city, category)


        /*let myRef = Fire.database().ref().child("numberList").push()
        let key = myRef.getKey();

        myRef.push(
            {
                id: key,
                fullName: fullName,
                phone: phone,
                email: email,
                dob: dob,
                nic: nic,
                religion: religion,
                gender: gender,
                address1: address1,
                address2: address2,
                city: city,
                district: district,
                zip: zip,
                divisionalSecretariat: divisionalSecretariat,
                occupation: occupation,
                education: education,
                launch: launch,
                ongoing: ongoing,
                currentStatus: currentStatus,
                skills: skills
            },
            function (error) {
                if (error) {
                    enqueueSnackbar(error.message, { variant: 'error' });
                    setTimeout(() => closeSnackbar, 10000)
                } else {
                    enqueueSnackbar("Member Has Been Added", { variant: 'success' });
                    setTimeout(() => closeSnackbar, 1000)
                    window.location.reload();
                }
            }
        );*/

    }

    console.log(cities)
    console.log(categories)
    console.log(numbers)

    return (
        <React.Fragment>

            <CssBaseline />

            <AppNavBar heading={"Enter Number"} props={props} />

            <main className={classes.layout}>

                <Paper className={classes.paper}>

                    <Typography component="h1" variant="h4" align="center">Enter Number</Typography>

                    <form className={classes.form} noValidate onSubmit={onSubmit}>

                        <Grid container spacing={3}>

                            <Grid item xs={12}>

                                <TextField
                                    required
                                    id="number"
                                    name="number"
                                    label="Enter Number"
                                    fullWidth
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <Autocomplete
                                    id="city"
                                    name="city"
                                    options={cities}
                                    getOptionLabel={option => option.city}
                                    renderInput={params => (
                                        <TextField {...params} label="Enter City" variant="standard" fullWidth />
                                    )}
                                />

                            </Grid>

                            <Grid item xs={12}>

                                <Autocomplete
                                    id="category"
                                    name="category"
                                    options={categories}
                                    getOptionLabel={option => option.category}
                                    renderInput={params => (
                                        <TextField {...params} label="Enter Category" variant="standard" fullWidth />
                                    )}
                                />

                            </Grid>

                        </Grid>

                        <Grid container>

                            <Grid item>

                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Add Number</Button>

                            </Grid>

                        </Grid>

                    </form>

                </Paper>

                <Copyright />

            </main>

        </React.Fragment>
    );
}