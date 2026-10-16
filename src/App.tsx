import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate as motionAnimate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'

const navItems = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'achievements', 'contact']
const githubProfileUrl = 'https://github.com/poovarasansiva21'
const skills = [
  ['Programming', ['Java', 'Python', 'C', 'C++']],
  ['Frontend', ['HTML', 'CSS', 'JavaScript']],
  ['Backend & databases', ['Node.js', 'SQL', 'MongoDB']],
  ['Core computer science', ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'DAA']],
  ['Tools', ['Git', 'GitHub', 'Google Colab']],
  ['UI/UX & Prototyping', ['Tools to be confirmed']],
]
const projects = [
  { n: '01', title: 'Loan Approval Prediction Using Machine Learning', type: 'Machine learning', text: 'A machine learning project that uses classification techniques to predict loan approval outcomes from applicant-related data.', tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'], href: 'https://github.com/poovarasansiva21/Loan-Approval-Prediction-Using-Machine-Learning' },
  { n: '02', title: 'Book Recommendation System', type: 'Recommendation engine', text: 'A Python-based recommendation project exploring data to generate relevant book suggestions.', tags: ['Python', 'Machine Learning', 'Pandas', 'NumPy'], href: 'https://github.com/poovarasansiva21/Bookrecommendation' },
  { n: '03', title: 'Smart Traffic Management System', type: 'Computer vision + IoT', text: 'A project exploring traffic monitoring and management using computer vision, machine learning and IoT-related technologies.', tags: ['Python', 'OpenCV', 'Machine Learning', 'IoT'], href: 'https://github.com/poovarasansiva21/Smart-Traffic-Management-System' },
  { n: '04', title: 'SAHAAYAA AI Resource Matching Platform', type: 'AI social-impact platform', text: 'A mobile-first platform using urgency detection and location-aware matching to connect people in need with nearby community resources.', tags: ['React', 'TypeScript', 'Flask', 'TensorFlow', 'Leaflet'], href: 'https://github.com/poovarasansiva21/Homeless-Needy-Resource-Matching-Platform' },
  { n: '05', title: 'HackFlow Hackathon Management Platform', type: 'Event management platform', text: 'A self-hosted hackathon platform for team registration, project submissions, weighted judging, community voting, and published results.', tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'], href: 'https://github.com/poovarasansiva21/Hackathan-Portal' },
  { n: '06', title: 'Fleet Management System', type: 'Fleet operations', text: 'A full-stack fleet management project with a React frontend and Express backend for organizing fleet workflows.', tags: ['React', 'JavaScript', 'Node.js', 'Express'], href: 'https://github.com/poovarasansiva21/Fleet-Management-System' },
  { n: '07', title: 'MERN Rental App', type: 'Rental marketplace', text: 'A rental marketplace for browsing product listings, placing orders, and managing reviews with a MERN stack.', tags: ['MongoDB', 'Express', 'React', 'Node.js'], href: 'https://github.com/poovarasansiva21/MERN-Rental-App' },
]
const profiles = [
  ['391', 'LeetCode', 'Problems solved', 'https://leetcode.com/u/poovarasan-117/'],
  ['1,100', 'CodeChef', 'Problems solved', 'https://www.codechef.com/users/kit28csa117'],
  ['826', 'Codeforces', 'Rating · 5 problems solved', 'https://codeforces.com/profile/poovarasan420122'],
  ['33', 'GeeksforGeeks', 'Problems solved', 'https://www.geeksforgeeks.org/profile/kit2824s4dp'],
  ['2', 'HackerRank', 'C++ / Java badges', 'https://www.hackerrank.com/profile/kit28_24cs117?utm=codolio'],
  ['8', 'AtCoder', '16 Kyu · 1 rated match', 'https://atcoder.jp/users/Poovarasan'],
  ['1,540', 'Codolio', 'Questions · 251 active days · 84 contests', 'https://codolio.com/profile/Poovarasan21'],
]
const certifications = [
  { title: 'NPTEL – Prog. in Java (Elite + Silver)', href: 'https://drive.google.com/file/d/1kqBlIUMB0Jlk5tHN6KbOv5v1qf9Qv4Kb/view?usp=drivesdk' },
  { title: 'Deloitte – Data Analytics Job Sim.', href: 'https://drive.google.com/file/d/11GgmJUoJq7vUPoETmSMoXDfMx60UJ6pF/view?usp=drivesdk' },
  { title: 'Infosys – Software Engineering', href: 'https://drive.google.com/file/d/154nKwaTzrUoipKjbakps-IzA2lPP1Sr3/view?usp=drivesdk' },
  { title: 'CCNA – Introduction to Networks', href: 'https://drive.google.com/file/d/1WfH-Cp6D-RBdZDMzmnbFs0haem86JJJk/view?usp=drivesdk' },
]

function Icon({ name }: { name: 'arrow' | 'download' | 'menu' | 'close' | 'github' | 'linkedin' | 'mail' | 'sun' | 'moon' }) {
  const paths = {
    arrow: <path d="M5 19 19 5M9 5h10v10" />,
    download: <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" />,
    menu: <path d="M4 8h16M4 16h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    linkedin: <><path d="M7 9v8M7 6.5v.01M11 17v-4.5a3.5 3.5 0 0 1 7 0V17M11 9v8" /><rect x="3" y="3" width="18" height="18" rx="3" /></>,
    github: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 2a13 13 0 0 0-6 0C5.8.1 4.7.5 4.7.5A5 5 0 0 0 4.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.3 3.5 6.5 6.8 6.9a4.8 4.8 0 0 0-1 3.4v4M9 19c-3 .9-3-1.5-4-2" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.07-7.07-1.42 1.42M6.35 17.65l-1.42 1.42m14.14 0-1.42-1.42M6.35 6.35 4.93 4.93" /></>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
  }
  return <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function LoadingScreen({ finish }: { finish: () => void }) {
  const reduced = useReducedMotion()
  const name = 'POOVARASAN'.split('')

  useEffect(() => {
    const timer = window.setTimeout(finish, reduced ? 350 : 1950)
    return () => clearTimeout(timer)
  }, [finish, reduced])

  return <motion.div className="loading-screen" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .5 }}>
    <motion.div className="intro-monogram" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .4 }}><span>PS</span><svg viewBox="0 0 80 80"><motion.circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .15, duration: .8 }} /></svg></motion.div>
    <motion.div className="intro-name" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .045, delayChildren: .55 } } }} aria-label="Poovarasan">
      {name.map((letter, i) => <motion.span key={`${letter}-${i}`} variants={{ hidden: { opacity: 0, y: 10, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}>{letter === ' ' ? '\u00A0' : letter}</motion.span>)}
    </motion.div>
    <div className="intro-progress"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .7, duration: 1 }} /></div>
  </motion.div>
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { once: true, amount: .7 })
  const count = useMotionValue(0)
  const formatted = useTransform(count, (latest) => Math.round(latest).toLocaleString('en-US'))

  useEffect(() => {
    if (!visible) return
    const controls = motionAnimate(count, Number(value.replace(/,/g, '')), { duration: 1.35, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [count, value, visible])

  return <motion.strong ref={ref}>{formatted}</motion.strong>
}

function Heading({ index, label, title }: { index: string; label: string; title: string }) {
  return <Reveal className="section-heading"><p>{label}</p><h2>{title}</h2></Reveal>
}

function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-35% 0px -55%' })
    navItems.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])
  return <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
    <a className="logo" href="#home">PS<span>.</span></a>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
      {navItems.map((item) => <a key={item} href={`#${item}`} className={active === item ? 'active' : ''} onClick={() => setOpen(false)}>{item}</a>)}
    </nav>
    <a className="button button-small resume" href="/poovarasan-resume.pdf" download><Icon name="download" /> Resume</a>
    <button className="theme-toggle" type="button" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={theme === 'light'} onClick={onToggleTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
    <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
  </header>
}

function HeroSection() {
  const roles = ['UI/UX Designer', 'Frontend Developer', 'Software Developer']
  const [role, setRole] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setRole((current) => (current + 1) % roles.length), 2200)
    return () => window.clearInterval(timer)
  }, [])

  return <section id="home" className="hero container">
    <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: .7 }}>
      <p className="eyebrow availability"><i /> OPEN TO INTERNSHIP OPPORTUNITIES</p>
      <h1>Hi, I'm <em>Poovarasan.</em></h1>
      <p className="hero-name"><b>I'M A</b> <AnimatePresence mode="wait"><motion.span key={role} initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(5px)' }} transition={{ duration: .3 }}>{roles[role]}</motion.span></AnimatePresence></p>
      <p className="hero-description">An aspiring software developer and CSE student passionate about web development, machine learning, and AI. I enjoy learning new technologies, building projects, and developing practical solutions to real-world problems.</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <Icon name="arrow" /></a><a className="button" href="/poovarasan-resume.pdf" download>Download resume</a><a className="button button-text" href="#contact">Contact me</a></div>
      <div className="socials"><a href="https://github.com/poovarasansiva21" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a><a href="https://linkedin.com/in/poovarasans21" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a><a href="mailto:kit28.24cs117@gmail.com" aria-label="Email"><Icon name="mail" /></a></div>
    </motion.div>
    <motion.div className="portrait-shell" initial={{ opacity: 0, x: -180, scale: .92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.015 }}>
      <div className="portrait-glow" /><img src="/poovarasan-orange-portrait.jpeg" alt="Poovarasan wearing a black blazer and white shirt" />
      <div className="portrait-accent accent-one" /><div className="portrait-accent accent-two" />
    </motion.div>
  </section>
}

function AboutSection() {
  return <section id="about" className="section container"><Heading index="01" label="ABOUT" title="Curiosity drives what I build." /><div className="about-grid"><Reveal className="about-lead">I explore the space where accessible design, responsive interfaces and technical problem-solving meet.</Reveal><Reveal className="about-body"><p>Currently pursuing B.E. Computer Science and Engineering at Kalaignarkarunanidhi Institute of Technology, Coimbatore. During my one-month internship at Appin Technology, I built responsive pages with HTML, CSS and JavaScript and gained exposure to basic backend integration.</p><div className="facts"><div><span>Course</span><strong>B.E. CSE</strong></div><div><span>Graduation</span><strong>2028</strong></div><div><span>CGPA</span><strong>7.91 / 10</strong></div><div><span>Location</span><strong>Coimbatore</strong></div></div></Reveal></div></section>
}

function SkillsSection() {
  return <section id="skills" className="section section-dark"><div className="container"><Heading index="02" label="TOOLKIT" title="Technologies I work with." /><div className="skill-grid">{skills.map(([group, items], i) => <Reveal className="skill-card" key={group as string}><span>0{i + 1}</span><h3>{group as string}</h3><div>{(items as string[]).map((item) => <i key={item}>{item}</i>)}</div></Reveal>)}</div></div></section>
}

function ProjectsSection() {
  return <section id="projects" className="section container"><Heading index="03" label="SELECTED WORK" title="Projects built to solve real problems." /><div className="projects">{projects.map((p) => <Reveal className="project-card" key={p.n}><div className={`project-preview preview-${p.n}`}><span>{p.n}</span><ProjectArtwork project={p.n} /><p>ILLUSTRATIVE PROJECT PREVIEW</p></div><div className="project-content"><p>{p.type}</p><h3>{p.title}</h3><div className="project-tags">{p.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="project-description">{p.text}</p><a className="project-link" href={p.href} target="_blank" rel="noreferrer">View repository <Icon name="arrow" /></a></div></Reveal>)}</div></section>
}

function ProjectArtwork({ project }: { project: string }) {
  if (project === '01') return <div className="project-art loan-art"><div className="art-toolbar"><i /><i /><i /></div><div className="loan-score"><span>APPROVAL SCORE</span><strong>87%</strong></div><div className="art-bars"><i /><i /><i /><i /><i /></div><b>LIKELY APPROVED</b></div>
  if (project === '02') return <div className="project-art book-art"><div className="book book-one"><span>DATA</span></div><div className="book book-two"><span>ML</span></div><div className="book book-three"><span>RECS</span></div><div className="recommendation"><i>★</i><p><strong>FOR YOU</strong><span>Personalized reading</span></p></div></div>
  if (project === '03') return <div className="project-art traffic-art"><div className="traffic-light"><i /><i /><i /></div><div className="road"><span /><span /><span /></div><div className="traffic-data"><b>LIVE</b><strong>42</strong><span>VEHICLES</span></div></div>
  if (project === '04') return <div className="project-art resource-art"><div className="resource-head"><span>SAHAAYAA AI</span><b>LIVE MATCH</b></div><div className="resource-map"><i className="resource-route" /><span className="resource-pin pin-a">A</span><span className="resource-pin pin-b">B</span><span className="resource-pin pin-user">YOU</span></div><div className="resource-match"><span>FOOD SUPPORT · 1.2 KM</span><strong>92% MATCH</strong></div></div>
  if (project === '05') return <div className="project-art hackflow-art"><div className="hackflow-head"><span>HACKFLOW</span><b>SPRINT 2026</b></div><div className="hackflow-copy"><span>REGISTRATION OPEN</span><strong>Build what matters.</strong></div><div className="hackflow-stats"><div><strong>12</strong><span>TEAMS</span></div><div><strong>04</strong><span>JUDGES</span></div><div><strong>48H</strong><span>TO BUILD</span></div></div><div className="hackflow-progress"><i /></div></div>
  if (project === '06') return <div className="project-art fleet-art"><div className="fleet-head"><span>FLEET OPS</span><b>● LIVE</b></div><div className="fleet-map"><i className="fleet-road road-a" /><i className="fleet-road road-b" /><i className="fleet-path" /><span className="vehicle vehicle-a">V1</span><span className="vehicle vehicle-b">V2</span><span className="vehicle vehicle-c">V3</span></div><div className="fleet-status"><span><i /> V-04 <b>ON ROUTE</b></span><span><i /> V-08 <b>AVAILABLE</b></span></div></div>
  return <div className="project-art rental-art"><div className="rental-head"><span>STAY / RENT</span><b>⌕</b></div><div className="rental-property"><div className="rental-building"><i /><i /><i /><i /><i /><i /></div><span>AVAILABLE</span></div><div className="rental-details"><div><strong>Coastal house</strong><span>2 beds · 1 bath</span></div><b>$86 <i>/ night</i></b></div></div>
}

function ExperienceSection() {
  return <section id="experience" className="section section-dark"><div className="container"><Heading index="04" label="EXPERIENCE" title="Learning through practice." /><Reveal className="timeline"><div className="timeline-marker" /><div className="timeline-date">ONE MONTH</div><div><p>WEB DEVELOPMENT INTERN</p><h3>Appin Technology</h3><h4>Coimbatore</h4><p>Worked on responsive web pages using HTML, CSS and JavaScript, with exposure to basic backend integration.</p></div></Reveal></div></section>
}

function EducationSection() {
  return <section id="education" className="section container"><Heading index="05" label="EDUCATION" title="Building strong foundations." /><Reveal className="education-card"><div><span>2024 — 2028</span><h3>B.E. Computer Science and Engineering</h3><p>Kalaignar Karunanidhi Institute of Technology, Coimbatore</p></div><div className="cgpa"><strong>7.91</strong><span>CGPA / 10</span></div></Reveal></section>
}

function CertificationsSection() {
  return <section id="certifications" className="section section-dark"><div className="container"><Heading index="06" label="CERTIFICATIONS" title="Continuous learning, documented." /><div className="cert-grid">{certifications.map((cert, i) => <Reveal className="cert-card" key={cert.title}><span>0{i + 1}</span><h3>{cert.title}</h3><a className="cert-link" href={cert.href} target="_blank" rel="noreferrer">View certificate <Icon name="arrow" /></a></Reveal>)}</div></div></section>
}

function CodingProfilesSection() {
  return <section id="achievements" className="section container"><Heading index="07" label="PROBLEM SOLVING" title="Consistency over shortcuts." /><div className="profile-grid">{profiles.map(([number, platform, detail, href]) => <Reveal className="profile-stat" key={platform}><a className="profile-stat-link" href={href} target="_blank" rel="noreferrer" aria-label={`${platform} profile`}><CountUp value={number} /><h3>{platform}</h3><p>{detail}</p></a></Reveal>)}</div><div className="achievements"><p>ACHIEVEMENTS</p><div><span>Hackathon participation</span><span>Active GitHub contribution</span><span>Consistent problem-solving practice</span></div></div></section>
}

function ContactSection() {
  const [status, setStatus] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setStatus('Opening your email client. This site does not store or send form data.')
    window.location.href = `mailto:kit28.24cs117@gmail.com?subject=${encodeURIComponent(String(form.get('subject')))}&body=${encodeURIComponent(`${form.get('message')}\n\nFrom: ${form.get('name')} (${form.get('email')})`)}`
  }
  return <section id="contact" className="section section-dark"><div className="container contact-grid"><div><Heading index="09" label="CONTACT" title="Have an idea? Let's build something meaningful." /><p className="contact-copy">I'm open to opportunities to learn, collaborate and contribute to software and design projects.</p><div className="contact-links"><a href="mailto:kit28.24cs117@gmail.com">kit28.24cs117@gmail.com <Icon name="arrow" /></a><a href="https://github.com/poovarasansiva21" target="_blank" rel="noreferrer">GitHub <Icon name="arrow" /></a><a href="https://linkedin.com/in/poovarasans21" target="_blank" rel="noreferrer">LinkedIn <Icon name="arrow" /></a></div></div><Reveal><form onSubmit={submit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label><label>Subject<input name="subject" required placeholder="Opportunity or collaboration" /></label><label>Message<textarea name="message" required rows={5} placeholder="Tell me about it..." /></label><button className="button button-primary" type="submit">Compose email <Icon name="arrow" /></button><p className="form-status" aria-live="polite">{status || 'Submitting opens your email app. No backend is connected.'}</p></form></Reveal></div></section>
}

function Footer() {
  return <footer><div className="container footer-inner"><div><a className="footer-name" href="#home">POOVARASAN</a><p>Software, interfaces and thoughtful digital experiences.</p></div><div className="footer-links"><a href="https://github.com/poovarasansiva21" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/poovarasans21" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:kit28.24cs117@gmail.com">Email</a><a href="#home">Back to top ↑</a></div><p>© {new Date().getFullYear()} Poovarasan</p></div></footer>
}

export default function App() {
  const [loading, setLoading] = useState(() => sessionStorage.getItem('ps-silver-intro') !== 'seen')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => localStorage.getItem('ps-theme') === 'light' ? 'light' : 'dark')
  const { scrollYProgress } = useScroll()
  const finish = () => { sessionStorage.setItem('ps-silver-intro', 'seen'); setLoading(false) }
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('ps-theme', theme)
  }, [theme])
  useEffect(() => {
    const syncTheme = (event: StorageEvent) => {
      if (event.key === 'ps-theme') setTheme(event.newValue === 'light' ? 'light' : 'dark')
    }
    window.addEventListener('storage', syncTheme)
    return () => window.removeEventListener('storage', syncTheme)
  }, [])
  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')
  return <>
    <AnimatePresence>{loading && <LoadingScreen finish={finish} />}</AnimatePresence>
    <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
    <Navbar theme={theme} onToggleTheme={toggleTheme} />
    <main><HeroSection /><AboutSection /><SkillsSection /><ProjectsSection /><ExperienceSection /><EducationSection /><CertificationsSection /><CodingProfilesSection /><ContactSection /></main>
    <Footer />
  </>
}
