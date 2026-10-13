import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl, profile } from '../data/portfolio.js';
import { usePreferences } from '../state/preferences.jsx';

export const container = 'max-w-6xl mx-auto px-5 sm:px-6';
export const muted = 'text-zinc-500 dark:text-zinc-400';
export const primaryButton = 'hero-cta inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-7 py-3.5 text-sm font-medium hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-colors';
export const outlineButton = 'inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-7 py-3.5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors';

export function SectionLink({ section, children, ...props }) {
  return <Link to={{ pathname: '/', hash: `#${section}` }} {...props}>{children}</Link>;
}

export function SectionHeading({ eyebrow, title, description, ...props }) {
  return <div className="max-w-2xl mb-12" {...props}>
    <p className="reveal text-xs font-medium text-accent tracking-[.22em] uppercase mb-3">{eyebrow}</p>
    <h2 className="reveal font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">{title}</h2>
    {description ? <p className={`reveal mt-5 leading-relaxed ${muted}`}>{description}</p> : null}
  </div>;
}

export function Tags({ skills }) {
  const { t } = usePreferences();
  return <ul className="flex flex-wrap gap-2" aria-label={t.technology}>
    {skills.map((skill) => <li key={skill} className="ltr-content text-xs px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">{skill}</li>)}
  </ul>;
}

export function Avatar({ small = false }) {
  const { t } = usePreferences();
  return <div className={`relative w-full ${small ? 'max-w-sm' : 'max-w-[28rem]'} aspect-square mx-auto`}>
    <div className="avatar-frame h-full rounded-3xl flex flex-col items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <span className="font-display font-bold text-[10rem] sm:text-[13rem] leading-none text-zinc-300 dark:text-zinc-700" aria-hidden="true">{profile.initials}</span>
      <span className="text-xs text-zinc-500 tracking-widest uppercase mt-5">{t.sampleProfile}</span>
    </div>
    {!small ? <div className="absolute -bottom-4 start-3 sm:-start-4 bg-accent text-white font-display font-bold text-sm px-5 py-3 rounded-2xl shadow-lg">{t.available}</div> : null}
  </div>;
}

export function ProjectCard({ project, featured = false }) {
  const { t, text, language } = usePreferences();
  return <article className={`project-card reveal group rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-accent transition-colors ${featured ? 'lg:row-span-2' : ''}`}>
    <Link to={`/projects/${project.slug}`} className="block rounded-2xl h-full">
      <div className={`overflow-hidden bg-zinc-100 dark:bg-zinc-800 ${featured ? 'h-64 lg:h-80' : 'h-56'}`}>
        <img src={assetUrl(project.thumbnail)} alt={text(project.title)} className="project-cover w-full h-full object-cover" width="1000" height="650" loading="lazy" />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-start gap-2 mb-4"><Tags skills={project.skills.slice(0, 3)} /><span className={`ms-auto text-xs pt-1 ${muted}`}>{project.year}</span></div>
        <h3 className="font-display font-bold text-2xl group-hover:text-accent transition-colors">{text(project.title)}</h3>
        <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{text(project.shortDescription)}</p>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <span className="text-sm font-medium group-hover:text-accent">{t.viewProject} {language === 'fa' ? '←' : '→'}</span>
          <span className="ms-auto text-xs text-zinc-500">{t.demo}</span>
        </div>
      </div>
    </Link>
  </article>;
}

export function PageMetadata({ title, description }) {
  const { language } = usePreferences();
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[property="og:description"]').content = description;
  }, [title, description, language]);
  return null;
}
