// Responsive Design System for LCCAP Application
// Consistent responsive behavior across all components

export const responsive = {
  // Breakpoint definitions
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Container max widths
  container: {
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },

  // Grid systems
  grid: {
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      '2xl': 6,
    },
    
    gap: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },

  // Typography scaling
  typography: {
    heading: {
      xs: '1.25rem',
      sm: '1.5rem',
      md: '1.875rem',
      lg: '2.25rem',
      xl: '2.5rem',
      '2xl': '3rem',
    },
    
    subheading: {
      xs: '1rem',
      sm: '1.125rem',
      md: '1.25rem',
      lg: '1.375rem',
      xl: '1.5rem',
      '2xl': '1.625rem',
    },
    
    body: {
      xs: '0.875rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1rem',
      xl: '1rem',
      '2xl': '1.125rem',
    },
    
    small: {
      xs: '0.75rem',
      sm: '0.75rem',
      md: '0.875rem',
      lg: '0.875rem',
      xl: '0.875rem',
      '2xl': '0.875rem',
    },
  },

  // Spacing scaling
  spacing: {
    padding: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
    },
    
    margin: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
    },
  },

  // Component-specific responsive rules
  components: {
    // Sidebar responsive behavior
    sidebar: {
      width: {
        xs: '100%',
        sm: '16rem',
        md: '16rem',
        lg: '16rem',
        xl: '16rem',
        '2xl': '16rem',
      },
      
      position: {
        xs: 'fixed',
        sm: 'fixed',
        md: 'fixed',
        lg: 'fixed',
        xl: 'fixed',
        '2xl': 'fixed',
      },
      
      behavior: {
        xs: 'overlay',
        sm: 'collapsible',
        md: 'persistent',
        lg: 'persistent',
        xl: 'persistent',
        '2xl': 'persistent',
      },
    },

    // Header responsive behavior
    header: {
      height: {
        xs: '3.5rem',
        sm: '4rem',
        md: '4rem',
        lg: '4rem',
        xl: '4rem',
        '2xl': '4rem',
      },
      
      padding: {
        xs: '0.5rem 1rem',
        sm: '0.75rem 1.5rem',
        md: '1rem 2rem',
        lg: '1rem 2rem',
        xl: '1rem 2rem',
        '2xl': '1rem 2rem',
      },
    },

    // Main content responsive behavior
    mainContent: {
      marginLeft: {
        xs: '0',
        sm: '0',
        md: '16rem',
        lg: '16rem',
        xl: '16rem',
        '2xl': '16rem',
      },
      
      padding: {
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },

    // Card responsive behavior
    card: {
      padding: {
        xs: '1rem',
        sm: '1.25rem',
        md: '1.5rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      
      margin: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },

    // Button responsive behavior
    button: {
      padding: {
        xs: '0.5rem 1rem',
        sm: '0.625rem 1.25rem',
        md: '0.75rem 1.5rem',
        lg: '0.75rem 1.5rem',
        xl: '0.875rem 1.75rem',
        '2xl': '1rem 2rem',
      },
      
      fontSize: {
        xs: '0.875rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1rem',
        xl: '1rem',
        '2xl': '1.125rem',
      },
    },

    // Form responsive behavior
    form: {
      input: {
        padding: {
          xs: '0.5rem 0.75rem',
          sm: '0.625rem 1rem',
          md: '0.75rem 1rem',
          lg: '0.75rem 1rem',
          xl: '0.875rem 1.25rem',
          '2xl': '1rem 1.5rem',
        },
        
        fontSize: {
          xs: '0.875rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1rem',
          xl: '1rem',
          '2xl': '1.125rem',
        },
      },
      
      label: {
        fontSize: {
          xs: '0.75rem',
          sm: '0.75rem',
          md: '0.875rem',
          lg: '0.875rem',
          xl: '0.875rem',
          '2xl': '1rem',
        },
      },
    },

    // Table responsive behavior
    table: {
      fontSize: {
        xs: '0.75rem',
        sm: '0.75rem',
        md: '0.875rem',
        lg: '0.875rem',
        xl: '0.875rem',
        '2xl': '1rem',
      },
      
      padding: {
        xs: '0.25rem 0.5rem',
        sm: '0.375rem 0.75rem',
        md: '0.5rem 1rem',
        lg: '0.75rem 1rem',
        xl: '0.75rem 1rem',
        '2xl': '1rem 1.25rem',
      },
    },

    // Modal responsive behavior
    modal: {
      width: {
        xs: '95%',
        sm: '90%',
        md: '80%',
        lg: '70%',
        xl: '60%',
        '2xl': '50%',
      },
      
      maxWidth: {
        xs: 'none',
        sm: 'none',
        md: '600px',
        lg: '600px',
        xl: '600px',
        '2xl': '800px',
      },
      
      margin: {
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },
  },

  // Layout patterns
  layouts: {
    // Dashboard grid layout
    dashboard: {
      grid: {
        xs: '1fr',
        sm: '1fr',
        md: '1fr 1fr',
        lg: '1fr 1fr',
        xl: '1fr 1fr',
        '2xl': '1fr 1fr',
      },
      
      gap: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },

    // Report management grid
    reportGrid: {
      grid: {
        xs: '1fr',
        sm: '1fr',
        md: '1fr 1fr',
        lg: '1fr 1fr 1fr',
        xl: '1fr 1fr 1fr',
        '2xl': '1fr 1fr 1fr 1fr',
      },
      
      gap: {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },

    // User management table
    userTable: {
      overflow: {
        xs: 'auto',
        sm: 'auto',
        md: 'visible',
        lg: 'visible',
        xl: 'visible',
        '2xl': 'visible',
      },
    },

    // Form layouts
    form: {
      grid: {
        xs: '1fr',
        sm: '1fr',
        md: '1fr 1fr',
        lg: '1fr 1fr',
        xl: '1fr 1fr',
        '2xl': '1fr 1fr',
      },
      
      gap: {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },
  },
};

// Helper functions for responsive utilities
export const getResponsiveValue = (values, breakpoint = 'md') => {
  return values[breakpoint] || values.md || values.base;
};

export const getResponsiveClass = (prefix, values) => {
  const classes = [];
  
  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint === 'xs' || breakpoint === 'base') {
      classes.push(`${prefix}-${value}`);
    } else {
      classes.push(`${breakpoint}:${prefix}-${value}`);
    }
  });
  
  return classes.join(' ');
};

// Media query helpers
export const mediaQueries = {
  xs: `(min-width: ${responsive.breakpoints.xs})`,
  sm: `(min-width: ${responsive.breakpoints.sm})`,
  md: `(min-width: ${responsive.breakpoints.md})`,
  lg: `(min-width: ${responsive.breakpoints.lg})`,
  xl: `(min-width: ${responsive.breakpoints.xl})`,
  '2xl': `(min-width: ${responsive.breakpoints['2xl']})`,
};

export default responsive;
