export interface FontColorAnalysis {
    count: number;
    isImportant: boolean;
  }
  export interface FontColorCount {
    [color: string]: FontColorAnalysis;
  }
  
  export const analyzeFontColors = async (): Promise<FontColorCount> => {
    const wordCounts: Record<string, number> = {};
  
    await PowerPoint.run(async (context) => {
      const slides = context.presentation.slides;
      slides.load("items");
      await context.sync();
  
      for (const slide of slides.items) {
        const shapes = slide.shapes;
        shapes.load("items");
        await context.sync();
  
        for (const shape of shapes.items) {
          if (!shape.textFrame) continue;
          const tr = shape.textFrame.textRange;
          tr.load(["text", "font/color"]);
          await context.sync();
  
          const text = tr.text?.trim();
          const color = tr.font.color;
  
          if (text && color) {
            const words = text.split(/\s+/).filter(Boolean).length;
            wordCounts[color] = (wordCounts[color] || 0) + words;
          }
        }
      }
    });
  
    const maxCount = Math.max(...Object.values(wordCounts));
    const result: FontColorCount = {};
  
    for (const color in wordCounts) {
      result[color] = {
        count: wordCounts[color],
        isImportant: wordCounts[color] < maxCount,
      };
    }
  
    return result;
  };
  