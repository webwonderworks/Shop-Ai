export const PLATFORMS = {
  mauve_system3: {
    name: "Mauve System3",
    icon: "🏥",
    description: "Apotheken-Plattform",
    slots: {
      header: {
        name: "Header",
        description: "Kopfbereich mit Logo und Navigation",
        editable: ["backgroundColor", "textColor", "logoSize", "navigationStyle"],
      },
      hero: {
        name: "Hero Section",
        description: "Großer Willkommensbereich",
        editable: ["backgroundColor", "textColor", "backgroundImage", "buttonStyle"],
      },
      products: {
        name: "Produktbereich",
        description: "Produktgrid und Kategorien",
        editable: ["gridColumns", "cardStyle", "cardShadow", "priceDisplay"],
      },
      footer: {
        name: "Footer",
        description: "Fußbereich mit Links und Info",
        editable: ["backgroundColor", "textColor", "columnLayout"],
      },
      sidebar: {
        name: "Sidebar",
        description: "Seitenleiste mit Kategorien",
        editable: ["backgroundColor", "textColor", "categoryStyle"],
      },
    },
    exportFormat: "json",
    apiEndpoint: "/api/export/mauve",
  },
  shopify: {
    name: "Shopify",
    icon: "🛍️",
    description: "E-Commerce-Plattform",
    slots: {
      header: {
        name: "Header",
        description: "Shopify Header/Navigation",
        editable: ["backgroundColor", "textColor", "logoSize", "cartStyle"],
      },
      hero: {
        name: "Hero Banner",
        description: "Großes Banner-Bild",
        editable: ["backgroundColor", "overlayOpacity", "textAlignment", "buttonStyle"],
      },
      products: {
        name: "Product Grid",
        description: "Produktanzeige",
        editable: ["gridColumns", "cardLayout", "pricePosition", "ratingDisplay"],
      },
      footer: {
        name: "Footer",
        description: "Shopify Footer",
        editable: ["backgroundColor", "textColor", "columnCount", "socialLinks"],
      },
      collection: {
        name: "Collection",
        description: "Kategorieseite",
        editable: ["filterStyle", "sortOptions", "productPerPage"],
      },
    },
    exportFormat: "liquid",
    apiEndpoint: "/api/export/shopify",
  },
  woocommerce: {
    name: "WooCommerce",
    icon: "🏪",
    description: "WordPress E-Commerce",
    slots: {
      header: {
        name: "Header",
        description: "WordPress Header",
        editable: ["backgroundColor", "textColor", "menuStyle", "searchBar"],
      },
      hero: {
        name: "Hero Section",
        description: "Willkommensbereich",
        editable: ["backgroundColor", "textColor", "parallaxEffect", "buttonStyle"],
      },
      products: {
        name: "Product Listing",
        description: "WooCommerce Produkte",
        editable: ["gridColumns", "productCardStyle", "filterDisplay", "sortDisplay"],
      },
      footer: {
        name: "Footer",
        description: "WordPress Footer",
        editable: ["backgroundColor", "textColor", "widgetLayout", "copyrightText"],
      },
      sidebar: {
        name: "Sidebar",
        description: "WordPress Sidebar",
        editable: ["backgroundColor", "widgetStyle", "widgetTitle"],
      },
    },
    exportFormat: "css",
    apiEndpoint: "/api/export/woocommerce",
  },
};

export const EDITABLE_PROPERTIES = {
  backgroundColor: {
    type: "color",
    label: "Hintergrundfarbe",
    icon: "🎨",
  },
  textColor: {
    type: "color",
    label: "Textfarbe",
    icon: "✏️",
  },
  fontSize: {
    type: "range",
    label: "Schriftgröße",
    min: 12,
    max: 48,
    icon: "📝",
  },
  padding: {
    type: "range",
    label: "Innenabstand",
    min: 0,
    max: 50,
    icon: "📏",
  },
  borderRadius: {
    type: "range",
    label: "Eckenradius",
    min: 0,
    max: 50,
    icon: "⭕",
  },
  buttonStyle: {
    type: "select",
    label: "Button-Stil",
    options: ["rounded", "square", "pill"],
    icon: "🔘",
  },
  cardStyle: {
    type: "select",
    label: "Karten-Stil",
    options: ["elevated", "flat", "bordered"],
    icon: "📇",
  },
  gridColumns: {
    type: "range",
    label: "Spalten",
    min: 1,
    max: 6,
    icon: "📊",
  },
};

export const INDUSTRIES = [
  { id: "pharmacy", name: "Apotheke", icon: "💊" },
  { id: "fashion", name: "Mode", icon: "👗" },
  { id: "electronics", name: "Elektronik", icon: "📱" },
  { id: "food", name: "Lebensmittel", icon: "🍔" },
  { id: "beauty", name: "Kosmetik", icon: "💄" },
  { id: "furniture", name: "Möbel", icon: "🛋️" },
  { id: "books", name: "Bücher", icon: "📚" },
  { id: "sports", name: "Sport", icon: "⚽" },
  { id: "other", name: "Sonstiges", icon: "📦" },
];

export const TEMPLATES = {
  modern: {
    name: "Modern",
    description: "Modernes, minimalistisches Design",
    colors: {
      primary: "#2563eb",
      secondary: "#f3f4f6",
      accent: "#dc2626",
    },
  },
  classic: {
    name: "Klassisch",
    description: "Zeitloses, elegantes Design",
    colors: {
      primary: "#1f2937",
      secondary: "#ffffff",
      accent: "#f59e0b",
    },
  },
  vibrant: {
    name: "Lebhaft",
    description: "Farbenfrohes, energisches Design",
    colors: {
      primary: "#7c3aed",
      secondary: "#fef3c7",
      accent: "#ec4899",
    },
  },
  minimal: {
    name: "Minimal",
    description: "Sehr einfaches, sauberes Design",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: "#666666",
    },
  },
};
