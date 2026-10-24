import { advancedFlows } from "./architectures.js";

const node = (id, label, detail, x, y, type = "service") => ({
  id,
  label,
  detail,
  x,
  y,
  w: 150,
  h: 60,
  type,
});
const edge = (from, to, label, kind = "sync", route = {}) => ({
  from,
  to,
  label,
  kind,
  ...route,
});
const group = (label, x, y, w, h) => ({ label, x, y, w, h });
const flow = (title, note, nodes, edges, captions, groups = []) => ({
  title,
  note,
  width: 960,
  height: 440,
  nodes,
  edges,
  groups,
  steps: captions.map((caption, index) => [index, caption]),
});

const layers = flow(
  "Camadas · ida e volta",
  "As chamadas atravessam as camadas; a resposta retorna pela mesma aplicação.",
  [
    node("client", "Cliente", "web / mobile", 20, 180, "external"),
    node("ui", "Apresentação", "controller", 240, 90),
    node("business", "Negócio", "regras do pedido", 510, 90, "core"),
    node("repository", "Persistência", "repositório", 510, 280),
    node("db", "Banco de dados", "pedido persistido", 790, 280, "data"),
  ],
  [
    edge("client", "ui", "HTTP"),
    edge("ui", "business", "chamada local"),
    edge("business", "repository", "salvar pedido"),
    edge("repository", "db", "INSERT"),
    edge("db", "repository", "resultado", "return"),
    edge("repository", "business", "pedido salvo", "return"),
    edge("business", "ui", "confirmação", "return"),
    edge("ui", "client", "201 Created", "return"),
  ],
  [
    "O cliente envia a compra ao controller da aplicação.",
    "A apresentação delega as regras ao negócio, dentro do mesmo processo.",
    "O negócio valida a compra e solicita a persistência.",
    "O repositório grava o pedido no banco.",
    "O banco confirma a gravação.",
    "A persistência devolve o pedido salvo ao negócio.",
    "O resultado retorna à apresentação.",
    "O cliente recebe a confirmação após a gravação.",
  ],
  [group("APLICAÇÃO · UM DEPLOY", 210, 40, 490, 350)],
);

const pipeline = flow(
  "Pipeline · transformação de dados",
  "Cada filtro entrega sua saída ao próximo pipe. Este cenário acompanha um pedido válido.",
  [
    node("producer", "Producer", "pedido bruto", 20, 80, "external"),
    node("validate", "Validar", "schema e campos", 280, 80),
    node("total", "Calcular total", "preço + frete", 550, 80),
    node("stock", "Verificar estoque", "disponibilidade", 550, 290),
    node("payment", "Pagamento", "autorizar cobrança", 280, 290),
    node("consumer", "Consumer", "pedido processado", 20, 290, "external"),
  ],
  [
    edge("producer", "validate", "pedido"),
    edge("validate", "total", "dados válidos"),
    edge("total", "stock", "total calculado"),
    edge("stock", "payment", "itens disponíveis"),
    edge("payment", "consumer", "resultado"),
  ],
  [
    "O produtor coloca os dados do pedido no pipeline.",
    "O primeiro filtro valida o formato e entrega dados válidos.",
    "O filtro de cálculo adiciona o total e passa o pedido adiante.",
    "O filtro de estoque aprova os itens disponíveis.",
    "O pagamento autoriza a cobrança e entrega o resultado ao consumidor.",
  ],
  [group("FILTROS INDEPENDENTES · PIPES ENTRE ETAPAS", 245, 30, 500, 365)],
);

const kernel = flow(
  "Microkernel · núcleo e extensões",
  "Plugins são acionados pelo core através de contratos; não formam uma cadeia entre si.",
  [
    node("client", "Cliente", "compra", 20, 190, "external"),
    node("core", "Core de pedidos", "coordenação essencial", 300, 190, "core"),
    node("registry", "Registro", "contratos de extensão", 300, 50, "adapter"),
    node("tax", "Plugin fiscal", "regra regional", 700, 90),
    node("payment", "Plugin pagamento", "provedor selecionado", 700, 290),
  ],
  [
    edge("client", "core", "criar pedido"),
    edge("core", "registry", "buscar plugins"),
    edge("core", "tax", "contrato fiscal"),
    edge("tax", "core", "tributos", "return"),
    edge("core", "payment", "contrato pagamento"),
    edge("payment", "core", "autorização", "return"),
    edge("core", "client", "confirmação", "return"),
  ],
  [
    "O cliente inicia a compra no núcleo.",
    "O core consulta as extensões disponíveis e seus contratos.",
    "O core chama o plugin fiscal pelo contrato da extensão.",
    "O plugin fiscal devolve o cálculo ao core.",
    "O core aciona o plugin de pagamento, sem depender da implementação do provedor.",
    "A autorização retorna ao núcleo.",
    "O core conclui o fluxo e responde ao cliente.",
  ],
  [
    group("NÚCLEO ESTÁVEL", 270, 15, 210, 275),
    group("EXTENSÕES SUBSTITUÍVEIS", 660, 35, 230, 355),
  ],
);

const serviceBased = flow(
  "Service-Based · dados compartilhados",
  "Serviços de domínio separados acessam uma base comum. As operações entre serviços não são uma transação única.",
  [
    node("client", "Cliente", "interface web", 20, 70, "external"),
    node("orders", "Pedidos", "serviço de domínio", 280, 70, "core"),
    node("stock", "Estoque", "serviço de domínio", 550, 70),
    node("payment", "Pagamento", "serviço de domínio", 790, 70),
    node(
      "db",
      "Banco compartilhado",
      "pedidos · estoque · cobrança",
      550,
      310,
      "data",
    ),
  ],
  [
    edge("client", "orders", "HTTP"),
    edge("orders", "db", "criar pedido"),
    edge("orders", "stock", "reservar"),
    edge("stock", "db", "atualizar estoque"),
    edge("orders", "payment", "cobrar", "sync", {
      d: "M355 70 V30 H865 V70",
      x: 610,
      y: 22,
    }),
    edge("payment", "db", "registrar cobrança"),
    edge("orders", "client", "resultado", "return"),
  ],
  [
    "A interface envia a compra ao serviço de Pedidos.",
    "Pedidos registra o pedido na base compartilhada.",
    "Pedidos solicita a reserva ao serviço de Estoque.",
    "Estoque atualiza seus dados na mesma base.",
    "Pedidos solicita a cobrança ao serviço de Pagamento.",
    "Pagamento registra o resultado na base compartilhada.",
    "Pedidos devolve o resultado ao cliente após a conclusão das operações.",
  ],
);

const space = flow(
  "Space-Based · processamento em memória",
  "A resposta não espera a persistência em disco. Replicação e gravação assíncrona têm garantias próprias.",
  [
    node("client", "Cliente", "requisição", 20, 180, "external"),
    node("router", "Messaging Grid", "distribui a carga", 230, 180, "adapter"),
    node("a", "Processing Unit A", "lógica + memória", 470, 70, "core"),
    node("b", "Processing Unit B", "lógica + memória", 740, 70, "core"),
    node("grid", "Data Grid", "estado distribuído", 470, 290, "broker"),
    node("pump", "Data Pump", "gravação assíncrona", 740, 290, "adapter"),
    node("db", "Banco de dados", "persistência durável", 740, 390, "data"),
  ],
  [
    edge("client", "router", "requisição"),
    edge("router", "a", "seleciona unidade"),
    edge("a", "grid", "atualiza estado"),
    edge("grid", "b", "replica", "async"),
    edge("a", "router", "resultado", "return"),
    edge("router", "client", "confirmação", "return"),
    edge("grid", "pump", "alteração", "async"),
    edge("pump", "db", "persistir", "async"),
  ],
  [
    "O cliente envia a compra ao messaging grid.",
    "O roteador seleciona a unidade A; a unidade B também pode atender outras requisições.",
    "A unidade processa o pedido usando o estado em memória.",
    "O grid propaga o estado para a outra unidade; esta etapa ilustra replicação assíncrona.",
    "A unidade devolve o resultado sem esperar a gravação em disco.",
    "O cliente recebe a resposta antes da persistência durável.",
    "O data pump recebe a alteração em segundo plano.",
    "O data pump grava o estado no banco fora do caminho da resposta.",
  ],
);
space.height = 480;

const mesh = flow(
  "Microservices + Service Mesh",
  "Os proxies transportam as chamadas entre serviços. O plano de controle configura políticas, sem intermediar cada requisição.",
  [
    node("client", "Cliente", "web / mobile", 20, 100, "external"),
    node(
      "gateway",
      "API Gateway",
      "autenticação · roteamento",
      230,
      100,
      "adapter",
    ),
    node("order", "Pedidos", "serviço autônomo", 450, 100, "core"),
    node(
      "orderProxy",
      "Proxy · Pedidos",
      "sidecar de saída",
      450,
      250,
      "adapter",
    ),
    node(
      "stockProxy",
      "Proxy · Estoque",
      "sidecar de entrada",
      750,
      250,
      "adapter",
    ),
    node("stock", "Estoque", "serviço autônomo", 750, 100),
    node(
      "control",
      "Plano de controle",
      "políticas · certificados",
      20,
      250,
      "broker",
    ),
    node("orderDb", "DB pedidos", "acesso exclusivo", 450, 390, "data"),
    node("stockDb", "DB estoque", "acesso exclusivo", 750, 390, "data"),
  ],
  [
    edge("client", "gateway", "HTTPS"),
    edge("gateway", "order", "HTTP"),
    edge("order", "orderDb", "salvar pedido", "sync", {
      d: "M450 130 H425 V420 H450",
      x: 400,
      y: 350,
    }),
    edge("order", "orderProxy", "reservar"),
    edge("orderProxy", "stockProxy", "mTLS · gRPC"),
    edge("stockProxy", "stock", "encaminhar"),
    edge("stock", "stockDb", "reservar item", "sync", {
      d: "M900 130 H930 V420 H900",
      x: 870,
      y: 355,
    }),
    edge("stock", "stockProxy", "resultado", "return"),
    edge("stockProxy", "orderProxy", "mTLS · resposta", "return"),
    edge("orderProxy", "order", "reserva aceita", "return"),
    edge("order", "gateway", "pedido aceito", "return"),
    edge("gateway", "client", "201 Created", "return"),
    edge("control", "orderProxy", "políticas", "control"),
    edge("control", "stockProxy", "configuração", "control", {
      d: "M95 310 V355 H825 V310",
      x: 270,
      y: 347,
    }),
  ],
  [
    "O cliente envia a compra ao API Gateway via HTTPS.",
    "O gateway encaminha a chamada ao serviço de Pedidos.",
    "Pedidos salva o estado no seu banco privado.",
    "A chamada de reserva sai pelo proxy local de Pedidos.",
    "Os proxies estabelecem mTLS e aplicam políticas de timeout e circuit breaker configuradas.",
    "O proxy de Estoque encaminha a chamada à aplicação.",
    "Estoque reserva o item no seu próprio banco.",
    "Estoque devolve o resultado ao seu proxy.",
    "A resposta retorna pelo canal protegido entre proxies.",
    "O proxy entrega o resultado ao serviço de Pedidos.",
    "Pedidos responde ao gateway.",
    "O gateway entrega a resposta ao cliente.",
  ],
  [
    group("SERVIÇO + SIDECAR", 425, 55, 200, 280),
    group("SERVIÇO + SIDECAR", 725, 55, 200, 280),
  ],
);
mesh.height = 480;

const broker = {
  ...advancedFlows.eventBroker,
  title: "Event-Driven · Broker",
  note: "Fan-out: cada assinatura recebe o evento de forma independente, sem ordem garantida entre consumidores.",
  steps: [
    advancedFlows.eventBroker.steps[0],
    [
      [1, 2, 3],
      "O broker distribui o evento às três assinaturas independentes. Os consumidores podem processar em paralelo, em tempos diferentes.",
    ],
  ],
};
const mediator = {
  ...advancedFlows.eventMediator,
  title: "Event-Driven · Mediator",
  note: "O coordenador aguarda os resultados para decidir o próximo comando. As conexões representam canais de mensagens.",
};
const microservices = {
  ...advancedFlows.microservices,
  title: "Microservices · APIs e eventos",
  note: "Uma Saga coordena esta compra: reserva síncrona e cobrança assíncrona. Cada serviço é responsável por seus dados.",
};

export const simulationFlows = [
  [layers],
  [pipeline],
  [kernel],
  [serviceBased],
  [broker, mediator],
  [space],
  [microservices, mesh],
];
