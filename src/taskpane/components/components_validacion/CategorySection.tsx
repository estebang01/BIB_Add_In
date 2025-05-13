import React from "react";
import { ChevronDown } from "lucide-react";
import { styles } from "../../styles";



interface CategoryItem {
  label: string;
  value: string;
  color?: string;
  dropdown?: string[];
}

interface Props {
  id: string;
  title: string;
  count: number;
  colorType: "error" | "warning" | "info";
  items: CategoryItem[];
}

export const CategorySection: React.FC<Props> = ({
  title,
  count,
  colorType,
  items
}) => {
  const [open, setOpen] = React.useState(true);
  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

  const textStyle =
    colorType === "error"
      ? styles.titleText
      : colorType === "warning"
      ? styles.titleTextWarning
      : styles.titleTextInfo;

  return (
    <div style={styles.categorySection}>
      <div style={styles.slideHeaderWrapper}>
        <div style={styles.slideHeaderButton} onClick={() => setOpen(!open)}>
          <ChevronDown
            size={16}
            style={{
              ...styles.chevron,
              ...(open ? {} : styles.chevronCollapsed)
            }}
          />
          <span style={styles.slideHeaderButtonText}>{title}</span>
          <div style={styles.countContainer}>
            <span style={styles.slideHeaderButtonCounterText}>{count}</span>
          </div>
        </div>
      </div>

        {open && (
        <div style={styles.itemContainer}>
            {items.map((item, i) => {
            const showChevron = item.label.toLowerCase() !== "color";

            // ✅ Todos los demás ítems de la misma sección (excepto el actual)
            const otherItems = items.filter((_, j) => j !== i);

            return (
                <div key={i} style={{ ...styles.itemRow, position: 'relative' }}>
                {/* Chevron a la izquierda */}
                <div style={styles.chevronLeft}>
                    {showChevron && <ChevronDown size={14} />}
                </div>

                {/* Etiqueta + botón dropdown */}
                <div style={styles.labelWithDropdown}>
                    <span style={styles.itemLabelText}>{item.label}</span>

                    {showChevron && (
                    <div
                        style={styles.dropdownToggle}
                        onClick={() =>
                        setActiveDropdown(activeDropdown === i ? null : i)
                        }
                    >
                        <ChevronDown size={14} />
                    </div>
                    )}

                    {/* ✅ MENÚ CONTEXTUAL FLOTANTE */}
                    {activeDropdown === i && (
                    <div style={styles.dropdownMenu}>
                        {otherItems.map((otherItem, j) => (
                        <div
                            key={j}
                            style={styles.dropdownMenuItem}
                            onClick={() => {
                            // Aquí puedes usar otherItem.label o otherItem.value si deseas
                            setActiveDropdown(null);
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f3f4f6")
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "white")
                            }
                        >
                            {otherItem.label}
                        </div>
                        ))}
                    </div>
                    )}
                </div>

                {/* Valor a la derecha */}
                <span style={styles.itemValue}>{item.value}</span>
                </div>
            );
            })}
        </div>
        )}
    </div>
  );
};
