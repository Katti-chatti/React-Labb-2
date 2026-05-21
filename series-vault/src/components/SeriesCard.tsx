import { Link } from "react-router-dom";
import type { Series } from "../types/series.types";

type Props = {
  series: Series;
};

function SeriesCard({ series }: Props) {
  return (
    <Link
      to={`/series/${series.id}`}
      className="series-card-link"
    >
      <div className="series-card">

        <h2>{series.title}</h2>

        {series.imageUrl && (
          <img
            src={series.imageUrl}
            alt={series.title}
            width="200"
          />
        )}
        
        <p className={`genre-${series.genre
        .toLowerCase()
        .replace("-", "")
        .replace(" ", "")}`}
>
          {series.genre}
        </p>

        <p>{series.seasons} seasons</p>

      </div>
    </Link>
  );
}

export default SeriesCard;