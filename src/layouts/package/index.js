import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
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
function Package() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [packageObj, setClientObj] = useState("");
  const [filter, setFilter] = useState("");
  const [filterList, setFilterList] = useState([]);
  const { packages } = useSelector((state) => {
    return {
      packages: state.packages,
    };
  });

  useEffect(() => {
    setFilterList(packages);
  }, [packages]);

  useEffect(() => {
    if (filter) {
      setFilterList(packages.filter(c => c.packageName.includes(filter)))
    }
    else {
      setFilterList(packages)
    }
  }, [filter])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addPackage = async (obj) => {
    if (obj !== "") {
      console.log(obj);
      const config = {
        method: "post",
        url: `/package`,
        withCredentials: true,
        data: obj,
      }
      // console.log('configgggggggggggggggggggg', config)
      await axios(config).then((res) => {
        console.log('add packageee', res)
        if (res.data.success) {
          dispatch({ type: "ADD_PACKAGE", payload: res.data.data });
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Package Added',
          })
          // navigate('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Could not add package',
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
        url: `/package`,
        withCredentials: true,
      }
      await axios(config).then(async (res) => {
        // console.log('get packagessss', res)
        dispatch({ type: "GET_PACKAGES", payload: res.data.data });
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
  const handleChange = (e) => setFilter(e.target.value)
  // console.log(filter)
  return (

    <DashboardLayout>
      <DashboardNavbar searchLabel="Search by Name" handleChange={handleChange} value={filter} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {filterList.map((data, i) => {
            return (data ? <Grid key={i} item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <Card
                  color="dark"
                  icon="inventory2Icon"
                  title={data.packageName}
                  duration={data.duration}
                  price={data.price}
                />
              </MDBox>
            </Grid> : [])
          })
          }


        </Grid>
      </MDBox>
      <Grid sx={{ position: "fixed", right: 10, bottom: 10 }}>
        <Popup
          // editCustomer={editCustomer}
          open={open}
          handleClose={handleClose}
          obj={packageObj}
          addPackage={addPackage}
        />
        <FloatingActionButtons handleClick={handleClickOpen} />
      </Grid>
    </DashboardLayout>
  );
}

export default Package;



function Input() {
  <MDInput label='search' />
}