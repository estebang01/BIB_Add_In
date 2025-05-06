export interface FontSizeAnalysis {
  count: number;
  isImportant: boolean;
}
export interface FontSizeCount {
  [size: string]: FontSizeAnalysis;
}

export const analyzeFontSizes = async (): Promise<FontSizeCount> => {
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
        tr.load(["text", "font/size"]);
        await context.sync();

        const text = tr.text?.trim();
        const size = tr.font.size;

        if (text && size) {
          const key = `${size} pt`;
          const words = text.split(/\s+/).filter(Boolean).length;
          wordCounts[key] = (wordCounts[key] || 0) + words;
        }
      }
    }
  });

  const maxCount = Math.max(...Object.values(wordCounts));
  const result: FontSizeCount = {};

  for (const size in wordCounts) {
    result[size] = {
      count: wordCounts[size],
      isImportant: wordCounts[size] < maxCount,
    };
  }

  return result;
};
