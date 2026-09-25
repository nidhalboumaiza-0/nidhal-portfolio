module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.status(200).json({
    name: "Nidhal BOUMAIZA",
    title: "Full Stack Software Engineer & Mobile Developer",
    email: "nidhal.boumaiza@outlook.com",
    phone: "+21628316089",
    whatsapp: "+21628316089",
    location: "Tunis, Tunisia (International Mobility)",
    portfolioUrl: "https://nidhal-portfolio.vercel.app/",
    githubUrl: "https://github.com/nidhalboumaiza-0",
    linkedinUrl: "https://linkedin.com/in/nidhal-boumaiza",
    summary: "Software Engineer and Full-Stack Mobile Developer with proven expertise in Flutter, React, Next.js 16, Laravel 12, Node.js, and Cloud architectures. Proven track record publishing production mobile apps on Apple App Store & Google Play Store (AL Manarah Advanced Co / Maqra'at Al-Rajhi, Barberio) and delivering enterprise engineering platforms (CIRO Pizza Platform at eSteps Health).",
    productionApps: [
      {
        name: "Maqra'at Al-Rajhi",
        company: "AL Manarah Advanced Company",
        stores: ["Apple App Store", "Google Play Store"],
        appStoreUrl: "https://apps.apple.com/sa/app/%D9%85%D9%82%D8%B1%D8%A3%D8%A9-%D8%A7%D9%84%D8%B1%D8%A7%D8%AC%D8%AD%D9%8A/id6753659959",
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.manara.maqari&hl=en",
        tech: ["Flutter", "BLoC", "Audio Streaming", "RTL Arabic", "REST APIs"]
      },
      {
        name: "Barberio",
        company: "Personal Production App",
        stores: ["Apple App Store", "Google Play Store"],
        appStoreUrl: "https://apps.apple.com/us/app/barberio/id6761790714",
        googlePlayUrl: "https://play.google.com/store/apps/details?id=io.barberio.app",
        tech: ["Flutter", "Express.js", "Firebase", "Push Notifications"]
      }
    ],
    softwareProjects: [
      { name: "HajMoto", tech: ["Flutter", "Supabase", "Docker", "BLoC"] },
      { name: "Gaspino", tech: ["Flutter", "Express.js", "MongoDB"] },
      { name: "Medical App", tech: ["Flutter", "Firebase"] },
      { name: "TeamFlow", tech: ["React", "Node.js", "Express.js", "MongoDB"] }
    ],
    internships: [
      {
        company: "eSteps Health",
        role: "Software Engineering Intern (PFE Ingénieur)",
        period: "02/2026 – 09/2026",
        project: "CIRO Pizza Platform (3 Flutter apps, Next.js 16 Web Admin, Laravel 12 Reverb WebSockets, SCADA robotics)"
      },
      {
        company: "Neopolis Development",
        role: "Bachelor Graduation Intern (PFE Licence DSI)",
        period: "02/2023 – 05/2023",
        project: "Mobile HR App & Express.js/MongoDB"
      },
      {
        company: "CPG Gafsa",
        role: "Advanced Training Intern (Stage de Perfectionnement)",
        period: "01/2023 – 02/2023",
        project: "Intern tracking mobile application"
      },
      {
        company: "Evolve'Com",
        role: "Introductory Intern (Stage d'Initiation)",
        period: "01/2022 – 02/2022",
        project: "Prestashop e-commerce optimization"
      }
    ],
    education: [
      {
        degree: "National Engineering Degree in Software Engineering",
        school: "iTeam University — Tunis",
        period: "09/2023 – 09/2026"
      },
      {
        degree: "Bachelor Degree in Information Systems Development (DSI)",
        school: "Higher Institute of Technological Studies of Nabeul (ISET Nabeul)",
        period: "09/2020 – 06/2023"
      }
    ],
    cvDownloads: {
      englishModern: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_EN.pdf",
      frenchModern: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_FR.pdf",
      englishClassic: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_CLASSIC_EN.pdf",
      frenchClassic: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_CLASSIC_FR.pdf"
    }
  });
};
