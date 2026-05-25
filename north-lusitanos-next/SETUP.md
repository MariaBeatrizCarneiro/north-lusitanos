# North Lusitanos — Next.js App

Site de selas em segunda mão com painel de gestão privado.

---

## Passos para colocar em produção

### 1. Criar conta Supabase (grátis)

1. Vai a [supabase.com](https://supabase.com) e cria uma conta
2. Cria um novo projeto (guarda a password do projeto — não é usada aqui mas pode precisar)
3. Vai a **Settings → API** e copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Criar a base de dados

1. No painel Supabase, vai a **SQL Editor**
2. Cola o conteúdo de `supabase/schema.sql` e executa
3. Opcionalmente, cola `supabase/seed.sql` para importar as selas existentes

### 3. Criar o bucket de fotos

No painel Supabase:
- **Storage → New bucket**
- Nome: `saddle-photos`
- Ativa **Public bucket**

> O SQL no schema.sql já tenta criar o bucket mas é mais fiável fazê-lo pelo painel.

### 4. Configurar variáveis de ambiente localmente

```bash
cp .env.local.example .env.local
```

Edita `.env.local` com os teus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=a-tua-password-segura
ADMIN_SESSION_TOKEN=string-aleatoria-longa
```

Para gerar o `ADMIN_SESSION_TOKEN`:
```bash
openssl rand -base64 32
```

### 5. Testar localmente

```bash
npm install
npm run dev
```

- Site público: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### 6. Deploy no Vercel

1. Faz push do projeto para GitHub
2. Vai a [vercel.com](https://vercel.com) → **New Project** → importa o repo
3. Em **Environment Variables**, adiciona as mesmas 5 variáveis do `.env.local`
4. **Deploy**

---

## Estrutura do projeto

```
north-lusitanos-next/
├── app/
│   ├── page.tsx              ← Site público
│   ├── admin/
│   │   ├── page.tsx          ← Painel de gestão
│   │   └── login/page.tsx    ← Login do gestor
│   └── api/
│       ├── saddles/          ← CRUD de selas
│       ├── upload/           ← Upload de fotos
│       └── admin/            ← Login / logout
├── components/
│   ├── SaddleCard.tsx
│   ├── SaddleGrid.tsx
│   ├── InterestModal.tsx
│   ├── PhotoLightbox.tsx
│   └── admin/
│       └── SaddleForm.tsx
├── lib/
│   ├── supabase.ts           ← Clientes Supabase
│   └── auth.ts               ← Gestão do cookie de admin
├── proxy.ts                  ← Proteção das rotas /admin
├── types/saddle.ts           ← Tipos TypeScript
└── supabase/
    ├── schema.sql            ← Schema da BD
    └── seed.sql              ← Dados iniciais
```

---

## Usar o painel de admin

1. Acede a `/admin` → redireciona automaticamente para `/admin/login`
2. Entra com a password que definiste em `ADMIN_PASSWORD`
3. Na dashboard podes:
   - **Nova Sela** — preenche o formulário e faz upload de fotos
   - **Editar** — altera qualquer campo ou troca/reordena fotos
   - **Vendida / Disponível** — toggle rápido sem abrir o formulário
   - **Eliminar** — confirmação antes de apagar (fotos incluídas)
