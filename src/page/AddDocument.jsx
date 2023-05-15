import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Form, Field } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { addDocument, getDocument } from "../service/document";

export default function AddDocument() {
  const [document, setDocument] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await getDocument();
      if (response.status === 200) {
        setDocument(response.data.data);
      }
      console.log(response);
    }
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      nama: "",
      judul: "",
      deskripsi: "",
      tanggal_unggah: "",
      image_url: "",
    },
    validationSchema: Yup.object({
      nama: Yup.string().required("Nama is required"),
      judul: Yup.string().required("Judul is required"),
      deskripsi: Yup.string().required("Deskripsi is required"),
      tanggal_unggah: Yup.date().required("Tanggal Unggah is required"),
    }),
    onSubmit: async (values) => {
      try {
        const form = {
          nama: values.nama,
          judul: values.judul,
          deskripsi: values.deskripsi,
          tanggal_unggah: values.tanggal_unggah,
          image_url: values.image_url,
        };
        const response = await addDocument(form);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image_url", file);
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "10px",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nama"
                label="Nama"
                onChange={formik.handleChange}
                value={formik.values.nama}
                error={formik.touched.nama && formik.errors.nama}
                helperText={formik.touched.nama && formik.errors.nama}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="judul"
                label="Judul"
                onChange={formik.handleChange}
                value={formik.values.judul}
                error={formik.touched.judul && formik.errors.judul}
                helperText={formik.touched.judul && formik.errors.judul}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="deskripsi"
                label="Deskripsi"
                onChange={formik.handleChange}
                value={formik.values.deskripsi}
                error={formik.touched.deskripsi && formik.errors.deskripsi}
                helperText={formik.touched.deskripsi && formik.errors.deskripsi}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="tanggal_unggah"
                // label="Tanggal_unggah"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.tanggal_unggah}
                error={
                  formik.touched.tanggal_unggah && formik.errors.tanggal_unggah
                }
                helperText={
                  formik.touched.tanggal_unggah && formik.errors.tanggal_unggah
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="image_url"
                // label="Tanggal_unggah"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
