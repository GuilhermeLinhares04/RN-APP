# React Native Product Management App

Um aplicativo mobile em React Native para gerenciamento e navegação de produtos, construído com Expo e seguindo as diretrizes do Material Design do Google.

## Vídeo de Demonstração

[Demonstração do App](https://youtu.be/0FNuISfKoJE)

## Funcionalidades

### Autenticação

* **Login/Cadastro**: Sistema seguro de autenticação com e-mail e senha
* **Recuperação de Senha**: Funcionalidade de redefinição de senha com OTP
* **Credenciais Padrão**:

  * E-mail: [test@example.com](mailto:test@example.com)
  * Senha: password

### Gerenciamento de Produtos

* **Navegação de Produtos**:

  * Lista de produtos com rolagem infinita
  * Funcionalidade de busca por produtos
  * Atualização por "puxar para atualizar"
  * Exibição bonita dos produtos em formato de cartão
* **Detalhes do Produto**:

  * Imagens de alta qualidade
  * Informações detalhadas do produto
  * Exibição de preço
  * Funcionalidade de favoritos/lista de desejos
  * Compartilhamento de produto com outras pessoas

### Câmera e Mídia

* **Fotos do Produto**:

  * Tirar fotos com a câmera do dispositivo
  * Escolher imagens da galeria
  * Recorte e edição de imagem
  * Upload de imagem em alta qualidade

### Perfil do Usuário

* **Gerenciamento de Perfil**:

  * Atualizar informações do usuário
  * Alterar foto de perfil
  * Logout seguro
* **Foto de Perfil**:

  * Enviar imagem da galeria
  * Tirar nova foto
  * Suporte a recorte de imagem

### Notificações

* **Notificações no App**:

  * Atualizações de notificações em tempo real
  * Marcar notificações como lidas
  * Excluir notificações
  * Histórico de notificações

## Implementação Técnica

### Fluxo de Autenticação

* Autenticação baseada em JWT
* Armazenamento seguro do token com AsyncStorage
* Atualização automática de token
* Rotas e telas protegidas

### Funcionalidades do Produto

* Integração com API paginada
* Carregamento de imagens otimizado
* Gerenciamento eficiente de estado
* Rolagem infinita suave
* Filtro de busca em tempo real

### Integração com Câmera

* Integração com módulo de câmera do Expo
* Seletor de imagem com suporte a recorte
* Gerenciamento de permissões
* Compressão de imagem otimizada

### Gerenciamento de Estado

* React Context para estado global
* Estado local para componentes de UI
* Cache eficiente de dados
* Renderizações otimizadas

## Pré-requisitos

* Node.js (versão 14 ou superior)
* npm ou yarn
* Expo CLI
* Android Studio (para desenvolvimento Android)
* Xcode (para desenvolvimento iOS, apenas no macOS)

## Instruções de Instalação

1. Clone o repositório:

```bash
git clone [repository-url]
cd RN-APP-RESERVE
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

4. Rode no seu dispositivo:

* Escaneie o QR code com o app Expo Go (Android) ou com o app de Câmera (iOS)
* Pressione 'a' para executar no emulador Android
* Pressione 'i' para executar no simulador iOS (somente macOS)

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes de UI reutilizáveis
  ├── screens/        # Telas do aplicativo
  ├── navigation/     # Configuração de navegação
  ├── services/       # API e outros serviços
  ├── utils/          # Funções auxiliares
  ├── hooks/          # Hooks personalizados do React
  ├── context/        # Provedores de Contexto do React
  └── types/          # Definições de tipos TypeScript
```

### Detalhes da Estrutura de Diretórios

#### `/src/components`

* `Button.tsx`: Componente de botão personalizado com estado de carregamento e variantes
* `Input.tsx`: Componente de entrada reutilizável com tratamento de erro e estilo

#### `/src/screens`

* `LoginScreen.tsx`: Tela de login com autenticação por e-mail/senha
* `SignupScreen.tsx`: Formulário de registro de novos usuários
* `ResetPasswordScreen.tsx`: Recuperação de senha com verificação por OTP
* `HomeScreen.tsx`: Listagem principal de produtos com busca e rolagem infinita
* `ProductDetailsScreen.tsx`: Visualização detalhada do produto com opções de compartilhamento
* `AddProductScreen.tsx`: Criação de produto com upload de imagem via câmera/galeria
* `ProfileScreen.tsx`: Gerenciamento do perfil do usuário e configurações
* `NotificationsScreen.tsx`: Central de notificações no app

#### `/src/context`

* `AuthContext.tsx`: Gerenciamento do estado de autenticação e da sessão do usuário

#### `/src/services`

* `api.ts`: Camada de serviço de API com dados e endpoints simulados

#### `/src/types`

* `index.ts`: Definições de tipos TypeScript para o aplicativo

#### `/src/navigation`

* `index.tsx`: Configuração de navegação e definição de rotas

## Tecnologias Utilizadas

* React Native
* Expo
* TypeScript
* React Navigation
* React Native Paper
* Faker.js
* AsyncStorage
* Expo Camera
* Expo Notifications
* Expo Image Picker
* Expo Sharing
