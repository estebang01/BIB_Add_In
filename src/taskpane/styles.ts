import { CSSProperties } from "react";

// Estilos base reutilizables
const baseButton: CSSProperties = {
  padding: '8px',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s'
};

const titleTextBase: CSSProperties = {
  fontWeight: '500',
  fontSize: '14px',
};

const notificationCardBase: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid',
  cursor: 'pointer',
  transition: 'transform 0.1s, box-shadow 0.2s, background-color 0.2s'
};

const iconCircleBase: CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
};

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px'
  },
  iconButton: baseButton,
  iconButtonHover: {
    backgroundColor: '#f3f4f6'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    transition: 'width 0.3s ease'
  },
  searchButton: baseButton,
  searchButtonExpanded: {
    position: 'absolute',
    right: '4px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2
  },
  searchInput: {
    width: '0',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    outline: 'none',
    transition: 'width 0.3s ease, opacity 0.3s ease',
    opacity: 0,
    pointerEvents: 'none'
  },
  searchInputExpanded: {
    width: '180px',
    opacity: 1,
    pointerEvents: 'auto'
  },
  slideHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    gap: '3px',
    },
  slideHeaderButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: ' rgb(252, 247, 224)', // marrón oscuro
    fontWeight: 500,
    padding: '6px 6px',
    borderRadius: '9999px', // full rounded
    cursor: 'pointer',
    fontSize: '14px',
    userSelect: 'none',
},
slideHeaderButtonText:{
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgb(150, 150, 0)', // gris oscuro
},
slideHeaderButtonCounterText:{
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgb(150, 150, 0)', // gris oscuro
    marginLeft: '1px',
},
  slideTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chevron: {
    marginRight: '8px',
    transition: 'transform 0.2s'
  },
  chevronCollapsed: {
    transform: 'rotate(-90deg)'
  },
  titleText: {
    ...titleTextBase,
    color: '#374151'
  },
  titleTextWarning: {
    ...titleTextBase,
    color: '#d97706'
  },
  titleTextInfo: {
    ...titleTextBase,
    color: '#2563eb'
  },
  titleTextNeutral: {
    ...titleTextBase,
    color: '#374151'
  },
  countContainer: {
    marginLeft: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginRight: '5px'
  },
  countText: {
    fontSize: '14px',
    color: '#6b7280'
  },
  categorySection: { 
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '1px',
    backgroundColor: 'white',
  },
    itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8 px',
    padding: '8 px',
    marginLeft: '1px',
    },

    itemRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    borderRadius: '12px',
    backgroundColor: 'white',
    },
  itemLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    borderRadius: '9999px',
    cursor: 'pointer',
    backgroundColor: 'rgb(224, 224, 224)',
    padding: '6px 6px',	
  },
  colorCircle: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    marginRight: '8px'
  },
  itemValue: {
    fontSize: '14px',
    color: '#6b7280'
  },
  dropdown: {
    border: 'none',
    background: 'transparent',
    fontSize: '15px',
    color: '#1f2937',
    padding: '4px',
    marginLeft: '4px',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none'
  },
  notificationsContainer: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  notificationCard: notificationCardBase,
  notificationCardActive: {
    transform: 'translateY(1px)',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  errorCard: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca'
  },
  errorCardHover: {
    backgroundColor: '#fef2f2'
  },
  warningCard: {
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a'
  },
  warningCardHover: {
    backgroundColor: '#fffbeb'
  },
  infoCard: {
    backgroundColor: '#dbeafe',
    borderColor: '#bfdbfe'
  },
  infoCardHover: {
    backgroundColor: '#eff6ff'
  },
  iconContainer: {
    marginRight: '12px',
    marginTop: '4px'
  },
  iconCircle: iconCircleBase,
  redCircle: {
    backgroundColor: '#ef4444'
  },
  yellowCircle: {
    backgroundColor: '#f59e0b'
  },
  blueCircle: {
    backgroundColor: '#3b82f6'
  },
  contentContainer: {
    flexGrow: 1
  },
  notificationTitle: {
    fontWeight: '500',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  notificationDescription: {
    fontSize: '14px',
    color: '#4b5563',
    margin: 0
  },
  actionButton: {
    ...baseButton,
    marginLeft: '8px',
    padding: '6px'
  },
  redActionButtonHover: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)'
  },
  yellowActionButtonHover: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)'
  },
  blueActionButtonHover: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)'
  },
  chevronLeft: {
  width: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
},
labelWithDropdown: {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flex: 1,
  paddingLeft: '4px',
  position: 'relative'
},
itemLabelText: {
  fontSize: '14px',
  fontWeight: 500
},
dropdownToggle: {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '2px'
},
dropdownMenu: {
  position: 'absolute',
  top: '100%',
  left: '0',
  marginTop: '4px',
  backgroundColor: 'white',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  borderRadius: '6px',
  zIndex: 10,
  minWidth: '120px',
  padding: '4px 0'
},
dropdownMenuItem: {
  padding: '8px 12px',
  fontSize: '14px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'background-color 0.2s',
},
dropdownMenuItemHover: {
  backgroundColor: '#f3f4f6'
},
  navbarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e5e7eb",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  navbarButtonGroup: {
    display: "flex",
    gap: "12px",
  },

  navbarIconButton: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "9999px",
    padding: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  navbarIconButtonHover: {
    backgroundColor: "#f3f4f6",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },

  navbarSearchWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    transition: "all 0.3s ease",
    marginLeft: "auto"
  },

  navbarSearchInput: {
    width: "0px",
    opacity: 0,
    padding: "0px",
    marginRight: "0px",
    borderRadius: "9999px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#f9fafb",
    pointerEvents: "none"
  },

  navbarSearchInputExpanded: {
    width: "200px",
    opacity: 1,
    padding: "8px 12px",
    marginRight: "8px",
    pointerEvents: "auto"
  },
  navbarIconButtonActive: {
  backgroundColor: "rgb(252,247,222", // celeste claro
  border: "1px rgb(252, 247, 10) solid", // marrón claro
  boxShadow: "inset 0 0 0 1px solif rgb(252, 247, 224)", 
},
countSummary: {
    display: "flex",
    alignItems : "center",
    gap: "4px",
    flexShrink : 0,
},
circleBadge: {
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: 1,
  gap: "2px",
},
slideHeader: {
  padding: "10px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "background-color 0.2s",
},
slideHeaderHover: {
  backgroundColor: "#f3f4f6",
},
slideLeft: {
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  gap: "8px",
  minWidth: "0",  
},
};
