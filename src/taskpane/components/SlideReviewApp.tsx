import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Wrench, Settings, AlertTriangle, Search, Check, ChevronDown } from 'lucide-react';
import {styles} from '../styles';
import {NotificationCard} from './components_notifications/NotificationCard';

// Componente principal
export default function SlideReviewApp() {
  const [expanded, setExpanded] = useState(true);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'warning', 
      title: 'Subtítulo vacío', 
      description: 'Esta slide tiene un placeholder de subtítulo vacío, lo que puede afectar la comprensión del contenido', 
      icon: AlertCircle, 
      fixed: false 
    },
    { 
      id: 2, 
      type: 'error', 
      title: 'Texto fuera de los márgenes', 
      description: 'El texto de esta slide se extiende más allá de los márgenes establecidos, lo que puede dificultar la lectura', 
      icon: Wrench, 
      fixed: false 
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'Leyenda de gráfico', 
      description: 'Leyenda del gráfico no está presente, lo que puede dificultar la interpretación de los datos', 
      icon: Wrench, 
      fixed: false 
    }
  ]);

  const toggleFixNotification = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, fixed: !notification.fixed } : notification
    ));
  };
  const errorCount = notifications.filter((n) => n.type === "error").length;
  const warningCount = notifications.filter((n) => n.type === "warning").length;
  const infoCount = notifications.filter((n) => n.type === "info").length;

  const [hoverStates, setHoverStates] = useState({ header: false });

return (
  <div style={styles.container as React.CSSProperties}>
    {/* Encabezado con contador y toggle */}
    <div
      style={{
        ...styles.slideHeader,
        ...(hoverStates?.header ? styles.slideHeaderHover : {})
      }}
      onMouseEnter={() => setHoverStates({ ...hoverStates, header: true })}
      onMouseLeave={() => setHoverStates({ ...hoverStates, header: false })}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={styles.slideTitle}>
        <div style={styles.slideLeft}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/*Incono* de toggle*/}
          <ChevronDown
            size={16}
            style={{
              ...styles.chevron,
              ...(expanded ? {} : styles.chevronCollapsed)
            }}
          /> 
          <span style={styles.titleText}>Slide 1</span>
          </div>
        </div>
          <div style={styles.countSummary}>
            <div style={{ ...styles.circleBadge, backgroundColor: "#ef4444" }}>{errorCount}</div>
            <div style={{ ...styles.circleBadge, backgroundColor: "#f59e0b" }}>{warningCount}</div>
            <div style={{ ...styles.circleBadge, backgroundColor: "#3b82f6" }}>{infoCount}</div>
          </div>
      </div>
    </div>

    {/* Contenido expandible */}
    {expanded && (
      <div style={styles.notificationsContainer as React.CSSProperties}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onFixClick={() => toggleFixNotification(notification.id)}
          />
        ))}
      </div>
    )}
  </div>
);
}