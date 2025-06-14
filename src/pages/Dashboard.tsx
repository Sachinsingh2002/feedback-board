
import React from "react";
import { FeedbackEntry } from "@/types/feedback";
import { mockFeedback } from "@/mock/feedback";
import { FeedbackTable } from "@/components/FeedbackTable";
import FeedbackStats from "@/components/FeedbackStats";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const products = [
  "Widget Pro",
  "Widget Lite",
  "Widget X",
];

function getChartData(feedbacks: FeedbackEntry[]) {
  // Aggregate average rating per product
  const data: Record<string, { product: string; avg: number; count: number }> = {};
  products.forEach((p) => (data[p] = { product: p, avg: 0, count: 0 }));
  feedbacks.forEach((f) => {
    data[f.product].avg += f.rating;
    data[f.product].count += 1;
  });
  return Object.values(data).map((d) => ({
    product: d.product,
    avg: d.count ? d.avg / d.count : 0,
    count: d.count,
  }));
}

export default function Dashboard() {
  // In real app, this would be loaded via API w/ live updates.
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>(mockFeedback);

  // Sort + filter
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [productFilter, setProductFilter] = useState<string | null>(null);

  let shownFeedbacks = [...feedbacks];
  if (productFilter) shownFeedbacks = shownFeedbacks.filter(f => f.product === productFilter);
  if (sortBy === "rating") shownFeedbacks.sort((a, b) => b.rating - a.rating);
  else shownFeedbacks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Simulate real-time
  React.useEffect(() => {
    // Listen for new feedback via browser event (for demo—could be via WS in real app)
    const handler = (ev: any) => {
      if (!ev.detail) return;
      setFeedbacks((f) => [ev.detail, ...f]);
      toast({
        title: "New feedback!",
        description: ev.detail.feedback,
      });
    };
    window.addEventListener("add-feedback", handler);
    return () => window.removeEventListener("add-feedback", handler);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      <FeedbackStats feedbacks={feedbacks} />
      <div className="mb-6 flex flex-wrap gap-5">
        <div>
          <label className="font-semibold mr-1">Sort By:</label>
          <select
            className="border rounded-md py-1 px-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="date">Date (newest)</option>
            <option value="rating">Rating (high–low)</option>
          </select>
        </div>
        <div>
          <label className="font-semibold mr-1">Filter Product:</label>
          <select
            className="border rounded-md py-1 px-2"
            value={productFilter ?? ""}
            onChange={(e) => setProductFilter(e.target.value || null)}
          >
            <option value="">All</option>
            {products.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={getChartData(feedbacks)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis allowDecimals={false} domain={[0, 5]} ticks={[1,2,3,4,5]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg" name="Average Rating" stroke="#2563eb" strokeWidth={3} dot={{r:6}} />
          <Line type="monotone" dataKey="count" name="# Feedbacks" stroke="#a3e635" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-8">
        <FeedbackTable feedbacks={shownFeedbacks} />
      </div>
    </div>
  );
}
