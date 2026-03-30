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
        children: [{ type: "text", text, format: 0, version: 1 }],
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
  {
    title: "Introdução ao Sedevacantismo",
    author: "Diogo Rafael Moreira",
    publishedAt: "2018-01-23T12:00:00.000Z",
    excerpt: "O sedevacantismo é a posição sustentada por católicos tradicionais que creem que a Santa Sé está vacante. Uma aula estruturada distinguindo sedevacantismo de anti-papismo.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Introdução" }, { tag: "Teologia" }],
    imageUrl: "http://img.youtube.com/vi/wmnCsyNeraM/0.jpg",
    content: lexical([
      "O sedevacantismo é a posição sustentada por católicos tradicionais que creem que a Santa Sé está vacante, ou seja, sem Papa. Esta não é uma posição contra o Papado, mas contra a usurpação do Papado por homens que não professam a fé católica.",
      "Existem três distinções fundamentais a serem feitas: primeiro, o sedevacantismo é uma crença num fato, não um movimento organizado; segundo, é contra a usurpação, não contra o Papado em si; terceiro, aqueles que não são sedevacantistas são, por definição, sedeplenistas — creem que a Sé está ocupada.",
      "Há dois caminhos para se chegar ao sedevacantismo: pela via da infalibilidade e indefectibilidade do Papado, ou pela via da natureza da heresia manifesta. Ambos os caminhos conduzem à mesma conclusão teológica.",
      "Uma analogia útil é a de um anel de ouro falsificado: assim como um anel que parece ouro mas não é ouro não pode ser vendido como ouro genuíno, uma autoridade que parece católica mas não professa a fé católica não pode exercer a autoridade da Igreja Católica.",
      "O artigo divide-se em duas partes: a primeira demonstra a competência da Igreja como mestra através de seus pronunciamentos ordinários, e a segunda demonstra que a Igreja Conciliar não é a Igreja Católica. Material complementar inclui referências a John Daly, Gerry Matatics e Dr. Rama P. Coomaraswamy.",
    ]),
  },
  {
    title: "A solução sedevacantista e suas rivais",
    author: "Mons. Donald J. Sanborn (trad. Diogo Rafael Moreira)",
    publishedAt: "2018-05-15T14:30:00.000Z",
    excerpt: "Compara a posição sedevacantista com suas soluções rivais (Ecclesia Dei e lefebvrista), argumentando que enquanto o sedevacantismo deixa um mistério aberto, as posições rivais levam a contradições.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "FSSPX" }, { tag: "Apologética" }],
    imageUrl: "http://img.youtube.com/vi/qLjCaC7ITwI/0.jpg",
    content: lexical([
      "Baseado no artigo 'Resistance and Indefectibility' de Mons. Sanborn (1991), este texto argumenta que o ponto de partida sedevacantista é a diferença substancial entre o Novus Ordo e a fé católica, mais evidente na contradição entre Dignitatis Humanae e Quanta Cura.",
      "Se o Novus Ordo é substancialmente diferente da fé católica, ele não pode ser católico e, portanto, não pode ter sido promulgado pela autoridade da Igreja. Aqueles que o promulgaram — Paulo VI, João Paulo I, João Paulo II — não podem ser verdadeiros papas.",
      "O sedevacantismo preserva a indefectibilidade da Igreja, enquanto a solução Ecclesia Dei equipara o Novus Ordo ao catolicismo (uma contradição) e a solução lefebvrista afirma que a Igreja promulgou coisas contrárias à fé (também uma contradição).",
      "Usando a analogia com a controvérsia entre Tomismo e Molinismo, o artigo demonstra que o sedevacantismo, embora deixe um mistério aberto (como a Sé pode ficar vacante por tanto tempo?), não cai em contradição lógica, ao contrário de suas rivais.",
      "A Igreja visível subsiste naqueles que professam publicamente a fé católica e aguardam um verdadeiro Pontífice Romano. Esta é a posição mais consistente com os princípios teológicos tradicionais.",
    ]),
  },
  {
    title: "Sedevacantistas não são cismáticos",
    author: "Diogo Rafael Moreira",
    publishedAt: "2021-03-25T10:15:00.000Z",
    excerpt: "Prova que o sedevacantismo não é cisma citando teólogos católicos como os Cardeais João de Lugo e Caetano, e os Padres Wernz, Szal e Vidal.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Cisma" }, { tag: "Direito Canônico" }],
    imageUrl: "https://controversiacatolica.wordpress.com/wp-content/uploads/2022/02/180c2-cardeal-merry-del-val.jpg",
    content: lexical([
      "Uma acusação frequente contra os sedevacantistas é que seriam cismáticos por recusarem reconhecer o ocupante da Sé de Pedro como verdadeiro Papa. No entanto, os maiores teólogos da Igreja afirmam que tal recusa, quando baseada em motivo razoável, não constitui cisma.",
      "O Cardeal Caetano ensina: 'Se alguém, por motivo razoável, tem a pessoa do Papa como suspeita e rejeita a sua presença e mesmo a sua jurisdição, não comete o crime de cisma nem qualquer outro.'",
      "Wernz-Vidal confirma: 'Aqueles que recusam obedecer ao Pontífice Romano por considerar a sua pessoa suspeita ou, dados os rumores em circulação, duvidosamente eleito, não podem ser considerados entre os cismáticos.'",
      "O Pe. Szal acrescenta: 'Não há cisma se alguém recusa obediência enquanto suspeita da pessoa do Papa ou da validade da sua eleição.' O Cardeal De Lugo chega à mesma conclusão.",
      "Portanto, mesmo que as figuras pós-conciliares fossem verdadeiros papas, os sedevacantistas ainda assim não seriam cismáticos segundo a teologia católica. A recusa baseada em dúvida fundada sobre a legitimidade do ocupante é teologicamente justificável.",
    ]),
  },
  {
    title: "Exposição Escolástica do Sedevacantismo",
    author: "Ir. Diogo Rafael Moreira",
    publishedAt: "2020-08-06T08:00:00.000Z",
    excerpt: "Uma síntese escolástica abrangente de todos os argumentos sedevacantistas, recolhidos ao longo de cinco anos de estudo, apresentados de maneira organizada com provas e referências.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Escolástica" }, { tag: "Teologia" }],
    content: lexical([
      "A definição nominal e real do sedevacantismo: do latim 'sedes' (sé, cátedra) e 'vacans' (vacante), é a posição dos católicos que creem que a Santa Sé está vacante pelo menos desde 1965, com o encerramento do Concílio Vaticano II.",
      "Este é o trabalho mais extenso e sistemático do autor sobre o tema. Apresenta um tratamento formal escolástico sintetizando argumentos de múltiplas fontes, provando brevemente e remetendo a estudos mais detalhados.",
      "A obra é dedicada a Mons. Daniel Dolan, Pe. Anthony Cekada, Pe. Rodrigo da Silva e aos pais do autor. Cobre a definição, os dois caminhos para o sedevacantismo (infalibilidade/indefectibilidade e heresia manifesta) e fornece extensa documentação teológica.",
      "O primeiro caminho demonstra que a Igreja é infalível e indefectível por promessa divina. Se a hierarquia pós-conciliar ensina erros contra a fé, ela não pode ser a hierarquia legítima da Igreja Católica.",
      "O segundo caminho demonstra que um herege manifesto não pode ser membro da Igreja, muito menos sua cabeça visível. Os ocupantes pós-conciliares da Sé de Pedro, tendo ensinado heresias manifestas, perderam ipso facto qualquer pretensão ao pontificado.",
    ]),
  },
  {
    title: "A popularidade do sedevacantismo",
    author: "Diogo Rafael Moreira",
    publishedAt: "2019-06-19T16:45:00.000Z",
    excerpt: "Comenta o fenômeno incomum da crescente popularidade do sedevacantismo na era de Bergoglio, notando que apesar de colocar almas em perigo, Francisco está abrindo os olhos de muitos.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Francisco" }, { tag: "Atualidade" }],
    imageUrl: "http://img.youtube.com/vi/B97FYpxGhck/0.jpg",
    content: lexical([
      "É um fenômeno incomum: o sedevacantismo nunca foi tão popular quanto na era de Bergoglio. Mesmo homens da hierarquia modernista, como Burke e Schneider, começaram a falar de heresia como impedimento ao exercício da autoridade na Igreja.",
      "Uma acusação comum é que o sedevacantismo seria 'protestantismo'. No entanto, a realidade é precisamente o oposto: todos os católicos condenam o protestantismo. Os modernistas — Paulo VI, João Paulo II, Bento XVI, Francisco — não condenam o protestantismo.",
      "As provas são claras: seis pastores protestantes ajudaram a criar a Nova Missa; Unitatis Redintegratio elogia os protestantes; João Paulo II elogiou a confissão protestante de Augsburgo; Bento XVI chamou Lutero de testemunha do Evangelho; Francisco erigiu uma estátua honrando o apóstata protestante.",
      "Portanto, os únicos que verdadeiramente condenam o protestantismo são os sedevacantistas. Longe de ser protestantismo, o sedevacantismo é a posição mais consistentemente anti-protestante no espectro católico atual.",
      "A popularidade crescente do sedevacantismo não é motivo de celebração, mas de tristeza: ela reflete a profundidade da crise na Igreja. No entanto, é um sinal de que mais almas estão despertando para a realidade da situação eclesiástica.",
    ]),
  },
  {
    title: "Anti-Sedevacantismo na Era de Bergoglio — Pe. Anthony Cekada",
    author: "Pe. Anthony Cekada (trad. Diogo Rafael Moreira)",
    publishedAt: "2021-10-27T09:30:00.000Z",
    excerpt: "Os argumentos anti-sedevacantistas do campo R&R estão presos em dois atoleiros: citam os teólogos errados e abordam o problema errado.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Apologética" }, { tag: "Cekada" }],
    imageUrl: "http://img.youtube.com/vi/mFOHx1mIPfg/0.jpg",
    content: lexical([
      "O Pe. Cekada desmonta sistematicamente os argumentos anti-sedevacantistas. O primeiro atoleiro: os advogados R&R (Ferrara, Salza, McCall, Siscoe) citam Suárez, Caetano e João de São Tomás, que exigiriam um julgamento antes de depor um papa herege.",
      "No entanto, Belarmino rejeitou esta posição, concluindo que um papa manifestamente herege automaticamente deixa de ser papa. Até o século XX, todos os teólogos (Coronata, Beste, Vermeersch, Regatillo) seguiam unanimemente Belarmino. Isto foi confirmado no Vaticano I.",
      "A opinião também foi superada pela Bula Cum Ex Apostolatus Officio (1559) do Papa Paulo IV. A 'declaração' pelos cardeais é meramente um requisito processual para abrir caminho para uma nova eleição, não para depor.",
      "O segundo atoleiro: o argumento sedevacantista mudou. Um herege público não pode validamente tornar-se papa em primeiro lugar (lei divina), conforme Wernz-Vidal, Coronata, Badius, Cocchi, Sipos. As heresias de Bergoglio eram pré-existentes à sua eleição.",
      "A distinção entre o pecado e o crime canônico de heresia é crucial. A distinção entre herege material e formal é derrubada pela Mystici Corporis (1943) de Pio XII. Seis objeções de 'papa por defeito' são respondidas com autoridades teológicas. A verdadeira doença é o Vaticano II, não Bergoglio especificamente.",
    ]),
  },
  {
    title: "Sedevacantismo para Leigos",
    author: "Diogo Rafael Moreira",
    publishedAt: "2019-11-25T11:20:00.000Z",
    excerpt: "O sedevacantismo é uma conclusão teológica solidamente fundamentada na Sagrada Escritura, Santa Tradição, Liturgia Romana, Direito Canônico e Magistério da Igreja.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Leigos" }, { tag: "Catequese" }],
    imageUrl: "http://img.youtube.com/vi/mgLX_fPmm5E/0.jpg",
    content: lexical([
      "O sedevacantismo é uma conclusão teológica solidamente fundamentada na Sagrada Escritura, Santa Tradição, Liturgia Romana, Direito Canônico e Magistério da Igreja. Como as fontes são tão seguras, a conclusão é certíssima.",
      "No entanto, não se espera que o leigo beba diretamente das fontes. A fé requer a submissão da inteligência a um ministro de Deus, e portanto os simples fiéis devem receber a sã doutrina de pastores legítimos.",
      "O leigo deve compreender o Catecismo antes da Sagrada Teologia em todas as suas nuances. Este método de ensino veio do próprio Nosso Senhor, que sempre usou parábolas, e foi particularmente encorajado por São Pio X na encíclica Acerbo Nimis.",
      "O Pe. Rodrigo e o autor gravaram este vídeo explicando de maneira simplificada, a partir de pontos elementares da doutrina cristã — a verdadeira religião, os deveres de um cristão, as marcas da Igreja — as bases do sedevacantismo.",
      "O objetivo é ajudar os colaboradores a melhor compreender e explicar a situação aos menos instruídos, tornando acessível uma conclusão teológica que, embora complexa em suas fontes, é simples em sua lógica fundamental.",
    ]),
  },
  {
    title: "Imaculada Conceição e sedevacantismo",
    author: "Diogo Rafael Moreira",
    publishedAt: "2018-12-08T07:00:00.000Z",
    excerpt: "Assim como a Virgem Maria é a Imaculada Conceição, a Igreja Católica goza de uma prerrogativa comparável como Esposa Imaculada de Cristo — não pode ensinar erros em fé e moral.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Mariologia" }, { tag: "Indefectibilidade" }],
    imageUrl: "https://controversiacatolica.wordpress.com/wp-content/uploads/2018/12/murillo_immaculate_conception.jpg",
    content: lexical([
      "A Santíssima Virgem Maria é a Imaculada Conceição. Desta árvore sem pecado original procede o fruto bendito, Nosso Senhor Jesus Cristo. Da mesma forma, a Igreja Católica goza de uma prerrogativa comparável como Esposa Imaculada de Cristo — ela não pode ensinar erros em fé e moral nem estabelecer uma disciplina que conduza os fiéis ao erro.",
      "Citando o Pastor Aeternus (Vaticano I) e o Cardeal Billot sobre a infalibilidade da Igreja em matérias disciplinares universais, o autor argumenta que a Igreja unida à Cátedra de Pedro é indefectível, infalível e cheia de autoridade.",
      "O artigo critica três posições rivais: (1) a posição R&R blasfema contra esta prerrogativa ao afirmar que a disciplina oficial é defeituosa; (2) a escola da 'hermenêutica da continuidade' blasfema ao querer impor interpretação pessoal sobre posições oficialmente heréticas.",
      "(3) A posição de Mons. Lefebvre era uma dúvida entre as outras posições e o sedevacantismo, o que pode ter sido prudente outrora, mas está agora ultrapassada na era de Ratzinger e Bergoglio.",
      "A Igreja, como Maria, é imaculada. Se a hierarquia que governa a partir de Roma ensina erros contra a fé, esta hierarquia não é a verdadeira hierarquia da Igreja Católica. A conclusão sedevacantista é a única que preserva esta prerrogativa intacta.",
    ]),
  },
  {
    title: "Traição na Tradição: A verdadeira história do sedevacantismo",
    author: "Pe. Ricossa (trad. Pe. Hector Romero, pref. Diogo Rafael Moreira)",
    publishedAt: "2019-01-17T15:00:00.000Z",
    excerpt: "Responde ao artigo de Dom Williamson contra nove padres americanos expulsos da FSSPX em 1983 e demonstra que o sedevacantismo é mais antigo e mais fiel à Tradição que a posição da FSSPX.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "História" }, { tag: "FSSPX" }],
    imageUrl: "http://img.youtube.com/vi/LhDp5-QyN2w/0.jpg",
    content: lexical([
      "Este artigo responde ao escrito de Dom Williamson contra nove padres americanos (incluindo Mons. Daniel Dolan) expulsos da FSSPX em 1983, e demonstra que o sedevacantismo é mais antigo e mais fiel à Tradição que a posição tardia e inconsistente da FSSPX.",
      "A seção prefacial detalha cinco queixas específicas por trás da expulsão de 1983: imposição escandalosa das reformas litúrgicas de João XXIII no Seminário de Ridgefield; admissão inescrupulosa de padres ordenados no novo rito sem ordenação condicional; exigência de obediência indevida; expulsão sem base legal; e aceitação de anulações modernistas sem investigação.",
      "O artigo principal (do Pe. Ricossa) demonstra que o sedevacantismo existia já em 1962, antes mesmo do término do Vaticano II. Evidência chave: o livro 'Complot contra la Iglesia' (1962) de Maurice Pinay, distribuído a todos os Padres Conciliares.",
      "Os católicos mexicanos liderados pelo Pe. Sáenz y Arriaga; um panfleto de 1965 aos bispos declarando que 'somente um antipapa e um conciliábulo poderiam aprovar' a declaração Nostra Aetate; o Pe. Guérard des Lauriers e o Pe. Coache na França (1969).",
      "Posições sedevacantistas precoces também surgiram na Argentina, nos Estados Unidos (Dr. Kellner, 1967) e na Alemanha (Prof. Reinhard Lauth, 1969). O sedevacantismo, longe de ser uma reação tardia, foi uma das primeiras respostas teologicamente fundamentadas à revolução conciliar.",
    ]),
  },
  {
    title: "Sedevacantismo em Três Minutos",
    author: "Diogo Rafael Moreira",
    publishedAt: "2016-11-04T18:00:00.000Z",
    excerpt: "Sedevacantistas recusam reconhecer Jorge Bergoglio como verdadeiro papa, afirmando que a Sé de Pedro está vacante devido à apostasia da hierarquia após a promulgação dos documentos do Vaticano II.",
    tags: [{ tag: "Sedevacantismo" }, { tag: "Introdução" }, { tag: "Vídeo" }],
    imageUrl: "http://img.youtube.com/vi/7cSwXQmsEdQ/0.jpg",
    content: lexical([
      "O raciocínio sedevacantista é simples: comparando os ensinamentos da Igreja antes e depois do Vaticano II, revela-se uma mudança doutrinária substancial. Mas a Igreja Católica não pode sofrer tal mudança porque goza da assistência especial do Espírito Santo que a torna infalível e indefectível.",
      "Portanto, a hierarquia responsável pela ruptura doutrinária do Vaticano II carece de toda autoridade eclesiástica, o que significa que a Sé está vacante.",
      "Por que a Sé está vacante há tanto tempo? O Vaticano II criou uma nova religião mas não fundou juridicamente uma nova Igreja, de modo que a faculdade de eleger um papa ainda pertence aos cardeais. Como a heresia impede a jurisdição mas não o poder de designação (uma faculdade humana), a Sé permanecerá vacante até que um ou mais cardeais retornem à verdadeira fé.",
      "Por que Deus permite isto? Deus permite o mal para dele tirar um bem maior. A Sagrada Escritura fala de uma apostasia geral e da defecção do Ocidente cristão que ocasionará a conversão do povo judeu.",
      "Este foi o primeiro artigo publicado no blog Controvérsia Católica, apresentando de forma concisa a essência do argumento sedevacantista para aqueles que não conhecem o tema.",
    ]),
  },
]

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results: Array<{ id: unknown; title: string; image?: string }> = []

    for (const article of articles) {
      try {
        // Create article
        let mediaId: number | undefined
        if (article.imageUrl) {
          try {
            const resp = await fetch(article.imageUrl)
            if (resp.ok) {
              const buffer = Buffer.from(await resp.arrayBuffer())
              const ext = article.imageUrl.includes(".png") ? "png" : "jpg"
              const slug = article.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()
              const media = await payload.create({
                collection: "media",
                overrideAccess: true,
                data: { alt: article.title },
                file: { data: buffer, mimetype: `image/${ext === "png" ? "png" : "jpeg"}`, name: `cc-${slug}.${ext}`, size: buffer.length },
              })
              mediaId = media.id as number
            }
          } catch {}
        }

        const doc = await payload.create({
          collection: "articles",
          overrideAccess: true,
          data: {
            title: article.title,
            language: "pt",
            author: article.author,
            excerpt: article.excerpt,
            content: article.content as any,
            status: "published",
            publishedAt: article.publishedAt,
            tags: article.tags,
            ...(mediaId ? { featuredImage: mediaId } : {}),
          },
        })
        results.push({ id: doc.id, title: doc.title, image: mediaId ? `media=${mediaId}` : "none" })
      } catch (err: any) {
        results.push({ id: "ERR", title: article.title, image: err.message?.slice(0, 60) })
      }
    }

    return NextResponse.json({ success: true, count: results.length, articles: results })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
