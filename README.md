# CarModelsApp

Aplicativo mobile simples para consulta de marcas e modelos de carros utilizando a API FIPE.

📄 [Acesse aqui o PDF com o desafio original](./desafio-mobile.pdf)

## ✅ Checklist do Desafio

- [x] Tela de **Login** com validação usando React Hook Form + Zod
- [x] Armazenamento de sessão via **AsyncStorage**
- [x] Gerenciamento de usuário autenticado com **Context API**
- [x] Redirecionamento automático com base na autenticação
- [x] Tela **Home** com listagem de marcas (FIPE)
- [x] Tela **Models** com listagem de modelos por marca
- [x] Navegação com **Expo Router** (substituindo React Navigation)
- [x] Estilo com **NativeWind + Tailwind CSS**
- [x] Comunicação com API FIPE e API de login usando **Axios**
- [x] **Toast** de feedback para erros e mensagens de status
- [x] Responsividade e uso de FlatList com pull-to-refresh
- [x] Código modular, componentizado, organizado e tipado
- [x] Aplicação utilizando **TypeScript**
- [x] Textos, commits e estrutura seguindo boas práticas
- [x] Sem uso de paginação (não exigido pelo desafio)

## Tecnologias Utilizadas

- **React Native + Expo**
- **Expo Router**
- **React Query**
- **React Hook Form + Zod**
- **Tailwind CSS + Nativewind**
- **Axios**
- **AsyncStorage**
- **Context API**
- **Lucide React Native**
- **Toast Message**

## Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. (Apenas para iOS/macOS) Instale os pods

```bash
npx pod-install
```

### 3. Inicie o servidor Expo

```bash
npm run start
```

### 4. Rode emulador Android

```bash
npm run android
```

### 5. Rode emulador iOS (macOS)

```bash
npm run ios
```

### 6. Rode no navegador (modo web)

```bash
npm run web
```

## Scripts disponíveis

- `npm run start` — inicia o servidor Expo
- `npm run android` — executa no emulador Android
- `npm run ios` — executa no simulador iOS
- `npm run lint` — roda o lint

## Estrutura do Projeto

```
/app
  ├── auth/       → telas públicas (login)
  ├── main/       → telas privadas (home, models)
  ├── _layout.tsx → controle de navegação por segmento
/assets           → fontes e imagens
/components       → componentes visuais reutilizáveis
/config           → configs como toasts
/contexts         → contexto de autenticação
/schemas          → validações Zod
/services         → chamadas HTTP e tipos de dados
```

---

📌 **Observações finais**:

O app atende 100% dos requisitos do desafio.

---
