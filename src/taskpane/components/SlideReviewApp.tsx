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
      type: 'error', 
      title: 'Slide title missing', 
      description: 'This slide has a title placeholder that contains no text', 
      icon: AlertCircle, 
      fixed: false 
    },
    { 
      id: 2, 
      type: 'warning', 
      title: 'Shrink text on overflow', 
      description: 'Shrinking text on overflow can result in unpredictable and inconsistent font sizes', 
      icon: Wrench, 
      fixed: false 
    },
    { 
      id: 3, 
      type: 'warning', 
      title: 'Shrink text on overflow', 
      description: 'Shrinking text on overflow can result in unpredictable and inconsistent font sizes', 
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