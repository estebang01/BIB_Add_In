import * as React from "react";
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  CounterBadge,
} from "@fluentui/react-components";
import {
  Important16Regular,
  TextFontFilled,
  FontIncreaseFilled,
  ColorBackgroundAccent20Regular,
} from "@fluentui/react-icons";
import type { FontWordCount } from "./font_functions/analyzeFont";
import type { FontSizeCount } from "./font_functions/analyzeFontSizes";
import type { FontColorCount } from "./font_functions/analyzeFontColors";

const iconStyleProps = { primaryFill: "red" };

const AsideContent = ({
  isImportant,
  messageCount,
}: {
  isImportant?: boolean;
  messageCount?: number;
}) => {
  const color = isImportant ? "danger" : "important";

  return (
    <>
      {isImportant && <Important16Regular {...iconStyleProps} />}
      {messageCount && messageCount > 0 && (
        <CounterBadge count={messageCount} color={color} size="small" />
      )}
    </>
  );
};


interface AsideProps {
  fontStats: FontWordCount;
  sizeStats: FontSizeCount;
  colorStats: FontColorCount;
}

export const Aside: React.FC<AsideProps> = ({ fontStats, sizeStats, colorStats }) => {
  const renderLeaves = (stats: Record<string, { count: number; isImportant: boolean }>) =>
    Object.entries(stats).map(([key, data]) => (
      <TreeItem key={key} itemType="leaf" aria-description={`${data.count} palabras`}>
        <TreeItemLayout aside={<AsideContent messageCount={data.count} isImportant={data.isImportant} />}>
          {key}
        </TreeItemLayout>
      </TreeItem>
    ));

  return (
    <Tree aria-label="Análisis de texto">
      <TreeItem itemType="branch">
        <TreeItemLayout aside={<TextFontFilled />}>Fuentes</TreeItemLayout>
        <Tree>{renderLeaves(fontStats)}</Tree>
      </TreeItem>

      <TreeItem itemType="branch">
        <TreeItemLayout aside={<FontIncreaseFilled />}>Tamaños</TreeItemLayout>
        <Tree>{renderLeaves(sizeStats)}</Tree>
      </TreeItem>

      <TreeItem itemType="branch">
        <TreeItemLayout aside={<ColorBackgroundAccent20Regular />}>Colores</TreeItemLayout>
        <Tree>{renderLeaves(colorStats)}</Tree>
      </TreeItem>
    </Tree>
  );
};
