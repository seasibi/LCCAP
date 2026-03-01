// Accessibility Utilities for LCCAP Application
// Comprehensive accessibility enhancements for layout components

import { useEffect, useRef, useState } from 'react';

// Focus management utilities
export const FocusManager = {
  // Trap focus within a container
  trapFocus: (containerRef) => {
    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    containerRef.current.addEventListener('keydown', handleTabKey);
    
    return () => {
      containerRef.current?.removeEventListener('keydown', handleTabKey);
    };
  },
  
  // Set focus to element
  setFocus: (element) => {
    if (element) {
      setTimeout(() => {
        element.focus();
      }, 100);
    }
  },
  
  // Restore focus to previous element
  restoreFocus: (previousElement) => {
    if (previousElement) {
      previousElement.focus();
    }
  }
};

// ARIA utilities
export const AriaUtils = {
  // Generate unique IDs for ARIA attributes
  generateId: (prefix = 'aria') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },
  
  // Announce screen reader messages
  announce: (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
  
  // Set ARIA attributes
  setAttributes: (element, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
};

// Keyboard navigation utilities
export const KeyboardNavigation = {
  // Handle keyboard shortcuts
  handleShortcuts: (keyMap, callback) => {
    const handleKeyDown = (e) => {
      const key = [
        e.ctrlKey && 'ctrl',
        e.altKey && 'alt',
        e.shiftKey && 'shift',
        e.key
      ].filter(Boolean).join('+');
      
      if (keyMap[key]) {
        e.preventDefault();
        callback(keyMap[key]);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },
  
  // Navigate list with arrow keys
  navigateList: (items, currentIndex, direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, items.length - 1)
      : Math.max(currentIndex - 1, 0);
    
    return newIndex;
  }
};

// Screen reader utilities
export const ScreenReader = {
  // Create screen reader only content
  srOnly: (content) => {
    return (
      <span className="sr-only">
        {content}
      </span>
    );
  },
  
  // Skip to main content link
  skipLink: (targetId) => {
    return (
      <a
        href={`#${targetId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>
    );
  }
};

// Color contrast utilities
export const ColorContrast = {
  // Calculate luminance
  getLuminance: (hex) => {
    const rgb = hexToRgb(hex);
    const { r, g, b } = rgb;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },
  
  // Calculate contrast ratio
  getContrastRatio: (color1, color2) => {
    const lum1 = ColorContrast.getLuminance(color1);
    const lum2 = ColorContrast.getLuminance(color2);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },
  
  // Check WCAG compliance
  checkWCAG: (foreground, background, level = 'AA') => {
    const ratio = ColorContrast.getContrastRatio(foreground, background);
    
    const thresholds = {
      AA: { normal: 4.5, large: 3.0 },
      AAA: { normal: 7.0, large: 4.5 }
    };
    
    const threshold = thresholds[level];
    
    return {
      ratio: ratio.toFixed(2),
      passesNormal: ratio >= threshold.normal,
      passesLarge: ratio >= threshold.large,
      level: level
    };
  }
};

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Accessibility hooks
export const useAccessibility = () => {
  const [announcements, setAnnouncements] = useState([]);
  
  const announce = (message, priority = 'polite') => {
    AriaUtils.announce(message, priority);
    setAnnouncements(prev => [...prev, { message, priority, timestamp: Date.now() }]);
  };
  
  return {
    announce,
    announcements
  };
};

// Focus trap hook
export const useFocusTrap = (isActive, containerRef) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const cleanup = FocusManager.trapFocus(containerRef);
    
    return cleanup;
  }, [isActive, containerRef]);
};

// Keyboard navigation hook
export const useKeyboardNavigation = (items, onSelect, orientation = 'vertical') => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (orientation === 'vertical' || e.key === 'ArrowRight') {
          e.preventDefault();
          const newIndex = KeyboardNavigation.navigateList(items, selectedIndex, 'next');
          setSelectedIndex(newIndex);
        }
        break;
        
      case 'ArrowUp':
      case 'ArrowLeft':
        if (orientation === 'vertical' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const newIndex = KeyboardNavigation.navigateList(items, selectedIndex, 'prev');
          setSelectedIndex(newIndex);
        }
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (items[selectedIndex]) {
          onSelect(items[selectedIndex]);
        }
        break;
        
      case 'Home':
        e.preventDefault();
        setSelectedIndex(0);
        break;
        
      case 'End':
        e.preventDefault();
        setSelectedIndex(items.length - 1);
        break;
    }
  };
  
  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  };
};

// Reduced motion utilities
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return prefersReducedMotion;
};

// High contrast mode utilities
export const useHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    setPrefersHighContrast(mediaQuery.matches);
    
    const handleChange = (e) => {
      setPrefersHighContrast(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return prefersHighContrast;
};

// Accessible component wrapper
export const AccessibleComponent = ({ 
  children, 
  role, 
  ariaLabel, 
  ariaDescribedBy,
  tabIndex,
  onKeyDown,
  ...props 
}) => {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};

// Accessibility testing utilities
export const AccessibilityTester = {
  // Test color contrast
  testContrast: (elements) => {
    const results = [];
    
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const contrast = ColorContrast.getContrastRatio(color, backgroundColor);
        results.push({
          element,
          color,
          backgroundColor,
          contrast: contrast.toFixed(2),
          passesWCAG: contrast >= 4.5
        });
      }
    });
    
    return results;
  },
  
  // Test focus management
  testFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    return {
      focusableCount: focusableElements.length,
      hasTabIndex: focusableElements.length > 0,
      elements: Array.from(focusableElements)
    };
  },
  
  // Test ARIA attributes
  testAria: (elements) => {
    const results = [];
    
    elements.forEach(element => {
      const ariaAttributes = {};
      
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('aria-')) {
          ariaAttributes[attr.name] = attr.value;
        }
      });
      
      if (Object.keys(ariaAttributes).length > 0) {
        results.push({
          element,
          attributes: ariaAttributes
        });
      }
    });
    
    return results;
  }
};

export default {
  FocusManager,
  AriaUtils,
  KeyboardNavigation,
  ScreenReader,
  ColorContrast,
  useAccessibility,
  useFocusTrap,
  useKeyboardNavigation,
  useReducedMotion,
  useHighContrast,
  AccessibleComponent,
  AccessibilityTester
};
