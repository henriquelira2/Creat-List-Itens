const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql2");
const fs = require("fs");
const moment = require("moment-timezone");
const path = require("path");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://creat-list-itens-q1v5-qw89m9trj-gareky1s-projects.vercel.app",
  "https://creat-list-itens-q1v5.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const upload = multer({ dest: "uploads/" });

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

    const brasiliaTime = moment()
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss");

    const query =
      "INSERT INTO pdf_files (filename, data, uploaded_at) VALUES (?, ?, ?)";
    db.query(query, [file.originalname, data, brasiliaTime], (err) => {
      if (err) throw err;
      console.log("PDF salvo no banco de dados");
      res.send("PDF salvo no banco de dados");
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
      console.error("Erro ao buscar arquivo PDF:", err);
      return res.status(500).send("Erro ao buscar arquivo PDF");
    }

    if (results.length === 0) {
      return res.status(404).send("Arquivo não encontrado");
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

app.use(express.json());

app.post("/add-marca", (req, res) => {
  const { marca } = req.body;

  const checkQuery = "SELECT * FROM products WHERE marca = ?";
  db.query(checkQuery, [marca], (err, results) => {
    if (err) {
      console.error("Erro ao verificar a marca:", err);
      return res.status(500).json({ message: "Erro ao verificar a marca" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "A marca já existe no banco de dados" });
    }

    const insertQuery = "INSERT INTO products (marca) VALUES (?)";
    db.query(insertQuery, [marca], (err) => {
      if (err) {
        console.error("Erro ao adicionar a marca:", err);
        return res.status(500).json({ message: "Erro ao adicionar a marca" });
      }

      res.json({ message: "Marca adicionada com sucesso" });
    });
  });
});

app.get("/marcas", (req, res) => {
  const query = "SELECT marca FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar marcas:", err);
      return res.status(500).json({ message: "Erro ao buscar marcas" });
    }

    res.json(results);
  });
});

app.post("/add-item", (req, res) => {
  const { marca, item } = req.body;

  const checkQuery = "SELECT item FROM products WHERE marca = ?";
  db.query(checkQuery, [marca], (err, results) => {
    if (err) {
      console.error("Erro ao verificar a marca:", err);
      return res.status(500).json({ message: "Erro ao verificar a marca" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "A marca não existe no banco de dados" });
    }

    let items = results[0].item ? results[0].item.split(',') : [];
    if (items.includes(item)) {
      return res.status(400).json({ message: "O item já existe para essa marca" });
    }

    items.push(item);
    const newItems = items.join(',');

    const updateQuery = "UPDATE products SET item = ? WHERE marca = ?";
    db.query(updateQuery, [newItems, marca], (err) => {
      if (err) {
        console.error("Erro ao atualizar o item:", err);
        return res.status(500).json({ message: "Erro ao atualizar o item" });
      }

      res.json({ message: "Item adicionado com sucesso" });
    });
  });
});

app.get("/products", (req, res) => {
  const query = "SELECT marca, item FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).json({ message: "Erro ao buscar produtos" });
    }

    const products = results.map(result => ({
      marca: result.marca,
      items: result.item ? result.item.split(',') : []
    }));

    res.json(products);
  });
});


app.listen(port, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    port,
    app.settings.env
  );
});
