import * as React from "react";
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  CounterBadge,
} from "@fluentui/react-components";
import { Important16Regular } from "@fluentui/react-icons";

// Estilo del ícono
const iconStyleProps = {
  primaryFill: "red",
};

// Componente reutilizable para el contenido lateral
const AsideContent = ({
  isImportant,
  messageCount,
}: {
  isImportant?: boolean;
  messageCount?: number;
}) => (
  <>
    {isImportant && <Important16Regular {...iconStyleProps} />}
    {messageCount && messageCount > 0 && (
      <CounterBadge count={messageCount} color="danger" size="small" />
    )}
  </>
);

// Componente principal Aside con estructura de árbol
export const Aside = () => (
  <Tree aria-label="Aside Tree">
    <TreeItem itemType="branch" aria-description="Important, 3 messages">
      <TreeItemLayout aside={<AsideContent isImportant messageCount={3} />}>
        Level 1, Item 1
      </TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf" aria-description="Important">
          <TreeItemLayout aside={<AsideContent isImportant />}>
            Level 2, Item 1
          </TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf" aria-description="2 messages">
          <TreeItemLayout aside={<AsideContent messageCount={2} />}>
            Level 2, Item 2
          </TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>

    <TreeItem itemType="branch" aria-description="Important, 1 message">
      <TreeItemLayout aside={<AsideContent isImportant messageCount={1} />}>
        Level 1, Item 2
      </TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch" aria-description="1 message">
          <TreeItemLayout aside={<AsideContent messageCount={1} />}>
            Level 2, Item 1
          </TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout aside={<AsideContent />}>
                Level 3, Item 1
              </TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);
