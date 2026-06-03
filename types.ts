/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Essay {
  id: string;
  title: string;
  subtitle?: string;
  deck?: string;
  content: string; // Full text content of the essay
  category: string;
  date: string;
  year: number;
  pdfAvailable?: boolean;
  seriesName?: string;
  seriesPart?: number;
  isFeatured?: boolean;
}

export interface SeriesPart {
  number: number;
  title: string;
  status: 'published' | 'coming_soon';
  essayId?: string;
}

export interface Series {
  name: string;
  eyebrow: string;
  parts: SeriesPart[];
}

export interface Institution {
  id: string;
  name: string;
  roleLabel: string; // e.g. "Corps Marshal", "Founder"
  tagline: string;
  description: string;
  details: string[]; // key achievements or structured bullets
  websiteUrl?: string;
}

export interface MentorshipFocus {
  title: string;
  description: string;
}
