
import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

type Props = {
  value: number;
  onChange?: (value: number) => void; // if set, interactive
  size?: number;
  className?: string;
  readOnly?: boolean;
};

export const StarRating: React.FC<Props> = ({
  value,
  onChange,
  size = 22,
  className = "",
  readOnly = false,
}) => {
  const [hovered, setHovered] = React.useState<number | undefined>(undefined);

  return (
    <div className={`flex flex-row gap-1 ${className}`} tabIndex={0} role="radiogroup">
      {[1,2,3,4,5].map(star => (
        <button
          type="button"
          key={star}
          aria-label={`Rate ${star} star${star>1?"s":""}`}
          className="group"
          disabled={readOnly}
          tabIndex={readOnly?-1:0}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(undefined)}
          onClick={() => !readOnly && onChange && onChange(star)}
        >
          {((hovered ?? value) >= star) ? (
            <Star fill="#fbbf24" color="#f59e1a" size={size} strokeWidth={1.3} />
          ) : (
            <StarOff size={size} color="#DBDBDB" strokeWidth={1.3} />
          )}
        </button>
      ))}
    </div>
  );
};
