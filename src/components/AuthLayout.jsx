import EventIllustration from './EventIllustration'

export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-teal-900">
      <div className="hidden w-1/2 animate-float md:block">
        <EventIllustration />
      </div>

      <div className="flex w-full items-center justify-center bg-cream px-6 py-12 md:w-1/2 md:rounded-l-blob">
        <div className="w-full max-w-sm animate-fade-up">
          <span className="text-xs font-medium uppercase tracking-wide text-mint-400">{eyebrow}</span>
          <h1 className="mt-2 text-3xl font-bold text-teal-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-ink/60">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
