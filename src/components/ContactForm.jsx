import { useRef, useState } from 'react';
import { usePreferences } from '../state/preferences.jsx';

const fields = [
  { name: 'name', required: true, maxLength: 120, autoComplete: 'name', placeholder: 'namePlaceholder' },
  { name: 'email', type: 'email', maxLength: 254, autoComplete: 'email', placeholder: 'you@example.com', ltr: true },
  { name: 'telegram', maxLength: 33, placeholder: '@username', ltr: true },
  { name: 'phone', type: 'tel', maxLength: 26, autoComplete: 'tel', placeholder: '+98 …', ltr: true },
  { name: 'subject', required: true, maxLength: 200, placeholder: 'subjectPlaceholder', full: true },
  { name: 'message', required: true, maxLength: 5000, placeholder: 'messagePlaceholder', full: true, multiline: true },
];

export default function ContactForm() {
  const { t } = usePreferences();
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    for (const key of Object.keys(data)) data[key] = data[key].trim();
    const nextErrors = {};
    for (const field of ['name', 'subject', 'message']) {
      if (!data[field]) nextErrors[field] = 'required';
    }
    if (!data.email && !data.telegram && !data.phone) nextErrors.contact = 'contactRequired';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) nextErrors.email = 'invalidEmail';
    if (data.telegram && !/^@?[A-Za-z0-9_]{5,32}$/.test(data.telegram)) nextErrors.telegram = 'invalidTelegram';
    if (data.phone && !/^\+?[0-9][0-9\s().-]{6,24}$/.test(data.phone)) nextErrors.phone = 'invalidPhone';
    setErrors(nextErrors);
    setPreview(null);
    if (Object.keys(nextErrors).length) {
      const firstField = fields.find((field) => nextErrors[field.name]);
      formRef.current.elements[firstField?.name ?? 'email'].focus();
      return;
    }
    setPreview(data);
  }

  return <div className="reveal rounded-3xl border border-white/10 bg-zinc-900 p-5 sm:p-8">
    <form ref={formRef} noValidate onSubmit={submit} aria-describedby="contact-help contact-demo">
      <p id="contact-help" className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.contactHelp}</p>
      <div className="grid sm:grid-cols-2 gap-5">
        {fields.map((field) => {
          const Field = field.multiline ? 'textarea' : 'input';
          return <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
            <label htmlFor={`contact-${field.name}`} className="block text-xs font-medium text-zinc-300 mb-2">{t[field.name]} {field.required ? <span aria-hidden="true">*</span> : null}</label>
            <Field id={`contact-${field.name}`} name={field.name} type={field.multiline ? undefined : field.type ?? 'text'} rows={field.multiline ? 5 : undefined}
              required={field.required} maxLength={field.maxLength} autoComplete={field.autoComplete ?? 'off'} dir={field.ltr ? 'ltr' : undefined}
              placeholder={t[field.placeholder] ?? field.placeholder} aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
              onChange={() => { if (preview) setPreview(null); }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-accent transition-colors" />
            {errors[field.name] ? <p id={`contact-${field.name}-error`} className="mt-2 text-xs text-orange-300">{t[errors[field.name]]}</p> : null}
          </div>;
        })}
      </div>
      {errors.contact ? <p role="alert" className="text-sm text-orange-300 mt-5">{t.contactRequired}</p> : null}
      <p id="contact-demo" className="mt-6 text-xs leading-relaxed text-zinc-400">{t.contactDemo}</p>
      <button type="submit" className="mt-5 w-full bg-accent hover:bg-accent-light text-white font-medium rounded-full px-6 py-3.5 transition-colors">{t.preview}</button>
      <p role="status" aria-live="polite" className="mt-4 text-sm text-emerald-300">{preview ? t.previewSuccess : ''}</p>
    </form>
    {preview ? <section aria-label={t.previewTitle} className="mt-5 border-t border-zinc-700 pt-6">
      <h3 className="font-display text-xl font-bold text-white mb-4">{t.previewTitle}</h3>
      <dl className="space-y-3 text-sm">
        {fields.filter((field) => preview[field.name]).map((field) => <div key={field.name}>
          <dt className="text-zinc-400 mb-1">{t[field.name]}</dt>
          <dd dir={field.ltr ? 'ltr' : undefined} className="text-zinc-100 whitespace-pre-wrap break-words">{preview[field.name]}</dd>
        </div>)}
      </dl>
    </section> : null}
  </div>;
}
