# ARQ.LAB

Guia visual e interativo para estudar **Arquitetura de Sistemas**, com aulas em português, diagramas animados, quizzes e acompanhamento de progresso.

O projeto reúne conceitos e exemplos em uma aplicação estática feita com HTML, CSS e JavaScript, usando módulos ES nativos, sem framework ou dependências de produção.

## Recursos

- **13 aulas** com resumos, conceitos, explicações e atividades práticas.
- **Explorador de arquiteturas** com diagramas SVG e fluxos animados para visualizar a comunicação entre componentes.
- **Quizzes** gerais e por aula, com pontuação e revisão das respostas.
- **Busca de conteúdo**, com atalho `/` para focar o campo de pesquisa.
- **Progresso de estudo** salvo no navegador por meio de `localStorage`.
- **Interface responsiva** com alternância entre temas claro e escuro.

## Conteúdo de estudo

| Área                  | Temas                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------- |
| Fundamentos           | Introdução, pensamento arquitetural, modularização e características arquiteturais       |
| Componentes           | Pensamento Component-Based e fundamentos dos estilos arquiteturais                       |
| Estilos arquiteturais | Camadas, Pipeline, Microkernel, Service-Based, Event-Driven, Space-Based e Microservices |
| Decisões de projeto   | Escolhas, decisões, riscos e Clean Architecture                                          |

## Executar localmente

Requisitos: **Node.js 22 ou superior**, npm e Git para clonar o repositório.

```bash
git clone https://github.com/raphaelfontoura/unipds-arquitetura-de-sistemas-arq-lab.git
cd unipds-arquitetura-de-sistemas-arq-lab
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

> [!NOTE]
> A aplicação usa módulos JavaScript nativos e deve ser servida por HTTP. Abrir o `index.html` diretamente pelo sistema de arquivos (`file://`) não é suportado.

Para estudar, selecione uma aula, explore os exemplos, responda ao quiz e marque a aula como concluída. O progresso fica no navegador utilizado, sem sincronização entre dispositivos. Se o armazenamento estiver bloqueado, ele será mantido apenas durante a sessão.

## Comandos disponíveis

| Comando                | Finalidade                                               |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Inicia o servidor local na porta 3000                    |
| `npm test`             | Executa os testes com o runner nativo do Node.js e jsdom |
| `npm run format:check` | Verifica a formatação com Prettier                       |
| `npm run format`       | Aplica a formatação ao projeto                           |
| `npm run build`        | Gera os arquivos estáticos de publicação em `dist/`      |

Os testes cobrem a integração da interface, o armazenamento do progresso e as simulações dos fluxos arquiteturais.

## Estrutura do projeto

```text
.
├── index.html              # Estrutura da interface
├── styles.css              # Estilos, temas e responsividade
├── app.js                  # Inicialização e integração das funcionalidades
├── src/
│   ├── data/               # Aulas, arquiteturas e fluxos de simulação
│   ├── features/           # Navegação, explorador, quizzes e busca
│   └── shared/             # Utilitários de DOM, progresso e embaralhamento
├── scripts/                # Servidor local e geração do site estático
├── tests/                  # Testes automatizados
├── docs/                   # Documentação de desenvolvimento
└── .github/workflows/      # Automação de publicação
```

Consulte o [guia de desenvolvimento](docs/desenvolvimento.md) para entender a organização do código, adicionar aulas e ampliar os estilos arquiteturais.

## Publicação

O workflow [Publish to GitHub Pages](.github/workflows/deploy-pages.yml) está configurado para executar em pushes nas branches `main` e `master`, além de permitir execução manual.

O processo instala as dependências de desenvolvimento, verifica a formatação, executa os testes, gera `dist/` e publica o artefato no GitHub Pages. A pasta gerada contém apenas os arquivos públicos da aplicação: `index.html`, `styles.css`, `app.js` e `src/`.
