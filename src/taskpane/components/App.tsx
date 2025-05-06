import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import DeckCheckCard from "./DeckCheckCard";
import SlideDataAccordion from "./SlideDataAccordion";

export interface FontStats {
  [key: string]: number;        // p. ej.  "Calibri" → 20
}

export interface SlideStats {
  fonts: FontStats;
  colors: FontStats;            // hex o RGB → conteo
  sizes: FontStats;             // "14 pt" → conteo
}

const initialStats: SlideStats = { fonts: {}, colors: {}, sizes: {} };

const App: React.FC = () => {
  const [stats, setStats] = React.useState<SlideStats>(initialStats);

  /** Cuenta ocurrencias incrementando el diccionario destino */
  const addCount = (dict: FontStats, key: string | number | undefined) => {
    if (!key) return;
    const k = String(key);
    dict[k] = (dict[k] ?? 0) + 1;
  };

  const refreshStats = React.useCallback(async () => {
    try {
      await PowerPoint.run(async (context) => {
        const slides = context.presentation.slides;
        slides.load("items");
        await context.sync();

        // Diccionarios locales de conteo
        const fonts: FontStats = {};
        const colors: FontStats = {};
        const sizes: FontStats = {};

        for (const slide of slides.items) {
          const shapes = slide.shapes;
          shapes.load("items");
        }
        await context.sync();

        // Itera por todas las formas con texto
        for (const slide of slides.items) {
          for (const shape of slide.shapes.items) {
            const tr = shape.textFrame?.textRange;
            if (!tr) continue;
            tr.font.load(["name", "color", "size"]);
          }
        }
        await context.sync();

        for (const slide of slides.items) {
          for (const shape of slide.shapes.items) {
            const tr = shape.textFrame?.textRange;
            if (!tr) continue;
            addCount(fonts, tr.font.name);
            addCount(colors, tr.font.color);
            addCount(sizes, `${tr.font.size} pt`);
          }
        }

        setStats({ fonts, colors, sizes });
      });
    } catch (err) {
      console.error("Error reading slides", err);
      setStats(initialStats);
    }
  }, []);

  // Cargar al iniciar
  React.useEffect(() => {
    if ((window as any).Office?.initialized) refreshStats();
    else (window as any).Office?.onReady?.(() => refreshStats());
  }, [refreshStats]);

  return (
    <FluentProvider theme={webLightTheme}>
      <DeckCheckCard onRefresh={refreshStats}>
        <SlideDataAccordion data={stats} />
      </DeckCheckCard>
    </FluentProvider>
  );
};

export default App;
