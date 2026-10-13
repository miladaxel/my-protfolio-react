import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePreferences } from '../state/preferences.jsx';
import { SectionLink, container, muted } from './common.jsx';

const sectionIds = ['services', 'skills', 'work', 'about', 'contact'];

function Header() {
  const { t, language, dark, toggleTheme, toggleLanguage } = usePreferences();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const headerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      headerRef.current?.classList.toggle('header-scrolled', window.scrollY > 20);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
      let nextActive = pathname.startsWith('/projects/') ? 'work' : '';
      if (pathname === '/') {
        for (const id of [...sectionIds].reverse()) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= 150) { nextActive = id; break; }
        }
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) nextActive = 'contact';
      }
      setActive(nextActive);
    }
    function onScroll() { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [pathname, language]);

  useEffect(() => {
    function onEscape(event) { if (event.key === 'Escape') setMenuOpen(false); }
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  function navigation(mobile = false) {
    return <ul className={mobile ? 'px-5 py-5 flex flex-col gap-4 text-sm font-medium' : 'hidden md:flex items-center gap-6 lg:gap-8 text-sm'}>
      {sectionIds.map((id) => <li key={id}><SectionLink section={id} onClick={() => setMenuOpen(false)} aria-current={active === id ? 'location' : undefined}
        className={`nav-link rounded-sm transition-colors ${active === id ? 'text-accent font-medium' : muted}`}>{t.nav[id]}</SectionLink></li>)}
    </ul>;
  }

  return <>
    <div ref={progressRef} className="progress-line" aria-hidden="true" />
    <header ref={headerRef} className="site-header fixed inset-x-0 top-0 z-50">
      <nav className={`${container} h-16 flex items-center justify-between gap-3`} aria-label={t.navigation}>
        <SectionLink section="hero" onClick={() => setMenuOpen(false)} className="font-display font-bold text-xl tracking-tight rounded-sm ltr-content" aria-label={t.home}>port<span className="text-accent">folio</span></SectionLink>
        {navigation()}
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="shell-button text-xs font-bold px-3 ltr-content" aria-label={t.language} onClick={toggleLanguage}>{language === 'fa' ? 'EN' : 'فا'}</button>
          <button type="button" className="shell-button" aria-label={dark ? t.light : t.dark} onClick={toggleTheme}><span aria-hidden="true">{dark ? '◑' : '◐'}</span></button>
          <button type="button" className="shell-button md:hidden text-xl" aria-label={t.menu} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}><span aria-hidden="true">{menuOpen ? '×' : '≡'}</span></button>
        </div>
      </nav>
      <div id="mobile-menu" hidden={!menuOpen} className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">{navigation(true)}</div>
    </header>
  </>;
}

export default function Layout({ children }) {
  const { t, language } = usePreferences();
  const location = useLocation();
  const mainRef = useRef(null);
  const previousPath = useRef(location.pathname);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      if (previousPath.current !== location.pathname) mainRef.current?.focus({ preventScroll: true });
      previousPath.current = location.pathname;
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
      }
    }, { threshold: .05 });
    for (const element of elements) { element.classList.add('reveal-pending'); observer.observe(element); }
    return () => { observer.disconnect(); for (const element of elements) element.classList.remove('reveal-pending'); };
  }, [location.pathname, language]);

  return <>
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); mainRef.current?.focus(); }}>{t.skip}</a>
    <Header />
    <main id="main-content" ref={mainRef} tabIndex={-1} className="relative z-10 outline-none">{children}</main>
    <footer className="relative border-t border-zinc-200 dark:border-zinc-900">
      <div className={`${container} py-8 flex flex-col sm:flex-row items-center justify-between gap-5`}>
        <div className="text-center sm:text-start"><p className={`text-sm ${muted}`}>© {new Date().getFullYear()} {t.copyright}</p><p className="text-xs text-zinc-500 mt-2">{t.demoNote}</p></div>
        <button type="button" className="text-xs text-zinc-500 hover:text-accent transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>{t.backTop}</button>
      </div>
    </footer>
  </>;
}
