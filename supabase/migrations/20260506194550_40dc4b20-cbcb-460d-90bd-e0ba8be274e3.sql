CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Cliente',
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  status public.review_status NOT NULL DEFAULT 'pending',
  approval_token UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review
CREATE POLICY "Anyone can insert reviews"
ON public.reviews FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews"
ON public.reviews FOR SELECT
TO anon, authenticated
USING (status = 'approved');