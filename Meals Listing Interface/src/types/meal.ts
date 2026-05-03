export type Meal = {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb?: string;
  strYoutube?: string;
  strSource?: string;
  ingredientsList: Record<string, string>;
};