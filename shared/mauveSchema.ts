/**
 * Mauve System3 Template Schema Definition
 * Defines the structure and available slots for Mauve-compatible shop designs
 */

export interface MauveTemplateSlot {
  name: string;
  type: "header" | "hero" | "productCard" | "footer" | "cms" | "checkout";
  editable: boolean;
  constraints?: Record<string, unknown>;
}

export interface EditableElement {
  id: string;
  type: "header" | "hero" | "productCard" | "footer" | "text" | "image" | "button" | "section";
  label: string;
  editable: boolean;
  properties: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    padding?: number;
    margin?: number;
    fontSize?: number;
    fontFamily?: string;
    borderRadius?: number;
    [key: string]: any;
  };
}

export interface MauveDesignConfig {
  // Color palette
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;

  // Typography
  fontFamily: string;
  fontSizeBase: number;
  fontSizeHeading: number;
  fontSizeSmall: number;

  // Spacing & Layout
  borderRadius: number;
  spacing: number;
  maxWidth: number;

  // Components
  buttonStyle: "rounded" | "square" | "pill";
  cardStyle: "flat" | "elevated" | "outlined";
  headerLayout: "minimal" | "standard" | "extended";

  // Trust & Compliance
  showABDABadge: boolean;
  showSSLBadge: boolean;
  showPaymentMethods: boolean;
  trustElements: string[];

  // Editable Elements
  editableElements?: EditableElement[];
}

export interface MauveTemplate {
  id: string;
  name: string;
  version: string;
  slots: MauveTemplateSlot[];
  defaultConfig: MauveDesignConfig;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Default Mauve System3 Template Schema
 */
export const DEFAULT_MAUVE_TEMPLATE: MauveTemplate = {
  id: "mauve-system3-default",
  name: "Mauve System3 Default",
  version: "1.0.0",
  slots: [
    {
      name: "header",
      type: "header",
      editable: true,
      constraints: {
        maxHeight: 120,
        minHeight: 60,
      },
    },
    {
      name: "hero",
      type: "hero",
      editable: true,
      constraints: {
        maxHeight: 500,
        minHeight: 200,
      },
    },
    {
      name: "productCards",
      type: "productCard",
      editable: true,
      constraints: {
        columns: [1, 2, 3, 4],
        cardHeight: "auto",
      },
    },
    {
      name: "footer",
      type: "footer",
      editable: true,
      constraints: {
        maxHeight: 300,
      },
    },
    {
      name: "checkout",
      type: "checkout",
      editable: false,
      constraints: {
        compliance: ["ABDA", "GDPR"],
      },
    },
  ],
  defaultConfig: {
    primaryColor: "#0F766E",
    secondaryColor: "#F5F5F5",
    accentColor: "#DC2626",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
    borderColor: "#E5E7EB",
    fontFamily: "Inter, sans-serif",
    fontSizeBase: 16,
    fontSizeHeading: 32,
    fontSizeSmall: 12,
    borderRadius: 8,
    spacing: 16,
    maxWidth: 1200,
    buttonStyle: "rounded",
    cardStyle: "elevated",
    headerLayout: "standard",
    showABDABadge: true,
    showSSLBadge: true,
    showPaymentMethods: true,
    trustElements: ["ABDA", "SSL", "PaymentMethods"],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Platform Types
 */
export const PLATFORMS = {
  mauve: {
    label: "Mauve System3",
    description: "Mauve System3 E-Commerce Plattform",
    icon: "🏥",
  },
  shopify: {
    label: "Shopify",
    description: "Shopify E-Commerce Plattform",
    icon: "🛍️",
  },
  woocommerce: {
    label: "WooCommerce",
    description: "WordPress WooCommerce Shop",
    icon: "📦",
  },
  shopware: {
    label: "Shopware",
    description: "Shopware E-Commerce Plattform",
    icon: "⚙️",
  },
};

/**
 * Shop Type Profiles
 */
export const SHOP_TYPES = {
  local: {
    label: "Lokale Apotheke",
    description: "Apotheke mit lokalem Fokus",
  },
  shipping: {
    label: "Versandapotheke",
    description: "Apotheke mit Versandservice",
  },
  specialty: {
    label: "Spezialsoriment",
    description: "Apotheke mit Spezialsoriment (Homöopathie, Pflege, etc.)",
  },
  fashion: {
    label: "Mode & Bekleidung",
    description: "Online-Shop für Mode und Bekleidung",
  },
  electronics: {
    label: "Elektronik",
    description: "Online-Shop für Elektronik und Technik",
  },
  beauty: {
    label: "Beauty & Kosmetik",
    description: "Online-Shop für Beauty und Kosmetik",
  },
  food: {
    label: "Lebensmittel",
    description: "Online-Shop für Lebensmittel und Getränke",
  },
  general: {
    label: "Allgemeiner Shop",
    description: "Allgemeiner Online-Shop",
  },
};

/**
 * Brand Profiles
 */
export const BRAND_PROFILES = {
  modern: {
    label: "Modern",
    description: "Zeitgenössisches, minimalistisches Design",
    config: {
      primaryColor: "#4F46E5",
      secondaryColor: "#F3F4F6",
      accentColor: "#EC4899",
      fontFamily: "Inter, sans-serif",
      buttonStyle: "rounded" as const,
      cardStyle: "flat" as const,
    },
  },
  classic: {
    label: "Klassisch",
    description: "Traditionelles, vertrauenswürdiges Design",
    config: {
      primaryColor: "#1E3A8A",
      secondaryColor: "#F9FAFB",
      accentColor: "#DC2626",
      fontFamily: "Georgia, serif",
      buttonStyle: "square" as const,
      cardStyle: "outlined" as const,
    },
  },
  medical: {
    label: "Medizinisch",
    description: "Professionelles, wissenschaftliches Design",
    config: {
      primaryColor: "#0369A1",
      secondaryColor: "#F0F9FF",
      accentColor: "#0EA5E9",
      fontFamily: "Inter, sans-serif",
      buttonStyle: "square" as const,
      cardStyle: "elevated" as const,
    },
  },
  emotional: {
    label: "Emotional",
    description: "Warmes, einladendes Design",
    config: {
      primaryColor: "#D97706",
      secondaryColor: "#FEF3C7",
      accentColor: "#F59E0B",
      fontFamily: "Trebuchet MS, sans-serif",
      buttonStyle: "pill" as const,
      cardStyle: "flat" as const,
    },
  },
};
