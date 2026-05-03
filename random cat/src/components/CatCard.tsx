import type { Cat } from "../types/cat.type";
import "../CatCard.css";

const FALLBACK_IMG = "https://via.placeholder.com/400x300?text=No+Image";

export default function CatCard({ cat }: { cat: Cat }) {
  return (
    <div className="cat-card">
      <img
        src={cat.image || FALLBACK_IMG}
        alt={cat.name}
        className="cat-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMG;
        }}
      />

      <h2 className="cat-title">{cat.name}</h2>

      <div className="cat-meta">
        <span>
          <strong>Origin:</strong> {cat.origin}
        </span>
        <span>
          <strong>Life:</strong> {cat.life_span} yrs
        </span>
      </div>

      <p className="cat-desc">{cat.description}</p>

      <div className="cat-section">
        <h3>Temperament</h3>
        <p>{cat.temperament}</p>
      </div>

      <div className="cat-section">
        <h3>Traits</h3>
        <ul className="traits">
          <li>Adaptability: {cat.adaptability}</li>
          <li>Affection: {cat.affection_level}</li>
          <li>Intelligence: {cat.intelligence}</li>
          <li>Energy: {cat.energy_level}</li>
        </ul>
      </div>

      {cat.wikipedia_url && (
        <div className="cat-link">
          <a href={cat.wikipedia_url} target="_blank" rel="noreferrer">
            Learn More
          </a>
        </div>
      )}
    </div>
  );
}
