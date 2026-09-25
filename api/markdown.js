const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.md');
    let content = '';
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf8');
    } else {
      content = `# Nidhal BOUMAIZA — Full Stack Software Engineer & Mobile Developer

- **Website**: https://nidhal-portfolio.vercel.app/
- **Email**: nidhal.boumaiza@outlook.com
- **WhatsApp**: +216 28 316 089
- **GitHub**: https://github.com/nidhalboumaiza-0
- **LinkedIn**: https://linkedin.com/in/nidhal-boumaiza

## Core Skills
Flutter, Dart, BLoC, React 19, Next.js 16, Laravel 12, Node.js, Express.js, Docker, SCADA.

## Production Mobile Applications
- **Maqra'at Al-Rajhi** (AL Manarah Advanced Co): Published on Apple App Store & Google Play.
- **Barberio**: Published on Apple App Store & Google Play.

## Internships & PFE
- **eSteps Health** (02/2026 - 09/2026): PFE Ingénieur — CIRO Pizza Platform
- **Neopolis Development** (02/2023 - 05/2023): PFE Licence DSI
- **CPG Gafsa** (01/2023 - 02/2023): Stage de Perfectionnement
- **Evolve'Com** (01/2022 - 02/2022): Stage d'Initiation

## CV Downloads
- English Modern: https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_EN.pdf
- French Modern: https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_FR.pdf
- English Classic: https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_CLASSIC_EN.pdf
- French Classic: https://nidhal-portfolio.vercel.app/NIDHAL_BOUMAIZA_CV_CLASSIC_FR.pdf
`;
    }

    const tokenEstimate = Math.round(content.length / 4);

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('x-markdown-tokens', tokenEstimate.toString());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    return res.status(200).send(content);
  } catch (error) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.status(200).send('# Nidhal BOUMAIZA Portfolio\n\nFull Stack Software Engineer & Mobile Developer.');
  }
};
