import { useParams } from 'react-router-dom';
import { projects, assetUrl } from '../data/portfolio.js';
import { usePreferences } from '../state/preferences.jsx';
import { PageMetadata, ProjectCard, SectionHeading, SectionLink, Tags, container, muted, primaryButton } from '../components/common.jsx';
import NotFound from './NotFound.jsx';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { text, t, language } = usePreferences();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const related = projects.filter((item) => item.slug !== slug).slice(0, 3);

  return <>
    <PageMetadata title={`${text(project.title)} — ${t.caseStudy}`} description={text(project.shortDescription)} />
    <article>
      <section className="pt-28 pb-16 md:pt-36 md:pb-20"><div className={container}>
        <SectionLink section="work" className={`inline-flex text-sm hover:text-accent mb-12 ${muted}`}>{language === 'fa' ? '→' : '←'} {t.backWork}</SectionLink>
        <div className="grid md:grid-cols-[1fr_.4fr] gap-10 items-end">
          <div><p className="reveal text-xs font-medium text-accent tracking-[.22em] uppercase mb-4">{t.caseStudy} · {t.demo}</p>
            <h1 className="reveal font-display font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tight mb-6">{text(project.title)}</h1>
            <p className={`reveal text-lg leading-relaxed max-w-2xl ${muted}`}>{text(project.shortDescription)}</p>
          </div>
          <dl className="reveal space-y-5 border-t md:border-t-0 md:border-s border-zinc-200 dark:border-zinc-800 pt-6 md:pt-0 md:ps-8">
            <div><dt className={`text-xs mb-2 ${muted}`}>{t.year}</dt><dd className="font-medium">{project.year}</dd></div>
            <div><dt className={`text-xs mb-2 ${muted}`}>{t.status}</dt><dd className="font-medium">{t.statuses[project.status] ?? t.statuses.draft}</dd></div>
            <div><dt className={`text-xs mb-2 ${muted}`}>{t.technology}</dt><dd><Tags skills={project.skills} /></dd></div>
          </dl>
        </div>
        <div className="reveal mt-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <img src={assetUrl(project.thumbnail)} alt={text(project.title)} className="w-full aspect-[1.54] object-cover" width="1000" height="650" />
        </div>
      </div></section>

      <section className="py-16 md:py-20"><div className={`${container} grid md:grid-cols-[.7fr_1.3fr] gap-10`}>
        <SectionHeading eyebrow={t.overviewEyebrow} title={t.overview} />
        <div className={`reveal space-y-5 text-lg leading-relaxed ${muted}`}>{text(project.description).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div></section>

      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40"><div className={container}>
        <SectionHeading eyebrow={t.featuresEyebrow} title={t.features} />
        <div className="grid md:grid-cols-3 gap-6">{project.features.map((feature) => <article key={feature.title.en} className="reveal rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7">
          <span className="block text-accent text-xl mb-5" aria-hidden="true">↗</span>
          <h3 className="font-display font-bold text-xl mb-3">{text(feature.title)}</h3><p className={`text-sm leading-relaxed ${muted}`}>{text(feature.description)}</p>
        </article>)}</div>
      </div></section>

      <section className="py-20"><div className={container}>
        <SectionHeading eyebrow={t.galleryEyebrow} title={t.gallery} />
        <div className={`grid gap-8 ${project.images.length > 1 ? 'md:grid-cols-2' : ''}`}>{project.images.map((image) => <figure key={image.src} className="reveal">
          <img src={assetUrl(image.src)} alt={text(image.caption)} width="1000" height="650" className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800" loading="lazy" />
          <figcaption className={`mt-3 text-sm leading-relaxed ${muted}`}>{text(image.caption)}</figcaption>
        </figure>)}</div>
      </div></section>

      {project.githubUrl || project.linkedinUrl ? <section className="py-16 border-y border-zinc-200 dark:border-zinc-800"><div className={container}>
        <SectionHeading eyebrow={t.links} title={t.links} />
        <div className="flex flex-wrap gap-6">
          {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>{t.source} ↗</a> : null}
          {project.linkedinUrl ? <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>{t.update} ↗</a> : null}
        </div>
      </div></section> : null}
    </article>

    <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40"><div className={container}>
      <SectionHeading eyebrow={t.moreEyebrow} title={t.moreProjects} />
      <div className="grid md:grid-cols-2 gap-6">{related.map((item) => <ProjectCard key={item.slug} project={item} />)}</div>
    </div></section>
    <section className="py-24"><div className={`${container} text-center`}>
      <p className="text-xs text-accent tracking-widest uppercase mb-4">{t.nextConversation}</p><h2 className="font-display font-bold text-4xl md:text-5xl mb-5">{t.contactTitle}</h2>
      <p className={`max-w-lg mx-auto mb-8 leading-relaxed ${muted}`}>{t.nextDescription}</p><SectionLink section="contact" className={primaryButton}>{t.conversation} {language === 'fa' ? '←' : '→'}</SectionLink>
    </div></section>
  </>;
}
