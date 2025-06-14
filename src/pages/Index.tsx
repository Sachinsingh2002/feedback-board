
// Feedback submission form page

import React from "react";
import { StarRating } from "@/components/StarRating";
import { toast } from "@/hooks/use-toast";

const PRODUCTS = [
  "Widget Pro",
  "Widget Lite",
  "Widget X"
];

// Generate random id for feedback
function randomId() {
  return Math.random().toString(36).substring(2, 10);
}

const Index = () => {
  const [rating, setRating] = React.useState<number>(0);
  const [product, setProduct] = React.useState(PRODUCTS[0]);
  const [feedback, setFeedback] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [touched, setTouched] = React.useState<{[k:string]:boolean}>({});

  const error =
    !feedback
      ? "Feedback is required."
      : rating < 1 
          ? "Please select a rating."
          : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (error) {
      setTouched({feedback:true, rating:true});
      toast({
        title: "Please fix",
        description: error
      });
      return;
    }
    setIsSubmitting(true);
    // Store in frontend for demo; in real app, send to backend
    setTimeout(() => {
      // Fire a browser event for the dashboard to "catch"
      const entry = {
        id: randomId(),
        name: name.trim(),
        email: email.trim(),
        product,
        feedback,
        rating,
        createdAt: new Date(),
      };
      window.dispatchEvent(new CustomEvent("add-feedback", {detail: entry}));
      setIsSubmitting(false);
      setFeedback("");
      setRating(0);
      setProduct(PRODUCTS[0]);
      setName("");
      setEmail("");
      toast({
        title: "Thanks for your feedback!",
        description: "Your feedback was submitted successfully.",
      });
    }, 900);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-7">Leave Feedback</h2>
      <form className="space-y-6 bg-card shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1">Product</label>
          <select className="w-full border rounded-md p-2" required value={product} onChange={e=>setProduct(e.target.value)}>
            {PRODUCTS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Your Feedback <span className="text-red-500">*</span></label>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            onBlur={() => setTouched((t) => ({...t, feedback: true}))}
            rows={4}
            className="w-full border rounded-md p-2"
            required
          />
          {touched.feedback && !feedback && (
            <div className="text-red-500 text-sm mt-1">Feedback is required.</div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Rating <span className="text-red-500">*</span></label>
          <StarRating value={rating} onChange={setRating} />
          {touched.rating && rating < 1 && (
            <div className="text-red-500 text-sm mt-1">Please select a rating.</div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input type="text" className="border rounded-md w-full p-2" value={name} onChange={e=>setName(e.target.value)} maxLength={32} />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" className="border rounded-md w-full p-2" value={email} onChange={e => setEmail(e.target.value)} maxLength={50} />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground py-2 text-lg font-semibold rounded-md hover:bg-primary/90 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
      <div className="mt-12 text-muted-foreground text-sm opacity-70">
        All feedback is anonymous unless you choose to share your info.
      </div>
    </div>
  );
};

export default Index;
