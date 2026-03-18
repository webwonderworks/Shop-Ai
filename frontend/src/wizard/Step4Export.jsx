import React, { useEffect, useState } from "react";

const Step4Export = ({ onBack }) => {
  const [shopData, setShopData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/last-shop")
      .then((res) => res.json())
      .then((data) => setShopData(data))
      .catch((err) => console.error(err));
  }, []);

  const downloadJSON = () => {
    const fileData = JSON.stringify(shopData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "shop-export.json";
    link.click();
  };

  if (!shopData) {
    return <p>Lade Exportdaten...</p>;
  }

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Step 4: Export</h1>

      <p>
        Dein Shop wurde erfolgreich generiert.  
        Du kannst ihn jetzt exportieren oder später erweitern.
      </p>

      <pre
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          maxHeight: "300px",
          overflow: "auto",
          fontSize: "0.85rem"
        }}
      >
        {JSON.stringify(shopData, null, 2)}
      </pre>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBack} style={{ marginRight: "1rem" }}>
          Zurück zur Vorschau
        </button>

        <button onClick={downloadJSON}>
          Export als JSON
        </button>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <h3>Nächste Schritte (Coming Soon)</h3>
      <ul>
        <li>Shopify-Export</li>
        <li>WooCommerce-Export</li>
        <li>Headless API-Push</li>
        <li>Auto-Deployment</li>
      </ul>
    </div>
  );
};

export default Step4Export;
