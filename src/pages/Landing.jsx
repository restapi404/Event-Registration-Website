import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import EventIllustration from '../components/EventIllustration'
import Reveal from '../components/Reveal'

export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Banner */}
      <section className="relative overflow-hidden bg-teal-900 text-white">
        {/* soft drifting glow accents */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-drift rounded-full bg-mint-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 animate-drift rounded-full bg-gold/10 blur-3xl [animation-delay:2s]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="w-fit animate-fade-up rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-mint-300">
              XXXX Club presents
            </span>
            <h1 className="mt-5 animate-fade-up text-4xl font-bold leading-tight [animation-delay:100ms] sm:text-5xl md:text-5xl">
              ZENITH 2026
            </h1>
            <p className="mt-4 max-w-md animate-fade-up text-white/70 [animation-delay:200ms]">
              Two days of tech talks, hackathons, competitions and a culture night —
              open to every student on campus. One registration gets you into it all.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:300ms]">
              <Link
                to="/register"
                className="btn-primary bg-gold text-teal-900 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/20"
              >
                Register now
              </Link>
              <a href="#about" className="btn-outline transition-transform duration-200 hover:-translate-y-0.5">
                Learn more
              </a>
            </div>
          </div>

          <div className="min-h-[280px] animate-float overflow-hidden rounded-blob md:min-h-0">
            <EventIllustration />
          </div>
        </div>
      </section>

      {/* Description */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <Reveal className="md:col-span-1">
            <h2 className="text-2xl font-bold text-teal-900">What is ZENITH?</h2>
            <p className="mt-3 text-sm text-ink/70">
              ZENITH is our department's flagship annual fest, bringing together students from
              every branch for two days of building, competing and celebrating.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:col-span-2">
            {[
              { title: '24-hr Hackathon', copy: 'Build with a team of up to four, judged by industry mentors.' },
              { title: 'Tech Talks', copy: 'Sessions from alumni and engineers working across the industry.' },
              { title: 'Culture Night', copy: 'Live music, dance and open-mic to close out day two.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 120}>
                <div className="h-full rounded-2xl border border-teal-900/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-mint-400/50 hover:shadow-lg">
                  <h3 className="font-semibold text-teal-700">{card.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{card.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-teal-900">Event timeline</h2>
          </Reveal>
          <div className="mt-10">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <Reveal className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-teal-900">Seats fill up fast every year.</h2>
        <p className="mt-2 text-sm text-ink/70">Registration takes less than two minutes.</p>
        <Link
          to="/register"
          className="btn-primary mt-6 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Register now
        </Link>
      </Reveal>

      <footer className="border-t border-teal-900/10 py-6 text-center text-xs text-ink/50">
        Organised by the XXXX Club · ZENITH 2026
      </footer>
    </div>
  )
}
