export type DesignState = {
  intent: {
    style: "serious" | "modern" | "trustful" | "classic";
  };

  brand: {
    colorMode: "custom" | "recommended";
  };

  layout: {
    focus: "products" | "service" | "balanced";
  };

  audience: {
    primary: "young" | "mixed" | "senior";
  };
};
