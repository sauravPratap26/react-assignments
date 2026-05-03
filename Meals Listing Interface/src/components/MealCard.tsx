import "../MealCard.css";
import type { Meal } from "../types/meal";

const FALLBACK_IMG = "https://via.placeholder.com/400x300?text=No+Image";

export default function MealCard({ meal }: { meal: Meal }) {
  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
    strSource,
    ingredientsList,
  } = meal;

  return (
    <div className="meal-card">
      <img
        src={strMealThumb || FALLBACK_IMG}
        alt={strMeal}
        className="meal-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMG;
        }}
      />

      <h2 className="meal-title">{strMeal}</h2>

      <div className="meal-meta">
        <span>ITEM TYPE: {strCategory}</span>
        <span>{strArea}</span>
      </div>

      <div className="meal-section">
        <h3 style={{ color: "green", textDecoration: "underline" }}>
          Ingredients: Quantity
        </h3>
        <ul>
          {Object.entries(ingredientsList).map(([name, qty]) => (
            <li style={{ listStyle: "none" }} key={name}>
              <strong>{name}</strong>: {qty}
            </li>
          ))}
        </ul>
      </div>

      <div className="meal-section">
        <h3>Instructions</h3>
        <p>{strInstructions}</p>
      </div>

      <div className="meal-links">
        {strSource && (
          <a href={strSource} target="_blank" rel="noreferrer">
            Source
          </a>
        )}
        {strYoutube && (
          <a href={strYoutube} target="_blank" rel="noreferrer">
            YouTube
          </a>
        )}
      </div>
    </div>
  );
}
