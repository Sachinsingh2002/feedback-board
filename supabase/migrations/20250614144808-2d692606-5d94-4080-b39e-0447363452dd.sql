
-- Create a feedback table to store feedback submissions.
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  product TEXT NOT NULL,
  feedback TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for fine-grained access control.
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new feedback (anonymous feedback): FOR INSERT you must use only WITH CHECK.
CREATE POLICY "Allow insert for all (anonymous feedback)"
  ON public.feedback
  FOR INSERT
  WITH CHECK (TRUE);

-- Allow everyone to select feedback (for public dashboard access).
CREATE POLICY "Allow select for all (public dashboard)"
  ON public.feedback
  FOR SELECT
  USING (TRUE);
