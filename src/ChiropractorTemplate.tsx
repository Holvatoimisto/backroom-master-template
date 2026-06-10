import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Plus,
  Minus,
  Star,
  Clock,
  Calendar,
} from 'lucide-react';

const templateData = {
  business: {
    name: 'The Back Room',
    tagline: 'Tampere',
    fullTagline: 'THE BACK ROOM TAMPERE',
    address: 'Papinkatu 19, 33200 Tampere',
    phone: '0400 601 819',
    phoneLink: 'tel:0400601819',
    email: 'thebackroomtampere@gmail.com',
    emailLink: 'mailto:thebackroomtampere@gmail.com',
    bookingUrl: 'https://www.varaamossalmenniemi.fi/thebackroom/',
    googleReviewUrl: 'https://g.co/kgs/W9ENsR',
    googleMapsUrl: 'https://www.google.com/maps/place/The+Back+Room+-Kiropraktiikka',
    facebookUrl: 'https://www.facebook.com/thebackroomtampere/',
    instagramUrl: 'https://www.instagram.com/thebackroomtampere/',
  },
  navigation: {
    logo: '/assets/logo_light.png',
    logoDark: '/assets/logo_dark.png',
    links: [
      { label: 'Palvelut', href: '#palvelut' },
      { label: 'Asiantuntijat', href: '#asiantuntijat' },
      { label: 'Hinnasto', href: '#hinnasto' },
      { label: 'Arvostelut', href: '#arvostelut' },
      { label: 'Yhteystiedot', href: '#yhteystiedot' },
    ],
  },
  hero: {
    backgroundImage: '/assets/hero_bg.jpg',
    eyebrow: 'THE BACK ROOM TAMPERE',
    headline: 'Kohti kevyemp\u00e4\u00e4 ja kivuttomampaa oloa',
    description: 'Kiropraktiikkaa, hierontaa ja personal trainingia Tampereen keskustassa.',
    ctaLabel: 'Varaa aika',
    trustRating: '4.8/5',
    trustLabel: 'asiakasarvio',
    locationLabel: 'Papinkatu 19, Tampere',
  },
  intro: {
    text: 'Parempi olo alkaa kehoa kuuntelemalla',
    backgroundColor: '#4E4842',
  },
  services: {
    eyebrow: 'PALVELUT',
    headline: 'Sinulle r\u00e4\u00e4t\u00e4l\u00f6ity hoito ja kehonhuolto',
    body: 'Hierontaa, kiropraktiikkaa ja valmennusta yksil\u00f6llisesti sinun arkeesi.',
    reassurance: 'Etk\u00f6 ole varma mik\u00e4 palvelu sopii sinulle? Autamme mielell\u00e4\u00e4mme valitsemaan oikean vaihtoehdon.',
    primaryServices: [
      {
        image: '/assets/urheiluhieronta.jpg',
        title: 'Hieronta',
        description: 'Hieronta auttaa rauhoittamaan ylikuormittunutta kehoa ja tukee palautumista arjen rasituksesta.',
        linkText: 'Tutustu hierontaan',
        linkHref: '/palvelut/hieronta',
      },
      {
        image: '/assets/kiropraktikko.jpg',
        title: 'Kiropraktiikka',
        description: 'Kiropraktiikka auttaa vapauttamaan kehon liikett\u00e4 ja tekee arjessa liikkumisesta kevyemp\u00e4\u00e4.',
        linkText: 'Tutustu kiropraktiikkaan',
        linkHref: '/palvelut/kiropraktiikka',
      },
    ],
    secondaryLabel: 'My\u00f6s saatavilla',
    secondaryServices: [
      { image: '/assets/myover40.jpg', title: 'Myover40\u00AE', linkHref: '/palvelut/personal-training' },
      { image: '/assets/dryneedling.jpg', title: 'Dry Needling', linkHref: '/palvelut/hieronta' },
      { image: '/assets/sportmassage.jpg', title: 'Urheiluhieronta', linkHref: '/palvelut/hieronta' },
    ],
  },
  pricing: {
    eyebrow: 'HINNASTO',
    headline: 'Selke\u00e4t hinnat, ei yll\u00e4tyksi\u00e4',
    body: 'Ensimm\u00e4inen k\u00e4ynti alkaa aina rauhallisella kartoituksella ja tilanteesi ymm\u00e4rt\u00e4misell\u00e4.',
    categories: [
      {
        title: 'Kiropraktiikka',
        items: [
          { name: 'Ensik\u00e4ynti', price: '84' },
          { name: 'Jatkohoito', price: '80' },
        ],
      },
      {
        title: 'Hieronta',
        items: [
          { name: '60 min', price: '65' },
          { name: '90 min', price: '89' },
        ],
      },
      {
        title: 'Valmennus',
        items: [
          { name: 'Myover40\u00AE', price: '75' },
          { name: '5 kerran aloituspaketti', price: '350' },
        ],
      },
    ],
    ctaLabel: 'Katso koko hinnasto',
    ctaHref: '/hinnasto',
  },
  reviews: {
    eyebrow: 'ASIAKASKOKEMUKSIA',
    headline: 'Mit\u00e4 asiakkaamme sanovat',
    description: 'Kuule suoraan niilt\u00e4, jotka ovat kokeneet eron.',
    items: [
      { name: 'Laura M.', text: 'Krista on mahtavan ammattitaitoinen kiropraktikko ja lis\u00e4ksi mukava persoona, jolla on aina ilo k\u00e4yd\u00e4.', service: 'Kiropraktiikka' },
      { name: 'Janne K.', text: 'Hieronta oli juuri sit\u00e4 mitä tarvitsin. J\u00e4nnitykset helpottivat jo ensimm\u00e4isell\u00e4 kerralla.', service: 'Hieronta' },
      { name: 'Sari L.', text: 'Myover40-tunnit ovat muuttaneet koko k\u00e4sitykseni liikunnasta. Enemm\u00e4n energiaa ja v\u00e4hemm\u00e4n kipuja.', service: 'Myover40\u00AE' },
      { name: 'Mikko T.', text: 'Ammattitaitoinen ja yst\u00e4v\u00e4llinen palvelu alusta loppuun. Suosittelen l\u00e4mpim\u00e4sti.', service: 'Kiropraktiikka' },
      { name: 'Anna R.', text: 'The Back Roomissa k\u00e4yd\u00e4\u00e4n kuuntelemassa. Hoito on aina yksil\u00f6llist\u00e4 ja kokonaisvaltaista.', service: 'Hieronta' },
      { name: 'Petri H.', text: 'Kivuton liikkuminen palasi jo muutaman k\u00e4ynnin j\u00e4lkeen. En voisi olla tyytyv\u00e4isempi.', service: 'Kiropraktiikka' },
      { name: 'Tiina S.', text: 'Ihana, rauhallinen tila ja todella osaava henkil\u00f6kunta. T\u00e4\u00e4ll\u00e4 on hyv\u00e4 olla.', service: 'Hieronta' },
      { name: 'Marko P.', text: 'Personal training on auttanut minua ymm\u00e4rt\u00e4m\u00e4n kehoni paremmin. Tuloksia on tullut selv\u00e4sti.', service: 'Personal Training' },
    ],
  },
  team: {
    eyebrow: 'TUTUSTU ASIANTUNTIJOIHIMME',
    headline: 'Hoitoa kokemuksella ja l\u00e4sn\u00e4ololla',
    members: [
      {
        name: 'Krista Ketel\u00e4',
        firstName: 'Kristasta',
        title: 'Kiropraktikko D.C., MChiro',
        role: 'Kiropraktikko',
        image: '/assets/krista_hero.png',
        bio: 'Krista on The Back Roomin perustaja ja kokenut kiropraktikko, jonka hoidossa yhdistyv\u00e4t vahva ammattitaito ja yksil\u00f6llinen kohtaaminen. H\u00e4n on erikoistunut niska- ja selk\u00e4vaivoihin, raskausajan hoitoon sek\u00e4 post-operatiiviseen kuntoutukseen.',
        testimonial: 'Krista on mahtavan ammattitaitoinen kiropraktikko ja lis\u00e4ksi mukava persoona, jolla on aina ilo k\u00e4yd\u00e4.',
      },
      {
        name: 'Jari Salminen',
        firstName: 'Jarista',
        title: 'Kiropraktikko D.C.',
        role: 'Kiropraktikko',
        image: '/assets/jari.jpg',
        bio: 'Jari on kiropraktikko, joka erikoistunut tuki- ja liikuntaelimist\u00f6n vaivojen tutkimiseen ja hoitoon kaikissa ik\u00e4ryhmiss\u00e4. H\u00e4nell\u00e4 on erityisvahvuutena raajojen lihas- ja nivelvaivoissa sek\u00e4 urheiluvammoissa.',
        testimonial: 'Jari on todella asiantunteva, perusteellinen ja miellytt\u00e4v\u00e4 kiropraktikko, jota suosittelen l\u00e4mpim\u00e4sti.',
      },
      {
        name: 'Annika Toivonen',
        firstName: 'Annikasta',
        title: 'Urheiluhieroja, Dry Needling -terapeutti',
        role: 'Hieronta',
        image: '/assets/annika.jpg',
        bio: 'Annika on koulutettu hieroja, jolla on laaja osaaminen hierontatekniikoista ja Dry Needling -hoidoista. Hoito alkaa aina monipuolisella alkukartoituksella, ja hoito r\u00e4\u00e4t\u00e4l\u00f6id\u00e4\u00e4n asiakkaan tarpeiden mukaan.',
        testimonial: 'Useamman vuoden kokemuksella voi sanoa, ett\u00e4 Annika on todella ammattilainen.',
      },
      {
        name: 'Sari Kuivanen',
        firstName: 'Sarista',
        title: 'Personal Trainer, MyOver40\u00AE Master Trainer',
        role: 'Training',
        image: '/assets/sari.jpg',
        bio: 'Sari on MyOver40\u00AE-valmentaja, joka auttaa yli 40-vuotiaita naisia l\u00f6yt\u00e4m\u00e4\u00e4n liikkuvuutta ja voimaa arjen keskell\u00e4. Kivun lievittyminen ja liikkuvuuden parantuminen kulkevat k\u00e4si k\u00e4dess\u00e4 juuri sinulle r\u00e4\u00e4t\u00e4l\u00f6idyiss\u00e4 harjoituksissa.',
        testimonial: 'Sarin Myover40\u00AE-tuntien my\u00f6t\u00e4 my\u00f6s unen laatu ja jaksaminen ovat parantuneet selv\u00e4sti.',
      },
      {
        name: 'Elisa Kuusela',
        firstName: 'Elisasta',
        title: 'Hieroja',
        role: 'Hieronta',
        image: '/assets/elisa.jpg',
        bio: 'Rauhallista ja yksil\u00f6llist\u00e4 kehonhuoltoa vakioasiakkaille Tampereella.',
        testimonial: null,
      },
    ],
  },
  faq: {
    eyebrow: 'ENNEN ENSIMM\u00c4IST\u00c4 K\u00c4YNTI\u00c4',
    headline: 'Moni kysyy n\u00e4it\u00e4 ennen ajanvarausta',
    items: [
      {
        question: 'Mist\u00e4 tied\u00e4n kenelle asiantuntijalle varata?',
        answer: 'Jos et ole varma mik\u00e4 palvelu tai asiantuntija sopii tilanteeseesi, voit aina soittaa meille ja kysy\u00e4. Neuvomme mielell\u00e4mme sinulle sopivaa hoitoa.',
        includePhone: true,
      },
      {
        question: 'Voinko tulla vaikka en tiet\u00e4isi mist\u00e4 kipu tai oire johtuu?',
        answer: 'Kyll\u00e4. Moni tulee vastaanotolle juuri siksi, ettei tied\u00e4 mist\u00e4 oireet johtuvat. Hoito alkaa aina kuuntelemisesta, tilanteen kartoituksesta ja huolellisesta tutkimisesta.',
        includePhone: false,
      },
      {
        question: 'Pit\u00e4\u00e4k\u00f6 ensimm\u00e4isell\u00e4 k\u00e4ynnill\u00e4 sitoutua hoitojaksoon?',
        answer: 'Ei tarvitse. Hoito suunnitellaan aina sinun tilanteesi mukaan ilman painetta sitoutumiseen.',
        includePhone: false,
      },
      {
        question: 'Miten ajanvaraus toimii?',
        answer: 'Ajan voit varata helposti nettisivuillamme tai soittaa meille suoraan ja varata ajan puhelimitse. Autamme tarvittaessa my\u00f6s oikean palvelun valinnassa.',
        includePhone: false,
      },
    ],
  },
  finalCta: {
    backgroundImage: '/assets/final_cta_bg.jpg',
    eyebrow: 'VARAA AIKA',
    headline: 'Kun keho voi paremmin, arki tuntuu kevyemm\u00e4lt\u00e4',
    supportText: 'Parempi olo voi alkaa yhdest\u00e4 ajasta',
    ctaLabel: 'Varaa aika',
    phone: '0400 601 819',
    phoneSupport: 'Kysy neuvoa tai varaa aika puhelimitse',
    trustItems: [
      { icon: 'star', label: '4.8/5' },
      { icon: 'clock', label: '20+ vuotta' },
      { icon: 'calendar', label: 'Helppo varaus' },
    ],
  },
  footer: {
    columns: [
      {
        title: 'Palvelut',
        links: [
          { label: 'Kiropraktiikka', href: '/palvelut/kiropraktiikka' },
          { label: 'Hieronta', href: '/palvelut/hieronta' },
          { label: 'Personal Training', href: '/palvelut/personal-training' },
          { label: 'Hinnasto', href: '/hinnasto' },
        ],
      },
      {
        title: 'Yritys',
        links: [
          { label: 'Asiantuntijat', href: '/tiimi' },
          { label: 'Arvostelut', href: '/arvostelut' },
          { label: 'Meist\u00e4', href: '/meista' },
          { label: 'Yhteystiedot', href: '/yhteystiedot' },
        ],
      },
      {
        title: 'Seuraa meit\u00e4',
        links: [
          { label: 'Instagram', href: 'https://www.instagram.com/thebackroomtampere/' },
          { label: 'Facebook', href: 'https://www.facebook.com/thebackroomtampere/' },
          { label: 'Google Reviews', href: 'https://g.co/kgs/W9ENsR' },
          { label: 'Lahjakortit', href: '/lahjakortti' },
        ],
      },
    ],
    paymentMethods: 'Maksutavat: ePassi, Smartum',
    copyright: 'The Back Room. Kaikki oikeudet pid\u00e4tet\u00e4\u00e4n.',
  },
};

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function getTrustIcon(icon: string, size: number) {
  const props = { size, strokeWidth: 1.5, className: 'text-[#D4A03D]/35' };
  if (icon === 'star') return <Star {...props} />;
  if (icon === 'clock') return <Clock {...props} />;
  return <Calendar {...props} />;
}

export function ChiropractorTemplate() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [teamTransitioning, setTeamTransitioning] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTeamSelect = useCallback((index: number) => {
    if (index === activeTeamIndex || teamTransitioning) return;
    setTeamTransitioning(true);
    setTimeout(() => {
      setActiveTeamIndex(index);
      setTeamTransitioning(false);
    }, 350);
  }, [activeTeamIndex, teamTransitioning]);

  const prevReview = () => setReviewIndex((i) => (i === 0 ? templateData.reviews.items.length - 1 : i - 1));
  const nextReview = () => setReviewIndex((i) => (i === templateData.reviews.items.length - 1 ? 0 : i + 1));

  const activeTeamMember = templateData.team.members[activeTeamIndex];
  const visibleReviews = [
    templateData.reviews.items[reviewIndex % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 1) % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 2) % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 3) % templateData.reviews.items.length],
  ];

  return (
    <div className="min-h-[100dvh] font-jakarta antialiased">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[rgba(240,237,232,0.92)] backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.04)]' : 'bg-transparent'
      }`}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-[60px] md:h-[68px] flex items-center justify-between">
          <Link to="/" className="relative z-10">
            <img
              src={scrolled ? templateData.navigation.logoDark : templateData.navigation.logo}
              alt={templateData.business.name}
              className="h-9 md:h-10 w-auto transition-opacity duration-300"
            />
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {templateData.navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-jakarta text-[14px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  scrolled ? 'text-[#080C0A] hover:text-[#D4A03D]' : 'text-[#F4F4F4] hover:text-[#D4A03D]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative z-10 transition-colors ${scrolled ? 'text-[#080C0A]' : 'text-[#F4F4F4]'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[rgba(240,237,232,0.97)] backdrop-blur-xl border-t border-[rgba(0,0,0,0.04)] px-5 py-6"
          >
            {templateData.navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-jakarta text-[14px] font-semibold uppercase tracking-wider text-[#080C0A] py-3 border-b border-[rgba(0,0,0,0.04)] last:border-0"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.hero.backgroundImage})` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.82) 60%, rgba(0,0,0,0.94) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="font-jakarta text-[13px] font-semibold uppercase tracking-[3px] text-[#D4A03D] mb-6">
              {templateData.hero.eyebrow}
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-marcellus text-[32px] md:text-[44px] lg:text-[54px] text-[#F4F4F4] leading-[1.15] mb-6 max-w-[650px]"
          >
            {templateData.hero.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-jakarta text-[15px] md:text-[17px] text-[#9A9A9A]/75 leading-[1.7] mb-10 max-w-[460px]"
          >
            {templateData.hero.description}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            href={templateData.business.bookingUrl}
            className="inline-flex items-center justify-center px-12 py-[16px] rounded font-jakarta text-[14px] font-semibold tracking-wide bg-[#B8892A] text-[#080C0A] shadow-[0_2px_16px_rgba(184,137,42,0.18)] hover:-translate-y-0.5 hover:bg-[#C99A3A] hover:shadow-[0_8px_30px_rgba(184,137,42,0.28)] transition-all duration-[400ms] mb-6"
          >
            {templateData.hero.ctaLabel}
          </motion.a>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-col items-center gap-3">
            <a href={templateData.business.googleReviewUrl} className="flex items-center gap-2 text-[#9A9A9A]/50 hover:text-[#F4F4F4]/80 transition-colors duration-300 no-underline">
              <Star size={13} strokeWidth={1.5} className="text-[#D4A03D]/70" />
              <span className="font-jakarta text-[13px]">{templateData.hero.trustRating} {templateData.hero.trustLabel}</span>
            </a>
            <div className="flex items-center gap-2 text-[#9A9A9A]/40">
              <MapPin size={12} strokeWidth={1.5} />
              <span className="font-jakarta text-[12px]">{templateData.hero.locationLabel}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative overflow-hidden" style={{ backgroundColor: templateData.intro.backgroundColor, paddingTop: '44px', paddingBottom: '44px' }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        <div className="relative text-center px-6">
          <p className="font-marcellus text-[17px] md:text-[20px] text-[#F4F4F4]/55">
            {templateData.intro.text}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="palvelut" className="bg-[#F4F0EA] pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-18">
              <p className="font-jakarta text-[11px] font-medium uppercase tracking-[4px] text-[#D4A03D]/60 mb-5">{templateData.services.eyebrow}</p>
              <h2 className="font-marcellus text-[26px] md:text-[32px] text-[#1A1714] leading-[1.25] mb-5">{templateData.services.headline}</h2>
              <p className="font-jakarta text-[14px] text-[#4A4540] leading-[1.7] max-w-[440px] mx-auto">{templateData.services.body}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {templateData.services.primaryServices.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <Link to={service.linkHref} className="group block rounded-[12px] overflow-hidden bg-[#FAF7F2] transition-all duration-500 ease-out hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]">
                  <div className="relative overflow-hidden">
                    <img src={service.image} alt={service.title} loading="lazy" className="w-full aspect-[16/10.5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(212,160,61,0.018) 0%, transparent 40%, rgba(244,240,234,0.15) 100%)', mixBlendMode: 'multiply' }} />
                  </div>
                  <div className="px-8 pt-7 pb-9 md:px-10 md:pt-8 md:pb-10">
                    <h3 className="font-marcellus text-[26px] md:text-[28px] text-[#1A1714] mb-4">{service.title}</h3>
                    <p className="font-jakarta text-[14px] text-[#5C5650] leading-[1.75] mb-8 max-w-[340px]">{service.description}</p>
                    <span className="inline-flex items-center gap-1.5 font-jakarta text-[13px] text-[#4A4540]/45 group-hover:text-[#D4A03D] transition-colors duration-300">
                      {service.linkText}
                      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-18 md:mt-22 pt-12 border-t border-[#1A1714]/[0.04]">
              <p className="font-jakarta text-[10px] font-medium uppercase tracking-[4px] text-[#9A948C]/40 text-center mb-10">{templateData.services.secondaryLabel}</p>
              <div className="grid grid-cols-3 gap-4 md:gap-5">
                {templateData.services.secondaryServices.map((service, i) => (
                  <Link key={i} to={service.linkHref} className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                    <div className="relative overflow-hidden aspect-[4/3.2]">
                      <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" style={service.title === 'Dry Needling' ? { objectPosition: 'left center' } : undefined} />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(26,23,20,0.3) 100%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <p className="font-marcellus text-[15px] md:text-[17px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">{service.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-10 text-center">
                <p className="font-jakarta text-[13px] text-[#9A948C]/50 leading-[1.6] max-w-[380px] mx-auto">{templateData.services.reassurance}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="hinnasto" className="bg-[#F4F0EA] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[520px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <p className="font-jakarta text-[11px] font-medium uppercase tracking-[4px] text-[#D4A03D]/60 mb-5">{templateData.pricing.eyebrow}</p>
              <h2 className="font-marcellus text-[26px] md:text-[30px] text-[#1A1714] leading-[1.25] mb-5">{templateData.pricing.headline}</h2>
              <p className="font-jakarta text-[14px] text-[#4A4540] leading-[1.7] max-w-[400px] mx-auto">{templateData.pricing.body}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12">
              {templateData.pricing.categories.map((cat, ci) => (
                <div key={ci} className={ci > 0 ? 'mt-8' : ''}>
                  <p className="font-jakarta text-[10px] font-medium uppercase tracking-[3px] text-[#9A948C]/40 mb-3">{cat.title}</p>
                  <div className="border-t border-[#1A1714]/[0.05]">
                    {cat.items.map((item, ii) => (
                      <div key={ii} className={`flex justify-between items-baseline py-4 ${ii < cat.items.length - 1 ? 'border-b border-[#1A1714]/[0.05]' : ''}`}>
                        <span className="font-jakarta text-[15px] font-medium text-[#1A1714]/80">{item.name}</span>
                        <span className="flex items-baseline gap-1 ml-6">
                          <span className="font-marcellus text-[18px] text-[#1A1714]">{item.price}</span>
                          <span className="font-jakarta text-[13px] text-[#9A948C]/50">&euro;</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <Link to={templateData.pricing.ctaHref} className="group inline-flex items-center gap-1.5 font-jakarta text-[13px] text-[#4A4540]/65 hover:text-[#1A1714] transition-colors duration-300 tracking-wider underline underline-offset-4 decoration-[#4A4540]/20 hover:decoration-[#1A1714]/40">
                {templateData.pricing.ctaLabel}
                <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews */}
      <section id="arvostelut" className="bg-[#1A1714] pt-20 md:pt-28 pb-14 md:pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(212,160,61,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.02 }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-jakarta text-[11px] font-medium uppercase tracking-[3px] text-[#D4A03D]/50 mb-5">{templateData.reviews.eyebrow}</p>
              <h2 className="font-marcellus text-[26px] md:text-[32px] text-[#F4F4F4] leading-[1.2] mb-5">{templateData.reviews.headline}</h2>
              <p className="font-jakarta text-[14px] text-[#9A9A9A]/65 leading-[1.7] max-w-[420px] mx-auto">{templateData.reviews.description}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative">
              <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {visibleReviews.map((review, i) => (
                  <div key={`${reviewIndex}-${i}`} className="flex-shrink-0 w-[280px] md:w-[310px] snap-start">
                    <div className="bg-[#F6F2EC] rounded-xl p-7 md:p-8 shadow-[0_1px_8px_rgba(0,0,0,0.03)] h-full flex flex-col">
                      <p className="font-jakarta text-[14px] text-[#080C0A]/80 leading-[1.7] italic flex-1">&ldquo;{review.text}&rdquo;</p>
                      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#080C0A]/[0.06]">
                        <div className="w-9 h-9 rounded-full bg-[#E7E0D6] flex items-center justify-center">
                          <span className="font-marcellus text-[14px] text-[#080C0A]/50">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-jakarta text-[13px] font-semibold text-[#080C0A]">{review.name}</p>
                          <p className="font-jakarta text-[11px] text-[#080C0A]/40">{review.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 mt-6">
                <button onClick={prevReview} className="w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#F4F4F4]/40 hover:text-[#D4A03D] hover:border-[#D4A03D]/30 transition-colors bg-transparent cursor-pointer">
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button onClick={nextReview} className="w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#F4F4F4]/40 hover:text-[#D4A03D] hover:border-[#D4A03D]/30 transition-colors bg-transparent cursor-pointer">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section id="asiantuntijat" className="relative bg-[#1A1714] pt-20 md:pt-28 pb-8 md:pb-10 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(212,160,61,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="relative max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="font-jakarta text-[11px] font-medium uppercase tracking-[3px] text-[#D4A03D]/70 mb-5">{templateData.team.eyebrow}</p>
              <h2 className="font-marcellus text-[26px] md:text-[32px] text-[#F4F4F4] leading-[1.2]">{templateData.team.headline}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-8 md:gap-14 items-start">
            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <div className="relative overflow-hidden rounded-lg mx-auto md:mx-0 max-w-[320px] md:max-w-none">
                <img src={activeTeamMember.image} alt={activeTeamMember.name} loading="lazy" className="w-full aspect-[4/5] object-cover object-[center_20%]" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(13,10,8,0.45) 100%)' }} />
              </div>
            </div>

            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <p className="font-marcellus text-[22px] md:text-[24px] text-[#F4F4F4] mb-2">{activeTeamMember.name}</p>
              <p className="font-jakarta text-[12px] font-medium text-[#D4A03D]/55 tracking-[1px] uppercase mb-8">{activeTeamMember.title}</p>
              <p className="font-jakarta text-[14px] text-[#E8E4DF] leading-[1.75] mb-8 max-w-[420px]">{activeTeamMember.bio}</p>

              {activeTeamMember.testimonial && (
                <div className="mb-8 max-w-[420px]">
                  <div className="pl-3 border-l border-[#F4F4F4]/[0.07]">
                    <p className="font-jakarta text-[13px] italic text-[#F4F4F4]/[0.38] leading-[1.7]">&ldquo;{activeTeamMember.testimonial}&rdquo;</p>
                  </div>
                </div>
              )}

              <div className="flex gap-5 md:gap-7 mb-7">
                {templateData.team.members.map((t, i) => (
                  <button key={i} onClick={() => handleTeamSelect(i)} className="group flex flex-col items-center text-center cursor-pointer bg-transparent border-none p-0">
                    <div className={`rounded-full overflow-hidden mb-2 transition-all duration-300 ${i === activeTeamIndex ? 'w-12 h-12 md:w-14 md:h-14 ring-1 ring-[#D4A03D]/80 opacity-100 scale-105' : 'w-10 h-10 md:w-11 md:h-11 opacity-40 group-hover:opacity-75 scale-100'}`}>
                      <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <p className={`font-jakarta text-[11px] mb-px transition-colors duration-300 ${i === activeTeamIndex ? 'text-[#F4F4F4]/80' : 'text-[#F4F4F4]/25 group-hover:text-[#F4F4F4]/50'}`}>{t.name.split(' ')[0]}</p>
                    <p className={`font-jakarta text-[9px] tracking-wide transition-colors duration-300 ${i === activeTeamIndex ? 'text-[#D4A03D]/55' : 'text-[#9A9A9A]/30 group-hover:text-[#9A9A9A]/50'}`}>{t.role}</p>
                  </button>
                ))}
              </div>

              <Link to="/tiimi" className="group inline-flex items-center gap-2">
                <span className="font-jakarta text-[13px] font-medium text-[#F4F4F4]/55 group-hover:text-[#D4A03D] transition-colors duration-300">Lue lis&auml;&auml; {activeTeamMember.firstName}</span>
                <ArrowRight size={14} strokeWidth={1.5} className="text-[#F4F4F4]/30 group-hover:text-[#D4A03D] group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F4F0EA] pt-16 md:pt-20 pb-6 md:pb-8 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <p className="font-jakarta text-[10px] font-medium uppercase tracking-[4px] text-[#9A948C]/40 mb-5">{templateData.faq.eyebrow}</p>
              <h2 className="font-marcellus text-[26px] md:text-[32px] text-[#1A1714] leading-[1.25]">{templateData.faq.headline}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12 md:mb-14">
              {templateData.faq.items.map((faq, i) => (
                <div key={i} className="border-t border-[#1A1714]/[0.06]">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="group w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left bg-transparent border-none cursor-pointer">
                    <span className="font-jakarta text-[15px] md:text-[16px] font-medium text-[#1A1714] leading-[1.5]">{faq.question}</span>
                    <span className="shrink-0 mt-[2px] text-[#9A948C]/50 group-hover:text-[#9A948C]/70 transition-colors duration-300">
                      {openFaqIndex === i ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-[400ms] ease-out" style={{ maxHeight: openFaqIndex === i ? '220px' : '0px', opacity: openFaqIndex === i ? 1 : 0 }}>
                    <div className="font-jakarta text-[14px] text-[#5C5650] leading-[1.7] pb-5 md:pb-6 max-w-[540px]">
                      {faq.answer}
                      {faq.includePhone && (
                        <a href={templateData.business.phoneLink} className="block mt-3 font-jakarta text-[14px] text-[#4A4540]/70 tracking-wider no-underline hover:text-[#1A1714] hover:underline underline-offset-4 decoration-[#4A4540]/20 transition-colors duration-300">
                          📞 {templateData.business.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#1A1714]/[0.06]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.finalCta.backgroundImage})` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 48%, rgba(20,16,12,0.50) 0%, rgba(20,16,12,0.82) 55%, rgba(20,16,12,0.97) 100%), linear-gradient(180deg, rgba(20,16,12,0.85) 0%, rgba(20,16,12,0.22) 35%, rgba(20,16,12,0.42) 65%, rgba(20,16,12,0.94) 100%)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }} />
        <div className="relative z-10 w-full max-w-[480px] mx-auto px-6 pt-[2vh]">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-jakarta text-[11px] font-medium uppercase tracking-[3px] text-[#D4A03D]/40 mb-4">{templateData.finalCta.eyebrow}</p>
              <h2 className="font-marcellus text-[24px] md:text-[30px] text-[#F4F4F4] leading-[1.3] mb-4">{templateData.finalCta.headline}</h2>
              <p className="font-jakarta text-[14px] text-[#9A9A9A]/55 leading-[1.6] mb-8 max-w-[300px] mx-auto">{templateData.finalCta.supportText}</p>

              <a href={templateData.business.bookingUrl} className="inline-flex items-center justify-center px-14 py-[16px] rounded font-jakarta text-[14px] font-semibold tracking-wide bg-[#B8892A] text-[#080C0A] shadow-[0_2px_16px_rgba(184,137,42,0.18),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:bg-[#C99A3A] hover:shadow-[0_8px_30px_rgba(184,137,42,0.28),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-[400ms] mb-5">
                {templateData.finalCta.ctaLabel}
              </a>

              <div className="mb-16 text-center">
                <a href={templateData.business.phoneLink} className="block font-jakarta text-[13px] text-[#9A9A9A]/55 tracking-wider no-underline hover:text-[#F4F4F4]/80 transition-colors duration-300 mb-1.5">
                  {templateData.finalCta.phone}
                </a>
                <p className="font-jakarta text-[12px] text-[#9A9A9A]/40 tracking-wide">{templateData.finalCta.phoneSupport}</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
                {templateData.finalCta.trustItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 md:px-4">
                    {getTrustIcon(item.icon, 10)}
                    <span className="font-jakarta text-[10px] text-[#9A9A9A]/55 tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="yhteystiedot" className="bg-[#3D3834] pt-14 md:pt-16 pb-10 md:pb-12 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10">
            <div>
              <h3 className="font-marcellus text-[18px] text-[#F4F4F4] mb-1">{templateData.business.name}</h3>
              <p className="font-jakarta text-[13px] text-[#9A9A9A]/60 mb-4">{templateData.business.tagline}</p>
              <ul className="space-y-2">
                <li className="font-jakarta text-[14px] text-[#9A9A9A] flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" /> {templateData.business.address}
                </li>
                <li>
                  <a href={templateData.business.phoneLink} className="font-jakarta text-[14px] text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors flex items-center gap-2 no-underline">
                    <Phone size={14} className="shrink-0" /> {templateData.business.phone}
                  </a>
                </li>
                <li>
                  <a href={templateData.business.emailLink} className="font-jakarta text-[14px] text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors flex items-center gap-2 no-underline">
                    <Mail size={14} className="shrink-0" /> {templateData.business.email}
                  </a>
                </li>
              </ul>
            </div>
            {templateData.footer.columns.map((col, i) => (
              <div key={i}>
                <h4 className="font-jakarta text-[13px] font-semibold uppercase tracking-wider text-[#F4F4F4] mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="font-jakarta text-[14px] text-[#9A9A9A] hover:text-[#F4F4F4] transition-colors no-underline">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#F4F4F4]/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-jakarta text-[12px] text-[#9A9A9A]/45">{templateData.footer.copyright}</p>
            <p className="font-jakarta text-[12px] text-[#9A9A9A]/35">{templateData.footer.paymentMethods}</p>
            <div className="flex gap-4">
              <a href={templateData.business.instagramUrl} className="text-[#9A9A9A]/50 hover:text-[#F4F4F4]/70 transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.facebookUrl} className="text-[#9A9A9A]/50 hover:text-[#F4F4F4]/70 transition-colors"><Facebook size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.phoneLink} className="text-[#9A9A9A]/50 hover:text-[#F4F4F4]/70 transition-colors"><Phone size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
