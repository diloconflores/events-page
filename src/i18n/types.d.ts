export type LocaleCode = "es" | "en";

export interface LocaleConfig {
  readonly code: LocaleCode;
  readonly name: string;
  readonly nativeName: string;
  readonly enabled: boolean;
  readonly default: boolean;
  readonly direction: "ltr" | "rtl";
  readonly dateLocale: string;
}

export interface CommonTranslations {
  readonly siteLabel: string;
  readonly gatewayHeading: string;
  readonly gatewayLead: string;
  readonly languagePrompt: string;
  readonly languageSpanish: string;
  readonly languageEnglish: string;
  readonly skipLink: string;
  readonly homeLabel: string;
  readonly openMenuLabel: string;
  readonly closeMenuLabel: string;
  readonly primaryNavLabel: string;
}

export interface HomeMetadata {
  readonly title: string;
  readonly description: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
}

export interface CapabilityContent {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface MediaCardContent {
  readonly src: string;
  readonly alt: string;
  readonly title: string;
  readonly subtitle: string;
  readonly caption: string;
  readonly tag?: string;
}

export interface ProcessStepContent {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface ShopProductContent {
  readonly url: string;
  readonly title: string;
  readonly label: string;
  readonly image: string;
  readonly alt: string;
}

export interface FormOptionContent {
  readonly label: string;
  readonly value: string;
}

export interface LandingPageContent {
  readonly metadata: HomeMetadata;
  readonly brand: {
    readonly label: string;
    readonly division: string;
    readonly switcherLabel: string;
    readonly events: string;
    readonly occasions: string;
    readonly menuLabel: string;
    readonly selectedLabel: string;
  };
  readonly nav: {
    readonly service: string;
    readonly inspiration: string;
    readonly whyUs: string;
    readonly process: string;
    readonly quote: string;
    readonly cta: string;
  };
  readonly hero: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly trust: readonly string[];
    readonly image: {
      readonly src: string;
      readonly alt: string;
    };
  };
  readonly promise: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly cta: string;
    readonly proposal: {
      readonly title: string;
      readonly subtitle: string;
    };
    readonly postIt: {
      readonly caption: string;
      readonly title: string;
      readonly description: string;
    };
    readonly imageAlt: string;
    readonly capabilities: readonly CapabilityContent[];
  };
  readonly conversionBand: {
    readonly text: string;
    readonly cta: string;
  };
  readonly inspiration: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly album: readonly MediaCardContent[];
  };
  readonly whyUs: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly bullets: readonly string[];
    readonly cta: string;
    readonly imageAlt: string;
  };
  readonly process: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly steps: readonly ProcessStepContent[];
  };
  readonly alliances: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly label: string;
    readonly copy: string;
  };
  readonly gallery: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly visibleCount: number;
    readonly items: readonly MediaCardContent[];
  };
  readonly form: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly progress: readonly string[];
    readonly steps: readonly {
      readonly legend: string;
      readonly copy: string;
    }[];
    readonly labels: {
      readonly eventType: string;
      readonly eventDate: string;
      readonly guestCount: string;
      readonly municipality: string;
      readonly municipalityOther: string;
      readonly venue: string;
      readonly venueName: string;
      readonly spaces: string;
      readonly integralSpaces: string;
      readonly ideaState: string;
      readonly style: string;
      readonly styleOther: string;
      readonly colors: string;
      readonly ideaText: string;
      readonly inspirationUrl: string;
      readonly budget: string;
      readonly source: string;
      readonly additionalInfo: string;
      readonly contactName: string;
      readonly contactPhone: string;
      readonly contactEmail: string;
      readonly preferredContact: string;
      readonly privacy: string;
    };
    readonly placeholders: {
      readonly municipalityOther: string;
      readonly venueName: string;
      readonly styleOther: string;
      readonly colors: string;
      readonly ideaText: string;
      readonly inspirationUrl: string;
      readonly additionalInfo: string;
      readonly contactName: string;
      readonly contactPhone: string;
      readonly contactEmail: string;
    };
    readonly options: {
      readonly eventTypes: readonly FormOptionContent[];
      readonly guestCounts: readonly FormOptionContent[];
      readonly municipalities: readonly FormOptionContent[];
      readonly yesNoVenue: readonly FormOptionContent[];
      readonly spaces: readonly FormOptionContent[];
      readonly integralSpaces: readonly FormOptionContent[];
      readonly ideaStates: readonly FormOptionContent[];
      readonly styles: readonly FormOptionContent[];
      readonly budgets: readonly FormOptionContent[];
      readonly sources: readonly FormOptionContent[];
      readonly preferredContacts: readonly FormOptionContent[];
    };
    readonly messages: {
      readonly typeEvent: string;
      readonly dateEvent: string;
      readonly guestCount: string;
      readonly municipality: string;
      readonly municipalityOther: string;
      readonly venue: string;
      readonly spaces: string;
      readonly integralSpaces: string;
      readonly ideaState: string;
      readonly style: string;
      readonly styleOther: string;
      readonly ideaText: string;
      readonly inspirationUrl: string;
      readonly budget: string;
      readonly contactName: string;
      readonly contactPhone: string;
      readonly contactEmail: string;
      readonly preferredContact: string;
      readonly privacy: string;
      readonly errorTitle: string;
      readonly errorBody: string;
      readonly successKicker: string;
      readonly successTitle: string;
      readonly successText: string;
      readonly successButton: string;
      readonly submit: string;
      readonly next: string;
      readonly previous: string;
      readonly loading: string;
    };
  };
  readonly finalCta: {
    readonly kicker: string;
    readonly title: string;
    readonly cta: string;
  };
  readonly shop: {
    readonly kicker: string;
    readonly title: string;
    readonly text: string;
    readonly explore: string;
    readonly products: readonly ShopProductContent[];
    readonly footerText: string;
    readonly footerButton: string;
  };
  readonly footer: {
    readonly description: string;
    readonly contact: string;
    readonly explore: string;
    readonly email: string;
    readonly phone: string;
    readonly inspiration: string;
    readonly gallery: string;
    readonly quote: string;
  };
}

export type RouteKey = "home" | "weddings" | "events" | "contact";

export type RouteDictionary = Record<RouteKey, string>;
