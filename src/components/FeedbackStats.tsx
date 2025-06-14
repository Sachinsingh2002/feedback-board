
import { FeedbackEntry } from "@/types/feedback";
import { Star } from "lucide-react";

type Props = {
  feedbacks: FeedbackEntry[];
};

export default function FeedbackStats({ feedbacks }: Props) {
  const avg =
    feedbacks.length === 0
      ? 0
      : (
          feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length
        ).toFixed(1);

  const total = feedbacks.length;

  // Popularity: most feedbacks per product
  const productCounts: Record<string, number> = {};
  feedbacks.forEach((f) => {
    productCounts[f.product] = (productCounts[f.product] || 0) + 1;
  });
  const mostPopularProduct =
    Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="grid grid-cols-3 gap-5 mb-6">
      <div className="bg-secondary p-5 rounded-lg shadow flex flex-col items-center">
        <div className="text-sm uppercase text-muted-foreground tracking-widest">
          Avg. Rating
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-3xl font-bold">{avg}</span>
          <Star size={28} color="#fbbf24" fill="#fbbf24" />
        </div>
      </div>
      <div className="bg-secondary p-5 rounded-lg shadow flex flex-col items-center">
        <div className="text-sm uppercase text-muted-foreground tracking-widest">
          Total Feedbacks
        </div>
        <span className="text-3xl font-bold mt-2">{total}</span>
      </div>
      <div className="bg-secondary p-5 rounded-lg shadow flex flex-col items-center">
        <div className="text-sm uppercase text-muted-foreground tracking-widest">
          Most Popular Product
        </div>
        <span className="text-xl font-bold mt-2">{mostPopularProduct ?? "-"}</span>
      </div>
    </div>
  );
}
