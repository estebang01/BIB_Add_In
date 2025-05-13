import React, { useState } from "react";
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
import  DeckCheck  from "./DeckCheck";
import {Navbar} from "./components_validacion/Navbar";
import  SlideReceiver  from "../helpers/SlideReceiver";
import { SlideInfo } from "../helpers/vstoBridge1";
import { useEffect } from "react";

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
  const [revisionView, setRevisionView] = React.useState<"slide" | "deck">("slide");

  const addCount = (dict: FontStats, key: string | number | undefined) => {
    if (!key) return;
    const k = String(key);
    dict[k] = (dict[k] ?? 0) + 1;
  };
const [dummyData, setDummyData] = React.useState<any[]>([]);

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

const [slidesInfo, setSlidesInfo] = useState<SlideInfo[]>([]);


useEffect(() => {
  const handleWebViewMessage = (event: any) => {
    if (!event || !event.data) return;

    const { action, data } = event.data;

    if (action === "allSlidesReceived") {
      console.log("✅ SlideInfo recibido:", data);
      setSlidesInfo(data); // actualiza el estado
    }
  };

  if ((window as any).chrome?.webview) {
    (window as any).chrome.webview.addEventListener("message", handleWebViewMessage);
  }

  // Limpieza
  return () => {
    if ((window as any).chrome?.webview) {
      (window as any).chrome.webview.removeEventListener("message", handleWebViewMessage);
    }
  };
}, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: 20 }}>
        <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value)} size="small">
          <Tab value="summary">Resumen</Tab>
          <Tab value="tree">Análisis de texto</Tab>
          <Tab value="revision">Revisión</Tab>
          <Tab value="extras">Otra sección</Tab>
          <Tab value="Prueba1">Otra sección</Tab>
        </TabList>
        {selectedTab === "Prueba1" && (
         <button onClick={() => {
            (window as any).chrome?.webview?.postMessage({
              action: "getActiveSlideInfo",
              data:{}
            });
          }}>
            Obtener información de la diapositiva
          </button>)}
        {selectedTab === "summary" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Componente que obtiene y entrega info de VSTO */}
            <SlideReceiver
              onSlideInfoReceived={(info) => {
                setSlidesInfo(info);
              }}
            />

            {/* Mostrar las diapositivas y sus elementos */}
            {slidesInfo.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginTop: "24px" }}>
                {slidesInfo.map((slide) => (
                  <div key={slide.slideNumber}>
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
                      Diapositiva {slide.slideNumber}: {slide.slideTitle}
                    </h3>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                      {slide.elements?.map((element) => (
                        <div
                          key={element.id}
                          style={{
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            width: "calc(50% - 8px)",
                            boxSizing: "border-box",
                          }}
                        >
                          <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
                            Elemento #{element.id} – {element.type}
                          </h4>
                          <p><strong>Nombre:</strong> {element.name}</p>
                          <p><strong>Posición:</strong> ({element.left}, {element.top})</p>
                          <p><strong>Tamaño:</strong> {element.width} × {element.height}</p>
                          {element.text?.content && (
                            <p><strong>Texto:</strong> {element.text.content}</p>
                          )}
                          {element.fill?.color && (
                            <p>
                              <strong>Color de relleno:</strong>{" "}
                              <span
                                style={{
                                  backgroundColor: `#${element.fill.color}`,
                                  display: "inline-block",
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "3px",
                                  marginLeft: "4px",
                                  verticalAlign: "middle"
                                }}
                              ></span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTab === "tree" && (
          <>
            <Loading onRefresh={refreshStats} />
            <Aside fontStats={fontStats} sizeStats={sizeStats} colorStats={colorStats} />
          </>
        )}
        {selectedTab === "revision" && (
          <>
            <Navbar
              onButtonClick={(button) => {
                if (button === "deck") setRevisionView("deck");
                if (button === "slide") setRevisionView("slide");
                if (button === "refresh") refreshStats(); // si quieres mantener refres
              }}
              searchTerm=""
              setSearchTerm={() => {}}
                activeView={revisionView} 
            />
            {revisionView === "deck" && <DeckCheck />}
            {revisionView === "slide" && <SlideReviewApp />}
          </>
        )}


        {selectedTab === "extras" && (
          <div>
            <DeckCheck />
          </div>
        )}
      </div>
    </FluentProvider>
  );
};
export default App;
