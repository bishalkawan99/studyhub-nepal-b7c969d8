ALTER TABLE public.mcq_questions
  ADD COLUMN IF NOT EXISTS faculty text NOT NULL DEFAULT 'Common',
  ADD COLUMN IF NOT EXISTS difficulty text NOT NULL DEFAULT 'medium';

CREATE INDEX IF NOT EXISTS mcq_questions_lookup_idx
  ON public.mcq_questions (class_level, subject_slug, chapter, difficulty);