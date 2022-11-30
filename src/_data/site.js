module.exports = {
  environment: process.env.MODE || 'development',
  name: 'Eric Carlisle : UI Developer, UX Strategist',
  title: 'Eric Carlisle : UI Developer, UX Strategist',
  image: '/images/eric-carlisle-800x800.png',
  description: "This is Eric Carlisle's blog.",
  publisher: 'Eric Carlisle',
  url: 'https://www.ericcarlisle.com',
  lang: 'en',
  locale: 'en_US',
  hostname:
    process.env.MODE === 'production'
      ? 'https://www.ericcarlisle.com'
      : 'http://localhost:3000',
  social: {
    GitHub: {
      url: 'https://github.com/ecarlisle',
    },
    LinkedIn: {
      url: 'https://www.linkedin.com/in/ericcarlisle',
    },
    Mastodon: {
      url: 'https://fosstodon.org/@ericcarlisle',
    },
    Instagram: {
      url: 'https://www.instagram.com/ericcarlisle/',
    },
  },
  facebookAppId: '372474503176455',
  facebookPageId: '102276088224812',
};
