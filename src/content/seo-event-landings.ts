import { getCommonTranslations } from "../i18n";
import baseLandingContent from "../i18n/translations/landing/es.json";
import type { LandingPageContent, LocaleCode } from "../i18n/types";

export type SeoEventKey = "bodas" | "xv-anos" | "eventos-corporativos" | "eventos-sociales";

export const SEO_EVENT_KEYS: readonly SeoEventKey[] = [
  "bodas",
  "xv-anos",
  "eventos-corporativos",
  "eventos-sociales",
] as const;

export type SeoLandingLevel = "base" | "state" | "city";

export interface SeoLandingLocation {
  readonly level: SeoLandingLevel;
  readonly stateSlug?: "nuevo-leon";
  readonly stateLabel?: string;
  readonly citySlug?: string;
  readonly cityLabel?: string;
}

export interface SeoLandingPageData {
  readonly locale: LocaleCode;
  readonly canonicalPath: string;
  readonly alternatePaths: readonly { code: LocaleCode; href: string }[];
  readonly xDefaultPath: string;
  readonly content: LandingPageContent;
  readonly common: ReturnType<typeof getCommonTranslations>;
}

interface EventVariant {
  readonly label: string;
  readonly keyword: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly galleryHint: string;
}

const EVENT_VARIANTS: Record<SeoEventKey, EventVariant> = {
  bodas: {
    label: "Bodas",
    keyword: "decoración floral para bodas",
    image: "/eventos/img_0436.webp",
    imageAlt: "Decoración floral para bodas en Monterrey",
    galleryHint: "bodas",
  },
  "xv-anos": {
    label: "XV años",
    keyword: "decoración floral para XV años",
    image: "/eventos/img_0439.webp",
    imageAlt: "Decoración floral para XV años en Nuevo León",
    galleryHint: "XV años",
  },
  "eventos-corporativos": {
    label: "Eventos corporativos",
    keyword: "decoración floral para eventos corporativos",
    image: "/eventos/img_1122.webp",
    imageAlt: "Decoración floral para eventos corporativos en Monterrey",
    galleryHint: "corporativos",
  },
  "eventos-sociales": {
    label: "Eventos sociales",
    keyword: "decoración floral para eventos sociales",
    image: "/eventos/img_2829.webp",
    imageAlt: "Decoración floral para eventos sociales en Nuevo León",
    galleryHint: "sociales",
  },
};

const NUEVO_LEON_AREAS = [
  "Monterrey",
  "San Pedro Garza García",
  "San Nicolás de los Garza",
  "Guadalupe",
  "Apodaca",
  "Escobedo",
  "Santa Catarina",
  "García",
  "Santiago",
  "Juárez",
] as const;

const LANDING_BASE = baseLandingContent as unknown as LandingPageContent;

function getLocationLabel(location: SeoLandingLocation): string {
  if (location.level === "city" && location.cityLabel) {
    return `${location.cityLabel}, Nuevo León`;
  }

  if (location.stateLabel) {
    return location.stateLabel;
  }

  return "Nuevo León";
}

function getRoutePath(eventSlug: SeoEventKey, location: SeoLandingLocation): string {
  const segments: string[] = [eventSlug];

  if (location.level !== "base") {
    segments.push(location.stateSlug ?? "nuevo-leon");
  }

  if (location.level === "city" && location.citySlug) {
    segments.push(location.citySlug);
  }

  return `/${segments.join("/")}/`;
}

function getLocationAreas(location: SeoLandingLocation): string[] {
  if (location.level === "city" && location.cityLabel) {
    return [
      location.cityLabel,
      "San Pedro Garza García",
      "San Nicolás de los Garza",
      "Guadalupe",
      "Apodaca",
      "Escobedo",
      "Santa Catarina",
      "García",
      "Santiago",
      "Juárez",
    ];
  }

  return [...NUEVO_LEON_AREAS];
}

function localizeEventCopy(event: EventVariant, location: SeoLandingLocation): Pick<LandingPageContent, "metadata" | "hero" | "promise" | "conversionBand" | "whyUs" | "process" | "finalCta" | "serviceArea"> {
  const locationLabel = getLocationLabel(location);
  const titleKeyword = `${event.keyword} en ${locationLabel}`;
  const description = `${event.keyword} en ${locationLabel}. Diseñamos, producimos y montamos propuestas personalizadas para que tu evento se vea profesional, memorable y listo para convertir visitantes en leads.`;
  const serviceText = location.level === "city"
    ? `Atendemos ${location.cityLabel ?? locationLabel} y municipios cercanos de Nuevo León con diseño floral, producción y montaje profesional para eventos que necesitan verse impecables desde el primer vistazo.`
    : `Atendemos Nuevo León con cobertura en Monterrey, Apodaca, Santiago, San Nicolás, Escobedo, San Pedro, Guadalupe, Juárez, García y Santa Catarina.`;

  return {
    metadata: {
      title: `${titleKeyword} | Dilo con Flores`,
      description,
      ogTitle: `${titleKeyword} | Dilo con Flores`,
      ogDescription: description,
    },
    hero: {
      kicker: `Diseño floral para ${event.label} · ${locationLabel}`,
      title: titleKeyword,
      text: `Diseñamos, producimos y montamos ${event.keyword} para celebraciones en ${locationLabel}. Cuéntanos tu idea y te armamos una propuesta clara para cotizar, ajustar y llevar tu evento al siguiente nivel.`,
      primaryCta: "Quiero cotizar mi evento",
      secondaryCta: "Ver nuestra inspiración",
      trust: ["Diseño personalizado", "Montaje profesional", "Atención en Nuevo León"],
      image: {
        src: event.image,
        alt: event.imageAlt,
      },
    },
    promise: {
      kicker: "Lo hacemos completo",
      title: `No solo llevamos flores. Diseñamos cómo se va a sentir tu ${event.label.toLowerCase()}.`,
      text: `Cada celebración comienza con una conversación. Escuchamos tu idea, conocemos el espacio y entendemos la atmósfera que imaginas para crear una propuesta floral pensada especialmente para ${event.label.toLowerCase()} en ${locationLabel}. Nos encargamos del diseño, la producción, la logística y el montaje para que tú puedas concentrarte en disfrutar.`,
      cta: "Solicitar propuesta",
      proposal: {
        title: "Propuesta personalizada",
        subtitle: `Creada de acuerdo con tu ${event.label.toLowerCase()} y presupuesto`,
      },
      postIt: {
        caption: "Atención al detalle",
        title: "Todo listo antes de que lleguen tus invitados",
        description: "Supervisamos personalmente el montaje para cuidar que cada espacio conserve la misma intención y nivel de detalle.",
      },
      imageAlt: `Equipo montando decoración floral para ${event.label.toLowerCase()} en ${locationLabel}`,
      capabilities: [
        {
          number: "01",
          title: "Concepto floral",
          description: `Paleta, selección de flores, estilo y dirección visual pensados especialmente para ${event.label.toLowerCase()} en ${locationLabel}.`,
        },
        {
          number: "02",
          title: "Producción completa",
          description: "Ramos, centros de mesa, arcos, accesos, mesa principal y cada elemento que requiera el proyecto.",
        },
        {
          number: "03",
          title: "Logística y montaje",
          description: "Preparamos, transportamos e instalamos todo para que el día del evento tú solo tengas que disfrutar.",
        },
      ],
    },
    conversionBand: {
      text: `${event.label} íntimos, montajes completos y producciones para eventos grandes en ${locationLabel}. Pide una propuesta hecha a tu medida.`,
      cta: "Cotizar proyecto",
    },
    whyUs: {
      kicker: "Por qué elegirnos",
      title: `La tranquilidad de saber que cada detalle de tu ${event.label.toLowerCase()} está cuidado.`,
      text: `Desde la primera conversación hasta el montaje final, te acompañamos para definir cada detalle, anticipar necesidades y llevar tu propuesta a la realidad con orden y tranquilidad en ${locationLabel}.`,
      bullets: [
        `Una propuesta diseñada especialmente para ${event.label.toLowerCase()} en ${locationLabel}.`,
        "Asesoría para definir flores, colores, espacios y estilo.",
        "Comunicación directa durante toda la planeación.",
        "Coordinación y montaje cuidadoso el día del evento.",
      ],
      cta: `Cuéntanos sobre tu ${event.label.toLowerCase()}`,
      imageAlt: `Montaje floral para ${event.label.toLowerCase()} en Nuevo León`,
    },
    process: {
      kicker: "Así trabajamos",
      title: `Un proceso claro para llegar tranquilos al gran día de tu ${event.label.toLowerCase()}.`,
      text: `Te guiamos paso a paso para convertir ideas, referencias y necesidades en una propuesta ejecutable que puedas cotizar con tranquilidad en ${locationLabel}.`,
      steps: [
        {
          caption: "Primer contacto",
          title: "Empezamos por conocerte",
          subtitle: "Antes de hablar de flores, queremos entender tu historia.",
          description: `Cada ${event.label.toLowerCase()} comienza con una conversación. Queremos conocer qué estás celebrando, quiénes son los protagonistas, cómo imaginas ese día y qué emociones quieres transmitir. También hablamos del lugar, el número de invitados y el presupuesto para construir una propuesta que realmente tenga sentido para ti.`,
        },
        {
          caption: "Diseño de la propuesta",
          title: "Creamos una propuesta pensada para tu evento",
          subtitle: "Cada detalle tiene una intención y una razón de estar ahí.",
          description: `Transformamos toda la información en un concepto floral integral. Seleccionamos flores, colores, texturas y elementos decorativos para crear una propuesta coherente con tu estilo. Cuando es necesario, visitamos el lugar para validar medidas, iluminación, accesos y cualquier detalle técnico en ${locationLabel}.`,
        },
        {
          caption: "Afinando el proyecto",
          title: "Perfeccionamos cada detalle contigo",
          subtitle: "Queremos que tengas claridad sobre todo lo que recibirás.",
          description: "Revisamos juntos la propuesta, resolvemos tus dudas y realizamos los ajustes necesarios hasta que cada elemento refleje lo que imaginas. Tendrás claridad sobre qué incluye el proyecto, cómo se distribuirán los elementos y qué sucederá durante el montaje.",
        },
        {
          caption: "Detrás de escena",
          title: "Nos encargamos de toda la preparación",
          subtitle: "Mientras tú continúas con tu evento, nosotros hacemos que todo suceda.",
          description: "Coordinamos las flores, la elaboración de cada arreglo, los materiales, la logística, el transporte y el equipo de montaje. Cada pieza se prepara cuidadosamente y organizamos los tiempos para que todo llegue en perfectas condiciones.",
        },
        {
          caption: "Día del evento",
          title: "Tú disfrutas. Nosotros nos ocupamos del resto.",
          subtitle: "Nuestro trabajo es que tú solo tengas que vivir el momento.",
          description: "Llegamos con anticipación para realizar el montaje, supervisar cada espacio y asegurarnos de que todo luzca como fue planeado. Coordinamos los últimos detalles antes de que lleguen tus invitados para que puedas disfrutar con la tranquilidad de saber que todo está bajo control.",
        },
      ],
    },
    finalCta: {
      kicker: `Tu ${event.label.toLowerCase()} merece una propuesta profesional`,
      title: `Cuéntanos qué imaginas para ${locationLabel} y lo aterrizamos contigo.`,
      cta: "Solicitar propuesta",
    },
    serviceArea: {
      kicker: "Cobertura local",
      title: `Atendemos ${locationLabel} y municipios cercanos de Nuevo León`,
      text: serviceText,
      areasLabel: "Municipios con cobertura",
      areas: getLocationAreas(location),
    },
  };
}

function overlayContent(base: LandingPageContent, event: EventVariant, location: SeoLandingLocation): LandingPageContent {
  const content = structuredClone(base) as any;
  const localized = localizeEventCopy(event, location);

  content.metadata = localized.metadata;
  content.hero = localized.hero;
  content.promise = localized.promise;
  content.conversionBand = localized.conversionBand;
  content.whyUs = localized.whyUs;
  content.process = localized.process;
  content.finalCta = localized.finalCta;
  content.serviceArea = localized.serviceArea;

  content.inspiration = {
    ...content.inspiration,
    kicker: location.level === "city" ? "Inspiración local" : "Inspiración",
    title: `${event.label} con presencia y detalle para ${getLocationLabel(location)}.`,
    text: `Una selección de montajes que pueden servir de referencia para ${event.keyword} en ${getLocationLabel(location)}.`,
    album: content.inspiration.album.map((item: LandingPageContent["inspiration"]["album"][number]) => ({
      ...item,
      alt: `${item.alt} · ${event.label}`,
      subtitle: `${item.subtitle} · ${getLocationLabel(location)}`,
      tags: item.tags,
    })),
  };

  content.gallery = {
    ...content.gallery,
    kicker: "Galería",
    title: `Proyectos pensados para inspirar ${event.label.toLowerCase()} en ${getLocationLabel(location)}.`,
    text: `Explora una selección de montajes, ceremonias, centros de mesa y accesos que ayudan a visualizar cómo puede lucir tu evento.`,
    items: content.gallery.items.map((item: LandingPageContent["gallery"]["items"][number]) => ({
      ...item,
      alt: `${item.alt} · ${event.label}`,
      subtitle: `${item.subtitle} · ${getLocationLabel(location)}`,
    })),
  };

  content.form = {
    ...content.form,
    kicker: `Cotiza tu ${event.label.toLowerCase()}`,
    title: `Cuéntanos qué necesitas para tu ${event.label.toLowerCase()} en ${getLocationLabel(location)}`,
    text: `Nos compartes algunos detalles y te regresamos una propuesta pensada para ${event.keyword} con cobertura en ${getLocationLabel(location)}.`,
    steps: content.form.steps.map((step: LandingPageContent["form"]["steps"][number], index: number) => ({
      ...step,
      copy:
        index === 0
          ? `Ahora queremos entender el contexto de tu ${event.label.toLowerCase()}: el número de invitados, el municipio donde se realizará y si ya cuentas con un salón para tu evento.`
          : step.copy,
    })),
  };

  content.footer = {
    ...content.footer,
    description: `${event.keyword} en ${getLocationLabel(location)} con atención personalizada, montaje profesional y acompañamiento de principio a fin.`,
  };

  return content as LandingPageContent;
}

export function getSeoLandingPage(event: SeoEventKey, location: SeoLandingLocation, locale: LocaleCode = "es"): SeoLandingPageData {
  const variant = EVENT_VARIANTS[event];
  const content = overlayContent(LANDING_BASE, variant, location);
  const canonicalPath = getRoutePath(event, location);
  const common = getCommonTranslations(locale);

  return {
    locale,
    canonicalPath,
    alternatePaths: [{ code: locale, href: canonicalPath }],
    xDefaultPath: canonicalPath,
    content,
    common,
  };
}

export function getSeoLandingPaths(event: SeoEventKey): Array<{ params: Record<string, string> }> {
  const eventBase = [{ params: { event } }];
  const statePath = [{ params: { event, state: "nuevo-leon" } }];
  const cityPaths = NUEVO_LEON_AREAS.map((city) => ({
    params: {
      event,
      state: "nuevo-leon",
      municipio: city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-"),
    },
  }));

  return [...eventBase, ...statePath, ...cityPaths];
}

export function getSeoLandingCityPaths(event: SeoEventKey): Array<{ params: Record<string, string> }> {
  return NUEVO_LEON_AREAS.map((city) => ({
    params: {
      event,
      state: "nuevo-leon",
      municipio: city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-"),
    },
  }));
}

export function getSeoLandingLocationFromParams(params: Record<string, string | undefined>): SeoLandingLocation {
  const state = params.state;
  const city = params.municipio;

  if (city) {
    const cityLabel = NUEVO_LEON_AREAS.find((item) => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") === city) ?? city;

    return {
      level: "city",
      stateSlug: "nuevo-leon",
      stateLabel: "Nuevo León",
      citySlug: city,
      cityLabel,
    };
  }

  if (state) {
    return {
      level: "state",
      stateSlug: "nuevo-leon",
      stateLabel: "Nuevo León",
    };
  }

  return {
    level: "base",
  };
}

export function getSeoLandingPath(event: SeoEventKey, location: SeoLandingLocation): string {
  return getRoutePath(event, location);
}
