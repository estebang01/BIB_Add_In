import React, { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
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
            addCount(sizes, `${tr.font.size} pt`);
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
        <Navbar
          onButtonClick={(button) => {
            if (button === "deck") setRevisionView("deck");
            if (button === "slide") setRevisionView("slide");
            if (button === "refresh") refreshStats();
          }}
          searchTerm=""
          setSearchTerm={() => {}}
          activeView={revisionView} 
        />
        {revisionView === "deck" && <DeckCheck />}
        {revisionView === "slide" && <SlideReviewApp />}
      </div>
    </FluentProvider>
  );
};

export default App;