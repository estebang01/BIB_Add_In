import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Wrench, Settings, AlertTriangle, Search, Check, ChevronDown } from 'lucide-react';
import {styles} from '../styles';

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

  return (
    <div style={styles.container as React.CSSProperties}>
      {/* Barra de navegación superior */}
      <div style={styles.navbar}>
        <div style={styles.buttonGroup}>
          <button style={styles.iconButton}>
            <RefreshCw size={20} />
          </button>
          <button style={styles.iconButton}>
            <AlertTriangle size={20} />
          </button>
          <button style={styles.iconButton}>
            <Wrench size={20} />
          </button>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.iconButton}>
            <Search size={20} />
          </button>
          <button style={styles.iconButton}>
            <Check size={20} color="orange" />
          </button>
          <button style={styles.iconButton}>
            <Check size={20} color="green" />
          </button>
          <button style={styles.iconButton}>
            <Check size={20} color="blue" />
          </button>
          <button style={styles.iconButton}>
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Sección de diapositivas */}
      <div style={styles.slideHeader}>
        <div 
          style={styles.slideTitle} 
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown 
            size={16} 
            style={{
              ...styles.chevron,
              ...(expanded ? {} : styles.chevronCollapsed)
            }} 
          />
          <div style={styles.titleText}>Slide 1</div>
          <div style={styles.countContainer}>
            <span style={{...styles.countBadge, ...styles.redBadge}}>1</span>
            <span style={{...styles.countBadge, ...styles.yellowBadge}}>2</span>
            <span style={{...styles.countBadge, ...styles.blueBadge}}>0</span>
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

// Componente de tarjeta de notificación
function NotificationCard({ notification, onFixClick }) {
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