"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { site, hero, campaigns, formats, consistency, previs, contact } from "@/data";

// Opens a Gmail compose window addressed to both of us
const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(contact.emails.join(","))}` +
  `&su=${encodeURIComponent(contact.emailSubject)}` +
  `&body=${encodeURIComponent(contact.emailBody)}`;

// Makes file names with spaces, & or ' work in web addresses
const url = (p?: string) => (p ? encodeURI(p) : "");

/* ---------- Small reusable pieces (no content lives here) ---------- */

// Fades + lifts content in when it scrolls into view
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Shown whenever a video/image file is missing
function Placeholder({ label }: { label?: string }) {
  return (
    <div
      className="absolute inset-0 flex items-end p-4"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.28), transparent 55%), radial-gradient(circle at 80% 90%, rgba(232,185,74,0.2), transparent 50%), #0b1020",
      }}
    >
      {label && <span className="font-display text-sm text-white/50">{label}</span>}
    </div>
  );
}

// Image that fills a box of fixed shape (used for video posters)
function SafeImage({ src, alt }: { src?: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const i = ref.current;
    if (i && i.complete && i.naturalWidth === 0) setFailed(true);
  }, []);
  if (!src || failed) return <Placeholder label={alt} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={url(src)} alt={alt} onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />;
}

// Image shown at its own natural shape (used for model sheets and storyboards)
function NaturalImage({ src, alt }: { src?: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const i = ref.current;
    if (i && i.complete && i.naturalWidth === 0) setFailed(true);
  }, []);
  if (!src || failed) {
    return (
      <div className="relative aspect-video w-full">
        <Placeholder label={alt} />
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={url(src)} alt={alt} onError={() => setFailed(true)} className="block h-auto w-full" />;
}

// 9:16 video card: plays on hover (desktop) or tap (mobile)
function VideoCard({ title, tag, video, poster, ratio = "9:16" }: { title: string; tag: string; video: string; poster?: string; ratio?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [rw, rh] = ratio.split(":").map(Number);
  const r = rw / rh;
  const width = r < 0.9 ? "w-[calc(50%-10px)] md:w-60" : r <= 1.4 ? "w-full sm:w-[calc(50%-10px)] md:w-72" : "w-full md:w-[28rem]";
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  // If the video file is missing, show the placeholder instead of a black box
  useEffect(() => {
    const v = ref.current;
    if (v && (v.error || v.networkState === 3)) setFailed(true);
  }, []);

  const [sound, setSound] = useState(false);

  // Hover = play WITH sound. If the browser blocks sound (no click on the page yet),
  // it falls back to silent playback until the visitor clicks once.
  const startWithSound = async () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    try {
      await v.play();
      setPlaying(true);
      setSound(true);
    } catch {
      v.muted = true;
      try {
        await v.play();
        setPlaying(true);
        setSound(false);
      } catch {}
    }
  };
  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.muted = true;
    setPlaying(false);
    setSound(false);
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group glass overflow-hidden rounded-2xl ${width}`}
    >
      <button
        type="button"
        aria-label={`Play ${title}`}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") startWithSound(); }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") stop(); }}
        onClick={(e) => {
          const isTouch = (e.nativeEvent as PointerEvent).pointerType !== "mouse";
          if (isTouch && playing) return stop(); // tap again to stop on phones
          startWithSound();
        }}
        style={{ aspectRatio: `${rw} / ${rh}` }}
        className="relative block w-full overflow-hidden bg-black text-left"
      >
        {video && !failed ? (
          <video
            ref={ref}
            src={`${url(video)}#t=0.1`}
            poster={poster ? url(poster) : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <SafeImage src={poster} alt="" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a13]/90 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.7),inset_0_0_40px_rgba(34,211,238,0.25)] transition-opacity duration-500 group-hover:opacity-100" />
        {playing && !sound && (
          <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white backdrop-blur">
            Click once to enable sound
          </div>
        )}
        <div className="pointer-events-none absolute bottom-0 p-4">
          <p className="font-display text-base font-semibold leading-tight text-white">{title}</p>
          <p className="mt-1 text-xs text-[#e8b94a]">{tag}</p>
        </div>
      </button>
    </motion.article>
  );
}

function SectionTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{intro}</p>}
    </Reveal>
  );
}

const field =
  "w-full rounded-xl border border-white/10 bg-[#0c1224] px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#22d3ee] focus:outline-none";

// Enquiry form: emails both addresses in data.ts (via FormSubmit)
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => { if (k !== "formats") data[k] = String(v); });
    data.formats = fd.getAll("formats").join(", ") || "Not specified";
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contact.emails[0]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _cc: contact.emails.slice(1).join(","),
          _subject: `New enquiry from ${data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="rounded-2xl border border-[#22d3ee]/40 bg-[#22d3ee]/10 p-6 text-center text-white">{contact.successText}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Your name *" className={field} />
        <input name="email" type="email" required placeholder="Your email *" className={field} />
        <input name="phone" placeholder="Phone or WhatsApp" className={field} />
        <input name="company" placeholder="Company or brand" className={field} />
        <select name="projectType" defaultValue="" className={field}>
          <option value="" disabled>Project type</option>
          {contact.projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select name="budget" defaultValue="" className={field}>
          <option value="" disabled>Budget range</option>
          {contact.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <input name="deadline" placeholder="Deadline or launch date" className={field} />
      <fieldset>
        <legend className="mb-2 text-sm text-slate-400">Aspect ratios you need</legend>
        <div className="flex flex-wrap gap-2">
          {formats.items.map((f) => (
            <label key={f.ratio} className="cursor-pointer">
              <input type="checkbox" name="formats" value={f.ratio} className="peer sr-only" />
              <span className="block rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition peer-checked:border-[#22d3ee] peer-checked:bg-[#22d3ee]/15 peer-checked:text-white peer-focus-visible:outline-2">
                {f.ratio}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <textarea name="message" required rows={5} placeholder="Tell us about your project *" className={field} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-8 py-4 font-semibold text-[#070a13] transition-shadow hover:shadow-[0_0_36px_rgba(34,211,238,0.55)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : contact.submitLabel}
      </button>
      {status === "error" && <p className="text-center text-sm text-red-300">{contact.errorText}</p>}
    </form>
  );
}

/* ------------------------------ Page ------------------------------ */

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-x-hidden">
        {/* Navigation */}
        <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[#070a13] via-[#070a13] to-transparent pb-6">
          <nav className="mx-auto mt-4 flex w-[92%] max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#0c1224] px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <a href="#top" className="font-display text-base font-bold tracking-[0.2em] text-white">{site.name}</a>
            <a href="#contact" className="rounded-full bg-[#22d3ee] px-4 py-1.5 text-sm font-semibold text-[#070a13] transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.6)]">
              Hire Us!
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section id="top" ref={heroRef} className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
          <div className="grid-bg absolute inset-0" />
          <motion.div style={{ y: glowY }} className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ x: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#3b82f6]/30 blur-[140px]"
            />
            <motion.div
              animate={{ x: [0, -30, 0], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-[#e8b94a]/20 blur-[140px]"
            />
          </motion.div>

          <motion.div style={{ opacity: heroFade }} className="relative mx-auto w-full max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-sm text-[#22d3ee]"
            >
              {site.role}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              {hero.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href={hero.primaryCta.href} className="rounded-full bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-7 py-3.5 font-semibold text-[#070a13] transition-shadow hover:shadow-[0_0_36px_rgba(34,211,238,0.55)]">
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="glass rounded-full px-7 py-3.5 font-semibold text-white transition-colors hover:border-[#e8b94a]/60">
                {hero.secondaryCta.label}
              </a>
            </motion.div>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-14 flex flex-wrap gap-3"
            >
              {hero.highlights.map((h) => (
                <li key={h} className="glass rounded-full px-4 py-2 text-sm text-slate-300">{h}</li>
              ))}
            </motion.ul>
          </motion.div>
        </section>

        {/* Campaigns */}
        <section id="work" className="scroll-mt-28 mx-auto max-w-6xl space-y-24 px-6 py-24">
          {campaigns.map((c) => (
            <div key={c.id}>
              <SectionTitle title={`${c.sectionTitle}: ${c.client}`} intro={c.intro} />
              <div className="flex flex-wrap gap-5">
                {c.projects.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.1} className="contents">
                    <VideoCard {...p} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Aspect ratios */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <SectionTitle title={formats.title} intro={formats.intro} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {formats.items.map((f, i) => (
              <Reveal key={f.ratio} delay={(i % 3) * 0.08}>
                <div className="glass flex h-full items-center gap-4 rounded-2xl p-4 transition-colors hover:border-[#22d3ee]/50">
                  <div className="flex h-20 w-24 flex-none items-center justify-center">
                    <div
                      style={{ aspectRatio: `${f.w} / ${f.h}`, ...(f.w >= f.h ? { width: "100%" } : { height: "100%" }) }}
                      className="max-h-full max-w-full rounded-md border border-[#22d3ee]/60 bg-[#22d3ee]/10"
                    />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{f.ratio}</p>
                    <p className="text-xs text-slate-400">{f.use}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* AI Consistency Engine */}
        <section id="consistency" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-24">
          <SectionTitle title={consistency.title} intro={consistency.intro} />
          <div className="grid gap-6 md:grid-cols-2">
            {consistency.characters.map((ch, i) => (
              <Reveal key={ch.name} delay={(i % 2) * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="glass overflow-hidden rounded-3xl"
                >
                  <div className="bg-black">
                    <NaturalImage src={ch.image} alt={`${ch.name} model sheet`} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl font-semibold text-white">{ch.name}</h3>
                    <p className="mt-1 text-sm text-[#e8b94a]">{ch.role}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Pre-vis & pipeline */}
        <section id="pipeline" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-24">
          <SectionTitle title={previs.title} />
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-white">{previs.storyboard.title}</h3>
            <p className="mt-2 max-w-2xl text-slate-400">{previs.storyboard.description}</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {previs.storyboard.boards.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.12}>
                <div className="glass overflow-hidden rounded-2xl">
                  <div className="bg-black">
                    <NaturalImage src={b.image} alt={b.title} />
                  </div>
                  <p className="font-display p-4 text-base font-semibold text-white">{b.title}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20">
            <h3 className="font-display text-xl font-semibold text-white">{previs.pipelineTitle}</h3>
          </Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {previs.stages.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <li className="glass relative h-full overflow-hidden rounded-2xl p-6 transition-colors hover:border-[#22d3ee]/50">
                  <span className="font-display absolute -right-2 -top-4 text-7xl font-bold text-white/[0.04]">{i + 1}</span>
                  <p className="font-display text-lg font-semibold text-white">{s.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-28 relative px-6 pb-12 pt-24">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-72 max-w-3xl rounded-full bg-[#22d3ee]/15 blur-[130px]" />
          <Reveal className="relative mx-auto max-w-3xl">
            <div className="glass rounded-3xl p-6 md:p-12">
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold text-white md:text-5xl">{contact.title}</h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-400">{contact.text}</p>
              </div>
              <h3 className="font-display mb-4 mt-10 text-xl font-semibold text-white">{contact.formTitle}</h3>
              <ContactForm />
              <div className="mt-10 border-t border-white/10 pt-8 text-center">
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full bg-gradient-to-r from-[#e8b94a] to-[#f5d68a] px-10 py-4 font-semibold text-[#070a13] transition-shadow hover:shadow-[0_0_40px_rgba(232,185,74,0.5)]"
                >
                  {contact.emailButtonLabel}
                </a>
                <div className="mt-6 flex justify-center gap-6 text-sm text-slate-400">
                  {site.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#22d3ee]">{l.label}</a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <p className="relative mt-12 text-center text-xs text-slate-600">
            {contact.footerNote} © {new Date().getFullYear()} {site.name}
          </p>
        </section>
      </main>
    </MotionConfig>
  );
}
