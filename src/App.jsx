import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react';
import './index.css';

const OrientalDivider = () => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0', opacity: 0.3 }}>
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0L35 25L60 30L35 35L30 60L25 35L0 30L25 25L30 0Z" fill="#D4AF37"/>
    </svg>
  </div>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  // Scroll watermark effect
  const watermarkX = useTransform(scrollY, [0, 2000], [0, -300]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div>
      {/* Navigation */}
      <nav className={isScrolled ? "nav-scrolled" : ""}>
        <div className="nav-container">
          <a href="#" className="logo">
            <img src="/logo.png" alt="Beldifusion Kitchen" className="site-logo" />
          </a>
          <div className="nav-links">
            <a href="#about">L'Héritage</a>
            <a href="#menu">Créations</a>
            <a href="#infos">Infos Pratiques</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} color="#fff" /> : <MenuIcon size={28} color="#fff" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div className="hero-bg" style={{ y: heroY, opacity: heroOpacity }}>
          <img src="/hero.png" alt="Beldifusion Feast" />
        </motion.div>
        <div className="hero-gradient"></div>
        
        <div className="container" style={{ zIndex: 10 }}>
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="hero-subtitle">Maison de Gastronomie</span>
            <h1 className="hero-title">
              Beldi <br />
              <span>Fusion.</span>
            </h1>
            <a href="#infos" className="btn-primary">
              Réserver <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        {/* Massive scrolling watermark */}
        <motion.div className="watermark" style={{ x: watermarkX }}>
          CASABLANCA MARRAKECH EXCELLENCE
        </motion.div>

        <div className="container about-grid">
          <div className="about-images">
            <motion.div 
              className="img-main"
              initial={{ height: 0 }}
              whileInView={{ height: '600px' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/breakfast.png" alt="Moroccan Breakfast" />
            </motion.div>
            <motion.div 
              className="img-float"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/hero.png" alt="Detail" />
            </motion.div>
          </div>

          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.h2 variants={fadeUp}>
              Redéfinir <br />
              <span>l'Authenticité.</span>
            </motion.h2>
            <motion.p variants={fadeUp}>
              Établi avec fierté <strong>depuis 2022</strong>, Beldifusion Kitchen est l'épicentre où l'artisanat culinaire marocain millénaire 
              embrasse l'audace de la gastronomie contemporaine. Un contraste saisissant entre 
              la chaleur d'un tagine oriental traditionnel et l'esthétique épurée du design moderne.
            </motion.p>
            <motion.p variants={fadeUp}>
              Notre restaurant vous invite à élever chaque ingrédient local pour créer une véritable expérience 
              sensorielle, dans un cadre purement maghrébin et luxueux, au cœur de Marrakech et d'Agadir.
            </motion.p>
            <motion.div variants={fadeUp} className="signature">
              L'Artiste du Beldi
            </motion.div>
          </motion.div>
        </div>
      </section>

      <OrientalDivider />

      {/* Menu Showcase Section */}
      <section id="menu" className="section menu-section">
        <div className="container">
          <motion.div 
            className="menu-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="hero-subtitle" style={{ marginBottom: '1rem' }}>L'Articulinaire</span>
            <h2>Nos Créations</h2>
          </motion.div>

          <div className="menu-showcase">
            {[
              { img: '/breakfast.png', title: 'L\'Aube', desc: 'Miels dorés, Amlou et crêpes soyeuses. Le matin sublimé.' },
              { img: '/fusion.png', title: 'Fraîcheur', desc: 'L\'oasis végétal. Quinoa épicé et grenades juteuses.' },
              { img: '/hero.png', title: 'Ignis', desc: 'Grillades au charbon noble et tagines avant-gardistes.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="menu-item-modern"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <img src={item.img} alt={item.title} />
                <div className="menu-item-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OrientalDivider />

      {/* Experience / Instagram Embeds Section */}
      <section id="experience" className="section">
        <div className="container">
          <motion.div 
            className="menu-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ marginBottom: '4rem' }}
          >
            <span className="hero-subtitle">Immersion Visuelle</span>
            <h2>L'Atmosphère Beldi</h2>
          </motion.div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ flex: '1', minWidth: '320px', maxWidth: '400px' }}
            >
              <iframe src="https://www.instagram.com/p/DV3vKrdjER3/embed" width="100%" height="480" style={{ border: 'none', borderRadius: '12px', background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} scrolling="no" allowTransparency="true" title="Vidéo Instagram Beldifusion 1"></iframe>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ flex: '1', minWidth: '320px', maxWidth: '400px' }}
            >
              <iframe src="https://www.instagram.com/p/DVoY5ZVCJoR/embed" width="100%" height="480" style={{ border: 'none', borderRadius: '12px', background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} scrolling="no" allowTransparency="true" title="Vidéo Instagram Beldifusion 2"></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      <OrientalDivider />

      {/* Informations Pratiques Section */}
      <section id="infos" className="section" style={{ backgroundColor: 'var(--secondary-bg)', padding: '10rem 0' }}>
        <div className="container">
          <motion.div 
            className="menu-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ marginBottom: '4rem', textAlign: 'center' }}
          >
            <span className="hero-subtitle">Votre Visite</span>
            <h2>Informations Pratiques</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '4rem' }}>
            {/* Colonne Adresse & Contact */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--accent-warm)' }}>Le Restaurant</h3>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <MapPin color="var(--accent-warm)" size={24} style={{ marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Adresse</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>43 Av. de Muret<br/>31300 Toulouse</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
                <Phone color="var(--accent-warm)" size={24} style={{ marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Téléphone</h4>
                  <a href="tel:0675309649" style={{ color: 'var(--text-light)', fontSize: '1.1rem', transition: 'color 0.3s' }}>06 75 30 96 49</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                 <a href="tel:0675309649" className="btn-primary">
                   Réserver une table
                 </a>
                 <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ backgroundColor: 'transparent' }}>
                   Voir le Menu complet
                 </a>
              </div>
            </motion.div>

            {/* Colonne Horaires */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--accent-warm)' }}>Horaires d'Ouverture</h3>
              
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { day: 'Lundi', hours: '09:00 – 00:00' },
                  { day: 'Mardi', hours: '09:00 – 00:00' },
                  { day: 'Mercredi', hours: '09:00 – 00:00' },
                  { day: 'Jeudi', hours: '09:00 – 00:00' },
                  { day: 'Vendredi', hours: '09:00 – 02:00', highlight: true },
                  { day: 'Samedi', hours: '09:00 – 03:00', highlight: true },
                  { day: 'Dimanche', hours: '09:00 – 00:00' }
                ].map((schedule, idx) => (
                  <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: schedule.highlight ? 'var(--accent-warm)' : 'var(--text-muted)' }}>
                    <span style={{ fontWeight: '500' }}>{schedule.day}</span>
                    <span>{schedule.hours}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="container">
          <div className="footer-top">
            <a href="#">
              <img src="/logo.png" alt="Beldifusion Kitchen" className="footer-logo" />
            </a>
            
            <div className="footer-social">
              <a href="https://www.instagram.com/beldifusionkitchen.ma/" target="_blank" rel="noopener noreferrer" className="social-circle">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="tel:0675309649" className="social-circle">
                <Phone size={24} />
              </a>
              <a href="https://maps.google.com/?q=43+Av.+de+Muret,+31300+Toulouse" target="_blank" rel="noopener noreferrer" className="social-circle">
                <MapPin size={24} />
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Beldifusion Kitchen</span>
            <span>Design par <a href="https://microdidact.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>microdidact.com</a></span>
            <span>Mentions Légales</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
