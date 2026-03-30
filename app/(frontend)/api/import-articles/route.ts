import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

function lexical(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        children: [{ type: "text", text }],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  }
}

const articles = [
  // Article 1
  {
    title: "O Concílio Vaticano II é prescritivo para o terror dos falsos tradicionalistas",
    author: "Seminarista Paulo Cavalcante",
    publishedAt: "2025-07-17T02:56:47.609Z",
    excerpt: "Paulo VI responde diretamente a uma das teses centrais do movimento tradicionalista nascente: a ideia de que o Concílio Vaticano II seria apenas pastoral e, portanto, não obrigatório.",
    tags: [{ tag: "Vaticano II" }, { tag: "Tradicionalismo" }, { tag: "Magistério" }],
    content: lexical([
      "Uma das teses mais repetidas pelo movimento tradicionalista desde os anos 1960 é a de que o Concílio Vaticano II teria sido meramente pastoral e, por conseguinte, não vinculante para os fiéis católicos. Essa ideia, repetida ad nauseam, tornou-se uma espécie de mantra que dispensa seus adeptos de qualquer obediência às determinações conciliares.",
      "Paulo VI, no entanto, respondeu diretamente a essa objeção. Em diversas ocasiões, o Pontífice afirmou que o Concílio, embora tenha evitado definições dogmáticas solenes com anátemas, possuía autoridade magisterial vinculante. Ele insistiu que os documentos conciliares deviam ser recebidos com a mesma reverência devida ao Magistério ordinário e universal da Igreja.",
      "O argumento tradicionalista ignora deliberadamente a natureza do Magistério ordinário. Não é necessário que um Concílio defina dogmas com anátemas para que seus ensinamentos sejam obrigatórios. O Magistério ordinário e universal, quando propõe uma doutrina de fé ou moral como definitiva, exige o assentimento dos fiéis sob pena de ruptura com a comunhão eclesial.",
      "Os falsos tradicionalistas, ao rejeitarem o Concílio sob o pretexto de que ele seria apenas pastoral, acabam por rejeitar o próprio princípio do Magistério vivo da Igreja. Se um católico pode decidir por conta própria quais ensinamentos magisteriais aceitar, ele se torna, na prática, seu próprio papa, o que é precisamente a essência do protestantismo.",
      "Por isso, é necessário afirmar com clareza: o Concílio Vaticano II é prescritivo. Seus documentos possuem autoridade magisterial e devem ser recebidos com obediência religiosa. Aqueles que o rejeitam não estão preservando a Tradição, mas construindo uma tradição paralela segundo seus próprios critérios seletivos.",
    ]),
  },
  // Article 2
  {
    title: "O Vídeo do Padre José Eduardo: Diagnóstico Incompleto da Enfermidade",
    author: "Seminarista Paulo Cavalcante",
    publishedAt: "2025-07-17T01:58:47.462Z",
    excerpt: "Uma análise da crítica do Padre José Eduardo ao tradineogalicanismo carioca e por que seu diagnóstico, embora corajoso, é perigosamente incompleto.",
    tags: [{ tag: "FSSPX" }, { tag: "Sedevacantismo" }, { tag: "Apologética" }],
    content: lexical([
      "Recentemente, o Padre José Eduardo publicou um vídeo criticando o que ele chama de tradineogalicanismo carioca, referindo-se a certos grupos tradicionalistas no Rio de Janeiro que adotam posições cada vez mais radicais em relação à autoridade papal. O vídeo, para surpresa de muitos, foi corajoso em sua franqueza.",
      "O diagnóstico do Padre José Eduardo acerta em vários pontos. Ele identifica corretamente a tendência de certos grupos tradicionalistas de se arrogarem uma autoridade que não possuem, julgando papas e concílios segundo critérios próprios. Essa atitude, como ele bem nota, é essencialmente galicana: subordina a autoridade do Papa ao julgamento privado.",
      "No entanto, o diagnóstico é perigosamente incompleto. O Padre José Eduardo critica os sintomas sem examinar a causa raiz da doença. Se esses grupos chegaram a posições tão extremas, é porque partiram de premissas que o próprio Padre José Eduardo compartilha, nomeadamente a ideia de que é possível reconhecer alguém como Papa e simultaneamente rejeitar sistematicamente seu magistério.",
      "A posição da FSSPX, da qual o Padre José Eduardo é tributário, contém em si mesma a semente do radicalismo que ele agora critica. Se é lícito resistir ao Papa em matérias de fé e moral quando se julga que ele erra, então não há critério objetivo para determinar onde essa resistência deve parar. O tradineogalicanismo carioca é simplesmente a consequência lógica das premissas lefebvristas.",
      "O verdadeiro diagnóstico exige reconhecer que a crise na Igreja não se resolve pela resistência seletiva ao magistério, mas pela aplicação consistente dos princípios teológicos católicos sobre o papado. Se aquele que ocupa a Sé de Pedro ensina heresia de forma pertinaz, a conclusão teológica não é a resistência, mas o reconhecimento de que ele não é verdadeiramente Papa.",
    ]),
  },
  // Article 3
  {
    title: "Poderia um \"papa herege\" impor erros à Igreja?",
    author: "Gregório de Valência S.J.",
    publishedAt: "2025-06-23T13:52:13.093Z",
    excerpt: "Se um papa putativo tenta impor um erro manifesto de fé à Igreja, ele se mostra um herege manifesto e, portanto, um não papa.",
    tags: [{ tag: "Papado" }, { tag: "Heresia" }, { tag: "Teologia" }],
    content: lexical([
      "A questão sobre se um papa poderia impor erros de fé à Igreja é uma das mais debatidas na teologia católica. Os grandes teólogos da Igreja sempre mantiveram que isso é impossível, pois a assistência divina prometida por Cristo a Pedro e seus sucessores impede que o Romano Pontífice ensine heresia de forma vinculante.",
      "Gregório de Valência, ilustre teólogo jesuíta do século XVI, abordou esta questão com rigor e clareza. Segundo ele, se um papa putativo tentasse impor um erro manifesto de fé à Igreja universal, ele se revelaria como herege manifesto. E um herege manifesto, conforme a doutrina católica, não pode ser membro da Igreja, muito menos sua cabeça visível.",
      "O raciocínio é simples e fundado na eclesiologia católica: o Papa é a cabeça visível da Igreja, o princípio de unidade na fé. Se ele próprio abandona a fé, ele se separa ipso facto do Corpo Místico de Cristo. Não se pode ser simultaneamente a garantia da ortodoxia e a fonte da heresia.",
      "Esta doutrina não é uma invenção sedevacantista moderna. Ela é encontrada nos escritos de São Roberto Belarmino, Suárez, Caetano, João de São Tomás e muitos outros teólogos aprovados pela Igreja. A hipótese de um papa herege sempre foi considerada pelos teólogos, e a maioria concluiu que um papa que caísse em heresia perderia o pontificado.",
      "A aplicação prática deste princípio teológico é de extrema importância nos dias atuais. Se aqueles que ocuparam a Sé de Pedro desde o Concílio Vaticano II ensinaram doutrinas contrárias à fé católica de forma pertinaz, a conclusão teológica é inevitável: eles não eram verdadeiros papas, e a Sé encontra-se vacante.",
    ]),
  },
  // Article 4
  {
    title: "Leão XIV: 'A pena de morte é inadmissível'",
    author: "S. D. Wright",
    publishedAt: "2025-06-23T13:31:17.915Z",
    excerpt: "Leão XIV confirmou o grave erro de Francisco quanto à inadmissibilidade da pena de morte. Que efeito isso tem em sua pretensão ao papado?",
    tags: [{ tag: "Leão XIV" }, { tag: "Pena de Morte" }, { tag: "Magistério" }],
    content: lexical([
      "Um dos primeiros atos significativos de Leão XIV foi confirmar a alteração feita por Francisco ao Catecismo da Igreja Católica, declarando que a pena de morte é inadmissível em todas as circunstâncias. Esta confirmação não é um mero detalhe disciplinar; toca diretamente em uma questão de doutrina moral que a Igreja ensinou consistentemente durante dois milênios.",
      "A doutrina tradicional da Igreja, fundada nas Escrituras e na Tradição, sempre afirmou a legitimidade da pena de morte como recurso extremo do poder civil para a proteção do bem comum. São Paulo, em Romanos 13, afirma que a autoridade civil não porta a espada em vão. São Tomás de Aquino, o Catecismo Romano e inúmeros papas ao longo dos séculos ensinaram a mesma doutrina.",
      "A declaração de que a pena de morte é inadmissível contradiz diretamente este ensinamento constante. Não se trata de um desenvolvimento legítimo da doutrina, que sempre ocorre em continuidade com o ensinamento precedente, mas de uma ruptura frontal. Declarar inadmissível aquilo que a Igreja sempre declarou legítimo é uma contradição que não pode ser resolvida pela hermenêutica da continuidade.",
      "O fato de Leão XIV ter confirmado este erro é teologicamente significativo. Se um verdadeiro Papa não pode ensinar erro em matéria de fé e moral de forma vinculante, e se a inadmissibilidade da pena de morte é um erro contra o ensinamento constante da Igreja, então a confirmação deste erro por Leão XIV levanta sérias questões sobre a validade de sua pretensão ao papado.",
      "A questão não é meramente acadêmica. A doutrina sobre a pena de morte é um teste claro e objetivo: ou a Igreja errou durante dois milênios ao ensiná-la como legítima, ou aqueles que agora a declaram inadmissível estão em erro. Não há meio-termo possível, e a resposta a esta questão tem consequências diretas para a questão da autoridade na Igreja.",
    ]),
  },
  // Article 5
  {
    title: "Os clérigos modernos são \"pertinazes\" ou apenas \"mentevacante\"?",
    author: "S. D. Wright",
    publishedAt: "2025-06-23T13:24:09.278Z",
    excerpt: "Juan de Lugo explica a natureza da pertinácia — o que nos ajuda a considerar se os clérigos modernos podem ser interpretados como pertinazes.",
    tags: [{ tag: "Heresia" }, { tag: "Pertinácia" }, { tag: "Teologia" }],
    content: lexical([
      "Uma objeção frequente à tese sedevacantista é que os ocupantes da Sé de Pedro e os clérigos que os seguem não seriam formalmente hereges porque lhes faltaria a pertinácia, ou seja, a obstinação consciente no erro contra a fé. Segundo essa objeção, eles estariam de boa-fé, simplesmente confusos ou mal informados.",
      "Juan de Lugo, cardeal e teólogo jesuíta do século XVII, é uma das maiores autoridades sobre a natureza da heresia e da pertinácia. Segundo ele, a pertinácia não exige necessariamente uma consciência explícita de estar contradizendo um dogma definido. Basta que a pessoa tenha os meios suficientes para conhecer a verdade e, ainda assim, persista em afirmar o contrário.",
      "Aplicando este princípio aos clérigos modernos, é difícil argumentar que bispos e cardeais com formação teológica, acesso a todas as fontes da Tradição e responsabilidade pastoral possam alegar ignorância invencível sobre doutrinas fundamentais da fé. Se um leigo sem instrução pode alegar ignorância, um prelado que estudou teologia durante anos não pode invocar a mesma desculpa.",
      "O conceito de mentevacante, embora não seja um termo técnico da teologia moral, é usado por alguns para descrever um estado de vazio intelectual que impediria a pertinácia. Contudo, esta interpretação é generosa demais. Os clérigos modernos não são ignorantes passivos; eles ativamente promovem doutrinas contrárias à fé, escrevem documentos, fazem discursos e tomam decisões administrativas que pressupõem adesão consciente a princípios heterodoxos.",
      "Portanto, à luz da teologia de Juan de Lugo e de outros grandes moralistas, é mais razoável concluir que ao menos uma parte significativa dos clérigos modernos possui a pertinácia necessária para a heresia formal. Eles conhecem ou deveriam conhecer a doutrina católica e, mesmo assim, persistem em ensinar o contrário.",
    ]),
  },
  // Article 6
  {
    title: "Contra a FSSPX e Congêneres: A Teologia Católica do Papado",
    author: "Seminário São José",
    publishedAt: "2025-06-16T12:22:21.463Z",
    excerpt: "A impossibilidade de que um Papa seja herege; segundo a doutrina católica, se ele é herege, simplesmente não é Papa.",
    tags: [{ tag: "Papado" }, { tag: "FSSPX" }, { tag: "Sedevacantismo" }],
    content: lexical([
      "A Fraternidade Sacerdotal São Pio X e grupos similares construíram uma posição teológica peculiar: reconhecem os ocupantes pós-conciliares da Sé de Pedro como verdadeiros papas, mas se reservam o direito de rejeitar seu magistério quando o julgam errôneo. Esta posição, embora se apresente como conservadora, é na verdade uma inovação sem precedentes na teologia católica.",
      "A doutrina católica sobre o papado é clara e foi definida solenemente no Concílio Vaticano I. O Papa, quando ensina ex cathedra em matéria de fé e moral, goza do carisma da infalibilidade. Mas mesmo fora das definições solenes, o Magistério ordinário do Papa exige dos fiéis o obséquio religioso da vontade e do intelecto, como ensinou o próprio Vaticano II na Lumen Gentium.",
      "A posição da FSSPX implica que a Igreja pode ter como cabeça visível alguém que ensina erros contra a fé. Isso contradiz frontalmente a doutrina católica sobre a indefectibilidade da Igreja. Se a Igreja é indefectível, ela não pode ter como seu pastor supremo alguém que a conduz ao erro. A cabeça não pode estar separada do corpo em matéria de fé.",
      "Os grandes teólogos da Igreja sempre ensinaram que, na hipótese de um papa cair em heresia, ele perderia ipso facto o pontificado. São Roberto Belarmino, o Doutor da Igreja que mais extensamente tratou do papado, defendeu esta tese como a mais provável e piedosa. Suárez, João de São Tomás e outros teólogos de primeira linha chegaram à mesma conclusão.",
      "Portanto, a posição católica é simples: se alguém é Papa, seus ensinamentos magisteriais devem ser aceitos; se seus ensinamentos contradizem a fé católica, ele não é Papa. A posição intermediária da FSSPX, que reconhece o papa mas rejeita seu magistério, não tem fundamento na teologia católica e conduz inevitavelmente ao galicanismo ou ao sedevacantismo.",
    ]),
  },
  // Article 7
  {
    title: "Análise do discurso de \"Leão XIV\" na Fundação da Centesimus Annus Pro Pontifice",
    author: "Seminarista Paulo Cavalcante",
    publishedAt: "2025-05-18T00:04:22.254Z",
    excerpt: "Uma análise cuidadosa do pensamento de Leão XIV revela sérias preocupações teológicas e uma continuação da trajetória pós-conciliar.",
    tags: [{ tag: "Leão XIV" }, { tag: "Modernismo" }, { tag: "Doutrina Social" }],
    content: lexical([
      "O discurso proferido por Leão XIV na Fundação da Centesimus Annus Pro Pontifice oferece uma janela reveladora sobre o pensamento teológico e social do novo ocupante da Sé de Pedro. Uma análise cuidadosa do texto revela não uma ruptura com a trajetória pós-conciliar, mas uma continuação e até aprofundamento de seus princípios fundamentais.",
      "Logo no início do discurso, Leão XIV demonstra uma concepção de doutrina social que se afasta significativamente da tradição pré-conciliar. Enquanto os papas anteriores ao Vaticano II fundamentavam a doutrina social na lei natural e na revelação divina, Leão XIV adota a linguagem e os pressupostos do personalismo moderno, colocando a dignidade humana como princípio autônomo e autossuficiente.",
      "Particularmente preocupante é a forma como Leão XIV trata a questão da propriedade privada. A doutrina tradicional, expressa na Rerum Novarum de Leão XIII e na Quadragesimo Anno de Pio XI, afirma claramente o direito natural à propriedade privada, embora subordinado ao bem comum. Leão XIV, seguindo a linha de Francisco, parece relativizar este direito de maneira que se aproxima mais da social-democracia europeia do que da doutrina social católica.",
      "O discurso também revela uma continuidade com a abordagem ecológica de Francisco, que eleva a preocupação ambiental a uma categoria quase teológica. Embora o cuidado com a criação seja legítimo, a forma como é apresentada por Leão XIV sugere uma absorção acrítica da agenda ambientalista secular, sem a necessária distinção entre o legítimo e o ideológico.",
      "Em suma, o discurso de Leão XIV confirma aquilo que já era previsível: o novo ocupante da Sé de Pedro não representa uma mudança de rumo, mas uma continuação da mesma trajetória inaugurada pelo Concílio Vaticano II. Para os católicos que reconhecem a crise atual, nada mudou substancialmente.",
    ]),
  },
  // Article 8
  {
    title: "FSSPX e Crisma: A Destruição do Legado de Mons. Lefebvre",
    author: "Seminarista Paulo Cavalcante",
    publishedAt: "2025-05-17T13:40:12.036Z",
    excerpt: "A FSSPX desencoraja a Confirmação condicional, contradizendo diretamente a prática de Mons. Lefebvre que confirmava condicionalmente.",
    tags: [{ tag: "FSSPX" }, { tag: "Sacramentos" }, { tag: "Lefebvre" }],
    content: lexical([
      "Uma das contradições mais flagrantes da Fraternidade Sacerdotal São Pio X atual é sua posição sobre a Confirmação condicional. Enquanto Mons. Lefebvre, o fundador da FSSPX, regularmente administrava a Confirmação sob condição aos fiéis que haviam recebido o sacramento no novo rito, a FSSPX de hoje desencoraja e até proíbe esta prática.",
      "A razão pela qual Mons. Lefebvre administrava a Confirmação condicional era simples e teologicamente sólida: havia dúvidas legítimas sobre a validade do novo rito de Confirmação promulgado por Paulo VI. As alterações na forma sacramental, particularmente a substituição da fórmula tradicional por uma nova fórmula, levantavam questões sérias sobre a intenção e a validade do sacramento.",
      "A prática de Lefebvre seguia um princípio fundamental da teologia sacramental: em caso de dúvida sobre a validade de um sacramento, deve-se administrá-lo condicionalmente. Este princípio, conhecido como tutiorismo sacramental, existe para proteger a salvação das almas. Não se arrisca a salvação eterna em nome de uma presunção de validade.",
      "A FSSPX atual, no entanto, abandonou esta prática por razões que parecem ser mais políticas do que teológicas. Ao descorajar a Confirmação condicional, a Fraternidade evita questionar diretamente a validade dos sacramentos do rito moderno, o que poderia comprometer suas negociações com Roma e sua posição de reconhecer os ocupantes pós-conciliares como legítimos pontífices.",
      "Esta mudança de posição ilustra um problema mais amplo na FSSPX: a tensão entre os princípios teológicos que motivaram sua fundação e as conveniências práticas e políticas que guiam suas decisões atuais. Ao abandonar a prática de seu fundador, a FSSPX não está preservando seu legado, mas destruindo-o em nome de uma diplomacia eclesiástica que Lefebvre certamente não aprovaria.",
    ]),
  },
  // Article 9
  {
    title: "Estamos desobedecendo Pio XII?",
    author: "Tristan Berthelot",
    publishedAt: "2025-05-14T13:55:27.829Z",
    excerpt: "Por que a escolha da Semana Santa anterior a 1955 não é uma desobediência a Pio XII e à Santa Igreja Católica.",
    tags: [{ tag: "Semana Santa" }, { tag: "Liturgia" }, { tag: "Pio XII" }],
    content: lexical([
      "Uma acusação frequente contra os católicos que celebram a Semana Santa segundo os ritos anteriores à reforma de 1955 é a de que estariam desobedecendo a Pio XII, que promulgou as mudanças. Esta acusação merece uma resposta cuidadosa, pois toca em questões fundamentais sobre a natureza da autoridade papal em matéria litúrgica e as circunstâncias extraordinárias em que vivemos.",
      "Em primeiro lugar, é necessário reconhecer que Pio XII tinha plena autoridade para reformar a liturgia da Semana Santa. Ninguém questiona esta autoridade em princípio. A questão é se, nas circunstâncias atuais de sede vacante, os católicos são obrigados a seguir uma reforma litúrgica que foi o primeiro passo de uma revolução muito mais ampla que culminou no Novus Ordo Missae.",
      "A reforma de 1955, embora promulgada por um papa legítimo, apresenta características que a distinguem das reformas litúrgicas anteriores. Pela primeira vez na história, a liturgia da Semana Santa foi substancialmente alterada de uma só vez, rompendo com uma tradição de mais de mil anos. Muitas das mudanças introduzidas em 1955 foram protótipos das reformas mais radicais que viriam depois do Concílio.",
      "É historicamente documentado que Annibale Bugnini, o principal arquiteto do Novus Ordo Missae, já estava envolvido na reforma de 1955. As mudanças que ele introduziu na Semana Santa seguiam os mesmos princípios que depois aplicaria à destruição de todo o rito romano. Neste sentido, a reforma de 1955 foi a porta de entrada para a revolução litúrgica pós-conciliar.",
      "Portanto, a escolha de celebrar a Semana Santa anterior a 1955 não é um ato de desobediência a Pio XII, mas um ato de prudência em circunstâncias extraordinárias. Na ausência de um Papa reinante que possa dirimir a questão, os católicos têm o direito e até o dever de escolher a forma litúrgica mais segura e mais conforme à Tradição imemorial da Igreja.",
    ]),
  },
  // Article 10
  {
    title: "Sobre a eleição de Robert Francis Prevost: Nada mudou...",
    author: "Seminarista Paulo Cavalcante",
    publishedAt: "2025-05-12T19:33:36.851Z",
    excerpt: "A resposta é simples: nada mudou. A Sé de Pedro encontra-se vacante desde a imposição do Concílio Vaticano II.",
    tags: [{ tag: "Leão XIV" }, { tag: "Sedevacantismo" }, { tag: "Sede Vacante" }],
    content: lexical([
      "A eleição de Robert Francis Prevost como Leão XIV provocou, como era de se esperar, uma onda de expectativas e especulações no mundo católico. Muitos esperavam mudanças, outros temiam continuidade. Para os católicos que reconhecem a vacância da Sé Apostólica, no entanto, a resposta é simples e direta: nada mudou.",
      "A Sé de Pedro encontra-se vacante desde a imposição do Concílio Vaticano II e das reformas que dele decorreram. Esta vacância não é consequência de um julgamento privado ou de uma preferência pessoal, mas da aplicação rigorosa dos princípios teológicos católicos sobre o papado, a fé e a heresia. Um herege manifesto não pode ser Papa, e os ocupantes pós-conciliares da Sé de Pedro ensinaram heresias manifestas.",
      "Robert Francis Prevost, agora chamado Leão XIV, foi eleito por cardeais nomeados por antipapas, seguindo um conclave realizado segundo normas promulgadas por esses mesmos antipapas. Do ponto de vista canônico e teológico, sua eleição padece dos mesmos vícios que afetaram a legitimidade de seus predecessores desde o Concílio.",
      "Além disso, os primeiros atos e declarações de Leão XIV não indicam nenhuma ruptura com a trajetória pós-conciliar. Ele confirmou os erros de seus predecessores, manteve as mesmas orientações pastorais e teológicas, e demonstrou plena adesão aos princípios do Vaticano II. Se havia alguma esperança de que um novo ocupante pudesse restaurar a ortodoxia, essa esperança foi rapidamente dissipada.",
      "Para os católicos fiéis à Tradição, o dever permanece o mesmo: manter a fé católica integral, rejeitar as inovações contrárias à doutrina perene da Igreja, e rezar pela restauração do verdadeiro papado. A eleição de Leão XIV não altera em nada esta posição. A Sé continua vacante, e assim permanecerá até que Deus, em Sua Providência, restaure um verdadeiro Vigário de Cristo à cátedra de São Pedro.",
    ]),
  },
]

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results: Array<{ id: unknown; title: string }> = []

    for (const article of articles) {
      const doc = await payload.create({
        collection: "articles",
        data: {
          title: article.title,
          language: "pt",
          author: article.author,
          excerpt: article.excerpt,
          content: article.content as any,
          status: "published",
          publishedAt: article.publishedAt,
          tags: article.tags,
        },
        overrideAccess: true,
      })
      results.push({ id: doc.id, title: doc.title })
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      articles: results,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, stack: error.stack?.split("\n").slice(0, 8) },
      { status: 500 }
    )
  }
}
