
import { FeedbackEntry } from "@/types/feedback";

export const mockFeedback: FeedbackEntry[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@email.com",
    product: "Widget Pro",
    feedback: "Great product! Could use dark mode.",
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "2",
    name: "Bob",
    email: "",
    product: "Widget Lite",
    feedback: "Basic but works well.",
    rating: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "3",
    name: "",
    email: "",
    product: "Widget Pro",
    feedback: "Feedback left anonymously, but I like it overall.",
    rating: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "4",
    name: "Dana",
    email: "dana@email.com",
    product: "Widget X",
    feedback: "Not what I expected, but support is helpful.",
    rating: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: "5",
    name: "Evan",
    email: "",
    product: "Widget X",
    feedback: "Needs improvements, especially in speed.",
    rating: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
];
