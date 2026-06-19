import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Stack",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      title: "Full Stack Developer",
      subtitle:
        "I build production Flutter apps and robust Express.js APIs, with a focus on clean UI, reliability, testing, and fast product delivery.",
      downloadCV: "Download CV",
      viewProjects: "View Projects",
    },
    about: {
      title: "About Me",
      subtitle: "Software Engineering Student & Product-minded Developer",
      description1:
        "I build mobile-first products with Flutter, React frontends, and Express.js backends. My strongest proof is Barberio, my first personal app published on both App Store and Google Play.",
      description2:
        "I care about clean architecture, reusable code, responsive UI, API reliability, and turning Figma designs into polished screens.",
      description3:
        "Now I am sharpening the exact stack this role needs: TypeScript, Express, Docker, Jest, CI/CD, Flutter testing, and scalable product delivery.",
      passions: {
        innovation: {
          title: "Product Thinking",
          description:
            "I move from idea to shipped product with clear priorities and useful details.",
        },
        problemSolving: {
          title: "Robust APIs",
          description:
            "REST APIs, validation, database design, error handling, and maintainable backend flows.",
        },
        mobileFirst: {
          title: "Flutter First",
          description:
            "Cross-platform mobile and web experiences with responsive, platform-aware UI.",
        },
        continuousLearning: {
          title: "Quality Loop",
          description:
            "Cleaner code, tests, reviews, CI/CD, and deployment practices improved sprint by sprint.",
        },
      },
      yearsExperience: "Years Experience",
      projectsCompleted: "Projects Completed",
      technologiesMastered: "Technologies Mastered",
      clientsSatisfied: "Clients Satisfied",
    },
    skills: {
      title: "Role Stack",
      subtitle: "What I bring to this Full Stack role",
    },
    experience: {
      title: "Experience",
      subtitle: "My professional journey",
      professionalExperience: "Professional Experience",
      experiences: {
        freelance: {
          title: "Freelance Full Stack Developer",
          company: "Self-Employed",
          duration: "June 2023 - Present",
          location: "Remote",
          description:
            "Building mobile apps, React interfaces, and backend APIs for real clients and personal products.",
          achievements: [
            "Published Barberio on App Store and Google Play as a personal production app",
            "Built Flutter apps connected to Express.js, Django, Firebase, and MongoDB backends",
            "Delivered responsive screens from product requirements and UI references",
            "Worked with authentication, notifications, appointments, dashboards, and real-time data",
            "Improving Docker, Jest, CI/CD, and Flutter testing as the next delivery layer",
          ],
        },
        endOfStudies: {
          title: "End-of-Studies Intern",
          company: "Neopolis Development",
          duration: "February 2023 - May 2023",
          location: "Tunisia",
          description:
            "Developed a mobile and backend HR management platform for internal workflows.",
          achievements: [
            "Built HR modules for leave, equipment, documents, suggestions, and hierarchy",
            "Connected Flutter screens to Express.js backend services",
            "Improved internal workflow visibility with structured data flows",
            "Collaborated on requirements, delivery, and technical decisions",
          ],
        },
        development: {
          title: "Development Intern",
          company: "CPG Gafsa",
          duration: "January 2023 - February 2023",
          location: "Gafsa, Tunisia",
          description:
            "Developed an intern management application with mobile and backend features.",
          achievements: [
            "Built intern management and tracking features",
            "Implemented application and evaluation workflows",
            "Created dashboards for administrators and supervisors",
          ],
        },
        initiation: {
          title: "Initiation Intern",
          company: "Evolve'Com",
          duration: "January 2022 - February 2022",
          location: "Tunisia",
          description:
            "First professional experience working with e-commerce data and CMS workflows.",
          achievements: [
            "Maintained product data for an e-commerce platform",
            "Learned CMS workflows with Prestashop",
          ],
        },
      },
    },
    projects: {
      title: "Selected Work",
      subtitle: "Production and full-stack projects",
      screenshots: "Screenshots",
      sourceCode: "Source Code",
      viewDemo: "View Demo",
      appStore: "App Store",
      googlePlay: "Google Play",
      website: "Website",
      liveProduct: "Published Product",
      freelanceProject: "Freelance Project",
      academicProject: "Academic Project",
      internshipProject: "Internship Project",
    },
    education: {
      title: "Education",
      subtitle: "My academic background",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's work together",
      description:
        "Open to Full Stack opportunities where Flutter, TypeScript, Express.js, testing, and product ownership matter.",
      letsConnect: "Let's Connect",
      connectDescription:
        "I am especially interested in roles where I can ship reliable APIs, polished cross-platform apps, and strong user experiences with a serious engineering team.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      thankYou: "Thank you for your message! I'll get back to you soon.",
      phone: "Phone",
      location: "Location",
      emailLabel: "Email",
      placeholders: {
        name: "Your Name",
        email: "your.email@example.com",
        subject: "Full Stack opportunity / Collaboration / Project",
        message: "Tell me what you are building and where I can help...",
      },
    },
    gallery: {
      close: "Close",
      previous: "Previous",
      next: "Next",
      imageOf: "Image {current} of {total}",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Stack",
      experience: "Expérience",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
    },
    hero: {
      greeting: "Salut, je suis",
      title: "Développeur Full Stack",
      subtitle:
        "Je développe des applications Flutter en production et des APIs Express.js robustes, avec une attention forte à l'UI, la fiabilité, les tests et la livraison produit.",
      downloadCV: "Télécharger CV",
      viewProjects: "Voir les Projets",
    },
    about: {
      title: "À Propos",
      subtitle: "Étudiant en Génie Logiciel & Développeur orienté produit",
      description1:
        "Je construis des produits mobile-first avec Flutter, des frontends React et des backends Express.js. Ma meilleure preuve est Barberio, ma première application personnelle publiée sur App Store et Google Play.",
      description2:
        "Je travaille avec une attention particulière à l'architecture, au code réutilisable, à l'UI responsive, à la fiabilité des APIs et à la conversion fidèle de maquettes Figma.",
      description3:
        "Je renforce maintenant le stack ciblé par ce poste: TypeScript, Express, Docker, Jest, CI/CD, tests Flutter et livraison scalable.",
      passions: {
        innovation: {
          title: "Vision produit",
          description:
            "Je transforme une idée en produit livré avec des priorités claires et des détails utiles.",
        },
        problemSolving: {
          title: "APIs robustes",
          description:
            "REST APIs, validation, base de données, gestion d'erreurs et flows backend maintenables.",
        },
        mobileFirst: {
          title: "Flutter first",
          description:
            "Expériences mobile et web multiplateformes avec une UI responsive et adaptée.",
        },
        continuousLearning: {
          title: "Qualité",
          description:
            "Code propre, tests, revues, CI/CD et pratiques de déploiement améliorées à chaque sprint.",
        },
      },
      yearsExperience: "Années d'Expérience",
      projectsCompleted: "Projets Réalisés",
      technologiesMastered: "Technologies Maîtrisées",
      clientsSatisfied: "Clients Satisfaits",
    },
    skills: {
      title: "Stack ciblé",
      subtitle: "Ce que j'apporte à ce poste Full Stack",
    },
    experience: {
      title: "Expérience",
      subtitle: "Mon parcours professionnel",
      professionalExperience: "Expérience Professionnelle",
      experiences: {
        freelance: {
          title: "Développeur Full Stack Freelance",
          company: "Indépendant",
          duration: "Juin 2023 - Présent",
          location: "À distance",
          description:
            "Développement d'applications mobiles, d'interfaces React et d'APIs backend pour des clients et produits personnels.",
          achievements: [
            "Publication de Barberio sur App Store et Google Play comme application personnelle en production",
            "Applications Flutter connectées à Express.js, Django, Firebase et MongoDB",
            "Écrans responsive livrés à partir de besoins produit et références UI",
            "Authentification, notifications, rendez-vous, dashboards et données temps réel",
            "Montée en puissance sur Docker, Jest, CI/CD et tests Flutter",
          ],
        },
        endOfStudies: {
          title: "Stage de fin d'études",
          company: "Neopolis Development",
          duration: "Février 2023 - Mai 2023",
          location: "Tunisie",
          description:
            "Développement d'une plateforme RH mobile et backend pour des workflows internes.",
          achievements: [
            "Modules RH pour congés, matériel, documents, suggestions et hiérarchie",
            "Connexion d'écrans Flutter à des services backend Express.js",
            "Amélioration de la visibilité des workflows internes",
            "Collaboration sur les besoins, la livraison et les décisions techniques",
          ],
        },
        development: {
          title: "Stage de développement",
          company: "CPG Gafsa",
          duration: "Janvier 2023 - Février 2023",
          location: "Gafsa, Tunisie",
          description:
            "Développement d'une application de gestion des stagiaires avec mobile et backend.",
          achievements: [
            "Gestion et suivi des stagiaires",
            "Workflows de candidature et d'évaluation",
            "Tableaux de bord pour administrateurs et superviseurs",
          ],
        },
        initiation: {
          title: "Stage d'initiation",
          company: "Evolve'Com",
          duration: "Janvier 2022 - Février 2022",
          location: "Tunisie",
          description:
            "Première expérience professionnelle autour des données e-commerce et des workflows CMS.",
          achievements: [
            "Maintenance des données produit d'une plateforme e-commerce",
            "Découverte des workflows CMS avec Prestashop",
          ],
        },
      },
    },
    projects: {
      title: "Projets sélectionnés",
      subtitle: "Production et projets full-stack",
      screenshots: "Captures",
      sourceCode: "Code Source",
      viewDemo: "Voir la Démo",
      appStore: "App Store",
      googlePlay: "Google Play",
      website: "Site web",
      liveProduct: "Produit publié",
      freelanceProject: "Projet Freelance",
      academicProject: "Projet Académique",
      internshipProject: "Projet de Stage",
    },
    education: {
      title: "Formation",
      subtitle: "Mon parcours académique",
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Travaillons ensemble",
      description:
        "Ouvert aux opportunités Full Stack où Flutter, TypeScript, Express.js, les tests et l'ownership produit comptent.",
      letsConnect: "Connectons-nous",
      connectDescription:
        "Je cherche surtout une équipe où je peux livrer des APIs fiables, des apps multiplateformes propres et une expérience utilisateur solide.",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi...",
      thankYou: "Merci pour votre message ! Je vous répondrai bientôt.",
      phone: "Téléphone",
      location: "Localisation",
      emailLabel: "Email",
      placeholders: {
        name: "Votre nom",
        email: "votre.email@example.com",
        subject: "Opportunité Full Stack / Collaboration / Projet",
        message: "Parlez-moi de votre produit et de ce que je peux apporter...",
      },
    },
    gallery: {
      close: "Fermer",
      previous: "Précédent",
      next: "Suivant",
      imageOf: "Image {current} sur {total}",
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en"));
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
