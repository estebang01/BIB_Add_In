// Archivo DeckCheck reorganizado en español con tipos de color corregidos
import React from "react";
import { styles } from "../styles";
import { CategorySection } from "./components_validacion/CategorySection";

const DeckCheck = () => {
  return (
    <div style={styles.container}>
      <CategorySection
        id="textColors"
        title="Colores del texto"
        colorType="error"
        count={1}
        items={[{ label: "RGB(0,0,0)", value: "2 palabras", color: "#000" }]}
      />
      
      <CategorySection
        id="fontFamilies"
        title="Fuentes tipográficas"
        colorType="warning"
        count={2}
        items={[
          {
            label: "CIBFont Sans",
            value: "1 palabra",
            dropdown: ["CIBFont Sans Light", "Arial", "Calibri"]
          },
          {
            label: "Aptos",
            value: "1 palabra",
            dropdown: ["CIBFont Sans Light", "Arial", "Helvetica"]
          }
        ]}
      />
      
      <CategorySection
        id="fontStyles"
        title="Estilos de fuente"
        colorType="warning"
        count={2}
        items={[
          { label: "Negrita 60pt", value: "1 palabra" },
          { label: "Cursiva 24pt", value: "1 palabra" }
        ]}
      />
      
      <CategorySection
        id="paragraphSpacing"
        title="Espaciado de párrafos"
        colorType="info"
        count={2}
        items={[
          { label: "0pt / 0pt / 0.9 espaciado", value: "1" },
          { label: "10pt / 0pt / 0.9 espaciado", value: "1" }
        ]}
      />
    </div>
  );
};

export default DeckCheck;