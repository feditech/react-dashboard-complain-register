import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import FloatingActionButtons from "components/FloatingButton/FloatingActionButtons";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Card from './Card'
import Popup from "./Popup";
// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import axios from "axios"
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from "react-redux";

import {
  CircularProgress,
} from "@mui/material";
import { Navigate } from "react-router-dom";

function Client() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [clientObj, setClientObj] = useState("");
  const [filter, setFilter] = useState("");
  const [filterList, setFilterList] = useState([]);
  const { clients } = useSelector((state) => {
    return {
      clients: state.clients,
    };
  });
  useEffect(() => {
    setFilterList(clients);
    console.log('filter lissst', filterList)
  }, [clients]);

  useEffect(() => {
    if (filter) {
      setFilterList(clients.filter(e => e.name.includes(filter)))
    } else {
      setFilterList(clients)
    }
  }, [filter])

  const handleChange = (e) => setFilter(e.target.value)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addClient = async (obj) => {
    if (obj !== "") {
      console.log(obj);
      const config = {
        method: "post",
        url: `/client`,
        withCredentials: true,
        data: obj,
      }
      await axios(config).then((res) => {
        console.log('add cliennnnnnnnnt', res)
        if (res.data.success) {
          dispatch({ type: "ADD_CLIENT", payload: res.data.result });
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Client Added',
          })
          // navigate('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Could not add client',
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
        url: `/client`,
        withCredentials: true,
      }
      await axios(config).then(async (res) => {
        // console.log('clieeeeeennntddddd', res)
        dispatch({ type: "GET_CLIENTS", payload: res.data.data });
      }
      ).catch(err => console.log(err))
      setDataLoaded(true);
    };
    fetchData();
    // Navigate('/client')
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
      <DashboardNavbar searchLabel="Search by Name" handleChange={handleChange} value={filter} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {filterList !== [] ? filterList.map((data, i) => {
            return (<Grid key={i} item xs={12} md={6} lg={4}>
              {/* {console.log('dataaaaaaaaaaaa', data)} */}
              <MDBox fullwidth mb={1.5}>
                <Card sx={{

                }}
                  name={data.name}
                  email={data.email}
                  phone={data.phone}
                  address={data.address}
                />
              </MDBox>
            </Grid>)
          }) : []
          }
        </Grid>
      </MDBox>
      <Grid sx={{ position: "fixed", right: 10, bottom: 10 }}>
        <Popup
          // editCustomer={editCustomer}
          open={open}
          handleClose={handleClose}
          obj={clientObj}
          addClient={addClient}
        />
        <FloatingActionButtons handleClick={handleClickOpen} />
      </Grid>
    </DashboardLayout>
  );
}

export default Client;
{/* <MDBox mb={1.5}> */ }
{/* <ProfileInfoCard
                color="dark"
                icon="taskIcon"
                title="Total Complains"
                description='description'
                info={{info:'info'}}
                social={[{link:'https://www.google.com/' , icon:'taskIcon', color:'black'}]}
                action={{tooltip:'tooltip',route:'route'}}
              /> */}

{/* </MDBox> */ }