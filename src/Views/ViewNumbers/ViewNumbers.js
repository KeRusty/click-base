import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import MUIDataTable from "mui-datatables";
import AppNavBar from "../../Components/AppNavBar/AppNavBar";
import Footer from "../../Components/Footer/Footer";
import Fire from "../../Config/Firebase";

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));



export default function ViewNumbers(props) {
    const classes = useStyles();

    const [numberList, setNumberList] = useState({ data: [], length: "", loading: true })

    const columns = [
        {
            name: "number",
            label: "Numner",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "serviceProvider",
            label: "Service Provider",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "city",
            label: "City",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "district",
            label: "District",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "province",
            label: "Province",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];


    const options = {
        filterType: 'checkbox',
    };



    useEffect(() => {

        const numberData = Fire.database().ref("numberList").orderByKey();

        numberData.on("value", snapshot => {
            const dataList = snapshot.val();

            const values = dataList ? Object.values(dataList) : null;

            const length = values ? values.length : "0";

            // get the keys list
            const keyList = dataList ? Object.keys(dataList) : null;

            const finalList = []

            // loop them to access by key name ;-)
            if (keyList) {
                for (let i = 0; i < keyList.length; i++) {
                    const subKey = Object.keys(dataList[keyList[i]])[0];
                    finalList.push(dataList[keyList[i]][subKey])
                }
            }

            setNumberList({ data: finalList, length: length, loading: false })
        });

    }, [])


    console.log(numberList)

    return (
        <React.Fragment>

            <CssBaseline />

            <AppNavBar heading={"View Numbers"} props={props} />

            <main>

                {!numberList.loading &&
                    <MUIDataTable
                        title={"ClickBase Number List"}
                        data={numberList.data}
                        filter={true}
                        viewColumns={false}
                        columns={columns}
                        options={options}
                    />
                }


            </main>

            <Footer footerHeading={"View Numbers"} footerContent={"Use the Table Above to view CLICKBASE numbers"} />

        </React.Fragment>
    );
}