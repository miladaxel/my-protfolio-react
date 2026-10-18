import { Link, useParams } from 'react-router-dom';
import { projects, assetUrl } from '../data/portfolio.js';
import { usePreferences } from '../state/preferences.jsx';
import { PageMetadata, ProjectCard, SectionHeading, SectionLink, Tags, container, muted, primaryButton } from '../components/common.jsx';
import NotFound from './NotFound.jsx';

function ProjectScreenshot({ image, cover = false }) {
  const { text, t } = usePreferences();
  return <figure className="reveal min-w-0">
    <a href={assetUrl(image.src)} target="_blank" rel="noopener noreferrer"
      aria-label={`${t.viewFullImage}: ${text(image.alt)} (${t.newTab})`}
      className="group block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
      <img src={assetUrl(image.src)} alt={text(image.alt)} width={image.width} height={image.height}
        className="block w-full h-auto" loading={cover ? 'eager' : 'lazy'} fetchPriority={cover ? 'high' : 'auto'} />
      <span className="flex justify-end px-5 py-3 text-xs font-medium bg-white dark:bg-zinc-900 group-hover:text-accent transition-colors">{t.viewFullImage} <span className="ms-2" aria-hidden="true">↗</span></span>
    </a>
    {image.caption ? <figcaption className={`mt-4 max-w-3xl text-sm leading-relaxed ${muted}`}>{text(image.caption)}</figcaption> : null}
  </figure>;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { text, t, language } = usePreferences();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const related = projects.filter((item) => item.slug !== slug).slice(0, 3);
  const number = new Intl.NumberFormat(language, { minimumIntegerDigits: 2 });

  return <>
    <PageMetadata title={`${text(project.title)} — ${t.caseStudy}`} description={text(project.shortDescription)} />
    <article>
      <section className="pt-28 pb-12 md:pt-36 md:pb-20"><div className={container}>
        <SectionLink section="work" className={`inline-flex text-sm hover:text-accent mb-10 ${muted}`}>{language === 'fa' ? '→' : '←'} {t.backWork}</SectionLink>
        <div className="grid md:grid-cols-[1fr_.4fr] gap-10 items-end">
          <div className="min-w-0">
            <p className="reveal text-xs font-medium text-accent tracking-[.18em] uppercase mb-5">{project.category ? text(project.category) : t.caseStudy}</p>
            <h1 className="reveal font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-tight tracking-tight">{text(project.title)}</h1>
            {project.tagline ? <p className="reveal text-xl sm:text-2xl font-display font-bold leading-relaxed mt-4">{text(project.tagline)}</p> : null}
            {text(project.shortDescription) ? <p className={`reveal mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${muted}`}>{text(project.shortDescription)}</p> : null}
          </div>
          <dl className="reveal space-y-5 border-t md:border-t-0 md:border-s border-zinc-200 dark:border-zinc-800 pt-6 md:pt-0 md:ps-8">
            <div><dt className={`text-xs mb-2 ${muted}`}>{t.year}</dt><dd className="font-medium">{project.year}</dd></div>
            <div><dt className={`text-xs mb-2 ${muted}`}>{t.status}</dt><dd className="font-medium">{t.statuses[project.status] ?? t.statuses.draft}</dd></div>
            <div><dt className={`text-xs mb-2 ${muted}`}>{t.technology}</dt><dd><Tags skills={project.skills} /></dd></div>
          </dl>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          {project.images.length ? <Link to={{ pathname: `/projects/${project.slug}`, hash: '#project-gallery' }} className={primaryButton}>{t.exploreScreens} ↓</Link> : null}
          {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-3.5 text-sm font-medium hover:text-accent">{t.source} ↗</a> : null}
        </div>
        <div className="mt-10 md:mt-14">
          {project.thumbnail ? <ProjectScreenshot cover image={{ src: project.thumbnail, alt: project.coverCaption ?? project.title, caption: project.coverCaption, width: 1920, height: 1020 }} /> : null}
        </div>
      </div></section>

      {text(project.description).length ? <section className="py-12 md:py-20"><div className={`${container} grid md:grid-cols-[.7fr_1.3fr] gap-8 md:gap-16`}>
        <SectionHeading eyebrow={t.overviewEyebrow} title={t.overview} />
        <div className={`reveal space-y-5 text-base sm:text-lg leading-relaxed ${muted}`}>{text(project.description).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div></section> : null}

      {project.challenge && project.approach ? <section className="py-12 md:py-16"><div className={`${container} grid md:grid-cols-2 gap-10 md:gap-16`}>
        {[['challenge', t.challenge], ['approach', t.approach]].map(([key, label]) => <div key={key} className="reveal border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <p className="text-xs font-medium text-accent mb-4">{label}</p>
          <h2 className="font-display font-bold text-2xl leading-relaxed mb-4">{text(project[key].title)}</h2>
          <p className={`leading-relaxed ${muted}`}>{text(project[key].description)}</p>
        </div>)}
      </div></section> : null}

      {project.features.length ? <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900/40"><div className={container}>
        <SectionHeading eyebrow={t.featuresEyebrow} title={text(project.sectionTitles?.features) || t.features} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">{project.features.map((feature) => <article key={feature.title.en} className="reveal border-t border-zinc-300 dark:border-zinc-700 pt-6">
          <h3 className="font-display font-bold text-xl mb-3">{text(feature.title)}</h3>
          {text(feature.description) ? <p className={`text-sm leading-relaxed ${muted}`}>{text(feature.description)}</p> : null}
        </article>)}</div>
      </div></section> : null}

      {project.workflow?.length ? <section className="py-16 md:py-20"><div className={container}>
        <SectionHeading eyebrow={text(project.sectionTitles?.workflowEyebrow) || t.workflowEyebrow} title={text(project.sectionTitles?.workflow) || t.workflow} />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{project.workflow.map((step, index) => <li key={step.title.en} className="reveal border-s-2 border-accent ps-5">
          <span className={`block text-sm mb-5 tabular-nums ${muted}`} aria-hidden="true">{number.format(index + 1)}</span>
          <h3 className="font-display font-bold text-lg mb-2">{text(step.title)}</h3>
          <p className={`text-sm leading-relaxed ${muted}`}>{text(step.description)}</p>
        </li>)}</ol>
      </div></section> : null}

      {project.images.length ? <section id="project-gallery" className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900/40"><div className={container}>
        <SectionHeading eyebrow={t.galleryEyebrow} title={t.gallery} description={t.galleryDescription} />
        <div className="space-y-14">{project.images.map((image) => <div key={image.src}>
          {image.title ? <h3 className="reveal font-display font-bold text-xl sm:text-2xl mb-6">{text(image.title)}</h3> : null}
          <ProjectScreenshot image={{ width: 1920, height: 1020, ...image, alt: image.alt ?? image.caption ?? project.title }} />
        </div>)}</div>
      </div></section> : null}

      {project.stack?.length ? <section className="py-16 md:py-20"><div className={`${container} grid md:grid-cols-[.7fr_1.3fr] gap-8 md:gap-16`}>
        <SectionHeading eyebrow={t.stackEyebrow} title={text(project.sectionTitles?.stack) || t.stack} />
        <dl className="reveal divide-y divide-zinc-200 dark:divide-zinc-800">{project.stack.map((item) => <div key={item.name} className="grid sm:grid-cols-[8rem_1fr] gap-3 py-6 first:pt-0">
          <dt className="font-display font-bold ltr-content text-start">{item.name}</dt><dd className={`text-sm leading-relaxed ${muted}`}>{text(item.description)}</dd>
        </div>)}</dl>
      </div></section> : null}

      {project.linkedinUrl ? <section className="py-12"><div className={container}><a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>{t.update} ↗</a></div></section> : null}
    </article>

    {related.length ? <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40"><div className={container}>
      <SectionHeading eyebrow={t.moreEyebrow} title={t.moreProjects} />
      <div className="grid md:grid-cols-2 gap-6">{related.map((item) => <ProjectCard key={item.slug} project={item} />)}</div>
    </div></section> : null}
    <section className="py-20 md:py-24 border-t border-zinc-200 dark:border-zinc-800"><div className={`${container} text-center`}>
      <p className="text-xs text-accent tracking-widest uppercase mb-4">{t.nextConversation}</p><h2 className="font-display font-bold text-3xl md:text-5xl mb-5">{t.contactTitle}</h2>
      <p className={`max-w-lg mx-auto mb-8 leading-relaxed ${muted}`}>{t.nextDescription}</p><SectionLink section="contact" className={primaryButton}>{t.conversation} {language === 'fa' ? '←' : '→'}</SectionLink>
    </div></section>
  </>;
}
