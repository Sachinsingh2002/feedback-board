
export type FeedbackEntry = {
  id: string;
  name?: string;
  email?: string;
  product: string;
  feedback: string;
  rating: number; // 1-5
  createdAt: Date;
};
