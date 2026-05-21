import { useState } from "react";
import { createSeries } from "../services/seriesService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SeriesForm from "../components/SeriesForm";

function AddSeriesPage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [seasons, setSeasons] = useState(1);
  const [description, setDescription] = useState("");

  const navigate = useNavigate(); // Används för att gå till seriens detaljsida efter att en serie har skapats (behövdes för PUT på nya serier(inte de hårdkodade))
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {

    let imageUrl = "";    
    if (file) {
        const formData = new FormData();
        formData.append("image", file);        
        const uploadResponse = await axios.post("http://localhost:3001/api/upload", formData);
        imageUrl = uploadResponse.data.imageUrl;
}

    try {
      const newSeries = await createSeries({
        title,
        genre,
        seasons: Number(seasons),
        description,
        imageUrl: imageUrl,
      });

      alert("Series added!");
      setTitle("");
      setGenre("");
      setSeasons(1);
      setDescription("");
      navigate(`/series/${newSeries.id}`);
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div>
      <h1>Add New Series</h1>

      <SeriesForm
        title={title}
        genre={genre}
        seasons={seasons}
        description={description}

        onTitleChange={setTitle}
        onGenreChange={setGenre}
        onSeasonsChange={setSeasons}
        onDescriptionChange={setDescription}

        onFileChange={setFile}

        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddSeriesPage;