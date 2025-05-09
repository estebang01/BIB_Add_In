import * as React from "react";
import {
  FluentProvider,
  webLightTheme,
  TabList,
  Tab,
  TabValue,
} from "@fluentui/react-components";
import { Loading } from "./RefreshButton";
import { Aside } from "./Tree";
import { analyzeFonts, FontWordCount } from "./font_functions/analyzeFont";
import { analyzeFontSizes, FontSizeCount } from "./font_functions/analyzeFontSizes";
import { analyzeFontColors, FontColorCount } from "./font_functions/analyzeFontColors";
import SlideReviewApp from "./SlideReviewApp"; // Removed as it is unused and missing



export interface FontStats {
  [key: string]: number;
}

export interface SlideStats {
  fonts: FontStats;
  colors: FontStats;
  sizes: FontStats;
}

const initialStats: SlideStats = { fonts: {}, colors: {}, sizes: {} };

const App: React.FC = () => {
  const [stats, setStats] = React.useState<SlideStats>(initialStats);
  const [fontStats, setFontStats] = React.useState<FontWordCount>({});
  const [sizeStats, setSizeStats] = React.useState<FontSizeCount>({});
  const [colorStats, setColorStats] = React.useState<FontColorCount>({});
  const [selectedTab, setSelectedTab] = React.useState<TabValue>("summary");

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

        const fonts: FontStats = {};
        const colors: FontStats = {};
        const sizes: FontStats = {};

        for (const slide of slides.items) {
          const shapes = slide.shapes;
          shapes.load("items");
        }
        await context.sync();

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

      const analyzedFonts = await analyzeFonts();
      const analyzedSizes = await analyzeFontSizes();
      const analyzedColors = await analyzeFontColors();

      setFontStats(analyzedFonts);
      setSizeStats(analyzedSizes);
      setColorStats(analyzedColors);
    } catch (err) {
      console.error("Error reading slides", err);
      setStats(initialStats);
      setFontStats({});
      setSizeStats({});
      setColorStats({});
    }
  }, []);

React.useEffect(() => {
  // 1. Inicialización de Office JS
  if ((window as any).Office?.initialized) refreshStats();
  else (window as any).Office?.onReady?.(() => refreshStats());

  // 2. Comunicación VSTO → React
  (window as any).initializeDataFromVSTO = (slidesData: any[]) => {
    console.log("📩 Recibido desde VSTO:", slidesData);
    alert(`Recibidas ${slidesData.length} diapositivas desde VSTO`);

    // Si quieres pasar los datos a SlideReviewApp, puedes usar un store global o contexto
    // Por ahora solo lo mostramos
  };
}, [refreshStats]);


  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: 20 }}>
        <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value)} size="small">
          <Tab value="summary">Resumen</Tab>
          <Tab value="tree">Análisis de texto</Tab>
          <Tab value="revision">Revisión</Tab>
          <Tab value="extras">Otra sección</Tab>
        </TabList>

        {selectedTab === "summary" && (
          <div>
          <button
            onClick={() => {
              const message = {
                action: "fixIssue",
                data: {
                  slideId: "slide_256",
                  issueId: 1,
                  willBeFixed: true,
                  type: "error",
                  elementId: "title"
                }
              };
              (window as any).chrome?.webview?.postMessage(JSON.stringify(message));
            }}
          >
            Probar mensaje a VSTO
          </button>
        </div>
        )}

        {selectedTab === "tree" && (
          <>
            <Loading onRefresh={refreshStats} />
            <Aside fontStats={fontStats} sizeStats={sizeStats} colorStats={colorStats} />
          </>
        )}
        {selectedTab === "revision" && (
          <SlideReviewApp />
        )}

        {selectedTab === "extras" && (
          <div>
            <p>Contenido adicional aquí...</p>
          </div>
        )}
      </div>
    </FluentProvider>
  );
};

export default App;
