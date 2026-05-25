-- ============================================================
-- North Lusitanos · Supabase Schema
-- Colar e executar no SQL Editor do Supabase
-- ============================================================

-- Tabela de selas
CREATE TABLE IF NOT EXISTS saddles (
  id          uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text    NOT NULL,
  type        text    NOT NULL CHECK (type IN ('dressage', 'salto')),
  size        text    NOT NULL,
  material    text    NOT NULL DEFAULT 'Couro',
  price       integer NOT NULL CHECK (price > 0),
  description text    NOT NULL DEFAULT '',
  sold        boolean NOT NULL DEFAULT false,
  photos      text[]  NOT NULL DEFAULT '{}',
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER saddles_updated_at
  BEFORE UPDATE ON saddles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE saddles ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode ler as selas (site público)
CREATE POLICY "Public read" ON saddles
  FOR SELECT USING (true);

-- Apenas o service_role (usado nas API routes do Next.js) pode escrever
-- As API routes usam a SUPABASE_SERVICE_ROLE_KEY, não a anon key
CREATE POLICY "Service role write" ON saddles
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- Storage: Bucket para fotos
-- Executar separadamente no Supabase Dashboard:
--   Storage > New bucket > "saddle-photos" > Public bucket: ON
-- Ou via SQL:
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('saddle-photos', 'saddle-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Qualquer pessoa pode ver as fotos (URLs públicas)
CREATE POLICY "Public photo read" ON storage.objects
  FOR SELECT USING (bucket_id = 'saddle-photos');

-- Apenas service_role pode fazer upload / eliminar
CREATE POLICY "Service role photo write" ON storage.objects
  FOR ALL USING (bucket_id = 'saddle-photos' AND auth.role() = 'service_role');
