import { Link } from 'react-router-dom';
import { usePreferences } from '../state/preferences.jsx';
import { PageMetadata, primaryButton, muted, container } from '../components/common.jsx';

export default function NotFound() {
  const { t } = usePreferences();
  return <section className="min-h-[75vh] flex items-center pt-24 pb-16"><div className={`${container} text-center`}>
    <PageMetadata title={`404 — ${t.notFound}`} description={t.notFoundDescription} />
    <p className="font-display text-8xl text-accent font-bold mb-6">404</p>
    <h1 className="font-display text-3xl sm:text-4xl font-bold mb-5">{t.notFound}</h1>
    <p className={`${muted} mb-8 max-w-lg mx-auto leading-relaxed`}>{t.notFoundDescription}</p><Link to="/" className={primaryButton}>{t.returnHome}</Link>
  </div></section>;
}
