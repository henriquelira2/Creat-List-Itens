/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require("dotenv").config();

const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const fs = require("fs");
const moment = require("moment-timezone");

const app = express();
const port = process.env.PORT || 3001;

// Configurar o Multer para salvar o PDF em uma pasta temporária
const upload = multer({ dest: "uploads/" });

// Configurar o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "Z",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  fs.readFile(file.path, (err, data) => {
    if (err) throw err;

    // Data e hora atual de Brasília
    const brasiliaTime = moment()
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss");

    const query =
      "INSERT INTO pdf_files (filename, data, uploaded_at) VALUES (?, ?, ?)";
    db.query(query, [file.originalname, data, brasiliaTime], (err) => {
      if (err) throw err;
      console.log("PDF saved to database");
      res.send("PDF saved to database");
    });
  });
});

app.get("/pdf_files", (req, res) => {
  const query = "SELECT id, filename, uploaded_at FROM pdf_files";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/pdf_files/:id/download", (req, res) => {
  const { id } = req.params;

  const query = "SELECT filename, data FROM pdf_files WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching PDF file:", err);
      return res.status(500).send("Error fetching PDF file");
    }

    if (results.length === 0) {
      return res.status(404).send("File not found");
    }

    const file = results[0];
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(file.data);
  });
});

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
