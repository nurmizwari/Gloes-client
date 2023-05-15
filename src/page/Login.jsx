import React from "react";
import "../style/logins.scss";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useFormik } from "formik";
import * as Yup from "yup";
import { loginForm } from "../service/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginForm(values.email, values.password);
        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("role", response.data.role);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Box className="header">
      <form onSubmit={formik.handleSubmit}>
        <Paper className="sub-header" variant="outlined">
          <Typography variant="h6" color="initial" className="sub-header-text">
            Login
          </Typography>
          <Typography variant="body1" color="initial">
            Happy to see you again, please login here.
          </Typography>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {/* {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null} */}

          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {/* {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null} */}
          <Typography variant="body1" color="initial">
            forgot your password ?
          </Typography>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Paper>
      </form>
    </Box>
  );
}
