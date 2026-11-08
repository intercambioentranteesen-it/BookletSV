import type { Experience, L, Zone } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });
const same = (v: string): L => ({ en: v, es: v });

/* Temas (etiquetas) */
const T = {
  beach: l("Beach", "Playa"),
  surf: l("Surf", "Surf"),
  hike: l("Hiking", "Senderismo"),
  falls: l("Waterfalls", "Cascadas"),
  food: l("Food", "Comida"),
  coffee: l("Coffee", "Café"),
  volcano: l("Volcanoes", "Volcanes"),
  lake: l("Lakes", "Lagos"),
  views: l("Viewpoints", "Miradores"),
  culture: l("Culture", "Cultura"),
  history: l("History", "Historia"),
  ruins: l("Archaeology", "Arqueología"),
  nature: l("Nature", "Naturaleza"),
  towns: l("Towns", "Pueblos"),
  boat: l("Boat rides", "Paseos en lancha"),
  cool: l("Cool weather", "Clima fresco"),
  camping: l("Camping", "Camping"),
  memory: l("Memory", "Memoria"),
  water: l("Water sports", "Deportes acuáticos"),
};

export const zonesMock: Zone[] = [
  {
    id: "coast",
    name: l("Coast", "Costa"),
    blurb: l("Surf breaks, calm bays and mangroves along the Pacific.", "Olas, bahías tranquilas y manglares a lo largo del Pacífico."),
    accent: "terra",
    shape: "circle",
  },
  {
    id: "west",
    name: l("West", "Occidente"),
    blurb: l("Volcanoes, coffee and towns covered in murals.", "Volcanes, café y pueblos llenos de murales."),
    accent: "copper",
    shape: "triangle",
  },
  {
    id: "center",
    name: l("Center", "Centro"),
    blurb: l("The capital, its volcano, its lake and Maya ruins.", "La capital, su volcán, su lago y ruinas mayas."),
    accent: "charcoal",
    shape: "rect",
  },
  {
    id: "north",
    name: l("North", "Norte"),
    blurb: l("Colonial hills and the highest peak in the country.", "Colinas coloniales y el pico más alto del país."),
    accent: "rust",
    shape: "quarter",
  },
  {
    id: "east",
    name: l("East", "Oriente"),
    blurb: l("Memory sites, waterfalls and a crater lake.", "Sitios de memoria, cascadas y una laguna de cráter."),
    accent: "clay",
    shape: "triangle",
  },
];

export const experiencesMock: Experience[] = [
  /* ───────────── COSTA ───────────── */
  {
    id: "surf-city",
    zone: "coast",
    image: "/fotos/sunsetpark-01.jpg",
    title: same("Surf City"),
    hook: l("Waves, sunsets and a beach town 45 minutes from the city.", "Olas, atardeceres y un pueblo de playa a 45 minutos de la ciudad."),
    intro: l(
      "The coast of La Libertad is where El Salvador surfs, eats seafood and watches the sun go down. It is also the easiest beach escape after a busy week.",
      "La costa de La Libertad es donde El Salvador surfea, come mariscos y ve caer el sol. También es la escapada de playa más fácil después de una semana intensa.",
    ),
    tags: [T.surf, T.beach, T.falls],
    stat: { value: 45, unit: l("min", "min"), label: l("from the city", "de la ciudad") },
    stops: [
      {
        id: "tunco",
        image: "/fotos/el-tunco.jpg",
        name: same("El Tunco & El Sunzal"),
        what: l(
          "The most visited surf beach in the country, with a lively promenade, good waves and sunsets. El Sunzal is the quieter neighbor, great for the sea breeze.",
          "La playa de surf más visitada del país, con paseo animado, buenas olas y atardeceres. El Sunzal es su vecina más tranquila, ideal para la brisa del mar.",
        ),
        details: l(
          "El Tunco takes its name from a rock formation that resembles a pig. Over time, the beach became one of El Salvador's best-known surf destinations, attracting visitors, local businesses and a lively international community. El Sunzal, nearby, is known for its long right-hand wave and a quieter atmosphere.",
          "El Tunco debe su nombre a una formación rocosa que recuerda a un cerdo. Con el tiempo, la playa se convirtió en uno de los destinos de surf más conocidos de El Salvador, atrayendo visitantes, negocios locales y una comunidad internacional. El Sunzal, a poca distancia, es conocido por su larga ola derecha y un ambiente más tranquilo.",
        ),
        tip: l("Nights and weekends are busy and social.", "Las noches y los fines de semana son animados y sociales."),
      },
      {
        id: "tamanique",
        image: "/fotos/tamaniquecascadas.jpg",
        name: l("Tamanique Waterfalls", "Cascadas de Tamanique"),
        what: l(
          "A trek through coffee plants and forest ends at natural pools and waterfalls. The descent is steep.",
          "Una caminata entre cafetales y bosque que termina en pozas y cascadas. El descenso es empinado.",
        ),
        details: l(
          "Tamanique is a mountain town whose landscape reflects the rural side of La Libertad. Its waterfalls are reached by trails through green hills and agricultural land. The journey is part of the experience: visitors get to see a side of the coast that goes beyond beaches and surfing.",
          "Tamanique es un pueblo de montaña cuyo paisaje refleja el lado rural de La Libertad. Sus cascadas se alcanzan por senderos entre colinas verdes y terrenos agrícolas. El recorrido también es parte de la experiencia: permite conocer una faceta de la costa que va más allá de las playas y el surf.",
        ),
        tip: l(
          "Go with a local guide. A hiking pole helps if your knees are sensitive.",
          "Ve con guía local. Un bastón ayuda si tienes las rodillas sensibles.",
        ),
      },
      {
        id: "malecon",
        image: "/fotos/puerto-la-lib.jpg",
        name: l("Puerto de La Libertad boardwalk", "Malecón del Puerto de La Libertad"),
        what: l(
          "A wide seaside walk with fresh fish, seafood stalls and plenty of local atmosphere.",
          "Un amplio malecón con pescado fresco, mariscos y mucho ambiente local.",
        ),
        details: l(
          "For generations, La Libertad has been closely connected to fishing and life by the Pacific Ocean. Its pier and surrounding market have traditionally brought together local fishermen, seafood vendors and visitors. Today, the Malecón blends that coastal identity with a renewed tourism scene, making it a place to experience both the everyday life and changing face of El Salvador's coastline.",
          "Durante generaciones, La Libertad ha estado estrechamente vinculada con la pesca y la vida junto al océano Pacífico. Su muelle y el mercado de sus alrededores han reunido tradicionalmente a pescadores, vendedores de mariscos y visitantes. Hoy, el Malecón combina esa identidad costera con una renovada oferta turística, permitiendo conocer tanto la vida cotidiana como la transformación de la costa salvadoreña.",
        ),
        tip: l("You can get there by public bus from San Salvador.", "Se llega en bus desde San Salvador."),
      },
    ],
  },
  {
    id: "east-beaches",
    zone: "coast",
    image: "/fotos/el-cuco.jpg",
    title: l("Eastern Beaches", "Playas del Oriente"),
    hook: l("Surf, long white sand and black-sand coves, away from the crowds.", "Surf, arena blanca interminable y calas de arena negra, lejos de las multitudes."),
    intro: l(
      "The far east is called the “Wild East” for a reason: fewer people, more space and a coast that runs from San Miguel to the Gulf of Fonseca.",
      "Al oriente le dicen “Oriente Salvaje” con razón: menos gente, más espacio y una costa que va de San Miguel al Golfo de Fonseca.",
    ),
    tags: [T.beach, T.surf, T.nature],
    stops: [
      {
        id: "las-flores",
        image: "/fotos/las-flores.jpg",
        name: l("Las Flores & El Cuco", "Las Flores y El Cuco"),
        what: l(
          "Las Flores has a world-class right-hand wave framed by rocky cliffs. A few kilometers away, El Cuco is a calm fishing-village beach, good for families.",
          "Las Flores tiene una ola derecha de calidad mundial entre farallones. A pocos kilómetros, El Cuco es una playa tranquila de pueblo pescador, buena para familias.",
        ),
        details: l(
          "Playa Las Flores is one of the most recognized surf destinations in eastern El Salvador. Its long, consistent right-hand point break attracts surfers from around the world, while the surrounding coastline remains closely connected to fishing and rural communities. Beyond surfing, the area offers a quieter way to experience the Pacific, with beautiful coastal scenery and a slower pace of life.",
          "Playa Las Flores es uno de los destinos de surf más reconocidos del oriente de El Salvador. Su larga y constante ola derecha atrae a surfistas de distintas partes del mundo, mientras que la costa que la rodea mantiene una estrecha conexión con las comunidades pesqueras y rurales. Más allá del surf, la zona ofrece una forma más tranquila de disfrutar el Pacífico, con paisajes costeros y un ritmo de vida más pausado.",
        ),
        tip: l("Buses run from San Miguel to El Cuco in about an hour.", "Hay buses de San Miguel a El Cuco en cerca de una hora."),
      },
      {
        id: "el-espino",
        image: "/fotos/el-espino.jpg",
        name: same("Playa El Espino"),
        what: l(
          "About 10 km of flat white sand in Usulután, inside the Jiquilisco Bay Ramsar site. Quiet on weekdays, lively on weekends.",
          "Unos 10 km de arena blanca y plana en Usulután, dentro del sitio Ramsar Bahía de Jiquilisco. Tranquila entre semana, animada los fines de semana.",
        ),
        details: l(
          "Playa El Espino is one of the longest beaches in El Salvador, located in the department of Usulután. Its wide coastline, warm waters and palm-lined landscapes make it a popular destination for families and visitors looking for a relaxed beach experience. Fishing and local commerce are also part of the area's identity, connecting tourism with the everyday life of coastal communities.",
          "Playa El Espino es una de las playas más extensas de El Salvador y se encuentra en el departamento de Usulután. Su amplia costa, aguas cálidas y paisajes rodeados de palmeras la convierten en un destino popular para familias y visitantes que buscan disfrutar de la playa con tranquilidad. La pesca y el comercio local también forman parte de la identidad de la zona, conectando el turismo con la vida cotidiana de las comunidades costeras.",
        ),
        tip: l(
          "Bus route 302 from San Salvador goes to Usulután (about $1.54 reported).",
          "La ruta 302 va de San Salvador a Usulután (unos $1.54 reportados).",
        ),
      },
      {
        id: "playas-negras",
        image: "/fotos/playas-negras-el-salvador01.jpg",
        name: l("Playas Negras & Playitas", "Playas Negras y Playitas"),
        what: l(
          "In La Unión: dark sand, rock pools and calm water. Playitas faces Conchagua volcano and Conchagüita island, with fresh seafood under beach huts.",
          "En La Unión: arena oscura, piscinas naturales y mar tranquilo. Playitas mira al volcán de Conchagua y la isla Conchagüita, con mariscos frescos en ramadas.",
        ),
        details: l(
          "Located in the Gulf of Fonseca, Playas Negras is known for its distinctive dark volcanic sand and rocky coastal formations. The landscape reflects El Salvador's volcanic origins and creates a striking contrast with the Pacific's blue waters. Its quieter surroundings offer visitors a chance to explore a less urbanized stretch of the eastern coastline.",
          "Ubicada en el Golfo de Fonseca, Playas Negras es conocida por su característica arena volcánica oscura y sus formaciones rocosas junto al mar. Su paisaje refleja el origen volcánico de El Salvador y crea un contraste particular con las aguas azules del Pacífico. Sus alrededores más tranquilos permiten explorar una zona menos urbanizada de la costa oriental.",
        ),
        tip: l("Tamarindo and El Maculís are nearby, with calm water for swimming.", "Tamarindo y El Maculís están cerca, con aguas calmadas para nadar."),
      },
    ],
  },
  {
    id: "gulf",
    zone: "coast",
    image: "/fotos/conch-2.jpg",
    title: l("Gulf & Mangroves", "Golfo y manglares"),
    hook: l("Islands by boat, a volcano with a view and mangrove channels.", "Islas en lancha, un volcán con vista y canales de manglar."),
    intro: l(
      "The far east is a different El Salvador: a volcanic archipelago in the Gulf of Fonseca and one of the country’s most important mangrove areas.",
      "El extremo oriente es otro El Salvador: un archipiélago volcánico en el Golfo de Fonseca y una de las zonas de manglar más importantes del país.",
    ),
    tags: [T.boat, T.views, T.nature, T.camping],
    stops: [
      {
        id: "gulf-islands",
        image: "/fotos/golfo-fo.jpg",
        name: l("Gulf of Fonseca islands", "Islas del Golfo de Fonseca"),
        what: l(
          "Boat tours leave from La Unión’s main pier to islands like Meanguera del Golfo and Conchagüita.",
          "Los tours en lancha salen del muelle principal de La Unión hacia islas como Meanguera del Golfo y Conchagüita.",
        ),
        details: l(
          "The Gulf of Fonseca is a shared maritime region bordered by El Salvador, Honduras and Nicaragua. Its Salvadoran islands, including Meanguera and Zacatillo, are known for their fishing communities, quiet beaches and volcanic landscapes. Life here follows the rhythm of the sea, and boat trips offer a closer look at the region's biodiversity and coastal traditions.",
          "El Golfo de Fonseca es una región marítima compartida por El Salvador, Honduras y Nicaragua. Sus islas salvadoreñas, entre ellas Meanguera y Zacatillo, destacan por sus comunidades pesqueras, playas tranquilas y paisajes de origen volcánico. Aquí la vida sigue el ritmo del mar, y los recorridos en lancha permiten conocer más de cerca la biodiversidad y las tradiciones costeras de la zona.",
        ),
        tip: l(
          "Public boats are limited. Arrange a tour or ask your hotel.",
          "Las lanchas públicas son limitadas. Coordina un tour o pregunta en tu hotel.",
        ),
      },
      {
        id: "conchagua",
        image: "/fotos/conch.jpg",
        name: l("Conchagua volcano viewpoints", "Miradores del volcán Conchagua"),
        what: l(
          "Above 1,200 m, Espíritu de la Montaña looks over the Gulf of Fonseca and the mountains of Honduras and Nicaragua. You can camp and watch the sunrise.",
          "A más de 1,200 m, Espíritu de la Montaña mira al Golfo de Fonseca y las montañas de Honduras y Nicaragua. Se puede acampar y ver el amanecer.",
        ),
        details: l(
          "Volcano Conchagua rises above the Gulf of Fonseca in southeastern El Salvador. Its elevated viewpoints offer remarkable views of the gulf, its islands and the neighboring countries of Honduras and Nicaragua. The area is also home to rural communities whose lives are closely connected to agriculture and the surrounding natural environment.",
          "El volcán de Conchagua se eleva sobre el Golfo de Fonseca, en el sureste de El Salvador. Sus miradores ofrecen vistas impresionantes del golfo, sus islas y los países vecinos de Honduras y Nicaragua. La zona también alberga comunidades rurales cuya vida está estrechamente vinculada con la agricultura y el entorno natural.",
        ),
        tip: l("Expect wind and cooler air at the top.", "Espera viento y aire más fresco en la cima."),
      },
      {
        id: "jiquilisco",
        image: "/fotos/bahia-jiq.jpg",
        name: l("Jiquilisco Bay", "Bahía de Jiquilisco"),
        what: l(
          "Mangrove channels, islands and sunsets in Usulután, reached by boat from Puerto El Triunfo.",
          "Canales de manglar, islas y atardeceres en Usulután, a los que se llega en lancha desde Puerto El Triunfo.",
        ),
        details: l(
          "Jiquilisco Bay is one of El Salvador's most important coastal ecosystems and a UNESCO Biosphere Reserve. Its mangrove forests, estuaries and islands provide habitats for many species, including sea turtles and migratory birds. Local communities have a long relationship with these waters through fishing, shellfish gathering and conservation initiatives.",
          "La Bahía de Jiquilisco es uno de los ecosistemas costeros más importantes de El Salvador y forma parte de una Reserva de Biosfera reconocida por la UNESCO. Sus manglares, esteros e islas sirven de hábitat para numerosas especies, entre ellas tortugas marinas y aves migratorias. Las comunidades locales mantienen una relación histórica con estas aguas mediante la pesca, la recolección de mariscos y proyectos de conservación.",
        ),
        tip: l("Combine it with Playa El Espino on the same day.", "Combínala con Playa El Espino el mismo día."),
      },
    ],
  },

  /* ───────────── OCCIDENTE ───────────── */
  {
    id: "flower-route",
    zone: "west",
    image: "/fotos/ataco.jpg",
    title: same("Ruta de las Flores"),
    hook: l("Mural towns, food festivals and coffee on a mountain road.", "Pueblos con murales, ferias gastronómicas y café en una carretera de montaña."),
    intro: l(
      "A cool, green mountain road in western El Salvador, dotted with colorful towns, coffee farms and thermal springs.",
      "Una carretera de montaña fresca y verde en el occidente, con pueblos coloridos, fincas de café y aguas termales.",
    ),
    tags: [T.towns, T.coffee, T.food, T.culture],
    stops: [
      {
        id: "juayua",
        image: "/fotos/juayua.jpg",
        name: same("Juayúa"),
        what: l(
          "Known for its food festival, with local dishes in the main square.",
          "Conocido por su feria gastronómica, con platillos típicos en el parque central.",
        ),
                details: l(
          "Juayúa is part of El Salvador's Ruta de las Flores, a region known for its mountain scenery, coffee-growing heritage and colorful towns. Its name comes from Nahuat, reflecting the Indigenous linguistic heritage that remains part of the country's place names. The town is especially known for its weekend food festival, where visitors can discover traditional Salvadoran dishes and local flavors.",
          "Juayúa forma parte de la Ruta de las Flores, una región reconocida por sus paisajes montañosos, su tradición cafetalera y sus pueblos llenos de color. Su nombre tiene raíces náhuat, reflejo del patrimonio lingüístico indígena que permanece en muchos nombres de lugares del país. El pueblo es especialmente conocido por su festival gastronómico de fin de semana, donde se pueden descubrir platillos tradicionales y sabores locales.",
        ),
        tip: l("Confirm festival dates before you go.", "Confirma las fechas de la feria antes de ir."),
      },
      {
        id: "ataco",
        image: "/fotos/ataco.jpg",
        name: same("Concepción de Ataco"),
        what: l(
          "A bohemian town known for its colorful murals, crafts and cafés.",
          "Un pueblo bohemio conocido por sus murales coloridos, artesanías y cafés.",
        ),
                details: l(
          "Concepción de Ataco is a mountain town in the western highlands, known for its murals, colorful streets and coffee culture. Its architecture and traditions reflect layers of local history, while its artisan workshops preserve techniques passed down through generations. Walking through Ataco offers a glimpse into the everyday culture of El Salvador's highland communities.",
          "Concepción de Ataco es un pueblo de montaña ubicado en el occidente del país, conocido por sus murales, calles coloridas y cultura cafetalera. Su arquitectura y tradiciones reflejan distintas etapas de la historia local, mientras que sus talleres artesanales conservan técnicas transmitidas entre generaciones. Recorrer Ataco permite acercarse a la vida cotidiana y la cultura de las comunidades de las tierras altas salvadoreñas.",
        ),
      },
      {
        id: "coffee-springs",
        name: l("Coffee farms & hot springs", "Fincas de café y aguas termales"),
        what: l(
          "Tour a coffee farm near Apaneca, the country’s second-highest town, then relax in thermal pools.",
          "Recorre una finca de café cerca de Apaneca, la segunda ciudad más alta del país, y relájate en aguas termales.",
        ),
                details: l(
          "El Salvador's coffee heritage is closely tied to its volcanic highlands, where altitude, climate and fertile soils create favorable growing conditions. Coffee became a major part of the country's economy and shaped the development of many rural communities. Visiting a coffee farm offers a look at the process behind each cup, from cultivating and harvesting the cherries to processing and roasting the beans.",
          "La tradición cafetalera de El Salvador está estrechamente ligada a sus tierras altas de origen volcánico, donde la altitud, el clima y los suelos fértiles favorecen el cultivo. El café llegó a convertirse en una parte importante de la economía nacional e influyó en el desarrollo de numerosas comunidades rurales. Visitar una finca permite conocer el proceso detrás de cada taza, desde el cultivo y la recolección de las cerezas hasta el procesamiento y tostado de los granos.",
        ),
        tip: l(
          "Many day tours combine Ataco, a coffee farm and hot springs.",
          "Muchos tours de un día combinan Ataco, una finca de café y termas.",
        ),
      },
    ],
  },
  {
    id: "cerro-verde",
    zone: "west",
    image: "/fotos/ilamatepec.jpg",
    title: l("Cerro Verde & Volcanoes", "Cerro Verde y volcanes"),
    hook: l("Three volcanoes, a cloud forest and a crater lake.", "Tres volcanes, un bosque nuboso y una laguna de cráter."),
    intro: l(
      "Cerro Verde National Park is the gateway to the country’s best-known volcano landscape: hike, look, then cool off at Lake Coatepeque.",
      "El Parque Nacional Cerro Verde es la puerta al paisaje volcánico más conocido del país: camina, mira y refréscate en el lago de Coatepeque.",
    ),
    tags: [T.volcano, T.hike, T.lake, T.views],
    stat: { value: 2381, unit: l("m", "m"), label: l("Santa Ana volcano", "volcán de Santa Ana") },
    stops: [
      {
        id: "cerro-verde-park",
        image: "/fotos/cerro-verde.jpg",
        name: l("Cerro Verde National Park", "Parque Nacional Cerro Verde"),
        what: l(
          "Trails through cloud forest with hummingbirds, and views of Izalco, once nicknamed the “Lighthouse of the Pacific”.",
          "Senderos por bosque nuboso con colibríes y vistas al Izalco, al que llamaban el “Faro del Pacífico”.",
        ),
        tip: l("It is the usual starting point for the Santa Ana hike.", "Es el punto de partida habitual para subir al volcán de Santa Ana."),
      },
      {
        id: "santa-ana",
        image: "/fotos/ilamatepec.jpg",
        name: l("Santa Ana volcano (Ilamatepec)", "Volcán de Santa Ana (Ilamatepec)"),
        what: l(
          "The highest and most active volcano in the country. At the summit you walk the crater rim and see an emerald-green crater lake.",
          "El volcán más alto y activo del país. En la cima caminas el borde del cráter y ves una laguna verde esmeralda.",
        ),
        tip: l("Go on a guided tour. An early start avoids the heat.", "Ve con tour guiado. Salir temprano ayuda con el calor."),
      },
      {
        id: "coatepeque",
        image: "/fotos/coate.jpg",
        name: l("Lake Coatepeque", "Lago de Coatepeque"),
        what: l(
          "Almost 6 km long, formed in an old volcano crater. Swim, kayak or soak in the hot springs around the shore.",
          "De casi 6 km de largo, formado en el cráter de un antiguo volcán. Nada, haz kayak o relájate en las aguas termales de la orilla.",
        ),
        tip: l("Boat or jet-ski rides start around $20 for 20 minutes.", "Los paseos en lancha o moto acuática empiezan cerca de $20 por 20 minutos."),
      },
    ],
  },

  /* ───────────── CENTRO ───────────── */
  {
    id: "san-salvador",
    zone: "center",
    image: "/fotos/boqueron.jpg",
    title: l("San Salvador & its Volcano", "San Salvador y su volcán"),
    hook: l("A crater, a lookout and a historic center in one day.", "Un cráter, un mirador y un centro histórico en un día."),
    intro: l(
      "The capital sits on a volcano. In a single day you can stand at a crater rim, breathe cool mountain air and walk through colonial history.",
      "La capital está sobre un volcán. En un solo día puedes pararte en el borde de un cráter, respirar aire fresco de montaña y caminar por la historia colonial.",
    ),
    tags: [T.volcano, T.views, T.history],
    stops: [
      {
        id: "boqueron",
        image: "/fotos/boqueron.jpg",
        name: l("El Boquerón National Park", "Parque Nacional El Boquerón"),
        what: l(
          "Less than 30 minutes from the city: short trails, wildflowers and viewpoints over a huge volcanic crater.",
          "A menos de 30 minutos de la ciudad: senderos cortos, flores silvestres y miradores sobre un enorme cráter volcánico.",
        ),
        notice: l(
          "The glass lookout was damaged in the January 2025 earthquake. Check if it is open.",
          "El mirador de cristal se dañó en el sismo de enero de 2025. Confirma si está abierto.",
        ),
      },
      {
        id: "devils-door",
        image: "/fotos/puerta-del-diablo.jpg",
        name: l("Devil’s Door", "Puerta del Diablo"),
        what: l(
          "A rock formation in Los Planes de Renderos with wide views and cool air.",
          "Una formación rocosa en Los Planes de Renderos con vistas amplias y aire fresco.",
        ),
        tip: l("Little shade: bring water and sun protection.", "Hay poca sombra: lleva agua y protector solar."),
      },
      {
        id: "historic-center",
        image: "/fotos/cetroh.jpg",
        name: l("Historic Center", "Centro Histórico"),
        what: l(
          "The Metropolitan Cathedral (with Archbishop Romero’s crypt), the National Palace and the National Theatre, the oldest in Central America.",
          "La Catedral Metropolitana (con la cripta de Monseñor Romero), el Palacio Nacional y el Teatro Nacional, el más antiguo de Centroamérica.",
        ),
      },
    ],
  },
  {
    id: "archaeology",
    zone: "center",
    image: "/fotos/cultura-maya.jpg",
    title: l("Maya Archaeology", "Arqueología maya"),
    hook: l("A buried village, a pyramid site and a UNESCO World Heritage Site.", "Una aldea sepultada, un sitio de pirámides y un Patrimonio de la Humanidad."),
    intro: l(
      "El Salvador keeps Maya sites close to the capital. Day tours combine all three in a single trip.",
      "El Salvador conserva sitios mayas cerca de la capital. Hay tours de un día que combinan los tres en un solo viaje.",
    ),
    tags: [T.ruins, T.history, T.culture],
    stops: [
      {
        id: "joya",
        image: "/fotos/joya-de-ceren.jpg",
        name: same("Joya de Cerén"),
        what: l(
          "The country’s only UNESCO World Heritage Site: a Maya farming village buried by ash around 600 AD, nicknamed the “Pompeii of the Americas”.",
          "El único sitio Patrimonio de la Humanidad de la UNESCO del país: una aldea agrícola maya sepultada por ceniza hacia el año 600, llamada la “Pompeya de América”.",
        ),
      },
      {
        id: "san-andres",
        image: "/fotos/san-andres.jpg",
        name: same("San Andrés"),
        what: l(
          "A large pre-Hispanic Maya site with an acropolis and an on-site museum, less than 20 miles from the city.",
          "Un gran sitio maya prehispánico con acrópolis y museo, a menos de 32 km de la ciudad.",
        ),
      },
      {
        id: "tazumal",
        image: "/fotos/tazumal.jpg",
        name: same("Tazumal"),
        what: l(
          "In Chalchuapa, Santa Ana: a major Maya site, welcomed at the entrance by a big ceiba tree.",
          "En Chalchuapa, Santa Ana: un importante sitio maya, con una gran ceiba que recibe en la entrada.",
        ),
        tip: l("Foreign visitors paid about $3 at the last report.", "Los visitantes extranjeros pagaban cerca de $3 en el último reporte."),
      },
    ],
  },
  {
    id: "ilopango",
    zone: "center",
    image: "/fotos/ilopango.jpg",
    title: l("Lake Ilopango", "Lago de Ilopango"),
    hook: l("The country’s biggest lake, minutes from the capital.", "El lago más grande del país, a minutos de la capital."),
    intro: l(
      "Formed in a volcanic caldera, Ilopango covers about 72 km² and is around 230 m deep. It is the closest place to swap city noise for water.",
      "Formado en una caldera volcánica, Ilopango cubre unos 72 km² y tiene unos 230 m de profundidad. Es el lugar más cercano para cambiar el ruido de la ciudad por agua.",
    ),
    tags: [T.lake, T.water, T.boat],
    stops: [
      {
        id: "ilo-boat",
        image: "/fotos/lanchailo.jpg",
        name: l("Boat and ferry rides", "Paseos en lancha y ferri"),
        what: l(
          "Cross the lake by ferry or motorboat. Rides cost roughly $3 to $10 per person depending on the route.",
          "Cruza el lago en ferri o lancha. Los paseos cuestan entre $3 y $10 por persona según el recorrido.",
        ),
        tip: l(
          "The Rancho Municipal reopened in 2025 with a ferry, camping and pools.",
          "El Rancho Municipal reabrió en 2025 con ferri, camping y piscinas.",
        ),
      },
      {
        id: "ilo-water",
        image: "/fotos/ilo-kayak.jpg",
        name: l("Kayak, paddle and diving", "Kayak, remo y buceo"),
        what: l(
          "Kayak, stand-up paddle and jet ski, plus more than 25 dive spots.",
          "Kayak, surf de remo y jet ski, además de más de 25 puntos de buceo.",
        ),
      },
      {
        id: "ilo-views",
        image: "/fotos/miradoresilo.jpg",
        name: l("Lake viewpoints", "Miradores del lago"),
        what: l(
          "Scenic roads around the lake open wide views, and cafés with a view make good stops.",
          "Las carreteras panorámicas del lago abren vistas amplias y hay cafés con vista para parar.",
        ),
        notice: l(
          "Apulo Park closed for remodeling in November 2025. Check if it has reopened.",
          "El parque Apulo cerró por remodelación en noviembre de 2025. Confirma si ya reabrió.",
        ),
      },
    ],
  },

  /* ───────────── NORTE ───────────── */
  {
    id: "suchitoto",
    zone: "north",
    image: "/fotos/suchitotocasco.jpg",
    title: same("Suchitoto"),
    hook: l("Cobblestones, art and a lake in the hills.", "Adoquines, arte y un lago entre las colinas."),
    intro: l(
      "One of the most picturesque towns in the country: colonial streets, galleries and cafés, with a big reservoir below.",
      "Uno de los pueblos más pintorescos del país: calles coloniales, galerías y cafés, con un gran embalse abajo.",
    ),
    tags: [T.towns, T.culture, T.lake, T.falls],
    stops: [
      {
        id: "suchi-town",
        image: "/fotos/suchitotocasco.jpg",
        name: l("Colonial town", "Casco colonial"),
        what: l(
          "Wander the cobbled streets, the white Santa Lucía church, art workshops and cafés.",
          "Camina por las calles empedradas, la iglesia blanca de Santa Lucía, talleres de arte y cafés.",
        ),
        tip: l("The Alejandro Cotto art museum charges about $1 to $2.", "El museo de arte Alejandro Cotto cobra entre $1 y $2."),
      },
      {
        id: "suchi-lake",
        image: "/fotos/suchitlan.jpg",
        name: l("Lake Suchitlán by boat", "Lago Suchitlán en lancha"),
        what: l(
          "Boat rides and bird watching from Puerto San Juan.",
          "Paseos en lancha y observación de aves desde Puerto San Juan.",
        ),
        tip: l("Boat rides start around $5 per person.", "Los paseos en lancha empiezan cerca de $5 por persona."),
      },
      {
        id: "tercios",
        image: "/fotos/los-tercios.jpg",
        name: l("Los Tercios Waterfall", "Cascada Los Tercios"),
        what: l(
          "A waterfall close to town and a classic stop on a Suchitoto day trip.",
          "Una cascada cerca del pueblo y una parada clásica de un día en Suchitoto.",
        ),
      },
    ],
  },
  {
    id: "el-pital",
    zone: "north",
    image: "/fotos/pitalcima.jpg",
    title: same("El Pital"),
    hook: l("The highest point in the country, with cold air and clouds.", "El punto más alto del país, con frío y nubes."),
    intro: l(
      "At 2,730 m on the border with Honduras, El Pital is cold, foggy and green. Temperatures can drop to about 5 °C, so it feels like another country.",
      "A 2,730 m, en la frontera con Honduras, El Pital es frío, brumoso y verde. La temperatura puede bajar a unos 5 °C, así que parece otro país.",
    ),
    tags: [T.cool, T.hike, T.camping, T.nature],
    stat: { value: 2730, unit: l("m", "m"), label: l("highest point", "punto más alto") },
    stops: [
      {
        id: "rio-chiquito",
        image: "/fotos/rio-chiquito.jpg",
        name: same("Río Chiquito"),
        what: l(
          "The usual access point from San Ignacio, with hot food, warm clothes for sale and pick-ups up the hill.",
          "El punto de acceso habitual desde San Ignacio, con comida caliente, ropa de abrigo y pick-ups cerro arriba.",
        ),
        tip: l(
          "Take bus 119 from San Salvador’s Terminal de Oriente to San Ignacio, then bus 509 to Río Chiquito ($1.35).",
          "Toma el bus 119 en la Terminal de Oriente a San Ignacio y luego el bus 509 a Río Chiquito ($1.35).",
        ),
      },
      {
        id: "pena-rajada",
        image: "/fotos/pena-rajada.jpg",
        name: same("Peña Rajada"),
        what: l(
          "A split rock formation in the cloud forest, with views toward San Ignacio, La Palma, Honduras and Guatemala.",
          "Una formación rocosa partida en el bosque nuboso, con vistas hacia San Ignacio, La Palma, Honduras y Guatemala.",
        ),
        tip: l("Reached by a forest trail. Bring good shoes.", "Se llega por un sendero de bosque. Lleva buen calzado."),
      },
      {
        id: "summit",
        image: "/fotos/pitalcima.jpg",
        name: l("The summit", "La cima"),
        what: l(
          "The highest point of El Salvador, shared with Honduras, and a great place to camp under the stars.",
          "El punto más alto de El Salvador, compartido con Honduras, y un gran lugar para acampar bajo las estrellas.",
        ),
        tip: l("Pack warm layers.", "Lleva capas de abrigo."),
      },
    ],
  },

  /* ───────────── ORIENTE ───────────── */
  {
    id: "paz-route",
    zone: "east",
    image: "/fotos/ruta-de-paz.jpg",
    title: same("Ruta de Paz"),
    hook: l("Cool pine hills, memory sites and waterfalls in Morazán.", "Colinas de pino frescas, sitios de memoria y cascadas en Morazán."),
    intro: l(
      "Northern Morazán mixes history, nature and community. Plan at least two days: one for Perquín and El Mozote, one for the rivers and waterfalls of Arambala.",
      "El norte de Morazán mezcla historia, naturaleza y comunidad. Dedica al menos dos días: uno para Perquín y El Mozote, otro para los ríos y cascadas de Arambala.",
    ),
    tags: [T.history, T.memory, T.falls, T.cool],
    stops: [
      {
        id: "perquin",
        image: "/fotos/perquin.jpg",
        name: same("Perquín"),
        what: l(
          "A cool mountain town of pine and coffee. Visit the Museum of the Revolution, then climb the Perquín hill (about 15 minutes) for views of the Nahuaterique range.",
          "Un pueblo de montaña fresco entre pinos y café. Visita el Museo de la Revolución y sube al cerro de Perquín (unos 15 minutos) para ver la Sierra de Nahuaterique.",
        ),
        tip: l(
          "The tourist information point in Jocoaitique is open daily, 9 am to 5 pm.",
          "El punto de información turística en Jocoaitique abre todos los días, de 9 a. m. a 5 p. m.",
        ),
      },
      {
        id: "mozote",
        image: "/fotos/mozote.jpg",
        name: l("El Mozote memorial", "Memorial de El Mozote"),
        what: l(
          "A site of memory for the victims of the 1981 massacre, with plaques and spaces for the children who were killed.",
          "Un sitio de memoria para las víctimas de la masacre de 1981, con placas y espacios para las niñas y niños asesinados.",
        ),
        notice: l(
          "This is not a regular tourist stop. Visit with respect, avoid loud music or photos that trivialize the place and, if you can, ask a community guide to walk with you.",
          "No es una parada turística convencional. Visítalo con respeto, evita música fuerte o fotos que trivialicen el lugar y, si puedes, pide a un guía de la comunidad que te acompañe.",
        ),
      },
      {
        id: "arambala",
        image: "/fotos/las-pilas.jpg",
        name: l("Arambala: Río Sapo and waterfalls", "Arambala: Río Sapo y cascadas"),
        what: l(
          "Las Pilas (30 m) and La Olomina (26 m and 9 m) in Julia’s Natural Park, with natural pools, lookouts and camping.",
          "Las Pilas (30 m) y La Olomina (26 m y 9 m) en Julia’s Natural Park, con pozas naturales, miradores y camping.",
        ),
        tip: l("Entry was $5 for adults and $3 for children (2025 report).", "La entrada era de $5 adultos y $3 niños (reporte de 2025)."),
      },
    ],
  },
  {
    id: "alegria",
    zone: "east",
    image: "/fotos/alegra.jpg",
    title: same("Alegría"),
    hook: l("A green crater lake and a glass floor over the valley.", "Una laguna verde en un cráter y un piso de cristal sobre el valle."),
    intro: l(
      "A cool coffee town in Usulután, on the Tecapa–Chinameca range, with one of the best-known lakes in the east.",
      "Un pueblo cafetalero fresco en Usulután, sobre la sierra Tecapa-Chinameca, con uno de los lagos más conocidos del oriente.",
    ),
    tags: [T.lake, T.views, T.coffee, T.cool],
    stops: [
      {
        id: "laguna",
        image: "/fotos/alegra.jpg",
        name: l("Laguna de Alegría", "Laguna de Alegría"),
        what: l(
          "A turquoise-green sulfur lake inside the crater of Tecapa volcano, nicknamed “the Emerald of America” by Gabriela Mistral.",
          "Una laguna sulfurosa verde turquesa en el cráter del volcán Tecapa, a la que Gabriela Mistral llamó “la esmeralda de América”.",
        ),
        tip: l("A small entrance fee (about $1.25 in an older report).", "Entrada pequeña (cerca de $1.25 en un reporte anterior)."),
      },
      {
        id: "glass",
        image: "/fotos/miradorcris.jpg",
        name: l("Glass viewpoint, Finca Rauda", "Mirador de cristal, Finca Rauda"),
        what: l(
          "About 10 m of glass floor at 1,200 m above sea level, plus three more viewpoints.",
          "Unos 10 m de piso de cristal a 1,200 m sobre el nivel del mar, más otros tres miradores.",
        ),
      },
      {
        id: "coffee-town",
        image: "/fotos/cafe-alg.jpg",
        name: l("Coffee country", "Tierra de café"),
        what: l(
          "The area around Alegría and Santiago de María holds most of Usulután’s coffee farms.",
          "La zona de Alegría y Santiago de María concentra la mayoría de las fincas de café de Usulután.",
        ),
      },
    ],
  },
];
