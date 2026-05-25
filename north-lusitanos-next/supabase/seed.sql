-- =================================================================
-- North Lusitanos · Seed Inicial
-- Migra as 7 selas do site HTML para a base de dados Supabase
-- ATENÇÃO: as fotos continuam a apontar para o site antigo.
-- Depois de fazer upload das fotos ao Supabase Storage,
-- atualiza os URLs na coluna photos.
-- =================================================================

INSERT INTO saddles (name, type, size, material, price, description, sold, photos) VALUES
  (
    'Zaldi Lustinus',
    'dressage', '17.5"', 'Couro', 675,
    'Sela de dressage espanhola em couro preto. Detalhes em strass, assento confortável. Muito bom estado.',
    false,
    ARRAY['Sela6/6.1.jpeg','Sela6/6.2.jpeg','Sela6/6.3.jpeg']
  ),
  (
    'Relvas · Equicouro',
    'dressage', '17.5"', 'Couro', 750,
    'Sela relvas fabricada na Equicouro. Vendida com loros e estribos à portuguesa.',
    false,
    ARRAY['Sela0/0.1.jpeg','Sela0/0.2.jpeg','Sela0/0.3.jpeg','Sela0/0.4.jpeg','Sela0/0.5.jpeg']
  ),
  (
    'Prestige Archimede',
    'salto', '17"', 'Couro', 575,
    'Sela de salto italiana em couro castanho. Flaps avançadas, assento confortável. Bom estado geral.',
    false,
    ARRAY['Sela1/1.1.jpeg','Sela1/1.2.jpeg','Sela1/1.3.jpeg']
  ),
  (
    'Bates Innova',
    'dressage', '17.5"', 'Couro', 950,
    'Dressage em couro preto, muito bem conservada. Flaps longas e assento profundo. Muito bom estado.',
    true,
    ARRAY['Sela2/2.1.jpeg','Sela2/2.2.jpeg','Sela2/2.3.jpeg','Sela2/2.4.jpeg']
  ),
  (
    'Santa Cruz',
    'dressage', '17.5"', 'Couro', 375,
    'Sela de dressage em couro preto. Bom estado geral, ideal para uso diário de treino.',
    false,
    ARRAY['Sela3/3.1.jpeg','Sela3/3.2.jpeg']
  ),
  (
    'Kentaur Penelopa',
    'dressage', '17.5"', 'Couro', 350,
    'Sela de dressage Kentaur em couro preto. Acompanha loros e estribos. Bom estado geral.',
    true,
    ARRAY['Sela4/4.1.jpeg','Sela4/4.2.jpeg','Sela4/4.3.jpeg','Sela4/4.4.jpeg']
  ),
  (
    'Kentaur Medea',
    'dressage', '17.5"', 'Couro', 350,
    'Dressage Kentaur em couro preto. Assento confortável, flaps longas. Bom estado de conservação.',
    true,
    ARRAY['Sela5/5.1.jpeg','Sela5/5.2.jpeg','Sela5/5.3.jpeg','Sela5/5.4.jpeg','Sela5/5.5.jpeg']
  );
