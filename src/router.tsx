import { AnchorHTMLAttributes, createContext, MouseEvent, ReactNode, Ref, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface NavigateOptions {
  /** Replace the current history entry (redirects) instead of adding one. */
  replace?: boolean;
}

interface RouterValue {
  path: string;
  navigate: (to: string, options?: NavigateOptions) => void;
}

const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });

/** Strip query/hash and trailing slash so "/journal/" and "/journal" match the same route. */
export function cleanPath(url: string): string {
  const path = url.split(/[?#]/)[0] || '/';
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function Router({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [path, setPath] = useState(() => cleanPath(initialPath));
  const pathRef = useRef(path);
  pathRef.current = path;

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const onPop = (e: PopStateEvent) => {
      const next = cleanPath(location.pathname);
      // A plain <a href="#section"> also fires popstate: let the browser scroll to the section.
      if (next === pathRef.current && location.hash && !e.state) return;
      setPath(next);
      const y = e.state && typeof e.state.scrollY === 'number' ? e.state.scrollY : 0;
      // Runs once React has rendered the page we came back to.
      window.setTimeout(() => {
        const el = !e.state && location.hash ? document.getElementById(location.hash.slice(1)) : null;
        if (el) el.scrollIntoView({ block: 'start' });
        else window.scrollTo(0, y);
      }, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    const [target, hash] = to.split('#');
    const changesPage = Boolean(target) && cleanPath(target) !== cleanPath(location.pathname);
    // Remember where we were so the back button restores the scroll position.
    history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, '');
    if (changesPage) {
      if (options?.replace) history.replaceState({ scrollY: 0 }, '', to);
      else history.pushState({ scrollY: 0 }, '', to);
      setPath(cleanPath(target));
    } else if (hash) {
      history.pushState({ scrollY: window.scrollY }, '', to);
    }
    const scroll = () => {
      const el = hash ? document.getElementById(hash) : null;
      if (el) el.scrollIntoView({ block: 'start' });
      else window.scrollTo(0, 0);
    };
    // Same page: scroll now. New page: wait until React has rendered it, right after the click handler.
    if (changesPage) window.setTimeout(scroll, 0);
    else scroll();
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: Ref<HTMLAnchorElement> };

/** Internal link: a real <a href> (crawlable) that navigates client-side on plain clicks. */
export function Link({ href, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={handleClick} {...rest} />;
}
