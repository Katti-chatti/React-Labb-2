import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getSeriesById } from "../services/seriesService";
import type { Series } from "../types/series.types";
import { updateSeries } from "../services/seriesService";
import { deleteSeries } from "../services/seriesService";

function SeriesDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editSeasons, setEditSeasons] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        if (!id) return;

        const data = await getSeriesById(Number(id));
        setSeries(data);
        setEditTitle(data.title);
        setEditGenre(data.genre);
        setEditSeasons(String(data.seasons));
        setEditDescription(data.description);

      } catch (err) {
        setError("Failed to fetch series");

      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!series) {
    return <p>Series not found</p>;
  }

  // Sparar uppdateringar av serien
  const handleUpdate = async () => {
  if (!series) return;

  try {
    const updated = await updateSeries(series.id, {
      title: editTitle,
      genre: editGenre,
      seasons: Number(editSeasons),
      description: editDescription,
      imageUrl: series.imageUrl,
    });

    setSeries(updated);
    setIsEditing(false);
  } catch (err) {
    console.error(err);
  }
};

// Tar bort serien
const handleDelete = async () => {
  if (!series) return;

  const confirmed = window.confirm(
    "Are you sure you want to delete this series?");

  if (!confirmed) return;
  try {
    await deleteSeries(series.id);
    navigate("/series");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>

      {isEditing ? (
        <div>
    <input 
    value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
    />
    
    <input
      value={editGenre} onChange={(e) => setEditGenre(e.target.value)}
    />

    <input
      type="number" value={editSeasons} onChange={(e) => setEditSeasons(e.target.value)}
    />

    <textarea
      value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
    />

    <button onClick={handleUpdate}>
      Save Changes </button>
  </div>
) : (
  <div>
    <h1>{series.title}</h1>
    
    {series.imageUrl && (
        <img
        src={series.imageUrl}
        alt={series.title}
        width="300"
  />
)}

    <p>
      <strong>Genre:</strong> {series.genre}
    </p>

    <p>
      <strong>Seasons:</strong> {series.seasons}
    </p>

    <p>{series.description}</p>

<div className="details-buttons">
  <button
    className="edit-button"
    onClick={() => setIsEditing(!isEditing)}
  > {isEditing ? "Cancel" : "Edit"} </button>

  <button
    className="delete-button"
    onClick={handleDelete}
  > Delete </button>
</div>
  </div>
)}      
    </div>
  );
}

export default SeriesDetailsPage;