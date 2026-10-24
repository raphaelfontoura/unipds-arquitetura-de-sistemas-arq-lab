const baseLessons = [
  {
    title: "Introdução à Arquitetura de Sistemas",
    short: "Introdução",
    summary:
      "Arquitetura como estrutura, características e decisões que equilibram tecnologia e negócio.",
    concepts: [
      "Estrutura",
      "Características arquiteturais",
      "Decisões",
      "Trade-off",
      "Drivers de negócio",
    ],
    sections: [
      [
        "Três eixos para pensar arquitetura",
        "A estrutura responde como os componentes se organizam; as características mostram como o sistema precisa se comportar; e as decisões estabelecem princípios, restrições e regras que orientam a construção.",
      ],
      [
        "O papel do arquiteto contemporâneo",
        "Além da tecnologia, arquitetura envolve negócio, comunicação, liderança e colaboração com quem implementa. Princípios como baixo acoplamento e alta coesão orientam as escolhas, mas não são regras absolutas: exceções precisam ser justificadas.",
      ],
      [
        "Duas leis fundamentais",
        "Toda decisão melhora algo e custa algo: tudo é trade-off. Registrar o porquê da decisão ajuda equipes futuras a entender o contexto, revisar premissas e evoluir o sistema.",
      ],
    ],
    practice: [
      "Escolha um sistema conhecido e descreva componentes, características e decisões.",
      "Registre duas decisões de alto nível e por que foram tomadas.",
      "Identifique um trade-off aceito e outro possivelmente ignorado.",
    ],
    questions: [
      [
        "Quais são os três eixos usados para organizar o entendimento de arquitetura?",
        [
          "Estrutura, características e decisões",
          "Banco, interface e rede",
          "Código, testes e deploy",
        ],
        0,
        "A aula organiza arquitetura nos eixos de estrutura, características arquiteturais e decisões.",
      ],
      [
        "Por que uma regra arquitetural pode admitir exceções?",
        [
          "Porque princípios orientam; exceções controladas podem ser justificadas e documentadas",
          "Porque regras não são úteis",
          "Para qualquer pessoa ignorar a arquitetura",
        ],
        0,
        "Exceções podem ser necessárias, desde que controladas, justificadas e analisadas.",
      ],
      [
        "Qual das leis fundamentais reforça o registro de decisões?",
        [
          "O porquê importa mais do que o como",
          "Toda arquitetura deve ser distribuída",
          "Toda decisão pode ser revertida sem custo",
        ],
        0,
        "Preservar o motivo da escolha permite compreender e revisar decisões no futuro.",
      ],
    ],
  },
  {
    title: "Pensamento Arquitetural",
    short: "Pensamento arquitetural",
    summary:
      "Visão sistêmica, colaboração e decisões guiadas por contexto, trade-offs e drivers de negócio.",
    concepts: [
      "Visão sistêmica",
      "Drivers",
      "Trade-offs",
      "Pub/Sub",
      "Maturidade do time",
    ],
    sections: [
      [
        "Visão sistêmica e colaboração",
        "Pensar arquiteturalmente é considerar impactos em outras partes do sistema, equipes e negócio. Arquitetura e implementação evoluem juntas: o arquiteto participa, escuta e ajuda sem se tornar gargalo.",
      ],
      [
        "Decidir a partir do contexto",
        "Não existe alternativa universal. REST pode ser simples e rápido, mas acopla temporalmente; mensageria pode aumentar resiliência e escala, mas traz complexidade. A escolha depende de latência, segurança, prazo, orçamento e maturidade da equipe.",
      ],
      [
        "Drivers de negócio",
        "Necessidades como disponibilidade, regulamentação e crescimento devem ser traduzidas em consequências técnicas verificáveis: redundância, criptografia, auditoria ou elasticidade.",
      ],
    ],
    practice: [
      "Reavalie uma decisão considerando simplicidade, latência, acoplamento, escala, maturidade, prazo e orçamento.",
      "Monte uma pirâmide do conhecimento: sei, sei que não sei e preciso descobrir.",
      "Converta um driver de negócio em uma consequência técnica concreta.",
    ],
    questions: [
      [
        "O que diferencia uma decisão arquitetural de uma decisão local?",
        [
          "Ela pode impactar o sistema, outras equipes e o negócio",
          "Ela só altera uma variável",
          "Ela é sempre uma escolha de tecnologia",
        ],
        0,
        "A decisão arquitetural tem consequências sistêmicas, não apenas locais.",
      ],
      [
        "Por que “depende” pode ser uma resposta madura?",
        [
          "Porque convida a avaliar critérios e contexto antes de escolher",
          "Porque evita tomar decisões",
          "Porque toda tecnologia é equivalente",
        ],
        0,
        "O “depende” é útil quando acompanhado de critérios como latência, custo e maturidade.",
      ],
      [
        "Como a maturidade do time pode mudar uma escolha?",
        [
          "Uma alternativa adequada tecnicamente pode ser inviável se o time não consegue operá-la",
          "Maturidade não influencia arquitetura",
          "Times iniciantes sempre devem usar microservices",
        ],
        0,
        "Capacidade operacional e conhecimento do time fazem parte do contexto da decisão.",
      ],
    ],
  },
  {
    title: "Modularização",
    short: "Modularização",
    summary:
      "Coesão, acoplamento, métricas e fronteiras que tornam módulos mais autônomos e evolutivos.",
    concepts: [
      "Coesão",
      "Acoplamento",
      "CA / CE",
      "Abstractness",
      "Instability",
      "Connascence",
    ],
    sections: [
      [
        "Módulos e coesão",
        "Um módulo agrupa código relacionado a um propósito. Alta coesão indica que seus elementos pertencem ao mesmo contexto funcional; baixa coesão pode indicar responsabilidades que deveriam ser separadas.",
      ],
      [
        "Acoplamento e métricas",
        "CA conta quantos módulos externos dependem deste; CE conta de quantos módulos este depende. Instability é CE / (CE + CA), variando de estável (0) a instável (1). Abstractness mede a proporção de abstrações e interfaces.",
      ],
      [
        "Connascence",
        "Componentes são conascentes quando uma mudança em um exige mudança em outro. Busque dependências fracas, locais e com baixo grau: reduza connascence global e concentre relações necessárias dentro de módulos encapsulados.",
      ],
    ],
    practice: [
      "Identifique responsabilidades que parecem pertencer a contextos diferentes em um módulo.",
      "Mapeie dependências aferentes e eferentes entre componentes.",
      "Esboce Abstractness × Instability e discuta como aproximar o módulo da Main Sequence.",
    ],
    questions: [
      [
        "Qual a diferença entre coesão e acoplamento?",
        [
          "Coesão mede relação interna; acoplamento, dependências entre módulos",
          "São sinônimos para dependência externa",
          "Coesão mede deploy e acoplamento mede latência",
        ],
        0,
        "Coesão observa o quanto os elementos de um módulo se relacionam; acoplamento, dependências externas.",
      ],
      [
        "Como se calcula Instability no material?",
        ["CE / (CE + CA)", "CA / (CA + CE)", "Abstractness / CE"],
        0,
        "A fórmula é CE dividido pela soma de CE e CA.",
      ],
      [
        "O que significa aumentar connascence local?",
        [
          "Manter dependências relacionadas dentro de módulos encapsulados",
          "Criar dependências entre todos os módulos",
          "Duplicar toda a lógica do sistema",
        ],
        0,
        "Connascence local concentra relações dentro de uma fronteira, reduzindo impacto global.",
      ],
    ],
  },
  {
    title: "Características Arquiteturais",
    short: "Características",
    summary:
      "Atributos de qualidade, priorização e métricas verificáveis para guiar o desenho da solução.",
    concepts: [
      "Atributos de qualidade",
      "Desempenho",
      "Disponibilidade",
      "Escalabilidade",
      "Segurança",
    ],
    sections: [
      [
        "Funcionalidade e qualidade",
        "Requisitos funcionais descrevem o que o sistema faz. Características arquiteturais descrevem como ele se comporta, como desempenho, disponibilidade e segurança. São críticas e influenciam a estrutura.",
      ],
      [
        "Três grupos de características",
        "Operacionais: desempenho, disponibilidade, confiabilidade. Estruturais: modularidade, extensibilidade, portabilidade. Transversais: segurança, privacidade, compliance, acessibilidade e usabilidade.",
      ],
      [
        "Priorizar e medir",
        "Maximizar todos os atributos aumenta complexidade e conflito. Priorize as 3 a 5 características mais críticas e traduza adjetivos em métricas: por exemplo, “200 ms por requisição” em vez de “rápido”.",
      ],
    ],
    practice: [
      "Liste cinco características para um produto e reduza às três críticas.",
      "Defina uma métrica verificável para cada prioridade.",
      "Registre conflito entre atributos e a prioridade do negócio.",
    ],
    questions: [
      [
        "Quais três critérios definem uma característica arquitetural?",
        [
          "Fora do domínio do negócio, influencia estrutura e é crítica ao sucesso",
          "É pedida pelo usuário, fácil e barata",
          "Usa tecnologia moderna, nuvem e banco relacional",
        ],
        0,
        "Ela deve estar fora do domínio do negócio, influenciar a estrutura e ser crítica para o sucesso.",
      ],
      [
        "Por que não maximizar todos os atributos?",
        [
          "Porque atributos competem e cada um adiciona complexidade",
          "Porque atributos não podem ser medidos",
          "Porque o negócio não tem requisitos",
        ],
        0,
        "Atributos podem entrar em conflito e elevar custo e complexidade.",
      ],
      [
        "Qual é uma métrica verificável de performance?",
        [
          "Tempo máximo de 200 ms por requisição",
          "O sistema deve ser rápido",
          "Experiência agradável",
        ],
        0,
        "Uma meta numérica é verificável; “rápido” é ambíguo.",
      ],
    ],
  },
  {
    title: "Pensamento Component-Based",
    short: "Component-Based",
    summary:
      "Descoberta e refinamento de componentes por responsabilidades, domínio e granularidade.",
    concepts: [
      "Módulo × componente",
      "Particionamento por domínio",
      "Granularidade",
      "Entity Trap",
      "Event Storming",
    ],
    sections: [
      [
        "Módulos e componentes",
        "Módulo é um agrupamento lógico de código; componente é sua manifestação física implantável, como um JAR, plugin, subsistema ou serviço.",
      ],
      [
        "Particionamento",
        "Camadas separam responsabilidades técnicas; domínio organiza capacidades de negócio, favorecendo coesão por domínio. A descoberta é iterativa: componentes iniciais, requisitos, responsabilidades, características e refinamento.",
      ],
      [
        "Granularidade e Entity Trap",
        "Componentes muito pequenos aumentam comunicação e latência; muito grandes dificultam isolamento e deploy. Evite transformar cada tabela em componente: derive fronteiras das funcionalidades e fluxos reais do negócio.",
      ],
    ],
    practice: [
      "Desenhe decomposições por camadas e por capacidades de negócio.",
      "Aplique o fluxo de descoberta, do componente inicial ao refinamento.",
      "Procure uma Entity Trap e redesenhe a fronteira pelo fluxo de negócio.",
    ],
    questions: [
      [
        "Qual a diferença entre módulo e componente?",
        [
          "Módulo é agrupamento lógico; componente é manifestação física implantável",
          "Componente é sempre menor que uma classe",
          "Módulo é banco e componente é API",
        ],
        0,
        "O componente materializa fisicamente o módulo e pode ser implantado.",
      ],
      [
        "Quando o particionamento por domínio favorece distribuição futura?",
        [
          "Quando cria fronteiras coesas em capacidades de negócio",
          "Quando cada tabela vira um serviço",
          "Quando todos os domínios compartilham o mesmo código",
        ],
        0,
        "Fronteiras orientadas ao domínio podem facilitar a evolução e futura distribuição.",
      ],
      [
        "O que é Entity Trap?",
        [
          "Transformar cada entidade ou tabela do banco em um componente",
          "Usar eventos para comunicar serviços",
          "Criar componentes muito grandes",
        ],
        0,
        "Isso ignora fluxos de negócio e pode prejudicar coesão e manutenção.",
      ],
    ],
  },
  {
    title: "Fundamentos de Estilos Arquiteturais",
    short: "Fundamentos de estilos",
    summary:
      "Vocabulário dos estilos, monólitos e distribuição; falhas de rede e transações distribuídas.",
    concepts: [
      "Estilo arquitetural",
      "Client-Server",
      "Three-Tier",
      "Monólito",
      "Distribuição",
      "Saga",
    ],
    sections: [
      [
        "Estilos como linguagem compartilhada",
        "Um estilo comunica organização, interação, benefícios e trade-offs esperados. O antipattern Big Ball of Mud não possui estrutura discernível e torna cada mudança arriscada.",
      ],
      [
        "Monólito e distribuição",
        "Monólito reúne o deploy e usa chamadas locais; distribuição separa componentes e comunica pela rede. Distribuir facilita escala e deploy independente, mas introduz latência, falhas, segurança e observabilidade.",
      ],
      [
        "Operação distribuída",
        "Não presuma rede confiável, latência zero ou banda infinita. Transações distribuídas podem usar consistência eventual ou Saga, em que etapas de compensação desfazem efeitos anteriores quando uma etapa falha.",
      ],
    ],
    practice: [
      "Classifique um sistema como monolítico, distribuído ou híbrido.",
      "Relacione pressupostos de rede a mecanismos para lidar com falhas.",
      "Modele uma transação distribuída e indique compensações necessárias.",
    ],
    questions: [
      [
        "O que uma chamada local que vira chamada de rede introduz?",
        [
          "Latência, falhas e necessidade de lidar com disponibilidade remota",
          "Garantia de execução instantânea",
          "Uma transação ACID automática",
        ],
        0,
        "Chamadas remotas atravessam uma rede sujeita a latência e falhas.",
      ],
      [
        "Qual é o papel de uma Saga?",
        [
          "Coordenar etapas e compensações em uma transação distribuída",
          "Garantir latência zero",
          "Compartilhar o banco entre todos os serviços",
        ],
        0,
        "A Saga permite executar etapas e compensar operações anteriores caso haja falha.",
      ],
      [
        "O que descreve um Big Ball of Mud?",
        [
          "Sistema sem arquitetura discernível e com dependências desorganizadas",
          "Um monólito modular com fronteiras claras",
          "Um pipeline de filtros independentes",
        ],
        0,
        "A “bola de lama” não tem estrutura identificável e possui acoplamento descontrolado.",
      ],
    ],
  },
  {
    title: "Arquitetura em Camadas e Pipeline",
    short: "Camadas e Pipeline",
    summary:
      "Responsabilidades em níveis e processamento sequencial por filtros independentes.",
    concepts: [
      "Layered Architecture",
      "Closed / Open Layers",
      "Sinkhole",
      "Pipes and Filters",
      "Producer / Consumer",
    ],
    sections: [
      [
        "Arquitetura em camadas",
        "Apresentação, negócio, persistência e banco de dados separam responsabilidades. Camadas fechadas acessam apenas a camada inferior; camadas abertas permitem acesso a qualquer camada inferior, com possível custo de acoplamento.",
      ],
      [
        "Sinkhole",
        "Ocorre quando a requisição atravessa camadas que não agregam valor, apenas adicionando overhead. Pode ser sinal para simplificar ou repensar o desenho.",
      ],
      [
        "Pipeline / Pipes and Filters",
        "Dados fluem em uma direção por filtros independentes conectados por pipes. Producer inicia; transformer transforma; tester avalia/roteia; consumer consome. O fluxo é simples e reutilizável, mas pode ser sequencial.",
      ],
    ],
    practice: [
      "Desenhe camadas e indique quais são abertas ou fechadas.",
      "Modele pipeline com quatro filtros e registre cada transformação.",
      "Identifique um sinkhole possível e simplifique o fluxo.",
    ],
    questions: [
      [
        "Como se distingue camada fechada de aberta?",
        [
          "Fechada acessa só a inferior imediata; aberta pode acessar qualquer inferior",
          "Fechada não se comunica; aberta comunica pela internet",
          "Aberta só existe em microservices",
        ],
        0,
        "Camadas fechadas preservam a sequência; abertas permitem acessar camadas inferiores mais distantes.",
      ],
      [
        "O que caracteriza um sinkhole?",
        [
          "Camadas atravessadas sem agregar valor",
          "Filtro que transforma os dados",
          "Acesso direto ao banco por performance",
        ],
        0,
        "O sinkhole adiciona overhead em etapas sem processamento útil.",
      ],
      [
        "Qual fluxo representa Pipes and Filters?",
        [
          "Producer → filters → consumer",
          "Cliente → eventos → múltiplos tópicos",
          "Core → plugins",
        ],
        0,
        "O pipeline é unidirecional e conecta producer, filtros e consumer.",
      ],
    ],
  },
  {
    title: "Arquitetura Microkernel e Service-Based",
    short: "Microkernel e Service-Based",
    summary:
      "Core extensível por plugins e serviços amplos como evolução intermediária à distribuição.",
    concepts: [
      "Core",
      "Plugin",
      "Contratos",
      "Service-Based",
      "Banco compartilhado",
      "API Gateway",
    ],
    sections: [
      [
        "Microkernel: core e plugins",
        "O core mantém funções estáveis e básicas; funcionalidades específicas e voláteis viram plugins conectados por contratos. Isso facilita extensão sem alterar o núcleo, mas exige gerir compatibilidade e versões.",
      ],
      [
        "Service-Based",
        "Serviços mais amplos representam domínios e normalmente compartilham um banco. O banco simplifica consistência, mas limita autonomia e exige coordenação em mudanças.",
      ],
      [
        "Uma etapa de evolução",
        "Service-Based pode mediar a evolução entre monólito e microservices, distribuindo responsabilidades sem fragmentar em muitos serviços e bancos independentes.",
      ],
    ],
    practice: [
      "Separe funções estáveis do core e extensões candidatas a plugins.",
      "Modele três serviços e um banco compartilhado, marcando fronteiras.",
      "Explique que requisito justificaria migrar para microservices.",
    ],
    questions: [
      [
        "O que tende a permanecer no core?",
        [
          "Funcionalidades estáveis e fundamentais",
          "Toda funcionalidade volátil e específica",
          "Somente o banco de dados",
        ],
        0,
        "O core concentra o que é estável; extensões mais voláteis tendem a virar plugins.",
      ],
      [
        "Por que banco compartilhado simplifica e limita?",
        [
          "Facilita consistência, mas cria acoplamento de dados e coordenação",
          "Elimina qualquer coordenação",
          "Torna cada serviço totalmente autônomo",
        ],
        0,
        "A base comum facilita consistência, mas reduz independência entre serviços.",
      ],
      [
        "Como Service-Based pode ajudar na evolução?",
        [
          "Como etapa intermediária entre monólito e microservices",
          "Como substituto obrigatório de qualquer monólito",
          "Como arquitetura sem serviços",
        ],
        0,
        "Distribui responsabilidades com granularidade mais ampla e menor fragmentação.",
      ],
    ],
  },
  {
    title: "Arquitetura Event-Driven",
    short: "Event-Driven",
    summary:
      "Produtores, eventos e consumidores desacoplados; pub/sub, CQRS e consistência eventual.",
    concepts: [
      "Evento",
      "Producer / Consumer",
      "Event bus",
      "Pub/Sub",
      "Event Sourcing",
      "CQRS",
    ],
    sections: [
      [
        "Evento como comunicação",
        "O produtor emite que algo aconteceu sem conhecer consumidores. Um barramento transmite ou armazena o evento, e consumidores reagem de forma independente, mesmo depois.",
      ],
      [
        "Conteúdo dos eventos",
        "Event notification carrega uma notificação mínima, podendo exigir consultas adicionais. Event-carried state transfer inclui dados para dar autonomia ao consumidor, aumentando volume e necessidade de versionamento.",
      ],
      [
        "Benefícios e cuidados",
        "Pub/sub facilita novos consumidores; event sourcing registra mudanças como eventos; CQRS separa leitura e escrita. Assincronia pede observabilidade, contratos versionados e aceitação de consistência eventual.",
      ],
    ],
    practice: [
      "Modele “pagamento confirmado” com três consumidores independentes.",
      "Compare o mesmo evento mínimo e enriquecido.",
      "Liste sinais de observabilidade para rastrear falhas assíncronas.",
    ],
    questions: [
      [
        "O que reduz o acoplamento temporal?",
        [
          "O barramento armazena o evento para consumo posterior",
          "Todos os consumidores precisam responder juntos",
          "O produtor chama cada consumidor por REST",
        ],
        0,
        "Produtor e consumidor não precisam estar disponíveis ao mesmo tempo.",
      ],
      [
        "Qual é o trade-off entre notification e state transfer?",
        [
          "Menos dados podem exigir consultas; mais estado aumenta autonomia e volume",
          "Notification sempre é mais rápida e segura",
          "State transfer elimina versionamento",
        ],
        0,
        "Eventos mínimos exigem consultas; eventos enriquecidos aumentam autonomia e volume.",
      ],
      [
        "Por que observabilidade é central?",
        [
          "Fluxos assíncronos e distribuídos dificultam rastrear ações e falhas",
          "Eventos não podem falhar",
          "Consumidores compartilham um único processo",
        ],
        0,
        "O processamento assíncrono exige rastrear o percurso entre produtores e consumidores.",
      ],
    ],
  },
  {
    title: "Arquitetura Space-Based",
    short: "Space-Based",
    summary:
      "Processing Units, dados em memória, replicação e persistência assíncrona para cargas extremas.",
    concepts: [
      "Processing Unit",
      "In-Memory Data Grid",
      "Replication Engine",
      "Data Pump",
      "Consistência eventual",
    ],
    sections: [
      [
        "Processing Units",
        "Unidades autônomas e replicáveis concentram lógica e estado em memória. Assim, o banco sai do caminho crítico e deixa de ser consultado em cada transação.",
      ],
      [
        "Replicação e persistência",
        "Data Replication Engine sincroniza unidades; Data Reader carrega dados e Data Writer/Data Pump persiste alterações em segundo plano. Outras unidades podem continuar diante da falha de uma PU.",
      ],
      [
        "Consistência e complexidade",
        "A persistência assíncrona implica consistência eventual. É preciso aceitar divergências temporárias e operar mecanismos de sincronização, cache, distribuição e monitoramento.",
      ],
    ],
    practice: [
      "Desenhe duas PUs replicadas com Data Grid e persistência assíncrona.",
      "Escolha dados que precisem estar em memória e a tolerância de consistência.",
      "Liste infraestrutura que precisa ser monitorada.",
    ],
    questions: [
      [
        "Como o banco sai do caminho crítico?",
        [
          "A lógica opera com estado em memória nas Processing Units",
          "Cada requisição faz duas consultas síncronas ao banco",
          "O banco é replicado para cada usuário",
        ],
        0,
        "O processamento principal ocorre em memória e a escrita no banco é assíncrona.",
      ],
      [
        "Qual é o papel do Data Pump?",
        [
          "Persistir alterações em segundo plano",
          "Distribuir interfaces para o usuário",
          "Bloquear requisições até o banco confirmar",
        ],
        0,
        "O Data Pump leva alterações em memória ao banco fora do caminho crítico.",
      ],
      [
        "Por que surge consistência eventual?",
        [
          "Porque a persistência e propagação são assíncronas",
          "Porque os dados nunca são persistidos",
          "Porque há apenas uma Processing Unit",
        ],
        0,
        "Os dados chegam ao banco e às demais unidades após o processamento principal.",
      ],
    ],
  },
  {
    title: "Arquitetura de Microservices",
    short: "Microservices",
    summary:
      "Serviços autônomos por domínio, bancos independentes, resiliência e maturidade operacional.",
    concepts: [
      "Autonomia",
      "Banco por serviço",
      "REST / gRPC",
      "Mensageria",
      "Observabilidade",
      "Circuit Breaker",
    ],
    sections: [
      [
        "Autonomia por domínio",
        "Cada microservice atende responsabilidades coesas e gerencia seu estado e banco. Outros serviços acessam esses dados por API ou eventos, não diretamente ao banco alheio.",
      ],
      [
        "Comunicação e resiliência",
        "REST é síncrono e simples, mas depende da disponibilidade do destino. Mensageria reduz acoplamento temporal, com maior complexidade operacional. Timeouts, retries limitados, circuit breakers e fallbacks ajudam a conter falhas.",
      ],
      [
        "Operar o estilo",
        "Deploy e escala independentes exigem automação, logging estruturado, tracing e métricas. Microservices fazem sentido para domínios e times autônomos com maturidade de engenharia adequada.",
      ],
    ],
    practice: [
      "Proponha três domínios com microservices e bancos independentes.",
      "Compare REST e evento para uma interação entre serviços.",
      "Defina observabilidade mínima com logs, tracing e métricas.",
    ],
    questions: [
      [
        "Por que um microservice deve gerenciar o próprio estado?",
        [
          "Para preservar autonomia e reduzir acoplamento entre domínios",
          "Para compartilhar tabelas entre serviços",
          "Para evitar qualquer comunicação",
        ],
        0,
        "O estado próprio reduz dependências diretas e permite evolução autônoma.",
      ],
      [
        "Qual diferença entre REST e mensageria assíncrona?",
        [
          "REST é síncrono e depende da disponibilidade do destino; mensageria desacopla temporalmente",
          "REST sempre é assíncrono",
          "Mensageria elimina a necessidade de monitoramento",
        ],
        0,
        "A chamada síncrona aguarda o serviço; mensagens podem ser processadas depois.",
      ],
      [
        "O que deve existir antes de microservices em larga escala?",
        [
          "Automação, observabilidade, resiliência e maturidade de engenharia",
          "Somente mais servidores",
          "Uma equipe sem experiência distribuída",
        ],
        0,
        "O estilo eleva a complexidade operacional e depende de capacidades de engenharia.",
      ],
    ],
  },
  {
    title: "Escolhas, Decisões e Riscos",
    short: "Decisões e riscos",
    summary:
      "Partir do problema, comparar alternativas, documentar decisões (ADR) e gerenciar riscos.",
    concepts: [
      "Contexto",
      "Alternativas",
      "Trade-off",
      "ADR",
      "Risco",
      "Valor de negócio",
    ],
    sections: [
      [
        "Comece pelo problema",
        "Toda arquitetura nasce de uma necessidade concreta, não de uma tecnologia da moda. Identifique dor, requisitos, domínio, cultura, restrições e capacidade das equipes antes de escolher.",
      ],
      [
        "Documentar para sustentar",
        "Um ADR curto preserva contexto, alternativas, decisão e consequências. O registro ajuda equipes futuras a entender os motivos e revisar a escolha quando o contexto mudar.",
      ],
      [
        "Gerenciar riscos e entregar valor",
        "Riscos técnicos, organizacionais e de negócio não desaparecem; são identificados e mitigados por testes, POCs, automação e evolução incremental. Arquitetura é um meio para entregar valor ao cliente.",
      ],
    ],
    practice: [
      "Escreva um ADR curto com contexto, alternativas, decisão e consequências.",
      "Liste riscos técnicos, organizacionais e de negócio associados.",
      "Defina uma hipótese validável por POC, teste ou experimento.",
    ],
    questions: [
      [
        "O que deve vir antes de uma decisão tecnológica?",
        [
          "Um problema concreto e seu contexto",
          "A escolha de uma ferramenta popular",
          "A implementação de um protótipo sem hipótese",
        ],
        0,
        "A decisão deve responder a uma necessidade real de negócio ou engenharia.",
      ],
      [
        "O que um ADR deve preservar?",
        [
          "Contexto, alternativas, decisão e consequências",
          "Apenas o código implementado",
          "Somente a lista de tecnologias",
        ],
        0,
        "Esses campos registram por que a decisão fazia sentido e quais efeitos foram aceitos.",
      ],
      [
        "O que significa gerenciar riscos?",
        [
          "Identificar e mitigar os mais relevantes, sem fingir que podem ser eliminados",
          "Ignorar riscos difíceis de medir",
          "Garantir que nada falhará",
        ],
        0,
        "Riscos fazem parte das decisões; o papel é torná-los explícitos e reduzir seu impacto.",
      ],
    ],
  },

  {
    title: "Clean Architecture",
    illustration: "clean-architecture",
    short: "Clean Architecture",
    summary:
      "Organize o código ao redor do domínio: políticas no núcleo, detalhes técnicos nas bordas e dependências apontando para dentro.",
    concepts: [
      "Entities",
      "Use Cases",
      "Interface Adapters",
      "Frameworks & Drivers",
      "Dependency Rule",
      "DIP / IoC",
      "Ports & Adapters",
    ],
    sections: [
      [
        "Por que Clean Architecture?",
        "Proposta por Robert C. Martin, a Clean Architecture reúne ideias de arquiteturas como Hexagonal (Ports & Adapters) para manter regras de negócio independentes de UI, banco de dados, frameworks e serviços externos. O objetivo é facilitar teste, manutenção e evolução, preservando o domínio como centro do desenho.",
      ],
      [
        "Quatro camadas concêntricas",
        "Entities são as regras corporativas mais gerais e estáveis. Use Cases orquestram entidades para realizar objetivos específicos da aplicação. Interface Adapters convertem dados e chamadas entre o formato interno e interfaces externas. Frameworks & Drivers reúne mecanismos periféricos: framework web, banco, dispositivos, configuração e inicialização.",
      ],
      [
        "Dependency Rule: dependências apontam para dentro",
        "Código interno não referencia nomes definidos nas camadas externas. Um Controller pode chamar um Use Case em tempo de execução, mas o núcleo não importa o Controller, o framework ou o tipo do banco. Dados que cruzam fronteiras devem ser simples e adequados ao lado interno — não passe, por exemplo, um ResultSet JDBC para a regra de negócio.",
      ],
      [
        "DIP, portas, adaptadores e IoC",
        "Quando um caso de uso precisa persistir algo, ele declara uma interface (porta de saída) orientada à intenção, como PedidoRepository. O adaptador de persistência externo implementa essa abstração e traduz domínio para SQL. Injeção de dependência ou o ponto de composição (main) fornece a implementação concreta. O fluxo de controle pode seguir para fora, enquanto a dependência de código continua apontando para dentro.",
      ],
      [
        "Frameworks e banco são detalhes",
        "Uma estrutura que “grita” Spring ou ORM, em vez de revelar casos de uso, pode indicar arquitetura framework-centric. Da mesma forma, começar pelo esquema do banco e espalhar tipos/consultas pelas regras sugere database-centric. Mantenha framework, SQL e configuração nos adaptadores e na borda externa; adie essas decisões quando possível.",
      ],
      [
        "Testabilidade, evolução e custo",
        "Entities e Use Cases podem ser testados sem servidor, UI ou banco real, usando fakes para portas. Isso reduz fragilidade e facilita TDD. Trocar framework, interface ou banco tende a exigir mudanças nos adaptadores, não nas políticas centrais. Há custo inicial em interfaces e disciplina: a abordagem é mais valiosa quando a longevidade e evolução justificam essa estrutura.",
      ],
      [
        "Como se relaciona a outros estilos",
        "Clean Architecture define organização interna do código; microservices definem separação de serviços e implantação. É possível usar Clean Architecture dentro de cada serviço, ou em módulos de um monólito. Fronteiras bem definidas podem facilitar uma extração futura, mas não tornam microservices obrigatórios.",
      ],
    ],
    practice: [
      "Modele “Criar Empréstimo”: Entity com regras de juros, Use Case que valida e orquestra, e uma porta de persistência.",
      "Desenhe um adaptador SQL que implementa a porta e um fake em memória para os testes.",
      "Trace duas setas: o fluxo de execução Controller → Use Case → porta/adaptador e as dependências de código apontando para dentro.",
      "Avalie um projeto: ele revela o domínio ou o framework/banco? Identifique uma mudança que deveria ficar restrita à borda.",
    ],
    questions: [
      [
        "Qual regra define a direção das dependências de código?",
        [
          "As dependências apontam para dentro, em direção às políticas de alto nível",
          "As camadas internas importam os frameworks para simplificar",
          "Todas as camadas dependem diretamente do banco",
        ],
        0,
        "A Dependency Rule impede que as camadas internas conheçam detalhes externos.",
      ],
      [
        "Como um Use Case solicita persistência sem depender de SQL ou ORM?",
        [
          "Define uma abstração/porta interna, implementada por um adaptador externo",
          "Instancia diretamente o driver do banco",
          "Recebe e manipula um ResultSet JDBC",
        ],
        0,
        "O Use Case depende de uma interface definida no lado interno; o adaptador externo implementa essa porta.",
      ],
      [
        "Qual afirmação sobre Clean Architecture e microservices está correta?",
        [
          "Têm escopos diferentes e podem ser combinadas: Clean organiza o interior; microservices, a implantação",
          "Clean Architecture exige microservices",
          "São nomes diferentes para a mesma topologia",
        ],
        0,
        "A Clean Architecture trata da organização interna; microservices, da decomposição e implantação distribuídas.",
      ],
    ],
  },
];

const slideSupplements = [
  [
    "Arquitetura é evolutiva; patterns como Factory e Strategy são ferramentas de design a aplicar quando contexto e trade-offs justificarem.",
  ],
  [
    "Compare alternativas concretas (por exemplo, REST síncrono, fila ou tópico): latência, acoplamento, isolamento, operação e maturidade do time alteram a decisão.",
  ],
  [
    "Coesão pode ser avaliada por LCOM (Lack of Cohesion of Methods): valores altos podem indicar responsabilidades pouco relacionadas. Connascence tem formas estáticas e dinâmicas, como dependência de tipo, ordem e tempo; prefira dependências locais e de baixo grau.",
  ],
  [
    "Qualidade envolve conflitos concretos: consistência rígida pode custar disponibilidade/desempenho; segurança adicional pode afetar usabilidade. A prioridade deve refletir os drivers do produto e guiar iterações.",
  ],
  [
    "Event Storming ajuda a descobrir componentes seguindo eventos e workflows de domínio. Particionamento técnico pode acomodar customizações, mas não há partição perfeita: avalie o custo de coordenação e dependências.",
  ],
  [
    "Client/Server de duas camadas pode ligar cliente diretamente ao banco; Three-Tier separa apresentação, aplicação e dados, frequentemente com implantação em nós distintos. Camadas lógicas não significam necessariamente processos ou deploys separados.",
  ],
  [
    "A Lei de Conway ajuda a explicar estruturas em camadas que espelham equipes especializadas. Camadas fechadas favorecem isolamento; leituras rápidas que saltam uma camada devem ser exceções justificadas. Se a maioria das requisições só repassa dados (o slide usa >80% como alerta), reavalie o estilo ou as fronteiras.",
  ],
  [
    "Plugins podem ser carregados em runtime ou ligados no build. Contratos comuns, registro/descoberta e adaptadores permitem integração; plugins podem isolar seus dados. Torná-los serviços remotos muda o custo: entram rede, latência e operação distribuída. No Service-Based, variantes com API Gateway ou orquestração ajudam a coordenar, mas comunicação oculta e sagas ampliam complexidade.",
  ],
  [
    "Broker favorece coreografia: produtores publicam e consumidores encadeiam eventos. Mediator coordena um workflow centralmente. Broadcast/pub-sub distribui a vários interessados; Request-Reply introduz sincronismo. Projete idempotência, tratamento de falhas, monitoramento e mecanismos contra perda (por exemplo, outbox) deliberadamente.",
  ],
  [
    "O banco central pode virar gargalo na topologia tradicional (“pirâmide invertida”). Space-Based distribui requisições por um Messaging Grid e replica estado entre Processing Units; isso favorece elasticidade e tolerância à falha, mas exige coordenar consistência e recarga de dados.",
  ],
  [
    "Bounded Contexts do DDD ajudam a delimitar serviços coesos; microsserviços evoluem ideias de SOA com granularidade e autonomia maiores. Times orientados a domínio e DevOps/automação são parte da viabilidade. O API Gateway pode centralizar entrada, autenticação e roteamento, mas deve evitar tornar-se gargalo ou concentrar lógica de negócio.",
  ],
  [
    "Avalie risco por probabilidade e impacto (matriz) e envolva o time em Risk Storming. Evite paralisia decisória, rediscussão recorrente (Groundhog Day) e decisões perdidas em e-mails: comunique ADRs em uma fonte oficial e acessível.",
  ],
];
export const lessons = baseLessons.map((lesson, index) => ({
  ...lesson,
  sections: [
    ...lesson.sections,
    ...(slideSupplements[index]
      ? [["Aprofundamento dos slides", slideSupplements[index][0]]]
      : []),
  ],
  questions: lesson.questions.map(
    ([prompt, options, correctAnswer, explanation]) => ({
      prompt,
      options,
      correctAnswer,
      explanation,
    }),
  ),
}));
