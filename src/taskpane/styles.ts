import { CSSProperties } from "react";
// Estilos CSS

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
    overflow: 'hidden'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb'
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px'
  },
  iconButton: {
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  slideHeader: {
    padding: '8px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: 'white'
  },
  slideTitle: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  chevron: {
    marginRight: '8px',
    transition: 'transform 0.2s'
  },
  chevronCollapsed: {
    transform: 'rotate(-90deg)'
  },
  titleText: {
    fontWeight: '500'
  },
  countContainer: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  countBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    color: 'white',
    fontSize: '12px'
  },
  redBadge: {
    backgroundColor: '#ef4444'
  },
  yellowBadge: {
    backgroundColor: '#f59e0b'
  },
  blueBadge: {
    backgroundColor: '#3b82f6'
  },
  notificationsContainer: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#f9fafb'
  },
  notificationCard: {
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    alignItems: 'flex-start'
  },
  errorCard: {
    backgroundColor: '#fee2e2'
  },
  warningCard: {
    backgroundColor: '#fef3c7'
  },
  infoCard: {
    backgroundColor: '#dbeafe'
  },
  iconContainer: {
    marginRight: '12px',
    marginTop: '4px'
  },
  iconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
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
    marginLeft: '8px',
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  }
};

