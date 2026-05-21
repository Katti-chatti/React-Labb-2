import { useEffect, useState } from "react";
import { getAllSeries } from "../services/seriesService";
import type { Series } from "../types/series.types";
import SeriesCard from "../components/SeriesCard";
import { useDeferredValue } from "react";

function SeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search); /* Denna funkar som en debounce vid sökning */

  const filteredSeries = series.filter((item) =>
  item.title
    .toLowerCase()
    .includes(deferredSearch.toLowerCase()) || 

  item.genre
    .toLowerCase()
    .includes(deferredSearch.toLowerCase())
);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getAllSeries();
        setSeries(data);
      } catch (err) {
        setError("Failed to fetch series");
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="series-page">
    <h1>SeriesVault</h1>

    <input
    className="search-input"
    type="text"
    placeholder="🔎 Search series..."
    value={search}
    onChange={(e) =>
    setSearch(e.target.value)
  }
/>

  {filteredSeries.length === 0 && (
  <p>No matching series found.</p>
)}
    
    <div className="series-container">
      {filteredSeries.map((item) => (<SeriesCard key={item.id} series={item}
  />
))}
    </div>
    </div>
  );
}

export default SeriesPage;