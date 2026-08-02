CREATE TABLE public.gpa_settings (
  key text PRIMARY KEY,
  value numeric NOT NULL,
  label text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gpa_settings TO anon, authenticated;
GRANT ALL ON public.gpa_settings TO service_role;
ALTER TABLE public.gpa_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gpa settings are public" ON public.gpa_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write gpa settings" ON public.gpa_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gpa_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gpa_classes TO anon, authenticated;
GRANT ALL ON public.gpa_classes TO service_role;
ALTER TABLE public.gpa_classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gpa classes are public" ON public.gpa_classes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write gpa classes" ON public.gpa_classes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gpa_faculties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES public.gpa_classes(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (class_id, slug)
);
GRANT SELECT ON public.gpa_faculties TO anon, authenticated;
GRANT ALL ON public.gpa_faculties TO service_role;
ALTER TABLE public.gpa_faculties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gpa faculties are public" ON public.gpa_faculties FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write gpa faculties" ON public.gpa_faculties FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gpa_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id uuid NOT NULL REFERENCES public.gpa_faculties(id) ON DELETE CASCADE,
  name text NOT NULL,
  theory_full_marks numeric NOT NULL DEFAULT 75,
  practical_full_marks numeric NOT NULL DEFAULT 25,
  practical_label text NOT NULL DEFAULT 'Internal',
  is_optional boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gpa_subjects TO anon, authenticated;
GRANT ALL ON public.gpa_subjects TO service_role;
ALTER TABLE public.gpa_subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gpa subjects are public" ON public.gpa_subjects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write gpa subjects" ON public.gpa_subjects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gpa_grade_boundaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade text NOT NULL UNIQUE,
  min_gpa numeric NOT NULL,
  max_gpa numeric NOT NULL,
  grade_point numeric NOT NULL,
  min_percentage numeric,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gpa_grade_boundaries TO anon, authenticated;
GRANT ALL ON public.gpa_grade_boundaries TO service_role;
ALTER TABLE public.gpa_grade_boundaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gpa grades are public" ON public.gpa_grade_boundaries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write gpa grades" ON public.gpa_grade_boundaries FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER gpa_settings_updated_at BEFORE UPDATE ON public.gpa_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER gpa_classes_updated_at BEFORE UPDATE ON public.gpa_classes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER gpa_faculties_updated_at BEFORE UPDATE ON public.gpa_faculties FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER gpa_subjects_updated_at BEFORE UPDATE ON public.gpa_subjects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER gpa_grade_boundaries_updated_at BEFORE UPDATE ON public.gpa_grade_boundaries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.gpa_settings (key, value, label) VALUES
  ('theory_passing_percentage', 35, 'Minimum theory percentage required to pass a subject'),
  ('practical_passing_percentage', 40, 'Minimum practical/internal percentage required to pass a subject'),
  ('ng_gpa_threshold', 0.80, 'GPA below this value is graded NG');

INSERT INTO public.gpa_grade_boundaries (grade, min_gpa, max_gpa, grade_point, min_percentage, sort_order) VALUES
  ('A+', 3.61, 4.00, 4.00, 90, 1),
  ('A',  3.21, 3.60, 3.60, 80, 2),
  ('B+', 2.81, 3.20, 3.20, 70, 3),
  ('B',  2.41, 2.80, 2.80, 60, 4),
  ('C+', 2.01, 2.40, 2.40, 50, 5),
  ('C',  1.61, 2.00, 2.00, 40, 6),
  ('D+', 1.21, 1.60, 1.60, 35, 7),
  ('D',  0.80, 1.20, 1.20, 30, 8),
  ('NG', 0.00, 0.79, 0.00, 0,  9);

WITH c AS (
  INSERT INTO public.gpa_classes (slug, name, sort_order) VALUES ('class-11', 'Class 11', 1), ('class-12', 'Class 12', 2)
  RETURNING id, slug
), f AS (
  INSERT INTO public.gpa_faculties (class_id, slug, name, sort_order)
  SELECT c.id, v.slug, v.name, v.sort_order
  FROM c CROSS JOIN (VALUES ('science', 'Science', 1), ('management', 'Management', 2)) AS v(slug, name, sort_order)
  RETURNING id, slug
)
INSERT INTO public.gpa_subjects (faculty_id, name, theory_full_marks, practical_full_marks, practical_label, is_optional, sort_order)
SELECT f.id, s.name, s.theory, s.practical, s.plabel, s.optional, s.sort_order
FROM f
JOIN (VALUES
  ('science', 'Nepali', 75, 25, 'Internal', false, 1),
  ('science', 'English', 75, 25, 'Internal', false, 2),
  ('science', 'Compulsory Mathematics', 75, 25, 'Internal', false, 3),
  ('science', 'Physics', 75, 25, 'Practical', false, 4),
  ('science', 'Chemistry', 75, 25, 'Practical', false, 5),
  ('science', 'Biology', 75, 25, 'Practical', false, 6),
  ('science', 'Computer Science', 50, 50, 'Practical', true, 7),
  ('management', 'Nepali', 75, 25, 'Internal', false, 1),
  ('management', 'English', 75, 25, 'Internal', false, 2),
  ('management', 'Compulsory Mathematics', 75, 25, 'Internal', false, 3),
  ('management', 'Accountancy', 75, 25, 'Internal', false, 4),
  ('management', 'Economics', 75, 25, 'Internal', false, 5),
  ('management', 'Business Studies', 75, 25, 'Internal', false, 6),
  ('management', 'Computer Science', 50, 50, 'Practical', true, 7)
) AS s(fslug, name, theory, practical, plabel, optional, sort_order)
ON s.fslug = f.slug;