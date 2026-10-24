# Desenvolvimento do ARQ.LAB

Guia de estudo de Arquitetura de Sistemas feito com HTML, CSS e JavaScript. A aplicação usa módulos ES nativos, sem framework ou dependências de produção.

## Executar e verificar

Use Node.js 22 ou superior:

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000`. Como o JavaScript usa módulos ES, sirva o projeto por HTTP; abrir `index.html` diretamente por `file://` não é suportado.

```sh
npm test              # Testes de integração no DOM e funções de suporte
npm run format:check  # Verifica o padrão de formatação
npm run format        # Aplica a formatação
npm run build         # Copia os arquivos públicos para dist/
```

Prettier e jsdom são ferramentas de desenvolvimento. Os testes simulam o DOM, o diálogo e a rolagem; não substituem uma verificação visual em navegador real.

## Onde alterar

| Arquivo                                 | Responsabilidade                                            |
| --------------------------------------- | ----------------------------------------------------------- |
| `index.html`                            | Estrutura semântica e elementos estáticos                   |
| `styles.css`                            | Tokens de cores/fontes, componentes, temas e responsividade |
| `app.js`                                | Inicialização, composição dos módulos e eventos gerais      |
| `src/data/lessons.js`                   | Conteúdo das aulas e perguntas                              |
| `src/data/architectures.js`             | Estilos, mapas estruturais e fluxos animados                |
| `src/features/lessons.js`               | Navegação, cartões, conteúdo e conclusão das aulas          |
| `src/features/architecture-explorer.js` | Diagramas SVG, seleção de estilos e animação                |
| `src/features/quiz.js`                  | Perguntas, respostas, pontuação e revisão                   |
| `src/features/search.js`                | Busca no conteúdo e resultados                              |
| `src/shared/dom.js`                     | Seletores e alternância das páginas                         |
| `src/shared/progress.js`                | Leitura, validação e gravação do progresso                  |
| `src/shared/shuffle.js`                 | Embaralhamento sem modificar o conjunto original            |

Cada funcionalidade mantém seu estado dentro de uma função de criação. `app.js` conecta as funcionalidades por callbacks, evitando importações circulares. O explorador interrompe seu temporizador ao sair da visão geral e o reinicia ao voltar.

## Adicionar uma aula

Inclua um objeto em `baseLessons`, em `src/data/lessons.js`, com `title`, `short`, `summary`, `concepts`, `sections`, `practice` e `questions`. As seções são pares `[título, texto]`; as perguntas do conteúdo são `[enunciado, alternativas, índiceDaCorreta, explicação]`. A exportação converte perguntas em objetos com campos nomeados para o quiz.

Os complementos dos slides são associados às primeiras aulas pela posição. A navegação, os cartões, a busca, o progresso e o quiz derivam da lista exportada. Revise também os textos estáticos que mencionam a quantidade de aulas em `index.html`. O campo opcional `illustration: "clean-architecture"` habilita o desenho de camadas concêntricas na aula.

O progresso mantém a chave `arqlab-completed` e os índices das aulas já usados pelo site. Acrescente novas aulas ao final; reordenar ou remover aulas exige migrar esses índices para não atribuir conclusões a aulas diferentes. Dados inválidos são descartados. Se o armazenamento estiver bloqueado, o progresso funciona apenas durante a sessão.

## Adicionar um estilo arquitetural

Em `src/data/architectures.js`, acrescente entradas correspondentes em `styles` e `architectureMaps`, na mesma posição. Os mapas descrevem limites, nós e ligações em coordenadas SVG. Fluxos simples usam os pares de nome/descrição em `nodes`; os fluxos avançados usam `advancedFlows`, com nós identificados, arestas e etapas de animação. Ajuste a seleção desses fluxos em `architecture-explorer.js` ao criar um novo tipo.

O conteúdo é local e confiável, e seus templates usam `innerHTML`. Para carregar conteúdo externo, adote renderização por `textContent` ou sanitização adequada antes de inserir HTML. A consulta de busca já é exibida com `textContent`.

## Publicação

O workflow `.github/workflows/deploy-pages.yml` instala as ferramentas, verifica formatação, executa testes e gera `dist/` antes de publicar no GitHub Pages. O artefato contém somente HTML, CSS, o ponto de entrada e `src/`. Os caminhos são relativos para funcionar também em subdiretórios.
