import { useState, useEffect, useCallback } from 'react';

export type Route = '/' | '/admin' | '404';

function getRouteFromPath(pathname: string): Route {
  // Remove trailing slash except for root
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  
  switch (path) {
    case '/':
    case '':
      return '/';
    case '/admin':
      return '/admin';
    default:
      return '404';
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => {
    return getRouteFromPath(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setRoute(getRouteFromPath(path));
  }, []);

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const goToAdmin = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  return {
    route,
    navigate,
    goHome,
    goToAdmin,
  };
}
