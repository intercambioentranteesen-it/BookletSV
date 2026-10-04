import type { FlavorsContent, L } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });
const same = (v: string): L => ({ en: v, es: v });

export const flavorsMock: FlavorsContent = {
  title: l("Flavors and traditions", "Sabores y tradiciones"),
  intro: l(
    "Corn is the base of most of what you will eat here, and almost every month has a celebration.",
    "El maíz es la base de casi todo lo que vas a comer aquí, y casi todos los meses hay una celebración.",
  ),
  dishesTitle: l("What to eat", "Qué comer"),
  dishes: [
    {
      id: "pupusas",
      name: same("Pupusas"),
      kind: l("The everyday classic", "El clásico de todos los días"),
      text: l(
        "Thick corn or rice tortillas stuffed with cheese, beans or pork, always served with curtido and salsa. Revueltas are the favorite; cheese with loroco is the most distinctive.",
        "Tortillas gruesas de maíz o arroz rellenas de queso, frijoles o chicharrón, siempre con curtido y salsa. Las revueltas son las favoritas; la de queso con loroco es la más distintiva.",
      ),
      tip: l("Eat them with your hands. November 13 is National Pupusa Day.", "Se comen con las manos. El 13 de noviembre es el Día Nacional de la Pupusa."),
      accent: "terra",
      shape: "circle",
    },
    {
      id: "yuca",
      name: l("Yuca frita with chicharrón", "Yuca frita con chicharrón"),
      kind: l("A weekend favorite", "Favorito de fin de semana"),
      text: l(
        "Fried cassava with pork rinds, curtido and tomato salsa. Crispy outside, soft inside.",
        "Yuca frita con chicharrón, curtido y salsa de tomate. Crujiente por fuera, suave por dentro.",
      ),
      accent: "copper",
      shape: "rect",
    },
    {
      id: "panes",
      name: l("Panes con pavo", "Panes con pavo"),
      kind: l("Holiday food", "Comida de celebración"),
      text: l(
        "Bread rolls filled with turkey or chicken, tomato, cucumber, lettuce and sauce. They show up at holidays and family gatherings.",
        "Panes rellenos de pavo o pollo, tomate, pepino, lechuga y salsa. Aparecen en fiestas y reuniones familiares.",
      ),
      accent: "charcoal",
      shape: "triangle",
    },
    {
      id: "tamales",
      name: l("Tamales", "Tamales"),
      kind: l("Corn, wrapped", "Maíz envuelto"),
      text: l(
        "Corn masa with fillings such as chicken, steamed in leaves. You find them at markets, fairs and food stalls.",
        "Masa de maíz con rellenos como gallina, cocida al vapor en hojas. Se consiguen en mercados, ferias y ventas de comida.",
      ),
      accent: "rust",
      shape: "quarter",
    },
    {
      id: "atoles",
      name: l("Atol de elote and atol shuco", "Atol de elote y atol shuco"),
      kind: l("Warm drinks", "Bebidas calientes"),
      text: l(
        "Atol de elote is a sweet fresh-corn drink served hot. Atol shuco is made from fermented purple corn with alguashte, typical of festive early mornings in the towns.",
        "El atol de elote es una bebida dulce de maíz tierno que se sirve caliente. El atol shuco se hace con maíz morado fermentado y alguashte, típico de las alboradas festivas de los pueblos.",
      ),
      accent: "clay",
      shape: "circle",
    },
    {
      id: "quesadilla",
      name: l("Quesadilla and nuégados", "Quesadilla y nuégados"),
      kind: l("Sweets", "Dulces"),
      text: l(
        "Here a quesadilla is not a tortilla: it is a sweet, cheesy cake with sesame on top. Nuégados are yuca fritters served with panela syrup.",
        "Aquí la quesadilla no es una tortilla: es un pan dulce de queso con ajonjolí encima. Los nuégados son buñuelos de yuca con miel de panela.",
      ),
      accent: "terra",
      shape: "rect",
    },
    {
      id: "horchata",
      name: l("Horchata de morro", "Horchata de morro"),
      kind: l("A cold drink", "Bebida fría"),
      text: l(
        "Salvadoran horchata uses morro seeds, which give it a gray color and a nutty flavor. It is not the rice horchata you may know.",
        "La horchata salvadoreña se hace con semillas de morro, que le dan un color grisáceo y un sabor a nuez. No es la horchata de arroz que quizá conoces.",
      ),
      accent: "copper",
      shape: "triangle",
    },
    {
      id: "street",
      name: l("Elotes locos and mangoneadas", "Elotes locos y mangoneadas"),
      kind: l("Street snacks", "Antojitos de la calle"),
      text: l(
        "Elotes locos are tender corn on the cob with mayonnaise, salsa, mustard and grated cheese. A mangoneada is a fruit ice pop with chili, lime, salt and alguashte.",
        "Los elotes locos son mazorcas tiernas con mayonesa, salsa, mostaza y queso rallado. La mangoneada es una paleta de fruta con chile, limón, sal y alguashte.",
      ),
      accent: "charcoal",
      shape: "quarter",
    },
  ],
  festivalsTitle: l("A year of celebrations", "Un año de celebraciones"),
  festivalsIntro: l(
    "Dates can shift from year to year. Ask your buddy what is happening in the town where you live.",
    "Las fechas pueden cambiar de un año a otro. Pregúntale a tu buddy qué hay en el pueblo donde vivas.",
  ),
  festivals: [
    {
      id: "semana-santa",
      month: l("Mar–Apr", "Mar–abr"),
      title: l("Semana Santa", "Semana Santa"),
      text: l(
        "Holy Week, the week before Easter. Processions and street events; the beaches fill up.",
        "La semana antes de Pascua. Procesiones y actividades en las calles; las playas se llenan.",
      ),
    },
    {
      id: "dia-de-la-cruz",
      month: l("May", "May"),
      day: "3",
      title: l("Día de la Cruz", "Día de la Cruz"),
      text: l(
        "Crosses are decorated with paper chains and given offerings of fruit, candy and candles.",
        "Se decoran cruces con cadenas de papel y se les ofrecen frutas, dulces y velas.",
      ),
    },
    {
      id: "flores-palmas",
      month: l("May", "May"),
      title: l("Flower and Palm Festival", "Festival de las Flores y Palmas"),
      where: l("Panchimalco", "Panchimalco"),
      text: l("Floral arrangements and garlands, with music and traditional dress.", "Arreglos florales y guirnaldas, con música y trajes tradicionales."),
    },
    {
      id: "fiestas-julias",
      month: l("Jul", "Jul"),
      title: l("Fiestas Julias", "Fiestas Julias"),
      where: l("Santa Ana", "Santa Ana"),
      text: l("The patron-saint celebration of Santa Ana, in the last week of July.", "Las fiestas patronales de Santa Ana, en la última semana de julio."),
    },
    {
      id: "agostinas",
      month: l("Aug", "Ago"),
      title: l("Fiestas Agostinas", "Fiestas Agostinas"),
      where: l("San Salvador", "San Salvador"),
      text: l(
        "In the first week of August the capital celebrates its patron saint. A marching band wakes the city at 4 a.m., followed by parades, sports, food and art.",
        "En la primera semana de agosto la capital celebra a su patrono. Una banda despierta a la ciudad a las 4 a. m., y siguen desfiles, deportes, comida y arte.",
      ),
    },
    {
      id: "bolas-de-fuego",
      month: l("Aug", "Ago"),
      day: "31",
      title: l("Bolas de Fuego", "Bolas de Fuego"),
      where: l("Nejapa", "Nejapa"),
      text: l(
        "Two teams throw flaming rag balls at each other on the main street. The tradition commemorates a volcanic eruption and more than 100 years of history.",
        "Dos bandos se lanzan bolas de trapo encendidas en la calle principal. La tradición recuerda una erupción volcánica y tiene más de 100 años.",
      ),
      notice: l(
        "Local authorities advise against synthetic clothing and shorts, and against bringing children or older adults. Follow the instructions of emergency staff.",
        "Las autoridades recomiendan no usar ropa sintética ni prendas cortas, y no llevar niñas, niños ni adultos mayores. Sigue las instrucciones del personal de emergencia.",
      ),
    },
    {
      id: "independencia",
      month: l("Sep", "Sep"),
      day: "15",
      title: l("Independence Day", "Día de la Independencia"),
      text: l(
        "Parades, flags and fireworks across the country; the biggest celebrations are in San Salvador.",
        "Desfiles, banderas y fuegos artificiales en todo el país; las celebraciones más grandes son en San Salvador.",
      ),
    },
    {
      id: "dia-de-la-pupusa",
      month: l("Nov", "Nov"),
      day: "13",
      title: l("National Pupusa Day", "Día Nacional de la Pupusa"),
      text: l("The national dish gets its own day. Expect lines at the pupuserías.", "El platillo nacional tiene su propio día. Espera filas en las pupuserías."),
    },
    {
      id: "carnaval-san-miguel",
      month: l("Nov", "Nov"),
      title: l("Carnaval de San Miguel", "Carnaval de San Miguel"),
      where: l("San Miguel", "San Miguel"),
      text: l("A week of live music and dancing in the last week of November.", "Una semana de música en vivo y baile en la última semana de noviembre."),
    },
  ],
};
