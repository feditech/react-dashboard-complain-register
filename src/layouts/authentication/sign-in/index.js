import * as Yup from 'yup';
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Icon } from '@iconify/react';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import axios from "axios"

function Cover() {

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isSignIn = useSelector(state => state.isSignIn);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log(" start ")
      let obj = {
        email: values.email,
        password: values.password,
      }
      console.log(obj)
      const config = {
        method: "post",
        url: `/signin`,
        withCredentials: true,
        data: obj,
      }
      await axios(config).then(async (res) => {
        // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeeeeeeeeeeessssssssssssss', res)
        if (res.data.success) {
          dispatch({ type: "SIGNIN", payload: res.data.user })
        } else {
          setMsg(res.data)
        }
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong Email or Password',
          // text: {err} 
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      })
    }
  });
  if (isSignIn) return <Navigate to="/" />



  // 
  //commoit up date hogat hy lawa koi update nahe ho ga 



  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };


  return (
    <BasicLayout image={bgImage}>
      <Card sx={{ marginTop: 2 }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? <Icon icon="akar-icons:eye" /> : <Icon icon="akar-icons:eye-closed" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <FormControlLabel
                  control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                  label="Remember me"
                />
                {/* 
     <Link to="/ForgotPassword" >
            Forgot password?
          </Link> */}
                {/* <Link component={RouterLink} to="ForgotPassword">
                Forgot password?
          </Link> */}
              </Stack>
              <MDBox mt={2} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type='submit'
                >
                  Sign In
                </MDButton>
              </MDBox>
            </Form>
          </FormikProvider>
        </MDBox>
        <MDBox mt={0} mb={2} textAlign="center">
          <MDTypography variant="button" color="text">
            Don't have an account?{" "}
            <MDTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign Up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;








// <MDBox component="form" role="form">
// <MDBox mb={2}>
//   <MDInput type="text" label="Name" variant="standard" fullWidth />
// </MDBox>
// <MDBox mb={2}>
//   <MDInput type="email" label="Email" variant="standard" fullWidth />
// </MDBox>
// <MDBox mb={2}>
//   <MDInput type="password" label="Password" variant="standard" fullWidth />
// </MDBox>
// <MDBox display="flex" alignItems="center" ml={-1}>
//   <Checkbox />
//   <MDTypography
//     variant="button"
//     fontWeight="regular"
//     color="text"
//     sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//   >
//     &nbsp;&nbsp;I agree the&nbsp;
//   </MDTypography>
//   <MDTypography
//     component="a"
//     href="#"
//     variant="button"
//     fontWeight="bold"
//     color="info"
//     textGradient
//   >
//     Terms and Conditions
//   </MDTypography>
// </MDBox>
// <MDBox mt={4} mb={1}>
//   <MDButton
//     variant="gradient"
//     color="info"
//     fullWidth
//     component={Link}
//     to="/dashboard"
//   // onClick={navigate("/dashboard")}
//   >
//     Sign Up
//   </MDButton>
// </MDBox>
// <MDBox mt={3} mb={1} textAlign="center">
//   <MDTypography variant="button" color="text">
//     Already have an account?{" "}
//     <MDTypography
//       component={Link}
//       to="/authentication/sign-in"
//       variant="button"
//       color="info"
//       fontWeight="medium"
//       textGradient
//     >
//       Sign In
//     </MDTypography>
//   </MDTypography>
// </MDBox>
// </MDBox>


