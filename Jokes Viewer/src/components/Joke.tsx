import type { JOKE } from "../types/type";
import "../styles/joke.css";

const Joke = ({ joke }: { joke: JOKE }) => {
  return (
    <div className="card">
      <p>{joke.content}</p>
      <p>{joke.categories}</p>
    </div>
  );
};

export default Joke;
