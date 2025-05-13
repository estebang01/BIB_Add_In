import React, { useState, useRef, useEffect } from "react";
import { RefreshCw, AlertTriangle, HammerIcon, Search, X } from "lucide-react";
import { styles } from "../../styles";

interface NavbarProps {
  onButtonClick: (button: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeView: string; // 👈 nueva prop
}

export const Navbar: React.FC<NavbarProps> = ({
  onButtonClick,
  searchTerm,
  setSearchTerm,
  activeView
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchExpanded &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchExpanded]);

return (
  <div style={styles.navbarContainer}>
    <div style={styles.navbarButtonGroup}>
      {/* Botón de acción: Refresh */}
      <button
        key="refresh"
        style={{
          ...styles.navbarIconButton,
          ...(hoverStates["refresh"] ? styles.navbarIconButtonHover : {})
        }}
        onClick={() => onButtonClick("refresh")}
        title="Refrescar"
        onMouseEnter={() => setHoverStates({ ...hoverStates, refresh: true })}
        onMouseLeave={() => setHoverStates({ ...hoverStates, refresh: false })}
      >
        <RefreshCw size={18} />
      </button>

      {/* Botones de navegación: slide y deck */}
      {[
        { id: "slide", icon: <AlertTriangle size={18} /> },
        { id: "deck", icon: <HammerIcon size={18} /> }
      ].map(({ id, icon }) => {
        const isActive = (activeView === id);
        return (
          <button
            key={id}
            style={{
              ...styles.navbarIconButton,
              ...(hoverStates[id] ? styles.navbarIconButtonHover : {}),
              ...(isActive ? styles.navbarIconButtonActive : {})
            }}
            onClick={() => onButtonClick(id)}
            title={id === "slide" ? "Revisión de slides" : "Validación visual"}
            onMouseEnter={() => setHoverStates({ ...hoverStates, [id]: true })}
            onMouseLeave={() => setHoverStates({ ...hoverStates, [id]: false })}
          >
            {icon}
          </button>
        );
      })}
    </div>

    {/* Buscador a la derecha */}
    <div ref={searchContainerRef} style={styles.navbarSearchWrapper}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Buscar errores..."
        style={{
          ...styles.navbarSearchInput,
          ...(isSearchExpanded ? styles.navbarSearchInputExpanded : {})
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        style={{
          ...styles.navbarIconButton,
          ...(hoverStates["searchBtn"] ? styles.navbarIconButtonHover : {})
        }}
        onClick={toggleSearch}
        title="Buscar"
        onMouseEnter={() => setHoverStates({ ...hoverStates, searchBtn: true })}
        onMouseLeave={() => setHoverStates({ ...hoverStates, searchBtn: false })}
      >
        {isSearchExpanded ? <X size={18} /> : <Search size={18} />}
      </button>
    </div>
  </div>
);
};
