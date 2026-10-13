import { profile, projects, services, skillGroups, assetUrl } from '../data/portfolio.js';
import { usePreferences } from '../state/preferences.jsx';
import { Avatar, ProjectCard, SectionHeading, SectionLink, PageMetadata, container, muted, primaryButton, outlineButton } from '../components/common.jsx';
import ContactForm from '../components/ContactForm.jsx';

const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0);

export default function Home() {
  const { t, text, language } = usePreferences();
  const featured = projects.filter((project) => project.featured);
  const number = (value) => new Intl.NumberFormat(language).format(value);
  return <>
    <PageMetadata title={`${text(profile.name)} — ${text(profile.role)}`} description={text(profile.shortBio)} />
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-1/4 end-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid md:grid-cols-[1.05fr_.95fr] gap-14 items-center">
          <div>
            <p className="reveal text-sm font-medium text-accent tracking-widest uppercase mb-4">{t.heroEyebrow}</p>
            <h1 className="reveal font-display font-bold text-5xl md:text-6xl lg:text-8xl leading-[1.08] tracking-tight mb-6">{t.hello} <span className="text-accent">{text(profile.name)}</span> {t.helloEnd}</h1>
            <p className={`reveal text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-9 ${muted}`}>{text(profile.shortBio)}</p>
            <div className="reveal flex flex-wrap gap-4"><SectionLink section="work" className={primaryButton}>{t.viewWork} ↓</SectionLink><SectionLink section="contact" className={outlineButton}>{t.contactMe}</SectionLink></div>
            <dl className="reveal flex flex-wrap gap-x-10 gap-y-5 mt-12 pt-7 border-t border-zinc-100 dark:border-zinc-900">
              {[[number(projects.length), t.projects], [number(skillCount), t.tools], [text(profile.experience), t.experience]].map(([value, label]) => <div key={label}><dt className={`text-xs mt-1 ${muted}`}>{label}</dt><dd className="font-display font-bold text-3xl mt-1">{value}</dd></div>)}
            </dl>
          </div>
          <div className="reveal px-3 md:px-0 pb-4"><Avatar /></div>
        </div>
      </div>
    </section>

    <section id="services" className="py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/40">
      <div className={container}><SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} description={t.servicesDescription} />
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, index) => <article key={service.mark} className={`reveal rounded-2xl p-8 border hover:border-accent transition-colors ${index === 1 ? 'bg-zinc-900 dark:bg-zinc-800 text-white border-zinc-800' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'}`}>
            <span className="font-display font-bold block text-3xl text-accent mb-8 ltr-content" aria-hidden="true">{service.mark}</span>
            <h3 className="font-display font-bold text-xl mb-3">{text(service.title)}</h3><p className={`text-sm leading-relaxed ${index === 1 ? 'text-zinc-400' : muted}`}>{text(service.description)}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="skills" className="skills-panel py-20 md:py-24 bg-zinc-100 dark:bg-zinc-950">
      <div className={container}><SectionHeading eyebrow={t.skillsEyebrow} title={t.skillsTitle} description={t.skillsDescription} />
        <div className="space-y-8">{skillGroups.map((group) => <section key={group.id} className="reveal grid gap-6 rounded-3xl border border-zinc-200 bg-white/90 p-6 dark:border-white/10 dark:bg-zinc-900/90 sm:p-8 lg:grid-cols-[15rem_1fr] lg:gap-10" aria-labelledby={`skill-${group.id}`}>
          <div className="lg:border-e lg:border-zinc-200 dark:lg:border-zinc-700 lg:pe-8"><h3 id={`skill-${group.id}`} className="font-display text-2xl font-bold">{text(group.title)}</h3><p className={`mt-2 text-sm ${muted}`}>{number(group.skills.length)} {t.skillCount}</p></div>
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{group.skills.map((skill) => <li key={skill.title} className="skill-card group flex min-w-0 items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 hover:border-accent/70 dark:border-white/10 dark:bg-zinc-950">
            <span className="ltr-content flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800 font-display text-xl font-bold" aria-hidden="true">{skill.mark}</span><div className="min-w-0"><h4 className="ltr-content break-words font-display text-base font-bold group-hover:text-accent">{skill.title}</h4><p className={`mt-1 text-xs ${muted}`}>{text(group.title)}</p></div>
          </li>)}</ul>
        </section>)}</div>
      </div>
    </section>

    <section id="work" className="py-20 md:py-24"><div className={container}>
      <SectionHeading eyebrow={t.workEyebrow} title={t.workTitle} description={t.workDescription} />
      <div className="grid lg:grid-cols-2 gap-6">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0 && featured.length === 3} />)}</div>
    </div></section>

    <section id="about" className="py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/40"><div className={container}>
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="reveal order-2 md:order-1"><Avatar small /></div>
        <div className="order-1 md:order-2"><SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} />
          <div className={`reveal space-y-5 leading-relaxed ${muted}`}>{text(profile.bio).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <a href={assetUrl(profile.resume)} download className={`${outlineButton} mt-8`}>{t.resume} ↓</a>
        </div>
      </div>
    </div></section>

    <section id="contact" className="py-20 md:py-24 bg-zinc-950 text-white"><div className={container}>
      <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-16">
        <div><SectionHeading eyebrow={t.contactEyebrow} title={t.contactTitle} />
          <p className="reveal text-zinc-400 leading-relaxed mb-8">{t.contactDescription}</p>
          <div className="flex flex-wrap gap-5 text-sm">
            {profile.email ? <a className="text-accent underline underline-offset-4" href={`mailto:${profile.email}`}>{t.emailMe} ↗</a> : null}
            {profile.githubUrl ? <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a> : null}
            {profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a> : null}
          </div>
        </div>
        <ContactForm />
      </div>
    </div></section>
  </>;
}
