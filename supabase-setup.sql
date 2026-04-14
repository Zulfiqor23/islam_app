-- ============================================
-- ISLOMIY KUNDALIK PWA — Supabase Setup
-- Ushbu kodni necha marta ishlatsa ham xato bermaydi!
-- https://supabase.com/dashboard/project/eezjwzgvfhqtemwkvryl/sql/new
-- ============================================

-- 1. Jadval yaratish (agar mavjud bo'lmasa)
CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Foydalanuvchi',
  push_subscription JSONB,
  utc_offset INTEGER DEFAULT 5,
  bomdod TEXT,
  peshin TEXT,
  asr TEXT,
  shom TEXT,
  xufton TEXT,
  juma_time TEXT DEFAULT '11:20',
  work_start TEXT,
  work_end TEXT,
  goals JSONB DEFAULT '[]',
  duas JSONB DEFAULT '{}',
  tasks JSONB DEFAULT '[]',
  bilimlar JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Mavjud jadvalga yangi ustunlar (agar yo'q bo'lsa)
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS push_subscription JSONB;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS utc_offset INTEGER DEFAULT 5;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS goals JSONB DEFAULT '[]';
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS duas JSONB DEFAULT '{}';
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS tasks JSONB DEFAULT '[]';
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS bilimlar JSONB DEFAULT '[]';
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS bomdod TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS peshin TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS asr TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS shom TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS xufton TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS juma_time TEXT DEFAULT '11:20';
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS work_start TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS work_end TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. RLS yoqish (xato bermaydi)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 4. Policy (agar mavjud bo'lsa avval o'chiradi)
DROP POLICY IF EXISTS "Allow all" ON subscribers;
CREATE POLICY "Allow all" ON subscribers FOR ALL USING (true) WITH CHECK (true);

-- 5. Updated_at trigger funksiya
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Trigger (agar mavjud bo'lsa avval o'chiradi)
DROP TRIGGER IF EXISTS updated_at_trigger ON subscribers;
CREATE TRIGGER updated_at_trigger
  BEFORE UPDATE ON subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- TAYYOR! Endi Vercel ga deploy qiling.
-- ============================================
