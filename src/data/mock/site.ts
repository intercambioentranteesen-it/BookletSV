import type { ClosingContent, HeroContent, JourneyContent, L } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });
const same = (v: string): L => ({ en: v, es: v });

export const heroMock: HeroContent = {
  organization: l("AIESEC in ESEN", "AIESEC en ESEN"),
  subOrganization: same("Incoming Exchange"),
  line1: l("Discover", "Descubre"),
  line2: same("El Salvador"),
  subtitle: l(
    "A small country in size, but giant in heart. Transform your life, and the lives of others, with AIESEC in ESEN.",
    "Un país pequeño en territorio, pero gigante en corazón. Transforma tu vida y la de otros con AIESEC en ESEN.",
  ),
  cta: l("Start exploring", "Empieza a explorar"),
};

export const journeyMock: JourneyContent = {
  title: l("You don’t arrive alone", "No llegas solo"),
  intro: l(
    "From the airport to your first day, someone is with you. What is included depends on the opportunity, so this is what AIESEC can arrange.",
    "Del aeropuerto a tu primer día, alguien va contigo. Lo que se incluye depende de la oportunidad, así que esto es lo que AIESEC puede organizar.",
  ),
  varies: l("Varies by opportunity", "Varía según la oportunidad"),
  steps: [
    {
      id: "airport",
      icon: "plane",
      shape: "triangle",
      accent: "terra",
      title: l("Airport pick-up", "Recibimiento en el aeropuerto"),
      text: l(
        "We can meet you at Comalapa airport (SAL) so your arrival is calm.",
        "Podemos recibirte en el aeropuerto de Comalapa (SAL) para que tu llegada sea tranquila.",
      ),
    },
    {
      id: "host",
      icon: "home",
      shape: "rect",
      accent: "copper",
      title: l("Host family", "Familia anfitriona"),
      text: l(
        "Cultural immersion: live with a local family and see the country from the inside.",
        "Inmersión cultural total: vive con una familia local y conoce el país desde adentro.",
      ),
    },
    {
      id: "buddy",
      icon: "buddy",
      shape: "circle",
      accent: "charcoal",
      title: l("Buddy system", "Sistema de buddy"),
      text: l(
        "Local support: a buddy who guides you and helps you feel at home.",
        "Acompañamiento local: un buddy que te guía y te ayuda a sentirte en casa.",
      ),
    },
    {
      id: "first-day",
      icon: "briefcase",
      shape: "quarter",
      accent: "clay",
      title: l("First-day support", "Apoyo el primer día"),
      text: l(
        "We go with you on your first day at work or at your project.",
        "Te acompañamos en tu primer día de trabajo o de proyecto.",
      ),
    },
    // ── A CONFIRMAR CON ICX: salen de los booklets de otros comités (Quito, Querétaro, Bolivia).
    //    Cuando ESEN confirme que lo ofrece, cambiar `hidden` a false.
    {
      id: "lead",
      icon: "lead",
      shape: "triangle",
      accent: "rust",
      hidden: true,
      title: l("Leadership sessions", "Sesiones de liderazgo"),
      text: l("Sessions to reflect on your experience and your own leadership.", "Sesiones para reflexionar sobre tu experiencia y tu propio liderazgo."),
    },
    {
      id: "outings",
      icon: "outing",
      shape: "circle",
      accent: "terra",
      hidden: true,
      title: l("Outings with AIESEC members", "Paseos con miembros de AIESEC"),
      text: l("Explore the country with members of the committee.", "Conoce el país junto a miembros del comité."),
    },
    {
      id: "meals",
      icon: "meal",
      shape: "rect",
      accent: "copper",
      hidden: true,
      title: l("Meals", "Comidas"),
      text: l("Some opportunities include one or more meals a day.", "Algunas oportunidades incluyen una o más comidas al día."),
    },
    {
      id: "certificate",
      icon: "award",
      shape: "quarter",
      accent: "clay",
      hidden: true,
      title: l("Certificate", "Certificado"),
      text: l("A certificate of your international experience.", "Un certificado de tu experiencia internacional."),
    },
  ],
};

export const closingMock: ClosingContent = {
  title: l("See you in El Salvador", "Nos vemos en El Salvador"),
  text: l(
    "Thanks for taking a look. There is far more to see here than fits in a booklet.",
    "Gracias por darte una vuelta. Aquí hay mucho más por ver de lo que cabe en un booklet.",
  ),
  // FASE 2: canales de contacto del comité (Instagram, WhatsApp, correo). Vacío = no se muestran.
  channels: [],
};
