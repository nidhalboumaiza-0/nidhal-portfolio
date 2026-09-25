module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.status(200).json({
    status: 'ok',
    service: 'nidhal-portfolio-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    author: 'Nidhal BOUMAIZA',
    website: 'https://nidhal-portfolio.vercel.app/'
  });
};
