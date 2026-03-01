/**
 * Centralized TypeScript interfaces for the SPTS community hub.
 * All types live here — no per-file type definitions scattered across the codebase.
 * @see D-002 — TypeScript strict mode
 */

// ─── Locale ───

export type Locale = "en" | "ta";

// ─── User / Auth ───

export type UserRole = "member" | "board" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  joined_at: string;
}

// ─── Events ───

export interface Event {
  id: string;
  title_en: string;
  title_ta: string;
  date: string; // YYYY-MM-DD
  venue: string;
  description_en?: string;
  description_ta?: string;
  image_url?: string;
  rsvp_enabled: boolean;
  published: boolean;
  created_at: string;
}

// ─── Achievements ───

export interface Achievement {
  id: string;
  student_name: string;
  award_title: string;
  competition: string;
  date: string;
  image_url?: string;
  published: boolean;
  submitted_by?: string;
  created_at: string;
}

// ─── Programs ───

export type ProgramSlug =
  | "tamil-school"
  | "library"
  | "pattarai"
  | "music-club"
  | "volunteer";

export interface Program {
  slug: ProgramSlug;
  name_en: string;
  name_ta: string;
  icon: string;
  description_en: string;
  href: string;
}

// ─── Board Members ───

export interface BoardMember {
  id: string;
  name: string;
  role_en: string;
  role_ta: string;
  photo_url?: string;
  order: number;
}

// ─── Help Board ───

export interface HelpRequest {
  id: string;
  text: string;
  category: string;
  posted_by?: string;
  resolved: boolean;
  created_at: string;
}

// ─── Activity Feed ───

export interface FeedItem {
  id: string;
  author_name: string;
  author_id?: string;
  content: string;
  created_at: string;
  likes: number;
}

// ─── Thirukkural ───

export interface Kural {
  Number: number;
  Line1: string;
  Line2: string;
  Translation: string;
  transliteration1?: string;
  transliteration2?: string;
  mv?: string;
  sp?: string;
  mk?: string;
  explanation?: string;
  couplet?: string;
  Chapter?: string;
  Book?: string;
}
