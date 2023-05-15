import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import {
  addDocument,
  deleteDocumentById,
  getDocument,
  getDocumentById,
} from "../service/document";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";

export default function Home() {
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
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const HandleChangePage = () => {
    navigate("/addDocument");
  };

  async function getDocumentId(id) {
    const response = await deleteDocumentById(id);
    if (response.status === 200) {
      alert("berhasil menghapus document");
      window.location.reload();
    }
  }

  const downloadImage = (url) => {
    window.open(url);
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
        {role == "admin" ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={HandleChangePage}
            sx={{
              marginBottom: "10px",
              textTransform: "capitalize",
            }}
          >
            Tambah Document
          </Button>
        ) : null}
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
          variant="contained"
        >
          {document.map((el) => {
            return (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      el.image_url == null
                        ? "https://seojasa.com/wp-content/uploads/2019/08/error-404.jpg"
                        : el.image_url
                    }
                    alt="image"
                    sx={{
                      objectFit: "fill",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {el.judul}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {el.deskripsi}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {el.nama}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {el.tanggal_unggah.split("T")[0]}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    {role == "admin" ? (
                      <Tooltip
                        title="Delete"
                        onClick={() => getDocumentId(el.id)}
                      >
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    <Tooltip title="Download">
                      <CloudDownloadTwoToneIcon
                        onClick={() => downloadImage(el.image_url)}
                      />
                    </Tooltip>
                  </Box>
                </CardActionArea>
              </Card>
            );
          })}
        </Paper>
      </Container>
    </>
  );
}
