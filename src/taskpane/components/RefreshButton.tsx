import { useTimeout } from "@fluentui/react-components";
import * as React from "react";
import {
  buttonClassNames,
  makeStyles,
  tokens,
  Button,
  Spinner,
} from "@fluentui/react-components";
import { CheckmarkFilled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  wrapper: {
    columnGap: "10px",
    display: "flex",
    marginTop: "12px",      // ⬆️ margen superior
    marginBottom: "12px"
  },
  buttonNonInteractive: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    cursor: "default",
    pointerEvents: "none",
    fontSize: "12px",
    height: "28px",
    padding: "4px 8px",

    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorStatusSuccessForeground1,
    },
  },
  buttonSmall: {
    fontSize: "12px",
    height: "28px",
    padding: "4px 8px",
  },
});

type LoadingState = "initial" | "loading" | "loaded";

interface LoadingProps {
  onRefresh: () => void;
}

export const Loading: React.FC<LoadingProps> = ({ onRefresh }) => {
  const styles = useStyles();
  const [loadingState, setLoadingState] = React.useState<LoadingState>("initial");
  const [setTimeoutFn] = useTimeout();

  const onButtonClick = () => {
    setLoadingState("loading");
    onRefresh(); // 🧠 ejecuta refreshStats de App

    // ⏱️ transiciones más rápidas
    setTimeoutFn(() => {
      setLoadingState("loaded");
      setTimeoutFn(() => setLoadingState("initial"), 4000); // visible por 4s
    }, 1000); // carga simulada de 1s
  };

  const buttonContent =
    loadingState === "loading"
      ? "Actualizando..."
      : loadingState === "loaded"
      ? "Actualizado"
      : "Actualizar";

  const buttonIcon =
    loadingState === "loading" ? (
      <Spinner size="tiny" />
    ) : loadingState === "loaded" ? (
      <CheckmarkFilled />
    ) : null;

  const buttonClassName =
    loadingState === "initial"
      ? styles.buttonSmall
      : `${styles.buttonNonInteractive} ${styles.buttonSmall}`;

  return (
    <div className={styles.wrapper}>
      <Button
        className={buttonClassName}
        disabledFocusable={loadingState !== "initial"}
        icon={buttonIcon}
        onClick={onButtonClick}
      >
        {buttonContent}
      </Button>
    </div>
  );
};
