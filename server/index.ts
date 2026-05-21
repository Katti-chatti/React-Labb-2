import express from "express";
import cors from "cors";
import { seriesList } from "./data/series.js";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Filuppladdning
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads");
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Home route
app.get("/", (_req, res) => {
  res.send("Series Vault API is running");
});
// GET alla serier
app.get("/api/series", (_req, res) => {
  res.json(seriesList);
});
// GET en serie baserat på ID
app.get("/api/series/:id", (req, res) => {
  const id = Number(req.params.id);
  const foundSeries = seriesList.find(
    (series) => series.id === id
  );
  if (!foundSeries) {
    return res.status(404).json({
      message: "Series not found",
    });
  }
  res.json(foundSeries);
});

// POST en bild
app.post(
  "/api/upload",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    res.json({
      imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    });
  }
);

// POST en ny serie
app.post("/api/series", (req, res) => {
  const { title, genre, seasons, description, imageUrl } = req.body;
  const newSeries = {
    id: Date.now(),
    title,
    genre,
    seasons: Number(seasons),
    description,
    imageUrl,
  };

  seriesList.push(newSeries);

  res.status(201).json(newSeries);
});

// PUT uppdatera en serie
app.put("/api/series/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, genre, seasons, description, imageUrl } = req.body;
  const foundSeries = seriesList.find(
    (series) => series.id === id
  );
  if (!foundSeries) {
    return res.status(404).json({
      message: "Series not found",
    });
  }
  foundSeries.title = title;
  foundSeries.genre = genre;
  foundSeries.seasons = Number(seasons);
  foundSeries.description = description;
  foundSeries.imageUrl = imageUrl;
  res.json(foundSeries);
});

// DELETE en serie
app.delete("/api/series/:id", (req, res) => {
  const id = Number(req.params.id);
  const seriesIndex = seriesList.findIndex(
    (series) => series.id === id
  );

  if (seriesIndex === -1) {
    return res.status(404).json({
      message: "Series not found",
    });
  }
  seriesList.splice(seriesIndex, 1);
  res.json({
    message: "Series deleted",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});