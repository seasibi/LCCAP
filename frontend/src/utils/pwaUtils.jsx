// PWA Utilities for LCCAP Application
// Progressive Web App functionality and service worker management

import { useState, useEffect, useCallback } from 'react';

// PWA installation state
export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA: User accepted installation');
      } else {
        console.log('PWA: User dismissed installation');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('PWA: Installation failed:', error);
    }
  }, [deferredPrompt]);

  return {
    isInstallable,
    isInstalled,
    installApp,
    deferredPrompt
  };
};

// Service worker registration
export const useServiceWorker = () => {
  const [registration, setRegistration] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        setIsSupported(true);
        
        try {
          const reg = await navigator.serviceWorker.register('/sw.js');
          console.log('PWA: Service worker registered:', reg);
          setRegistration(reg);

          // Check for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  showUpdateAvailable();
                }
              });
            }
          });

          // Handle controller change (new version activated)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('PWA: New service worker activated');
            window.location.reload();
          });

        } catch (error) {
          console.error('PWA: Service worker registration failed:', error);
        }
      } else {
        console.log('PWA: Service workers not supported');
        setIsSupported(false);
      }
    };

    registerServiceWorker();
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateServiceWorker = useCallback(() => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [registration]);

  const clearCache = useCallback(async () => {
    if (registration) {
      registration.active.postMessage({ type: 'CACHE_CLEANUP' });
    }
  }, [registration]);

  return {
    registration,
    isSupported,
    isOnline,
    updateServiceWorker,
    clearCache
  };
};

// Update notification
const showUpdateAvailable = () => {
  // Create update notification element
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3';
  notification.innerHTML = `
    <span class="flex items-center gap-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 5M14 12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1h6zM4 15.101a7.002 7.002 0 0011.601 5M15 12a1 1 0 01-1 1H5a1 1 0 01-1-1v-2.101a7.002 7.002 0 0011.601 5" clip-rule="evenodd"/>
      </svg>
      New version available
    </span>
    <button class="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium hover:bg-green-50 transition-colors">
      Update
    </button>
  `;

  document.body.appendChild(notification);

  // Handle update button click
  const updateButton = notification.querySelector('button');
  updateButton.addEventListener('click', () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    document.body.removeChild(notification);
  });

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 10000);
};

// Network status hook
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');
  const [effectiveType, setEffectiveType] = useState('unknown');

  useEffect(() => {
    const updateConnectionInfo = () => {
      if (navigator.connection) {
        setConnectionType(navigator.connection.effectiveType || 'unknown');
        setEffectiveType(navigator.connection.effectiveType || 'unknown');
      }
    };

    const handleOnline = () => {
      setIsOnline(true);
      updateConnectionInfo();
    };

    const handleOffline = () => {
      setIsOnline(false);
      updateConnectionInfo();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateConnectionInfo);
    }

    updateConnectionInfo();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  return {
    isOnline,
    connectionType,
    effectiveType,
    isSlow: effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === 'slow-3g'
  };
};

// Storage utilities for offline functionality
export const useOfflineStorage = () => {
  const getStorage = useCallback(() => {
    try {
      return localStorage.getItem('lccap-offline-data') || '[]';
    } catch (error) {
      console.error('PWA: Failed to read offline storage:', error);
      return '[]';
    }
  }, []);

  const setStorage = useCallback((data) => {
    try {
      localStorage.setItem('lccap-offline-data', JSON.stringify(data));
    } catch (error) {
      console.error('PWA: Failed to write offline storage:', error);
    }
  }, []);

  const addOfflineAction = useCallback((action) => {
    try {
      const currentData = JSON.parse(getStorage());
      const newAction = {
        ...action,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      currentData.push(newAction);
      setStorage(currentData);
      return newAction.id;
    } catch (error) {
      console.error('PWA: Failed to add offline action:', error);
      return null;
    }
  }, [getStorage, setStorage]);

  const getOfflineActions = useCallback(() => {
    try {
      return JSON.parse(getStorage());
    } catch (error) {
      console.error('PWA: Failed to get offline actions:', error);
      return [];
    }
  }, [getStorage]);

  const removeOfflineAction = useCallback((id) => {
    try {
      const currentData = JSON.parse(getStorage());
      const filteredData = currentData.filter(action => action.id !== id);
      setStorage(filteredData);
    } catch (error) {
      console.error('PWA: Failed to remove offline action:', error);
    }
  }, [getStorage, setStorage]);

  const clearOfflineActions = useCallback(() => {
    try {
      setStorage([]);
    } catch (error) {
      console.error('PWA: Failed to clear offline actions:', error);
    }
  }, [setStorage]);

  return {
    addOfflineAction,
    getOfflineActions,
    removeOfflineAction,
    clearOfflineActions
  };
};

// Push notification utilities
export const usePushNotifications = () => {
  const [permission, setPermission] = useState('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport = () => {
      const supported = 'Notification' in window && 'serviceWorker' in navigator;
      setIsSupported(supported);
      
      if (supported) {
        setPermission(Notification.permission);
      }
    };

    checkSupport();
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('PWA: Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const subscribeToPush = useCallback(async () => {
    if (!isSupported || permission !== 'granted') return null;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
      });

      console.log('PWA: Push subscription created:', subscription);
      return subscription;
    } catch (error) {
      console.error('PWA: Failed to subscribe to push:', error);
      return null;
    }
  }, [isSupported, permission]);

  const unsubscribeFromPush = useCallback(async (subscription) => {
    if (!subscription) return;

    try {
      await subscription.unsubscribe();
      console.log('PWA: Unsubscribed from push notifications');
    } catch (error) {
      console.error('PWA: Failed to unsubscribe from push:', error);
    }
  }, []);

  return {
    permission,
    isSupported,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush
  };
};

// App install prompt component
export const InstallPrompt = ({ isInstallable, onInstall }) => {
  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 max-w-sm">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm6.293-8.707a1 1 0 00-1.414-1.414L9 10.586V7a1 1 0 10-2 0v3.586l-2.293-2.293a1 1 0 10-1.414 1.414L10 12.414V15a1 1 0 102 0v-2.586l2.293 2.293z"/>
        </svg>
        <span className="text-sm font-medium">Install LCCAP App</span>
      </div>
      <button 
        onClick={onInstall}
        className="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium hover:bg-green-50 transition-colors"
      >
        Install
      </button>
    </div>
  );
};

// Network status indicator component
export const NetworkStatus = ({ isOnline, connectionType }) => {
  const getStatusColor = () => {
    if (!isOnline) return 'bg-red-500';
    if (connectionType === 'slow-2g' || connectionType === '2g') return 'bg-orange-500';
    if (connectionType === 'slow-3g' || connectionType === '3g') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (connectionType === 'slow-2g' || connectionType === '2g') return 'Slow Connection';
    if (connectionType === 'slow-3g' || connectionType === '3g') return '3G Network';
    if (connectionType === '4g') return '4G Network';
    return 'Online';
  };

  return (
    <div className={`fixed top-4 left-4 ${getStatusColor()} text-white px-3 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2`}>
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-red-200'} animate-pulse`} />
      <span className="text-sm font-medium">{getStatusText()}</span>
    </div>
  );
};

export default {
  usePWAInstall,
  useServiceWorker,
  useNetworkStatus,
  useOfflineStorage,
  usePushNotifications,
  InstallPrompt,
  NetworkStatus
};
