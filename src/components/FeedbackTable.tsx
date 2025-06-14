
import { FeedbackEntry } from "@/types/feedback";
import { StarRating } from "./StarRating";

type Props = {
  feedbacks: FeedbackEntry[];
  sortBy?: "rating" | "date";
  filterProduct?: string;
};

export const FeedbackTable: React.FC<Props> = ({ feedbacks }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[640px] w-full mt-2 text-left rounded-md overflow-hidden shadow divide-y divide-muted">
        <thead>
          <tr className="bg-muted">
            <th className="p-3">Product</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Feedback</th>
            <th className="p-3">Name</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f, idx) => (
            <tr key={f.id} className={`${idx%2 ? "bg-background" : "bg-secondary"} transition`}>
              <td className="p-3 font-semibold">{f.product}</td>
              <td className="p-3"><StarRating value={f.rating} readOnly size={18} /></td>
              <td className="p-3 max-w-[260px] truncate">{f.feedback}</td>
              <td className="p-3">{f.name || <span className="text-muted-foreground italic">Anonymous</span>}</td>
              <td className="p-3 text-sm">{f.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
