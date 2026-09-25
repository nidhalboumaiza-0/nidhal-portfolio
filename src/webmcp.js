/**
 * WebMCP (Web Model Context Protocol) tool provider for AI agents
 * Spec: https://webmachinelearning.github.io/webmcp/
 */

export function registerWebMCPTools() {
  if (typeof window === "undefined") return;

  const candidateProfile = {
    name: "Nidhal BOUMAIZA",
    title: "Full Stack Software Engineer & Mobile Developer",
    email: "nidhal.boumaiza@outlook.com",
    whatsapp: "+216 28 316 089",
    location: "Tunis, Tunisia (International Mobility)",
    portfolio: "https://nidhal-portfolio.vercel.app/",
    github: "https://github.com/nidhalboumaiza-0",
    linkedin: "https://linkedin.com/in/nidhal-boumaiza"
  };

  const productionApps = [
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
  ];

  const tools = [
    {
      name: "get_candidate_profile",
      description: "Returns Nidhal BOUMAIZA's developer background, technical skills, titles, and contact information.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({ content: [{ type: "text", text: JSON.stringify(candidateProfile, null, 2) }] })
    },
    {
      name: "list_production_apps",
      description: "Lists verified production mobile apps published on the Apple App Store and Google Play Store (Maqra'at Al-Rajhi, Barberio).",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({ content: [{ type: "text", text: JSON.stringify(productionApps, null, 2) }] })
    },
    {
      name: "get_internships_and_pfe",
      description: "Returns detailed overview of all 4 internships, including the final year engineering PFE with eSteps Health (CIRO Pizza Platform).",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({
        content: [{
          type: "text",
          text: JSON.stringify([
            { company: "eSteps Health", role: "Software Engineering Intern (PFE Ingénieur)", period: "02/2026 - 09/2026", project: "CIRO Pizza Platform" },
            { company: "Neopolis Development", role: "Bachelor Graduation Intern (PFE Licence DSI)", period: "02/2023 - 05/2023" },
            { company: "CPG Gafsa", role: "Advanced Training Intern (Stage de Perfectionnement)", period: "01/2023 - 02/2023" },
            { company: "Evolve'Com", role: "Introductory Intern (Stage d'Initiation)", period: "01/2022 - 02/2022" }
          ], null, 2)
        }]
      })
    },
    {
      name: "get_cv_downloads",
      description: "Returns direct download URLs for modern and classic PDF CVs in English and French.",
      inputSchema: {
        type: "object",
        properties: {
          language: { type: "string", enum: ["en", "fr"] },
          format: { type: "string", enum: ["modern", "classic"] }
        }
      },
      execute: async () => ({
        content: [{
          type: "text",
          text: JSON.stringify({
            englishModern: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_EN.pdf",
            frenchModern: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV.pdf",
            englishClassic: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_CLASSIC_EN.pdf",
            frenchClassic: "https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_CLASSIC_FR.pdf"
          }, null, 2)
        }]
      })
    }
  ];

  try {
    if (!navigator.modelContext) {
      navigator.modelContext = {
        tools: [],
        registerTool(tool) {
          this.tools.push(tool);
          return { unregister: () => {} };
        },
        provideContext(context) {
          if (context && context.tools) {
            this.tools.push(...context.tools);
          }
        }
      };
    }

    tools.forEach((tool) => {
      if (typeof navigator.modelContext.registerTool === "function") {
        navigator.modelContext.registerTool(tool);
      }
    });

    if (typeof navigator.modelContext.provideContext === "function") {
      navigator.modelContext.provideContext({ tools });
    }

    window.modelContext = navigator.modelContext;
  } catch (err) {
    console.debug("WebMCP registration:", err);
  }
}
