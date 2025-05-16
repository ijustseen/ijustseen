export const SECTIONS = [
  { id: 'hero', name: 'Welcome' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
] as const;

export type SectionId = typeof SECTIONS[number]['id'];
export type SectionName = typeof SECTIONS[number]['name']; 