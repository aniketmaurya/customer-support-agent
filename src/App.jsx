import { useState, useEffect, useRef } from 'react'

function BrandMark({ className = '' }) {
  return (
    <div className={`flex items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-100 ${className}`}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.5 18V6l11 12V6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="w-9 h-9" />
          <span className="text-xl font-bold text-white tracking-tight">NexusAI</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Testimonials', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
               className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-4 py-2">
            Sign In
          </button>
          <button className="bg-amber-400 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-300 transition-colors">
            Get Started Free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-slate-400 hover:text-white"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 px-6 pb-6">
          {['Features', 'How It Works', 'Testimonials', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
               className="block py-3 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium border-b border-slate-800/50"
               onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
          <button className="mt-4 w-full bg-amber-400 text-zinc-950 text-sm font-semibold px-5 py-3 rounded-xl hover:bg-amber-300 transition-colors">
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const progress = Math.min((Date.now() - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Hero Section ───────────────────────────────────────────────────────────
function Hero() {
  const words = ['Instant', 'Intelligent', 'Empathetic', '24/7 Active']
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 400)
    }, 2400)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-300/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 md:mb-8 text-amber-300 text-xs sm:text-sm font-medium">
          <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
          AI-Powered Customer Support — Now Live
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight md:leading-tight mb-6">
          Support That&apos;s{' '}
          <span
            className={`inline-block text-amber-300 font-extrabold transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            style={{ transition: 'opacity 0.4s, transform 0.4s' }}
          >
            {words[wordIndex]}
          </span>
          <br />
          <span className="text-white">Every Single Time</span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed">
          NexusAI resolves <strong className="text-white">90% of customer queries instantly</strong> — no wait times,
          no scripts, just brilliant AI that actually understands your customers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-20">
          <button className="bg-amber-400 text-zinc-950 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-amber-300 hover:scale-105 transition-all duration-200">
            Start Free Trial →
          </button>
          <button className="bg-white/5 border border-white/10 text-white font-semibold px-10 py-4 rounded-2xl text-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[
            { value: 98, suffix: '%', label: 'Customer Satisfaction' },
            { value: 2, suffix: 's', label: 'Avg. Response Time' },
            { value: 10000, suffix: '+', label: 'Businesses Served' },
            { value: 500, suffix: 'M+', label: 'Queries Resolved' },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="gradient-border bg-slate-900/50 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-200 mb-1">
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
        <span>Scroll to explore</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

// ─── Features Section ───────────────────────────────────────────────────────
const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Instant AI Responses',
    description: 'Leverage GPT-4 to craft human-like, contextual answers in under 2 seconds — 24/7, no holidays.',
    color: 'from-cyan-500 to-blue-600',
    glow: 'glow-cyan',
    badge: 'Core',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'Voice & Chat Unified',
    description: 'Handle calls, live chat, and messages from one AI brain. Omnichannel at its finest.',
    color: 'from-violet-500 to-purple-700',
    glow: 'glow-purple',
    badge: 'Pro',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'Real-Time Analytics',
    description: 'Gorgeous dashboards show sentiment trends, peak hours, resolution rates, and CSAT scores live.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'glow-cyan',
    badge: 'Insights',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.28c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'No-Code Customization',
    description: 'Train your AI on your docs, FAQs, and tone of voice — zero engineering required.',
    color: 'from-orange-500 to-pink-600',
    glow: 'glow-purple',
    badge: 'Easy',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Enterprise Security',
    description: 'SOC 2 Type II, GDPR compliant, end-to-end encryption. Your customer data is always safe.',
    color: 'from-slate-500 to-slate-700',
    glow: '',
    badge: 'Secure',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: '200+ Integrations',
    description: 'Plug into Shopify, Salesforce, Zendesk, Slack, HubSpot and more in one click.',
    color: 'from-blue-500 to-indigo-600',
    glow: 'glow-cyan',
    badge: 'Connect',
  },
]

function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-cyan-500/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-4 block">Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Everything You Need to
            <br />
            <span className="text-gradient">Delight Customers</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            A full-stack AI support platform that works right out of the box — powerful enough for enterprise, simple enough for startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="gradient-border group bg-slate-900/60 rounded-2xl p-8 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm cursor-default">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white ${f.glow} transition-transform duration-300 group-hover:scale-110`}>
                  {f.icon}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${f.color} text-white opacity-80`}>{f.badge}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 group-hover:text-cyan-400 transition-colors">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Chat Demo ──────────────────────────────────────────────────────────────
const chatMessages = [
  { from: 'user', text: 'My order hasn\'t arrived yet. It\'s been 5 days.' },
  { from: 'ai', text: 'Hi! I\'m sorry to hear that. Let me check order #ORD-8821 for you right now... 🔍', delay: 1000 },
  { from: 'ai', text: 'Your package is currently in transit at the Chicago distribution hub. It\'s estimated to arrive tomorrow by 6 PM. I\'ve also flagged it for priority handling!', delay: 2500 },
  { from: 'user', text: 'Can I get a refund if it doesn\'t arrive?' },
  { from: 'ai', text: 'Absolutely! If your order doesn\'t arrive by tomorrow 11:59 PM, I\'ll automatically process a full refund. You\'ll get an email confirmation either way. Is there anything else I can help with? 😊', delay: 4000 },
]

function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        chatMessages.forEach((msg, i) => {
          if (msg.from === 'ai') {
            setTimeout(() => setTyping(true), msg.delay - 600)
            setTimeout(() => {
              setTyping(false)
              setVisibleCount(i + 1)
            }, msg.delay)
          } else {
            setTimeout(() => setVisibleCount(i + 1), msg.delay || i * 1000)
          }
        })
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div>
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Watch NexusAI Handle
              <br />
              <span className="text-gradient">Real Conversations</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              NexusAI connects to your knowledge base, order systems, and CRM to resolve issues instantly — no human agent required.
            </p>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Connect Your Data', desc: 'Upload your docs, FAQs, and integrate your systems in minutes.' },
                { step: '02', title: 'AI Learns Your Brand', desc: 'Our model fine-tunes on your content to match your tone and policies.' },
                { step: '03', title: 'Go Live Instantly', desc: 'Embed on your site, app, or connect via API. Done in 60 seconds.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-sm shrink-0">
                    {step}
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">{title}</div>
                    <div className="text-slate-400 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="gradient-border bg-slate-900/80 rounded-3xl overflow-hidden backdrop-blur-sm">
            {/* Window bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">N</div>
                <span className="text-white text-sm font-semibold">NexusAI Support</span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs">Online</span>
              </div>
            </div>

            <div className="p-6 space-y-4 min-h-80">
              {chatMessages.slice(0, visibleCount).map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold mr-3 shrink-0 mt-1">N</div>
                  )}
                  <div className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-violet-700 text-white rounded-br-sm'
                      : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">N</div>
                  <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    {[0, 0.2, 0.4].map(d => (
                      <div key={d} className="w-2 h-2 bg-slate-400 rounded-full"
                        style={{ animation: `bounce 1s ease-in-out infinite`, animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 pb-5">
              <div className="flex gap-3 items-center bg-slate-800/70 rounded-2xl px-4 py-3 border border-slate-700/50">
                <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent text-slate-300 text-sm outline-none placeholder-slate-500" readOnly />
                <button className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-xl flex items-center justify-center glow-cyan shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ───────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "NexusAI reduced our support tickets by 78% in the first month. Our team finally has time to focus on complex issues. It's like having a super-intelligent employee that never sleeps.",
    name: 'Sarah Chen',
    role: 'Head of CX, Luminary',
    avatar: 'SC',
    stars: 5,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    quote: "We went from 12-hour response times to 2 seconds. Our CSAT scores hit an all-time high of 97%. NexusAI isn't just a tool — it's a competitive advantage.",
    name: 'Marcus Reid',
    role: 'VP Product, Stackify',
    avatar: 'MR',
    stars: 5,
    color: 'from-violet-500 to-purple-700',
  },
  {
    quote: "The no-code setup blew me away. I had NexusAI trained on our entire knowledge base and live on our site in under an hour. The ROI is insane.",
    name: 'Priya Sharma',
    role: 'Founder, DevDock',
    avatar: 'PS',
    stars: 5,
    color: 'from-emerald-500 to-teal-600',
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Loved by Teams
            <br />
            <span className="text-gradient">Worldwide</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="gradient-border bg-slate-900/60 rounded-2xl p-8 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, s) => (
                  <svg key={s} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-8 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 text-sm mb-8">Trusted by 10,000+ companies including</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
            {['Shopify', 'Stripe', 'Notion', 'Linear', 'Vercel', 'Figma'].map(brand => (
              <span key={brand} className="text-slate-400 font-bold text-lg tracking-tight">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ────────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'Starter',
    price: 29,
    color: 'from-slate-700 to-slate-800',
    border: 'border-slate-700/50',
    cta: 'Get Started',
    ctaClass: 'bg-slate-700 hover:bg-slate-600 text-white',
    features: ['1,000 AI replies/mo', 'Live chat widget', 'Basic analytics', 'Email support', '3 integrations'],
  },
  {
    name: 'Growth',
    price: 99,
    color: 'from-cyan-600 to-violet-700',
    border: 'border-cyan-500/40',
    cta: 'Start Free Trial',
    ctaClass: 'bg-gradient-to-r from-cyan-500 to-violet-600 hover:opacity-90 text-white glow-cyan',
    popular: true,
    features: ['10,000 AI replies/mo', 'Voice + Chat + Email', 'Advanced analytics', 'Priority support', 'Unlimited integrations', 'Custom AI training'],
  },
  {
    name: 'Enterprise',
    price: 499,
    color: 'from-violet-700 to-purple-800',
    border: 'border-violet-500/30',
    cta: 'Contact Sales',
    ctaClass: 'bg-violet-600 hover:bg-violet-500 text-white',
    features: ['Unlimited AI replies', 'Dedicated AI model', 'White-label solution', 'SLA guarantee', '24/7 phone support', 'HIPAA & SOC2 compliance', 'Custom contracts'],
  },
]

function Pricing() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-pink-400 font-semibold text-sm uppercase tracking-widest mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Simple, Transparent
            <br />
            <span className="text-gradient">No Surprises</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Start free for 14 days. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-3xl border ${plan.border} ${plan.popular ? 'bg-slate-900/80 ring-2 ring-cyan-500/50 scale-105 z-10' : 'bg-slate-900/40'} p-8 backdrop-blur-sm`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-bold px-5 py-1.5 rounded-full glow-cyan">
                  ✦ MOST POPULAR
                </div>
              )}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} mb-6 flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-slate-400 font-semibold mb-2">{plan.name}</div>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-black text-white">${plan.price}</span>
                <span className="text-slate-500 mb-2">/month</span>
              </div>
              <button className={`w-full py-3.5 rounded-2xl font-bold mb-8 transition-all duration-200 ${plan.ctaClass}`}>
                {plan.cta}
              </button>
              <ul className="space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                    <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ─────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="gradient-border bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-8 text-cyan-400 text-sm font-medium">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              14-Day Free Trial — No Credit Card
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Transform
              <br />
              <span className="text-gradient">Your Support?</span>
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
              Join 10,000+ businesses delivering instant, AI-powered support. Set up in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold px-12 py-4 rounded-2xl text-lg hover:opacity-90 hover:scale-105 transition-all duration-200 glow-cyan">
                Start Your Free Trial →
              </button>
              <button className="bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-white/10 transition-all duration-200">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <BrandMark className="w-9 h-9" />
              <span className="text-xl font-bold text-white">NexusAI</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The next-generation AI customer support platform. Built for scale, designed for humans.
            </p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Support', links: ['Documentation', 'API Reference', 'Status', 'Contact'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="text-white font-bold mb-5 text-sm">{title}</div>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800/50 gap-4">
          <p className="text-slate-500 text-sm">© 2025 NexusAI, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ChatDemo />
      <Testimonials />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  )
}
