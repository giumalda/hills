ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS cv_path text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'nuova';

CREATE POLICY "Admins can update applications"
  ON public.job_applications FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can upload a CV"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'cv');

CREATE POLICY "Admins can read CVs"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'cv' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete CVs"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cv' AND has_role(auth.uid(), 'admin'::app_role));