// Este es el archivo reorganizado que importa los componentes individuales.
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
        items={[{ label: "RGB(0,0,0)", value: "2 words", color: "#000" }]}
      />

      <CategorySection
        id="fontFamilies"
        title="Font Families"
        colorType="warning"
        count={2}
        items={[
          {
            label: "Aptos Display",
            value: "1 word",
            dropdown: ["Aptos Display", "Arial", "Helvetica"]
          },
          {
            label: "Aptos",
            value: "1 word",
            dropdown: ["Aptos", "Arial", "Helvetica"]
          }
        ]}
      />

      <CategorySection
        id="fontStyles"
        title="Font Styles"
        colorType="warning"
        count={2}
        items={[
          { label: "Aptos Display 60pt", value: "1 word" },
          { label: "Aptos 24pt", value: "1 word" }
        ]}
      />

      <CategorySection
        id="paragraphSpacing"
        title="Paragraph Spacing"
        colorType="warning"
        count={2}
        items={[
          { label: "0pt / 0pt / 0.9 lines", value: "1" },
          { label: "10pt / 0pt / 0.9 lines", value: "1" }
        ]}
      />
    </div>
  );
};

export default DeckCheck;
