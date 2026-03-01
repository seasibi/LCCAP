# LCCAP Layout Component Documentation

## Overview

The LCCAP (Local Climate Change Action Plan) frontend application features a unified, responsive, and accessible layout system. This documentation covers all layout components, their usage, and best practices.

## Architecture

### Layout Structure
```
App.jsx
├── AuthLayout (for login/auth pages)
│   ├── Header (minimal variant)
│   └── Footer (minimal variant)
└── MainLayout (for authenticated pages)
    ├── Header (full variant)
    ├── Sidebar (navigation)
    ├── Main Content (page content)
    └── Footer (full variant)
```

## Components

### 1. MainLayout

**Location:** `src/components/layout/MainLayout.jsx`

**Purpose:** Provides the main layout wrapper for all authenticated pages.

**Props:**
- `children` (ReactNode): Page content to render
- `onLogout` (Function): Logout handler function
- `navigateToPage` (Function): Navigation handler function
- `currentPage` (String): Current active page identifier

**Features:**
- Sticky header with sidebar toggle
- Collapsible sidebar with navigation
- Responsive behavior (overlay on mobile, persistent on desktop)
- Footer with full content
- Smooth transitions and animations

**Usage:**
```jsx
<MainLayout 
  onLogout={handleLogout}
  navigateToPage={navigateToPage}
  currentPage="dashboard"
>
  <Dashboard />
</MainLayout>
```

### 2. AuthLayout

**Location:** `src/components/layout/AuthLayout.jsx`

**Purpose:** Provides minimal layout for authentication pages.

**Props:**
- `children` (ReactNode): Authentication content to render

**Features:**
- Minimal header variant
- Minimal footer variant
- Centered content layout
- Full-screen background

**Usage:**
```jsx
<AuthLayout>
  <Login onLogin={handleLogin} />
</AuthLayout>
```

### 3. Header

**Location:** `src/components/layout/Header.jsx`

**Purpose:** Consistent header component with responsive behavior.

**Props:**
- `showSidebarToggle` (Boolean): Show/hide sidebar toggle button
- `onSidebarToggle` (Function): Sidebar toggle handler
- `minimal` (Boolean): Use minimal variant for auth pages

**Features:**
- Logo and branding
- Sidebar toggle button
- Responsive design
- Sticky positioning
- Accessibility support

**Usage:**
```jsx
<Header 
  showSidebarToggle={true}
  onSidebarToggle={toggleSidebar}
  minimal={false}
/>
```

### 4. Sidebar

**Location:** `src/components/layout/Sidebar.jsx`

**Purpose:** Navigation sidebar with menu items and user profile.

**Props:**
- `isOpen` (Boolean): Sidebar open/closed state
- `currentPage` (String): Current active page for highlighting
- `navigateToPage` (Function): Navigation handler
- `onLogout` (Function): Logout handler

**Features:**
- Navigation menu with active state
- User profile section
- Logout functionality
- Smooth transitions
- Responsive behavior (overlay on mobile)
- Accessibility support

**Usage:**
```jsx
<Sidebar 
  isOpen={sidebarOpen}
  currentPage="dashboard"
  navigateToPage={navigateToPage}
  onLogout={handleLogout}
/>
```

### 5. Footer

**Location:** `src/components/layout/Footer.jsx`

**Purpose:** Footer component with minimal and full variants.

**Props:**
- `minimal` (Boolean): Use minimal variant for auth pages

**Features:**
- Copyright information
- Responsive design
- Minimal and full variants
- Proper positioning

**Usage:**
```jsx
<Footer minimal={false} />
```

## Page Components

### 1. Dashboard

**Location:** `src/components/pages/Dashboard.jsx`

**Purpose:** Main dashboard with charts and calendar.

**Features:**
- Data visualization
- Calendar integration
- Responsive grid layout
- Clean content-only structure

### 2. Accomplishment

**Location:** `src/components/pages/Accomplishment.jsx`

**Purpose:** Accomplishment tracking and form.

**Features:**
- Form validation
- Responsive form layout
- Clean content-only structure

### 3. Calendar

**Location:** `src/components/pages/Calendar.jsx`

**Purpose:** Calendar view with date navigation.

**Features:**
- Interactive calendar
- Date selection
- Responsive design
- Clean content-only structure

### 4. Report Management

**Location:** `src/components/pages/ReportManagement.jsx`

**Purpose:** Report management with CRUD operations.

**Features:**
- Report listing
- Search and filter
- Modal forms
- Responsive grid layout
- Clean content-only structure

### 5. User Management

**Location:** `src/components/pages/UserManagement.jsx`

**Purpose:** User management with CRUD operations.

**Features:**
- User listing
- Search and filter
- Modal forms
- Responsive table layout
- Clean content-only structure

## Design System

### Colors

**Primary Colors:**
- Green 50: #f0fdf4
- Green 600: #16a34a (primary)
- Green 700: #15803d

**Semantic Colors:**
- Success: #22c55e
- Warning: #f59e0b
- Error: #ef4444
- Info: #3b82f6

**Neutral Colors:**
- White: #ffffff
- Gray 50: #f9fafb
- Gray 900: #111827

### Typography

**Font Family:**
- Sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

**Font Sizes:**
- XS: 0.75rem
- SM: 0.875rem
- Base: 1rem
- LG: 1.125rem
- XL: 1.25rem
- 2XL: 1.5rem
- 3XL: 1.875rem

### Spacing

**Scale:**
- 1: 0.25rem
- 2: 0.5rem
- 4: 1rem
- 6: 1.5rem
- 8: 2rem
- 12: 3rem
- 16: 4rem

### Breakpoints

**Responsive Breakpoints:**
- XS: 0px
- SM: 640px
- MD: 768px
- LG: 1024px
- XL: 1280px
- 2XL: 1536px

## Responsive Behavior

### Mobile (XS - SM)
- Sidebar overlays content
- Header height: 3.5rem
- Reduced padding
- Stacked layouts

### Tablet (MD)
- Sidebar becomes collapsible
- Header height: 4rem
- Moderate padding
- 2-column grids

### Desktop (LG+)
- Sidebar becomes persistent
- Header height: 4rem
- Full padding
- Multi-column grids

## Accessibility

### Features
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Color contrast compliance
- Reduced motion support

### Keyboard Shortcuts
- Tab: Navigate through elements
- Shift+Tab: Navigate backwards
- Enter/Space: Activate buttons
- Arrow keys: Navigate lists
- Escape: Close modals

## Performance

### Optimizations
- Lazy loading for images
- Debounced search/filter
- Throttled scroll handlers
- Memoized components
- Virtual scrolling for large lists
- Bundle code splitting

### Metrics
- Render time: < 16ms
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Best Practices

### 1. Component Usage
- Always wrap page content in appropriate layout
- Use semantic HTML elements
- Follow the established color scheme
- Maintain consistent spacing

### 2. Responsive Design
- Mobile-first approach
- Test on all breakpoints
- Use responsive utilities
- Consider touch interactions

### 3. Accessibility
- Include ARIA attributes
- Test with screen readers
- Ensure keyboard navigation
- Check color contrast

### 4. Performance
- Optimize images
- Use memoization
- Minimize re-renders
- Monitor bundle size

## Troubleshooting

### Common Issues

**Layout breaks on mobile:**
- Check responsive classes
- Verify sidebar behavior
- Test with mobile viewport

**Focus management issues:**
- Ensure proper tab order
- Check ARIA attributes
- Test with keyboard

**Performance problems:**
- Profile with React DevTools
- Check for unnecessary re-renders
- Optimize expensive operations

## Migration Guide

### From Old Layout
1. Remove duplicate sidebar code
2. Import and use MainLayout/AuthLayout
3. Remove inline CSS
4. Update component props
5. Test responsive behavior

### Example Migration
```jsx
// Before
<div className="flex">
  <Sidebar />
  <div className="main-content">
    <Header />
    <PageContent />
  </div>
</div>

// After
<MainLayout>
  <PageContent />
</MainLayout>
```

## Contributing

### Adding New Pages
1. Create page component in `src/components/pages/`
2. Add route configuration in `src/router/RouteConfig.jsx`
3. Add navigation item to `src/router/RouteConfig.jsx`
4. Test with all layouts
5. Update documentation

### Modifying Layout
1. Consider impact on all pages
2. Test responsive behavior
3. Verify accessibility
4. Update documentation
5. Follow design system

## Support

For questions or issues with the layout system:
1. Check this documentation
2. Review component source code
3. Test with different viewports
4. Verify accessibility compliance
5. Contact the development team

---

**Last Updated:** March 2026
**Version:** 2.0.0
**Maintainers:** LCCAP Development Team
