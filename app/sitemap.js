const SITE_URL = 'https://www.salahbounouh.com';

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/SalahBounouh_CV.pdf`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
