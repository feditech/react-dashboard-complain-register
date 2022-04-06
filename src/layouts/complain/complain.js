import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import FloatingActionButtons from "components/FloatingButton/FloatingActionButtons";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "./Card";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Swal from 'sweetalert2';
import {
    CircularProgress,
} from "@mui/material";
function Complain() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [filter, setFilter] = useState("");
    const [filterList, setFilterList] = useState([]);
    const { complains, clients } = useSelector((state) => {
        return {
            complains: state.complains,
            clients: state.clients
        };
    });

    useEffect(() => {
        setFilterList(complains);
    }, [complains]);

    useEffect(() => {
        if (filter) {
            setFilterList(complains.filter(e => e.complainType.includes(filter)))
        } else {
            setFilterList(complains)
        }
    }, [filter])

    const handleChange = e => setFilter(e.target.value)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addComplain = async (obj) => {
        if (obj !== "") {
            // console.log('add complain obj',obj);
            const config = {
                method: "post",
                url: `/complain`,
                withCredentials: true,
                data: obj,
            }
            // console.log('configgggggggggggggggggggg', config)
            await axios(config).then((res) => {
                console.log('add ADD_COMPLAIN', res)
                if (res.data.success) {
                    dispatch({ type: "ADD_COMPLAIN", payload: res.data.data });
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Complain Added',
                    })
                    // navigate('/');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Could not add COMPLAIN',
                    })
                }
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })

        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                method: "get",
                url: `/complain`,
                withCredentials: true,
            }
            await axios(config).then(async (res) => {
                console.log('get GET_COMPLAINS', res)
                dispatch({ type: "GET_COMPLAINS", payload: res.data });
            }
            ).catch(err => console.log(err))
            setDataLoaded(true);
        };
        fetchData();
        // Navigate('/client')
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                method: "get",
                url: `/client`,
                withCredentials: true,
            }
            await axios(config).then(async (res) => {
                dispatch({ type: "GET_CLIENTS", payload: res.data.data });
            }
            ).catch(err => console.log(err))
            setDataLoaded(true);
        };
        fetchData();
    }, []);



    // console.log(customer, "customer");
    if (!dataLoaded) return <div style={{
        margin: '0 auto',
        // background: 'red',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }} ><CircularProgress /></div>;
    return (
        <DashboardLayout>
            <DashboardNavbar searchLabel="Search by Type" handleChange={handleChange} value={filter} />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    {filterList ? filterList.map((data, i) => {

                        return (data ? <Grid key={i} item xs={12} md={6} lg={3}>
                            <MDBox mb={1.5}>
                                <Card
                                    color="dark"
                                    icon="inventory2Icon"
                                    complainType={data.complainType}
                                    comment={data.comment}
                                    price={data.price}
                                />
                            </MDBox>
                        </Grid> : [])
                    }) : []
                    }


                </Grid>
            </MDBox>
            <Grid sx={{ position: "fixed", right: 10, bottom: 10 }}>
                <Popup
                    // editCustomer={editCustomer}
                    open={open}
                    handleClose={handleClose}
                    addComplain={addComplain}
                />
                <FloatingActionButtons handleClick={handleClickOpen} />
            </Grid>
        </DashboardLayout>
    );
}

export default Complain;
