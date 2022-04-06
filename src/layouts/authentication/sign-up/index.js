import * as Yup from 'yup';
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isSignIn = useSelector(state => state.isSignIn);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Please enter a name more than 1 character")
      .required("Name is required"),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      remember: true
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(" start ")
      let obj = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        userType: 'admin'
      }
      console.log(obj)
      const config = {
        method: "post",
        url: `/signup`,
        withCredentials: true,
        data: obj,
      }
      await axios(config).then(async (res) => {
        console.log(res)
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User Registered',
            // text: {err} 
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          navigate('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Email or Password',
            // text: {err} 
            // footer: '<a href="">Why do I have this issue?</a>'
          })
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
  // if (isSignIn) return 



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
            Sign Up
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
                  type="name"
                  label="Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

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
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  {...getFieldProps('confirmPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? <Icon icon="akar-icons:eye" /> : <Icon icon="akar-icons:eye-closed" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </MDTypography>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Terms and Conditions
                  </MDTypography>
                </MDBox>
                {/* 
     <Link to="/ForgotPassword" >
            Forgot password?
          </Link> */}
                {/* <Link component={RouterLink} to="ForgotPassword">
                Forgot password?
          </Link> */}
              </Stack>
              <MDBox m={0} >
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type='submit'
                >
                  Sign Up
                </MDButton>
              </MDBox>
            </Form>
          </FormikProvider>
        </MDBox>
        <MDBox mt={0} mb={2} textAlign="center">
          <MDTypography variant="button" color="text">
            Already have an account?{" "}
            <MDTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign In
            </MDTypography>
          </MDTypography>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;