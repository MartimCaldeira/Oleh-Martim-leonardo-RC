# REST Countries Explorer

Aplicação web desenvolvida em React para explorar informações sobre países de todo o mundo, utilizando a API REST Countries. Este projeto foi desenvolvido como parte da Tarefa Final (M7).

## 🚀 Funcionalidades

*   **Pesquisa em Tempo Real:** Pesquisa de países por nome com *debounce* para otimização de pedidos.
*   **Filtragem e Ordenação:** Filtros por região e ordenação dinâmica por Nome, População ou Área (Ascendente/Descendente).
*   **Paginação:** Navegação eficiente entre resultados com controlo de itens por página.
*   **Persistência de Dados:** Os seus favoritos, filtros e preferências de ordenação são guardados automaticamente no `localStorage`.
*   **Design Neumórfico (Soft UI):** Interface moderna e limpa com suporte a **Modo Escuro**.
*   **Detalhes Completos:** Modal com informações detalhadas, incluindo bandeira, capital, moedas, línguas, vizinhos e link para o Google Maps.
*   **Fetch Robusto:** Tratamento de erros, estados de carregamento e cancelamento de pedidos anteriores (AbortController).

## 🛠️ Tecnologias Utilizadas

*   **React 19:** Biblioteca principal para construção da interface.
*   **TypeScript:** Para tipagem estática e maior segurança no código.
*   **Vite:** Build tool rápida e leve.
*   **Tailwind CSS 4:** Framework de utilitários CSS para estilização.
*   **Lucide React:** Biblioteca de ícones.
*   **Wouter:** Router leve para React.

## 📡 API Escolhida

**API:** [REST Countries v3.1](https://restcountries.com/)

**Endpoints Usados:**
*   `GET https://restcountries.com/v3.1/all`: Utilizado para obter a lista completa de países. A filtragem e ordenação são realizadas no cliente para garantir uma experiência de utilizador instantânea e cumprir os requisitos de manipulação de dados no frontend.

**Campos Extraídos (JSON):**
*   `name.common`, `name.official`: Nomes do país.
*   `flags.svg`, `flags.alt`: Imagens das bandeiras e texto alternativo.
*   `region`, `subregion`: Localização geográfica.
*   `population`: Dados demográficos.
*   `area`: Tamanho do território.
*   `capital`: Capital do país.
*   `currencies`: Informação sobre moeda.
*   `languages`: Línguas faladas.
*   `borders`: Códigos dos países vizinhos.
*   `maps.googleMaps`: Link direto para o mapa.
*   `cca3`: Código único de 3 letras (usado como chave e para favoritos).

## 📂 Estrutura do Projeto

```
rest-countries-explorer/
├── client/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis (Header, Card, Modal, etc.)
│   │   ├── hooks/          # Custom Hooks (useCountries, useDebounce, useLocalStorage)
│   │   ├── types/          # Definições de tipos TypeScript
│   │   ├── pages/          # Componentes de página (Home)
│   │   ├── contexts/       # Contextos React (ThemeContext)
│   │   ├── lib/            # Utilitários
│   │   ├── App.tsx         # Componente raiz e rotas
│   │   └── index.css       # Estilos globais e variáveis CSS
│   └── index.html          # Ponto de entrada HTML
├── server/                 # Servidor simples para servir a app (se necessário)
├── package.json            # Dependências e scripts
└── README.md               # Documentação do projeto
```

## 🔧 Como Correr em Desenvolvimento

1.  **Instalar Dependências:**
    ```bash
    pnpm install
    ```

2.  **Iniciar Servidor de Desenvolvimento:**
    ```bash
    pnpm dev
    ```
    A aplicação ficará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

    > **Nota sobre Proxy:** O Vite está configurado para lidar com CORS se necessário, mas a API REST Countries suporta CORS nativamente, permitindo pedidos diretos do browser.

3.  **Build para Produção:**
    ```bash
    pnpm build
    ```

## 💾 Persistência e Testes

**Persistência:**
A aplicação utiliza o `localStorage` do browser para persistir:
*   Lista de países favoritos (`favorites`).
*   Última região filtrada (`lastRegion`).
*   Preferências de ordenação (`lastSortField`, `lastSortOrder`).

**Como Testar a Persistência:**
1.  Adicione alguns países aos favoritos (clique no coração).
2.  Altere o filtro de região e a ordenação.
3.  Recarregue a página (F5).
4.  Verifique que os favoritos continuam marcados e os filtros/ordenação mantêm-se selecionados.

## 📝 Decisões Técnicas

*   **Filtragem no Cliente:** Optou-se por carregar todos os dados (`/all`) e filtrar no cliente. Dado que o payload total é razoável (~250 países), isto permite uma pesquisa e ordenação instantâneas sem latência de rede a cada interação.
*   **AbortController:** Implementado no hook `useCountries` para cancelar pedidos pendentes se o componente for desmontado ou se um novo pedido for iniciado rapidamente, evitando "race conditions".
*   **Neumorfismo:** O estilo visual foi escolhido para demonstrar capacidade de personalização avançada com Tailwind CSS, fugindo ao design "Material" ou "Flat" padrão.
