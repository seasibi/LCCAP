import React from 'react';

const Footer = ({ minimal = false }) => {
  if (minimal) {
    return (
      <footer className="absolute bottom-0 left-0 right-0 text-center p-5 z-5 bg-transparent">
        <div className="flex items-center justify-center gap-5 text-white/80 text-sm">
          <svg className="w-5 h-5 opacity-60" viewBox="0 0 24 24" fill="#4a7c59">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <span>© 2026 City Environment and Parks Management Office</span>
          <svg className="w-5 h-5 opacity-60" viewBox="0 0 24 24" fill="#4a7c59">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
        </div>
      </footer>
    );
  }
};

export default Footer;
