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
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    // Hero Section
    hero: {
      greeting: "Hi, I'm",
      title: "Full Stack Mobile & Web Developer",
      subtitle:
        "I create modern mobile applications with Flutter and responsive web applications with React. I build robust backend systems using Express.js and Flask.",
      downloadCV: "Download CV",
      viewProjects: "View Projects",
    },
    // About Section
    about: {
      title: "About Me",
      subtitle: "Software Engineering Student & Full Stack Developer",
      description1:
        "I'm currently pursuing my Software Engineering degree at Iteam University, building on my foundation in Information Systems Development. My journey in tech began with a passion for creating comprehensive digital solutions that span both mobile and web platforms.",
      description2:
        "As a freelance full stack developer, I've had the privilege of working on diverse projects ranging from social platforms to healthcare applications. My expertise spans across mobile development with Flutter, web frontend development with React, and backend development with Express.js and Flask, allowing me to deliver complete end-to-end solutions.",
      description3:
        "What drives me is the opportunity to bridge the gap between mobile and web experiences through unified backend architectures. I believe in writing clean, efficient code and creating user experiences that are seamless across all platforms - whether it's a Flutter mobile app, a React web application, or a robust API backend.",
      passions: {
        innovation: {
          title: "Innovation",
          description:
            "Always seeking creative solutions to complex problems and staying ahead of technology trends.",
        },
        problemSolving: {
          title: "Problem Solving",
          description:
            "Passionate about breaking down complex challenges into manageable, elegant solutions.",
        },
        mobileFirst: {
          title: "Mobile First",
          description:
            "Specialized in creating seamless mobile experiences with Flutter and cross-platform development.",
        },
        continuousLearning: {
          title: "Continuous Learning",
          description:
            "Committed to staying updated with the latest technologies and best practices in software development.",
        },
      },
      yearsExperience: "Years Experience",
      projectsCompleted: "Projects Completed",
      technologiesMastered: "Technologies Mastered",
      clientsSatisfied: "Clients Satisfied",
    },
    // Skills Section
    skills: {
      title: "My Skills",
      subtitle: "Technologies I work with",
    },
    // Experience Section
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
            "Working as a freelance full stack developer, creating innovative mobile applications with Flutter and web applications with React, supported by robust backend systems.",
          achievements: [
            "Developed CAMPFIRE STORIES APP - Social platform with Flutter frontend and Django backend",
            "Built B.LOC APP - Location-based service with Flutter mobile app and Django backend",
            "Created DAYTE APP - Dating platform with Flutter frontend and Express.js backend",
            "Developed GASPINO APP - Food waste reduction solution with Flutter and Express.js backend",
            "Built Medical App - Healthcare management system with Flutter and Express.js backend",
          ],
        },
        endOfStudies: {
          title: "End-of-Studies Intern",
          company: "Neopolis Development",
          duration: "February 2023 - May 2023",
          location: "Tunisia",
          description:
            "Completed my end-of-studies internship developing a comprehensive HR management platform.",
          achievements: [
            "Designed and developed a complete HR management system",
            "Implemented employee management and tracking features",
            "Created responsive web interface with modern UI/UX",
            "Integrated database management for employee records",
          ],
        },
        development: {
          title: "Development Intern",
          company: "CPG Gafsa",
          duration: "January 2023 - February 2023",
          location: "Gafsa, Tunisia",
          description:
            "Developed an intern management application to streamline the internship process and management.",
          achievements: [
            "Built intern management and tracking system",
            "Implemented application and evaluation workflows",
            "Created dashboard for administrators and supervisors",
          ],
        },
        initiation: {
          title: "Initiation Intern",
          company: "Evolve'Com",
          duration: "January 2022 - February 2022",
          location: "Tunisia",
          description:
            "First professional experience working on e-commerce database development and management.",
          achievements: [
            "Worked on e-commerce database design and optimization",
          ],
        },
      },
    },
    // Projects Section
    projects: {
      title: "My Projects",
      subtitle: "Here are some of my recent works",
      screenshots: "Screenshots",
      sourceCode: "Source Code",
      viewDemo: "View Demo",
      freelanceProject: "Freelance Project",
      academicProject: "Academic Project",
      internshipProject: "Internship Project",
    },
    // Education Section
    education: {
      title: "Education",
      subtitle: "My academic background",
    },
    // Contact Section
    contact: {
      title: "Get In Touch",
      subtitle: "Let's work together",
      description:
        "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and development.",
      letsConnect: "Let's Connect",
      connectDescription:
        "Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you. Feel free to reach out through any of the channels below.",
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
        subject: "Project Inquiry / Collaboration / etc.",
        message: "Tell me about your project or what you'd like to discuss...",
      },
    },
    // Gallery
    gallery: {
      close: "Close",
      previous: "Previous",
      next: "Next",
      imageOf: "Image {current} of {total}",
    },
  },
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
    },
    // Hero Section
    hero: {
      greeting: "Salut, je suis",
      title: "Développeur Full Stack Mobile & Web",
      subtitle:
        "Je crée des applications mobiles modernes avec Flutter et des applications web responsives avec React. Je développe des systèmes backend robustes avec Express.js et Flask.",
      downloadCV: "Télécharger CV",
      viewProjects: "Voir les Projets",
    },
    // About Section
    about: {
      title: "À Propos de Moi",
      subtitle: "Étudiant en Génie Logiciel & Développeur Full Stack",
      description1:
        "Je poursuis actuellement mes études d'ingénieur en génie logiciel à l'Université Iteam, en m'appuyant sur ma formation en développement de systèmes d'information. Mon parcours dans la technologie a commencé par une passion pour la création de solutions numériques complètes qui couvrent les plateformes mobiles et web.",
      description2:
        "En tant que développeur full stack freelance, j'ai eu le privilège de travailler sur des projets divers allant des plateformes sociales aux applications de santé. Mon expertise s'étend au développement mobile avec Flutter, au développement frontend web avec React, et au développement backend avec Express.js et Flask, me permettant de livrer des solutions complètes de bout en bout.",
      description3:
        "Ce qui me motive, c'est l'opportunité de combler le fossé entre les expériences mobiles et web grâce à des architectures backend unifiées. Je crois en l'écriture de code propre et efficace et en la création d'expériences utilisateur fluides sur toutes les plateformes - qu'il s'agisse d'une application mobile Flutter, d'une application web React, ou d'un backend API robuste.",
      passions: {
        innovation: {
          title: "Innovation",
          description:
            "Toujours à la recherche de solutions créatives aux problèmes complexes et en avance sur les tendances technologiques.",
        },
        problemSolving: {
          title: "Résolution de Problèmes",
          description:
            "Passionné par la décomposition de défis complexes en solutions gérables et élégantes.",
        },
        mobileFirst: {
          title: "Mobile First",
          description:
            "Spécialisé dans la création d'expériences mobiles fluides avec Flutter et le développement multiplateforme.",
        },
        continuousLearning: {
          title: "Apprentissage Continu",
          description:
            "Engagé à rester à jour avec les dernières technologies et les meilleures pratiques en développement logiciel.",
        },
      },
      yearsExperience: "Années d'Expérience",
      projectsCompleted: "Projets Réalisés",
      technologiesMastered: "Technologies Maîtrisées",
      clientsSatisfied: "Clients Satisfaits",
    },
    // Skills Section
    skills: {
      title: "Mes Compétences",
      subtitle: "Technologies avec lesquelles je travaille",
    },
    // Experience Section
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
            "Travail en tant que développeur full stack freelance, créant des applications mobiles innovantes avec Flutter et des applications web avec React, soutenues par des systèmes backend robustes.",
          achievements: [
            "Développé CAMPFIRE STORIES APP - Plateforme sociale avec frontend Flutter et backend Django",
            "Construit B.LOC APP - Service basé sur la localisation avec app mobile Flutter et API Django",
            "Créé DAYTE APP - Plateforme de rencontre avec frontend Flutter et backend Express.js",
            "Développé GASPINO APP - Solution de réduction des déchets alimentaires avec Flutter et backend Express.js",
            "Construit Medical App - Système de gestion de la santé avec Flutter et backend Express.js",
          ],
        },
        endOfStudies: {
          title: "Stage de fin d'études",
          company: "Neopolis Development",
          duration: "Février 2023 - Mai 2023",
          location: "Tunisie",
          description:
            "Terminé mon stage de fin d'études en développement d'un système de gestion de ressources humaines complet.",
          achievements: [
            "Conçu et développé un système de gestion de ressources humaines complet",
            "Implémenté des fonctionnalités de gestion des employés et de suivi",
            "Créé une interface web réactive avec une interface utilisateur moderne",
            "Intégré la gestion de base de données pour les enregistrements des employés",
          ],
        },
        development: {
          title: "Stage de développement",
          company: "CPG Gafsa",
          duration: "Janvier 2023 - Février 2023",
          location: "Gafsa, Tunisie",
          description:
            "Développé une application de gestion de stage pour faciliter le processus de stage et la gestion.",
          achievements: [
            "Construit un système de gestion et de suivi des stages",
            "Implémenté des workflows de conception et d'évaluation de l'application",
            "Créé un tableau de bord pour les administrateurs et les supérieurs",
            "Intégré des fonctionnalités de signalement et d'analyse",
          ],
        },
        initiation: {
          title: "Stage d'initiation",
          company: "Evolve'Com",
          duration: "Janvier 2022 - Février 2022",
          location: "Tunisie",
          description:
            "Première expérience professionnelle travaillant sur le développement et la gestion de la base de données de commerce électronique.",
          achievements: [
            "Travaillé sur le design et l'optimisation de la base de données de commerce électronique",
            "Appris les meilleures pratiques de gestion de base de données",
            "Aide à la migration et à la nettoyage des données",
            "Gagné de l'expérience en SQL et en opérations de base de données",
          ],
        },
      },
    },
    // Projects Section
    projects: {
      title: "Mes Projets",
      subtitle: "Voici quelques-uns de mes travaux récents",
      screenshots: "Captures d'écran",
      sourceCode: "Code Source",
      viewDemo: "Voir la Démo",
      freelanceProject: "Projet Freelance",
      academicProject: "Projet Académique",
      internshipProject: "Projet de Stage",
    },
    // Education Section
    education: {
      title: "Formation",
      subtitle: "Mon parcours académique",
    },
    // Contact Section
    contact: {
      title: "Contactez-moi",
      subtitle: "Travaillons ensemble",
      description:
        "Je suis toujours ouvert à discuter de nouvelles opportunités, de projets intéressants ou simplement à discuter de technologie et de développement.",
      letsConnect: "Connectons-nous",
      connectDescription:
        "Que vous ayez un projet à l'esprit, que vous vouliez collaborer ou que vous vouliez simplement me dire bonjour, je serai ravi de vous entendre. N'hésitez pas à me contacter via l'un des canaux ci-dessous.",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le Message",
      sending: "En cours d'envoi...",
      thankYou: "Merci pour votre message ! Je vous recontacterai bientôt.",
      phone: "Téléphone",
      location: "Localisation",
      emailLabel: "Email",
      placeholders: {
        name: "Votre Nom",
        email: "votre.email@example.com",
        subject: "Question sur le Projet / Collaboration / etc.",
        message:
          "Parlez-moi de votre projet ou de ce que vous aimeriez discuter...",
      },
    },
    // Gallery
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
