import * as React from "react";
import { Button } from "@fluentui/react-components";
import { ArrowClockwise16Regular } from "@fluentui/react-icons";

interface DeckCheckCardProps {
  onRefresh: () => void;
  children?: React.ReactNode;
}

const DeckCheckCard: React.FC<DeckCheckCardProps> = ({ onRefresh, children }) => (
  <div style={{ margin: 20, padding: 16 }}>
    <Button
      icon={<ArrowClockwise16Regular />}
      appearance="primary"
      onClick={onRefresh}
      aria-label="Refresh"
      style={{ marginBottom: 16 }}
    >
      Refresh Data
    </Button>
    {children}
  </div>
);

export default DeckCheckCard;
