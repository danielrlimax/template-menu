# Sabor & Brasa - Cardapio Digital

Sistema completo de cardapio digital com carrinho, calculo de frete por CEP, envio de pedidos via WhatsApp e painel administrativo.

## Indice

1. [Visao Geral](#visao-geral)
2. [Configuracao do Supabase](#configuracao-do-supabase)
3. [Configuracao do Banco de Dados](#configuracao-do-banco-de-dados)
4. [Configuracao do Storage](#configuracao-do-storage)
5. [Configuracao da Autenticacao](#configuracao-da-autenticacao)
6. [Variaveis de Ambiente](#variaveis-de-ambiente)
7. [Executando o Projeto](#executando-o-projeto)
8. [Estrutura do Projeto](#estrutura-do-projeto)

---

## Visao Geral

Este sistema inclui:

- **Cardapio Digital**: Exibicao de produtos por categoria com imagens, descricoes e precos
- **Carrinho de Compras**: Adicao de itens com adicionais e observacoes
- **Calculo de Frete**: Baseado no CEP usando a API ViaCEP
- **Pedido via WhatsApp**: Formatacao automatica do pedido
- **Painel Admin**: CRUD completo de produtos com upload de imagens
- **Autenticacao**: Login seguro para administradores
- **Personalizacao Visual**: Cores do tema e logo customizaveis
- **Upload de Logo**: Suporte para imagem de logo ou texto

---

## Configuracao do Supabase

### Passo 1: Criar Conta e Projeto

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta gratuita (pode usar GitHub, Google ou email)
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: Nome do seu projeto (ex: cardapio-digital)
   - **Database Password**: Crie uma senha forte (guarde-a!)
   - **Region**: Escolha a mais proxima (ex: South America - Sao Paulo)
5. Clique em **"Create new project"** e aguarde a criacao

### Passo 2: Obter Credenciais

1. No painel do Supabase, va em **Settings** (icone de engrenagem)
2. Clique em **API** no menu lateral
3. Copie:
   - **Project URL**: Sera seu `VITE_SUPABASE_URL`
   - **anon public key**: Sera seu `VITE_SUPABASE_ANON_KEY`

---

## Configuracao do Banco de Dados

### Passo 1: Executar o Schema SQL

1. No painel do Supabase, va em **SQL Editor** (icone de banco de dados)
2. Clique em **"New query"**
3. Copie TODO o conteudo do arquivo `database/schema.sql` deste projeto
4. Cole no editor SQL
5. Clique em **"Run"** (ou pressione Ctrl+Enter)
6. Verifique se aparece "Success" na parte inferior

**IMPORTANTE**: Se voce ja executou o schema antigo e esta com erro 403, execute o arquivo `database/fix_policies.sql` para corrigir as permissoes.

**ATUALIZACAO DE CORES**: Se voce ja tem o banco criado e quer adicionar suporte a cores e logo, execute o arquivo `database/update_config_colors.sql`.

### Passo 2: Inserir Dados Iniciais (Opcional)

1. Ainda no SQL Editor, clique em **"New query"**
2. Copie o conteudo do arquivo `database/seed.sql`
3. Cole e execute
4. Isso criara categorias e produtos de exemplo

### Passo 3: Verificar Tabelas

1. Va em **Table Editor** no menu lateral
2. Voce deve ver as tabelas:
   - `categories` - Categorias dos produtos
   - `products` - Produtos do cardapio
   - `product_addons` - Adicionais dos produtos
   - `restaurant_config` - Configuracoes do restaurante

---

## Configuracao do Storage

O Storage e usado para armazenar as imagens dos produtos.

### Passo 1: Criar Bucket

1. No painel do Supabase, va em **Storage** (icone de pasta)
2. Clique em **"New bucket"**
3. Preencha:
   - **Name**: `product-images`
   - **Public bucket**: **MARQUE ESTA OPCAO** (importante!)
4. Clique em **"Create bucket"**

### Passo 2: Configurar Politicas de Acesso

1. Clique no bucket `product-images`
2. Va na aba **"Policies"**
3. Clique em **"New Policy"**

**Politica 1 - Leitura Publica:**
- Clique em "For full customization"
- Policy name: `Public Read`
- Allowed operation: `SELECT`
- Target roles: deixe vazio (todos)
- Policy definition: `true`
- Clique em "Review" e depois "Save policy"

**Politica 2 - Upload para Autenticados:**
- Clique em "New Policy" novamente
- Policy name: `Authenticated Upload`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- Policy definition: `true`
- Salve a politica

**Politica 3 - Delete para Autenticados:**
- Policy name: `Authenticated Delete`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- Policy definition: `true`
- Salve a politica

**Politica 4 - Update para Autenticados:**
- Policy name: `Authenticated Update`
- Allowed operation: `UPDATE`
- Target roles: `authenticated`
- Policy definition: `true`
- Salve a politica

---

## Configuracao da Autenticacao

### Passo 1: Criar Usuario Admin

1. No painel do Supabase, va em **Authentication** (icone de pessoa)
2. Clique na aba **"Users"**
3. Clique em **"Add user"** > **"Create new user"**
4. Preencha:
   - **Email**: seu-email@exemplo.com
   - **Password**: uma senha forte
   - **Auto Confirm User**: MARQUE esta opcao
5. Clique em **"Create user"**

### Passo 2: Configurar Providers (Opcional)

Se quiser permitir login com Google, GitHub, etc:

1. Va em **Authentication** > **Providers**
2. Ative os providers desejados
3. Configure as credenciais de cada um

### Passo 3: Configurar Email (Producao)

Para producao, configure um provedor de email:

1. Va em **Settings** > **Auth**
2. Configure **SMTP Settings** com seu provedor
3. Personalize os templates de email se desejar

---

## Variaveis de Ambiente

### Passo 1: Criar arquivo .env

Na raiz do projeto, crie um arquivo chamado `.env`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### Passo 2: Preencher Valores

Substitua pelos valores copiados do Supabase:

- `VITE_SUPABASE_URL`: URL do projeto (ex: https://abcdefgh.supabase.co)
- `VITE_SUPABASE_ANON_KEY`: Chave anonima publica

**IMPORTANTE**: 
- NUNCA commite o arquivo `.env` no git
- O arquivo `.gitignore` ja deve ignorar arquivos `.env`

---

## Executando o Projeto

### Desenvolvimento

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto estara disponivel em `http://localhost:5173`

### Producao

```bash
# Gerar build de producao
npm run build

# Testar build localmente
npm run preview
```

---

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx       # Cabecalho com banner
│   ├── CategoryNav.tsx  # Navegacao por categorias
│   ├── ProductCard.tsx  # Card do produto
│   ├── ProductModal.tsx # Modal de detalhes
│   ├── CartSidebar.tsx  # Carrinho lateral
│   ├── CheckoutModal.tsx# Modal de checkout
│   └── admin/           # Componentes do admin
│       ├── AdminLayout.tsx
│       ├── ProductForm.tsx
│       └── ProductList.tsx
│
├── context/             # Contextos React
│   ├── CartContext.tsx  # Estado do carrinho
│   └── AuthContext.tsx  # Estado de autenticacao
│
├── data/                # Dados mock (para testes)
│   └── restaurant.ts
│
├── lib/                 # Configuracoes
│   └── supabase.ts      # Cliente Supabase
│
├── pages/               # Paginas
│   ├── Login.tsx        # Pagina de login
│   └── Admin.tsx        # Painel admin
│
├── services/            # Servicos de API
│   └── api.ts           # Funcoes de acesso ao banco
│
├── types/               # Tipos TypeScript
│   └── index.ts
│
├── utils/               # Utilitarios
│   ├── cep.ts           # Busca CEP e calculo frete
│   ├── whatsapp.ts      # Formatacao WhatsApp
│   └── image.ts         # Compressao de imagens
│
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
└── index.css            # Estilos globais

database/
├── schema.sql           # Estrutura do banco
└── seed.sql             # Dados iniciais
```

---

## Acessando o Admin

1. Acesse `/admin` no navegador (ex: http://localhost:5173/admin)
2. Faca login com o email e senha criados no Supabase
3. Voce tera acesso ao painel para:
   - Visualizar todos os produtos
   - Adicionar novos produtos
   - Editar produtos existentes
   - Excluir produtos
   - Fazer upload de imagens

---

## Dicas Importantes

### Performance de Imagens

- O sistema comprime automaticamente imagens antes do upload
- Tamanho maximo recomendado: 2MB (sera comprimido para ~500KB)
- Formatos aceitos: JPG, PNG, WebP
- Resolucao maxima: 1200x1200 pixels

### Seguranca

- Nunca exponha a `service_role key` do Supabase
- Use apenas a `anon key` no frontend
- As Row Level Security (RLS) policies protegem os dados
- Apenas usuarios autenticados podem modificar dados

### Backup

- O Supabase faz backups automaticos diarios (plano Pro)
- Para plano gratuito, exporte os dados manualmente periodicamente
- Use o SQL Editor para exportar dados importantes

---

## Suporte

Se tiver duvidas ou problemas:

1. Verifique se as credenciais do Supabase estao corretas
2. Confira se todas as tabelas foram criadas
3. Verifique se o bucket de storage foi configurado como publico
4. Confira os logs no painel do Supabase

---

## Licenca

Este projeto e um template e pode ser usado e modificado livremente.
