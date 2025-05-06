import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@fluentui/react-components";
import { SlideStats } from "./App";

interface Props {
  data: SlideStats;
}

const renderList = (obj: Record<string, number>) =>
  Object.entries(obj).length === 0 ? (
    <i>No data</i>
  ) : (
    <ul style={{ marginTop: 0 }}>
      {Object.entries(obj).map(([k, v]) => (
        <li key={k}>
          {k}: <b>{v}</b>
        </li>
      ))}
    </ul>
  );

const SlideDataAccordion: React.FC<Props> = ({ data }) => (
  <Accordion collapsible multiple>
    <AccordionItem value="fonts">
      <AccordionHeader>Fonts</AccordionHeader>
      <AccordionPanel>{renderList(data.fonts)}</AccordionPanel>
    </AccordionItem>

    <AccordionItem value="colors">
      <AccordionHeader>Font Colors</AccordionHeader>
      <AccordionPanel>{renderList(data.colors)}</AccordionPanel>
    </AccordionItem>

    <AccordionItem value="sizes">
      <AccordionHeader>Font Sizes</AccordionHeader>
      <AccordionPanel>{renderList(data.sizes)}</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default SlideDataAccordion;
