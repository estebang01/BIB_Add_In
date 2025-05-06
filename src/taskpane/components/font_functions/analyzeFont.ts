export interface FontAnalysis {
  count: number;
  isImportant: boolean;
}
export interface FontWordCount {
  [fontName: string]: FontAnalysis;
}

export const analyzeFonts = async (): Promise<FontWordCount> => {
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
        tr.load(["text", "font/name"]);
        await context.sync();

        const text = tr.text?.trim();
        const fontName = tr.font.name;

        if (text && fontName) {
          const words = text.split(/\s+/).filter(Boolean).length;
          wordCounts[fontName] = (wordCounts[fontName] || 0) + words;
        }
      }
    }
  });

  const maxCount = Math.max(...Object.values(wordCounts));
  const result: FontWordCount = {};

  for (const font in wordCounts) {
    result[font] = {
      count: wordCounts[font],
      isImportant: wordCounts[font] < maxCount,
    };
  }

  return result;
};
