import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyles}>
      &copy; 2025 Ed Troiana sucks at React. All rights reserved
    </footer>
  );
};

const footerStyles: React.CSSProperties = {
  textAlign: 'center',
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #e0e0e0',
  color: '#666',
  fontSize: '14px',
  marginTop: 'auto',
};

export default Footer;