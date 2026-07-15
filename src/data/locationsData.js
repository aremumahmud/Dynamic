// Collin County, TX service-area cities

export const county = 'Collin County';
export const state = 'TX';
export const stateName = 'Texas';

export const locationsList = [
  { slug: 'plano', name: 'Plano' },
  { slug: 'frisco', name: 'Frisco' },
  { slug: 'mckinney', name: 'McKinney' },
  { slug: 'allen', name: 'Allen' },
  { slug: 'richardson', name: 'Richardson' },
  { slug: 'princeton', name: 'Princeton' },
  { slug: 'celina', name: 'Celina' },
  { slug: 'anna', name: 'Anna' },
  { slug: 'melissa', name: 'Melissa' },
  { slug: 'carrollton', name: 'Carrollton' },
  { slug: 'dallas', name: 'Dallas' },
  { slug: 'fairview', name: 'Fairview' },
  { slug: 'copeville', name: 'Copeville' },
  { slug: 'farmersville', name: 'Farmersville' },
  { slug: 'garland', name: 'Garland' },
  { slug: 'lucas', name: 'Lucas' },
  { slug: 'prosper', name: 'Prosper' },
  { slug: 'van-alstyne', name: 'Van Alstyne' },
  { slug: 'wylie', name: 'Wylie' },
  { slug: 'murphy', name: 'Murphy' },
  { slug: 'nevada', name: 'Nevada' },
  { slug: 'new-hope', name: 'New Hope' },
  { slug: 'parker', name: 'Parker' },
  { slug: 'royse-city', name: 'Royse City' },
  { slug: 'sachse', name: 'Sachse' },
  { slug: 'saint-paul', name: 'Saint Paul' },
  { slug: 'weston', name: 'Weston' },
]

export function getLocationBySlug(slug) {
  return locationsList.find((location) => location.slug === slug)
}
