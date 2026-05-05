import type { Quote } from "../types/type";
import "../Quote.css";

const QuoteDisplay = ({ quote }: { quote: Quote }) => {
  return (
    <div className="quote-card">
      <p className="quote-content">“{quote?.content}”</p>

      <p className="quote-author">— {quote?.author || "Unknown"}</p>

      <div className="quote-tags">
        {quote?.tags?.map((tag: string, i: number) => (
          <span key={i} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuoteDisplay;
