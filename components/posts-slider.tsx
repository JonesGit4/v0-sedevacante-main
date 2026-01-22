"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useDevModal } from "@/lib/dev-modal-context"

const posts = {
  en: [
    {
      id: 1,
      title: "Where Peter Is, There Is the Church",
      excerpt:
        "Homily of Bishop Roy on the Imperfect General Council. During the Christmas season, I sent you a link to a story I wrote for bishops and priests to encourage them to consider the present situation of the Church. As we enter this new year, I think it is very important that we all reflect on these questions. So, this story was written in the form of a novella. Therefore, it was perhaps not as clear as it should have been for some of you. That is why I thought that today, on this first day of the year, I would address some of these subjects. You know that we are Catholics. We are Roman Catholics. That is our true name. We believe that the See of Peter is the center of our Catholic faith, the rock upon which the Church of our Lord Jesus Christ was established.",
      image: "/images/saint-peter-pope.jpg",
      author: "Bishop Roy",
      date: "January 1, 2026",
    },
    {
      id: 2,
      title: "The Importance of Latin Mass",
      excerpt: "Understanding why the traditional Latin Mass is essential to Catholic worship and spirituality.",
      image: "/traditional-latin-mass-priest-altar.jpg",
      author: "Fr. John Smith",
      date: "March 14, 2024",
    },
    {
      id: 3,
      title: "Sede Vacante: Understanding the Position",
      excerpt: "A comprehensive explanation of the Sedevacantist position and its theological foundations.",
      image: "/empty-papal-throne-vatican.jpg",
      author: "Fr. Michael Jones",
      date: "March 10, 2024",
    },
    {
      id: 4,
      title: "Traditional Catholic Family Life",
      excerpt: "Guidance on raising children in the traditional Catholic faith in modern times.",
      image: "/traditional-catholic-family-prayer.jpg",
      author: "Fr. Thomas Brown",
      date: "March 5, 2024",
    },
    {
      id: 5,
      title: "The Sacred Liturgy",
      excerpt: "Exploring the richness and beauty of traditional Catholic liturgical worship.",
      image: "/ornate-catholic-altar-traditional-mass.jpg",
      author: "Fr. David Wilson",
      date: "February 28, 2024",
    },
    {
      id: 6,
      title: "Defending the Faith",
      excerpt: "Apologetics and defense of traditional Catholic teaching against modernist errors.",
      image: "/ancient-catholic-theological-books.jpg",
      author: "Fr. Robert Taylor",
      date: "February 25, 2024",
    },
    {
      id: 7,
      title: "Marian Devotion",
      excerpt: "The role of devotion to Our Lady in the traditional Catholic spiritual life.",
      image: "/beautiful-virgin-mary-statue-church.jpg",
      author: "Fr. James Anderson",
      date: "February 20, 2024",
    },
  ],
  pt: [
    {
      id: 1,
      title: "Onde está Pedro, aí está a Igreja",
      excerpt:
        "Homilia de Dom Roy sobre o concílio geral imperfeito. Durante o tempo de Natal, enviei-vos um link para um relato que escrevi destinado aos bispos e aos padres para encorajá-los a considerar a situação presente da Igreja. Ao entrarmos neste novo ano, penso que é muito importante que todos reflitamos sobre estas questões. Portanto, esta história foi escrita sob a forma de uma novela. Por isso, talvez não tenha sido tão clara como deveria ter sido para alguns de vós. É por isso que pensei que hoje, neste primeiro dia do ano, abordaria alguns destes assuntos. Sabem que somos católicos. Somos católicos romanos. Este é o nosso verdadeiro nome. Acreditamos que a Sé de Pedro é o centro da nossa fé católica, a rocha sobre a qual foi estabelecida a Igreja de nosso Senhor Jesus Cristo.",
      image: "/images/saint-peter-pope.jpg",
      author: "Dom Roy",
      date: "1 de janeiro de 2026",
    },
    {
      id: 2,
      title: "A Importância da Missa Latina",
      excerpt: "Compreendendo por que a Missa Latina tradicional é essencial para o culto e espiritualidade católica.",
      image: "/traditional-latin-mass-priest-altar.jpg",
      author: "Pe. João Silva",
      date: "14 de março de 2024",
    },
    {
      id: 3,
      title: "Sede Vacante: Compreendendo a Posição",
      excerpt: "Uma explicação abrangente da posição sedevacantista e seus fundamentos teológicos.",
      image: "/empty-papal-throne-vatican.jpg",
      author: "Pe. Miguel Santos",
      date: "10 de março de 2024",
    },
    {
      id: 4,
      title: "Vida Familiar Católica Tradicional",
      excerpt: "Orientação sobre criar filhos na fé católica tradicional nos tempos modernos.",
      image: "/traditional-catholic-family-prayer.jpg",
      author: "Pe. Tomás Costa",
      date: "5 de março de 2024",
    },
    {
      id: 5,
      title: "A Sagrada Liturgia",
      excerpt: "Explorando a riqueza e beleza do culto litúrgico católico tradicional.",
      image: "/ornate-catholic-altar-traditional-mass.jpg",
      author: "Pe. David Almeida",
      date: "28 de fevereiro de 2024",
    },
    {
      id: 6,
      title: "Defendendo a Fé",
      excerpt: "Apologética e defesa do ensino católico tradicional contra erros modernistas.",
      image: "/ancient-catholic-theological-books.jpg",
      author: "Pe. Roberto Ferreira",
      date: "25 de fevereiro de 2024",
    },
    {
      id: 7,
      title: "Devoção Mariana",
      excerpt: "O papel da devoção a Nossa Senhora na vida espiritual católica tradicional.",
      image: "/beautiful-virgin-mary-statue-church.jpg",
      author: "Pe. Tiago Oliveira",
      date: "20 de fevereiro de 2024",
    },
  ],
  fr: [
    {
      id: 1,
      title: "« Là où est Pierre, là est l'Église »",
      excerpt:
        "Homélie de Mgr Roy sur le concile général imparfait. Durant le temps de Noël, je vous ai envoyé un lien vers un récit que j'ai écrit à l'intention des évêques et des prêtres pour les encourager à considérer la situation présente de l'Église. Alors que nous entrons dans cette nouvelle année, je pense qu'il est très important que nous réfléchissions tous à ces questions. Donc, cette histoire fut écrite sous la forme d'une nouvelle. Elle n'était donc peut-être pas aussi claire qu'elle devrait l'être pour certains d'entre vous. C'est pourquoi j'ai pensé qu'aujourd'hui, en ce premier jour de l'année, j'aborderais certains de ces sujets. Vous savez que nous sommes catholiques. Nous sommes catholiques romains. C'est notre véritable nom. Nous croyons que le Siège de Pierre est le centre de notre foi catholique, le roc sur lequel l'Église de notre Seigneur Jésus-Christ a été établie.",
      image: "/images/saint-peter-pope.jpg",
      author: "Mgr Roy",
      date: "1er janvier 2026",
    },
    {
      id: 2,
      title: "L'Importance de la Messe Latine",
      excerpt:
        "Comprendre pourquoi la Messe latine traditionnelle est essentielle au culte et à la spiritualité catholique.",
      image: "/traditional-latin-mass-priest-altar.jpg",
      author: "P. Jean Dupont",
      date: "14 mars 2024",
    },
    {
      id: 3,
      title: "Sede Vacante: Comprendre la Position",
      excerpt: "Une explication complète de la position sédévacantiste et de ses fondements théologiques.",
      image: "/empty-papal-throne-vatican.jpg",
      author: "P. Michel Bernard",
      date: "10 mars 2024",
    },
    {
      id: 4,
      title: "Vie Familiale Catholique Traditionnelle",
      excerpt: "Conseils pour élever des enfants dans la foi catholique traditionnelle à l'époque moderne.",
      image: "/traditional-catholic-family-prayer.jpg",
      author: "P. Thomas Martin",
      date: "5 mars 2024",
    },
    {
      id: 5,
      title: "La Sainte Liturgie",
      excerpt: "Explorer la richesse et la beauté du culte liturgique catholique traditionnel.",
      image: "/ornate-catholic-altar-traditional-mass.jpg",
      author: "P. David Laurent",
      date: "28 février 2024",
    },
    {
      id: 6,
      title: "Défendre la Foi",
      excerpt: "Apologétique et défense de l'enseignement catholique traditionnel contre les erreurs modernistes.",
      image: "/ancient-catholic-theological-books.jpg",
      author: "P. Robert Moreau",
      date: "25 février 2024",
    },
    {
      id: 7,
      title: "Dévotion Mariale",
      excerpt: "Le rôle de la dévotion à Notre-Dame dans la vie spirituelle catholique traditionnelle.",
      image: "/beautiful-virgin-mary-statue-church.jpg",
      author: "P. Jacques Petit",
      date: "20 février 2024",
    },
  ],
  es: [
    {
      id: 1,
      title: "Donde está Pedro, allí está la Iglesia",
      excerpt:
        "Homilía de Mons. Roy sobre el concilio general imperfecto. Durante el tiempo de Navidad, les envié un enlace a un relato que escribí para los obispos y los sacerdotes para alentarlos a considerar la situación presente de la Iglesia. Al entrar en este nuevo año, creo que es muy importante que todos reflexionemos sobre estas cuestiones. Entonces, esta historia fue escrita en forma de novela. Por lo tanto, quizás no fue tan clara como debería haber sido para algunos de ustedes. Es por eso que pensé que hoy, en este primer día del año, abordaría algunos de estos temas. Saben que somos católicos. Somos católicos romanos. Ese es nuestro verdadero nombre. Creemos que la Sede de Pedro es el centro de nuestra fe católica, la roca sobre la cual fue establecida la Iglesia de nuestro Señor Jesucristo.",
      image: "/images/saint-peter-pope.jpg",
      author: "Mons. Roy",
      date: "1 de enero de 2026",
    },
    {
      id: 2,
      title: "La Importancia de la Misa Latina",
      excerpt: "Comprender por qué la Misa Latina tradicional es esencial para el culto y la espiritualidad católica.",
      image: "/traditional-latin-mass-priest-altar.jpg",
      author: "P. Juan García",
      date: "14 de marzo de 2024",
    },
    {
      id: 3,
      title: "Sede Vacante: Compreendiendo la Posición",
      excerpt: "Una explicación completa de la posición sedevacantista y sus fundamentos teológicos.",
      image: "/empty-papal-throne-vatican.jpg",
      author: "P. Miguel Rodríguez",
      date: "10 de marzo de 2024",
    },
    {
      id: 4,
      title: "Vida Familiar Católica Tradicional",
      excerpt: "Orientación sobre criar hijos en la fe católica tradicional en los tiempos modernos.",
      image: "/traditional-catholic-family-prayer.jpg",
      author: "P. Tomás López",
      date: "5 de marzo de 2024",
    },
    {
      id: 5,
      title: "La Sagrada Liturgia",
      excerpt: "Explorando la riqueza y belleza del culto litúrgico católico tradicional.",
      image: "/ornate-catholic-altar-traditional-mass.jpg",
      author: "P. David Martínez",
      date: "28 de febrero de 2024",
    },
    {
      id: 6,
      title: "Defendiendo la Fe",
      excerpt: "Apologética y defensa de la enseñanza católica tradicional contra los errores modernistas.",
      image: "/ancient-catholic-theological-books.jpg",
      author: "P. Roberto Fernández",
      date: "25 de febrero de 2024",
    },
    {
      id: 7,
      title: "Devoción Mariana",
      excerpt: "El papel de la devoción a Nuestra Señora en la vida espiritual católica tradicional.",
      image: "/beautiful-virgin-mary-statue-church.jpg",
      author: "P. Santiago Sánchez",
      date: "20 de febrero de 2024",
    },
  ],
}

export function PostsSlider() {
  const { language, t } = useLanguage()
  const { showModal } = useDevModal()
  const content = posts[language]
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const mainArticle = content[0]
  const otherArticles = content.slice(1)

  return (
    <section id="articles" className="pt-4 pb-12 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.postsTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">{t.postsSubtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow bg-card border-border">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Image */}
              <div className="relative aspect-video md:aspect-square overflow-hidden md:rounded-l-lg rounded-t-lg md:rounded-tr-none">
                <Image
                  src={mainArticle.image || "/placeholder.svg"}
                  alt={mainArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right: Content */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-sans font-semibold text-foreground mb-3">
                    {mainArticle.title}
                  </h3>
                  <p className="text-muted-foreground font-serif text-base leading-relaxed mb-6">
                    {mainArticle.excerpt}
                  </p>
                  <a
                    href="/articles/where-peter-is"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary hover:text-primary/80 font-serif text-sm font-semibold mb-6"
                  >
                    {t.readArticle}...
                  </a>
                </div>

                {/* Author Info */}
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/bishop.png"
                        alt="Bishop Roy"
                        width={80}
                        height={80}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-serif font-semibold text-foreground mb-2">
                        {t.authorTitle}
                      </p>
                      <p className="text-xs font-serif text-muted-foreground leading-relaxed mb-2">
                        {t.authorBio}
                      </p>
                      <p className="text-xs font-serif text-muted-foreground leading-relaxed">
                        {t.authorMission}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4">
        <h3 className="text-xl font-sans font-semibold text-foreground mb-4">
          {language === "en"
            ? "More Articles"
            : language === "pt"
              ? "Mais Artigos"
              : language === "fr"
                ? "Plus d'Articles"
                : "Más Artículos"}
        </h3>

        {isMobile ? (
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
          >
            {otherArticles.map((post) => (
              <Card
                key={post.id}
                className="flex-shrink-0 w-[280px] hover:shadow-lg transition-shadow bg-card border-border snap-center"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-sans font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h4>
                    <p className="text-muted-foreground font-serif text-xs leading-relaxed mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-serif">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    <button
                      onClick={showModal}
                      className="mt-3 text-primary hover:text-primary/80 font-serif text-xs font-semibold"
                    >
                      {t.readArticle} →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {otherArticles.slice(0, 3).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow bg-card border-border">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-sans font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h4>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-serif">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    <button
                      onClick={showModal}
                      className="mt-4 text-primary hover:text-primary/80 font-serif text-sm font-semibold"
                    >
                      {t.readArticle} →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8 px-4">
        <button
          onClick={showModal}
          className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 font-serif font-semibold rounded transition-colors"
        >
          {t.seeAll}
        </button>
      </div>
    </section>
  )
}
