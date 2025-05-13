import {styles } from "../../styles";
import * as React from "react";
import {  RefreshCw, Settings } from "lucide-react";

// Componente de tarjeta de notificación
export function NotificationCard({ notification, onFixClick }) {
  const Icon = notification.icon;
  
  const cardStyle = {
    ...styles.notificationCard,
    ...(notification.type === 'error' ? styles.errorCard : 
        notification.type === 'warning' ? styles.warningCard : 
        styles.infoCard)
  };

  const circleStyle = {
    ...styles.iconCircle,
    ...(notification.type === 'error' ? styles.redCircle : 
        notification.type === 'warning' ? styles.yellowCircle : 
        styles.blueCircle)
  };

  return (
    <div style={cardStyle}>
      <div style={styles.iconContainer}>
        <div style={circleStyle}>
          <Icon size={18} />
        </div>
      </div>
      <div style={styles.contentContainer}>
        <h3 style={styles.notificationTitle}>{notification.title}</h3>
        <p style={styles.notificationDescription}>{notification.description}</p>
      </div>
      <div>
        <button 
          style={styles.actionButton}
          onClick={onFixClick}
        >
          {notification.fixed ? <RefreshCw size={20} /> : <Settings size={20} />}
        </button>
      </div>
    </div>
  );
}