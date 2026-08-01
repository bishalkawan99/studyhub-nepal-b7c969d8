CREATE POLICY "study materials readable" ON storage.objects FOR SELECT USING (bucket_id = 'study-materials');
CREATE POLICY "admins upload study materials" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'study-materials' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update study materials" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'study-materials' AND public.has_role(auth.uid(),'admin')) WITH CHECK (bucket_id = 'study-materials' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete study materials" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'study-materials' AND public.has_role(auth.uid(),'admin'));
